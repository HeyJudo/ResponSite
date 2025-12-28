import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/resident/global.css';
import '../../styles/admin/admListOfFeedbacks.css';

const AdmListOfFeedbacks = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">List of Feedbacks</div>
              <div style={{ padding: '1.5rem' }}>
                <Button variant="primary" onClick={() => navigate('/admInfraProjects')}>Return to List of Projects</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default AdmListOfFeedbacks;