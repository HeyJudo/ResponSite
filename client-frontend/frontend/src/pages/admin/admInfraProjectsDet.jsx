import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjectsDet.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProjectById, updateProject, addProcessUpdate, getProcessUpdates } from '../../API/projectService';
import { getFeedbacks } from '../../API/feedbackService';

const AdmInfraProjectsDet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.project?.id;
  const [project, setProject] = useState(location.state?.project);
  const [loading, setLoading] = useState(!project);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [tempNote, setTempNote] = useState('');
  const formatProgress = (value) => (value !== undefined && value !== null ? `${value}%` : 'N/A');
  const formatCurrency = (value) => (value !== undefined && value !== null ? `₱${Number(value).toLocaleString()}` : 'N/A');

  const [summaryNote, setSummaryNote] = useState(project?.summaryNote || 'N/A');
  const [status, setStatus] = useState(project?.status || 'N/A');
  const [progress, setProgress] = useState(formatProgress(project?.progress));
  const [targetCompletion, setTargetCompletion] = useState(project?.targetDate || project?.adjustedDate || 'N/A');
  const [completionDate, setCompletionDate] = useState(project?.actualEndDate || 'N/A');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: 'in progress',
    progress: '',
    adjustedDate: '',
    budgetSpent: '',
    note: ''
  });
  const [processUpdates, setProcessUpdates] = useState([]);

  // Feedback state
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch project details if ID is available
  useEffect(() => {
    if (projectId && !project) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const fetchedProject = await getProjectById(projectId);
          setProject(fetchedProject);
          setStatus(fetchedProject?.status || 'N/A');
          setProgress(formatProgress(fetchedProject?.progress));
          setTargetCompletion(fetchedProject?.targetDate || fetchedProject?.adjustedDate || fetchedProject?.targetEndDate || 'N/A');
          setCompletionDate(fetchedProject?.actualEndDate || 'N/A');
          setSummaryNote(fetchedProject?.summaryNote || 'N/A');
        } catch (error) {
          console.error('Failed to fetch project:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [projectId, project]);

  // Fetch process updates when project is loaded
  useEffect(() => {
    if (project && project.id) {
      const fetchProcessUpdates = async () => {
        try {
          const fetchedUpdates = await getProcessUpdates(project.id);
          setProcessUpdates(fetchedUpdates);
        } catch (error) {
          console.error('Failed to fetch process updates:', error);
        }
      };
      fetchProcessUpdates();
    }
  }, [project]);

  // Fetch feedbacks when project is loaded
  useEffect(() => {
    if (project && project.id) {
      const fetchFeedbacks = async () => {
        try {
          const fetchedFeedbacks = await getFeedbacks(project.id);
          setFeedbacks(fetchedFeedbacks);
        } catch (error) {
          console.error('Failed to fetch feedbacks:', error);
        }
      };
      fetchFeedbacks();
    }
  }, [project]);

  const handleSaveNote = async () => {
    try {
      if (project?.id) {
        const today = new Date().toISOString().split('T')[0];
        const updated = await updateProject(project.id, {
          status: 'Completed',
          progress: 100,
          summaryNote: tempNote,
          actualEndDate: today,
        });
        setProject(updated);
        setStatus(updated.status || 'Completed');
        setProgress(formatProgress(updated.progress ?? 100));
        setTargetCompletion(updated.targetDate || updated.adjustedDate || targetCompletion);
        setCompletionDate(updated.actualEndDate || today);
        setSummaryNote(updated.summaryNote || tempNote || 'N/A');
      }
      setTempNote('');
      setShowSummaryModal(false);
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const handleSaveUpdate = async () => {
    try {
      if (project?.id) {
        const statusMap = {
          planned: 'Planned',
          'in progress': 'In Progress',
          delayed: 'Delayed',
        };
        const normalizedStatus = statusMap[updateForm.status] || updateForm.status;
        const updateData = {
          status: normalizedStatus,
        };
        const today = new Date().toISOString().split('T')[0];

        if (updateForm.progress !== '') updateData.progress = parseInt(updateForm.progress, 10);
        if (updateForm.budgetSpent !== '') updateData.budgetSpent = parseFloat(updateForm.budgetSpent);

        if (updateForm.status === 'delayed' && updateForm.adjustedDate) {
          updateData.adjustedDate = updateForm.adjustedDate;
        }

        if (updateForm.status === 'planned') {
          updateData.progress = 0;
          updateData.startDate = today;
        }

        if (updateForm.status === 'in progress') {
          updateData.actualStartDate = today;
        }

        const updated = await updateProject(project.id, updateData);
        setProject(updated);
        setStatus(updated.status || normalizedStatus);
        setProgress(formatProgress(updated.progress));
        setTargetCompletion(updated.adjustedDate || updated.targetDate || targetCompletion);
        setCompletionDate(updated.actualEndDate || completionDate);
      }

      const processUpdateData = {
        status: updateForm.status,
        progress: updateForm.progress !== '' ? parseInt(updateForm.progress, 10) : null,
        budgetSpent: updateForm.budgetSpent !== '' ? parseFloat(updateForm.budgetSpent) : null,
        adjustedDate: updateForm.adjustedDate || null,
        note: updateForm.note || null,
      };

      await addProcessUpdate(project.id, processUpdateData);

      // Refresh process updates from backend
      const updatedProcessUpdates = await getProcessUpdates(project.id);
      setProcessUpdates(updatedProcessUpdates);
      
      // Update main display values
      const normalized = updateForm.status.charAt(0).toUpperCase() + updateForm.status.slice(1);
      setStatus(normalized);
      if (updateForm.progress) setProgress(`${updateForm.progress}%`);
      if (updateForm.adjustedDate) setTargetCompletion(updateForm.adjustedDate);
      
      setUpdateForm({
        status: 'in progress',
        progress: '',
        adjustedDate: '',
        budgetSpent: '',
        note: ''
      });
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Failed to update project:', error);
      alert('Failed to update project: ' + (error.message || 'Unknown error'));
    }
  };

  if (!project) {
    return (
      <div className="dashboard-root">
        <AdminHeader />
        <div className="dashboard-body-row">
          <AdminSidebar />
          <div className="dashboard-right">
            <main className="right-panel">
              <div style={{ padding: '2rem' }}>
                {loading ? (
                  <h2>Loading project...</h2>
                ) : (
                  <>
                    <h2>No project selected</h2>
                    <button onClick={() => navigate('/admInfraProjects')}>
                      Back to Projects
                    </button>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <AdminSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card" style={{ width: 'calc(100% - 20px)', margin: '10px 10px 0 10px' }}>
              <div className="resource-form-header">
                {project.name}
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '25% 75%', gap: '10px', alignItems: 'start' }}>
                  {/* Left Column - 2 Stacked Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Top Card - Status and Progress */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Status</h4>
                          <p style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#001D9C' }}>{status}</p>
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Progress</h4>
                          <p style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#001D9C' }}>{progress}</p>
                        </div>
                      </div>
                      <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Planned Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.startDate || 'N/A'}</p>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Target End Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.targetDate || 'N/A'}</p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Completion Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{completionDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="primary" onClick={() => setShowSummaryModal(true)}>
                      Mark as Complete
                    </Button>
                    
                    {/* Bottom Card - Summary Notes */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#333' }}>Summary Notes</h4>
                      <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', minHeight: '80px' }}>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#666' }}>{summaryNote}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Large Card */}
                  <div style={{ maxHeight: '700px', overflowY: 'auto', paddingRight: '5px' }}>
                    <div style={{ background: '#001D9C', color: '#fff', padding: '12px', borderRadius: '10px', marginBottom: '10px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: '600' }}>Contractor</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: '500', color: '#dbe4ff' }}>Name</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: '600' }}>{project.contractorName || 'N/A'}</p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: '500', color: '#dbe4ff' }}>Contact Number</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: '600' }}>{project.contractorNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: '500', color: '#dbe4ff' }}>Email</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: '600' }}>{project.contractorEmail || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Project Type</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.type || 'N/A'}</p>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Location / Zone</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.location || 'N/A'}</p>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Description</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#666' }}>{project.description || 'N/A'}</p>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Objective</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#666' }}>{project.objectives || 'N/A'}</p>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Budget</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.budget ? `₱${Number(project.budget).toLocaleString()}` : 'N/A'}</p>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Budget Spent</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{formatCurrency(project.budgetSpent)}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Form Card */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                      <h4 style={{ margin: '10px 10px 0 10px', fontSize: '0.95rem', color: '#333', fontWeight: '600' }}>Timeline</h4>
                      <div style={{ padding: '10px' }}>
                        <Table 
                          columns={[
                            { key: 'plannedStart', header: 'Planned Start' },
                            { key: 'actualStart', header: 'Actual Start' },
                            { key: 'targetEnd', header: 'Target End' },
                            { key: 'actualEndDate', header: 'Actual End Date' },
                            { key: 'adjustedDate', header: 'Adjusted Date' }
                          ]}
                          data={[
                            {
                              plannedStart: project.startDate || 'N/A',
                              actualStart: project.actualStartDate || 'N/A',
                              targetEnd: project.targetDate || 'N/A',
                              actualEndDate: project.actualEndDate || 'N/A',
                              adjustedDate: project.adjustedDate || 'N/A'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    
                    {/* Process Updates Form Card */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 10px' }}>
                        <h4 style={{ margin: '0', fontSize: '0.95rem', color: '#333', fontWeight: '600' }}>Process Updates</h4>
                        <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
                          Add Update
                        </Button>
                      </div>                      {/* Process Updates History */}
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {processUpdates.length === 0 ? (
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#999' }}>No updates yet</p>
                        ) : (
                          processUpdates.map((update) => (
                            <div key={update.id} style={{ background: '#fff', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Date</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>
                                    {update.timestamp ? new Date(update.timestamp).toLocaleString() : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Updated By</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.userName || 'N/A'}</p>
                                </div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Status</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500', textTransform: 'capitalize' }}>{update.status}</p>
                                </div>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Progress</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.progress !== null && update.progress !== undefined ? `${update.progress}%` : 'N/A'}</p>
                                </div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Budget Spent</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.budgetSpent !== null && update.budgetSpent !== undefined ? `₱${Number(update.budgetSpent).toLocaleString()}` : 'N/A'}</p>
                                </div>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Adjusted Date</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>
                                    {update.adjustedDate ? new Date(update.adjustedDate).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              {update.note && (
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Note</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem' }}>{update.note}</p>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Feedback Section */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ marginBottom: '10px', padding: '0 10px' }}>
                        <h4 style={{ margin: '0', fontSize: '0.95rem', color: '#333', fontWeight: '600' }}>Feedback</h4>
                      </div>
                      {/* Feedback History */}
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {feedbacks.length === 0 ? (
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#999' }}>No feedback yet</p>
                        ) : (
                          feedbacks.map((feedback) => (
                            <div key={feedback.id} style={{ background: '#fff', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>
                                    {feedback.isAnonymous ? 'Anonymous' : (feedback.userName || 'Unknown User')}
                                  </h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{feedback.subject}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>{feedback.type}</p>
                                  <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>
                                    {feedback.timestamp ? new Date(feedback.timestamp).toLocaleString() : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p style={{ margin: '0', fontSize: '0.9rem' }}>{feedback.message}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Summary Note Modal */}
      <Modal isOpen={showSummaryModal} onClose={() => { setShowSummaryModal(false); setTempNote(''); }} title="Summary Note" showFooter={true} onSave={handleSaveNote}>
        <div style={{ padding: '1.5rem' }}>
          <textarea
            placeholder="Enter summary notes here..."
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontFamily: 'Space Grotesk, sans-serif',
              resize: 'vertical'
            }}
          />
        </div>
      </Modal>

      {/* Project Update Modal */}
      <Modal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} title="Project Update" showFooter={true} onSave={handleSaveUpdate}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.95rem' }}>Status</label>
            <select
              value={updateForm.status}
              onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="planned">Planned</option>
              <option value="delayed">Delayed</option>
              <option value="in progress">In Progress</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.95rem' }}>Progress (%)</label>
            <input
              type="number"
              placeholder="Enter progress percentage"
              value={updateForm.progress}
              onChange={(e) => setUpdateForm({ ...updateForm, progress: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          {updateForm.status === 'delayed' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.95rem' }}>Adjusted Date</label>
              <input
                type="date"
                value={updateForm.adjustedDate}
                onChange={(e) => setUpdateForm({ ...updateForm, adjustedDate: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.95rem' }}>Budget Spent (₱)</label>
            <input
              type="number"
              placeholder="Enter amount in pesos"
              value={updateForm.budgetSpent}
              onChange={(e) => setUpdateForm({ ...updateForm, budgetSpent: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.95rem' }}>Note</label>
            <textarea
              placeholder="Enter any notes"
              value={updateForm.note}
              onChange={(e) => setUpdateForm({ ...updateForm, note: e.target.value })}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.6rem',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontFamily: 'Space Grotesk, sans-serif',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AdmInfraProjectsDet;