import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/dashboard.css';
import logoSvg from '../../assets/logo.svg';

const navItems = [
  'Dashboard',
  'Incident Reports',
  'Evacuation Center',
  'Infrastructure Projects',
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine activeIdx from current path
  let activeIdx = 0;
  if (location.pathname === '/dashboard') activeIdx = 0;
  else if (location.pathname === '/incident-reports') activeIdx = 1;
  else if (location.pathname === '/evacuation-center') activeIdx = 2;
  else if (location.pathname === '/infrastructure-projects') activeIdx = 3;

  return (
    <>
      <div className="sidebar-logo" style={{ position: 'absolute', top: -15, left: 32, zIndex: 10 }}>
        <img src={logoSvg} alt="Logo" />
        <span className="sidebar-title">RESPONSITE</span>
      </div>
      <aside className="sidebar" style={{ marginTop: 80 }}>
        <nav className="sidebar-nav">
          {navItems.map((item, idx) => (
            <button
              key={item}
              className={`nav-btn${activeIdx === idx ? ' active' : ''}`}
              onClick={() => {
                if (item === 'Evacuation Center') navigate('/evacuation-center');
                else if (item === 'Dashboard') navigate('/dashboard');
                else if (item === 'Incident Reports') navigate('/incident-reports');
                else if (item === 'Infrastructure Projects') navigate('/infrastructure-projects');
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;