import React from "react";
import Logo from "../assets/logo.png";
import Luniva from "../assets/luniva.png";

function Header({ darkMode, toggleTheme }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: darkMode ? "#111" : "#eee", // ✅ changes with theme
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          alt="L Logo"
          style={{ height: "50px", marginRight: "15px" }}
        />
        <img
          src={Luniva}
          alt="Luniva Text"
          style={{ height: "60px" }}
        />
      </div>

      {/* ✅ Dark/Light toggle button */}
      <button
        onClick={toggleTheme}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          backgroundColor: darkMode ? "#444" : "#ddd",
          color: darkMode ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}

export default Header;
