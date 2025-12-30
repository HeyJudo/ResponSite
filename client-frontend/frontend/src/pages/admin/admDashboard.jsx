import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import DashboardStatsCards from '../../features/admin/DashboardStatsCards';
import RecentIncidentsCard from '../../features/admin/RecentIncidentsCard';
import TotalUsersCard from '../../features/admin/TotalUsersCard';
import DashboardSummary from '../../features/admin/DashboardSummary';
import '../../styles/resident/global.css';
import '../../styles/admin/admDashboard.css';

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
              <DashboardStatsCards />
              <RecentIncidentsCard />
              <TotalUsersCard />
            </div>
            <DashboardSummary />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmDashboard;
