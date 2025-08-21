import React, { useState } from "react";
import "./AuthPage.css";
import logo from "../assets/logo.png";
import lunivaLogo from "../assets/luniva.png";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Skip backend, just accept any credentials
    const user = {
      fullName: fullName || "Demo User",
      email: email || "demo@email.com",
    };

    // Save to localStorage
    localStorage.setItem("token", "mock-demo-token");
    localStorage.setItem("user", JSON.stringify(user));

    // Trigger parent App state change
    onAuth(user);
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
