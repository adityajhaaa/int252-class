import React, { useState } from 'react'
import { useContext } from "react";
import MyContext from "./MyContext";
function FormInput() {
    let {handleAdd}=useContext(MyContext)
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [pswd,setPswd]=useState("")


    const handleSubmit=(e)=>{
        e.preventDefault();
        const newData={
            name:name,
            email:email,
            pswd:pswd
        }
       handleAdd(newData)
    }

  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" value={pswd} onChange={(e)=>setPswd(e.target.value)}></input>
        <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default FormInput