import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Modal from '../../components/Modal';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjects.css';
import '../../styles/admin/admResourceManagement.css';
import { useInfraProjectsFilters } from '../../features/admin/useInfraProjectsFilters';
import InfraProjectsFilterSort from '../../features/admin/InfraProjectsFilterSort';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, createProject } from '../../API/projectService';
import { statusColors } from '../../features/admin/admInfraProjects.constants';

// Function to normalize status text to title case
const normalizeStatus = (status) => {
  if (!status) return status;
  return status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const admInfraProjects = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await getAllProjects();
        setProjectsData(projects);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(err.message);
        toast.error('Failed to load projects');
        // Keep empty array as fallback
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  const filters = useInfraProjectsFilters(projectsData);
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    location: '',
    description: '',
    objectives: '',
    startDate: '',
    targetDate: '',
    budget: '',
    status: 'PLANNED',
    contractorName: '',
    contractorNumber: '',
    contractorEmail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    setShowAddModal(true);
  };

  const handleSubmitProject = async () => {
    try {
      const newProjectData = {
        name: formData.projectName,
        type: formData.projectType,
        location: formData.location,
        description: formData.description,
        objectives: formData.objectives,
        startDate: formData.startDate,
        targetDate: formData.targetDate,
        budget: formData.budget,
        status: 'PLANNED',
        contractorName: formData.contractorName,
        contractorNumber: formData.contractorNumber,
        contractorEmail: formData.contractorEmail,
      };

      const createdProject = await createProject(newProjectData);
      setProjectsData([...projectsData, createdProject]);
      toast.success('Project created successfully!');
      setFormData({
        projectName: '',
        projectType: '',
        location: '',
        description: '',
        objectives: '',
        startDate: '',
        targetDate: '',
        budget: '',
        status: 'PLANNED',
        contractorName: '',
        contractorNumber: '',
        contractorEmail: '',
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to create project:', err);
      toast.error('Failed to create project');
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <AdminSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Infrastructure Projects
              </div>
              {loading ? (
                <SkeletonTable columns={9} rows={6} />
              ) : error ? (
                <EmptyState
                  icon="⚠️"
                  title="Failed to Load Projects"
                  message={error}
                  action={() => window.location.reload()}
                  actionLabel="Try Again"
                />
              ) : filters.filtered.length === 0 ? (
                <EmptyState preset="projects" action={handleAddProject} actionLabel="Add New Project" />
              ) : (
                <>
                  <InfraProjectsFilterSort filters={filters} onAddProject={handleAddProject} />
                  <div className="resource-table-container">
                    <table className="incident-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Location/Zone</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th>Start Date</th>
                          <th>Target End Date</th>
                          <th>Budget</th>
                          <th>Budget Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filters.filtered.map((item, idx) => (
                          <tr key={idx} onClick={() => navigate('/admInfraProjectsDet', { state: { project: item } })} style={{ cursor: 'pointer' }}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.location}</td>
                            <td>
                              <span className={`status-chip ${statusColors[item.status] || ""}`}>
                                {normalizeStatus(item.status)}
                              </span>
                            </td>
                            <td>{item.progress !== undefined && item.progress !== null ? `${item.progress}%` : '0%'}</td>
                            <td>{item.startDate || 'N/A'}</td>
                            <td>{item.targetDate || 'N/A'}</td>
                            <td>{item.budget ? `₱${Number(item.budget).toLocaleString()}` : item.totalBudget ? `₱${Number(item.totalBudget).toLocaleString()}` : 'N/A'}</td>
                            <td>{item.budgetSpent ? `₱${Number(item.budgetSpent).toLocaleString()}` : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Project" showFooter={false}>
        <div className="modal-form-container">
          <div className="modal-form-group">
            <label>Project Name:</label>
            <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} placeholder="Enter project name" />
          </div>

          <div className="modal-form-group">
            <label>Project Type:</label>
            <select name="projectType" value={formData.projectType} onChange={handleInputChange}>
              <option value="">-- Select Type --</option>
              <option value="Road">Road</option>
              <option value="Bridge">Bridge</option>
              <option value="Drainage">Drainage</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label>Location / Zone:</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location or zone" />
          </div>

          <div className="modal-form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" />
          </div>

          <div className="modal-form-group">
            <label>Objectives:</label>
            <textarea name="objectives" value={formData.objectives} onChange={handleInputChange} placeholder="Enter objectives" />
          </div>

          <div className="modal-date-grid">
            <div className="modal-form-group">
              <label>Start Date:</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
            </div>
            <div className="modal-form-group">
              <label>Target Date:</label>
              <input type="date" name="targetDate" value={formData.targetDate} onChange={handleInputChange} />
            </div>
          </div>

          <div className="modal-form-group">
            <label>Budget (₱):</label>
            <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="Enter budget in PHP" />
          </div>

          <div className="modal-contractor-section">
            <h3>Contractor Info</h3>
            <div className="modal-form-group">
              <label>Name:</label>
              <input type="text" name="contractorName" value={formData.contractorName} onChange={handleInputChange} placeholder="Enter contractor name" />
            </div>
            <div className="modal-form-group">
              <label>Number:</label>
              <input type="text" name="contractorNumber" value={formData.contractorNumber} onChange={handleInputChange} placeholder="Enter contact number" />
            </div>
            <div className="modal-form-group">
              <label>Email:</label>
              <input type="email" name="contractorEmail" value={formData.contractorEmail} onChange={handleInputChange} placeholder="Enter email" />
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="submit-btn" onClick={handleSubmitProject}>Submit</button>
          </div>
        </div>
      </Modal>
	</div>
  );
}

export default admInfraProjects;
