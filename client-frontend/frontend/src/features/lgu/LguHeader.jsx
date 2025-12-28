import React, { useState, useContext } from 'react';
import userDefaultSvg from '../../assets/user-default.svg';
import LguProfileModal from './LguProfileModal';
import { LguProfileContext } from '../../context/LguProfileContext';
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';

const LguHeader = () => {
  const { profileData } = useContext(LguProfileContext);
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

      <LguProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default LguHeader;