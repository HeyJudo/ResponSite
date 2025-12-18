<div className="incident-layout">

  <div className="incident-left">
    <h2>Incident #0010</h2>
    <p><b>Type:</b> Damaged Road</p>
    <p><b>Severity:</b> <span className="badge medium">Medium</span></p>
    <p><b>Zone:</b> Zone 1</p>
    <p><b>Location:</b> Barangay Road</p>
    <p><b>Description:</b> Lorem ipsum dolor sit amet.</p>
  </div>

  <div className="incident-right">
    <h3>Status</h3>
    <span className="badge pending">Pending</span>

    <h3>Progress</h3>
    <ul className="timeline">
      <li className="done">Reported</li>
      <li className="current">In Progress</li>
      <li>Resolved</li>
    </ul>

    <h3>Assigned Team</h3>
    <p>Rescue Team A</p>

    <h3>Resolution Notes</h3>
    <textarea placeholder="Resolution details..." />

    <button>Mark as Resolved</button>
  </div>

</div>
