import React, { useState } from 'react';
import Modal from '../../components/Modal';
import EvacuationCenterForm from './EvacuationCenterForm';

const EvacuationCenterEditModal = ({
  isOpen,
  onClose,
  onSave,
  centers,
  onCentersChange
}) => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedCenterName, setSelectedCenterName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);

  const handleSelectCenter = () => {
    const selected = centers.find(center => center.name === selectedCenterName);
    if (selected) {
      setEditingCenter({ ...selected });
      setShowSelectModal(false);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = (updatedCenter) => {
    if (editingCenter) {
      const updatedCenters = centers.map(center =>
        center.id === editingCenter.id ? updatedCenter : center
      );
      onCentersChange(updatedCenters);
      setShowEditModal(false);
      setEditingCenter(null);
      setSelectedCenterName('');
      onSave?.();
    }
  };

  const handleClose = () => {
    setShowSelectModal(false);
    setShowEditModal(false);
    setEditingCenter(null);
    setSelectedCenterName('');
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      setShowSelectModal(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Select Center Modal */}
      <Modal
        isOpen={showSelectModal}
        onClose={handleClose}
        title="Select Evacuation Center to Edit"
        onSave={handleSelectCenter}
      >
        <div className="form-container">
          <label className="form-field-label">Select Center:</label>
          <select
            value={selectedCenterName}
            onChange={(e) => setSelectedCenterName(e.target.value)}
            className="form-field-input"
          >
            <option value="">Choose a center...</option>
            {centers.map(center => (
              <option key={center.id || center.name} value={center.name}>
                {center.name}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Edit Center Modal */}
      <EvacuationCenterForm
        isOpen={showEditModal}
        onClose={handleClose}
        onSave={handleSaveEdit}
        initialData={editingCenter}
      />
    </>
  );
};

export default EvacuationCenterEditModal;