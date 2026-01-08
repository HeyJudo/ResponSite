import { useState, useCallback } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import { useToast } from '../../components/Toast';
import { createIncident } from '../../API/incidentService';
import { validators, validateField } from '../../utils/validation';

// Form field options
const INCIDENT_TYPES = ['Fallen Tree', 'Power Outage', 'Road Damage', 'Other'];
const ZONES = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

// Reusable styles for form elements
const formStyles = {
  input: { width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 },
  inputError: { width: '100%', padding: 7, borderRadius: 6, border: '2px solid #e74c3c', marginTop: 2, backgroundColor: '#fff5f5' },
  inputValid: { width: '100%', padding: 7, borderRadius: 6, border: '2px solid #27ae60', marginTop: 2, backgroundColor: '#f0fff4' },
  label: { fontWeight: 500, marginBottom: 4 },
  formGroup: { marginBottom: 8 },
  fieldError: { color: '#e74c3c', fontSize: '12px', marginTop: '4px' },
};

/**
 * SelectField component with validation support
 */
const SelectField = ({ name, value, onChange, onBlur, label, options, placeholder = 'Select...', error, touched }) => (
  <div className="form-group" style={formStyles.formGroup}>
    <label style={formStyles.label}>{label} <span style={{ color: '#e74c3c' }}>*</span></label>
    <select 
      name={name} 
      value={value} 
      onChange={onChange} 
      onBlur={onBlur}
      style={touched ? (error ? formStyles.inputError : formStyles.inputValid) : formStyles.input}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {touched && error && <div style={formStyles.fieldError}>{error}</div>}
  </div>
);

const IncidentForm = ({ onClose, onSubmit }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    type: '',
    zone: '',
    location: '',
    description: '',
    severity: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationRules = {
    type: [validators.required],
    zone: [validators.required],
    location: [validators.required],
    description: [validators.required],
    severity: [validators.required],
  };

  const validateFieldValue = useCallback((name, value) => {
    const rules = validationRules[name] || [];
    return validateField(value, rules, name);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateFieldValue(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateFieldValue(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(form).forEach(field => {
      const error = validateFieldValue(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const getInputStyle = (fieldName) => {
    if (!touched[fieldName]) return formStyles.input;
    return errors[fieldName] ? formStyles.inputError : formStyles.inputValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createIncident(form);
      toast.success('Incident reported successfully!');
      onSubmit(form);
      onClose();
    } catch (err) {
      setLoading(false);
      const errorMessage = err.message || 'Failed to report incident. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="modal-overlay">
      {loading && <LoadingScreen />}
      <div className="modal-window" style={{ minWidth: 370, maxWidth: 420, padding: '28px 28px 18px 28px' }}>
        <h2 style={{ marginBottom: 10 }}>Report New Incident</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SelectField
            name="type"
            value={form.type}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Incident Type"
            options={INCIDENT_TYPES}
            placeholder="Select type"
            error={errors.type}
            touched={touched.type}
          />
          <SelectField
            name="zone"
            value={form.zone}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Zone/Purok"
            options={ZONES}
            placeholder="Select zone"
            error={errors.zone}
            touched={touched.zone}
          />
          <div className="form-group" style={formStyles.formGroup}>
            <label style={formStyles.label}>Specific Location <span style={{ color: '#e74c3c' }}>*</span></label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Street name, landmark"
              style={getInputStyle('location')}
            />
            {touched.location && errors.location && <div style={formStyles.fieldError}>{errors.location}</div>}
          </div>
          <div className="form-group" style={formStyles.formGroup}>
            <label style={formStyles.label}>Description <span style={{ color: '#e74c3c' }}>*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Detailed explanation"
              style={{ ...getInputStyle('description'), minHeight: 60 }}
            />
            {touched.description && errors.description && <div style={formStyles.fieldError}>{errors.description}</div>}
          </div>
          <SelectField
            name="severity"
            value={form.severity}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Severity"
            options={SEVERITIES}
            placeholder="Select severity"
            error={errors.severity}
            touched={touched.severity}
          />
          {error && <div style={{ color: '#e74c3c', backgroundColor: '#fff5f5', border: '1px solid #fde0dc', padding: '10px 14px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <button type="button" className="close-modal-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="close-modal-btn" style={{ background: '#001d9c' }} disabled={loading}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
