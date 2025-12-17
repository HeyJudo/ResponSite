import { useState, useEffect } from 'react';

/**
 * Truncates text to specified length
 */
const truncateText = (text, maxLength = 80) => {
  const firstLine = text.split('\n')[0];
  return firstLine.length > maxLength ? `${firstLine.slice(0, maxLength)}...` : firstLine;
};

/**
 * NotificationItem component for rendering individual notifications
 */
const NotificationItem = ({ content, preview = false }) => (
  <div 
    className={`notif-item${preview ? ' notif-preview' : ''}`} 
    title={preview ? content : undefined}
  >
    {preview ? truncateText(content) : content}
  </div>
);

const NotificationList = ({ notifications }) => {
  const [showModal, setShowModal] = useState(false);

  // Toggle body blur effect when modal is shown/hidden
  useEffect(() => {
    document.body.classList.toggle('modal-blur', showModal);
    return () => document.body.classList.remove('modal-blur');
  }, [showModal]);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h2>All Notifications</h2>
            <div className="modal-list">
              {notifications.map(n => (
                <NotificationItem key={n.id} content={n.content} />
              ))}
            </div>
            <button className="close-modal-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <div className="notifications">
        <div className="notifications-header">
          <h2>Recent Notifications</h2>
        </div>
        <div className="notifications-section">
          <div className="notif-section-header">
            <span className="notif-section-title">New</span>
            <button className="viewall-btn" onClick={openModal}>View all</button>
          </div>
          <div className="notif-list-card">
            <div className="notif-list">
              {notifications.map(n => (
                <NotificationItem key={n.id} content={n.content} preview />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationList;
