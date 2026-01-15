// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";

// import { TextField, SelectField, TextArea } from "../../../components/FormFields";
// import Table from "../../../components/Table";
// import UploadDocument from "../../../components/UploadDocument";
// import Toggle from "../../../components/Toggle";
// import PreviewModal from "../../../components/PreviewModal";
// import StatusModal from "../../../components/StatusModal";
// import { Button } from "../../../components/Buttons";
// import { AccordionGroup } from "../../../components/Accordion";

// import editSvg from "../../../assets/edit.svg";
// import viewSvg from "../../../assets/view.svg";
// import { cropProductionValidationSchema } from "../validation";

// /* ================= DROPDOWN DATA ================= */
// const seasonCropMap = {
//     Rabi: {
//         Wheat: ["HD-2967", "PBW-343"],
//         Mustard: ["Pusa Bold", "Varuna"],
//     },
//     Kharif: {
//         Rice: ["IR-64", "Swarna"],
//         Maize: ["HQPM-1", "DHM-117"],
//     },
// };

// /* ================= INITIAL VALUES ================= */
// const initialValues = {
//     season: "",
//     crop: "",
//     cropVariety: "",
//     productionInQtl: "",
//     estHarMarSupInQtl: "",
//     dateOfHarvesting: "",
//     estOrHar: "",
//     cropDescription: "",
// };

// export const CropProduction = () => {
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [uploadResetKey, setUploadResetKey] = useState(0);
//     const [publishOnEmart, setPublishOnEmart] = useState(false);
//     const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//     const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

//     const [productionList, setProductionList] = useState([]);

//     const uploadConfig = {
//         title: "Add Crop Image *",
//         maxSizeMB: "Max - 5mb",
//         allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
//     };

//     /* ================= FORMIK ================= */
//     const formik = useFormik({
//         initialValues,
//         validationSchema: cropProductionValidationSchema,
//         validateOnChange: false,
//         validateOnBlur: true,
//     });

//     /* ================= DEPENDENT DROPDOWNS ================= */
//     const crops = formik.values.season
//         ? Object.keys(seasonCropMap[formik.values.season])
//         : [];

//     const varieties =
//         formik.values.season && formik.values.crop
//             ? seasonCropMap[formik.values.season][formik.values.crop]
//             : [];

//     useEffect(() => {
//         formik.setFieldValue("crop", "");
//         formik.setFieldValue("cropVariety", "");
//     }, [formik.values.season]);

//     useEffect(() => {
//         formik.setFieldValue("cropVariety", "");
//     }, [formik.values.crop]);

//     /* ================= HANDLERS ================= */
//     const handleFileSelect = (file) => {
//         setUploadedImage(file ? URL.createObjectURL(file) : null);
//     };

//     const handleAddToProductionList = async () => {
//         const errors = await formik.validateForm();

//         if (Object.keys(errors).length > 0) {
//             formik.setTouched(
//                 Object.keys(errors).reduce((acc, key) => {
//                     acc[key] = true;
//                     return acc;
//                 }, {})
//             );
//             return;
//         }

//         setIsPreviewModalOpen(true);
//     };

//     const handlePreviewConfirm = () => {
//         setProductionList((prev) => [
//             ...prev,
//             {
//                 Season: formik.values.season,
//                 "Crop Name": formik.values.crop,
//                 Variety: formik.values.cropVariety,
//                 "Production (in Qtl.)": formik.values.productionInQtl,
//                 "Publish Emart": publishOnEmart,
//             },
//         ]);

//         setIsPreviewModalOpen(false);
//         setIsStatusModalOpen(true);

//         formik.resetForm();
//         setUploadedImage(null);
//         setPublishOnEmart(false);

//         // THIS resets UploadDocument completely
//         setUploadResetKey(prev => prev + 1);
//     };


//     /* ================= PREVIEW DATA ================= */
//     const previewData = [
//         { label: "Season", value: formik.values.season },
//         { label: "Crop", value: formik.values.crop },
//         { label: "Variety", value: formik.values.cropVariety },
//         { label: "Production (Qtl.)", value: formik.values.productionInQtl },
//         { label: "Marketable Surplus", value: formik.values.estHarMarSupInQtl },
//         { label: "Harvest Date", value: formik.values.dateOfHarvesting },
//         { label: "Estimated/Harvested", value: formik.values.estOrHar },
//         { label: "Description", value: formik.values.cropDescription },
//         { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
//     ];

//     /* ================= UI (UNCHANGED) ================= */
//     return (
//         <div>
//             <div className="border border-stroke-200 rounded-[8px] p-[16px]">
//                 <h2 className="text-base font-bold mb-6">Crop Production Update</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <SelectField
//                         label="Season"
//                         required
//                         name="season"
//                         value={formik.values.season}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.season}
//                         touched={formik.touched.season}
//                     >
//                         <option value="">Select Season</option>
//                         {Object.keys(seasonCropMap).map((s) => (
//                             <option key={s}>{s}</option>
//                         ))}
//                     </SelectField>

