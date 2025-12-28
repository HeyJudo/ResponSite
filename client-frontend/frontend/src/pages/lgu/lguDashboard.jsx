import LguSidebar from '../../features/lgu/LguSidebar';
import LguHeader from '../../features/lgu/LguHeader';
import DashboardStatsCards from '../../features/lgu/DashboardStatsCards';
import RecentIncidentsCard from '../../features/lgu/RecentIncidentsCard';
import '../../styles/resident/global.css';
import '../../styles/lgu/lguDashboard.css';

const LguDashboard = () => {
  return (
    <div className="dashboard-root">
      <LguHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <LguSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="admin-forms-stack">
              <DashboardStatsCards />
              <RecentIncidentsCard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LguDashboard;
