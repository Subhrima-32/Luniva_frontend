import React, { useState, useEffect } from "react";

const inboxChats = [
  { id: 1, name: "Divya" },
  { id: 2, name: "Puja" },
  { id: 3, name: "Shreemati" },
  { id: 4, name: "Bhumi" },
  { id: 5, name: "Subhri" },
];

export default function Messages({ chatTarget }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  // Open chat directly if chatTarget is passed from LunivaHome
  useEffect(() => {
    if (chatTarget) {
      const foundChat =
        inboxChats.find((c) => c.name === chatTarget) || { id: Date.now(), name: chatTarget };
      setActiveChat(foundChat);
    }
  }, [chatTarget]);

  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    const userMessage = input.trim();

    setMessages((prev) => {
      const prevMessages = prev[activeChat.name] || [];
      return { ...prev, [activeChat.name]: [...prevMessages, `You: ${userMessage}`] };
    });
    setInput("");

    setTimeout(() => {
      const reply = getAutoReply(activeChat.name);
      setMessages((prev) => {
        const prevMessages = prev[activeChat.name] || [];
        return { ...prev, [activeChat.name]: [...prevMessages, `${activeChat.name}: ${reply}`] };
      });
    }, 1500);
  };

  const getAutoReply = (name) => {
    const replies = {
      Divya: ["Hey! How are you? 😊", "Let's have biryani tonight 🍗", "What’s up?", "Haha 😂"],
      Puja: ["Busy rn, brb!", "Did you finish your assignment?", "Coffee plan? ☕"],
      Shreemati: ["Good morning 🌸", "Haha that’s funny 😂", "You always make me laugh!"],
      Bhumi: ["Sure! Let’s catch up tomorrow.", "Movie night? 🎬", "Don’t forget project!"],
      Subhri: ["Okay noted 👍", "Let's order biryani 😎", "Haha that’s a good idea!"],
    };
    const personReplies = replies[name] || ["Got your message!"];
    return personReplies[Math.floor(Math.random() * personReplies.length)];
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Inbox List View */}
      {!activeChat && (
        <div style={{ padding: 20 }}>
          <h2>Inbox</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {inboxChats.map((chat) => (
              <li
                key={chat.id}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{chat.name}</span>
                <button
                  onClick={() => setActiveChat(chat)}
                  style={{
                    padding: "5px 10px",
                    background: "#663399",
                    color: "#fff",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Message
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat View */}
      {activeChat && (
        <div style={{ padding: 20 }}>
          <button
            onClick={() => setActiveChat(null)}
            style={{
              marginBottom: 10,
              background: "transparent",
              border: "none",
              color: "#663399",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ← Back
          </button>
          <h3>Chat with {activeChat.name}</h3>
          <div
            style={{
              border: "1px solid #ddd",
              height: 200,
              padding: 10,
              overflowY: "auto",
              marginBottom: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            {(messages[activeChat.name] || []).map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 5 }}>
                {msg}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder={`Message ${activeChat.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "70%", padding: 5 }}
          />
          <button
            onClick={sendMessage}
            style={{ padding: "5px 10px", marginLeft: 5 }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
