import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoImg from '../../assets/responsite-logo.png';

// SVG Icons for navigation
const DashboardIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const ReportsIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const EvacuationIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const ProjectIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
  </svg>
);

const RESIDENT_NAV_CONFIG = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'My Reports', path: '/incident-reports', icon: ReportsIcon },
  { label: 'Evacuation Center', path: '/evacuation-center', icon: EvacuationIcon },
  { label: 'Infrastructure Projects', path: '/infrastructure-projects', icon: ProjectIcon },
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button 
        className="hamburger-btn" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div className={`dashboard-left ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo" className="sidebar-logo-img" />
          <span className="sidebar-title">RESPONSITE</span>
        </div>
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {RESIDENT_NAV_CONFIG.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.path}
                  className={`nav-btn${activeIdx === idx ? ' active' : ''}`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <IconComponent />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default ResidentSidebar;