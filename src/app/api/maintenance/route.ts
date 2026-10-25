import { NextRequest, NextResponse } from "next/server";
import {
  getMaintenanceState,
  setMaintenanceState,
  verifyAdminCredentials,
} from "@/lib/maintenance";

export async function GET() {
  try {
    const state = await getMaintenanceState();

    const response = NextResponse.json({
      success: true,
      ...state,
    });

    // Clean up any old bypass cookies
    response.cookies.set("devtech_admin_bypass", "", {
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch status" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, isMaintenance, message, estimatedTime } = body;

    // Strict verification of Admin Username and Password
    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed. Invalid Admin Username or Password.",
        },
        { status: 401 }
      );
    }

    const updated = await setMaintenanceState(
      Boolean(isMaintenance),
      message,
      estimatedTime,
      username || "Admin"
    );

    const response = NextResponse.json({
      success: true,
      data: updated,
    });

    // Wipe any bypass cookie so state is strictly uniform for all
    response.cookies.set("devtech_admin_bypass", "", {
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update maintenance state" },
      { status: 500 }
    );
  }
}