//                     <SelectField
//                         label="Crop"
//                         required
//                         name="crop"
//                         value={formik.values.crop}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.crop}
//                         touched={formik.touched.crop}
//                     >
//                         <option value="">Select Crop which is filtered by Season</option>
//                         {crops.map((c) => (
//                             <option key={c}>{c}</option>
//                         ))}
//                     </SelectField>

//                     <SelectField
//                         label="Crop Variety"
//                         required
//                         name="cropVariety"
//                         value={formik.values.cropVariety}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.cropVariety}
//                         touched={formik.touched.cropVariety}
//                     >
//                         <option value="">Select Crop Variety which is filtered by Crop Name</option>
//                         {varieties.map((v) => (
//                             <option key={v}>{v}</option>
//                         ))}
//                     </SelectField>

//                     <TextField
//                         label="Production (in Qtl.)"
//                         required
//                         type="number"
//                         name="productionInQtl"
//                         placeholder="Enter Value"
//                         value={formik.values.productionInQtl}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.productionInQtl}
//                         touched={formik.touched.productionInQtl}
//                     />

//                     <TextField
//                         label="Estimated/Harvested Marketable Surplus (in Qtl.)"
//                         required
//                         type="number"
//                         name="estHarMarSupInQtl"
//                         placeholder="Enter Value"
//                         value={formik.values.estHarMarSupInQtl}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.estHarMarSupInQtl}
//                         touched={formik.touched.estHarMarSupInQtl}
//                     />

//                     <TextField
//                         label="Date Of Harvesting"
//                         required
//                         type="date"
//                         name="dateOfHarvesting"
//                         value={formik.values.dateOfHarvesting}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.dateOfHarvesting}
//                         touched={formik.touched.dateOfHarvesting}
//                     />

//                     <TextField
//                         label="Estimated/Harvested"
//                         required
//                         name="estOrHar"
//                         placeholder="Estimated/Harvested"
//                         value={formik.values.estOrHar}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.errors.estOrHar}
//                         touched={formik.touched.estOrHar}
//                     />
//                 </div>

//                 <TextArea
//                     label="Crop Description"
//                     required
//                     name="cropDescription"
//                     placeholder="Enter Text"
//                     value={formik.values.cropDescription}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.errors.cropDescription}
//                     touched={formik.touched.cropDescription}
//                 />

//                 {/* Add Image */}
//                 <div className="mb-6">
//                     <AccordionGroup
//                         items={[
//                             {
//                                 id: 'add-image',
//                                 title: 'Add Image',
//                                 isInitiallyOpen: true,
//                                 content: (
//                                     <div className="p-4 bg-primary-50 rounded-lg">
//                                         <UploadDocument
//                                             key={uploadResetKey}
//                                             config={uploadConfig}
//                                             onFileSelect={handleFileSelect}
//                                         />
//                                     </div>
//                                 )
//                             }
//                         ]}
//                     />
//                 </div>

//                 <hr className="border border-stroke-200 my-4" />

//                 <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-grey-50 rounded-lg">
//                     <div className="flex items-center gap-4">
//                         <span className="text-sm font-medium">Want to Publish on e-Mart ?</span>
//                         <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
//                     </div>

//                     <div className="flex gap-4">
//                         <Button
//                             type="button"
//                             buttonClassName="px-6 py-2.5 text-sm font-semibold text-grey-700 bg-white border border-stroke-300 rounded-md shadow-sm hover:bg-grey-50 transition-colors"
//                         >
//                             Preview
//                         </Button>
//                         <Button
//                             type="button"
//                             onClick={handleAddToProductionList}
//                             buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md shadow-sm hover:bg-success-600 transition-colors flex items-center gap-2"
//                         >
//                             <span>+</span>
//                             Add to Production List
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             {/* <hr className="border border-stroke-200 mb-4" /> */}
//             <h3 className="font-bold text-base my-6">Crop Production Detail view form</h3>
//             <Table
//                 columns={["Season", "Crop Name", "Variety", "Production (in Qtl.)", "Actions"]}
//                 data={productionList}
//                 renderActions={(row) => (
//                     <div className="flex gap-2">
//                         <img src={editSvg} className="w-6 cursor-pointer" />
//                         <img src={viewSvg} className="w-6 cursor-pointer" />
//                         <span className="text-[10px] px-2 py-1 rounded">
//                             {row["Publish Emart"] ? "✓ Publish" : "Publish"}
//                         </span>
//                     </div>
//                 )}
//             />

//             <PreviewModal
//                 isOpen={isPreviewModalOpen}
//                 onClose={() => setIsPreviewModalOpen(false)}
//                 onConfirm={handlePreviewConfirm}
//                 title="Preview Crop Production"
//                 image={uploadedImage}
//                 data={previewData}
//             />

