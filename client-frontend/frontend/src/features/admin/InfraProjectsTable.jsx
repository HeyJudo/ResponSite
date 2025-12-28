import { useNavigate } from 'react-router-dom';
import { statusColors } from './admInfraProjects.constants';

const InfraProjectsTable = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (project) => {
    navigate('/admInfraProjectsDet', { state: { project } });
  };

  return (
    <div className="resource-table-container">
      <table className="incident-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location/Zone</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Start Date</th>
            <th>Target End Date</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.location}</td>
              <td>
                <span className={`status-chip ${statusColors[item.status] || ""}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.progress}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfraProjectsTable;
