import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import '../../styles/resident/global.css';
import '../../styles/admin/admIncidentReportsDet.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AdmIncidentReportsDet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incident = location.state?.incident;

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmIncidentReportsDet;