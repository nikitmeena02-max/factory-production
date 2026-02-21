import React, { useState, useEffect } from "https://esm.sh/react@18";
import Login from "./Login.jsx";

import AdminPanel from "./panels/AdminPanel.jsx";
import PlanningPanel from "./panels/PlanningPanel.jsx";
import ShiftPanel from "./panels/ShiftPanel.jsx";
import OperatorPanel from "./panels/OperatorPanel.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  // auto login from storage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) return <Login onLogin={setUser} />;

  // ROLE BASED SCREEN
  if (user.role === "admin")
    return <AdminPanel user={user} onLogout={handleLogout} />;

  if (user.role === "planning")
    return <PlanningPanel user={user} onLogout={handleLogout} />;

  if (user.role === "shift_ic")
    return <ShiftPanel user={user} onLogout={handleLogout} />;

  if (user.role === "operator")
    return <OperatorPanel user={user} onLogout={handleLogout} />;

  return <div>Role not assigned</div>;
}
