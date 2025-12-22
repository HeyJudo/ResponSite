import React from 'react';
import ResourceForm from './ResourceForm';
import { resourceSampleData } from '../../API/admin/resourceSampleData';

const ResourceAddModal = ({ isOpen, onClose, onSave, resources, onResourcesChange }) => {
  const handleSaveItem = () => {
    // After ResourceForm saves, update parent with the latest resourceSampleData
    onResourcesChange([...resourceSampleData]);
    onSave?.();
  };

  return (
    <ResourceForm 
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSaveItem}
    />
  );
}

export default ResourceAddModal;
