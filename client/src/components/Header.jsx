import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className="header">
                <div className="container header-wrap">
                    <h2 className="logo">
                        AI<span>Edu</span>System
                    </h2>

                    <nav className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/evaluation">Evaluation</Link>
                        <Link to="/recommendation">AI Recommendation</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/login" className="btn-login">Login</Link>
                    </nav>
                </div>
            </header>
    </>
  )
}

export default Header
