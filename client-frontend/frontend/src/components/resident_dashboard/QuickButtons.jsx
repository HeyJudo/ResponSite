
import React, { useState } from 'react';
import IncidentForm from './IncidentForm';

const QuickButtons = () => {
  const [showForm, setShowForm] = useState(false);

  const handleIncidentSubmit = (data) => {
    // TODO: send data to backend or handle as needed
    setShowForm(false);
    alert('Incident submitted!');
  };

  return (
    <div className="quick-buttons">
      <h2 className="quick-title">Quick buttons</h2>
      <div className="quick-btn-group">
        <button className="quick-btn" onClick={() => setShowForm(true)}>Report New Incident</button>
        <button className="quick-btn">Incident Reports</button>
        <button className="quick-btn">Browse Projects</button>
      </div>
      {showForm && (
        <IncidentForm onClose={() => setShowForm(false)} onSubmit={handleIncidentSubmit} />
      )}
    </div>
  );
};

export default QuickButtons;