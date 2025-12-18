import "../CSS/LGUDashboard.css";
import { dashboardStats, recentIncidents } from "../JS/dashboardData";

const LGUDashboard = () => {
  return (
    <div className="page">
      <aside className="sidebar">
        <h2>RESPONSITE</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Incident Reports</li>
          <li>Resource Management</li>
          <li>Infrastructure Projects</li>
        </ul>
      </aside>

      <main className="content">
        <div className="top-bar">
          <span>Sean_nevado</span>
          <div className="avatar" />
        </div>

        <div className="stats">
          {dashboardStats.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <h1>{stat.value}</h1>
              <p>{stat.label}</p>
              <button>View</button>
            </div>
          ))}
        </div>

        <div className="table-box">
          <h3>Recent Incident Reports</h3>
          <table>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Type</th>
                <th>Zone</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Reported by</th>
                <th>Date Reported</th>
                <th>Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.type}</td>
                  <td>{i.zone}</td>
                  <td>{i.severity}</td>
                  <td>{i.status}</td>
                  <td>{i.reportedBy}</td>
                  <td>{i.date}</td>
                  <td>{i.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all">View all</button>
        </div>
      </main>
    </div>
  );
};

export default LGUDashboard;
