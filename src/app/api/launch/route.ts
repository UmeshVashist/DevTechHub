import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get("app");

  const host = request.headers.get("host") || "";
  const isLocalhost = host.includes("localhost");

  let redirectUrl = "";

  if (isLocalhost) {
    if (app === "devboard") redirectUrl = "http://localhost:3001";
    if (app === "devstore") redirectUrl = "http://localhost:3002";
    if (app === "devpass") redirectUrl = "http://localhost:3003";
  } else {
    if (app === "devboard") redirectUrl = process.env.NEXT_PUBLIC_DEVBOARD_URL || "https://devboard.cashms.in";
    if (app === "devstore") redirectUrl = process.env.NEXT_PUBLIC_DEVSTORE_URL || "https://devstore.cashms.in";
    if (app === "devpass") redirectUrl = process.env.NEXT_PUBLIC_DEVPASS_URL || "https://devpass.cashms.in";
  }

  if (!redirectUrl) {
    return NextResponse.json({ error: "Invalid app" }, { status: 400 });
  }

  return NextResponse.json({
    authenticated: true,
    redirectUrl,
  });
}
