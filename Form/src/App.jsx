import React, { useReducer } from 'react'
import Form from './components/Form'
import MyContext from './components/MyContext'
import Counter from './components/Counter';


//Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
}


const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  function handleAdd(item) {
    dispatch({ type: 'ADD', payload: item });
  }

  function handleDelete(index) {
    dispatch({ type: 'DELETE', payload: index });
  }

  return (
    <div>
      <MyContext.Provider value={{ data, handleAdd, handleDelete }}>
        <Form newhandleAdd={handleAdd} />
      </MyContext.Provider>

      <Counter />
    </div>
  )
}

export default App
