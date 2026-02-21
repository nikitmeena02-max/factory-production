import React, { useState } from "https://esm.sh/react@18";
import { supabase } from "../supabaseClient.js";

export default function AdminPanel({ user, onLogout }) {

  const [emp_code, setEmp] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [role, setRole] = useState("operator");
  const [msg, setMsg] = useState("");

  async function createUser() {
    setMsg("Saving...");

    const { error } = await supabase.from("factory_users").insert([
      { emp_code, name, password, role }
    ]);

    if (error) {
      setMsg("Error: " + error.message);
      return;
    }

    setMsg("User Created Successfully ✅");
    setEmp(""); setName(""); setPass("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome {user.name}</h2>
      <h3>Role: {user.role}</h3>

      <hr/>

      <h3>Create Employee</h3>

      <input placeholder="Employee Code"
        value={emp_code} onChange={e=>setEmp(e.target.value)} /><br/><br/>

      <input placeholder="Name"
        value={name} onChange={e=>setName(e.target.value)} /><br/><br/>

      <input placeholder="Password"
        value={password} onChange={e=>setPass(e.target.value)} /><br/><br/>

      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="planning">Planning</option>
        <option value="shift_ic">Shift IC</option>
        <option value="operator">Operator</option>
      </select>

      <br/><br/>
      <button onClick={createUser}>Create User</button>

      <p>{msg}</p>

      <hr/>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
