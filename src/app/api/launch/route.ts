import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get("app");

  const host = request.headers.get("host") || "";
  const isLocalhost = host.includes("localhost");

  let redirectUrl = "";

  if (isLocalhost) {
    if (app === "devboard") redirectUrl = "http://localhost:3001/board";
    if (app === "devstore") redirectUrl = "http://localhost:3002/store";
    if (app === "devpass") redirectUrl = "http://localhost:3003/pass";
  } else {
    if (app === "devboard") redirectUrl = "/board";
    if (app === "devstore") redirectUrl = "/store";
    if (app === "devpass") redirectUrl = "/pass";
  }

  if (!redirectUrl) {
    return NextResponse.json({ error: "Invalid app" }, { status: 400 });
  }

  return NextResponse.json({
    authenticated: true,
    redirectUrl,
  });
}
