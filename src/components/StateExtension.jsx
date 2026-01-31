import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from './FormFields';

/* ---------------- MOCK / API ---------------- */

const MOCK_EXTENSION_DATA = {
  farmers: {
    stateCode: "WB",
    extensionEnabled: true,
    fields: [
      { fieldName: "localName", label: "Local Name", isMandatory: true, controlType: "Textbox" },
      { fieldName: "soilType", label: "Soil Type", isMandatory: true, allowedValues: ["Alluvial", "Red"], controlType: "Dropdown" },
      { fieldName: "irrigationSource", label: "Irrigation Source", isMandatory: false, allowedValues: ["Canal", "Pond"], controlType: "Radio" }
    ]
  },
  machinery: {
    stateCode: "WB",
    extensionEnabled: true,
    fields: [
      { fieldName: "fuelType", label: "Fuel Type", isMandatory: true, allowedValues: ["Diesel", "Electric"], controlType: "Dropdown" }
    ]
  }
};

/* NAMED EXPORT (IMPORTANT) */
export const getExtensionData = async (pageId) => {
  // simulate async API
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_EXTENSION_DATA[pageId] || { extensionEnabled: false };
};

/* ---------------- COMPONENT ---------------- */

const StateExtension = ({ formik, pageId }) => {
  const [extensionData, setExtensionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchExtensionData = async () => {
      setLoading(true);
      try {
        const data = await getExtensionData(pageId);
        if (!mounted) return;

        if (data?.extensionEnabled) {
          setExtensionData(data);

          // initialize formik values safely
          const values = { ...(formik.values.stateExtension || {}) };
          let changed = false;

          data.fields.forEach(f => {
            if (values[f.fieldName] === undefined) {
              values[f.fieldName] = '';
              changed = true;
            }
          });

          if (changed) {
            formik.setFieldValue('stateExtension', values, false);
          }
        } else {
          setExtensionData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (pageId) fetchExtensionData();
    return () => { mounted = false; };
  }, [pageId]);

  if (loading) {
    return <div className="mt-6 text-sm text-grey-500">Loading state extension…</div>;
  }

  if (!extensionData?.extensionEnabled) return null;

  return (
    <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-gray-50 mt-6 mb-6">
      <h3 className="text-base font-bold mb-4">
        Additional Required Details
        {/* ({extensionData.stateCode}) */}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extensionData.fields.map(field => {
          const name = `stateExtension.${field.fieldName}`;
          const touched = formik.touched.stateExtension?.[field.fieldName];
          const error = formik.errors.stateExtension?.[field.fieldName];

          switch (field.controlType) {
            case 'Textbox':
              return (
                <TextField
                  key={field.fieldName}
                  label={field.label}
                  name={name}
                  required={field.isMandatory}
                  value={formik.values.stateExtension?.[field.fieldName] || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.stateExtension?.[field.fieldName]}
                  touched={formik.touched.stateExtension?.[field.fieldName]}
                />
              );

            case 'Dropdown':
              return (
                <SelectField
                  key={field.fieldName}
                  label={field.label}
                  name={name}
                  required={field.isMandatory}
                  value={formik.values.stateExtension?.[field.fieldName] || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.stateExtension?.[field.fieldName]}
                  touched={formik.touched.stateExtension?.[field.fieldName]}
                >
                  <option value="">Select {field.label}</option>
                  {field.allowedValues.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </SelectField>
              );

            case 'Radio':
              return (
                <RadioGroup
                  key={field.fieldName}
                  label={field.label}
                  name={name}
                  required={field.isMandatory}
                  options={field.allowedValues.map(v => ({ label: v, value: v }))}
                  value={formik.values.stateExtension?.[field.fieldName] || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.stateExtension?.[field.fieldName]}
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
