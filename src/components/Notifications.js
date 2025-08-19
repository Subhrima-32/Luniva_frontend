import React from "react";
import { Heart, UserPlus, MessageCircle, PlusSquare } from "lucide-react";

export default function Notifications() {
  // Notifications with type + timestamp
  const notifications = [
    { id: 1, user: "Alice", text: "liked your post", type: "like", time: "2m ago" },
    { id: 2, user: "Bob", text: "started following you", type: "follow", time: "5m ago" },
    { id: 3, user: "Charlie", text: "commented on your post", type: "comment", time: "10m ago" },
    { id: 4, user: "You", text: "created a new post", type: "post", time: "20m ago" },
  ];

  // Select icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart className="text-red-500" size={20} />;
      case "follow":
        return <UserPlus className="text-blue-500" size={20} />;
      case "comment":
        return <MessageCircle className="text-green-500" size={20} />;
      case "post":
        return <PlusSquare className="text-purple-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="notifications-container">
      <h2 className="title">Recent Activity</h2>
      <ul>
        {notifications.map((note) => (
          <li key={note.id} className="notification-card">
            <div className="content">
              <p className="text">
                <strong>{note.user}</strong> {note.text}
              </p>
              <span className="time">{note.time}</span>
            </div>
            <div className="icon">{getIcon(note.type)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
