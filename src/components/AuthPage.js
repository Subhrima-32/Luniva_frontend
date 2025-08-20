import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("testuser@gmail.com"); // default email
  const [password, setPassword] = useState("password");     // default password
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { fullName, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onAuth(data.user);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, try again later");
    }
  };

  return (
    <div className="auth-container">
      {/* Logo/Header */}
      <div className="auth-header">
        <img
          src="/logo192.png"
          alt="Logo"
          className="auth-logo"
        />
        <h1 className="auth-luniva">Luniva</h1>
      </div>

      {/* Auth Box */}
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
          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div
          className="toggle-text"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </div>
      </div>
    </div>
  );
}
