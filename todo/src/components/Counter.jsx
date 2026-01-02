import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  function handleAdd() {
    setCount(prev => prev + 1)
  }
  function handleSub() {
    setCount(prev => prev - 1)
  }
  return (
    <>
      <div className='flex flex-row justify-center  space-x-4 mt-10'>
        <button onDoubleClick={handleAdd} className='bg-cyan-200 rounded-lg p-2 '>Add</button>

        <div className='flex justify-center items-center'>
          <h1 className='font-bold'>{count}</h1>
        </div>
        <button onDoubleClick={handleSub} className='bg-cyan-200 rounded-lg p-2 '>Sub</button>
      </div>
    </>
  )
}

export default Counter