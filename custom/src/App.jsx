import React from 'react'
import useCounter from './useCounter'
function App() {
   const { count, increment, decrement, reset } = useCounter(10 );
  return (
   
    <>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    <button onClick={reset}>Reset</button>
    </>
  )
}

export default App