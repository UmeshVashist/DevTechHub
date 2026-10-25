import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMaintenanceState } from "@/lib/maintenance";
import {
  Layers,
  LayoutGrid,
  Database,
  Key,
  Calendar,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Workflow,
  Cloud,
  ChevronRight,
  Fingerprint
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const maintenance = await getMaintenanceState();
  if (maintenance.isMaintenance) {
    redirect("/maintenance");
  }

  const { userId } = await auth();

  const apps = [
    {
      id: "devboard",
      title: "DevBoard",
      subtitle: "Knowledge & Formula Catalog",
      description:
        "Comprehensive Excel formula dictionary, keyboard shortcut cheatsheets, code snippets, and structured developer notes saved instantly to Supabase.",
      icon: LayoutGrid,
      tag: "Supabase DB",
      color: "from-orange-500 to-amber-500",
      features: ["Formula syntax guide", "Shortcut cheat repository", "Fast fuzzy search", "Instant bookmarking"],
      href: "/dashboard",
    },
    {
      id: "devstore",
      title: "DevStore",
      subtitle: "Google Drive Cloud Storage",
      description:
        "Direct Google Drive cloud storage manager. Upload files, manage retention cycles, share documents safely, and bypass storage constraints effortlessly.",
      icon: Database,
      tag: "Drive OAuth API",
      color: "from-amber-600 to-orange-600",
      features: ["Direct Drive sync", "Custom retention policy", "Smart upload quotas", "Cloud sharing links"],
      href: "/dashboard",
    },
    {
      id: "devpass",
      title: "DevPass",
      subtitle: "AES-256 Password Vault",
      description:
        "Ultra-secure glassmorphic password manager. Encrypt and manage passwords locally with zero-knowledge AES-256 and sync safely to your Google Sheets.",
      icon: Key,
      tag: "Zero-Knowledge",
      color: "from-emerald-600 to-teal-600",
      features: ["Client-side AES-256", "Google Sheets storage", "Generator & strength tester", "Zero server retention"],
      href: "/dashboard",
    },
    {
      id: "daydate",
      title: "Day Date System",
      subtitle: "Calendar & Date Utilities",
      description:
        "Public day and date calculation suite. Check elapsed days, calculate workweek schedules, upcoming milestones, and date offsets without login.",
      icon: Calendar,
      tag: "Public App",
      color: "from-blue-600 to-indigo-600",
      features: ["Date interval calculator", "Business day counter", "Public web access", "Instant results"],
      href: "https://day-date.vercel.app/",
      isExternal: true,
    },
  ];

  const highlights = [
    {
      icon: Fingerprint,
      title: "Single Sign-On (SSO)",
      description: "Sign in once through UV Tech's Clerk SSO and smoothly navigate between DevBoard, DevStore, and DevPass without re-authenticating.",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Privacy",
      description: "Your credentials and secrets never leave your device unencrypted. We utilize client-side AES-256 military-grade encryption.",
    },
    {
      icon: Cloud,
      title: "Cloud Synced Workspaces",
      description: "Integrated directly with Google Drive, Supabase, and Google Sheets for decentralized, reliable data storage.",
    },
    {
      icon: Sparkles,
      title: "Warm Neomorphic Interface",
      description: "Carefully calibrated antique white theme with tactile neumorphism designed to reduce eye strain over long engineering shifts.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAEBD7] text-slate-800 antialiased selection:bg-orange-200/50 selection:text-orange-950">
      {/* Top Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[45%] bg-orange-200/30 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-[-5%] right-[-10%] w-[45%] h-[45%] bg-amber-200/30 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[3px_3px_6px_#d9cbba,_-3px_-3px_6px_#ffffff] text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-8">
              <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>Unified Developer Ecosystem • Powered by UV Tech</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] max-w-5xl mx-auto">
              One Launchpad for All Your{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                Developer Workspaces
              </span>
            </h1>

            {/* Detailed Explanation of Website */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Welcome to <strong>DevSuite Hub</strong>. A centralized app launcher engineered to eliminate workspace fragmentation. Access your Excel knowledge board, cloud storage sync, client-side encrypted password vault, and calendar tools — all unified under single sign-on.
            </p>

            {/* Hero CTA Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {userId ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[6px_6px_16px_rgba(234,88,12,0.35)] hover:from-orange-700 hover:to-amber-700 hover:shadow-[3px_3px_8px_rgba(234,88,12,0.25)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Launch All Apps in Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/sign-up"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[6px_6px_16px_rgba(234,88,12,0.35)] hover:from-orange-700 hover:to-amber-700 hover:shadow-[3px_3px_8px_rgba(234,88,12,0.25)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[5px_5px_10px_#d9cbba,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] hover:text-orange-600 transition-all duration-200"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}

              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-slate-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:text-orange-600 hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] transition-all"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#f0dac0]/80">
              <div className="p-4 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]">
                <div className="text-2xl font-black text-orange-600">4 Apps</div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">Unified Launcher</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]">
                <div className="text-2xl font-black text-amber-600">1 Login</div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">Clerk Single Sign-On</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]">
                <div className="text-2xl font-black text-emerald-600">AES-256</div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">Client-Side Vault</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]">
                <div className="text-2xl font-black text-slate-800">100%</div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">Free & Accessible</div>
              </div>
            </div>

          </div>
        </section>

        {/* Section: All Apps in the Launcher */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-orange-700 font-extrabold mb-3">
              Included Applications
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Powerful Tools Built For Daily Productivity
            </h3>
            <p className="mt-4 text-slate-600 text-base sm:text-lg font-medium">
              Each application is engineered with high standards of design and performance. Launch any app with a single click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="rounded-[32px] border border-[#f5e3cc] bg-[#FAEBD7] p-8 sm:p-10 shadow-[10px_10px_20px_#d9cbba,_-10px_-10px_20px_#ffffff] hover:shadow-[14px_14px_28px_#d9cbba,_-14px_-14px_28px_#ffffff] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-2xl bg-[#FAEBD7] shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-orange-600">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-slate-700">
                        {app.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-slate-900">
                        {app.title}
                      </h4>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mt-1">
                        {app.subtitle}
                      </p>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                        {app.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                        Key Features:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {app.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[#f0dac0]/80 mt-6 flex items-center justify-between">
                    <Link
                      href={app.isExternal ? app.href : "/dashboard"}
                      target={app.isExternal ? "_blank" : undefined}
                      rel={app.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-orange-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] transition-all"
                    >
                      <span>Launch {app.title}</span>
                      {app.isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>

                    <Link
                      href="/features"
                      className="text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
                    >
                      Read details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Platform Architecture & Security */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5e3cc]/30 border-y border-[#ebd3b7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase tracking-[0.25em] text-orange-700 font-extrabold mb-3">
                Built by UV Tech
              </h2>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Why Developers Love DevSuite
              </h3>
              <p className="mt-3 text-slate-600 text-base font-medium">
                Engineered from the ground up for privacy, speed, and cross-application harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_14px_#d9cbba,_-6px_-6px_14px_#ffffff] space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#FAEBD7] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-orange-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {h.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-orange-700 font-extrabold mb-3">
              Fast Onboarding
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Three Simple Steps To Elevate Your Workflow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] relative space-y-4">
              <div className="text-4xl font-black text-orange-600/30">01</div>
              <h4 className="text-xl font-bold text-slate-900">Create or Sign In</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Create your account in seconds using Clerk SSO. One set of credentials unlocks all present and future UV Tech applications.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] relative space-y-4">
              <div className="text-4xl font-black text-amber-600/30">02</div>
              <h4 className="text-xl font-bold text-slate-900">Choose Your Tool</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                From formula lookups to Google Drive storage and password security, click any card to launch immediately with pre-authenticated sessions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] relative space-y-4">
              <div className="text-4xl font-black text-emerald-600/30">03</div>
              <h4 className="text-xl font-bold text-slate-900">Sync & Stay Productive</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Your passwords stay encrypted with AES-256 in your Google Sheets, files stay in your Google Drive, and snippets stay on your Supabase.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Bottom Call-To-Action Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-[#FAEBD7] border border-[#f5e3cc] p-8 sm:p-14 shadow-[12px_12px_24px_#d9cbba,_-12px_-12px_24px_#ffffff] text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FAEBD7] shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] border border-[#f5e3cc] text-orange-600 mx-auto">
              <Layers className="w-8 h-8" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Ready to Upgrade Your Developer Productivity?
            </h3>

            <p className="text-slate-600 max-w-xl mx-auto text-base font-medium leading-relaxed">
              Experience the power of single sign-on with DevSuite. Fast, secure, and thoughtfully crafted by UV Tech.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[4px_4px_12px_rgba(234,88,12,0.35)] hover:from-orange-700 hover:to-amber-700 transition-all"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] transition-all"
              >
                <span>Explore All Features</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Footer Navigation */}
      <Footer />
    </div>
  );
}
