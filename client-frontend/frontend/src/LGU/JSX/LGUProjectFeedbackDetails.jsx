import "../CSS/LGUProjectFeedbackDetails.css";
import { feedbackDetails } from "../JS/projectFeedbackDetailsData";

const LGUProjectFeedbackDetails = () => {
  return (
    <div className="feedback-details-page">

      <div className="feedback-card">

        {/* Header */}
        <div className="feedback-header">
          <h3>{feedbackDetails.projectName}</h3>
          <span className="feedback-id">
            Feedback #{feedbackDetails.feedbackId}
          </span>
        </div>

        {/* Body */}
        <div className="feedback-body">
          <p><b>Reported by:</b> {feedbackDetails.reporter}</p>
          <p><b>Date:</b> {feedbackDetails.date}</p>

          <p className="message">{feedbackDetails.message}</p>

          <div className="image-row">
            {feedbackDetails.images.map((_, index) => (
              <div className="img-placeholder" key={index} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default LGUProjectFeedbackDetails;
