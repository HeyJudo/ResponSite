import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoSvg from '../../assets/logo.svg';

const ADMIN_NAV_CONFIG = [
  { label: 'Dashboard', path: '/admDashboard' },
  { label: 'Incident Reports', path: '/admin-page-2' },
  { label: 'Resource Management', path: '/admin-page-3' },
  { label: 'Infrastructure Projects', path: '/admin-page-4' },
  { label: 'List of ', path: '/admin-page-5' },
];

const getActiveIndex = (pathname) => {
  let index = ADMIN_NAV_CONFIG.findIndex(item => item.path === pathname);
  if (index !== -1) return index;
  return 0;
};

const AdminSidebar = () => {
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
          {ADMIN_NAV_CONFIG.map((item, idx) => (
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

export default AdminSidebar;
