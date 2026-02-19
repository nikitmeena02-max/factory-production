export default function App() {

  function login(role){
    alert("Login as: " + role);
  }

  return (
    <div style={{
      fontFamily:"Arial",
      background:"#0f172a",
      height:"100vh",
      color:"white",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column"
    }}>

      <h1>Factory Production App</h1>
      <p>Select Login Role</p>

      <div style={{display:"flex",gap:"10px",marginTop:"20px"}}>

        <button style={btn} onClick={()=>login("Operator")}>
          Operator
        </button>

        <button style={btn} onClick={()=>login("Shift Incharge")}>
          Shift Incharge
        </button>

        <button style={btn} onClick={()=>login("Planning Incharge")}>
          Planning
        </button>

      </div>

    </div>
  );
}

const btn = {
  padding:"15px 20px",
  background:"#2563eb",
  border:"none",
  color:"white",
  fontSize:"16px",
  borderRadius:"10px",
  cursor:"pointer"
};
