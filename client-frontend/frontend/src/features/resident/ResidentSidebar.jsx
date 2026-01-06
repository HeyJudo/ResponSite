import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoImg from '../../assets/responsite-logo.png';

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
            {RESIDENT_NAV_CONFIG.map((item, idx) => (
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

export default ResidentSidebar;