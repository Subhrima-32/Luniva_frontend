import React, { useState } from "react";

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("testuser@gmail.com"); // default email
  const [password, setPassword] = useState("password"); // default password
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const backendUrl = "https://luniva-backend.onrender.com"; // Render backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { fullName, email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("token", data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="/logo.png" alt="Logo" className="auth-logo" />
        <img src="/luniva-text.png" alt="Luniva" className="auth-luniva" />
      </div>

      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
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
        <p
          className="toggle-text"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
}
