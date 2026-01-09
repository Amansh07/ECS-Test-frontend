import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from './FormFields';

// Simulated API Response/Dummy Data
// Simulated API Response/Dummy Data
export const MOCK_EXTENSION_DATA = {
    farmers: {
        stateCode: "WB",
        extensionEnabled: true,
        fields: [
            { fieldName: "localName", label: "Local Name", dataType: "STRING", isMandatory: true, allowedValues: null, controlType: "Textbox" },
            { fieldName: "soilType", label: "Soil Type", dataType: "STRING", isMandatory: true, allowedValues: ["Alluvial", "Red", "Black", "Laterite"], controlType: "Dropdown" },
            { fieldName: "irrigationSource", label: "Irrigation Source", dataType: "STRING", isMandatory: false, allowedValues: ["Canal", "Tube Well", "Pond", "Rainfed"], controlType: "Radio" },
            { fieldName: "landMeasurementUnit", label: "Land Measurement Unit", dataType: "STRING", isMandatory: true, allowedValues: ["Acre", "Hectare", "Bigha"], controlType: "Dropdown" }
        ]
    },
    machinery: {
        stateCode: "WB",
        extensionEnabled: false, // Testing disabling feature
        fields: []
    }
};

export const getExtensionData = (pageId) => {
    return MOCK_EXTENSION_DATA[pageId] || { extensionEnabled: false };
};

const StateExtension = ({ formik, pageId }) => {
    const [extensionData, setExtensionData] = useState(null);

    useEffect(() => {
        // Simulate API call
        const fetchExtensionData = async () => {
            // In real scenario: fetch(`${API_URL}?pageId=${pageId}`)
            const data = getExtensionData(pageId);

            if (data && data.extensionEnabled) {
                setExtensionData(data);

                // Initialize formik values for extension fields if not present
                const extensionValues = { ...formik.values.stateExtension };
                let hasNewFields = false;

                data.fields.forEach(field => {
                    if (extensionValues[field.fieldName] === undefined) {
                        extensionValues[field.fieldName] = "";
                        hasNewFields = true;
                    }
                });

                if (hasNewFields) {
                    formik.setFieldValue('stateExtension', extensionValues);
                }
            } else {
                setExtensionData(null);
            }
        };

        if (pageId) {
            fetchExtensionData();
        }
    }, [pageId, formik.setFieldValue]); // eslint-disable-line react-hooks/exhaustive-deps


    if (!extensionData || !extensionData.extensionEnabled) {
        return null;
    }

    return (
        <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-gray-50 mt-6 mb-6">
            <h3 className="text-base font-bold mb-4 text-grey-900">
                State Extension Details ({extensionData.stateCode})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {extensionData.fields.map((field) => {
                    const fieldName = `stateExtension.${field.fieldName}`;
                    const isError = formik.touched.stateExtension?.[field.fieldName] && formik.errors.stateExtension?.[field.fieldName];
                    const errorMsg = formik.errors.stateExtension?.[field.fieldName];

                    // Determine renderer based on controlType
                    switch (field.controlType) {
                        case "Textbox":
                            return (
                                <TextField
                                    key={field.fieldName}
                                    label={field.label || field.fieldName}
                                    required={field.isMandatory}
                                    name={fieldName}
                                    placeholder={`Enter ${field.label}`}
                                    value={formik.values.stateExtension?.[field.fieldName] || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={isError ? (errorMsg || 'Required') : undefined} // Simple required check fallback
                                    touched={formik.touched.stateExtension?.[field.fieldName]}
                                />
                            );
                        case "Dropdown":
                            return (
                                <SelectField
                                    key={field.fieldName}
                                    label={field.label || field.fieldName}
                                    required={field.isMandatory}
                                    name={fieldName}
                                    value={formik.values.stateExtension?.[field.fieldName] || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={isError ? (errorMsg || 'Required') : undefined}
                                    touched={formik.touched.stateExtension?.[field.fieldName]}
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.allowedValues?.map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </SelectField>
                            );
                        case "Radio":
                        case "RadioButton":
                            return (
                                <RadioGroup
                                    key={field.fieldName}
                                    label={field.label || field.fieldName}
                                    required={field.isMandatory}
                                    name={fieldName}
                                    options={field.allowedValues?.map(val => ({ label: val, value: val })) || []}
                                    value={formik.values.stateExtension?.[field.fieldName] || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={isError ? (errorMsg || 'Required') : undefined}
                                    touched={formik.touched.stateExtension?.[field.fieldName]}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default StateExtension;
