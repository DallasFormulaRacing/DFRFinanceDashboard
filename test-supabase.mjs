import { createClient } from "@supabase/supabase-js";

// ─── Replace these with your .env values ───
const supabaseUrl = "https://htvjkpsdpwwvxrkcjjdz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dmprcHNkcHd3dnhya2NqamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDM4NDQsImV4cCI6MjA4ODIxOTg0NH0.kHz_Kp3Z_qqxyKcs_eXsh7s62CAqJrp1T8e7Dmj2g9w";
// ────────────────────────────────────────────

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("🔗 Connecting to:", supabaseUrl);
  console.log("");

  const { data, error, status, statusText } = await supabase
    .from("cost_centers")
    .select("*");

  console.log("📡 Status:", status, statusText);
  console.log("");

  if (error) {
    console.error("❌ Error:", error.message);
    console.error("   Code:", error.code);
    console.error("   Details:", error.details);
    console.error("   Hint:", error.hint);
    return;
  }

  console.log("✅ Success! Got", data.length, "rows");
  console.log("");

3

  // Pretty print all data
  console.log("📦 Data:");
  console.log(JSON.stringify(data, null, 2));
}

test();
