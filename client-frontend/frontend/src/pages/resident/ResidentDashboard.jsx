import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import IncidentCard from '../../features/resident/IncidentCard';
import QuickButtons from '../../features/resident/QuickButtons';
import NotificationList from '../../features/resident/NotificationList';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { getMyIncidents } from '../../API/incidentService';
import { getDashboardStats } from '../../API/dashboardService';
import { getAllProjects } from '../../API/projectService';
import { incidentStatusColors } from '../../features/admin/admInfraProjects.constants';
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';
import { useState, useEffect } from 'react';


const Dashboard = () => {
  const [incidentCount, setIncidentCount] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myIncidents, stats, projects] = await Promise.all([
          getMyIncidents(),
          getDashboardStats(),
          getAllProjects(),
        ]);

        setIncidents(myIncidents);
        setDashboardStats(stats);

        // Active reports count from stats if available, otherwise use list length
        setIncidentCount(
          stats && stats.myActiveReports !== undefined
            ? stats.myActiveReports
            : myIncidents.length
        );

        // Build notifications
        const incidentNotifs = (myIncidents || [])
          .filter(inc => inc.status === 'IN_PROGRESS' || inc.status === 'RESOLVED')
          .map(inc => ({
            id: `inc-${inc.id || inc.timestamp || Math.random()}`,
            content:
              inc.status === 'IN_PROGRESS'
                ? `Your incident (${inc.type || 'Incident'}) is now in progress.`
                : `Your incident (${inc.type || 'Incident'}) has been resolved.`
          }));

        const projectNotifs = (projects || []).map(proj => ({
          id: `proj-${proj.id || proj.name || Math.random()}`,
          content: `New infrastructure project created: ${proj.name || 'Project'}.`
        }));

        setNotifications([...incidentNotifs, ...projectNotifs]);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-root">
      <ResidentHeader />
      <div className="dashboard-body-row">
        <ResidentSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <IncidentCard count={incidentCount} onViewClick={handleViewClick} />
            <QuickButtons />
            <NotificationList notifications={notifications} />
          </main>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Incident Reports"
        showFooter={false}
        className="modal-wide"
      >
        <Table
          columns={[
            { key: 'id', header: 'Incident ID' },
            { key: 'type', header: 'Type' },
            { key: 'zone', header: 'Zone' },
            { key: 'severity', header: 'Severity' },
            { key: 'status', header: 'Status', render: (value) => (
              <span className={`status-chip ${incidentStatusColors[value] || ""}`}>
                {value}
              </span>
            ) },
            { key: 'reporterName', header: 'Reported By' },
            { key: 'timestamp', header: 'Date Reported', render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' },
            { key: 'assignedTo', header: 'Assigned to', render: (value) => value || '---' },
          ]}
          data={incidents}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;