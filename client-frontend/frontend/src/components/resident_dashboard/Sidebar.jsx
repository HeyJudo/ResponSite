import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/dashboard.css';
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
 */
const getActiveIndex = (pathname) => {
  const index = NAV_CONFIG.findIndex(item => item.path === pathname);
  return index !== -1 ? index : 0;
};

const Sidebar = () => {
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