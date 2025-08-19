import React from "react";

export default function Suggestions({ suggestions, onFollow }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, maxWidth: 420 }}>
      {suggestions.map((s) => (
        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
          <span>{s.name}</span>
          {s.following ? (
            <button disabled>Following</button>
          ) : (
            <button onClick={() => onFollow(s.id)}>Follow</button>
          )}
        </div>
      ))}
    </div>
  );
}
