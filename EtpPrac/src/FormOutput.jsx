import React, { useContext } from 'react'
import MyContext from "./MyContext";

function FormOutput() {
    let {data}=useContext(MyContext)
  return (
    <>
      { data.map((value, idx) => (
        <div key={idx}>
            <p>{value.name}</p>
            <p>{value.email}</p>
            <p>{value.pswd}</p>
        </div>
      ))}
    </>
  )
}

export default FormOutput