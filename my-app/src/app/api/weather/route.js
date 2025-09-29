export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || !query.trim()) {
      return new Response(JSON.stringify({ error: "Missing required query param 'q'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.WEATHER_API_KEY; // server-side only
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server is missing WEATHER_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const upstreamUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      query.trim()
    )}&days=1`;

    const upstreamRes = await fetch(upstreamUrl, { cache: "no-store" });

    const text = await upstreamRes.text();
    return new Response(text, {
      status: upstreamRes.status,
      headers: { "Content-Type": upstreamRes.headers.get("content-type") || "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unexpected error", message: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 