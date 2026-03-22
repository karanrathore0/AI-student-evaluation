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

function App() {
  return (
    <>
    <Header/>

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/evaluation' element={<Evaluation/>}/>
    <Route path='/recommendation' element={<Recommendation/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
   
    <Footer/>
    </>
  )
}

export default App
