import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const ResourceStockModal = ({ 
  isOpen, 
  onClose, 
  selectedItem,
  onStockChange
}) => {
  const [stockAmount, setStockAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStockAmount('');
    }
  }, [isOpen]);

  const handleIncreaseStock = async () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      setIsLoading(true);
      try {
        await onStockChange(selectedItem.id, selectedItem.quantity + amount);
        onClose();
      } catch (error) {
        console.error('Error increasing stock:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDecreaseStock = async () => {
    if (selectedItem && stockAmount) {
      const amount = parseInt(stockAmount) || 0;
      const newQuantity = Math.max(0, selectedItem.quantity - amount);
      setIsLoading(true);
      try {
        await onStockChange(selectedItem.id, newQuantity);
        onClose();
      } catch (error) {
        console.error('Error decreasing stock:', error);
      } finally {
        setIsLoading(false);
      }
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export { ResourceStockModal as default, ResourceStockModal };
