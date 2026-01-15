
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, TextArea } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import Toggle from "../../../components/Toggle";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";
import { AccordionGroup } from "../../../components/Accordion";

import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import { cropProductionValidationSchema } from "../validation";

import {
  createCropProduction,
  listCropProduction,
  updateCropProduction,
} from "../../../api/productionDetailsMock";

import { getGeneralMasterByType } from "../../../api/masterMock";
import { uploadDocument } from "../../../api/uploadMock";


const initialValues = {
  season: "",
  crop: "",
  cropVariety: "",
  productionInQtl: "",
  estHarMarSupInQtl: "",
  dateOfHarvesting: "",
  estOrHar: "",
  cropDescription: "",
};

export const CropProduction = () => {
  const [isPopulatingEditValues, setIsPopulatingEditValues] = useState(false);
  const [prevSeason, setPrevSeason] = useState("");
  const [prevCrop, setPrevCrop] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [productionList, setProductionList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);
  const [varieties, setVarieties] = useState([]);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingDocId, setExistingDocId] = useState(null);

  const uploadConfig = {
    title: "Add Crop Image *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: cropProductionValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    fetchProductionList();
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    const res = await getGeneralMasterByType("Season");
    if (res.status === 200 && res.data.success) {
      setSeasons(res.data.data.map((s) => s.name));
    }
  };

  useEffect(() => {
    if (!formik.values.season) {
      setCrops([]);
      setVarieties([]);
      if (!isPopulatingEditValues) {
        formik.setFieldValue("crop", "");
        formik.setFieldValue("cropVariety", "");
      }
      setPrevSeason("");
      return;
    }

    const fetchCrops = async () => {
      const res = await getGeneralMasterByType("Crop");
      if (res.status === 200 && res.data.success) {
        const cropNames = res.data.data.map(c => c.name);
        setCrops(cropNames);

        // reset only if user changed season
        if (!isPopulatingEditValues && formik.values.season !== prevSeason) {
          formik.setFieldValue("crop", "");
          formik.setFieldValue("cropVariety", "");
        }
        setPrevSeason(formik.values.season);
      }
    };

    fetchCrops();
  }, [formik.values.season, isPopulatingEditValues]);

  useEffect(() => {
    if (!formik.values.crop) {
      setVarieties([]);
      if (!isPopulatingEditValues) {
        formik.setFieldValue("cropVariety", "");
      }
      setPrevCrop("");
      return;
    }

    const fetchVarieties = async () => {
      const res = await getGeneralMasterByType("CropVariety");
      if (res.status === 200 && res.data.success) {
        const varietyNames = res.data.data.map(v => v.name);
        setVarieties(varietyNames);

        // reset only if user changed crop
        if (!isPopulatingEditValues && formik.values.crop !== prevCrop) {
          formik.setFieldValue("cropVariety", "");
        }

        setPrevCrop(formik.values.crop);
      }
    };

    fetchVarieties();
  }, [formik.values.crop, isPopulatingEditValues]);

  const fetchProductionList = async () => {
    const res = await listCropProduction(1);
    if (res.status === 200 && res.data.success) {
      const seasonsMaster = await getGeneralMasterByType("Season");
      const cropsMaster = await getGeneralMasterByType("Crop");
      const varietiesMaster = await getGeneralMasterByType("CropVariety");

      const mapped = res.data.data.map((item) => ({
        itemId: item.id,
        seasonId: item.seasonId,
        cropId: item.cropId,
        cropVarietyId: item.cropVarietyId,
        productionQuantity: item.productionQuantity,
        harvestedSurplus: item.harvestedSurplus,
        dateOfHarvesting: item.dateOfHarvesting,
        estimatedOrHarvestedId: item.estimatedOrHarvestedId,
        description: item.description,
        emartPublish: item.emartPublish,
        docId: item.docId,

        Season:
          seasonsMaster.data.data.find((s) => s.id === item.seasonId)?.name ||
          `Season ${item.seasonId}`,
        "Crop Name":
          cropsMaster.data.data.find((c) => c.id === item.cropId)?.name ||
          `Crop ${item.cropId}`,
        Variety:
          varietiesMaster.data.data.find((v) => v.id === item.cropVarietyId)?.name ||
          `Variety ${item.cropVarietyId}`,
      }));

      setProductionList(mapped);
    }
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddOrUpdateClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }
    setIsPreviewModalOpen(true);
  };

  const handlePreviewConfirm = async () => {
    let docId = existingDocId;

    if (uploadedFile) {
      const uploadRes = await uploadDocument({
        file: uploadedFile,
        fpoId: 1,
        docType: 1,
      });

      if (uploadRes.status === 200 && uploadRes.data.success) {
        docId = uploadRes.data.documentId;
      }
    }

    const payload = {
      seasonId: seasons.indexOf(formik.values.season) + 1,
      cropId: crops.indexOf(formik.values.crop) + 1,
      cropVarietyId: varieties.indexOf(formik.values.cropVariety) + 1,
      productionQuantity: formik.values.productionInQtl,
      harvestedSurplus: formik.values.estHarMarSupInQtl,
      dateOfHarvesting: formik.values.dateOfHarvesting,
      estimatedOrHarvestedId: formik.values.estOrHar,
      description: formik.values.cropDescription,
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    let res;

    if (isUpdateMode) {
      res = await updateCropProduction(editingId, payload);
    } else {
      res = await createCropProduction(payload);
    }

    if (res.status === 200 && res.data.success) {
      setIsPreviewModalOpen(false);
      setIsStatusModalOpen(true);
      resetAll();
      fetchProductionList();
    }
  };

  const resetAll = () => {
    setIsUpdateMode(false);
    setEditingId(null);
    setExistingDocId(null);
    formik.resetForm();
    setUploadedFile(null);
    setPreviewImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  const handleEdit = async (row) => {
    setIsUpdateMode(true);
    setEditingId(row.itemId);
    setExistingDocId(row.docId);
    setIsPopulatingEditValues(true);

    setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
    setPublishOnEmart(row.emartPublish);

    // 1️⃣ Fetch crops first
    const cropsRes = await getGeneralMasterByType("Crop");
    const cropNames = cropsRes.data.data.map(c => c.name);
    setCrops(cropNames);

    // 2️⃣ Fetch varieties first
    const varietiesRes = await getGeneralMasterByType("CropVariety");
    const varietyNames = varietiesRes.data.data.map(v => v.name);
    setVarieties(varietyNames);

    // 3️⃣ Now set Formik values
    formik.setValues({
      season: row.Season,
      crop: cropNames.includes(row["Crop Name"]) ? row["Crop Name"] : "",
      cropVariety: varietyNames.includes(row.Variety) ? row.Variety : "",
      productionInQtl: row.productionQuantity,
      estHarMarSupInQtl: row.harvestedSurplus,
      dateOfHarvesting: row.dateOfHarvesting,
      estOrHar: row.estimatedOrHarvestedId,
      cropDescription: row.description,
    });

    setTimeout(() => setIsPopulatingEditValues(false), 0);
  };


  const previewData = [
    { label: "Season", value: formik.values.season },
    { label: "Crop", value: formik.values.crop },
    { label: "Variety", value: formik.values.cropVariety },
    { label: "Production (Qtl.)", value: formik.values.productionInQtl },
    { label: "Marketable Surplus", value: formik.values.estHarMarSupInQtl },
    { label: "Harvest Date", value: formik.values.dateOfHarvesting },
    { label: "Estimated/Harvested", value: formik.values.estOrHar },
    { label: "Description", value: formik.values.cropDescription },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  return (
    <div>
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
        <h2 className="text-base font-bold mb-6">
          {isUpdateMode ? "Update Crop Production" : "Crop Production Update"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Season"
            required
            name="season"
            value={formik.values.season}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.season}
            touched={formik.touched.season}
          >
            <option value="">Select Season</option>
            {seasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectField>

          <SelectField
            label="Crop"
            required
            name="crop"
            value={formik.values.crop}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.crop}
            touched={formik.touched.crop}
          >
            <option value="">Select Crop</option>
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </SelectField>

          <SelectField
            label="Crop Variety"
            required
            name="cropVariety"
            value={formik.values.cropVariety}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.cropVariety}
            touched={formik.touched.cropVariety}
          >
            <option value="">Select Crop Variety</option>
            {varieties.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </SelectField>


          <TextField
            label="Production (in Qtl.)"
            required
            type="number"
            name="productionInQtl"
            placeholder="Enter Value"
            value={formik.values.productionInQtl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productionInQtl}
            touched={formik.touched.productionInQtl}
          />

          <TextField
            label="Estimated/Harvested Marketable Surplus"
            required
            type="number"
            name="estHarMarSupInQtl"
            placeholder="Enter Value"
            value={formik.values.estHarMarSupInQtl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.estHarMarSupInQtl}
            touched={formik.touched.estHarMarSupInQtl}
          />

          <TextField
            label="Date Of Harvesting"
            required
            type="date"
            name="dateOfHarvesting"
            value={formik.values.dateOfHarvesting}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dateOfHarvesting}
            touched={formik.touched.dateOfHarvesting}
          />

          <TextField
            label="Estimated/Harvested"
            required
            name="estOrHar"
            value={formik.values.estOrHar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.estOrHar}
            touched={formik.touched.estOrHar}
          />
        </div>

        <TextArea
          label="Crop Description"
          required
          name="cropDescription"
          value={formik.values.cropDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.cropDescription}
          touched={formik.touched.cropDescription}
        />

        <div className="mb-6">
          <AccordionGroup
            items={[
              {
                id: "add-image",
                title: "Add Image",
                isInitiallyOpen: true,
                content: (
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <UploadDocument
                      key={uploadResetKey}
                      config={uploadConfig}
                      onFileSelect={handleFileSelect}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="my-8 flex flex-col md:flex-row justify-between gap-4 p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Publish on e-Mart?</span>
            <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
          </div>

          <div className="flex gap-4">
            <Button type="button">Preview</Button>

            <Button
              type="button"
              onClick={handleAddOrUpdateClick}
              buttonClassName={`px-6 py-2.5 text-sm font-semibold text-white rounded-md shadow-sm bg-success`}
            >
              {isUpdateMode ? "Update Production List" : "Add to Production List"}
            </Button>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-base my-6">Crop Production Detail View</h3>

      <Table
        columns={["Season", "Crop Name", "Variety", "Production (in Qtl.)", "Actions"]}
        data={productionList.map((row) => ({
          ...row,
          Season: row.Season,
          "Crop Name": row["Crop Name"],
          Variety: row.Variety,
          "Production (in Qtl.)": row.productionQuantity, // exact key match
        }))}
        renderActions={(row) => (
          <div className="flex gap-2 items-center">
            <img
              src={editSvg}
              alt="edit"
              className="w-6 cursor-pointer"
              onClick={() => handleEdit(row)}
            />
            <img
              src={viewSvg}
              alt="view"
              className="w-6 cursor-pointer"
              onClick={() => {
                setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
                setIsPreviewModalOpen(true);
              }}
            />
            <span className="text-[10px] px-2 py-1 rounded bg-gray-100">
              {row.emartPublish ? "✓ Publish" : "Publish"}
            </span>
          </div>
        )}
      />



      {/* PREVIEW MODAL */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        data={previewData}
        image={previewImage}
      />

      {/* STATUS MODAL */}
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        statusType="success"
        message="Crop Production Data Saved Successfully"
      />
    </div>
  );
};

