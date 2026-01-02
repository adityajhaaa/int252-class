import React from 'react'
import Card from './Card.jsx'
function Cards({props}) {
  return (
    <>
    <div className='flex flex-row space-y-1 justify-evenly'>
        <Card props={props[0]}/>
        <Card props={props[1]}/>
        <Card props={props[2]}/>
        
    </div>
    </>
  )
}

export default Cards