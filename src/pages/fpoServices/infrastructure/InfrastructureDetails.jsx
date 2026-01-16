import React, { useEffect, useState } from 'react';
import { TextField,SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';

import editSvg from "../../../assets/edit.svg"

import viewSvg from "../../../assets/view.svg"
import deleteSvg from "../../../assets/deleteAction.svg"
import unarchive from "../../../assets/unarchive.svg"
//import { AccordionGroup } from '../../../components/Accordion';
import { useFormik } from "formik";
import * as Yup from "yup";
import { infraDetailsValidationSchema } from '../validation';

import Toggle from "../../../components/Toggle";
export const InfrastructureDetails = () => {
    

    const initialInfrastructureDetailsData = {
    category: '',
    subCategory:'',
    unit:'',
    capacity: 0,
   
  };

    
    const [infraDetailList, setInfraDetailList] = useState([
        {
            id: 1,
            'Infra Category': 'Cultivation',
            'Infra Subcategory': 'Greenhouse/ Polyhouse',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':20
        },
        
        {
           id: 3,
            'Infra Category': 'Processing',
            'Infra Subcategory':'Seed Processing Unit',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':20
        },
        {
           id: 4,
            'Infra Category': 'Processing',
           'Infra Subcategory':'Seed Processing Unit',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':20
        },
        
        {
           id: 6,
            'Infra Category': 'Processing',
            'Infra Subcategory':'Seed Processing Unit',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':20
        }
    ]);

    const [archivedInfraList, setArchivedInfraList] = useState([
        {
            id: 5,
            'Infra Category': 'Cultivation',
            'Infra Subcategory': 'Greenhouse/ Polyhouse',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':500
        },
        
        
        {
           id: 2,
            'Infra Category': 'Processing',
            'Infra Subcategory':'Seed Processing Unit',
            'Unit': 'Suare Feet (SqF)',
            'Available Capacity':80
        }
    ]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);
    const [infraData, setInfraData] = useState(initialInfrastructureDetailsData);
    const [infraErrors, setInfraErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [tobeUnarchived,setToBeUnarchived]= useState({});
    const [optionsData,setoptionsData] = useState(
        [
            {
            value:"Greenhouse/ Polyhouse",
            label:"Greenhouse/ Polyhouse" },
            {
                value:"Hardening Chamber ",
                label:"Hardening Chamber "
            },
            {
                value:"Tissue Culture Facility",
                label:"Tissue Culture Facility"
            },
            {
                value:"Drone Facility",
                label:"Drone Facility"
            }

        ])
   

    /* ================= FORMIK ================= */
      const formik = useFormik({
        initialValues: initialInfrastructureDetailsData,
        validationSchema: infraDetailsValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
      });
   
    /* ================= SYNC FORM VALUES TO STATE ================= */
      useEffect(() => {
        const syncForm = async () => {
          const errors = await formik.validateForm();
          setInfraErrors(errors);
          setInfraData({ ...formik.values });
        };
        syncForm();
      }, [formik.values]);
    
   
    /* ================= SAVE CLICK VALIDATION ================= */
      useEffect(() => {
        if (!isSaveClicked) return;
    
        const validateAndSubmit = async () => {
          const errors = await formik.validateForm();
          setInfraErrors(errors);
          console.log("values :", infraData);
          console.log("errors :", infraErrors);
    
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
            
    
            setInfraData(initialInfrastructureDetailsData);
            formik.resetForm();
            // setIsOrganicFarming(false);
            setInfraErrors({});
          } catch (error) {
            console.error("Error adding Infrastructure Details:", error);
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

  
  const handleReset = () => {
    setInfraData(initialInfrastructureDetailsData);
    setIsOther(false);
    setInfraErrors({});
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
                
                 'Infra Category': formik.values.category,
            'Infra Subcategory': formik.values.subCategory,
            'Unit': formik.values.unit,
            'Available Capacity':formik.values.capacity
               
            };
            setInfraDetailList(prev => [...prev, newItem]);

           
            setStatusConfig({ success: true, message: 'Infrastructure added successfully.' });
        } else if (pendingAction === 'update') {
            setIsSaveClicked(true);
            setInfraDetailList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                         'Infra Category': archivedInfraList,
            'Infra Subcategory': formik.values.subCategory,
            'Unit': formik.values.unit,
            'Available Capacity':formik.values.capacity
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Infrastructure Details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setInfraDetailList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'FPO Capital details deleted successfully.' });
        }
        else if (pendingAction === 'unarchive') {
            const newItem = {
                id: editingId,
                
                 'Infra Category': tobeUnarchived.category,
            'Infra Subcategory': tobeUnarchived.subCategory,
            'Unit': tobeUnarchived.unit,
            'Available Capacity':tobeUnarchived.capacity
               
            };
            setInfraDetailList(prev => [...prev, newItem]);

           
            setStatusConfig({ success: true, message: 'Infrastructure unarchived successfully.' });
            setArchivedInfraList(prev => prev.filter(item => item.id !== editingId));
            //setStatusConfig({ success: true, message: 'FPO Capital details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };

    const resetForm = () => {
        setInfraData(initialInfrastructureDetailsData);
        setIsOther(false);
        setIsEditMode(false);
        setEditingId(null);
        handleReset();
    };

    const handleEdit = (row) => {
        console.log("row: "+row)

        //handleChangeOnselectCategory(row)
        subCategoryLoading(row['Infra Category']);
        unitLoading(row['Infra Subcategory']);
        const editValues = {
        category: row['Infra Category'],
        subCategory: row['Infra Subcategory'],
        unit: row['Unit'],
        capacity: row['Available Capacity'],
    };
    
   
    // Update local state
    setInfraData(editValues);
    
    // UPDATE FORMIK STATE (This is the missing step)
    formik.setValues(editValues);
        
        setIsEditMode(true);
        setEditingId(row.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    const handleUnArchive = (row) => {
        setEditingId(row.id);
        setToBeUnarchived({
            category: row['Infra Category'],
        subCategory: row['Infra Subcategory'],
        unit: row['Unit'],
        capacity: row['Available Capacity'],
        })
        setPendingAction('unarchive');
        setIsConfirmationOpen(true);
    };

    const subCategoryLoading = (value) => {
        infraData.unit ="";
        if(value==="Cultivation"){
            setoptionsData([
            {
            value:"Greenhouse/ Polyhouse",
            label:"Greenhouse/ Polyhouse" },
            {
                value:"Hardening Chamber",
                label:"Hardening Chamber"
            },
            // {
            //     value:"Tissue Culture Facility",
            //     label:"Tissue Culture Facility"
            // },
            // {
            //     value:"Drone Facility",
            //     label:"Drone Facility"
            // }

        ]);
        
        }
        else if(value==="Processing"){
            setoptionsData([
            {
            value:"Seed Processing Unit",
            label:"Seed Processing Unit" },
            {
                value:"Food Processing Unit",
                label:"Food Processing Unit"
            },
            // {
            //     value:"Integrated Packhouse",
            //     label:"Integrated Packhouse"
            // },
            // {
            //     value:"Ripening Chamber",
            //     label:"Ripening Chamber"
            // },
            // {
            //     value:"Washing facility",
            //     label:"Washing facility"
            // },
            // {
            //     value:"Sorting machines",
            //     label:"Sorting machines"
            // },
            // {
            //     value:"Grading machines",
            //     label:"Grading machines"
            // },
            // {
            //     value:"Packaging machines",
            //     label:"Packaging machines"
            // },
            // {
            //     value:"Flour Mill",
            //     label:"Flour Mill"
            // },
            // {
            //     value:"Oil Extraction Unit",
            //     label:"Oil Extraction Unit"
            // },
            // {
            //     value:"Spices Milling Unit",
            //     label:"Spices Milling Unit"
            // },
            {
                value:"Others",
                label:"Others"
            }

        ]);
        }
        formik.setValues(infraData)

    }

    const handleChangeOnselectCategory = (e) =>{
        setIsOther(false);
        subCategoryLoading(e.target.value);
        handleChange(e);
    }

    const unitLoading = (value) =>{
        if( value === 'Greenhouse/ Polyhouse' || value === 'Hardening Chamber')
        {
            const unit = 'Suare Feet (SqF)';
            infraData.unit = unit ;
            

        }
        else  if(value === 'Seed Processing Unit')
        {
            const unit = 'Quintals per day';
            infraData.unit = unit ;
            

        }
        else if(value==='Food Processing Unit'){
             const unit = 'Kg/Liters per day';
            infraData.unit = unit ;
        }
        else{
            if(value==='Others'){
                setIsOther(true);
            }
            const unit = 'Metric tons (MT)';
            infraData.unit = unit ;
        }
        formik.setValues(infraData);
        
    }
    const handleChangeOnSelectSubCategory = (e)=>{

        setIsOther(false);
        const value = e.target.value;
        unitLoading(value);
        handleChange(e);
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h2 className="text-xl font-semibold text-grey-900 mb-6">Infrastructure Update Form</h2>

               {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                        label="Infrastructure Category"
                        name="category"
                        required
                        // value={formik.values.isGrantReceived}
                        value={infraData.category}
                        onChange={handleChangeOnselectCategory}
                        onBlur={formik.handleBlur}
                        error={infraErrors.category}
                        touched={formik.touched.category}
                    >
                        <option value="">Select</option>
                        <option value="Cultivation">Cultivation</option>
                        <option value="Processing">Processing</option>
                        
                    </SelectField>

                    <SelectField
                        label="Infrastructure SubCategory"
                        name="subCategory"
                        required
                        // value={formik.values.isGrantReceived}
                        value={infraData.subCategory}
                        onChange={handleChangeOnSelectSubCategory}
                        onBlur={formik.handleBlur}
                        error={infraErrors.subCategory}
                        touched={formik.touched.subCategory}
                    >
                        <option value="">Select Subcategory</option>

                        {optionsData.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
                        
                        
                    </SelectField>


                    
    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        {isOther && (<TextField
                        label="Other Facilities"
                        name="other"
                        placeholder="Enter Other Facilities"
                        // required
                        // disabled = {true}
                       // value={formData.totalEquity}
                       // onChange={handleInputChange}
                       //onChange={handleChange}
                    //    value={formik.values.totalEquity}
                    value={infraData.other}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={infraErrors.other}
                        touched={formik.touched.other}
                        
                    />)}

                    <TextField
                        label="Unit"
                        name="unir"
                        placeholder="Enter Unit"
                        required
                        disabled = {true}
                       // value={formData.totalEquity}
                       // onChange={handleInputChange}
                       //onChange={handleChange}
                    //    value={formik.values.totalEquity}
                    value={infraData.unit}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={infraErrors.unit}
                        touched={formik.touched.unit}
                        
                    />

        

                    
       

       
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <TextField
                        label="Available Capacity"
                        name="capacity"
                        type="number"
                        // value={formik.values.grantReceived}
                        value={infraData.capacity}
                         placeholder="Enter Value"
                        required
                        
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={infraErrors.capacity}
                        touched={formik.touched.capacity}
                    />
      

                         </div>

                 
                

                <div className="flex justify-end gap-4 mt-8">
                    {/* <div className=" w-full">
                        <div
                    className="w-full bg-grey-100 rounded-xl p-4 cursor-pointer flex justify-between items-center"
                    
                >
                        
                         <span className="text-sm font-medium">Is the farmer doing organic farming?</span>
                        <Toggle checked={isOrganicFarming} onChange={setIsOrganicFarming} />
                        </div>
                      </div> */}
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
                                <span>+</span> Update Infrastructure Details
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
                <h3 className="text-lg font-semibold text-grey-900 mb-6">Active Infrastructures</h3>
                <Table

                    columns={[
                        'Infra Category',
            'Infra Subcategory',
            'Unit',
            'Available Capacity',
               
                        
                        "Actions"
                    ]}
                    data={infraDetailList}
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

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200" >
                <h3 className="text-lg font-semibold text-grey-900 mb-6">Archived Infrastructures</h3>
                <Table

                    columns={[
                        'Infra Category',
            'Infra Subcategory',
            'Unit',
            'Available Capacity',
               
                        
                        "Actions"
                    ]}
                    data={archivedInfraList}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            {/* <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" /> */}
                            <img src={unarchive} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleUnArchive(row)} />
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
