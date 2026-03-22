import "./evaluation.css";

const Evaluation = () => {
  return (
    <section className="evaluation">
      <div className="container">
        <h1>Student Evaluation</h1>
        <p className="subtitle">
          AI evaluates student performance based on academics, attendance and
          skill progress.
        </p>

        {/* Summary Cards */}
        <div className="eval-cards">
          <div className="eval-card">
            <h3>Academic Score</h3>
            <p>78%</p>
          </div>

          <div className="eval-card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>

          <div className="eval-card">
            <h3>AI Performance Index</h3>
            <p className="ai-score">Good</p>
          </div>
        </div>

        {/* Table */}
        <div className="table-box">
          <h2>Subject-wise Evaluation</h2>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>AI Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mathematics</td>
                <td>82</td>
                <td>A</td>
                <td>Strong</td>
              </tr>
              <tr>
                <td>Programming</td>
                <td>74</td>
                <td>B+</td>
                <td>Needs Practice</td>
              </tr>
              <tr>
                <td>Database</td>
                <td>68</td>
                <td>B</td>
                <td>Average</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* AI Insight */}
        <div className="ai-insight">
          🤖 <strong>AI Insight:</strong> Student performs well in theory subjects
          but needs more hands-on coding practice.
        </div>
      </div>
    </section>
  );
};

export default Evaluation;
