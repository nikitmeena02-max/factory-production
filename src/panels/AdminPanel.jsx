import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminPanel() {

const [tab,setTab]=useState("users");
const [users,setUsers]=useState([]);
const [stations,setStations]=useState([]);
const [orders,setOrders]=useState([]);

const [emp,setEmp]=useState("");
const [name,setName]=useState("");
const [role,setRole]=useState("operator");
const [pass,setPass]=useState("");

const [station,setStation]=useState("");
const [process,setProcess]=useState("");

const [ord,setOrd]=useState("");
const [size,setSize]=useState("");
const [mat,setMat]=useState("");
const [qty,setQty]=useState("");
const [pic,setPic]=useState("");

useEffect(()=>{
loadUsers();
loadStations();
loadOrders();
},[]);

async function loadUsers(){
let {data}=await supabase.from("users").select("*");
setUsers(data||[]);
}

async function loadStations(){
let {data}=await supabase.from("stations").select("*");
setStations(data||[]);
}

async function loadOrders(){
let {data}=await supabase.from("production_orders").select("*");
setOrders(data||[]);
}

async function addUser(){
await supabase.from("users").insert({emp_code:emp,name,role,password:pass});
loadUsers();
}

async function addStation(){
await supabase.from("stations").insert({station_name:station,process});
loadStations();
}

async function addOrder(){
await supabase.from("production_orders").insert({
order_no:ord,pipe_size:size,material:mat,qty,planning_ic:pic
});
loadOrders();
}

return (
<div>

<h2>Admin Dashboard</h2>

<button onClick={()=>setTab("users")}>Users</button>
<button onClick={()=>setTab("stations")}>Stations</button>
<button onClick={()=>setTab("orders")}>Orders</button>

<hr/>

{tab==="users" && (
<div>
<h3>Create Employee</h3>
<input placeholder="Code" onChange={e=>setEmp(e.target.value)} />
<input placeholder="Name" onChange={e=>setName(e.target.value)} />
<select onChange={e=>setRole(e.target.value)}>
<option>admin</option>
<option>planning_ic</option>
<option>shift_ic</option>
<option>operator</option>
</select>
<input placeholder="Password" onChange={e=>setPass(e.target.value)} />
<button onClick={addUser}>Add</button>

<h3>Employee List</h3>
{users.map(u=>(
<div key={u.id}>{u.emp_code} - {u.name} ({u.role})</div>
))}
</div>
)}

{tab==="stations" && (
<div>
<h3>Add Station</h3>
<input placeholder="Station" onChange={e=>setStation(e.target.value)} />
<input placeholder="Process" onChange={e=>setProcess(e.target.value)} />
<button onClick={addStation}>Add</button>

<h3>Stations</h3>
{stations.map(s=>(
<div key={s.id}>{s.station_name} - {s.process}</div>
))}
</div>
)}

{tab==="orders" && (
<div>
<h3>Create Order</h3>
<input placeholder="Order No" onChange={e=>setOrd(e.target.value)} />
<input placeholder="Pipe Size" onChange={e=>setSize(e.target.value)} />
<input placeholder="Material" onChange={e=>setMat(e.target.value)} />
<input placeholder="Qty" onChange={e=>setQty(e.target.value)} />
<input placeholder="Planning IC" onChange={e=>setPic(e.target.value)} />
<button onClick={addOrder}>Create</button>

<h3>Orders</h3>
{orders.map(o=>(
<div key={o.id}>{o.order_no} | {o.pipe_size} | {o.qty}</div>
))}
</div>
)}

</div>
);
}
