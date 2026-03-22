import "./register.css";

const Register = () => {
  return (
    <section className="register">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">
          Register to access AI Student Evaluation System
        </p>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />
          </div>

          <div className="form-group">
            <label>Register As</label>
            <select>
              <option>Student</option>
              <option>Faculty</option>
            </select>
          </div>

          <button className="btn-register">Register</button>

          <p className="extra">
            Already have an account? <span>Login</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
