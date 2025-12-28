import React from 'react';
import ResourceForm from './ResourceForm';

const ResourceAddModal = ({ isOpen, onClose, onAddResource }) => {
  const handleSaveItem = async (resourceData) => {
    // Pass resource data to parent handler which will call the API
    if (onAddResource) {
      await onAddResource(resourceData);
    }
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
