import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  // Navigation ke liye useNavigate hook ka istemaal, taaki kisi aur page par bhej sakein (redirect)
  const navigate = useNavigate()

  // LocalStorage se user ki details lena (ye humne Login ke time save ki thi)
  const isLoggedIn = localStorage.getItem("isStudentLoggedIn")
  const studentName = localStorage.getItem("studentName")
  const userRole = localStorage.getItem("userRole")

  // Logout ka function, jisme saari details LocalStorage se delete ho jayengi
  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn")
    localStorage.removeItem("studentName")
    localStorage.removeItem("userRole")
    navigate("/login") // User ko wapas login page par bhej do
  }
  
  return (
    <>
      <header className="header">
        <div className="container header-wrap">
          <h2 className="logo">
            AI<span>Edu</span>System
          </h2>

          <nav className="nav">
            <Link to="/">Home</Link>
            
            {/* Agar user logged in hai, tabhi ye links (pages) dikhayenge */}
            {isLoggedIn && (
              <>
                {/* Teacher ko Evaluation aur Recommendation page nahi dikhana hai, isliye check condition */}
                {userRole !== "teacher" && (
                  <>
                    <Link to="/evaluation">Evaluation</Link>
                    <Link to="/recommendation">AI Recommendation</Link>
                  </>
                )}
                {/* Dashboard sabko dikhega (Teacher ko Teacher Dashboard, Student ko Student Dashboard) */}
                <Link to="/dashboard">Dashboard</Link>
              </>
            )} 
            
            {/* Agar login NAHI kiya hai, tab "Login" ka button dikhega */}
            {!isLoggedIn && (
              <Link to="/login" className="btn-login">Login</Link>
            )}
           
           {/* Agar login kiya hua hai, to User ka naam aur Logout button dikhega */}
           {isLoggedIn && (
            <>
            <span className="student-name">Hi, {studentName}</span>
            <button onClick={handleLogout} className="btn-login">Logout</button>
            </>
           )}
                        
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
