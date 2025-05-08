import fetch from "node-fetch";

export async function handler() {
  console.log("Ping function started");

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    console.error("Missing environment variables");
    return {
      statusCode: 500,
      body: "Missing SUPABASE_URL or SUPABASE_API_KEY",
    };
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/pg_catalog.pg_tables?select=schemaname&limit=1`,
      {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Supabase error: ${res.status} ${res.statusText}`);
    }

    console.log("Supabase ping successful");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Ping successful" }),
    };
  } catch (error) {
    console.error("Function error:", error.message);
    return {
      statusCode: 500,
      body: "Function error: " + error.message,
    };
  }
}
