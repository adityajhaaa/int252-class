import React, { useRef } from 'react'

function Forminput() {
  const inputData = useRef()

  return (
    <>
      <div>
        <input name='name' ref={inputData}></input>
      </div>
    </>

  )
}

export default Forminput