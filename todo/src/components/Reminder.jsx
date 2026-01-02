import React,{useState,useRef} from 'react'

function Reminder() {

    let inputData=useRef();
    let [data,setData]=useState([]);

    const handleClick=()=>{
        setData([inputData.current.value,...data])
        inputData.current.value="";
    }
  return (
    <>
        <div>
            <input type='text' ref={inputData}></input>
            <button onClick={handleClick}>Click here</button>
        </div>
        <div>
            {
                data.map((e)=>(
                    <h1>{e}</h1>
                ))
            }
        </div>
    </>
  )
}

export default Reminder