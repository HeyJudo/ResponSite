import React, { useState } from 'react';

const NotificationList = ({ notifications }) => {
  const [showModal, setShowModal] = useState(false);

  // Blur effect for background
  React.useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-blur');
    } else {
      document.body.classList.remove('modal-blur');
    }
    return () => document.body.classList.remove('modal-blur');
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h2>All Notifications</h2>
            <div className="modal-list">
              {notifications.map(n => (
                <div className="notif-item" key={n.id}>
                  {n.content}
                </div>
              ))}
            </div>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close</button>
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
            <button className="viewall-btn" onClick={() => setShowModal(true)}>View all</button>
          </div>
          <div className="notif-list-card">
            <div className="notif-list">
              {notifications.map(n => (
                <div className="notif-item notif-preview" key={n.id} title={n.content}>
                  {n.content.split('\n')[0].length > 80
                    ? n.content.split('\n')[0].slice(0, 80) + '...'
                    : n.content.split('\n')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationList;