import React, { useState } from 'react';
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
import { resourceSampleData } from '../../API/admin/resourceSampleData';

const AdmResourceManagement = () => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [resources, setResources] = useState(resourceSampleData);

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
    { key: 'status', header: 'Status' }
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
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Resources</div>
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
            </div>
          </main>
        </div>
      </div>

      {/* Add Item Modal */}
      <ResourceAddModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={() => {
          // Resources will be updated via callback
        }}
        resources={resources}
        onResourcesChange={setResources}
      />

      {/* Edit Item Modal */}
      <ResourceEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        resources={resources}
        onResourcesChange={setResources}
      />

      {/* Stock Increase/Decrease Modal */}
      <ResourceStockModal
        isOpen={showStockModal}
        onClose={() => {
          setShowStockModal(false);
          setSelectedStockItem(null);
        }}
        selectedItem={selectedStockItem}
        resources={resources}
        onResourcesChange={setResources}
      />
    </div>
  );
}

export default AdmResourceManagement;