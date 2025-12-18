import "../CSS/LGUAddProject.css";

const LGUAddProject = () => {
  return (
    <div className="add-project-page">

      <div className="form-card">
        <div className="form-header">
          Add Project
        </div>

        <div className="form-body">

          <label>
            Project Name
            <input type="text" placeholder="Name Filler" />
          </label>

          <label>
            Project Type
            <select>
              <option>Dropdown</option>
            </select>
          </label>

          <label>
            Location / Zone
            <input type="text" placeholder="Filler Street, Barangay, etc." />
          </label>

          <label>
            Description
            <textarea placeholder="Lorem ipsum dolor sit amet..." />
          </label>

          <label>
            Objectives
            <textarea placeholder="Lorem ipsum dolor sit amet..." />
          </label>

          <div className="row">
            <label>
              Start Date
              <input type="date" />
            </label>

            <label>
              Target End Date
              <input type="date" />
            </label>
          </div>

          <label>
            Total Budget
            <input type="text" placeholder="₱ 0.00" />
          </label>

          <label>
            Status
            <select>
              <option>Dropdown</option>
            </select>
          </label>

          <div className="contractor-section">
            <h4>Contractor Info</h4>

            <label>
              Name
              <input type="text" placeholder="Name Filler" />
            </label>

            <label>
              Number
              <input type="text" placeholder="09123456789" />
            </label>

            <label>
              Email
              <input type="email" placeholder="something@email.com" />
            </label>
          </div>

          <button className="submit-btn">Submit</button>
        </div>
      </div>

    </div>
  );
};

export default LGUAddProject;
