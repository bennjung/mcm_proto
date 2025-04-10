import '../styles/report.css';

export default function ReportPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Report</h1>
      <div className="content-box">
        <div className="report-form">
          <h2>Submit a Report</h2>
          <div className="form-group">
            <label>Type</label>
            <select className="form-select">
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Security Issue</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-textarea" placeholder="Describe the issue..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
