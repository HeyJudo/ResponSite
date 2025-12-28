import React, { useState } from 'react';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';

const STATUS_OPTIONS = [
  { value: 'Open', label: 'Open' },
  { value: 'Closed', label: 'Closed' }
];

const EvacuationCenterForm = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    location: '',
    status: 'Open',
    capacity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const newCenter = {
      id: initialData?.id || Date.now(), // Use timestamp as ID for simplicity
      ...formData,
      capacity: parseInt(formData.capacity) || 0
    };

    onSave(newCenter);
    onClose();

    // Reset form
    setFormData({
      name: '',
      location: '',
      status: 'Open',
      capacity: ''
    });
  };

  const modalTitle = initialData ? 'Edit Evacuation Center' : 'Add Evacuation Center';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      onSave={handleSave}
    >
      <div className="form-container">
        <FormField
          label="Center name:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter center name"
        />

        <FormField
          label="Location:"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter location"
        />

        <FormField
          label="Status:"
          type="select"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={STATUS_OPTIONS}
        />

        <FormField
          label="Capacity:"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
          placeholder="Enter capacity"
        />
      </div>
    </Modal>
  );
};

export default EvacuationCenterForm;