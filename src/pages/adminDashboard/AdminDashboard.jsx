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
import {
    getWorkflowStats,
    getWorkflowActions,
    processWorkflowAction,
    getFPORegistrationList
} from '../../api/workflow';


// ----------------------------------------------------------------------
// Dashboard Tile Component
// ----------------------------------------------------------------------
const DashboardTile = ({ icon, count, title, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                relative flex items-center p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-md
                ${isActive ? 'bg-primary-800 shadow-2xl shadow-green-950' : 'bg-primary-700'}
                hover:bg-primary-800
                text-white gap-6 overflow-hidden h-[120px]
            `}
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
    };


    // ----------------------------------------------------------------------
    // Table Configuration
    // ----------------------------------------------------------------------
    const columns = ["Block", "FPO Name", "Registration No.", "Number of Farmers", "Request Date", "Actions"];

    const renderActions = (row) => (
        <div className="flex items-center justify-center gap-2">
            {activeTile === 'pending' && (
                <button
                    type="button"
                    onClick={() => handleEdit(row)}
                    className="w-8 h-8 flex items-center justify-center rounded border border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                    title="Edit"
                >
                    {/* Pencil Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
            )}
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-yellow-600 text-yellow-600 hover:bg-yellow-50 transition-colors"
                title="View"
            >
                {/* Eye Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-red-600 text-red-600 hover:bg-red-50 transition-colors"
                title="Delete"
            >
                {/* Trash Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
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

            {/* Form Section - Only visible for 'Pending' layout */}
            {activeTile === 'pending' && (
                <div className={`
                    bg-white rounded-lg p-8 shadow-sm border border-gray-100 mb-10 transition-opacity duration-300
                    ${!isFormActive ? 'opacity-50 pointer-events-none grayscale-[0.5]' : 'opacity-100'}
                `}>
                    <h2 className="text-xl font-semibold mb-6">
                        View Form {isFormActive && selectedRow?.fpoName && <span className="text-primary-700">({selectedRow.fpoName})</span>}
                    </h2>

                    {/* Formik Form */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <RadioGroup
                                label="Approve/Reject FPO"
                                required
                                name="action"
                                value={formik.values.action}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    formik.setFieldValue('action', val);

                                    // Clear rejection reason if Approve is selected
                                    const actionObj = workflowActions.find(a => a.actionId === val);
                                    if (actionObj?.actionName?.toLowerCase() === 'approve') {
                                        formik.setFieldValue('rejectionReason', '');
                                        formik.setFieldTouched('rejectionReason', false);
                                    }
                                }}
                                options={workflowActions.map(action => ({
                                    label: action.actionName,
                                    value: action.actionId
                                }))}
                                error={formik.touched.action && formik.errors.action}
                                touched={formik.touched.action}
                            />

                            <SelectField
                                label="Rejection Reason"
                                name="rejectionReason"
                                value={formik.values.rejectionReason}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rejectionReason && formik.errors.rejectionReason}
                                touched={formik.touched.rejectionReason}
                                disabled={(() => {
                                    if (!formik.values.action) return true;
                                    const actionObj = workflowActions.find(a => a.actionId === Number(formik.values.action));
                                    return actionObj?.actionName?.toLowerCase() !== 'reject';
                                })()}
                                selectClassName={(() => {
                                    if (!formik.values.action) return "bg-gray-100 cursor-not-allowed";
                                    const actionObj = workflowActions.find(a => a.actionId === Number(formik.values.action));
                                    return actionObj?.actionName?.toLowerCase() !== 'reject' ? "bg-gray-100 cursor-not-allowed" : "";
                                })()}
                                required={(() => {
                                    if (!formik.values.action) return false;
                                    const actionObj = workflowActions.find(a => a.actionId === Number(formik.values.action));
                                    return actionObj?.actionName?.toLowerCase() === 'reject';
                                })()}
                            >
                                <option value="">Select Rejection Reason</option>
                                <option value="reason1">Reason 1</option>
                                <option value="reason2">Reason 2</option>
                            </SelectField>
                        </div>

                        <div className="mb-6">
                            <TextArea
                                label="Add comment"
                                name="comment"
                                placeholder="Enter Text"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.comment && formik.errors.comment}
                                touched={formik.touched.comment}
                                rows={4}
                                maxLength={100}
                                required
                            />
                            <div className="text-right text-xs text-gray-500 mt-1">
                                {formik.values.comment.length}/100
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100 mb-6"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-md w-full md:w-auto flex-1">
                                <span className="text-sm font-medium text-gray-700">Send notification</span>
                                <div className="ml-auto">
                                    <Toggle
                                        checked={formik.values.notification}
                                        onChange={(val) => formik.setFieldValue('notification', val)}
                                        disabled={!isFormActive}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={!isFormActive}
                                    buttonClassName={`
                                        px-6 py-2.5 rounded border border-gray-300 font-medium transition-colors
                                        ${!isFormActive ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}
                                    `}
                                >
                                    ⟳ Reset Form
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!isFormActive || !formik.isValid || !formik.dirty}
                                    buttonClassName={`
                                        px-8 py-2.5 rounded font-medium transition-colors shadow-sm
                                        ${(!isFormActive || !formik.isValid || !formik.dirty)
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-primary-700 text-white hover:bg-primary-800'
                                        }
                                    `}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
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

            {isLoading && <Loader text="Processing request..." />}
        </div>
    );
};

export default AdminDashboard;