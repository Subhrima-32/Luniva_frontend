import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import LunivaHome from "./components/LunivaHome";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    }
  };

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", "mock-demo-token");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* Always show header */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Routes (pages) */}
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <AuthPage onAuth={handleAuth} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              <LunivaHome user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}
