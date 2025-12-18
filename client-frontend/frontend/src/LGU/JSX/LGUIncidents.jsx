import "../CSS/LGUIncidentReports.css";
import { incidentReports } from "../JS/incidentReportsData";

const LGUIncidentReports = () => {
  return (
    <div className="content-only">
      <h2>Incident Reports</h2>
      <input className="search" placeholder="Search" />

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
          {incidentReports.map((i) => (
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
    </div>
  );
};

export default LGUIncidentReports;

