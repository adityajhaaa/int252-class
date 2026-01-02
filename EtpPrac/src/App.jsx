import { useState } from 'react'
import MyContext from './MyContext.jsx'
import FormInput from './FormInput.jsx'
import FormOutput from "./FormOutput";


function App() {
  const [data,setData]=useState([])

  const handleAdd=(item)=>{
    console.log(item)
    setData(prev => [...prev, item])
  }
  const handleDelete=()=>{

  }
  return (

    <>
    <MyContext.Provider value={{handleAdd, data, handleDelete}}>
    <FormInput />
    <FormOutput />
    </MyContext.Provider>
       
    </>
  )
}

export default App
