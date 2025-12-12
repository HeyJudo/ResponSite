import React, { useState } from 'react';

const INCIDENT_TYPES = ['Tree', 'Power Outage', 'Road Damage', 'Other'];
const ZONES = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

const IncidentForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    type: '',
    zone: '',
    location: '',
    description: '',
    severity: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window" style={{ minWidth: 370, maxWidth: 420, padding: '28px 28px 18px 28px' }}>
        <h2 style={{ marginBottom: 10 }}>Report New Incident</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Incident Type</label>
            <select name="type" value={form.type} onChange={handleChange} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 }}>
              <option value="">Select type</option>
              {INCIDENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Zone/Purok</label>
            <select name="zone" value={form.zone} onChange={handleChange} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 }}>
              <option value="">Select zone</option>
              {ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Specific Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Street name, landmark"
              required
              style={{ width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed explanation"
              required
              style={{ width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', minHeight: 60, marginTop: 2 }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Severity</label>
            <select name="severity" value={form.severity} onChange={handleChange} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1px solid #bfc6d1', marginTop: 2 }}>
              <option value="">Select severity</option>
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <button type="button" className="close-modal-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="close-modal-btn" style={{ background: '#001d9c' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
