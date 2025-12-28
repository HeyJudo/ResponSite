import React from 'react';
import EvacuationCenterForm from './EvacuationCenterForm';

const EvacuationCenterAddModal = ({ isOpen, onClose, onSave, centers, onCentersChange }) => {
  const handleSaveCenter = (newCenter) => {
    const updatedCenters = [...centers, newCenter];
    onCentersChange(updatedCenters);
    onSave?.();
  };

  return (
    <EvacuationCenterForm
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSaveCenter}
    />
  );
};

export default EvacuationCenterAddModal;