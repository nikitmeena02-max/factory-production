async function saveEntry() {
  setMsg("Saving...");

  const now = new Date().toISOString();

  const { error } = await supabase
    .from("production_entries")
    .insert([{
      emp_code: user.emp_code,
      order_no,
      pipe_no,
      heat_no,
      length,
      shift,
      status,
      start_time: now,
      end_time: now
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
