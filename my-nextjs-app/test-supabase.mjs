// test-supabase.js
import { createClient } from "@supabase/supabase-js";

// Make sure these match what you have in your .env
const supabaseUrl = "https://htvjkpsdpwwvxrkcjjdz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dmprcHNkcHd3dnhya2NqamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDM4NDQsImV4cCI6MjA4ODIxOTg0NH0.kHz_Kp3Z_qqxyKcs_eXsh7s62CAqJrp1T8e7Dmj2g9w";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Checking connection...");
  const { data, error } = await supabase.from('purchase_orders').select('*').limit(5);

  if (error) {
    console.error("Connection Failed:", error);
  } else {
    console.log("Connection Successful!");
    console.log("Found rows:", data.length);
    console.log("Data:", data);
  }
}

testConnection();