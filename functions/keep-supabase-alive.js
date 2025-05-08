import fetch from "node-fetch";

export async function handler() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

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
      throw new Error(`Failed to ping Supabase: ${res.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Supabase keepalive ping successful" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
