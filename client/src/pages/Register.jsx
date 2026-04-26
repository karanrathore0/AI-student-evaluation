import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./register.css";

const Register = () => {
  // User apna data in states me filter karke store karega jab wo type karega
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState(""); // Password dobara confirm karne ke liye
  const [role, setRole] = useState("student"); // Kya user "student" register kar raha hai ya "teacher"
  
  // Agar registration details galat hoti hain to error dikhane ki state
  const [error, setError] = useState("");
  
  // Registration success hone par usse Login page bhejenge
  const navigate = useNavigate();

  // Form submit par ye call hoga
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload ko band karne ke liye
    
    // Check karna ki Password aur Confirm Password dono same hain ya nahi
    if (password !== cpassword) {
      setError("Passwords do not match");
      return; // Agar match nahi hain toh yahi se return kardo, aage server ko hit mat karo
    }
    
    try {
      // Backend api/register pe POST request bhej rahe hain saare details ke saath
      await axios.post("/register", { name, email, password, role });
      
      // Successfully register hone ke baad user ko "/login" path par redirect kar do
      navigate("/login");
    } catch (err) {
      // API se aayi hui error message dikhane ke liye
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="register">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">
          Register to access AI Student Evaluation System
        </p>
        
        {error && <p className="error" style={{color:"red", marginBottom:"10px"}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" value={cpassword} onChange={e => setCpassword(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Register As</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button className="btn-register">Register</button>

          <p className="extra">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
