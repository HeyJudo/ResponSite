import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjects.css';
import '../../styles/admin/admResourceManagement.css';
import { useInfraProjectsFilters } from '../../features/admin/useInfraProjectsFilters';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import FilterDropdown from '../../components/FilterDropdown';
import SortDropdown from '../../components/SortDropdown';
import SearchBar from '../../components/SearchBar';
import { typeOptions, zoneOptions, statusOptions, sortOptions } from '../../features/admin/admInfraProjects.constants';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, createProject } from '../../API/projectService';
import { statusColors } from '../../features/admin/admInfraProjects.constants';

// Function to normalize status text to title case
const normalizeStatus = (status) => {
  if (!status) return status;
  return status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const LguInfraProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
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
  
  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        // Keep mock data as fallback
        setProjects(infraProj);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      setProjects([...projects, createdProject]);
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
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const filters = useInfraProjectsFilters(projects);

  const {
    search,
    handleSearchChange,
    handleSearchKeyDown,
    showTypeFilter,
    handleTypeButtonClick,
    selectedType,
    handleTypeSelect,
    handleTypeFilterEnter,
    handleTypeFilterClose,
    showZoneFilter,
    handleZoneButtonClick,
    selectedZone,
    handleZoneSelect,
    handleZoneFilterEnter,
    handleZoneFilterClose,
    showStatusFilter,
    handleStatusButtonClick,
    selectedStatus,
    handleStatusSelect,
    handleStatusFilterEnter,
    handleStatusFilterClose,
    showSort,
    handleSortButtonClick,
    selectedSort,
    handleSortSelect,
    handleSortApply,
    handleSortClose,
    sortDirection,
    setSortDirection,
    filtered,
  } = filters;

  return (
    <div className="dashboard-root">
      <LguHeader />
      <div className="dashboard-body-row">
        <LguSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Infrastructure Projects
              </div>
              {loading ? (
                <p>Loading projects...</p>
              ) : (
                <>
              <div className="resource-search-actions">
                <SearchBar
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
                <Button variant="primary" onClick={handleAddProject}>Add Project</Button>
              </div>
              <div className="filters-sort">
                <div className="filters">
                  Filter:
                  <div style={{ position: 'relative', display: 'inline-block', marginLeft: 10 }}>
                    <button className="filter-btn" onClick={handleTypeButtonClick}>
                      Type ▼
                    </button>
                    <FilterDropdown
                      label="Filter by Type"
                      options={typeOptions}
                      selected={selectedType}
                      onSelect={handleTypeSelect}
                      onApply={handleTypeFilterEnter}
                      onClose={handleTypeFilterClose}
                      show={showTypeFilter}
                    />
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button className="filter-btn" onClick={handleZoneButtonClick}>
                      Zone ▼
                    </button>
                    <FilterDropdown
                      label="Filter by Zone"
                      options={zoneOptions}
                      selected={selectedZone}
                      onSelect={handleZoneSelect}
                      onApply={handleZoneFilterEnter}
                      onClose={handleZoneFilterClose}
                      show={showZoneFilter}
                    />
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button className="filter-btn" onClick={handleStatusButtonClick}>
                      Status ▼
                    </button>
                    <FilterDropdown
                      label="Filter by Status"
                      options={statusOptions}
                      selected={selectedStatus}
                      onSelect={handleStatusSelect}
                      onApply={handleStatusFilterEnter}
                      onClose={handleStatusFilterClose}
                      show={showStatusFilter}
                    />
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button className="sort-btn" onClick={handleSortButtonClick}>☰ Sort</button>
                  <SortDropdown
                    label="Sort By"
                    options={sortOptions}
                    selected={selectedSort}
                    onSelect={handleSortSelect}
                    onApply={handleSortApply}
                    onClose={handleSortClose}
                    show={showSort}
                    sortDirection={sortDirection}
                    onSortDirectionSelect={setSortDirection}
                  />
                </div>
              </div>
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
                    {filtered.map((item, idx) => (
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
                        <td>{item.targetDate || item.targetEndDate || item.endDate || 'N/A'}</td>
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
              <option value="Building">Building</option>
              <option value="Other">Other</option>
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

export default LguInfraProjects;