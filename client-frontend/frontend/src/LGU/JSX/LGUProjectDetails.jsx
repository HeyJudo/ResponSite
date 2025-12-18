import "../CSS/LGUProjectDetails.css";
import { projectDetails } from "../JS/projectDetailsData";

const LGUProjectDetails = () => {
  return (
    <div className="project-details-page">

      <div className="project-header">
        {projectDetails.name}
      </div>

      <div className="project-grid">

        {/* LEFT */}
        <div className="left-box">
          <p><b>Status:</b> <span className="status in-progress">{projectDetails.status}</span></p>
          <p><b>Progress:</b> {projectDetails.progress}</p>
          <p><b>Planned Start:</b> {projectDetails.plannedStart}</p>
          <p><b>Target End:</b> {projectDetails.targetEnd}</p>
          <p><b>Completion Date:</b> {projectDetails.completionDate}</p>

          <button className="complete-btn">Mark as Complete</button>

          <div className="summary">
            <h4>Summary Notes</h4>
            <p>{projectDetails.summaryNotes}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-box">
          <p><b>Project Type:</b> {projectDetails.type}</p>
          <p><b>Location / Zone:</b> {projectDetails.location}</p>
          <p><b>Budget Allocation:</b> {projectDetails.budget}</p>

          <h4>Description</h4>
          <p>{projectDetails.description}</p>

          <h4>Objectives</h4>
          <p>{projectDetails.objectives}</p>

          <h4>Timeline</h4>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Planned Start</th>
                <th>Actual Start</th>
                <th>Target End</th>
                <th>Adjusted Date</th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.timeline.map((t, i) => (
                <tr key={i}>
                  <td>{t.task}</td>
                  <td>{t.plannedStart}</td>
                  <td>{t.actualStart}</td>
                  <td>{t.targetEnd}</td>
                  <td>{t.adjustedEnd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LGUProjectDetails;
