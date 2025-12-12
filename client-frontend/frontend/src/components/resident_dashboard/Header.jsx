import React from 'react';
import userIconSvg from '../../assets/user-icon.svg';

const Header = () => (
  <header className="dashboard-header">
    <div />
    <div className="user-info">
      <span>resident</span>
      <img src={userIconSvg} alt="User Icon" className="user-icon" />
    </div>
  </header>
);

export default Header;