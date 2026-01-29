import React from 'react';
import { SelectField, RadioGroup, TextArea } from './FormFields';
import { Button } from './Buttons';
import Toggle from './Toggle';

const WorkflowActionModal = ({
    isOpen,
    onClose,
    formik,
    workflowActions,
    rejectionReasons = [],
    fetchRejectionReasons,
    title = "Take Action"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl lg:p-8 mx-4 animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={(e) => {
                    formik.handleSubmit(e);
                    onClose();
                }}>
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

                                if (actionObj?.actionName?.toLowerCase() === 'reject') {
                                    fetchRejectionReasons();
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
                            onChange={(e) => {
                                formik.setFieldValue('rejectionReason', e.target.value);
                            }}
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
                            {rejectionReasons?.map((reason) => (
                                <option key={reason.id} value={reason.id}>
                                    {reason.name}
                                </option>
                            ))}
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
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                            <Button
                                type="button"
                                onClick={onClose}
                                buttonClassName="px-6 py-2.5 rounded border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!formik.isValid || !formik.dirty}
                                buttonClassName={`
                                    px-8 py-2.5 rounded font-medium transition-colors shadow-sm
                                    ${(!formik.isValid || !formik.dirty)
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
        </div>
    );
};

export default WorkflowActionModal;
