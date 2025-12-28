import { useState, useEffect } from 'react';
import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import { getAllEvacuationCenters, addEvacuationCenter, updateEvacuationCenter, deleteEvacuationCenter } from '../../API/evacuationCenterService';
import '../../styles/resident/global.css';
import '../../styles/admin/admEvacuationCenter.css';

const admEvacuationCenter = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'ACTIVE',
    capacity: ''
  });

  useEffect(() => {
    const fetchEvacuationCenters = async () => {
      try {
        setLoading(true);
        const data = await getAllEvacuationCenters();
        setCenters(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvacuationCenters();
  }, []);

  const filteredCenters = centers.filter(center =>
    Object.values(center).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCenter = async () => {
    if (formData.name && formData.location && formData.capacity) {
      try {
        const newCenterData = {
          name: formData.name,
          location: formData.location,
          status: formData.status,
          capacity: parseInt(formData.capacity)
        };
        
        const createdCenter = await addEvacuationCenter(newCenterData);
        setCenters([...centers, createdCenter]);
        
        // Reset form
        setFormData({
          name: '',
          location: '',
          status: 'ACTIVE',
          capacity: ''
        });
        
        setShowAddModal(false);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    setFormData({
      name: center.name,
      location: center.location,
      status: center.status,
      capacity: center.capacity.toString()
    });
    setShowSelectModal(false);
    setShowEditModal(true);
  };

  const handleEditCenter = async () => {
    if (selectedCenter && formData.name && formData.location && formData.capacity) {
      try {
        const updateData = {
          name: formData.name,
          location: formData.location,
          status: formData.status,
          capacity: parseInt(formData.capacity)
        };

        const updatedCenter = await updateEvacuationCenter(selectedCenter.id, updateData);

        // Update local state with the response from the server
        const updatedCenters = centers.map(center =>
          center.id === selectedCenter.id ? updatedCenter : center
        );

        setCenters(updatedCenters);
        setSelectedCenter(null);
        setFormData({
          name: '',
          location: '',
          status: 'Open',
          capacity: ''
        });
        setShowEditModal(false);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDeleteCenter = async (centerId) => {
    if (window.confirm('Are you sure you want to delete this evacuation center?')) {
      try {
        await deleteEvacuationCenter(centerId);
        // Remove from local state
        setCenters(centers.filter(center => center.id !== centerId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCloseEdit = () => {
    setShowSelectModal(false);
    setShowEditModal(false);
    setSelectedCenter(null);
    setFormData({
      name: '',
      location: '',
      status: 'Open',
      capacity: ''
    });
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
              <div className="resource-form-header">Evacuation Centers</div>
              {error && <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>}
              {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>}
              {!loading && !error && (
                <>
                  <div className="resource-search-actions">
                    <SearchBar
                      placeholder="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                    <div className="resource-action-buttons">
                      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Center</Button>
                      <Button variant="primary" onClick={() => setShowSelectModal(true)}>Edit Center</Button>
                    </div>
                  </div>
                  <div className="resource-table-container">
                    <Table
                      columns={[
                        { key: 'name', header: 'Name' },
                        { key: 'location', header: 'Location' },
                        { key: 'status', header: 'Status', render: (value) => (
                          <span className={`evac-status ${value.toLowerCase()}`}>{value}</span>
                        ) },
                        { key: 'capacity', header: 'Capacity' },
                      ]}
                      data={filteredCenters}
                    />
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add Center Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Center"
        onSave={handleAddCenter}
      >
        <div className="form-container">
          <FormField
            label="Name:"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter evacuation center name"
          />
          
          <FormField
            label="Location:"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
          
          <FormField
            label="Status:"
            type="select"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={['ACTIVE', 'INACTIVE', 'FULL']}
          />
          
          <FormField
            label="Capacity:"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter capacity"
          />
        </div>
      </Modal>

      {/* Select Center Modal */}
      <Modal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        title="Select Center to Edit"
        showFooter={false}
      >
        <div className="center-selection">
          {centers.map(center => (
            <div
              key={center.id}
              className="center-option"
              onClick={() => handleSelectCenter(center)}
            >
              <div className="center-name">{center.name}</div>
              <div className="center-details">{center.location} • {center.status}</div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Edit Center Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseEdit}
        title="Edit Center"
        onSave={handleEditCenter}
        showFooter={false}
      >
        <div className="form-container">
          <FormField
            label="Name:"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter evacuation center name"
          />
          
          <FormField
            label="Location:"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
          
          <FormField
            label="Status:"
            type="select"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={['ACTIVE', 'INACTIVE', 'FULL']}
          />
          
          <FormField
            label="Capacity:"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter capacity"
          />
        </div>
        <div className="modal-actions">
          <Button variant="primary" onClick={handleEditCenter}>Save Changes</Button>
          <Button 
            variant="danger" 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this evacuation center?')) {
                handleDeleteCenter(selectedCenter.id);
                handleCloseEdit();
              }
            }}
          >
            Delete Center
          </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default admEvacuationCenter;
