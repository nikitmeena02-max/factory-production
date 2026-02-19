import React, { useState } from "https://esm.sh/react@18";
import { supabase } from "./supabaseClient.js";

export default function Login({ onLogin }) {
  const [emp, setEmp] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const { data, error } = await supabase
      .from("factory_users")
      .select("*")
      .eq("emp_code", emp)
      .eq("password", pass)
      .single();

    if (error || !data) {
      setError("Invalid Employee Code or Password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    onLogin(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Factory Production Login</h2>

      <input
        placeholder="Employee Code"
        value={emp}
        onChange={(e) => setEmp(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}
