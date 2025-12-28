import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoSvg from '../../assets/logo.svg';

const RESIDENT_NAV_CONFIG = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Reports', path: '/incident-reports' },
  { label: 'Evacuation Center', path: '/evacuation-center' },
  { label: 'Infrastructure Projects', path: '/infrastructure-projects' },
];

const getActiveIndex = (pathname) => {
  if (pathname.startsWith('/incident-reports')) {
    return RESIDENT_NAV_CONFIG.findIndex(item => item.label === 'My Reports');
  }
  if (pathname.startsWith('/infrastructure-projects')) {
    return RESIDENT_NAV_CONFIG.findIndex(item => item.label === 'Infrastructure Projects');
  }
  let index = RESIDENT_NAV_CONFIG.findIndex(item => item.path === pathname);
  if (index !== -1) return index;
  return 0;
};

const ResidentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeIdx = getActiveIndex(location.pathname);

  return (
    <>
      <div className="sidebar-logo" style={{ position: 'absolute', top: -15, left: 32, zIndex: 10 }}>
        <img src={logoSvg} alt="Logo" />
        <span className="sidebar-title">RESPONSITE</span>
      </div>
      <aside className="sidebar" style={{ marginTop: 80 }}>
        <nav className="sidebar-nav">
          {RESIDENT_NAV_CONFIG.map((item, idx) => (
            <button
              key={item.path}
              className={`nav-btn${activeIdx === idx ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default ResidentSidebar;