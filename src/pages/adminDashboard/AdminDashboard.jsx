import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectField, RadioGroup, TextArea } from '../../components/FormFields';
import { Button } from '../../components/Buttons';
import Table from '../../components/Table';
import ConfirmationModal from '../../components/ConfirmationModal';
import StatusModal from '../../components/StatusModal';
import Loader from '../../components/Loader';
import Toggle from '../../components/Toggle';
import WorkflowActionModal from '../../components/WorkflowActionModal';
import {
    getWorkflowStats,
    getWorkflowActions,
    processWorkflowAction,
    getFPORegistrationList
} from '../../api/workflow';
import RegistrationForm from '../registration/RegistrationForm';
import { getGeneral } from '../../api/master';
import ViewForm from './ViewForm';



// ----------------------------------------------------------------------
// Dashboard Tile Component
// ----------------------------------------------------------------------
const DashboardTile = ({ icon, count, title, isActive, onClick, tileClasses }) => {
    return (
        <div
            onClick={onClick}
            className={tileClasses}
        >
            <div className={`
                flex items-center justify-center w-14 h-14 rounded-xl bg-white text-primary-900 shrink-0
            `}>
                {icon}
            </div>
            <div className="flex flex-col z-10">
                <span className="text-4xl font-bold leading-none mb-1">{count}</span>
                <span className="text-sm font-medium opacity-90">{title}</span>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// Header Component
// ----------------------------------------------------------------------
const HeaderSection = () => (
    <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
    </div>
);



const AdminDashboard = () => {
    const [activeTile, setActiveTile] = useState('pending');
    // We track if the form is "active" (i.e. user clicked edit on a row)
    const [isFormActive, setIsFormActive] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    // Store the entire selected row object
    const [selectedRow, setSelectedRow] = useState(null);
    // Workflow statistics from API
    const [stats, setStats] = useState({
        totalApproved: 0,
        totalPending: 0,
        totalRejected: 0,
        totalSubmitted: 0
    });

    console.log(selectedRow);

    // Table Data from API
    const [tableData, setTableData] = useState([]);

    // Modal State
    const [confirmationModal, setConfirmationModal] = useState({
        isOpen: false,
        title: '',
        description: '',
        onConfirm: null
    });
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        status: false,
        message: ''
    });

    // Store available actions for the selected row
    const [workflowActions, setWorkflowActions] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState([]);

    // ----------------------------------------------------------------------
    // Formik Configuration
    // ----------------------------------------------------------------------

    // Dynamic Validation Schema based on workflow actions
    // We need to know which ID corresponds to "Reject" to enforce rejectionReason
    const validationSchema = React.useMemo(() => {
        return Yup.object().shape({
            action: Yup.number().required('Selection is required'),
            rejectionReason: Yup.string().when('action', {
                is: (actionId) => {
                    const action = workflowActions.find(a => a.actionId === Number(actionId));
                    return action?.actionName?.toLowerCase() === 'reject';
                },
                then: (schema) => schema.required('Rejection reason is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
            comment: Yup.string()
                .trim()
                .required('Comment is required')
                .max(100, 'Comment must be 100 characters or less'),
            notification: Yup.boolean(),
        });
    }, [workflowActions]);

    const formik = useFormik({
        initialValues: {
            action: '',
            rejectionReason: '',
            comment: '',
            notification: true, // Defaulting to true as per payload example
        },
        validationSchema,
        onSubmit: (values) => {
            // Trigger Confirmation Modal
            const selectedAction = workflowActions.find(a => a.actionId === Number(values.action));
            const isApprove = selectedAction?.actionName?.toLowerCase() === 'approve';

            setConfirmationModal({
                isOpen: true,
                title: isApprove ? 'Approve Registration?' : 'Reject Registration?',
                description: isApprove
                    ? 'Are you sure you want to approve this registration? This action cannot be undone.'
                    : 'Are you sure you want to reject this registration? The user will be notified.',
                onConfirm: () => handleConfirmSave(values)
            });
        },
    });

    // Handle actual API call
    const handleConfirmSave = async (values) => {
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        setIsLoading(true);

        try {
            // Find the correct action ID from the stored workflow actions
            // Map form value 'approve' -> API action 'Approve', 'reject' -> 'Reject'
            // The form now directly provides the actionId, so we just need to find the actionName for logic
            const selectedAction = workflowActions.find(a => a.actionId === Number(values.action));
            const isReject = selectedAction?.actionName?.toLowerCase() === 'reject';

            if (!selectedAction) {
                setStatusModal({
                    isOpen: true,
                    status: false,
                    message: "Selected action is not available for this record."
                });
                setIsLoading(false);
                return;
            }

            // Step 2: Proceed with Save if actions are available
            const payload = {
                fpoId: selectedRow?.id,
                actionId: values.action, // Use values.action directly as it's the ID
                userId: 1, // Hardcoded as requested
                remarks: values.comment,
                rejectionReason: isReject ? values.rejectionReason : null,
                sendNotification: values.notification
            };

            const response = await processWorkflowAction(payload);

            if (response && response.success) {
                setStatusModal({
                    isOpen: true,
                    status: true,
                    message: response.message || 'Workflow action processed successfully'
                });
                // Refresh data
                fetchStats();
                fetchTableData();
                handleReset();
                setIsActionModalOpen(false);
            } else {
                throw new Error(response?.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Workflow API Error:', error);
            setStatusModal({
                isOpen: true,
                status: false,
                message: error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const data = await getWorkflowStats();
            if (data.success && data.data) {
                console.log(data.data);
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching workflow stats:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchRejectionReasons = async () => {
        try {
            const response = await getGeneral('rejection_reason');
            if (response && response.success) {
                setRejectionReasons(response.data);
            }
        } catch (error) {
            console.error('Error fetching rejection reasons:', error);
        }
    };

    const fetchTableData = async (statusId = 1) => {
        setIsLoading(true);
        try {
            const data = await getFPORegistrationList(0, 10, statusId);
            console.log(data, 'res');
            if (data.success && data.data) {
                // Map API response to table format
                const mappedData = data.data.map(item => ({
                    id: item.id,
                    blockId: item.blockId,
                    fpoName: item.companyDetails?.companyName || item.societyDetails?.societyName || 'N/A',
                    regNo: item.fpoRegNo,
                    farmers: item.totalFarmers,
                    reqDate: item.fpoRegDt || 'N/A',
                    // Store complete item for editing
                    ...item
                }));
                setTableData(mappedData);
            }
        } catch (error) {
            console.error('Error fetching FPO registration list:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    // Fetch workflow statistics on component mount
    useEffect(() => {
        fetchStats();
    }, []);

    // Fetch FPO registration list on component mount
    useEffect(() => {
        // Default to Pending (statusId: 2)
        fetchTableData(1);
    }, []);

    // Sync formik values to selectedRow whenever they change
    useEffect(() => {
        if (isFormActive) {
            setSelectedRow((prev) => ({
                ...prev,
                ...formik.values,
            }));
        }
    }, [formik.values, isFormActive]);

    // ----------------------------------------------------------------------
    // Handlers
    // ----------------------------------------------------------------------
    const handleTileClick = (tile) => {
        if (activeTile === tile) return; // Prevent API call if clicking the same tile

        setActiveTile(tile);
        // Deactivate form when switching tiles
        handleReset();

        let statusId = 1; // Default Pending
        if (tile === 'approved') statusId = 2;
        else if (tile === 'rejected') statusId = 3;

        fetchTableData(statusId);
    };

    const handleEdit = async (row) => {
        // Activate form logic
        setIsFormActive(true);
        setSelectedRow(row);
        setWorkflowActions([]); // Clear previous actions

        // Populate form with existing data if available
        formik.resetForm();

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Fetch workflow actions for this row
        setIsLoading(true);
        try {
            const data = await getWorkflowActions(row.id);
            if (data && data.success && Array.isArray(data.data)) {
                setWorkflowActions(data.data);
            }
        } catch (error) {
            console.error("Error fetching workflow actions:", error);
            // Optional: show a toast or message that actions couldn't be loaded
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setIsFormActive(false);
        setSelectedRow(null);
        formik.resetForm();
        setIsActionModalOpen(false);
    };


    // ----------------------------------------------------------------------
    // Table Configuration
    // ----------------------------------------------------------------------
    const columns = ["Block", "FPO Name", "Registration No.", "Number of Farmers", "Request Date", "Actions"];

    const renderActions = (row) => (
        <div className="flex items-center justify-center gap-2">
            {/* {activeTile === 'pending' && (
                <button
                    type="button"
                    onClick={() => handleEdit(row)}
                    className="w-8 h-8 flex items-center justify-center rounded border border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                    title="Edit"
                >
                    
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
            )} */}
            <button
                type="button"
                onClick={() => handleEdit(row)}
                className="w-8 h-8 flex items-center justify-center rounded border border-yellow-600 text-yellow-600 hover:bg-yellow-50 transition-colors"
                title="View"
            >
                {/* Eye Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>
            {/* <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-red-600 text-red-600 hover:bg-red-50 transition-colors"
                title="Delete"
            >
                Trash Icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button> */}
        </div>
    );

    const formattedTableData = tableData.map(item => ({
        "Block": item.blockId,
        "FPO Name": item.fpoName,
        "Registration No.": item.regNo,
        "Number of Farmers": item.farmers,
        "Request Date": item.reqDate,
        original: item
    }));

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <HeaderSection />

            {/* Dashboard Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <DashboardTile
                    title="Approved Registrations"
                    count={stats.totalApproved}
                    tileClasses={`
                relative flex items-center p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-md
                ${activeTile === 'approved' ? 'bg-primary-800 shadow-2xl shadow-green-950' : 'bg-primary-600'}
                hover:bg-primary-800
                text-white gap-6 overflow-hidden h-[120px]
            `}
                    isActive={activeTile === 'approved'}
                    onClick={() => handleTileClick('approved')}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    }
                />
                <DashboardTile
                    title="Pending for registration"
                    count={stats.totalPending}
                    isActive={activeTile === 'pending'}
                    tileClasses={`
                relative flex items-center p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-md
                ${activeTile === 'pending' ? 'bg-warning-600 shadow-2xl shadow-orange-800' : 'bg-warning-500'}
                hover:bg-warning-600
                text-white gap-6 overflow-hidden h-[120px]
            `}
                    onClick={() => handleTileClick('pending')}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    }
                />
                <DashboardTile
                    title="Rejected/ Deactivated Resistration"
                    count={stats.totalRejected}
                    isActive={activeTile === 'rejected'}
                    tileClasses={`
                relative flex items-center p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-md
                ${activeTile === 'rejected' ? 'bg-danger-800 shadow-2xl shadow-red-950' : 'bg-danger-600'}
                hover:bg-danger-800
                text-white gap-6 overflow-hidden h-[120px]
            `}
                    onClick={() => handleTileClick('rejected')}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    }
                />
            </div>

            <div className="w-full h-px bg-gray-200 mb-10"></div>

            {/* Form Section - Only visible when form is active (View clicked) */}
            {isFormActive && (
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 mb-10 transition-all duration-300">
                    <div className='mb-4'>
                        <span>FPO Name : </span> <span className='font-semibold text-primary-800'>{selectedRow?.fpoName}</span>
                    </div>
                    {/* <RegistrationForm disabled={true} data={selectedRow} /> */}
                    <ViewForm disabled={true} data={selectedRow} />
                    <div className="mt-8 flex justify-center">
                        <Button
                            onClick={() => setIsActionModalOpen(true)}
                            buttonClassName="bg-primary-700 text-white hover:bg-primary-800 px-10 py-3 rounded-md font-semibold shadow-lg transition-all hover:scale-105"
                        >
                            Take Action
                        </Button>
                    </div>
                </div>
            )}

            {/* Table Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-6">FPO Approve/Reject Table</h2>
                <Table
                    columns={columns}
                    data={formattedTableData}
                    renderActions={(row) => renderActions(row.original)}
                />
            </div>

            {/* Modals */}
            <ConfirmationModal
                isOpen={confirmationModal.isOpen}
                onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmationModal.onConfirm}
                title={confirmationModal.title}
                description={confirmationModal.description}
            />

            <StatusModal
                isOpen={statusModal.isOpen}
                onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
                status={statusModal.status}
                message={statusModal.message}
            />

            <WorkflowActionModal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
                formik={formik}
                workflowActions={workflowActions}
                rejectionReasons={rejectionReasons}
                fetchRejectionReasons={fetchRejectionReasons}
                title={`Take Action ${selectedRow?.fpoName ? `(${selectedRow.fpoName})` : ''}`}
            />

            {isLoading && <Loader text="Processing request..." />}
        </div>
    );
};

export default AdminDashboard;