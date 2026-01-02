import React from 'react'
import { Link } from 'react-router-dom'
import './About.jsx'
import './Contact.jsx'
import './Home.jsx'
function Navbar() {
  return (
   <>
   <div className="flex m- justify-between items-center text-xl bg-gray-200 p-4">
    <div className='flex space-x-6'>
        <Link to="/">Home </Link>
        <Link to="/about">About </Link>
        <Link to="/Contact">Contact </Link>

    </div>
    <div className=' text-xl flex space-x-6 items-center'> 
        <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/500px-Google_2015_logo.svg.png' alt='logo'/>
        <p>Login</p>
    </div>
   </div>
   </>
  )
}

export default Navbar