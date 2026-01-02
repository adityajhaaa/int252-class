import { Grid } from 'lucide-react'
import React from 'react'

function Home() {
  return (
   <>
   <div className=' flex flex-col justify-center space-y-3  items-center'>
    <div className='space-x-3'>
     <label for="username" className=' '>Username</label>  
    <input name='username' className='rounded-lg border' placeholder='Enter username'/>
    </div>
    <div className='space-x-3'>
     <label for="pswd">Password</label>
     <input type='password' className='rounded-lg border' placeholder='Enter pswd'/>
    </div>
   </div>
   </>
  )
}

export default Home