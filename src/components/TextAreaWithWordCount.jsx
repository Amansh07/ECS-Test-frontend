import React from 'react';
import { TextArea } from '../components/FormFields'; 

const TextAreaWithWordCount = ({
  label,
  required,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  maxWords = 250,
  labelClassName = "",
  textareaClassName = "",
  rows = 4,
  ...restProps // Catch all other props
}) => {
  // ✅ Safe word count calculation
  const getWordCount = (text) => {
    if (!text || typeof text !== 'string') return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = getWordCount(value);
  const charCount = value ? value.length : 0;

  return (
    <div className="mb-4">
      {/* ✅ Pass EXACTLY what your TextArea expects */}
      <TextArea
        label={label}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        touched={touched}
        rows={rows}
        labelClassName={labelClassName}
        textareaClassName={textareaClassName}
        {...restProps}
      />
      
      {/* ✅ Word count - SAFE rendering */}
      <div className="flex justify-between mt-1 text-xs text-gray-500 ml-1 mr-1">
        <span className={wordCount > maxWords ? 'text-red-500 font-semibold' : ''}>
          {wordCount}/{maxWords} words
        </span>
        <span>
          {charCount} chars
        </span>
      </div>
    </div>
  );
};

export default TextAreaWithWordCount;
