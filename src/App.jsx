import { useState } from "react";
import { supabase } from "./supabaseClient";

import AdminPanel from "./panels/AdminPanel";
import PlanningPanel from "./panels/PlanningPanel";
import ShiftPanel from "./panels/ShiftPanel";
import OperatorPanel from "./panels/OperatorPanel";

export default function App() {

  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("emp_code", empCode)
      .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid Login");
      return;
    }

    setUser(data);
  }

  function handleLogout() {
    setUser(null);
    setEmpCode("");
    setPassword("");
  }

  // 🔐 LOGIN SCREEN
  if (!user) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Factory ERP Login</h2>

        <input
          placeholder="Employee Code"
          value={empCode}
          onChange={(e) => setEmpCode(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>

        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // 🧠 ROLE BASED ROUTING
  if (user.role === "admin")
    return <AdminPanel user={user} onLogout={handleLogout} />;

  if (user.role === "planning_ic")
    return <PlanningPanel user={user} onLogout={handleLogout} />;

  if (user.role === "shift_ic")
    return <ShiftPanel user={user} onLogout={handleLogout} />;

  if (user.role === "operator")
    return <OperatorPanel user={user} onLogout={handleLogout} />;

  return <div>Invalid Role</div>;
}
