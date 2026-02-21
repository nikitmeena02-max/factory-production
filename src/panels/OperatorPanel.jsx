import React, { useState } from "https://esm.sh/react@18";
import { supabase } from "../supabaseClient.js";

export default function OperatorPanel({ user, onLogout }) {

  const [order_no, setOrder] = useState("");
  const [pipe_no, setPipe] = useState("");
  const [heat_no, setHeat] = useState("");
  const [length, setLength] = useState("");
  const [shift, setShift] = useState("A");
  const [status, setStatus] = useState("OK");
  const [msg, setMsg] = useState("");

  async function saveEntry() {
    setMsg("Saving...");

    const { error } = await supabase
      .from("production_entries")
      .insert([{
        emp_code: user.emp_code,
        order_no,
        pipe_no,
        heat_no,
        length,
        shift,
        status
      }]);

    if (error) {
      setMsg("Error: " + error.message);
      return;
    }

    setMsg("Saved Successfully ✅");

    setOrder("");
    setPipe("");
    setHeat("");
    setLength("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Operator Panel</h2>
      <p>Welcome {user.name}</p>

      <hr/>

      <h3>Production Entry</h3>

      <input placeholder="Order No"
        value={order_no} onChange={e=>setOrder(e.target.value)} /><br/><br/>

      <input placeholder="Pipe No"
        value={pipe_no} onChange={e=>setPipe(e.target.value)} /><br/><br/>

      <input placeholder="Heat No"
        value={heat_no} onChange={e=>setHeat(e.target.value)} /><br/><br/>

      <input type="number" placeholder="Length (Meter)"
        value={length} onChange={e=>setLength(e.target.value)} /><br/><br/>

      <select value={shift} onChange={e=>setShift(e.target.value)}>
        <option value="A">Shift A</option>
        <option value="B">Shift B</option>
        <option value="C">Shift C</option>
      </select>

      <br/><br/>

      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="OK">OK</option>
        <option value="Reject">Reject</option>
      </select>

      <br/><br/>

      <button onClick={saveEntry}>Submit</button>

      <p>{msg}</p>

      <hr/>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
