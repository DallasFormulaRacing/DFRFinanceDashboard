// test-supabase.js
import { createClient } from "@supabase/supabase-js";

// Make sure these match what you have in your .env
const supabaseUrl = "https://htvjkpsdpwwvxrkcjjdz.supabase.co";
const supabaseKey = "";

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
