import Button from './Button';
import '../styles/modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSave, 
  showFooter = true,
  saveButtonText = "Save",
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <div className="modal-header">{title}</div>
        <div className="modal-body">
          {children}
        </div>
        {showFooter && (
          <div className="modal-footer">
            <Button variant="primary" onClick={onSave}>{saveButtonText}</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
