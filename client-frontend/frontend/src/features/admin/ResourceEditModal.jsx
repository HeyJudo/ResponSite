import React, { useState } from 'react';
import Modal from '../../components/Modal';

// Category and location options
const CATEGORY_OPTIONS = [
  'Food & Water',
  'Medical Supplies',
  'Clothing',
  'Shelter Materials',
  'Tools & Equipment',
  'Transportation',
  'Communication',
  'Other'
];

const UNIT_OPTIONS = [
  'pieces',
  'kg',
  'liters',
  'boxes',
  'packs',
  'bottles',
  'cans',
  'rolls'
];

const LOCATION_OPTIONS = [
  'Main Warehouse',
  'Distribution Center A',
  'Distribution Center B',
  'Emergency Stockpile',
  'Field Depot 1',
  'Field Depot 2'
];

const ResourceEditModal = ({ 
  isOpen, 
  onClose, 
  onEditResource,
  onDeleteResource,
  resources
}) => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteItem = async () => {
    if (editingItem && onDeleteResource) {
      setIsLoading(true);
      try {
        await onDeleteResource(editingItem.id);
        setShowEditModal(false);
        setEditingItem(null);
      } catch (error) {
        console.error('Error deleting resource:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editingItem && onEditResource) {
      setIsLoading(true);
      try {
        const updatedData = {
          name: editingItem.name,
          category: editingItem.category,
          quantity: parseInt(editingItem.quantity) || 0,
          unit: editingItem.unit,
          location: editingItem.location,
          reorderLevel: parseInt(editingItem.reorderLevel) || 0,
          note: editingItem.note || '',
          status: (parseInt(editingItem.quantity) || 0) > (parseInt(editingItem.reorderLevel) || 0) ? 'Available' : 'Low Stock'
        };
        
        await onEditResource(editingItem.id, updatedData);
        setShowEditModal(false);
        setEditingItem(null);
      } catch (error) {
        console.error('Error updating resource:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShowSelectModal(false);
    setShowEditModal(false);
    setEditingItem(null);
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
        showFooter={false}
      >
        <div className="item-selection">
          {resources && resources.length > 0 ? (
            resources.map(item => (
              <div
                key={item.id}
                className="item-option"
                onClick={() => {
                  setEditingItem({ ...item });
                  setShowSelectModal(false);
                  setShowEditModal(true);
                }}
              >
                <div className="item-name">{item.name}</div>
                <div className="item-details">{item.category} • {item.location} • Qty: {item.quantity}</div>
              </div>
            ))
          ) : (
            <div className="no-items">No resources available to edit</div>
          )}
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
              <label>Quantity:</label>
              <input
                type="number"
                value={editingItem.quantity}
                onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 0 })}
              />
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

            {/* Delete Button */}
            <div className="edit-form-field delete-section">
              <button
                className="delete-item-btn"
                onClick={handleDeleteItem}
                type="button"
                disabled={isLoading}
              >
                Delete Item
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ResourceEditModal;
