import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Layers,
  LayoutGrid,
  Database,
  Key,
  Calendar,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Server,
  Terminal,
  FileSpreadsheet
} from "lucide-react";

export default function FeaturesPage() {
  const deepFeatures = [
    {
      id: "launcher",
      icon: Layers,
      title: "Central SSO & Satellite Launcher",
      tagline: "One Login, Unified Workspaces",
      badge: "Architecture",
      description:
        "Engineered with Clerk Single Sign-On and seamless cross-domain token redirection. Users authenticate once on the Hub and are recognized across devboard.cashms.in, devstore.cashms.in, and devpass.cashms.in with zero friction.",
      capabilities: [
        "Cross-domain JWT satellite synchronization",
        "Seamless token refresh and session persistence",
        "Local development auto-port mapping (3001, 3002, 3003)",
        "Instant fallback for public utilities like Day Date System",
      ],
    },
    {
      id: "devboard",
      icon: LayoutGrid,
      title: "DevBoard Knowledge & Formula Catalog",
      tagline: "Your Engineering Memory Bank",
      badge: "Knowledge",
      description:
        "A dedicated space for developers and data professionals to curate, search, and recall complex Excel formulas, IDE keyboard shortcuts, shell commands, and code snippets in milliseconds.",
      capabilities: [
        "Supabase PostgreSQL persistent storage",
        "Fuzzy search filtering across formulas and commands",
        "Categorized cheatsheets for Excel, VS Code, Git, and SQL",
        "One-click copy syntax with argument breakdowns",
      ],
    },
    {
      id: "devstore",
      icon: Database,
      title: "DevStore Google Drive Cloud Storage",
      tagline: "Decentralized Personal Cloud",
      badge: "Storage",
      description:
        "Bypass restrictive storage limitations by integrating directly with your own Google Drive. Manage uploads, specify custom retention schedules, and generate secure shareable download links.",
      capabilities: [
        "Direct Google Drive OAuth2 integration",
        "Configurable retention policies and auto-cleanup",
        "Client-side upload throttling and error resilience",
        "No middleman server file inspection or data hoarding",
      ],
    },
    {
      id: "devpass",
      icon: Key,
      title: "DevPass Zero-Knowledge Password Vault",
      tagline: "Military-Grade Client-Side AES-256",
      badge: "Security",
      description:
        "Your passwords and API secrets are encrypted locally in your browser with AES-256 before any byte is saved. Encrypted records are synchronized directly to your personal Google Sheet.",
      capabilities: [
        "Zero-knowledge architecture: only you hold the decryption key",
        "AES-256-GCM browser encryption standard",
        "Secure Google Sheets database synchronization",
        "Built-in cryptographic password generator with entropy meter",
      ],
    },
    {
      id: "daydate",
      icon: Calendar,
      title: "Day Date Productivity System",
      tagline: "Instant Date & Calendar Operations",
      badge: "Productivity",
      description:
        "A lightweight, zero-login utility built for quick date calculations, project milestone offsets, working day counters, and holiday calendar planning.",
      capabilities: [
        "Fast date difference and elapsed duration math",
        "Business day and holiday offset adjustments",
        "Publicly accessible without authentication requirements",
        "Ultra-responsive mobile friendly interface",
      ],
    },
    {
      id: "design",
      icon: Sparkles,
      title: "Antique Neomorphic Design System",
      tagline: "Crafted For Visual Ergonomics",
      badge: "UI / UX",
      description:
        "Designed using an Antique White palette (#FAEBD7) and tactile soft neumorphism that minimizes ocular strain during extended coding sessions while maintaining a distinctive, premium feel.",
      capabilities: [
        "Dual-shadow lighting vectors for tactile depth",
        "Fluid responsive layouts optimized for all viewport sizes",
        "Smooth micro-interactions powered by Framer Motion",
        "Accessible contrast ratios compliant with modern standards",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAEBD7] text-slate-800 antialiased selection:bg-orange-200/50 selection:text-orange-950">
      {/* Top Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Features Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>DevSuite Capabilities</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Engineered With Purpose,{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Built For Performance
              </span>
            </h1>

            <p className="mt-5 text-lg text-slate-600 font-medium leading-relaxed">
              Explore the rich set of features that power DevSuite by UV Tech. From client-side zero-knowledge encryption to cross-domain single sign-on, discover how our tools work together.
            </p>
          </div>
        </section>

        {/* Deep Dive Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          {deepFeatures.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="rounded-[36px] bg-[#FAEBD7] border border-[#f5e3cc] p-8 sm:p-12 shadow-[12px_12px_24px_#d9cbba,_-12px_-12px_24px_#ffffff] hover:shadow-[16px_16px_32px_#d9cbba,_-16px_-16px_32px_#ffffff] transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                  
                  {/* Left Column */}
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#FAEBD7] shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-orange-600">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200/50">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700 mt-1">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Capabilities Card */}
                  <div className="w-full lg:w-96 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] p-6 shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] space-y-3">
                    <div className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Highlights</span>
                    </div>
                    <ul className="space-y-2.5">
                      {item.capabilities.map((cap, i) => (
                        <li key={i} className="text-xs font-semibold text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-[0.25em] text-orange-700 font-extrabold mb-2">
              Summary Matrix
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              DevSuite Applications At A Glance
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[8px_8px_18px_#d9cbba,_-8px_-8px_18px_#ffffff] p-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#ebd3b7] text-xs font-black text-slate-800 uppercase tracking-wider">
                  <th className="pb-4">Application</th>
                  <th className="pb-4">Core Function</th>
                  <th className="pb-4">Storage Backend</th>
                  <th className="pb-4">Security Level</th>
                  <th className="pb-4">Access Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebd3b7]/60 font-medium text-slate-700">
                <tr>
                  <td className="py-4 font-bold text-orange-700">DevBoard</td>
                  <td className="py-4">Formulas & Shortcuts Catalog</td>
                  <td className="py-4">Supabase PostgreSQL</td>
                  <td className="py-4">Encrypted Transit</td>
                  <td className="py-4 font-semibold text-emerald-700">SSO Authenticated</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-amber-700">DevStore</td>
                  <td className="py-4">Direct Google Drive Sync</td>
                  <td className="py-4">Google Drive OAuth2</td>
                  <td className="py-4">Google IAM & Tokens</td>
                  <td className="py-4 font-semibold text-emerald-700">SSO Authenticated</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-emerald-700">DevPass</td>
                  <td className="py-4">Password & Secrets Vault</td>
                  <td className="py-4">Google Sheets</td>
                  <td className="py-4 font-bold text-emerald-700">AES-256 Zero Knowledge</td>
                  <td className="py-4 font-semibold text-emerald-700">SSO Authenticated</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-blue-700">Day Date System</td>
                  <td className="py-4">Date Math & Calendar Tools</td>
                  <td className="py-4">Client-side runtime</td>
                  <td className="py-4">Public Utility</td>
                  <td className="py-4 font-semibold text-blue-700">Public Free Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="rounded-[32px] bg-[#FAEBD7] border border-[#f5e3cc] p-10 shadow-[10px_10px_20px_#d9cbba,_-10px_-10px_20px_#ffffff] space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Start Using DevSuite Today
            </h3>
            <p className="text-slate-600 max-w-lg mx-auto text-sm font-medium">
              Join thousands of developers streamlining their workflows. Created and maintained by UV Tech.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/auth/sign-up"
                className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[4px_4px_12px_rgba(234,88,12,0.3)] hover:from-orange-700 hover:to-amber-700 transition-all"
              >
                Create Account
              </Link>
              <Link
                href="/"
                className="px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] transition-all"
              >
                Back to Home
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
