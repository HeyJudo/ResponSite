import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';
import '../../styles/admin/admDashboard.css';
import { getPendingIncidentReportsCount, getItemsLowOnStockCount, getActiveInfraProjectsCount } from '../../API/admin/adminDashboardCounts';

const AdmDashboard = () => {
  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="admin-forms-stack">
              <form className="admin-form-card">
                <span className="admin-form-count">{getPendingIncidentReportsCount()}</span>  
                <span className="admin-form-title">Pending Incident Reports</span>
                <button type="button" className="admin-form-view-btn">View</button>
              </form>
              <form className="admin-form-card">
                <span className="admin-form-count">{getItemsLowOnStockCount()}</span>
                <span className="admin-form-title">Items Low on Stock</span>
                <button type="button" className="admin-form-view-btn">View</button>
              </form>
              <form className="admin-form-card">
                <span className="admin-form-count">{getActiveInfraProjectsCount()}</span>
                <span className="admin-form-title">Active Infrastructure Projects</span>
                <button type="button" className="admin-form-view-btn">View</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdmDashboard;
