import React, { useState } from "https://esm.sh/react@18";
import Login from "./Login.jsx";

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome {user.name}</h1>
      <p>Role: {user.role}</p>

      <button onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}>
        Logout
      </button>
    </div>
  );
}
