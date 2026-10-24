import { NextRequest, NextResponse } from "next/server";
import {
  getMaintenanceState,
  setMaintenanceState,
  isUserAdmin,
  ADMIN_SECRET_PASSCODE,
} from "@/lib/maintenance";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const state = await getMaintenanceState();

    // Check if current user is admin
    let isAdmin = false;
    const adminCookie = req.cookies.get("devtech_admin_session")?.value;
    if (adminCookie === "authenticated") {
      isAdmin = true;
    } else {
      const { userId } = await auth();
      if (userId) {
        const user = await currentUser();
        const email = user?.primaryEmailAddress?.emailAddress;
        isAdmin = isUserAdmin(email, userId);
      }
    }

    return NextResponse.json({
      success: true,
      ...state,
      isAdmin,
    });
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
    const { isMaintenance, message, estimatedTime, passcode, enableBypass } = body;

    // Check authorization
    let authorized = false;
    let adminIdentifier = "Passcode Admin";

    if (passcode && passcode.trim() === ADMIN_SECRET_PASSCODE) {
      authorized = true;
      adminIdentifier = "Master Key Admin";
    }

    if (!authorized) {
      const { userId } = await auth();
      if (userId) {
        const user = await currentUser();
        const email = user?.primaryEmailAddress?.emailAddress;
        if (isUserAdmin(email, userId)) {
          authorized = true;
          adminIdentifier = email || user?.username || "Owner";
        }
      }
    }

    if (!authorized) {
      const adminCookie = req.cookies.get("devtech_admin_session")?.value;
      if (adminCookie === "authenticated") {
        authorized = true;
        adminIdentifier = "Session Admin";
      }
    }

    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid admin credentials." },
        { status: 403 }
      );
    }

    const updated = await setMaintenanceState(
      Boolean(isMaintenance),
      message,
      estimatedTime,
      adminIdentifier
    );

    const response = NextResponse.json({
      success: true,
      data: updated,
    });

    // Set admin session and bypass cookies so admin never gets locked out
    response.cookies.set("devtech_admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    if (enableBypass || isMaintenance) {
      response.cookies.set("devtech_admin_bypass", "1", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update maintenance state" },
      { status: 500 }
    );
  }
}
