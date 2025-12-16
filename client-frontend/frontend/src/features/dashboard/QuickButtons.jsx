import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import { addMyReport } from '../../API/resident/myReports';

const QuickButtons = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleIncidentSubmit = (data) => {
    addMyReport(data);
    setShowForm(false);
    navigate('/incident-reports');
  };

  return (
    <div className="quick-buttons">
      <h2 className="quick-title">Quick buttons</h2>
      <div className="quick-btn-group">
        <button className="quick-btn" onClick={() => setShowForm(true)}>Report New Incident</button>
        <button className="quick-btn" onClick={() => navigate('/incident-reports')}>My Reports</button>
        <button className="quick-btn" onClick={() => navigate('/infrastructure-projects')}>Browse Projects</button>
      </div>
      {showForm && (
        <IncidentForm onClose={() => setShowForm(false)} onSubmit={handleIncidentSubmit} />
      )}
    </div>
  );
};

export default QuickButtons;
