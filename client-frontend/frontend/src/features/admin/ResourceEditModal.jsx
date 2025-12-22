import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { CATEGORY_OPTIONS, UNIT_OPTIONS, LOCATION_OPTIONS, calculateStatus } from '../../API/admin/resourceSampleData';

const ResourceEditModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  resources, 
  onResourcesChange 
}) => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSelectItem = () => {
    const selected = resources.find(item => item.name === selectedItemName);
    if (selected) {
      setEditingItem({ ...selected });
      setShowSelectModal(false);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedResources = resources.map(item => 
        item.id === editingItem.id 
          ? { ...editingItem, status: calculateStatus(editingItem.quantity, editingItem.reorderLevel) }
          : item
      );
      onResourcesChange(updatedResources);
      setShowEditModal(false);
      setEditingItem(null);
      setSelectedItemName('');
    }
  };

  const handleClose = () => {
    setShowSelectModal(false);
    setShowEditModal(false);
    setEditingItem(null);
    setSelectedItemName('');
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      setShowSelectModal(true);
    }
  }, [isOpen]);

  return (
    <>
      {/* Select Item Modal */}
      <Modal
        isOpen={showSelectModal}
        onClose={handleClose}
        title="Select Item to Edit"
        saveButtonText="Select"
        onSave={handleSelectItem}
      >
        <div className="edit-form-field">
          <label>Item Name:</label>
          <select
            value={selectedItemName}
            onChange={(e) => setSelectedItemName(e.target.value)}
          >
            <option value="">Select an item...</option>
            {resources.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Edit Item Details Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingItem(null);
        }}
        title="Edit Item"
        saveButtonText="Save"
        onSave={handleSaveEdit}
      >
        {editingItem && (
          <div className="edit-form-container">
            <div className="edit-form-field">
              <label>Item Name:</label>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
            </div>

            <div className="edit-form-field">
              <label>Category:</label>
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-form-field">
              <label>Unit:</label>
              <select
                value={editingItem.unit}
                onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
              >
                {UNIT_OPTIONS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-form-field">
              <label>Location:</label>
              <select
                value={editingItem.location}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
              >
                {LOCATION_OPTIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-form-field">
              <label>Reorder Level:</label>
              <input
                type="number"
                value={editingItem.reorderLevel}
                onChange={(e) => setEditingItem({ ...editingItem, reorderLevel: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="edit-form-field">
              <label>Note:</label>
              <input
                type="text"
                value={editingItem.note || ''}
                onChange={(e) => setEditingItem({ ...editingItem, note: e.target.value })}
                placeholder="Add a note..."
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ResourceEditModal;
