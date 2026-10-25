"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Power,
  Eye,
  ExternalLink,
  Lock,
  KeyRound,
  User,
  CheckCircle2,
  AlertTriangle,
  Server,
  X,
  FileText,
  Sliders,
  Type,
  Radio,
  Sparkles,
  Save,
  RotateCcw,
} from "lucide-react";

const DEFAULT_HEADLINE = "This site is under maintenance. Soon back.";
const DEFAULT_TICKER = "⚡ THIS SITE IS UNDER MAINTENANCE • SOON BACK ✦ UPGRADING SYSTEM CORE ✦";

const PRESETS = [
  {
    name: "Standard Maintenance",
    message: "This site is under maintenance. Soon back.",
    ticker: "⚡ THIS SITE IS UNDER MAINTENANCE • SOON BACK ✦ UPGRADING SYSTEM CORE ✦",
  },
  {
    name: "System Upgrade",
    message: "Scheduled core system upgrade in progress.",
    ticker: "⚡ SYSTEM UPGRADE IN PROGRESS • BACK ONLINE SHORTLY ✦ OPTIMIZING SERVICES ✦",
  },
  {
    name: "Database Optimization",
    message: "Database clusters are currently being optimized.",
    ticker: "🚀 HIGH PERFORMANCE OPTIMIZATIONS IN PROGRESS • ESTIMATED RETURN < 30 MINS ✦",
  },
  {
    name: "Emergency Fixes",
    message: "Brief maintenance window for critical security updates.",
    ticker: "🛡️ CRITICAL SECURITY & STABILITY ENHANCEMENTS • DEVSUITE RETURNING SOON ✦",
  },
];

