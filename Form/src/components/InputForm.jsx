import React, { useRef } from "react";
import { useContext } from "react";
import MyContext from "./MyContext";

function InputForm() {
  let {handleAdd}=useContext(MyContext)
  const inputName = useRef();
  const inputCGPA = useRef();
  const inputRegNo = useRef();

  const handleClick = () => {
    const formData = {
      name: inputName.current.value,
      Cgpa: inputCGPA.current.value,
      RegNo: inputRegNo.current.value,
    };

    handleAdd(formData);

    inputName.current.value = "";
    inputCGPA.current.value = "";
    inputRegNo.current.value = "";
  };

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input name="name" ref={inputName} />

      <label htmlFor="cgpa">CGPA</label>
      <input name="cgpa" ref={inputCGPA} />

      <label htmlFor="regNo">Reg No</label>
      <input name="regNo" ref={inputRegNo} />

      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default InputForm;
