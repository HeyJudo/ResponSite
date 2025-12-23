import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const ResourceStockModal = ({ 
  isOpen, 
  onClose, 
  selectedItem,
  resources, 
  onResourcesChange 
}) => {
  const [stockAmount, setStockAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStockAmount('');
      setReason('');
    }
  }, [isOpen]);

  const handleIncreaseStock = () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      const updatedResources = resources.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: item.quantity + amount }
          : item
      );
      onResourcesChange(updatedResources);
      onClose();
    }
  };

  const handleDecreaseStock = () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      const updatedResources = resources.map(item => 
        item.id === selectedItem.id 
          ? { ...item, quantity: Math.max(0, item.quantity - amount) }
          : item
      );
      onResourcesChange(updatedResources);
      onClose();
    }
  };

  const isIncreasing = selectedItem?.action === 'increase';
  const isDecreasing = selectedItem?.action === 'decrease';

  return (
    <>
      {/* Increase Stock Modal */}
      <Modal
        isOpen={isOpen && isIncreasing}
        onClose={onClose}
        title="Increase Stock"
        saveButtonText="Save"
        onSave={handleIncreaseStock}
      >
        {selectedItem && (
          <div className="edit-form-container">
            <div className="edit-form-field">
              <label>Item: {selectedItem.name}</label>
            </div>
            <div className="edit-form-field">
              <label>Current Quantity: {selectedItem.quantity}</label>
            </div>
            <div className="edit-form-field">
              <label>Amount to Increase:</label>
              <input
                type="number"
                min="0"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="edit-form-field">
              <label>Reason:</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for increase"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Decrease Stock Modal */}
      <Modal
        isOpen={isOpen && isDecreasing}
        onClose={onClose}
        title="Decrease Stock"
        saveButtonText="Save"
        onSave={handleDecreaseStock}
      >
        {selectedItem && (
          <div className="edit-form-container">
            <div className="edit-form-field">
              <label>Item: {selectedItem.name}</label>
            </div>
            <div className="edit-form-field">
              <label>Current Quantity: {selectedItem.quantity}</label>
            </div>
            <div className="edit-form-field">
              <label>Amount to Decrease:</label>
              <input
                type="number"
                min="0"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="edit-form-field">
              <label>Reason:</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for decrease"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export { ResourceStockModal as default, ResourceStockModal };