export default function Admin12Page() {
  // Maintenance state
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  // Customization state
  const [messageInput, setMessageInput] = useState(DEFAULT_HEADLINE);
  const [tickerInput, setTickerInput] = useState(DEFAULT_TICKER);

  // Modal for Username & Password verification
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMode, setModalMode] = useState<"toggle" | "customize">("toggle");
  const [pendingState, setPendingState] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load current maintenance state from server
  const loadState = async () => {
    try {
      const res = await fetch("/api/maintenance", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setIsMaintenance(data.isMaintenance);
        setLastUpdated(data.updatedAt);
        setUpdatedBy(data.updatedBy);
        if (data.message) setMessageInput(data.message);
        if (data.tickerText) setTickerInput(data.tickerText);
      }
    } catch (e) {
      console.error("Failed to fetch maintenance status:", e);
    }
  };

  useEffect(() => {
    loadState();
  }, []);

  // When admin clicks the toggle switch, open the verification modal
  const handleToggleClick = (targetState: boolean) => {
    setModalMode("toggle");
    setPendingState(targetState);
    setUsernameInput("");
    setPasswordInput("");
    setAuthError("");
    setShowConfirmModal(true);
  };

  // When admin clicks Save Customization, open verification modal
  const handleSaveCustomizationClick = () => {
    setModalMode("customize");
    setUsernameInput("");
    setPasswordInput("");
    setAuthError("");
    setShowConfirmModal(true);
  };

  const handleResetDefaults = () => {
    setMessageInput(DEFAULT_HEADLINE);
    setTickerInput(DEFAULT_TICKER);
  };

  // Submit action (toggle or customize) with credentials verification
  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setAuthError("");
    setFeedback(null);

    try {
      const payload: Record<string, any> = {
        username: usernameInput,
        password: passwordInput,
      };

      if (modalMode === "toggle") {
        if (pendingState === null) return;
        payload.isMaintenance = pendingState;
      } else {
        payload.message = messageInput;
        payload.tickerText = tickerInput;
      }

      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (modalMode === "toggle") {
          setIsMaintenance(pendingState!);
          setFeedback({
            type: "success",
            text: pendingState
              ? "Website turned OFF! All visitors going to https://devtech.cashms.in will now see the 3D Maintenance Screen."
              : "Website turned ON! All visitors can now access https://devtech.cashms.in normally.",
          });
        } else {
          setFeedback({
            type: "success",
            text: "Maintenance Screen Customization saved! Custom headline and running ticker line are now live.",
          });
        }
        setLastUpdated(new Date().toISOString());
        setUpdatedBy(usernameInput);
        setShowConfirmModal(false);
        loadState();
      } else {
        setAuthError(data.error || "Invalid Admin Username or Password. Access denied.");
      }
    } catch (err: any) {
      setAuthError(err?.message || "Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Glow */}
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
              <p className="text-xs text-slate-400">Master Maintenance &amp; Website Working Switch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/maintenance"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
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
              <span>Open Website</span>
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

        {/* HERO CARD: MASTER ON / OFF SWITCH */}
        <section className="relative overflow-hidden backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: State Explanation */}
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border">
                {isMaintenance ? (
                  <span className="text-amber-400 border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    MAINTENANCE ACTIVE • WEBSITE OFF FOR ALL USERS
                  </span>
                ) : (
                  <span className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    WEBSITE ON • WORKING FOR ALL USERS
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isMaintenance
                  ? "Website is Under Maintenance"
                  : "Website is Active & Working"}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {isMaintenance
                  ? "All visitors to https://devtech.cashms.in are now seeing the 3D Maintenance Screen. Click the switch to turn the website back ON."
                  : "All users have full access to https://devtech.cashms.in. Click the switch to turn the website OFF and display the 3D Maintenance Screen."}
              </p>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-4">
                <span>Last Updated: <strong className="text-slate-300">{lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Just now"}</strong></span>
                <span>•</span>
                <span>By: <strong className="text-amber-400">{updatedBy || "admin"}</strong></span>
              </div>
            </div>

            {/* Right: The High-Tech Toggle Switch */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-950/60 border border-white/5 w-full sm:w-auto shrink-0">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Click Switch to Toggle
              </span>

              {/* Big ON / OFF Toggle Pill */}
              <div
                className={`relative w-44 h-20 rounded-full p-2 cursor-pointer transition-all duration-500 select-none ${
                  !isMaintenance
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
                    : "bg-gradient-to-r from-amber-600 to-rose-600 shadow-[0_0_40px_rgba(245,158,11,0.35)]"
                }`}
                onClick={() => handleToggleClick(!isMaintenance)}
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

              {/* Action Button */}
              <button
                onClick={() => handleToggleClick(!isMaintenance)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  !isMaintenance
                    ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40"
                }`}
              >
                {!isMaintenance ? "Turn OFF (Show Maintenance)" : "Turn ON (Website Working)"}
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* MAINTENANCE SCREEN CUSTOMIZATION SECTION */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Maintenance Screen Customization</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                    Live Display
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Customize the headline message and continuous running line (ticker) shown on the 3D maintenance screen.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Templates */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Preset Templates</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMessageInput(preset.message);
                    setTickerInput(preset.ticker);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 transition-all cursor-pointer font-medium"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 gap-5">
            {/* 1. Main Headline Message */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  <span>1. Main Headline Message (Center Screen)</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {messageInput.length} chars
                </span>
              </div>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="e.g. This site is under maintenance. Soon back."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-medium"
              />
              <p className="text-[11px] text-slate-500">
                Displayed in bold golden typography directly below the 3D rotating core.
              </p>
            </div>

            {/* 2. Running Marquee Line */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2. Continuous Running Ticker Line (Marquee Banner)</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {tickerInput.length} chars
                </span>
              </div>
              <textarea
                rows={2}
                value={tickerInput}
                onChange={(e) => setTickerInput(e.target.value)}
                placeholder="e.g. ⚡ THIS SITE IS UNDER MAINTENANCE • SOON BACK ✦ UPGRADING SYSTEM CORE ✦"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono resize-none"
              />
              <p className="text-[11px] text-slate-500">
                Continuously scrolls horizontally across the bottom banner of the screen.
              </p>
            </div>
          </div>

          {/* Live Interactive Preview Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Interactive Preview</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">/maintenance preview</span>
            </div>

            {/* Preview Viewport */}
            <div className="relative rounded-xl overflow-hidden bg-[#050811] border border-white/10 p-6 flex flex-col items-center justify-center min-h-[140px] text-center gap-4">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-cyan-500/5 pointer-events-none" />

              {/* Simulated Headline */}
              <div className="relative z-10 px-2">
                <h4 className="text-base sm:text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  {messageInput || "This site is under maintenance. Soon back."}
                </h4>
              </div>

              {/* Simulated Running Marquee */}
              <div className="relative z-10 w-full overflow-hidden border-y border-amber-500/25 bg-slate-950/80 py-2">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 text-[11px] font-mono tracking-widest text-amber-300 uppercase px-4 font-semibold"
                    >
                      <span>{tickerInput || "⚡ THIS SITE IS UNDER MAINTENANCE • SOON BACK"}</span>
                      <span className="text-cyan-400">✦</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveCustomizationClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Screen Customization</span>
            </button>
          </div>
        </section>

        {/* SYSTEM DIAGNOSTICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Website</span>
            </div>
            <p className="text-sm font-bold text-white">https://devtech.cashms.in</p>
            <p className="text-[11px] text-slate-500">Universal launcher &amp; portal for all users</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Security</span>
            </div>
            <p className="text-sm font-bold text-white">Password Protected</p>
            <p className="text-[11px] text-slate-500">Username &amp; Password required on every change</p>
          </div>
        </section>

      </main>

      {/* ==================================================================== */}
      {/* ADMIN USERNAME & PASSWORD VERIFICATION MODAL */}
      {/* ==================================================================== */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md backdrop-blur-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.2)]">
            
            {/* Close Button */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Icon */}
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>

            {/* Modal Header */}
            <h3 className="text-xl font-bold text-center text-white">Admin Verification</h3>
            <p className="mt-1 text-xs text-center text-slate-300">
              {modalMode === "toggle" ? (
                <>
                  Please enter your Admin Username and Password to turn website{" "}
                  <strong className={pendingState ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                    {pendingState ? "OFF (Show Maintenance Screen)" : "ON (Website Working)"}
                  </strong>
                </>
              ) : (
                <>
                  Please enter your Admin Username and Password to save{" "}
                  <strong className="text-cyan-400 font-bold">Maintenance Screen Customizations</strong>
                </>
              )}
            </p>

            {/* Form */}
            <form onSubmit={handleConfirmSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                    autoFocus
                  />
                  <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50 ${
                    modalMode === "customize"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20"
                      : pendingState
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20"
                  }`}
                >
                  {isSaving
                    ? "Verifying..."
                    : modalMode === "customize"
                    ? "Save Customization"
                    : pendingState
                    ? "Confirm Turn OFF"
                    : "Confirm Turn ON"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Marquee Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 16s linear infinite;
        }
      `}</style>

    </div>
  );
}
