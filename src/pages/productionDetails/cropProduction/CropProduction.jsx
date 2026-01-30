// src/pages/production/CropProduction.jsx
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
// import { getGeneralMasterByType, getCropsBySeason, getVarietyByCrop } from "../../../api/masterMock";
import { cropProductionValidationSchema } from "../validation";
import ValidationModal from "../../../components/ValidationModal";
// import { startRecording, stopRecordingAndTranscribe } from "../../../utils/speechToText";
import { } from "../../../api/productionDetails";
import { uploadSingleDocument } from "../../../api/upload";
import { createCropProduction, updateCropProduction, getCropProductionList, getCropProductionById } from "../../../api/productionDetails";
import { getGeneral, getCropsBySeason, getVarietiesByCrop } from "../../../api/master";

const initialCropProductionValues = {
  seasonId: "",
  cropId: "",
  cropVarietyId: "",
  productionQuantity: "",
  harvestedSurplus: "",
  dateOfHarvesting: "",
  estimatedOrHarvestedId: "",
  description: "",
};

export const CropProduction = () => {
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [productionList, setProductionList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    status: true, // true = success, false = error
    message: "",
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingDocId, setExistingDocId] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("Preview");

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTitle, setValidationTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [asyncPreviewData, setAsyncPreviewData] = useState(null);

  const uploadConfig = {
    title: "Upload Crop Image",
    maxSizeMB: "Max - 2mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues: initialCropProductionValues,
    validationSchema: cropProductionValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  // ------------------- LOAD DATA -------------------
  // useEffect(() => {
  //   const res = getGeneralMasterByType("Season");
  //   if (res.success) setSeasons(res.data);
  //   fetchProductionList();
  // }, []);

  useEffect(() => {
    const init = async () => {
      try {
        // -------- Seasons --------
        const seasonRes = await getGeneral("Season");
        if (seasonRes?.success) {
          setSeasons(seasonRes.data);
        } else {
          throw new Error(seasonRes?.message || "Failed to load seasons");
        }

        // -------- Crop Production List --------
        await fetchProductionList();

      } catch (err) {
        console.error("Init load failed:", err);

        setStatusModal({
          isOpen: true,
          status: false,
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load initial data. Please try again.",
        });
      }
    };

    init();
  }, []);

  const fetchProductionList = async () => {
    try {
      const res = await getCropProductionList({
        fpoId: 1,   // replace with dynamic fpoId if available
        page: 0,
        size: 10,
        sort: "asc",
      });

      if (res?.success) {
        setProductionList(res.data);
      } else {
        throw new Error(res?.message || "Failed to fetch crop production list");
      }

    } catch (err) {
      console.error("Fetch production list failed:", err);

      setStatusModal({
        isOpen: true,
        status: false,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Unable to fetch crop production list. Please try again.",
      });
    }
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        if (!formik.values.seasonId) {
          setCrops([]);
          setVarieties([]);

          if (!isUpdateMode) {
            formik.setFieldValue("cropId", "");
            formik.setFieldValue("cropVarietyId", "");
          }
          return;
        }

        const res = await getCropsBySeason(formik.values.seasonId);

        if (!res?.success) {
          throw new Error(res?.message || "Failed to fetch crops");
        }

        setCrops(res.data || []);

        if (!isUpdateMode) {
          formik.setFieldValue("cropId", "");
          formik.setFieldValue("cropVarietyId", "");
        }

      } catch (err) {
        console.error("Fetch crops failed:", err);

        setStatusModal({
          isOpen: true,
          status: false,
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to fetch crops for selected season.",
        });
      }
    };

    fetchCrops();
  }, [formik.values.seasonId, isUpdateMode]);

  useEffect(() => {
    const fetchVarieties = async () => {
      try {
        if (!formik.values.cropId) {
          setVarieties([]);

          if (!isUpdateMode) {
            formik.setFieldValue("cropVarietyId", "");
          }
          return;
        }

        const res = await getVarietiesByCrop(formik.values.cropId);

        if (!res?.success) {
          throw new Error(res?.message || "Failed to fetch varieties");
        }

        setVarieties(res.data || []);

        if (!isUpdateMode) {
          formik.setFieldValue("cropVarietyId", "");
        }

      } catch (err) {
        console.error("Fetch varieties failed:", err);

        setStatusModal({
          isOpen: true,
          status: false,
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Unable to fetch varieties for selected crop.",
        });
      }
    };

    fetchVarieties();
  }, [formik.values.cropId, isUpdateMode]);


  // ------------------- CLEAR ERRORS ON VALUE CHANGE -------------------
  useEffect(() => {
    const newErrors = { ...formik.errors };
    let hasChanges = false;
    Object.keys(formik.values).forEach((field) => {
      if (formik.errors[field] && formik.values[field] !== "" && formik.values[field] != null) {
        newErrors[field] = undefined;
        hasChanges = true;
      }
    });
    if (hasChanges) formik.setErrors(newErrors);
  }, [formik.values]);

  // Start / stop recording for a specific field
  // const handleMicClick = async (fieldName) => {
  //   if (!isRecording) {
  //     // Start recording
  //     try {
  //       await startRecording();
  //       setIsRecording(true);
  //     } catch (err) {
  //       console.error("Failed to start recording:", err);
  //     }
  //   } else {
  //     // Stop recording & get transcript
  //     try {
  //       const transcript = await stopRecordingAndTranscribe();
  //       formik.setFieldValue(fieldName, transcript); // populate field
  //     } catch (err) {
  //       console.error("Transcription failed:", err);
  //     } finally {
  //       setIsRecording(false);
  //     }
  //   }
  // };


  // ------------------- HANDLERS -------------------
  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddOrUpdateClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );

      // SHOW VALIDATION MODAL
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before proceeding.");
      setShowValidationModal(true);

      return;
    }
    setPreviewTitle("Preview");
    setIsPreviewModalOpen(true);
  };

  const handlePreviewConfirm = async () => {
    // ----------------- VALIDATION -----------------
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      setIsPreviewModalOpen(false);
      // Highlight the invalid fields
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );

      // Show validation modal
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before submitting.");
      setShowValidationModal(true);
      return; // stop execution if errors exist
    }

    let docId = existingDocId;

    if (uploadedFile) {
      try {
        const uploadRes = await uploadSingleDocument({
          fpoId: 1,
          docType: 923,
          file: uploadedFile,
        });

        // Based on your axios unwrap pattern, adjust if needed
        if (uploadRes?.success) {
          docId = uploadRes.documentId;
        } else {
          throw new Error(uploadRes?.message || "Document upload failed");
        }

      } catch (err) {
        console.error("Document Upload Failed:", err);

        setStatusModal({
          isOpen: true,
          status: false,
          message:
            err?.message ||
            "Failed to upload document. Please try again.",
        });

        setIsPreviewModalOpen(false);
        return; // STOP submission if upload fails
      }
    }


    const payload = {
      ...formik.values,
      seasonId: parseInt(formik.values.seasonId),
      cropId: parseInt(formik.values.cropId),
      cropVarietyId: parseInt(formik.values.cropVarietyId),
      productionQuantity: parseFloat(formik.values.productionQuantity),
      harvestedSurplus: parseFloat(formik.values.harvestedSurplus),
      estimatedOrHarvestedId: parseInt(formik.values.estimatedOrHarvestedId),
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    try {
      let res;

      if (isUpdateMode && editingId) {
        res = await updateCropProduction(editingId, payload);
      } else {
        res = await createCropProduction(payload);
      }

      // Optional: backend success check
      if (!res?.data || !res.success) {
        throw new Error(res?.message || "Operation failed");
      }

      setStatusModal({
        isOpen: true,
        status: true,
        message: isUpdateMode
          ? "Crop Production Updated Successfully"
          : "Crop Production Added Successfully",
      });

      setIsPreviewModalOpen(false);
      resetAll();
      fetchProductionList();

    } catch (error) {
      console.error("Crop Production API Error:", error);

      setStatusModal({
        isOpen: true,
        status: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to save crop production. Please try again.",
      });

      setIsPreviewModalOpen(false);
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
    try {
      setIsUpdateMode(true);
      setEditingId(row.id);

      // -------- Get production by ID --------
      const res = await getCropProductionById(row.id);

      if (!res?.success || !res?.data) {
        throw new Error(res?.message || "Failed to fetch crop production details");
      }

      const data = res.data;

      setExistingDocId(data.docId || null);
      setPublishOnEmart(!!data.emartPublish);

      // -------- Set form values --------
      formik.setValues({
        seasonId: data.seasonId || "",
        cropId: data.cropId || "",
        cropVarietyId: data.cropVarietyId || "",
        productionQuantity:
          data.productionQuantity != null
            ? data.productionQuantity.toString()
            : "",
        harvestedSurplus:
          data.harvestedSurplus != null
            ? data.harvestedSurplus.toString()
            : "",
        dateOfHarvesting: data.dateOfHarvesting || "",
        estimatedOrHarvestedId: data.estimatedOrHarvestedId || "",
        description: data.description || "",
      });

      setUploadedFile(null);
      setPreviewImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null);

    } catch (err) {
      console.error("Edit load failed:", err);

      setStatusModal({
        isOpen: true,
        status: false,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load crop production for editing.",
      });
    }
  };


  // ------------------- TABLE COLUMNS -------------------
  const columns = [
    "Season",
    "Crop",
    "Crop Variety",
    "Production (in Qtl.)",
    "Marketable Surplus",
    "Date Of Harvesting",
    "Estimated/Harvested",
    "Description",
    "Actions",
  ];

  const previewData = [
    { label: "Season", value: seasons.find((s) => s.id == formik.values.seasonId)?.name || "" },
    { label: "Crop", value: crops.find((c) => c.id == formik.values.cropId)?.name || "" },
    { label: "Crop Variety", value: varieties.find((v) => v.id == formik.values.cropVarietyId)?.name || "" },
    { label: "Production (in Qtl.)", value: formik.values.productionQuantity },
    { label: "Marketable Surplus", value: formik.values.harvestedSurplus },
    { label: "Date Of Harvesting", value: formik.values.dateOfHarvesting },
    { label: "Estimated/Harvested", value: formik.values.estimatedOrHarvestedId },
    { label: "Description", value: formik.values.description },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  // ------------------- RENDER -------------------

  const mapRowToPreview = async (id) => {
    try {
      // Fetch the full crop production row by ID
      const res = await getCropProductionById(id);
      if (!res?.success || !res?.data) throw new Error("Failed to fetch row data");

      const row = res.data;
      console.log("row data :", row);

      const a = [
        { label: "Season", value: row.seasonName },
        { label: "Crop", value: row.cropName },
        { label: "Crop Variety", value: row.cropVarietyName },
        { label: "Production (in Qtl.)", value: row.productionQuantity },
        { label: "Marketable Surplus", value: row.harvestedSurplus },
        { label: "Date Of Harvesting", value: row.dateOfHarvesting },
        { label: "Estimated/Harvested", value: row.estimatedOrHarvestedId },
        { label: "Description", value: row.description },
        { label: "Publish on e-Mart", value: row.emartPublish ? "Yes" : "No" },
      ];
      console.log("a value :", a);
      return a;
    } catch (err) {
      console.error("Error in mapRowToPreview:", err);
      throw err;
    }
  };



  return (
    <div>
      {/* FORM */}
      <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-white">
        <h2 className="text-base font-bold mb-6">
          {isUpdateMode ? "Update Crop Production" : "Crop Production Update"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Season"
            required
            name="seasonId"
            value={formik.values.seasonId}
            onChange={(e) => {
              const newSeasonId = e.target.value;

              formik.setFieldValue("seasonId", Number(newSeasonId));

              // ALWAYS clear dependents when user changes season
              formik.setFieldValue("cropId", "");

              formik.setFieldValue("cropVarietyId", "");

              setCrops([]);
              setVarieties([]);
            }}
            onBlur={formik.handleBlur}
            error={formik.errors.seasonId}
            touched={formik.touched.seasonId}
          >
            <option value="">Select Season</option>
            {seasons.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Crop"
            required
            name="cropId"
            value={formik.values.cropId}
            onChange={(e) => {
              const newCropId = e.target.value;
              formik.setFieldValue("cropId", Number(newCropId));
              formik.setFieldValue("cropVarietyId", "");
              setVarieties([]);
            }}
            onBlur={formik.handleBlur}
            error={formik.errors.cropId}
            touched={formik.touched.cropId}
          >
            <option value="">Select Crop</option>
            {crops.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Crop Variety"
            required
            name="cropVarietyId"
            value={formik.values.cropVarietyId}
            onChange={(e) => formik.setFieldValue("cropVarietyId", Number(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.errors.cropVarietyId}
            touched={formik.touched.cropVarietyId}
          >
            <option value="">Select Crop Variety</option>
            {varieties.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </SelectField>

          <TextField
            label="Production (in Qtl.)"
            required
            name="productionQuantity"
            type="text"
            value={formik.values.productionQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productionQuantity}
            touched={formik.touched.productionQuantity}
          />

          <TextField
            label="Marketable Surplus"
            required
            name="harvestedSurplus"
            type="text"
            value={formik.values.harvestedSurplus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.harvestedSurplus}
            touched={formik.touched.harvestedSurplus}
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
            name="estimatedOrHarvestedId"
            type="text"
            value={formik.values.estimatedOrHarvestedId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.estimatedOrHarvestedId}
            touched={formik.touched.estimatedOrHarvestedId}
          />
        </div>

        <div className="relative">
          <TextArea
            label="Description"
            name="description"
            placeholder="Enter Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description}
          />
          {/* <button
    type="button"
    onClick={() => handleMicClick("description")}
    className="absolute right-2 top-8 p-2 bg-gray-200 rounded-full"
    title={isRecording ? "Stop Recording" : "Start Recording"}
  >
    {isRecording ? "⏹️" : "🎤"}
  </button> */}
        </div>


        <div className="mb-6">
          <AccordionGroup
            items={[
              {
                id: "add-image",
                title: "Add Image",
                isInitiallyOpen: true,
                content: (
                  <UploadDocument
                    key={uploadResetKey}
                    config={uploadConfig}
                    onFileSelect={handleFileSelect}
                  />
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
            <Button
              buttonClassName="p-[10px] text-[14px] text-primary-900 font-medium border border-primary-900 rounded-[8px] bg-white"
              onClick={() => { setPreviewTitle("Preview"); setIsPreviewModalOpen(true) }}
            >
              Preview
            </Button>

            <Button
              type="button"
              onClick={handleAddOrUpdateClick}
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-white rounded-md shadow-sm bg-success"
            >
              {isUpdateMode ? "Update Production List" : "+ Add to Production List"}
            </Button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <Table
          columns={columns}
          data={productionList.map((row) => ({
            Season: row.seasonName ?? "-",
            Crop: row.cropName ?? "-",
            "Crop Variety": row.cropVarietyName ?? "-",
            "Production (in Qtl.)": row.productionQuantity ?? "-",
            "Marketable Surplus": row.harvestedSurplus ?? "-",
            "Date Of Harvesting": row.dateOfHarvesting ?? "-",
            "Estimated/Harvested": row.estimatedOrHarvestedId ?? "-",
            "Description": row.description ?? "-",
            Actions: "actions",
            ...row,
          }))}
          rowKey="id"
          renderActions={(row) => (
            <div className="flex gap-2 items-center justify-center">
              <img src={editSvg} alt="edit" className="w-6 cursor-pointer" onClick={() => handleEdit(row)} />
              {/* <img
                src={viewSvg}
                alt="view"
                className="w-6 cursor-pointer"
                onClick={() => {
                  setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
                  setIsPreviewModalOpen(true);
                }}
              /> */}
              <img
                src={viewSvg}
                alt="view"
                className="w-6 cursor-pointer"
                onClick={async () => {
                  try {
                    setPreviewTitle("View");

                    // Fetch preview data asynchronously
                    const resolvedPreview = await mapRowToPreview(row.id);
                    console.log("resolved :", resolvedPreview);
                    setAsyncPreviewData(resolvedPreview); // store in state
                    setIsPreviewModalOpen(true); // open modal
                  } catch (err) {
                    console.error("Preview load failed:", err);
                    setStatusModal({
                      isOpen: true,
                      status: false,
                      message:
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to load preview data",
                    });
                  }
                }}
              />

              <div
                className={`w-[137px] text-[14px] font-normal px-[12px] py-[6px] rounded-lg flex items-center justify-center
                ${row.emartPublish ? "bg-primary-100 text-dark" : "bg-danger-50 text-dark"}
              `}
              >
                {row.emartPublish ? "✓ Publish Emart" : "Publish Emart"}
              </div>
            </div>
          )}
          stickyLastColumn
        />
      </div>

      <PreviewModal
        isOpen={isPreviewModalOpen}
        title={previewTitle}
        data={asyncPreviewData ? asyncPreviewData : previewData}
        onConfirm={asyncPreviewData ? null : handlePreviewConfirm}
        actionButton={asyncPreviewData ? false : true}
        image={previewImage}
        isUpdateMode={isUpdateMode}
        onClose={() => {
          setAsyncPreviewData(null);
          setIsPreviewModalOpen(false);
        }}
      />

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() =>
          setStatusModal((prev) => ({ ...prev, isOpen: false }))
        }
        status={statusModal.status}
        message={statusModal.message}
      />

      <ValidationModal
        isOpen={showValidationModal}
        title={validationTitle}
        message={validationMessage}
        onClose={() => setShowValidationModal(false)}
      />
    </div>
  );
};
