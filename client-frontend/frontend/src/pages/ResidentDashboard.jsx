import Sidebar from '../components/resident_dashboard/Sidebar';
import Header from '../components/resident_dashboard/Header';
import IncidentCard from '../components/resident_dashboard/IncidentCard';
import QuickButtons from '../components/resident_dashboard/QuickButtons';
import NotificationList from '../components/resident_dashboard/NotificationList';
import { dummyNotifications } from '../constants/dummyNotifications';
import '../styles/global.css';
import '../styles/dashboard.css';


const Dashboard = () => {
  // TODO: API Call for incident count
  const incidentCount = 0;

  // TODO: API Call for notifications

  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <IncidentCard count={incidentCount} />
            <QuickButtons />
            <NotificationList notifications={dummyNotifications} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;