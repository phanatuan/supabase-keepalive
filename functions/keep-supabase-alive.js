export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Function is alive!",
      time: new Date().toISOString(),
    }),
  };
}
