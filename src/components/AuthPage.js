import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthPage.css";
import logo from "../assets/logo.png";
import lunivaLogo from "../assets/luniva.png";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("testuser@gmail.com"); // default
  const [password, setPassword] = useState("password"); // default
  const [fullName, setFullName] = useState("Test User");

  // ✅ Use Railway backend by default, but allow override via env
  const API_BASE =
    process.env.REACT_APP_BACKEND_URL ||
    "https://lunivabackend-production.up.railway.app";

  // ✅ Auto-register default user if not exists
  useEffect(() => {
    const registerDefaultUser = async () => {
      try {
        await axios.post(`${API_BASE}/api/auth/register`, {
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
  }, [API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? `${API_BASE}/api/auth/login`
        : `${API_BASE}/api/auth/register`;

      const payload = isLogin
        ? { email, password }
        : { fullName, email, password };

      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ If backend doesn’t send token, create a mock one
      const token = res.data?.token || "mock-demo-token";

      localStorage.setItem("token", token);
      onAuth(res.data.user || { fullName, email });
    } catch (err) {
      console.error("Auth error:", err);
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src={logo} alt="Logo" className="auth-logo" />
        <img src={lunivaLogo} alt="Luniva" className="auth-luniva" />
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
