import React from 'react'

function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center bg-gray-200 '>
  <div className='nav'>
    <img src="https://www.lpu.in/lpu-assets/images/logo/logo.svg" className='w-50 h-30' alt="React logo" crossOrigin="anonymous" />
  </div>
  <div className='flex flex-row m-10 space-x-4'>
    <button className='bg-blue-400 rounded-lg p-2'>Home</button>
    <button className='bg-blue-400 rounded-lg p-2'>About us</button>
    <button className='bg-blue-400 rounded-lg p-2'>Login page</button>
    <button className='bg-green-400 rounded-lg p-2'>Download Now</button>
  </div>
</div>

  )
}

export default Navbar