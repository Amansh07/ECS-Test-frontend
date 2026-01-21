import * as Yup from 'yup';

/**
 * Builds Yup validation for stateExtension based on extension config
 */
export const buildExtensionValidationSchema = (extensionData) => {
  if (!extensionData?.extensionEnabled || !Array.isArray(extensionData.fields)) {
    return Yup.object(); // no validation
  }

  const fieldValidations = {};

  extensionData.fields.forEach(field => {
    let schema = Yup.string();

    if (field.isMandatory) {
      schema = schema.required(
        `${field.label || field.fieldName} is required`
      );
    }

    fieldValidations[field.fieldName] = schema;
  });

  return Yup.object().shape(fieldValidations);
};
