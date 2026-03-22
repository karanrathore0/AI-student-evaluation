import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <section className="login">
      <div className="login-box">
        <h2>Login</h2>
        <p className="subtitle">
          Access your AI Student Evaluation Dashboard
        </p>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <label>Login As</label>
            <select>
              <option>Student</option>
              <option>Faculty</option>
              <option>Admin</option>
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
};

export default Login;
