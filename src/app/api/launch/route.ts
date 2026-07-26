import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const APP_URLS: Record<string, string> = {
  devboard: process.env.NEXT_PUBLIC_DEVBOARD_URL || "http://localhost:3001",
  devstore: process.env.NEXT_PUBLIC_DEVSTORE_URL || "http://localhost:3002",
  devpass: process.env.NEXT_PUBLIC_DEVPASS_URL || "http://localhost:3003",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get("app");

  if (!app || !APP_URLS[app]) {
    return NextResponse.json({ error: "Invalid app identifier" }, { status: 400 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const host = request.headers.get("host") || "";
  const isLocalhost = host.includes("localhost");

  let targetUrl = APP_URLS[app];
  if (isLocalhost) {
    if (app === "devboard") targetUrl = "http://localhost:3001";
    if (app === "devstore") targetUrl = "http://localhost:3002";
    if (app === "devpass") targetUrl = "http://localhost:3003";
  }

  return NextResponse.json({
    redirectUrl: targetUrl,
    app,
    authenticated: true,
  });
}
