import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Modal from '../../components/Modal';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjects.css';
import { useInfraProjectsFilters } from '../../features/admin/useInfraProjectsFilters';
import InfraProjectsFilterSort from '../../features/admin/InfraProjectsFilterSort';
import InfraProjectsTable from '../../features/admin/InfraProjectsTable';
import infraProj from '../../API/resident/infraProj';
import { useState } from 'react';

const admInfraProjects = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectsData, setProjectsData] = useState(infraProj);
  const filters = useInfraProjectsFilters(projectsData);
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    location: '',
    description: '',
    objectives: '',
    startDate: '',
    targetEndDate: '',
    totalBudget: '',
    status: '',
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

  const handleSubmitProject = () => {
    const newProject = {
      id: projectsData.length + 1,
      name: formData.projectName,
      type: formData.projectType,
      location: formData.location,
      description: formData.description,
      objectives: formData.objectives,
      startDate: formData.startDate,
      targetEndDate: formData.targetEndDate,
      totalBudget: formData.totalBudget,
      status: formData.status,
      contractor: {
        name: formData.contractorName,
        number: formData.contractorNumber,
        email: formData.contractorEmail,
      }
    };
    setProjectsData([...projectsData, newProject]);
    setFormData({
      projectName: '',
      projectType: '',
      location: '',
      description: '',
      objectives: '',
      startDate: '',
      targetEndDate: '',
      totalBudget: '',
      status: '',
      contractorName: '',
      contractorNumber: '',
      contractorEmail: '',
    });
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Infrastructure Projects
              </div>
              <InfraProjectsFilterSort filters={filters} onAddProject={handleAddProject} />
              <InfraProjectsTable data={filters.filtered} />
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
              <label>Target End Date:</label>
              <input type="date" name="targetEndDate" value={formData.targetEndDate} onChange={handleInputChange} />
            </div>
          </div>

          <div className="modal-form-group">
            <label>Total Budget (₱):</label>
            <input type="number" name="totalBudget" value={formData.totalBudget} onChange={handleInputChange} placeholder="Enter budget in PHP" />
          </div>

          <div className="modal-form-group">
            <label>Status:</label>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="">-- Select Status --</option>
              <option value="Planned">Planned</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
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
