import { NextRequest } from "next/server";
import dns from "dns/promises";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const domain = email.split("@")[1];

  if (!domain) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const addresses = await dns.resolveMx(domain);

    if (!addresses || addresses.length === 0) {
      return new Response(JSON.stringify({ valid: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ valid: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
