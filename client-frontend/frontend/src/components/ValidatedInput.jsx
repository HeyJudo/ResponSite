import React, { useState, useCallback } from 'react';
import { validateField } from '../utils/validation';
import './ValidatedInput.css';

/**
 * Validated Input Component
 * Input field with real-time validation and error display
 */

const ValidatedInput = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rules = [],
  disabled = false,
  required = false,
  className = '',
  autoComplete,
  maxLength,
  min,
  max,
  rows = 3, // For textarea
  options = [], // For select
  ...props
}) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  // Validate on blur
  const handleBlur = useCallback((e) => {
    setTouched(true);
    const validationError = validateField(e.target.value, rules, label || name);
    setError(validationError);
    onBlur?.(e);
  }, [rules, label, name, onBlur]);

  // Validate on change (only if already touched)
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    onChange?.(e);
    
    if (touched) {
      const validationError = validateField(newValue, rules, label || name);
      setError(validationError);
    }
  }, [onChange, touched, rules, label, name]);

  const inputId = `input-${name}`;
  const hasError = touched && error;
  const isValid = touched && !error && value;

  const inputClassName = `validated-input ${hasError ? 'input-error' : ''} ${isValid ? 'input-valid' : ''} ${className}`;

  // Render different input types
  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name,
      value: value || '',
      onChange: handleChange,
      onBlur: handleBlur,
      disabled,
      placeholder,
      className: inputClassName,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${inputId}-error` : undefined,
      ...props,
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows}
          maxLength={maxLength}
        />
      );
    }

    if (type === 'select') {
      return (
        <select {...commonProps}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    );
  };

  return (
    <div className={`validated-input-wrapper ${hasError ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="validated-input-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {renderInput()}
        
        {/* Validation indicator */}
        {touched && (
          <span className={`validation-indicator ${hasError ? 'invalid' : 'valid'}`}>
            {hasError ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <span id={`${inputId}-error`} className="validation-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default ValidatedInput;
