import React, { useEffect, useState } from 'react';
import { TextField,SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';

import editSvg from "../../../assets/edit.svg"

import viewSvg from "../../../assets/view.svg"
import deleteSvg from "../../../assets/deleteAction.svg"
//import { AccordionGroup } from '../../../components/Accordion';
import { useFormik } from "formik";
import * as Yup from "yup";
import { landDetailsValidationSchema } from '../validation';

import Toggle from "../../../components/Toggle";
export const FarmerLandDetails = () => {
    // const [formData, setFormData] = useState({
    //     totalEquity: 0,
    //     isGrantReceived: '',
    //     grantReceived: 0
    // });

    const initialLandDetailsData = {
    farmerName: '',
    fatherOrHusbandName: '',
    ownershipType:'',
    area: 0,
    isOrganic: false
  };

    //const [uploadedFile, setUploadedFile] = useState(null);
    const [landDetailList, setLandDetailList] = useState([
        {
            id: 1,
            'Farmer Name': 'abcd',
            'Father\'s/Husband\'s Name': 'xyz',
            'Type of Ownership': 'Owned',
            'Area of Farm (Hectare)':20,
            'Organic Farming': true
        },
        {
           id: 2,
            'Farmer Name': 'lmn',
            'Father\'s/Husband\'s Name': 'pqr',
            'Type of Ownership': 'Leased',
            'Area of Farm (Hectare)':100,
            'Organic Farming': false
        }
    ]);

    const[farmersList] =useState([
        {
            fname: 'amm',
            fhname:'abbb'
        },
        {
            fname: 'abc',
            fhname:'axy'
        }
    ]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);
    const [landDetailData, setLandDetailData] = useState(initialLandDetailsData);
    const [landDetailErrors, setLandDetailErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [isOrganicFarming, setIsOrganicFarming] = useState(false);

    /* ================= FORMIK ================= */
      const formik = useFormik({
        initialValues: initialLandDetailsData,
        validationSchema: landDetailsValidationSchema,
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
          setLandDetailErrors(errors);
          setLandDetailData({ ...formik.values });
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
          setLandDetailErrors(errors);
          console.log("values :", landDetailData);
          console.log("errors :", landDetailErrors);
    
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
    
            setLandDetailData(initialLandDetailsData);
            formik.resetForm();
            setIsOrganicFarming(false);
            setLandDetailErrors({});
          } catch (error) {
            console.error("Error adding FPO Equity Capital:", error);
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

  const handleChangeforFatherOrHusbandName = (e) =>{

    console.log("e.target.name: "+e.target.name);
    console.log("e.target.value: "+e.target.value);
    // const fhname = farmersList.filter(f => {

    //     console.log("f.fhname: "+f.fhname);
    //     if(f.fname===e.target.value)
    //     return f.fhname

    //     else return ""
    // });
    const farmer = farmersList.find(f => 
        f.fname===e.target.value
       );

    landDetailData.fatherOrHusbandName =  farmer.fhname;
    console.log("landDetailData.fatherOrHusbandName: "+landDetailData.fatherOrHusbandName);
    formik.setFieldValue('fatherOrHusbandName',landDetailData.fatherOrHusbandName);
    handleChange(e);
  }
  const handleReset = () => {
    setLandDetailData(initialLandDetailsData);
    setIsOrganicFarming(false);
    //formik.resetForm();
   //formik.setValues(initialLandDetailsData)
    setLandDetailErrors({});
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
                'Farmer Name': formik.values.farmerName,
                'Father\'s/Husband\'s Name': formik.values.fatherOrHusbandName,
                'Type of Ownership': formik.values.ownershipType,
                'Area of Farm (Hectare)':formik.values.area,
                'Organic Farming':isOrganicFarming
                //'Balance Sheet': !!uploadedFile
            };
            setLandDetailList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'FPO Capital details added successfully.' });
        } else if (pendingAction === 'update') {
            setIsSaveClicked(true);
            setLandDetailList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        'Farmer Name': formik.values.farmerName,
                'Father\'s/Husband\'s Name': formik.values.fatherOrHusbandName,
                'Type of Ownership': formik.values.ownershipType,
                'Area of Farm (Hectare)':formik.values.area,
                'Organic Farming':isOrganicFarming
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'FPO Capital details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setLandDetailList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'FPO Capital details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };

    const resetForm = () => {
        setLandDetailData(initialLandDetailsData);
        //setUploadedFile(null);
        setIsEditMode(false);
        setEditingId(null);
        setIsOrganicFarming(false);
        handleReset();
    };

    const handleEdit = (row) => {
        console.log("row: "+row)

        const editValues = {
        farmerName: row['Farmer Name'],
        fatherOrHusbandName: row['Father\'s/Husband\'s Name'],
        ownershipType: row['Type of Ownership'],
        area: row['Area of Farm (Hectare)'],
        isOrganic: row['Organic Farming'],
    };
    
    setIsOrganicFarming(row['Organic Farming'])
    // Update local state
    setLandDetailData(editValues);
    
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
                <h2 className="text-xl font-semibold text-grey-900 mb-6">FPO Capital Update Form</h2>

               {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                        label="Farmer Name"
                        name="farmerName"
                        required
                        // value={formik.values.isGrantReceived}
                        value={landDetailData.farmerName}
                        onChange={handleChangeforFatherOrHusbandName}
                        onBlur={formik.handleBlur}
                        error={landDetailErrors.farmerName}
                        touched={formik.touched.farmerName}
                    >
                        <option value="">Select</option>
                        <option value="amm">amm</option>
                        <option value="abc">abc</option>
                        
                    </SelectField>


                    <TextField
                        label="Father's/Husband's Name"
                        name="fatherOrHusbandName"
                        placeholder="Enter Value"
                        required
                        disabled = {true}
                       // value={formData.totalEquity}
                       // onChange={handleInputChange}
                       //onChange={handleChange}
                    //    value={formik.values.totalEquity}
                    value={landDetailData.fatherOrHusbandName}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={landDetailErrors.fatherOrHusbandName}
                        touched={formik.touched.fatherOrHusbandName}
                        
                    />
    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

        <SelectField
                        label="Type of Ownership"
                        name="ownershipType"
                        required
                        // value={formik.values.isGrantReceived}
                        value={landDetailData.ownershipType}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={landDetailErrors.ownershipType}
                        touched={formik.touched.ownershipType}
                    >
                        <option value="">Select</option>
                        <option value="Owned">Owned</option>
                        <option value="Leased">Leased</option>
                        <option value="Rented">Rented</option>
                        
                    </SelectField>


                    
       <TextField
                        label="Area of Farm (Hectare)"
                        name="area"
                        type="number"
                        // value={formik.values.grantReceived}
                        value={landDetailData.area}
                         placeholder="Enter Value"
                        required
                        
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={landDetailErrors.area}
                        touched={formik.touched.area}
                    />
      


       
                         </div>

                 
                

                <div className="flex justify-end gap-4 mt-8">
                    <div className=" w-full">
                        <div
                    className="w-full bg-grey-100 rounded-xl p-4 cursor-pointer flex justify-between items-center"
                    
                >
                        {/* <div className="col-span-12 md:col-span-4"> */}
                         <span className="text-sm font-medium">Is the farmer doing organic farming?</span>
                        <Toggle checked={isOrganicFarming} onChange={setIsOrganicFarming} />
                        {/* </div> */}</div>
                      </div>
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
                                <span>+</span> Update Land Details
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
                {/* <h3 className="text-lg font-semibold text-grey-900 mb-6">FPO Capital Details View Table</h3> */}
                <Table

                    columns={[
                        "Farmer Name",
                        "Father's/Husband's Name",
                        "Type of Ownership",
                        "Area of Farm (Hectare)",
                        "Actions"
                    ]}
                    data={landDetailList}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                    // renderColumn={(col, value) => {
                    //     if (col === "Whether Equity Grant Received?") {
                    //         return (
                    //             <div className="flex justify-center">
                    //                 <span className={`w-6 h-6 flex items-center justify-center rounded-full ${value ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                    //                     {value ? '✓' : '✕'}
                    //                 </span>
                    //             </div>
                    //         );
                    //     }
                    //     return value;
                    // }}
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
