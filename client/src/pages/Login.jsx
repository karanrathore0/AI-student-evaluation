import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"   //axios ko import kiya
import "./login.css";
import { useState } from "react";


// useState me data store karte hai react ke andar
// state ko change karne ke liye setstate ka use karte hai
const Login = () => {
  // Input fields ke liye state (Email, Password, aur Role)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  
  // Agar koi error aati hai (jaise wrong password) toh usko dikhane ke liye state
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Form submit par ye function chalega
  const handleSubmit = async (e) => {
    e.preventDefault()    // page ko refresh hone se rokta hai
    setError("")          // Purani error ko hata deta hai

    try {
      // axios ke through backend(/login API) me data bhej rahe hai
      // Yahan hum email aur password backend ko match karne ke liye bhej rahe hain
      const res = await axios.post("/login", {
        email,
        password
      });

      // Agar login success hua:
      // simple frontend flag jisse header samjh sake ki user logged in hai
      localStorage.setItem("isStudentLoggedIn", "true")
      
      // Backend agar user ka data bhej raha hai to local storage me naam aur role bacha lenge
      if (res.data && res.data.user) {
        localStorage.setItem("studentName", res.data.user.name) // Dashboard pe dikhane ke liye
        localStorage.setItem("userRole", res.data.user.role)    // Role check karne ke liye (teacher ya student)
      }
      
      // Sab sahi raha toh user ko "/dashboard" page par le jayega
      navigate("/dashboard")

    } catch (error) {
      // Agar backend se koi error aayi hai (invalid email/password) toh usko set karke UI me dikhana
      console.log(error.response?.data?.message || "something went wrong")
      setError(error.response?.data?.message || "something went wrong");
    }
  }




  return (
    <section className="login">
      <div className="login-box">
        <h2>Login</h2>
        <p className="subtitle">
          Access your AI Student Evaluation Dashboard
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>  
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              {/* <option value="Admin">Admin</option> */}
            </select>
          </div>

          <button className="btn-login">Login</button>

          <p className="extra">
            Don’t have an account? <Link to={'/register'}>Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
