import React from 'react';
import "../App.css"
const ThemeToggle = ({ toggleTheme }) => {
  return (
    <button  onClick={toggleTheme}  style={{backgroundColor:"#94dd1f",color:"white",fontSize:"16px", borderRadius:"5px", padding:5,fontWeight:'bold'}} >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
