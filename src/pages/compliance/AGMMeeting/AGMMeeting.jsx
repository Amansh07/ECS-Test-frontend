import React, { useEffect, useState } from 'react';
import { TextField,SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import UploadDocument from '../../../components/UploadDocument';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';

import editSvg from "../../../assets/edit.svg"
import viewSvg from "../../../assets/view.svg"
import deleteSvg from "../../../assets/deleteAction.svg"
//import { AccordionGroup } from '../../../components/Accordion';
import { useFormik } from "formik";
import { AGMMeetingValidationSchema } from '../validation';
import * as Yup from "yup";

export const AGMMeeting = () => {
    // const [formData, setFormData] = useState({
    //     totalEquity: 0,
    //     isGrantReceived: '',
    //     grantReceived: 0
    // });

    const initialAGMData = {
    financialYear: '',
    //isAgmConducted: '',
    agmCount: 0,
    uploadFileURL:''
  };
  const [uploadedFile, setUploadedFile] = useState(null);
  //const [uploadResetKey, setUploadResetKey] = useState(0);
  const uploadConfig = {
        title: "Add Proof of Meeting *",
        maxSizeMB: "5",
        allowedTypes: ["image/jpeg", "image/png", "image/jpg","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    };

    //const [uploadedFile, setUploadedFile] = useState(null);
    const [agmList, setAgmList] = useState([
        {
            id: 1,
            'Financial Year': '2024-2025',
            'Meeting conducted in last one year': 'Yes',
            'AGM Count': 1000000,
            'Meeting Proof': 'MOM.pdf'
        },
        {
           id: 2,
            'Financial Year': '2022-2023',
            'Meeting conducted in last one year': 'No',
            'AGM Count': 0,
            'Meeting Proof': 'MOM2.pdf'
        }
    ]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);
    const [agmData, setAgmData] = useState(initialAGMData);
    const [agmErrors, setAgmErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);

    /* ================= FORMIK ================= */
      const formik = useFormik({
        initialValues: initialAGMData,
        validationSchema: AGMMeetingValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
      });
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log("name: "+name+" value: "+value);
        

    //    // setFormData(prev => ({ ...prev, [name]: value }));
        
    // };

    /* ================= SYNC FORM VALUES TO STATE ================= */
      useEffect(() => {
        const syncForm = async () => {
          const errors = await formik.validateForm();
          setAgmErrors(errors);
          setAgmData({ ...formik.values });
        };
        syncForm();
      }, [formik.values]);
    
    // const handleFileSelect = (file) => {
    //     setUploadedFile(file);
    // };

    /* ================= SAVE CLICK VALIDATION ================= */
      useEffect(() => {
        if (!isSaveClicked) return;
    
        const validateAndSubmit = async () => {
          const errors = await formik.validateForm();
          setAgmErrors(errors);
          console.log("values :", agmData);
          console.log("errors :", agmErrors);
    
          if (Object.keys(errors).length > 0) {
            formik.setTouched(
              Object.keys(errors).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            );
            setIsSaveClicked(false);
            return;
          }
    
          try {
            //await addBoardMember(boardMemberCooperativeData);
            //alert("FPO Equity Capitl added successfully!");
    
            setAgmData(initialAGMData);
            formik.resetForm();
            setAgmErrors({});
          } catch (error) {
            console.error("Error adding AGM Details:", error);
          } finally {
            setIsSaveClicked(false);
          }
        };
    
        validateAndSubmit();
      }, [isSaveClicked]);
    
      /* ================= HANDLERS ================= */
  const handleChange = (e) => {formik.handleChange(e);
    console.log("e "+e);
  };

  const handleFileSelect = (file) => {
        if (file) {
            console.log("file selected");
            const fileUrl = URL.createObjectURL(file);
            console.log("fileUrl: "+fileUrl)
            setUploadedFile(fileUrl);
        } else {
            console.log("No file selected");
            setUploadedFile(null);
        }
         console.log("setUploadedFile "+uploadedFile);
        agmData.uploadFileURL= uploadedFile;
        formik.setFieldValue('uploadFileURL',agmData.uploadFileURL);
        console.log("agmData.uploadFileURL: "+agmData.uploadFileURL);
    };


  const handleReset = () => {
    setAgmData(initialAGMData);
    //formik.resetForm();
    setAgmErrors({});
  };

    const handleAddOrUpdate = () => {
        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            setIsSaveClicked(true);

            const newItem = {
                id: Date.now,
                'Financial Year': formik.values.financialYear,
                'Meeting conducted in last one year': formik.values.isAgmConducted,
                'AGM Count': formik.values.agmCount,
                'Meeting Proof': !!uploadedFile
            };
            setAgmList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'AGM Details added successfully.' });
        } else if (pendingAction === 'update') {
            setIsSaveClicked(true);
            setAgmList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        'Financial Year': formik.values.financialYear,
                        'Meeting conducted in last one year': formik.values.isAgmConducted,
                        'AGM Count': formik.values.agmCount,
                        'Meeting Proof': !!uploadedFile
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'AGM details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setAgmList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'AGM details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };

    const resetForm = () => {
        setAgmData(initialAGMData);
        //setUploadedFile(null);
        setIsEditMode(false);
        setEditingId(null);
        handleReset();
    };

    const handleEdit = (row) => {
        console.log("row: "+row)

        const editValues = {
        financialYear: row['Financial Year'],
        isAgmConducted: row['Meeting conducted in last one year'],
        agmCount: row['AGM Count']
    };
    
    // Update local state
    setAgmData(editValues);
    
    // UPDATE FORMIK STATE (This is the missing step)
    formik.setValues(editValues);
        
        // setFpoCapitalData({
        //     totalEquity: row['Total FPO Equity Capital(in Rupees)'],
        //     isGrantReceived: row['Whether Equity Grant Received?'],
        //     grantReceived: row['FPO Equity Grant Received(in Rupees)']
            
        // });
        //setFpoCapitalData(formData);
        setIsEditMode(true);
        setEditingId(row.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h2 className="text-xl font-semibold text-grey-900 mb-6">AGM Meeting Update/View</h2>

               {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                        label="Financial Year"
                        name="financialYear"
                        required
                        // value={formik.values.isGrantReceived}
                        value={agmData.financialYear}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={agmErrors.financialYear}
                        touched={formik.touched.financialYear}
                    >
                        <option value="">Select Financial Year</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2023-2024">2022-2023</option>
                        
                    </SelectField>

                    {/* <SelectField
                        label="Was annual general meeting conducted in the last one year?"
                        name="isAgmConducted"
                        required
                        // value={formik.values.isGrantReceived}
                        value={agmData.isAgmConducted}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={agmErrors.isAgmConducted}
                        touched={formik.touched.isAgmConducted}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        
                    </SelectField> */}


    {/* </div>
                  to be commented   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> */}

        

                    {/* {agmData.isAgmConducted === 'Yes' && ( */}
       <TextField
                        label="AGM Count"
                        name="agmCount"
                        // value={formik.values.grantReceived}
                        value={agmData.agmCount}
                         placeholder="Enter Value"
                        required
                        
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={agmErrors.agmCount}
                        touched={formik.touched.agmCount}
                    />
      {/* )} */}

{/* {(agmData.isAgmConducted === 'No' || agmData.isAgmConducted === '' ) && (
       <TextField
                        label="AGM Count"
                        name="grantReceived"
                        value={agmData.agmCount}
                         placeholder="Enter Value"
                         disabled = {true}
                        //required
                        
                       // onChange={handleInputChange}
                        //onBlur={formik.handleBlur}
                        //error={fpoCapitalErrors.grantReceived}
                        //touched={formik.touched.grantReceived}
                    />
      )} */}
                         </div>
                         <div className='mb-6'>
                             <div className="mt-4 p-4 bg-primary-100 rounded-xl">
                        <UploadDocument
                            //key={uploadResetKey}
                            config={uploadConfig}
                            onFileSelect={handleFileSelect}
                        />
                    </div>
                         </div>

                

                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        buttonClassName="px-8 py-2.5 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium"
                        onClick={resetForm}
                    >
                        <div className='flex items-center gap-3'>
                     <span> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.23 1.7625C9.1425 0.675 7.65 0 5.9925 0C2.6775 0 0 2.685 0 6C0 9.315 2.6775 12 5.9925 12C8.79 12 11.1225 10.0875 11.79 7.5H10.23C9.615 9.2475 7.95 10.5 5.9925 10.5C3.51 10.5 1.4925 8.4825 1.4925 6C1.4925 3.5175 3.51 1.5 5.9925 1.5C7.2375 1.5 8.3475 2.0175 9.1575 2.835L6.7425 5.25H11.9925V0L10.23 1.7625Z" fill="#253300"/>
</svg></span><span>Reset Form</span></div>
 
                    </Button>
                    <Button
                        disabled={Object.keys(formik.errors).length !== 0}
                        buttonClassName="px-8 py-2.5 bg-success text-white rounded-md hover:bg-success-dark font-medium flex items-center gap-2"
                        onClick={handleAddOrUpdate}
                    >
                        {isEditMode ? (
                            <>
                                <span>+</span> Update AGM Details
                            </>
                        ) : (
                            <>
                                <span></span> Save
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h3 className="text-lg font-semibold text-grey-900 mb-6">AGM Meeting Update Detail View</h3>
                <Table

                    columns={[
                        'Financial Year',
                        'Meeting conducted in last one year',
                        'AGM Count',
                        'Meeting Proof',
                        "Actions"
                    ]}
                    data={agmList}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                    renderColumn={(col, value) => {
                        if (col === "Meeting conducted in last one year") {
                            return (
                                <div className="flex justify-center">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full ${value ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                                        {value ? '✓' : '✕'}
                                    </span>
                                </div>
                            );
                        }
                        return value;
                    }}
                />
            </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                title={pendingAction === 'delete' ? 'Delete Record' : pendingAction?.charAt(0)?.toUpperCase() + pendingAction?.slice(1) + " Record"}
                description={
                    pendingAction === 'delete'
                        ? 'Are you sure you want to delete this record?'
                        : `Are you sure you want to ${pendingAction} these details?`
                }
            />

            <StatusModal
                isOpen={isStatusOpen}
                onClose={() => setIsStatusOpen(false)}
                status={statusConfig.success}
                message={statusConfig.message}
            />
        </div>
    );
};