//             <StatusModal
//                 isOpen={isStatusModalOpen}
//                 onClose={() => setIsStatusModalOpen(false)}
//                 status
//                 message="Crop production details have been added successfully."
//             />
//         </div>
//     );
// };
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
    } else {
      setSeasons([]);
    }
  };

  const handleCropDropdown = async () => {
    if (formik.values.season) {
      const res = await getGeneralMasterByType("Crop");
      if (res.status === 200 && res.data.success) {
        setCrops(res.data.data.map((c) => c.name));
      }
    }
  };

  const handleVarietyDropdown = async () => {
    if (formik.values.crop) {
      const res = await getGeneralMasterByType("CropVariety");
      if (res.status === 200 && res.data.success) {
        setVarieties(res.data.data.map((v) => v.name));
      }
    }
  };

  useEffect(() => {
    formik.setFieldValue("crop", "");
    formik.setFieldValue("cropVariety", "");
    setCrops([]);
    setVarieties([]);
  }, [formik.values.season]);

  useEffect(() => {
    formik.setFieldValue("cropVariety", "");
    setVarieties([]);
  }, [formik.values.crop]);

  const fetchProductionList = async () => {
    const res = await listCropProduction(1);
    if (res.status === 200 && res.data.success) {
      const seasonsMaster = await getGeneralMasterByType("Season");
      const cropsMaster = await getGeneralMasterByType("Crop");
      const varietiesMaster = await getGeneralMasterByType("CropVariety");

      const mapped = res.data.data.map((item) => ({
        Season:
          seasonsMaster.data.data.find((s) => s.id === item.seasonId)?.name ||
          `Season ${item.seasonId}`,
        "Crop Name":
          cropsMaster.data.data.find((c) => c.id === item.cropId)?.name ||
          `Crop ${item.cropId}`,
        Variety:
          varietiesMaster.data.data.find((v) => v.id === item.cropVarietyId)?.name ||
          `Variety ${item.cropVarietyId}`,
        "Production (in Qtl.)": item.productionQuantity,
        "Publish Emart": item.emartPublish,
      }));

      setProductionList(mapped);
    }
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file); // store the actual file for upload
    setPreviewImage(file ? URL.createObjectURL(file) : null); // preview only
  };

  const handleAddToProductionList = async () => {
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
    let docId = null;
    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) {
        docId = uploadRes.data.documentId;
      }
    }

    const payload = {
      seasonId: seasons.indexOf(formik.values.season) + 1 || 1,
      cropId: crops.indexOf(formik.values.crop) + 1 || 1,
      cropVarietyId: varieties.indexOf(formik.values.cropVariety) + 1 || 1,
      productionQuantity: formik.values.productionInQtl,
      harvestedSurplus: formik.values.estHarMarSupInQtl,
      dateOfHarvesting: formik.values.dateOfHarvesting,
      estimatedOrHarvestedId: formik.values.estOrHar || 1,
      description: formik.values.cropDescription,
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    const res = await createCropProduction(payload);
    if (res.status === 200 && res.data.success) {
      setIsPreviewModalOpen(false);
      setIsStatusModalOpen(true);
      await fetchProductionList();
    }

    formik.resetForm();
    setUploadedFile(null);
    setPreviewImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
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
        <h2 className="text-base font-bold mb-6">Crop Production Update</h2>

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
            onClick={fetchSeasons}
          >
            <option value="">Select Season</option>
            {seasons.map((s) => (
              <option key={s}>{s}</option>
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
            onClick={handleCropDropdown}
          >
            <option value="">Select Crop which is filtered by Season</option>
            {crops.map((c) => (
              <option key={c}>{c}</option>
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
            onClick={handleVarietyDropdown}
          >
            <option value="">Select Crop Variety which is filtered by Crop Name</option>
            {varieties.map((v) => (
              <option key={v}>{v}</option>
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
            label="Estimated/Harvested Marketable Surplus (in Qtl.)"
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
            placeholder="Estimated/Harvested"
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
          placeholder="Enter Text"
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

        <hr className="border border-stroke-200 my-4" />

        <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Want to Publish on e-Mart ?</span>
            <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-grey-700 bg-white border border-stroke-300 rounded-md shadow-sm hover:bg-grey-50 transition-colors"
            >
              Preview
            </Button>
            <Button
              type="button"
              onClick={handleAddToProductionList}
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md shadow-sm hover:bg-success-600 transition-colors flex items-center gap-2"
            >
              <span>+</span>
              Add to Production List
            </Button>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-base my-6">Crop Production Detail view form</h3>
      <Table
        columns={["Season", "Crop Name", "Variety", "Production (in Qtl.)", "Actions"]}
        data={productionList}
        renderActions={(row) => (
          <div className="flex gap-2">
            <img src={editSvg} className="w-6 cursor-pointer" />
            <img src={viewSvg} className="w-6 cursor-pointer" />
            <span className="text-[10px] px-2 py-1 rounded">
              {row["Publish Emart"] ? "✓ Publish" : "Publish"}
            </span>
          </div>
        )}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title="Preview Crop Production"
        image={previewImage}
        data={previewData}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status
        message="Crop production details have been added successfully."
      />
    </div>
  );
};
