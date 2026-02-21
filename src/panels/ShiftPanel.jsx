import React from "https://esm.sh/react@18";

export default function ShiftPanel({ user, onLogout }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Shift IC Panel</h2>
      <p>Welcome {user.name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
