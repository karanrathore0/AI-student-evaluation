

const Home = () => {
  return (
    
    <section className="home">
      <div className="container">
        <h1>
          AI Student Evaluation & <br />
          <span>Learning Recommendation System</span>
        </h1>

        <p className="subtitle">
          Evaluate student performance using AI and provide personalized
          learning paths based on strengths and weaknesses.
        </p>

        <div className="home-actions">
          <button className="btn-primary">Student Login</button>
          <button className="btn-outline">Admin Dashboard</button>
        </div>

        <div className="home-cards">
          <div className="card">
            📊
            <h3>Student Evaluation</h3>
            <p>
              AI analyzes marks, attendance, and performance trends.
            </p>
          </div>

          <div className="card">
            🤖
            <h3>AI Recommendations</h3>
            <p>
              Personalized learning content based on student weaknesses.
            </p>
          </div>

          <div className="card">
            📈
            <h3>Performance Analytics</h3>
            <p>
              Visual reports and progress tracking dashboards.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default Home
