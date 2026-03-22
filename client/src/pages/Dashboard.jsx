import "./dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="container">
        <h1>Student Dashboard</h1>
        <p className="subtitle">
          Overview of your academic performance and AI-driven insights.
        </p>

        {/* Top Stats */}
        <div className="dash-cards">
          <div className="dash-card">
            <h3>Overall Score</h3>
            <p>76%</p>
          </div>

          <div className="dash-card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>

          <div className="dash-card">
            <h3>AI Performance</h3>
            <p className="good">Good</p>
          </div>

          <div className="dash-card">
            <h3>Weekly Progress</h3>
            <p>+8%</p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="dash-section">
          <h2>Performance Summary</h2>
          <div className="summary-box">
            <p>✔ Strong in Database & Theory</p>
            <p>⚠ Needs improvement in Coding Practice</p>
            <p>✔ Consistent attendance</p>
          </div>
        </div>

        {/* AI Recommendation Preview */}
        <div className="dash-section">
          <h2>AI Recommendations</h2>
          <div className="recommend-preview">
            <p>📘 Practice coding problems daily</p>
            <p>🎥 Watch recommended video tutorials</p>
            <p>🧪 Attempt weekly assessments</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
