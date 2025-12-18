import "../CSS/LGUInfrastructureProjects.css";
import { infrastructureProjects } from "../JS/infrastructureProjectsData";

const LGUInfrastructureProjects = () => {
  return (
    <div className="infra-page">
      <h2>Infrastructure Projects</h2>

      <div className="infra-actions">
        <input placeholder="Search project" />
        <button>Add Project</button>
      </div>

      <div className="infra-filters">
        <select><option>Type</option></select>
        <select><option>Zone</option></select>
        <select><option>Status</option></select>
      </div>

      <table className="infra-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location / Zone</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Start Date</th>
            <th>Target End Date</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {infrastructureProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.type}</td>
              <td>{project.zone}</td>
              <td>
                <span className={`status ${project.status.replace(" ", "").toLowerCase()}`}>
                  {project.status}
                </span>
              </td>
              <td>{project.progress}</td>
              <td>{project.startDate}</td>
              <td>{project.targetEndDate}</td>
              <td>{project.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LGUInfrastructureProjects;
