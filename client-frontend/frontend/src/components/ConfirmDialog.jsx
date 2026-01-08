import React, { createContext, useContext, useState, useCallback } from 'react';
import './ConfirmDialog.css';

/**
 * Confirmation Dialog System
 * "Are you sure?" dialogs for destructive actions
 */

const ConfirmContext = createContext(null);

// Dialog types with their configurations
const DIALOG_TYPES = {
  danger: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    confirmClass: 'confirm-btn-danger',
  },
  warning: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    confirmClass: 'confirm-btn-warning',
  },
  info: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    confirmClass: 'confirm-btn-info',
  },
};

// The actual dialog component
const ConfirmDialog = ({ 
  isOpen, 
  type = 'danger',
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const config = DIALOG_TYPES[type] || DIALOG_TYPES.danger;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onCancel?.();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !isLoading) {
      onCancel?.();
    }
  };

  return (
    <div 
      className="confirm-overlay" 
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className={`confirm-dialog confirm-${type}`}>
        <div className="confirm-icon">
          {config.icon}
        </div>
        
        <h2 id="confirm-title" className="confirm-title">
          {title || 'Are you sure?'}
        </h2>
        
        <p className="confirm-message">
          {message || 'This action cannot be undone.'}
        </p>
        
        <div className="confirm-actions">
          <button 
            className="confirm-btn confirm-btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button 
            className={`confirm-btn ${config.confirmClass}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="confirm-loading">
                <span className="loading-spinner"></span>
                Processing...
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Provider component
export const ConfirmProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    isLoading: false,
    resolve: null,
  });

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: options.type || 'danger',
        title: options.title || 'Are you sure?',
        message: options.message || 'This action cannot be undone.',
        confirmLabel: options.confirmLabel || 'Confirm',
        cancelLabel: options.cancelLabel || 'Cancel',
        isLoading: false,
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    dialogState.resolve?.(true);
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  }, [dialogState.resolve]);

  const handleCancel = useCallback(() => {
    dialogState.resolve?.(false);
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  }, [dialogState.resolve]);

  const setLoading = useCallback((loading) => {
    setDialogState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  // Convenience methods for common confirmations
  const confirmDelete = useCallback((itemName = 'this item') => {
    return confirm({
      type: 'danger',
      title: 'Delete Item',
      message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    });
  }, [confirm]);

  const confirmAction = useCallback((title, message) => {
    return confirm({
      type: 'warning',
      title,
      message,
      confirmLabel: 'Continue',
      cancelLabel: 'Cancel',
    });
  }, [confirm]);

  const value = {
    confirm,
    confirmDelete,
    confirmAction,
    setLoading,
  };

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        type={dialogState.type}
        title={dialogState.title}
        message={dialogState.message}
        confirmLabel={dialogState.confirmLabel}
        cancelLabel={dialogState.cancelLabel}
        isLoading={dialogState.isLoading}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

// Custom hook
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};

export default ConfirmDialog;
