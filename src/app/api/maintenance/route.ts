import { NextRequest, NextResponse } from "next/server";
import {
  getMaintenanceState,
  setMaintenanceState,
  isUserAdmin,
  verifyAdminCredentials,
} from "@/lib/maintenance";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const state = await getMaintenanceState();

    // Check if current user is admin
    let isAdmin = false;
    const adminBypass = req.cookies.get("devtech_admin_bypass")?.value;
    const adminSession = req.cookies.get("devtech_admin_session")?.value;

    if (adminBypass === "1" || adminSession === "authenticated") {
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
      hasBypass: adminBypass === "1",
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
    const { action, username, password, isMaintenance, message, estimatedTime, setBypass } = body;

    // Action to clear bypass so admin can test user view
    if (action === "clear_bypass") {
      const res = NextResponse.json({ success: true, message: "Admin bypass cleared" });
      res.cookies.delete("devtech_admin_bypass");
      return res;
    }

    // Action to set bypass
    if (action === "set_bypass") {
      const res = NextResponse.json({ success: true, message: "Admin bypass activated" });
      res.cookies.set("devtech_admin_bypass", "1", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
      return res;
    }

    // To toggle or update maintenance, ALWAYS verify Admin Username and Password!
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

    // Mark admin session as authenticated
    response.cookies.set("devtech_admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    if (setBypass) {
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
