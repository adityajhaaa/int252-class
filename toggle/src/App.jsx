import React, { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  const themeChanger = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <button onClick={themeChanger}>
        Toggle Theme
      </button>

      <div
        className={`h-screen w-screen ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
      ></div>
    </>
  );
}

export default App;
