import React, { useState, useContext } from 'react';
import userDefaultSvg from '../../assets/user-default.svg';
import AdminProfileModal from './AdminProfileModal';
import { AdminProfileContext } from '../../context/AdminProfileContext';
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';

const AdminHeader = () => {
  const { profileData } = useContext(AdminProfileContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <header className="dashboard-header">
        <div />
        <div className="user-info" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <span>{profileData.username}</span>
          <img src={userDefaultSvg} alt="User Icon" className="user-icon" />
        </div>
      </header>

      <AdminProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default AdminHeader;
