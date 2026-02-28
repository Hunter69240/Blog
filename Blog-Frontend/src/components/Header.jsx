import React from 'react'

const Header = ({ mode, setMode }) => {

  const toggleMode = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div>
      <p>Header</p>
      <button onClick={toggleMode}>
        Switch to {mode === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default Header;