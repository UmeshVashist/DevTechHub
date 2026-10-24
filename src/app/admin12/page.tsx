"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Power,
  Clock,
  Sparkles,
  Eye,
  ExternalLink,
  Lock,
  Unlock,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Server,
  Radio,
  FileText,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Admin12Page() {
  const { user, isLoaded } = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Maintenance state
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [message, setMessage] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check if owner is signed in via Clerk
  useEffect(() => {
    if (isLoaded) {
      const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
      if (email === "us781819@gmail.com" || user?.id === "user_3FxJM7P318YR7fpLom9VufrsUh9") {
        setIsAuthenticated(true);
      }
    }
  }, [user, isLoaded]);

  // Load current maintenance state from server
  const loadState = async () => {
    try {
      const res = await fetch("/api/maintenance", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setIsMaintenance(data.isMaintenance);
        setMessage(data.message);
        setEstimatedTime(data.estimatedTime);
        setLastUpdated(data.updatedAt);
        setUpdatedBy(data.updatedBy);

        if (data.isAdmin) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.error("Failed to fetch maintenance status:", e);
    }
  };

  useEffect(() => {
    loadState();
  }, []);

  // Handle Passcode Unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin12#devtech" || passcode.trim() === "admin12") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect admin passcode. Please verify and try again.");
    }
  };

  // Toggle Maintenance ON/OFF
  const handleToggle = async (newMaintenanceState: boolean) => {
    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isMaintenance: newMaintenanceState,
          message: message,
          estimatedTime: estimatedTime,
          passcode: passcode || "admin12#devtech",
          enableBypass: true,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsMaintenance(newMaintenanceState);
        setLastUpdated(new Date().toISOString());
        setUpdatedBy(user?.primaryEmailAddress?.emailAddress || "Owner");
        setFeedback({
          type: "success",
          text: newMaintenanceState
            ? "Maintenance Mode ACTIVATED. All standard users will now see the 3D Maintenance Screen."
            : "Website is now LIVE! All users have normal access.",
        });
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to update status. Check permissions.",
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Save Settings (Message & Estimated Time)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isMaintenance: isMaintenance,
          message,
          estimatedTime,
          passcode: passcode || "admin12#devtech",
          enableBypass: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          text: "Maintenance announcement and time estimate updated successfully!",
        });
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to save settings.",
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Network error.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // If not authenticated, show passcode unlock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b13] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white">Owner Security Gate</h1>
          <p className="mt-2 text-xs text-center text-slate-400">
            Control Portal: <strong className="text-amber-400">devtech.cashms.in/admin12</strong>
          </p>

          <form onSubmit={handleUnlock} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Master Owner Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin key..."
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Access Control Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Owner Control Panel
  return (
    <div className="min-h-screen bg-[#070b13] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-wide">DevTech Admin Control</h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  /admin12
                </span>
              </div>
              <p className="text-xs text-slate-400">Master Maintenance &amp; Global Availability Switch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/maintenance"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview 3D Screen</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 hover:text-amber-200 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Site (Admin Bypass)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 py-8 space-y-8">
        
        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 text-sm animate-fadeIn ${
              feedback.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* HERO SECTION: THE MASTER ON / OFF SWITCH */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: State Explanation */}
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border">
                {isMaintenance ? (
                  <span className="text-amber-400 border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    MAINTENANCE MODE ACTIVE (WEBSITE OFF)
                  </span>
                ) : (
                  <span className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    WEBSITE LIVE (WORKING FOR ALL USERS)
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isMaintenance
                  ? "Website is Paused for Maintenance"
                  : "Website is Fully Operational"}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {isMaintenance
                  ? "All standard visitors to https://devtech.cashms.in are currently being routed to the futuristic 3D Maintenance Screen. Turn the switch ON to reopen the website."
                  : "Every user has full access to the launcher, dashboard, and application links. Turn the switch OFF to immediately place the website in maintenance mode."}
              </p>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-4">
                <span>Last Modified: <strong className="text-slate-300">{lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Just now"}</strong></span>
                <span>•</span>
                <span>By: <strong className="text-amber-400">{updatedBy || "Owner"}</strong></span>
              </div>
            </div>

            {/* Right: The High-Tech Toggle Switch */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-950/60 border border-white/5 w-full sm:w-auto shrink-0">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Master Switch
              </span>

              {/* Big ON / OFF Toggle Pill */}
              <div
                className={`relative w-44 h-20 rounded-full p-2 cursor-pointer transition-all duration-500 select-none ${
                  !isMaintenance
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
                    : "bg-gradient-to-r from-amber-600 to-rose-600 shadow-[0_0_40px_rgba(245,158,11,0.35)]"
                }`}
                onClick={() => handleToggle(!isMaintenance)}
              >
                {/* Switch Knob */}
                <div
                  className={`w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-500 transform ${
                    !isMaintenance ? "translate-x-24" : "translate-x-0"
                  }`}
                >
                  <Power
                    className={`w-8 h-8 transition-colors duration-300 ${
                      !isMaintenance ? "text-emerald-600" : "text-amber-600"
                    }`}
                  />
                </div>

                {/* Status Labels inside switch */}
                <span
                  className={`absolute left-5 top-7 text-xs font-black tracking-widest text-white transition-opacity ${
                    isMaintenance ? "opacity-100" : "opacity-0"
                  }`}
                >
                  OFF
                </span>
                <span
                  className={`absolute right-6 top-7 text-xs font-black tracking-widest text-white transition-opacity ${
                    !isMaintenance ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ON
                </span>
              </div>

              {/* Quick Action Button below switch */}
              <button
                disabled={isSaving}
                onClick={() => handleToggle(!isMaintenance)}
                className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  !isMaintenance
                    ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40"
                }`}
              >
                {isSaving
                  ? "Switching..."
                  : !isMaintenance
                  ? "Click to Turn OFF (Maintenance)"
                  : "Click to Turn ON (Live Site)"}
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CUSTOMIZE MAINTENANCE SCREEN CONTENT */}
        {/* ============================================================== */}
        <section className="backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Maintenance Screen Display Settings</h3>
            </div>

            <Link
              href="/maintenance"
              target="_blank"
              className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              <span>View 3D Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Announcement Message (Shown to Visitors)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Describe the upgrades or maintenance details..."
                className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Estimated Completion Time (ETA)
                </label>
                <input
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="e.g. 45 Minutes, 11:30 PM IST"
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Quick Time Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {["15 Minutes", "30 Minutes", "1 Hour", "2 Hours", "Tonight 11 PM"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEstimatedTime(preset)}
                      className="px-3 py-2 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving Settings..." : "Save Announcement Settings"}
              </button>
            </div>
          </form>
        </section>

        {/* ============================================================== */}
        {/* QUICK DIAGNOSTICS & SYSTEM INFO */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Domain</span>
            </div>
            <p className="text-sm font-bold text-white">devtech.cashms.in</p>
            <p className="text-[11px] text-slate-500">Main Launchpad Portal</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Bypass Status</span>
            </div>
            <p className="text-sm font-bold text-emerald-400">ACTIVE for this Browser</p>
            <p className="text-[11px] text-slate-500">You can preview the live site</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner Email</span>
            </div>
            <p className="text-sm font-bold text-white">us781819@gmail.com</p>
            <p className="text-[11px] text-slate-500">Primary Authorized Administrator</p>
          </div>
        </section>

      </main>
    </div>
  );
}
