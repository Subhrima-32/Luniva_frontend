import React, { useState } from "react";

export default function AuthPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("Test User");
  const [email, setEmail] = useState("testuser@gmail.com"); // default email
  const [password, setPassword] = useState("password"); // default password

  // Use env variable if available, else fallback to localhost
  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? `${API_URL}/api/auth/register`
      : `${API_URL}/api/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister
            ? { fullName, email, password }
            : { email, password }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isRegister ? "✅ Registration successful!" : "✅ Login successful!");
        localStorage.setItem("token", data.token);
        if (onLogin) onLogin(data);
      } else {
        alert(`❌ ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
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
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister
          ? "Already have an account? Login"
          : "Don’t have an account? Register"}
      </p>
    </div>
  );
}
