import "../CSS/LGUInfrastructureProjects.css";
import { infrastructureProjects } from "../JS/infrastructureProjectsData";

const LGUInfrastructureProjects = () => {
  return (
    <div className="infra-page">

      <h2>Infrastructure Projects</h2>

      {/* Top Controls */}
      <div className="top-controls">
        <input className="search" placeholder="Search" />

        <button>Add Project</button>
        <button>Go to List of Feedback</button>

        <div className="inline-filters">
          <select><option>Type</option></select>
          <select><option>Zone</option></select>
          <select><option>Status</option></select>
        </div>

        <button className="sort-btn">Sort</button>
      </div>

      {/* Table */}
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
          {infrastructureProjects.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.zone}</td>
              <td><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></td>
              <td>{p.progress}</td>
              <td>{p.startDate}</td>
              <td>{p.targetEndDate}</td>
              <td>{p.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SORT SECTIONS */}
      <div className="panel-row">
        <div className="panel">
          <h4>Sort by Date</h4>
          <label><input type="radio" /> Start Date</label>
          <label><input type="radio" /> Progress</label>
          <label><input type="radio" /> Status</label>
          <label><input type="radio" /> New to Old</label>
          <label><input type="radio" /> Old to New</label>
          <button>Enter</button>
        </div>

        <div className="panel">
          <h4>Sort by Status</h4>
          <label><input type="radio" /> Start to Finish</label>
          <label><input type="radio" /> Finish to Start</label>
          <button>Enter</button>
        </div>

        <div className="panel">
          <h4>Sort by Progress</h4>
          <label><input type="radio" /> Increasing</label>
          <label><input type="radio" /> Decreasing</label>
          <button>Enter</button>
        </div>
      </div>

      {/* FILTER SECTIONS */}
      <div className="panel-row">
        <div className="panel">
          <h4>Filter by Type</h4>
          <button>Road</button>
          <button>Bridge</button>
          <button>Building</button>
          <button>Drainage</button>
          <button>Other</button>
          <button>Enter</button>
        </div>

        <div className="panel">
          <h4>Filter by Zone</h4>
          <button>Filler 1</button>
          <button>Filler 2</button>
          <button>Filler 3</button>
          <button>Filler 4</button>
          <button>Filler 5</button>
          <button>Enter</button>
        </div>

        <div className="panel">
          <h4>Filter by Status</h4>
          <button>Planned</button>
          <button>In Progress</button>
          <button>Completed</button>
          <button>Delayed</button>
          <button>Enter</button>
        </div>
      </div>

    </div>
  );
};

export default LGUInfrastructureProjects;
