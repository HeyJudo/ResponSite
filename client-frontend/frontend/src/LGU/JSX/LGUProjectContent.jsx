import "../CSS/LGUProjectContent.css";
import { projectContent } from "../JS/projectContentData";

const LGUProjectContent = () => {
  return (
    <div className="project-content-page">

      {/* Progress Updates */}
      <div className="content-card">
        <h3>Progress Updates</h3>

        {projectContent.progressUpdates.map((update, index) => (
          <div className="update-box" key={index}>
            <p><b>Date:</b> {update.date}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={`status ${update.status.toLowerCase()}`}>
                {update.status}
              </span>
            </p>
            <p><b>Progress:</b> {update.progress}</p>
            <p><b>Notes:</b> {update.notes}</p>
          </div>
        ))}

        <button className="add-update-btn">Add Update</button>
      </div>

      {/* Feedback */}
      <div className="content-card">
        <h3>Feedback</h3>

        {projectContent.feedbacks.map((fb, index) => (
          <div className="feedback-box" key={index}>
            <div className="feedback-header">
              <b>{fb.reporter}</b>
              <span>{fb.date}</span>
            </div>
            <p>{fb.message}</p>

            <div className="image-row">
              <div className="img-placeholder" />
              <div className="img-placeholder" />
              <div className="img-placeholder" />
            </div>
          </div>
        ))}
      </div>

      {/* Contractor */}
      <div className="contractor-box">
        <p><b>Contractor:</b> {projectContent.contractor.name}</p>
        <p>📞 {projectContent.contractor.phone}</p>
        <p>✉️ {projectContent.contractor.email}</p>
      </div>

    </div>
  );
};

export default LGUProjectContent;
