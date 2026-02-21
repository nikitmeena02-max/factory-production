import React from "https://esm.sh/react@18";

export default function AdminPanel({ user, onLogout }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome {user.name}</h2>
      <h3>Role: {user.role}</h3>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
