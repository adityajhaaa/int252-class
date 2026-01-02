import React from 'react';

export default function Card({props}) {

  return (
    <>
    <div className='flex flex-col border border-blue-500 rounded-lg '>
       <img src={props.img} alt={props.title} className="w-70 h-70  m-4 rounded-lg"/>
       <div className='flex flex-col justify-center items-center'>
        <h2 className='text-xl font-bold '>{props.title}</h2>
        <p>{props.desc}</p>
       </div>
        
    </div>
    </>
    
  );
}
