import React, { useEffect, useState } from 'react';

function Counter() {
  const [num, setNum] = useState(0);

  function handleAdd() {
    setNum((prev) => prev + 1);
  }

  function handleDel() {
    setNum((prev) => (prev > 0 ? prev - 1 : 0)); // prevents negative numbers
  }
  useEffect(() => { console.log("goodafter") }, []);
  return (
    <>
      <div>
        <h1>{num}</h1>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleDel}>-</button>
      </div>
    </>
  );
}

export default Counter;
