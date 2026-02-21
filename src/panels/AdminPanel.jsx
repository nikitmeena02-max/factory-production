import React, { useEffect, useState } from "https://esm.sh/react@18";
import { supabase } from "../supabaseClient.js";

export default function AdminPanel({ user, onLogout }) {

  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [prod, setProd] = useState([]);

  // load users
  async function loadUsers() {
    const { data } = await supabase.from("factory_users").select("*");
    if (data) setUsers(data);
  }

  // load production
  async function loadProduction() {
    const { data } = await supabase
      .from("production_entries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProd(data);
  }

  useEffect(() => {
    loadUsers();
    loadProduction();
  }, []);

  async function deleteUser(id) {
    await supabase.from("factory_users").delete().eq("id", id);
    loadUsers();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome {user.name}</p>

      <button onClick={() => setTab("users")}>Users</button>
      <button onClick={() => setTab("production")}>Production</button>

      <hr/>

      {tab === "users" && (
        <>
          <h3>Employee List</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.emp_code}</td>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "production" && (
        <>
          <h3>All Production Entries</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Emp</th>
                <th>Order</th>
                <th>Pipe</th>
                <th>Length</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {prod.map(p => (
                <tr key={p.id}>
                  <td>{p.emp_code}</td>
                  <td>{p.order_no}</td>
                  <td>{p.pipe_no}</td>
                  <td>{p.length}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <br/>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
