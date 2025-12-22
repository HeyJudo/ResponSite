import React, { useState } from 'react';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import { CATEGORY_OPTIONS, UNIT_OPTIONS, LOCATION_OPTIONS, calculateStatus, resourceSampleData } from '../../API/admin/resourceSampleData';

const ResourceForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: '',
    quantity: '',
    unit: '',
    location: '',
    reorderLevel: '',
    note: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const newItem = {
      id: initialData?.id || Math.max(...resourceSampleData.map(r => r.id || 0), 0) + 1,
      ...formData,
      status: calculateStatus(formData.quantity, formData.reorderLevel)
    };
    
    if (initialData) {
      // Update existing item
      const index = resourceSampleData.findIndex(r => r.id === initialData.id);
      if (index !== -1) {
        resourceSampleData[index] = newItem;
      }
    } else {
      // Add new item
      resourceSampleData.push(newItem);
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      location: '',
      reorderLevel: '',
      note: ''
    });

    onSave?.();
    onClose();
  };

  const modalTitle = initialData ? 'Edit Item' : 'Add Item';

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      onSave={handleSave}
    >
      <div className="form-container">
        <FormField 
          label="Item name:" 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter item name"
        />
        
        <FormField 
          label="Category:" 
          type="select"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={CATEGORY_OPTIONS}
        />
        
        <FormField 
          label="Quantity:" 
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Enter quantity"
        />
        
        <FormField 
          label="Unit:" 
          type="select"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
          options={UNIT_OPTIONS}
        />
        
        <FormField 
          label="Location:" 
          type="select"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          options={LOCATION_OPTIONS}
        />
        
        <FormField 
          label="Reorder level:" 
          type="number"
          name="reorderLevel"
          value={formData.reorderLevel}
          onChange={handleInputChange}
          placeholder="Enter reorder level"
        />
        
        <FormField 
          label="Note:" 
          type="textarea"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          placeholder="Enter additional notes"
        />
      </div>
    </Modal>
  );
};

export default ResourceForm;
