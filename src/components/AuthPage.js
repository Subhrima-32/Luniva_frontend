import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthPage.css";
import logo from '../assets/logo.png';
import lunivaLogo from '../assets/luniva.png';

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("testuser@gmail.com"); // default
  const [password, setPassword] = useState("password"); // default
  const [fullName, setFullName] = useState("Test User");

  // ✅ Auto-register default user if not exists
  useEffect(() => {
    const registerDefaultUser = async () => {
      try {
        await axios.post("https://luniva-backend.onrender.com/api/auth/register", {
          fullName: "Test User",
          email: "testuser@gmail.com",
          password: "password",
        });
        console.log("✅ Default user ensured in database");
      } catch (err) {
        if (err.response?.status === 400) {
          console.log("ℹ️ Default user already exists");
        } else {
          console.error("Error ensuring default user:", err.message);
        }
      }
    };
    registerDefaultUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "https://luniva-backend.onrender.com/api/auth/login"
        : "https://luniva-backend.onrender.com/api/auth/register";

      const payload = isLogin
        ? { email, password }
        : { fullName, email, password };

      const res = await axios.post(url, payload);
      localStorage.setItem("token", res.data.token);
      onAuth(res.data.user);
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="/logo.png" alt="Logo" className="auth-logo" />
        <img src="/luniva.png" alt="Luniva" className="auth-luniva" />
      </div>

      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
