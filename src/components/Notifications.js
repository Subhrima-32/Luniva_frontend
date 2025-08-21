import React from "react";
import { Heart, UserPlus, MessageCircle, PlusSquare } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { id: 1, user: "Alice", text: "liked your post", type: "like", time: "2m ago" },
    { id: 2, user: "Bob", text: "started following you", type: "follow", time: "5m ago" },
    { id: 3, user: "Charlie", text: "commented on your post", type: "comment", time: "10m ago" },
    { id: 4, user: "You", text: "created a new post", type: "post", time: "20m ago" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart className="bg-text-red-400" size={20} />;
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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {notifications.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4 hover:bg-purple-50 transition"
          >
            <div className="flex flex-col">
              <p className="text-purple-700 font-medium">
                <strong>{note.user}</strong> {note.text}
              </p>
              <span className="text-xs text-gray-500">{note.time}</span>
            </div>
            <div>{getIcon(note.type)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
