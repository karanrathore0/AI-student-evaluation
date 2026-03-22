import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container footer-grid">
                    <div>
                        <h3>AI EduSystem</h3>
                        <p>
                            AI-based student evaluation & personalized learning recommendation
                            platform built using MERN Stack.
                        </p>
                    </div>

                    <div>
                        <h4>Modules</h4>
                        <ul>
                            <li>Student Evaluation</li>
                            <li>AI Recommendation</li>
                            <li>Admin Panel</li>
                            <li>Analytics Dashboard</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Developed By</h4>
                        <p>PNINFOSYS</p>
                        <p>Full Stack MERN Project</p>
                    </div>
                </div>

                <p className="copyright">
                    © 2026 AI Student Evaluation System
                </p>
            </footer>
        </>
    )
}

export default Footer
