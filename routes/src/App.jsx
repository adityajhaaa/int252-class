import React from 'react'
import { BrowserRouter, Routes, Route
} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <>
    <Navbar/>
  
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
    </Routes>

    </>
  
  )
}

export default App