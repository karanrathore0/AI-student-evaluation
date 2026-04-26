import { useState, useEffect } from "react";
import axios from "../api/axios";
import "./dashboard.css";

const Dashboard = () => {
  // LocalStorage se role nikalna, jisse pata chale ki user student hai ya teacher
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "student");
  
  // Student ke results store karne ke liye state
  const [results, setResults] = useState([]);
  
  // Teacher ke liye states:
  const [allStudents, setAllStudents] = useState([]); // Saare students ki list jo dropdown me dikhegi
  const [allResults, setAllResults] = useState([]); // Teacher ko dikhane ke liye sabhi students ke marks
  const [formStudent, setFormStudent] = useState(""); // Form ka selected student
  const [formSubject, setFormSubject] = useState(""); // Form ka entered subject
  const [formMarks, setFormMarks] = useState(""); // Form me entered marks
  const [addMsg, setAddMsg] = useState(""); // Success ya Error message jo marks add hone pe dikhega

  // Jab tak data API se aa raha hai tab loading true rahegi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect component ke load hote hi data fetch karne ka kaam karta hai
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userRole === "teacher") {
          // Agar teacher hai, to do APIs sath me call karni padegi:
          // 1. /students -> Saare students pane ke liye 
          // 2. /allresult -> Pehle se add kiye hue marks dekhne ke liye
          const [studentsRes, resultsRes] = await Promise.all([
            axios.get("/students"),
            axios.get("/allresult")
          ]);
          setAllStudents(studentsRes.data);
          setAllResults(resultsRes.data);
        } else {
          // Agar student hai, to sirf uske khud ke marks API se mangwayenge
          const res = await axios.get("/myresult");
          setResults(res.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data"); // Error show karne ke liye
      } finally {
        setLoading(false); // Data aane ke baad loading band
      }
    };

    fetchData(); // function ko execute kiya
  }, [userRole]);

  // Ye function tab chalega jab Teacher "Add Result" form submit karega
  const handleAddResult = async (e) => {
    e.preventDefault(); // Form submit hone par page refresh hone se rokhta hai
    setAddMsg("");
    try {
      // Backend ko API request bhejkar naya result database me add karna
      const res = await axios.post("/addresult", {
        student: formStudent, // Dropdown se selected student
        subject: formSubject,
        marks: Number(formMarks) // Marks hamesha number format me bhejenge
      });
      setAddMsg("Result added successfully!");
      // Form ko phirse khali karna
      setFormStudent("");
      setFormSubject("");
      setFormMarks("");
      
      // Naya data add hone ke baad, result list ko phirse API call karke refresh karna
      const resultsRes = await axios.get("/allresult");
      setAllResults(resultsRes.data);
    } catch (err) {
      console.error(err);
      setAddMsg(err.response?.data?.message || "Error adding result");
    }
  };

  if (loading) {
    return (
      <section className="dashboard">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard">
        <div className="container">
          <p className="error">{error}</p>
        </div>
      </section>
    );
  }


  if (userRole === "teacher") {
    return (
      <section className="dashboard">
        <div className="container">
          <h1>Teacher Dashboard</h1>
          <p className="subtitle">Manage student marks and results</p>
          
          <div className="dash-section" style={{ marginTop: "2rem" }}>
            <h2>Add Student Result</h2>
            {addMsg && <p style={{ color: addMsg.includes("success") ? "green" : "red", marginBottom: "1rem" }}>{addMsg}</p>}
            <form onSubmit={handleAddResult} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
              <div>
                <label>Student: </label>
                <select value={formStudent} onChange={(e) => setFormStudent(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }}>
                  <option value="">Select Student</option>
                  {allStudents.map(s => (
                    <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label>Subject: </label>
                <input type="text" placeholder="Enter subject name" value={formSubject} onChange={(e) => setFormSubject(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <div>
                <label>Marks: </label>
                <input type="number" placeholder="Enter marks" value={formMarks} onChange={(e) => setFormMarks(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <button type="submit" className="btn-login" style={{ marginTop: "10px", width: "100%" }}>Add Result</button>
            </form>
          </div>

          <div className="dash-section" style={{ marginTop: "3rem" }}>
            <h2>All Student Results</h2>
            {allResults.length === 0 ? (
              <p>No results have been added yet.</p>
            ) : (
              <div className="dash-cards">
                {allResults.map((result) => (
                  <div className="dash-card" key={result._id}>
                    <h3>{result.student?.name || "Unknown Student"}</h3>
                    <p>Subject: {result.subject}</p>
                    <p>Marks: {result.marks}</p>
                    <p className={result.grade === "A" || result.grade === "B" ? "good" : "warning"}>
                      Grade: {result.grade}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    );
  }

  // STUDENT VIEW
  return (
    <section className="dashboard">
      <div className="container">
        <h1>Student Dashboard</h1>
        <p className="subtitle">
          Overview of your academic performance and AI-driven insights.
        </p>

        <div className="dash-section" style={{ marginTop: "2rem" }}>
          <h2>Your Marks & Grades</h2>
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="dash-cards">
              {results.map((result) => (
                <div className="dash-card" key={result._id}>
                  <h3>{result.subject}</h3>
                  <p>Marks: {result.marks}</p>
                  <p className={result.grade === "A" || result.grade === "B" ? "good" : "warning"}>
                    Grade: {result.grade}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dash-section">
          <h2>Performance Summary</h2>
          <div className="summary-box">
            <p>✔ Regular evaluations help improve concepts</p>
            <p>⚠ Focus on subjects with lower grades</p>
          </div>
        </div>

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
