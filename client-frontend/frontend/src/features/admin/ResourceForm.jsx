import React, { useState } from 'react';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';

const CATEGORY_OPTIONS = [
  'Shelter Supplies',
  'Clothing',
  'Food',
  'Equipment',
  'Medicine'
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

const ResourceForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: '',
    quantity: '',
    unit: '',
    location: '',
    reorderLevel: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const resourceData = {
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity) || 0,
      unit: formData.unit,
      location: formData.location,
      reorderLevel: parseInt(formData.reorderLevel) || 0,
      status: (parseInt(formData.quantity) || 0) > (parseInt(formData.reorderLevel) || 0) ? 'Available' : 'Low Stock'
    };

    try {
      await onSave(resourceData);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        location: '',
        reorderLevel: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving resource:', error);
    }
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
      </div>
    </Modal>
  );
};

export default ResourceForm;
