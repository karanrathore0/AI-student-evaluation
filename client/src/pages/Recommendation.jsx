import "./recommendation.css";

const Recommendation = () => {
  return (
    <section className="recommendation">
      <div className="container">
        <h1>AI Learning Recommendations</h1>
        <p className="subtitle">
          Personalized learning suggestions generated using AI based on student
          performance.
        </p>

        {/* Strength & Weakness */}
        <div className="summary">
          <div className="summary-box strength">
            <h3>Strengths</h3>
            <ul>
              <li>✔ Strong logical thinking</li>
              <li>✔ Good database understanding</li>
              <li>✔ Regular attendance</li>
            </ul>
          </div>

          <div className="summary-box weakness">
            <h3>Weakness Areas</h3>
            <ul>
              <li>⚠ Needs more coding practice</li>
              <li>⚠ Low problem-solving speed</li>
              <li>⚠ Inconsistent test performance</li>
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommend-box">
          <h2>Recommended Learning Path</h2>

          <div className="recommend-card">
            <h3>📘 Programming Practice</h3>
            <p>
              Practice JavaScript & Python daily with real-world problems and
              mini projects.
            </p>
          </div>

          <div className="recommend-card">
            <h3>🎥 Video Tutorials</h3>
            <p>
              Watch beginner to intermediate coding tutorials and follow along
              with examples.
            </p>
          </div>

          <div className="recommend-card">
            <h3>🧪 Weekly Assessments</h3>
            <p>
              Attempt weekly coding tests to track improvement and accuracy.
            </p>
          </div>
        </div>

        {/* AI Tip */}
        <div className="ai-tip">
          🤖 <strong>AI Tip:</strong> Focus on hands-on coding for 60 minutes
          daily to improve problem-solving efficiency.
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
