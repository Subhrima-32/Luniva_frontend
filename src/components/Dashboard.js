// Dashboard.js
import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard({ onLogout }) {
  const [timeframe, setTimeframe] = useState("7days");

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Guest User",
    email: "guest@email.com",
  };

  const stats = [
    { title: "Followers", value: 50 },
    { title: "Following", value: 26 },
    { title: "Posts", value: 3 },
    { title: "Likes", value: 83 },
    { title: "Post Insight", value: "59 minutes viewed" },
  ];

  const activity = [
    "Alice liked your post",
    "Bob started following you",
    "Charlie commented on your post",
    "You Created a New Post",
  ];

  const postViews = {
    today: [5, 10, 8, 12, 7, 15, 10],
    "7days": [50, 60, 40, 80, 70, 90, 100],
    month: [200, 220, 250, 230, 210, 240, 260],
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="dashboard-container">
      {/* User Info + Logout */}
      <div className="dashboard-header">
        <h2>Welcome, {user.fullName} 👋</h2>
        <p className="user-email">{user.email}</p>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <h2>Audience & Activity Overview</h2>

      {/* Timeframe Filter */}
      <div className="timeframe-filter">
        <button onClick={() => setTimeframe("today")}>Today</button>
        <button onClick={() => setTimeframe("7days")}>Last 7 Days</button>
        <button onClick={() => setTimeframe("month")}>Last Month</button>
      </div>

      {/* Stats Cards */}
      <div className="cards-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Post Views Chart */}
      <div className="chart-container">
        <h3>Post Views</h3>
        <div className="chart">
          {labels.map((day, i) => (
            <div
              key={i}
              className="bar"
              style={{ height: postViews[timeframe][i] * 2 }}
              title={`${day}: ${postViews[timeframe][i]} views`}
            ></div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="activity-feed">
        <h3>Recent Activity</h3>
        <ul>
          {activity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
