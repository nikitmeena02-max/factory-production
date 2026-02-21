import React, { useEffect, useState } from "https://esm.sh/react@18";
import { supabase } from "../supabaseClient.js";

export default function ShiftPanel({ user, onLogout }) {

  const [data, setData] = useState([]);

  async function loadData() {
    const { data, error } = await supabase
      .from("production_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setData(data);
  }

  useEffect(() => {
    loadData();

    // realtime auto refresh
    const channel = supabase
      .channel("live-production")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "production_entries" },
        () => loadData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Shift IC Panel</h2>
      <p>Welcome {user.name}</p>

      <hr/>

      <h3>Live Production</h3>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Emp</th>
            <th>Order</th>
            <th>Pipe</th>
            <th>Heat</th>
            <th>Length</th>
            <th>Shift</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.emp_code}</td>
              <td>{row.order_no}</td>
              <td>{row.pipe_no}</td>
              <td>{row.heat_no}</td>
              <td>{row.length}</td>
              <td>{row.shift}</td>
              <td>{row.status}</td>
              <td>{new Date(row.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br/>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
