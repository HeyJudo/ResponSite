import "../CSS/LGUProjectFeedbacks.css";
import { projectFeedbacks } from "../JS/projectFeedbacksData";

const LGUProjectFeedbacks = () => {
  return (
    <div className="feedback-page">

      <div className="feedback-header">
        <h2>List of Feedbacks</h2>
        <button className="return-btn">Return to List of Projects</button>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Project</th>
            <th>Type</th>
            <th>Reported by</th>
            <th>Date Reported</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projectFeedbacks.map((fb, index) => (
            <tr key={index}>
              <td>{fb.feedbackId}</td>
              <td>{fb.projectName}</td>
              <td>{fb.type}</td>
              <td>{fb.reportedBy}</td>
              <td>{fb.date}</td>
              <td>
                <span className={`status ${fb.status.toLowerCase().replace(" ", "-")}`}>
                  {fb.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default LGUProjectFeedbacks;
