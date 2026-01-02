import React, { useState } from "react";
import "./index.css"
import Navbar from "./Navbar.jsx";

function App() {

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (

    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <Navbar theme={theme} />
      <h1>Theme Changer</h1>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
}

export default App;
