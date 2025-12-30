import React, { useState, useEffect } from 'react';
import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import ResourceAddModal from '../../features/admin/ResourceAddModal';
import ResourceEditModal from '../../features/admin/ResourceEditModal';
import ResourceStockModal from '../../features/admin/ResourceStockModal';
import '../../styles/resident/global.css';
import '../../styles/admin/admResourceManagement.css';
import Table from '../../components/Table';
import SearchBar from './../../components/SearchBar';
import Button from '../../components/Button';
import { getAllResources, addResource, updateResource, deleteResource } from '../../API/resourceService';
import { statusColors } from '../../features/admin/admInfraProjects.constants';

const LguResourceManagement = () => {
  // Function to normalize status text to title case and replace underscores
  const normalizeStatus = (status) => {
    if (!status) return status;
    return status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await getAllResources();
        setResources(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleAddResource = async (resourceData) => {
    try {
      const newResource = await addResource(resourceData);
      setResources([...resources, newResource]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditResource = async (id, updatedData) => {
    try {
      const updatedResource = await updateResource(id, updatedData);
      setResources(resources.map(resource => 
        resource.id === id ? updatedResource : resource
      ));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await deleteResource(id);
      setResources(resources.filter(resource => resource.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStockChange = async (id, newQuantity) => {
    try {
      const resourceToUpdate = resources.find(r => r.id === id);
      if (resourceToUpdate) {
        const updatedData = {
          ...resourceToUpdate,
          quantity: newQuantity,
          status: newQuantity > resourceToUpdate.reorderLevel ? 'Available' : 'Low Stock'
        };
        const updatedResource = await updateResource(id, updatedData);
        setResources(resources.map(resource => 
          resource.id === id ? updatedResource : resource
        ));
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category' },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (quantity, row) => (
        <div className="quantity-control">
          <button
            className="quantity-btn quantity-minus"
            onClick={() => {
              setSelectedStockItem({ ...row, action: 'decrease' });
              setShowStockModal(true);
            }}
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            className="quantity-btn quantity-plus"
            onClick={() => {
              setSelectedStockItem({ ...row, action: 'increase' });
              setShowStockModal(true);
            }}
          >
            +
          </button>
        </div>
      )
    },
    { key: 'unit', header: 'Unit' },
    { key: 'location', header: 'Location' },
    { 
      key: 'status', 
      header: 'Status',
      render: (status) => (
        <span className={`status-chip ${statusColors[status] || ""}`}>
          {normalizeStatus(status)}
        </span>
      )
    }
  ];

  const filteredData = resources.filter(row =>
    Object.values(row).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="dashboard-root">
      <LguHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <LguSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Resources</div>
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
                      <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Item</Button>
                      <Button variant="primary" onClick={() => setShowEditModal(true)}>Edit Item</Button>
                    </div>
                  </div>
                  <div className="resource-table-container">
                    <Table columns={columns} data={filteredData} />
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add Item Modal */}
      <ResourceAddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddResource={handleAddResource}
      />

      {/* Edit Item Modal */}
      <ResourceEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        resources={resources}
        onEditResource={handleEditResource}
        onDeleteResource={handleDeleteResource}
      />

      {/* Stock Increase/Decrease Modal */}
      <ResourceStockModal
        isOpen={showStockModal}
        onClose={() => {
          setShowStockModal(false);
          setSelectedStockItem(null);
        }}
        selectedItem={selectedStockItem}
        onStockChange={handleStockChange}
      />
    </div>
  );
}

export default LguResourceManagement;