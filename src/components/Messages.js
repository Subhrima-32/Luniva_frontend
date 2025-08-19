import React, { useState } from 'react';

const inboxChats = [
  { id: 1, name: 'Divya' },
  { id: 2, name: 'Puja' },
  { id: 3, name: 'Shreemati' },
  { id: 4, name: 'Bhumi' },
  { id: 5, name: 'Subhri' },
];

export default function Inbox() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');

  // Handle sending a message
  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    setMessages((prev) => {
      const prevMessages = prev[activeChat.name] || [];
      return { ...prev, [activeChat.name]: [...prevMessages, input.trim()] };
    });
    setInput('');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Inbox</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {inboxChats.map((chat) => (
          <li key={chat.id} style={{ marginBottom: 10 }}>
            <span>{chat.name}</span>{' '}
            <button onClick={() => setActiveChat(chat)}>Message</button>
          </li>
        ))}
      </ul>

      {activeChat && (
        <div style={{ borderTop: '1px solid #ccc', paddingTop: 10 }}>
          <h3>Chat with {activeChat.name}</h3>
          <div
            style={{
              border: '1px solid #ddd',
              height: 150,
              padding: 10,
              overflowY: 'auto',
              marginBottom: 10,
              backgroundColor: '#f9f9f9',
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
            style={{ width: '70%', padding: 5 }}
          />
          <button onClick={sendMessage} style={{ padding: '5px 10px', marginLeft: 5 }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
