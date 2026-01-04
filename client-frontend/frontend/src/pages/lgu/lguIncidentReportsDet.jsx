import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import Modal from '../../components/Modal';
import LoadingScreen from '../../components/LoadingScreen';
import { updateIncidentStatus, assignRespondent, resolveIncidentWithNotes } from '../../API/incidentService';
import { incidentStatusColors } from '../../features/admin/admInfraProjects.constants';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReportsDet.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LguIncidentReportsDet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incident = location.state?.incident;
  // Use incident reporter data if available, otherwise use default values
  const reporter = {
    name: incident?.reporterName || 'Unknown',
    phone: incident?.reporterPhone || 'N/A',
    email: incident?.reporterEmail || 'N/A',
  };

  // Status phases state management
  const [status, setStatus] = useState(incident?.status || 'PENDING');
  const [dates, setDates] = useState({
    pending: incident?.timestamp ? new Date(incident.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    inProgress: incident?.inProgressDate ? new Date(incident.inProgressDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
    resolved: incident?.resolvedDate ? new Date(incident.resolvedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
  });
  const [assignedTo, setAssignedTo] = useState(incident?.assignedTo || '');
  const [showRespondentModal, setShowRespondentModal] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState(incident?.resolutionNotes || '');
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const respondentList = ['Jude', 'Johnrex', 'Jinrikisha', 'Michelle'];

  // Handle "Add" button click - moves to In Progress phase
  const handleAddRespondent = () => {
    setShowRespondentModal(true);
  };

  // Handle respondent selection from modal
  const handleSelectRespondent = async (name) => {
    setLoading(true);
    setError('');
    
    try {
      const incidentId = incident?.id || incident?.incidentId || incident?.incident_id;
      if (!incidentId) {
        setError('Incident ID not found');
        setLoading(false);
        return;
      }

      // Call API to assign respondent
      await assignRespondent(incidentId, name);

      setAssignedTo(name);
      if (status === 'PENDING' || status === 'Pending') {
        setStatus('IN_PROGRESS');
        setDates(prev => ({
          ...prev,
          inProgress: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        }));
        // Also update status to IN_PROGRESS
        await updateIncidentStatus(incidentId, 'IN_PROGRESS');
      }
      
      setShowRespondentModal(false);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to assign respondent');
      setLoading(false);
    }
  };

  // Handle "Mark as Resolved" button click - moves to Resolved phase
  const handleMarkResolved = () => {
    if (status !== 'RESOLVED') {
      setShowResolutionModal(true);
    }
  };

  // Handle resolution submission
  const handleSubmitResolution = async () => {
    setLoading(true);
    setError('');
    
    try {
      const incidentId = incident?.id;
      if (!incidentId) {
        setError('Incident ID not found');
        setLoading(false);
        return;
      }
      
      // Use new endpoint that saves resolution notes
      await resolveIncidentWithNotes(incidentId, resolutionNotes);
      setStatus('RESOLVED');
      setDates(prev => ({
        ...prev,
        resolved: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      }));
      setShowResolutionModal(false);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to update status');
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-root">
      {loading && <LoadingScreen />}
      <LguHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <LguSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                {(() => {
                  if (!incident) return 'Incident';
                  const id = incident.id || incident.incidentId || incident.incident_id;
                  return id ? `Incident #${String(id).padStart(4, '0')}` : 'Incident';
                })()}
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
                {/* Left 50% - Form Fields */}
                <div style={{ width: '50%' }}>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Incident Type: {incident?.type || incident?.incidentType || ''}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Severity: {incident?.severity || ''}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Zone: {incident?.zone || ''}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: '0.7rem' }}>
                    <p style={{ margin: 0 }}>Location: {incident?.location || ''}</p>
                  </div>
                  <div className="form-field-full" style={{ marginBottom: 0 }}>
                    <p style={{ margin: 0 }}>Description:</p>
                  </div>
                </div>
                {/* Right 50% - Stacked form cards */}
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.7rem' }}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Status: 
                      <span className={`status-chip ${incidentStatusColors[status] || ""}`}>
                        {status}
                      </span>
                    </div>
                    <div style={{ background: '#e9e9e9ff', borderRadius: '7px', padding: '0.9rem 1rem', width: '100%', color: '#000000ff', fontWeight: 500, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Pending</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.pending}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>In Progress</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.inProgress || 'No Date'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Resolved</span>
                        <span style={{ fontSize: '0.85rem', color: '#555' }}>{dates.resolved || 'No Date'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 5 }}>
                    <span>Respondent/Assigned to: <span style={{ fontWeight: 700, marginLeft: '0.5rem' }}>{assignedTo || '---'}</span></span>
                    <button type="button" onClick={() => {console.log('Add button clicked'); handleAddRespondent();}} style={{ background: status === 'PENDING' ? '#001D9C' : '#ccc', color: status === 'PENDING' ? '#fff' : '#999', border: 'none', borderRadius: '5px', padding: '0.35rem 1.1rem', fontWeight: 600, fontSize: '0.95rem', cursor: status === 'PENDING' ? 'pointer' : 'not-allowed', marginLeft: '1rem', opacity: status === 'PENDING' ? 1 : 0.5, position: 'relative', zIndex: 100 }}>Add</button>
                  </div>
                  <div style={{ background: '#F2F4F8', borderRadius: '8px', padding: '0.8rem 1rem', minHeight: '45px', color: '#000000ff', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center' }}>Resolution Notes: <span style={{ fontWeight: 700, marginLeft: '0.5rem' }}>{resolutionNotes || 'No resolution notes'}</span></div>
                </div>
              </div>
              {/* Reporter Blue Card and Action Buttons Row */}
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '0', gap: '1.5rem' }}>
                  {/* Reporter Blue Card */}
                  <div style={{
                    background: '#001D9C',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '1rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '50%',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.3rem' }}>Reported By: {reporter.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 A2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"></path></svg>
                      </span>
                      <span>{reporter.phone}</span>
                      <span style={{ display: 'flex', alignItems: 'center', marginLeft: '1.5rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                      <span>{reporter.email}</span>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'stretch', width: '50%' }}>
                    <button onClick={handleMarkResolved} disabled={status === 'RESOLVED' || loading} style={{
                      background: status === 'RESOLVED' || loading ? '#ccc' : '#001D9C',
                      color: status === 'RESOLVED' || loading ? '#999' : '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '0.5rem 0.8rem',
                      fontWeight: 600,
                      fontSize: '1rem',
                      cursor: status === 'RESOLVED' || loading ? 'not-allowed' : 'pointer',
                      marginBottom: '0.3rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.07)'
                    }}>Mark as Resolved</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Respondent Selection Modal */}
      <Modal isOpen={showRespondentModal} onClose={() => setShowRespondentModal(false)} title="Assign Respondent" showFooter={false}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Respondent:</label>
            <select onChange={(e) => handleSelectRespondent(e.target.value)} style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', fontWeight: 500, cursor: 'pointer' }} defaultValue="">
              <option value="">-- Select a name --</option>
              {respondentList.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>

      {/* Resolution Modal */}
      <Modal isOpen={showResolutionModal} onClose={() => setShowResolutionModal(false)} title="Incident Resolved!" showFooter={false}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Resolution Notes:</label>
            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Enter resolution notes here..."
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Space Grotesk, sans-serif', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowResolutionModal(false)} style={{ background: '#ccc', color: '#000', border: 'none', borderRadius: '5px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSubmitResolution} style={{ background: '#001D9C', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Submit</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LguIncidentReportsDet;