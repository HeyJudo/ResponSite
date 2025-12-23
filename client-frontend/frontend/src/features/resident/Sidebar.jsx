import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/resident/dashboard.css';
import logoSvg from '../../assets/logo.svg';

// Navigation configuration: maps nav items to their routes
const NAV_CONFIG = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Reports', path: '/incident-reports' },
  { label: 'Evacuation Center', path: '/evacuation-center' },
  { label: 'Infrastructure Projects', path: '/infrastructure-projects' },
];

/**
 * Determines active navigation index based on current path
 * Handles subroutes (e.g., /incident-reports/123)
 */
const getActiveIndex = (pathname) => {
  // Exact match first
  let index = NAV_CONFIG.findIndex(item => item.path === pathname);
  if (index !== -1) return index;
  // Handle /incident-reports/:id as active for My Reports
  if (pathname.startsWith('/incident-reports')) {
    return NAV_CONFIG.findIndex(item => item.path === '/incident-reports');
  }
  // Add more subroute logic if needed
  return 0;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeIdx = getActiveIndex(location.pathname);

  return (
    <>
      <div className="sidebar-logo" style={{ position: 'absolute', top: -15, left: 10, zIndex: 10 }}>
        <img src={logoSvg} alt="Logo" />
        <span className="sidebar-title">RESPONSITE</span>
      </div>
      <aside className="sidebar" style={{ marginTop: 80 }}>
        <nav className="sidebar-nav">
          {NAV_CONFIG.map((item, idx) => (
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

export default Sidebar;
