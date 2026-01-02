import React,{useState,useRef} from 'react'

function StudentReg() {

    const [data,setData]=useState([]);
        let inputName=useRef()
        let inputCGPA=useRef()
        let inputRegNo=useRef()
    const handleClick=()=>{

        const newData={
            name:inputName.current.value,
            reg:inputRegNo.current.value,
            CGPA:inputCGPA.current.value
        }
        setData([newData,...data])
        inputName.current.value="";
        inputRegNo.current.value="";
        inputCGPA.current.value="";
    }
  return (
   <>
   <div>
    <label for='name'>Name</label>
    <input type='text' name='name' className='border' ref={inputName}></input>
    <label for='reg'>Registration No.</label>
    <input type='number' name='reg' className='border' ref={inputRegNo}></input>
     <label for='CGPA'>CGPA</label>
    <input type='text' name='CGPA' className='border' ref={inputCGPA}></input>
    <button onClick={handleClick}>Submit</button>
   </div>
    <div>
        {data.map((e,i)=>{
            return (<h1>{i}Name:{e.name}CGPA:{e.CGPA} Reg No.: {e.reg}</h1>
        )})}
    </div>
   </>
  )
}

export default StudentReg