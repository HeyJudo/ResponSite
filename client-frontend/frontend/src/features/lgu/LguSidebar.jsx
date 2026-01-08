import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoImg from '../../assets/responsite-logo.png';

// SVG Icons for navigation
const DashboardIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const IncidentIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
  </svg>
);

const ResourceIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
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

const LGU_NAV_CONFIG = [
  { label: 'Dashboard', path: '/lguDashboard', icon: DashboardIcon },
  { label: 'Incident Reports', path: '/lguIncidentReports', icon: IncidentIcon },
  { label: 'Resource Management', path: '/lguResourceManagement', icon: ResourceIcon },
  { label: 'Evacuation Center', path: '/lguEvacuationCenter', icon: EvacuationIcon },
  { label: 'Infrastructure Projects', path: '/lguInfraProjects', icon: ProjectIcon },
];

const getActiveIndex = (pathname) => {
  // Special handling for Incident Reports and its details
  if (pathname.startsWith('/lguIncidentReports')) {
    return LGU_NAV_CONFIG.findIndex(item => item.label === 'Incident Reports');
  }
  // Special handling for Infrastructure Projects and Feedback list
  if (pathname.startsWith('/lguInfraProjects') || pathname.startsWith('/lguListOfFeedbacks')) {
    return LGU_NAV_CONFIG.findIndex(item => item.label === 'Infrastructure Projects');
  }
  let index = LGU_NAV_CONFIG.findIndex(item => item.path === pathname);
  if (index !== -1) return index;
  return 0;
};

const LguSidebar = () => {
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
        <div className="sidebar-logo" style={{ position: 'absolute', top: -15, left: -20, zIndex: 10 }}>
          <img src={logoImg} alt="Logo" style={{ width: '60px', height: '60px' }} />
          <span className="sidebar-title">RESPONSITE</span>
        </div>
        <aside className="sidebar" style={{ marginTop: 80 }}>
          <nav className="sidebar-nav">
            {LGU_NAV_CONFIG.map((item, idx) => {
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

export default LguSidebar;