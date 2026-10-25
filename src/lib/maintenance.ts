// Maintenance mode persistence and helper utility
export interface MaintenanceState {
  isMaintenance: boolean;
  message: string;
  estimatedTime: string;
  updatedAt: string;
  updatedBy: string;
}

const DEFAULT_STATE: MaintenanceState = {
  isMaintenance: false,
  message: "We are currently performing scheduled core upgrades to bring you enhanced performance and new features. DevSuite Hub will be back online shortly.",
  estimatedTime: "Under 1 Hour",
  updatedAt: new Date().toISOString(),
  updatedBy: "System",
};

// Owner identifiers
export const OWNER_EMAILS = ["us781819@gmail.com"];
export const OWNER_CLERK_IDS = ["user_3FxJM7P318YR7fpLom9VufrsUh9"];
export const ADMIN_SECRET_PASSCODE = "Umesh@1212";

export const ADMIN_CREDENTIALS = [
  { username: "admin", password: "Umesh@1212" },
  { username: "vashist", password: "Umesh@1212" },
  { username: "us781819@gmail.com", password: "Umesh@1212" },
  { username: "devtech", password: "Umesh@1212" },
];

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const u = username.trim().toLowerCase();
  const p = password.trim();
  return ADMIN_CREDENTIALS.some(
    (c) => c.username.toLowerCase() === u && c.password === p
  );
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lzfksqzuiavlwrnteykt.supabase.co";
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZmtzcXp1aWF2bHdybnRleWt0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzEwMTMzOSwiZXhwIjoyMDgyNjc3MzM5fQ.i-wf4GvnfqUyMGKIFudYjGpJ1QOUg0C8A9-Zo5HUwGw";

// In-memory fallback cache
let memoryCache: MaintenanceState = { ...DEFAULT_STATE };
let lastFetchTime = 0;
const CACHE_TTL_MS = 2000; // 2 seconds fast refresh

/**
 * Fetch maintenance state from Supabase notes table or fallback cache
 */
export async function getMaintenanceState(): Promise<MaintenanceState> {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/notes?title=eq.__SYSTEM_MAINTENANCE_MODE__&select=*`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].description) {
        try {
          const parsed = JSON.parse(data[0].description);
          memoryCache = {
            isMaintenance: !!parsed.isMaintenance,
            message: parsed.message || DEFAULT_STATE.message,
            estimatedTime: parsed.estimatedTime || DEFAULT_STATE.estimatedTime,
            updatedAt: parsed.updatedAt || data[0].updated_at || new Date().toISOString(),
            updatedBy: parsed.updatedBy || "Admin",
          };
          lastFetchTime = now;
          return memoryCache;
        } catch {
          // JSON parse fallback
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch maintenance state from Supabase, using cache:", err);
  }

  return memoryCache;
}

/**
 * Persist maintenance state to Supabase
 */
export async function setMaintenanceState(
  isMaintenance: boolean,
  message?: string,
  estimatedTime?: string,
  updatedBy: string = "Owner"
): Promise<MaintenanceState> {
  const newState: MaintenanceState = {
    isMaintenance,
    message: message || memoryCache.message || DEFAULT_STATE.message,
    estimatedTime: estimatedTime || memoryCache.estimatedTime || DEFAULT_STATE.estimatedTime,
    updatedAt: new Date().toISOString(),
    updatedBy,
  };

  memoryCache = { ...newState };
  lastFetchTime = Date.now();

  try {
    // 1. Check if record exists
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/notes?title=eq.__SYSTEM_MAINTENANCE_MODE__&select=id`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
        cache: "no-store",
      }
    );

    const existing = checkRes.ok ? await checkRes.json() : [];

    if (Array.isArray(existing) && existing.length > 0) {
      // Update existing record
      await fetch(
        `${SUPABASE_URL}/rest/v1/notes?id=eq.${existing[0].id}`,
        {
          method: "PATCH",
          headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            description: JSON.stringify(newState),
            updated_at: new Date().toISOString(),
          }),
        }
      );
    } else {
      // Find valid profile id to attach system note
      const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,clerk_user_id&limit=1`, {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      });
      const profiles = profRes.ok ? await profRes.json() : [];
      const profile = profiles[0] || {};

      // Insert new record
      await fetch(`${SUPABASE_URL}/rest/v1/notes`, {
        method: "POST",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          title: "__SYSTEM_MAINTENANCE_MODE__",
          description: JSON.stringify(newState),
          is_favorite: false,
          user_id: profile.id || "2b9a0c8b-0970-48e2-811a-ddc4707638d0",
          clerk_user_id: profile.clerk_user_id || "user_3FxJM7P318YR7fpLom9VufrsUh9",
        }),
      });
    }
  } catch (err) {
    console.error("Failed to persist maintenance state to Supabase:", err);
  }

  return newState;
}

/**
 * Check if user is an owner/admin
 */
export function isUserAdmin(email?: string | null, clerkUserId?: string | null): boolean {
  if (email && OWNER_EMAILS.includes(email.toLowerCase().trim())) return true;
  if (clerkUserId && OWNER_CLERK_IDS.includes(clerkUserId)) return true;
  return false;
}
