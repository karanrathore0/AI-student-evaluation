import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
import Evaluation from './pages/Evaluation'
import Recommendation from './pages/Recommendation'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
    <Header/>

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/evaluation' element={<ProtectedRoute><Evaluation/></ProtectedRoute>}/>
    <Route path='/recommendation' element={<ProtectedRoute><Recommendation/></ProtectedRoute>}/>
    <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
   
    <Footer/>
    </>
  )
}

export default App
