import React from "https://esm.sh/react@18";

export default function OperatorPanel({ user, onLogout }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Operator Panel</h2>
      <p>Welcome {user.name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
