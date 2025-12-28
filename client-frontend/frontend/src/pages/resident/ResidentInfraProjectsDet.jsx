import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjectsDet.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { getProjectById } from '../../API/projectService';

const ResidentInfraProjectsDet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.project?.id;
  const [project, setProject] = useState(location.state?.project);
  const [loading, setLoading] = useState(!project);
  const { profileData } = useContext(ProfileContext);
  const [processUpdates] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [tempFeedback, setTempFeedback] = useState('');
  const [tempType, setTempType] = useState('Report');
  const [tempAnon, setTempAnon] = useState(false);

  // Fetch project details if ID is available
  useEffect(() => {
    if (projectId && !project) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const fetchedProject = await getProjectById(projectId);
          setProject(fetchedProject);
        } catch (error) {
          console.error('Failed to fetch project:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [projectId, project]);

  if (!project) {
    return (
      <div className="dashboard-root">
        <ResidentHeader />
        <div className="dashboard-body-row">
          <div className="dashboard-left">
            <ResidentSidebar />
          </div>
          <div className="dashboard-right">
            <main className="right-panel">
              <div style={{ padding: '2rem' }}>
                {loading ? (
                  <h2>Loading project...</h2>
                ) : (
                  <>
                    <h2>No project selected</h2>
                    <button onClick={() => navigate('/infrastructure-projects')}>
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
      <ResidentHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <ResidentSidebar />
        </div>
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
                          <p style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#001D9C' }}>{project.status || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Progress</h4>
                          <p style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#001D9C' }}>{project.progress !== undefined && project.progress !== null ? `${project.progress}%` : 'N/A'}</p>
                        </div>
                      </div>
                      <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Planned Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.startDate || 'N/A'}</p>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Target End Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.targetDate || project.targetEndDate || project.endDate || 'N/A'}</p>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>Completion Date</h5>
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.actualEndDate || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Summary Notes - View Only */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#333' }}>Summary Notes</h4>
                      <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', minHeight: '80px' }}>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#666' }}>N/A</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Large Card */}
                  <div style={{ maxHeight: '700px', overflowY: 'auto', paddingRight: '5px' }}>
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
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Budget Allocated</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.budget ? `₱${Number(project.budget).toLocaleString()}` : 'N/A'}</p>
                      </div>
                      <div style={{ marginTop: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>Budget Spent</h4>
                        <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>{project.budgetSpent ? `₱${Number(project.budgetSpent).toLocaleString()}` : 'N/A'}</p>
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
                    
                    {/* Process Updates Form Card - View Only */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                      <div style={{ padding: '0 10px' }}>
                        <h4 style={{ margin: '10px 0 0 0', fontSize: '0.95rem', color: '#333', fontWeight: '600' }}>Process Updates</h4>
                      </div>
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {processUpdates.length === 0 ? (
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#999' }}>No updates yet</p>
                        ) : (
                          processUpdates.map((update) => (
                            <div key={update.id} style={{ background: '#fff', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Date</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.date}</p>
                                </div>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Status</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500', textTransform: 'capitalize' }}>{update.status}</p>
                                </div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Progress</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.progress || 'N/A'}</p>
                                </div>
                                <div>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Budget Spent</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>₱{update.budgetSpent || 'N/A'}</p>
                                </div>
                              </div>
                              {update.targetCompletion && (
                                <div style={{ marginBottom: '8px' }}>
                                  <h6 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#666' }}>Target Completion</h6>
                                  <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{update.targetCompletion}</p>
                                </div>
                              )}
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

                    {/* Feedback Form Card */}
                    <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 10px' }}>
                        <h4 style={{ margin: '0', fontSize: '0.95rem', color: '#333', fontWeight: '600' }}>Feedback</h4>
                        <Button variant="primary" onClick={() => setShowFeedbackModal(true)} style={{ background: '#001D9C', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                          Add Feedback
                        </Button>
                      </div>
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {feedbacks.length === 0 ? (
                          <p style={{ margin: '0', fontSize: '0.95rem', color: '#999' }}>No feedback yet</p>
                        ) : (
                          feedbacks.map((f) => (
                            <div key={f.id} style={{ background: '#fff', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.95rem', color: '#333', fontWeight: 600 }}>
                                  {f.anonymous ? 'Anonymous' : `(${f.type}) ${f.reporterName}`}
                                </div>
                                <strong style={{ fontSize: '0.9rem', color: '#666' }}>{f.date}</strong>
                              </div>
                              <p style={{ margin: '0', fontSize: '0.95rem' }}>{f.text}</p>
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
      {/* Feedback Modal (form) */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => { setShowFeedbackModal(false); setTempFeedback(''); setTempType('Report'); setTempAnon(false); }}
        title="Add Feedback"
        showFooter={true}
        onSave={() => {
          const newFeedback = {
            id: feedbacks.length + 1,
            date: new Date().toLocaleDateString(),
            project: project?.name || 'N/A',
            type: tempType || 'Report',
            anonymous: !!tempAnon,            reporterName: tempAnon ? 'Anonymous' : (profileData?.username || 'Resident'),
            reporterRole: tempAnon ? '' : (profileData?.role || ''),            text: tempFeedback || 'N/A'
          };
          setFeedbacks([newFeedback, ...feedbacks]);
          setTempFeedback('');
          setTempType('Report');
          setTempAnon(false);
          setShowFeedbackModal(false);
        }}
      >
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontWeight: 600 }}>{project?.name || 'Project'}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#333' }}>Feedback Type</label>
            <select
              value={tempType}
              onChange={(e) => setTempType(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="Report">Report</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Comment">Comment</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#333' }}>Message</label>
            <textarea
              placeholder="Type your feedback here..."
              value={tempFeedback}
              onChange={(e) => setTempFeedback(e.target.value)}
              style={{ minHeight: '100px', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'Space Grotesk, sans-serif' }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <input type="checkbox" checked={tempAnon} onChange={(e) => setTempAnon(e.target.checked)} />
            <span style={{ fontSize: '0.95rem', color: '#333' }}>Submit Anonymously</span>
          </label>
        </div>
      </Modal>
    </div>
  );
}
export default ResidentInfraProjectsDet;
