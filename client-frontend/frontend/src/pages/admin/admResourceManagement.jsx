import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import ResourceAddModal from '../../features/admin/ResourceAddModal';
import ResourceEditModal from '../../features/admin/ResourceEditModal';
import ResourceStockModal from '../../features/admin/ResourceStockModal';
import '../../styles/resident/global.css';
import '../../styles/admin/admResourceManagement.css';
import Table from '../../components/Table';
import SearchBar from './../../components/SearchBar';
import Button from '../../components/Button';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { useConfirm } from '../../components/ConfirmDialog';
import { getAllResources, addResource, updateResource, deleteResource } from '../../API/resourceService';
import { statusColors } from '../../features/admin/admInfraProjects.constants';

const AdmResourceManagement = () => {
  const toast = useToast();
  const { confirmDelete } = useConfirm();
  
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
        toast.error('Failed to load resources');
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
      toast.success('Resource added successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to add resource');
    }
  };

  const handleEditResource = async (id, updatedData) => {
    try {
      const updatedResource = await updateResource(id, updatedData);
      setResources(resources.map(resource => 
        resource.id === id ? updatedResource : resource
      ));
      setError(null);
      toast.success('Resource updated successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update resource');
    }
  };

  const handleDeleteResource = async (id) => {
    const resourceName = resources.find(r => r.id === id)?.name || 'this resource';
    const confirmed = await confirmDelete(resourceName);
    
    if (!confirmed) return;
    
    try {
      await deleteResource(id);
      setResources(resources.filter(resource => resource.id !== id));
      setError(null);
      toast.success('Resource deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete resource');
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
        toast.success('Stock updated successfully');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update stock');
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

  const handleIncreaseStock = () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      setResources(resources.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: item.quantity + amount }
          : item
      ));
      setShowIncreaseModal(false);
      setSelectedItem(null);
      setStockAmount('');
      setReason('');
    }
  };

  const handleDecreaseStock = () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      setResources(resources.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: Math.max(0, item.quantity - amount) }
          : item
      ));
      setShowDecreaseModal(false);
      setSelectedItem(null);
      setStockAmount('');
      setReason('');
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
              <div className="resource-form-header">Resources</div>
              {error && <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>}
              {loading ? (
                <div style={{ padding: '20px' }}>
                  <SkeletonTable rows={5} columns={6} />
                </div>
              ) : (
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
                    {filteredData.length > 0 ? (
                      <Table columns={columns} data={filteredData} />
                    ) : (
                      <EmptyState 
                        preset="resources"
                        action={() => setShowAddModal(true)}
                        actionLabel="Add First Resource"
                      />
                    )}
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

export default AdmResourceManagement;