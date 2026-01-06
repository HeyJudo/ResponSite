import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoImg from '../../assets/responsite-logo.png';

const LGU_NAV_CONFIG = [
  { label: 'Dashboard', path: '/lguDashboard' },
  { label: 'Incident Reports', path: '/lguIncidentReports' },
  { label: 'Resource Management', path: '/lguResourceManagement' },
  { label: 'Evacuation Center', path: '/lguEvacuationCenter' },
  { label: 'Infrastructure Projects', path: '/lguInfraProjects' },
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
            {LGU_NAV_CONFIG.map((item, idx) => (
              <button
                key={item.path}
                className={`nav-btn${activeIdx === idx ? ' active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default LguSidebar;