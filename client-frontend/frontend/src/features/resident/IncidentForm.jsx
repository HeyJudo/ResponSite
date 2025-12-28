import { useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import { createIncident } from '../../API/incidentService';

// Form field options
const INCIDENT_TYPES = ['Fallen Tree', 'Power Outage', 'Road Damage', 'Other'];
const ZONES = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

// Reusable styles for form elements
const formStyles = {
  input: { width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 },
  label: { fontWeight: 500, marginBottom: 4 },
  formGroup: { marginBottom: 8 },
};

/**
 * SelectField component to reduce code duplication
 */
const SelectField = ({ name, value, onChange, label, options, placeholder = 'Select...' }) => (
  <div className="form-group" style={formStyles.formGroup}>
    <label style={formStyles.label}>{label}</label>
    <select name={name} value={value} onChange={onChange} required style={formStyles.input}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const IncidentForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    type: '',
    zone: '',
    location: '',
    description: '',
    severity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createIncident(form);
      onSubmit(form);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to report incident. Please try again.');
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
            label="Incident Type"
            options={INCIDENT_TYPES}
            placeholder="Select type"
          />
          <SelectField
            name="zone"
            value={form.zone}
            onChange={handleChange}
            label="Zone/Purok"
            options={ZONES}
            placeholder="Select zone"
          />
          <div className="form-group" style={formStyles.formGroup}>
            <label style={formStyles.label}>Specific Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Street name, landmark"
              required
              style={formStyles.input}
            />
          </div>
          <div className="form-group" style={formStyles.formGroup}>
            <label style={formStyles.label}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed explanation"
              required
              style={{ ...formStyles.input, minHeight: 60 }}
            />
          </div>
          <SelectField
            name="severity"
            value={form.severity}
            onChange={handleChange}
            label="Severity"
            options={SEVERITIES}
            placeholder="Select severity"
          />
          {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
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
