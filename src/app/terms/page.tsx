import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FileText,
  ShieldCheck,
  Lock,
  Layers,
  Database,
  Key,
  Calendar,
  AlertTriangle,
  Sparkles,
  Scale,
  UserCheck,
  Cloud,
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "suite-apps", label: "2. Suite Applications & Features" },
    { id: "authentication", label: "3. User Accounts & SSO Security" },
    { id: "zero-knowledge", label: "4. Zero-Knowledge & Data Privacy" },
    { id: "third-party", label: "5. Google Drive & Third-Party APIs" },
    { id: "acceptable-use", label: "6. Acceptable Use Policy" },
    { id: "intellectual-property", label: "7. Intellectual Property" },
    { id: "liability", label: "8. Disclaimer & Liability" },
    { id: "termination", label: "9. Termination & Account Deletion" },
    { id: "contact", label: "10. Modifications & Contact Info" },
  ];

  const appRules = [
    {
      app: "DevBoard",
      icon: Layers,
      badge: "Formula & Code Catalog",
      termsSummary: "Users may store, search, and organize code snippets, Excel formulas, and keyboard shortcuts. Content stored in the Supabase database must not contain copyrighted materials without authorization or illegal payloads.",
    },
    {
      app: "DevStore",
      icon: Database,
      badge: "Google Drive Cloud Storage",
      termsSummary: "Interacts directly with your personal Google Drive storage via OAuth2. UV Tech never inspects or sells your files. You are responsible for ensuring that uploaded content complies with Google Cloud terms of service.",
    },
    {
      app: "DevPass",
      icon: Key,
      badge: "AES-256 Zero-Knowledge Vault",
      termsSummary: "All encryption and decryption occurs exclusively in your browser using AES-256-GCM. UV Tech has no access to your master password and cannot recover lost master keys or decrypt your vault entries.",
    },
    {
      app: "Day Date System",
      icon: Calendar,
      badge: "Public Calendar Utility",
      termsSummary: "Provided as a free public utility for date calculations, milestone offsets, and work schedule planning. Provided as-is without requiring sign-in or collecting private credentials.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAEBD7] text-slate-800 antialiased selection:bg-orange-200/50 selection:text-orange-950">
      {/* Top Header Navigation */}
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs font-extrabold uppercase tracking-widest text-orange-700">
            <Scale className="w-4 h-4 text-orange-600" />
            <span>Legal Agreement & Terms of Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Terms and{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Effective Date: <strong>January 1, 2026</strong> • Published by <strong>UV Tech</strong> for all <strong>DevSuite</strong> applications and services.
          </p>

          {/* Quick Notice Tagline */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <span className="px-3 py-1 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff]">
              Covers Central Hub
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff]">
              DevBoard
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff]">
              DevStore
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff]">
              DevPass
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff]">
              Day Date
            </span>
          </div>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAEBD7] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-orange-600">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Unified SSO</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Single authentication through Clerk connects you to all authorized tools safely.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAEBD7] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-emerald-600">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Zero-Knowledge</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Passwords encrypted locally with AES-256 before transit. You alone hold the decryption keys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAEBD7] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-amber-600">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Your Storage</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Files link directly with your personal Google Drive and Sheets. UV Tech never hoards your files.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[6px_6px_12px_#d9cbba,_-6px_-6px_12px_#ffffff] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAEBD7] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] border border-[#f5e3cc] flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Full Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Transparent, ad-free platform prioritizing developer productivity and data confidentiality.
            </p>
          </div>
        </div>

        {/* Quick Table of Contents Navigation */}
        <div className="rounded-3xl bg-[#FAEBD7] border border-[#f5e3cc] p-6 shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-700 tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Table of Contents</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[2px_2px_4px_#d9cbba,_-2px_-2px_4px_#ffffff] hover:text-orange-600 hover:shadow-[inset_1px_1px_2px_#d9cbba,_inset_-1px_-1px_2px_#ffffff] transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Terms Document Body */}
        <div className="rounded-[36px] bg-[#FAEBD7] border border-[#f5e3cc] p-8 sm:p-12 shadow-[12px_12px_24px_#d9cbba,_-12px_-12px_24px_#ffffff] space-y-12">
          
          {/* Executive Overview Box */}
          <div className="p-6 rounded-2xl bg-[#FAEBD7] border border-orange-200/60 shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] space-y-3">
            <div className="flex items-center gap-2 text-orange-700 font-black text-sm">
              <FileText className="w-4 h-4" />
              <span>Please Read Carefully</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and <strong>UV Tech</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your access to and use of the <strong>DevSuite</strong> platform, the Central Application Launcher, DevBoard, DevStore, DevPass, Day Date System, and any related web services, APIs, or software.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              By accessing, registering for, or using any part of DevSuite, you acknowledge that you have read, understood, and agree to be bound by these Terms and our{" "}
              <Link href="/privacy" className="text-orange-600 underline font-bold hover:text-orange-700">
                Privacy Policy
              </Link>
              . If you do not agree to these Terms, you must immediately discontinue use of all DevSuite services.
            </p>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Acceptance of Terms &amp; Eligibility
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>1.1 Age &amp; Capacity:</strong> To use DevSuite, you represent and warrant that you are at least 18 years of age (or the legal age of majority in your jurisdiction) and possess the legal capacity to enter into binding agreements. If you are using DevSuite on behalf of an entity, company, or organization, you represent that you have the authority to bind that entity to these Terms.
              </p>
              <p>
                <strong>1.2 Requisite Accounts:</strong> Certain features require authenticating through third-party services such as Clerk SSO or Google OAuth. You agree to maintain the confidentiality of your credentials and are fully responsible for all activities that occur under your account.
              </p>
              <p>
                <strong>1.3 Jurisdictional Compliance:</strong> You are responsible for ensuring that your access to DevSuite complies with all local laws, regulations, and statutes applicable in your jurisdiction.
              </p>
            </div>
          </section>

          {/* Section 2: Suite Applications & Feature Usage */}
          <section id="suite-apps" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Suite Applications &amp; Features
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                DevSuite brings together four specialized tools under a single launcher hub. Your use of each individual tool is governed by specific rules and technical requirements:
              </p>

              {/* App breakdown cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {appRules.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.app}
                      className="p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-orange-600" />
                        <h4 className="font-black text-slate-900 text-sm">{app.app}</h4>
                        <span className="text-[10px] uppercase font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full ml-auto">
                          {app.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {app.termsSummary}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-[#FAEBD7] border border-amber-200/80 shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs text-slate-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Feature Availability:</strong> UV Tech continuously improves DevSuite. We reserve the right to deploy new tools, release updates, or modify feature parameters to improve performance, maintain security, or meet operational requirements.
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: User Accounts & SSO Security */}
          <section id="authentication" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                User Accounts &amp; SSO Security
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>3.1 Single Sign-On (SSO):</strong> Authentication across DevSuite is managed through Clerk SSO. By logging in, you authorize UV Tech to issue cryptographically signed session tokens that allow secure cross-domain redirection between the central launcher and satellite web applications (e.g., devboard.cashms.in, devstore.cashms.in, devpass.cashms.in).
              </p>
              <p>
                <strong>3.2 Account Security:</strong> You are responsible for safeguarding your login credentials and enabling multi-factor authentication where available. You must immediately notify UV Tech if you suspect unauthorized access or compromise of your account.
              </p>
              <p>
                <strong>3.3 Accurate Information:</strong> You agree to provide accurate, truthful, and up-to-date information during account creation. Creating accounts using automated bots or fraudulent identities is strictly prohibited.
              </p>
            </div>
          </section>

          {/* Section 4: Zero-Knowledge & Data Privacy */}
          <section id="zero-knowledge" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Zero-Knowledge Cryptography &amp; Data Privacy
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>4.1 Zero-Knowledge Standard:</strong> In DevPass, data security is governed by a client-side zero-knowledge architecture. Encryption and decryption occur entirely within your client browser using AES-256-GCM. <strong>UV Tech servers never store, receive, or hold your master password or plaintext records.</strong>
              </p>
              
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/60 shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs text-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-red-700">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>CRITICAL NOTICE: Master Key Custody</span>
                </div>
                <p>
                  Because DevPass uses zero-knowledge cryptography, <strong>UV Tech has no technical means to recover, reset, or decrypt your data if you lose your master password or encryption key.</strong> You are exclusively responsible for creating and maintaining offline backups of your master password.
                </p>
              </div>

              <p>
                <strong>4.2 Privacy Policy Incorporation:</strong> Our collection, use, and handling of user metadata and telemetry is detailed in the{" "}
                <Link href="/privacy" className="text-orange-600 font-bold hover:underline">
                  DevSuite Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            </div>
          </section>

          {/* Section 5: Third-Party APIs & Google Drive */}
          <section id="third-party" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Google Drive &amp; Third-Party APIs (DevStore &amp; DevPass)
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>5.1 Google Cloud Platform &amp; Drive APIs:</strong> DevStore and DevPass integrate directly with Google APIs (Google Drive, Google Sheets) using OAuth2 scopes granted by you during authorization. Files and encrypted spreadsheet rows reside in your personal Google account.
              </p>
              <p>
                <strong>5.2 Compliance with Google API Policies:</strong> UV Tech&apos;s use of information received from Google APIs adheres to the{" "}
                <span className="font-semibold text-slate-800">Google API Services User Data Policy</span>, including the Limited Use requirements. UV Tech does not inspect, parse, or archive your files on our servers.
              </p>
              <p>
                <strong>5.3 Third-Party Outages:</strong> UV Tech is not responsible for interruptions, storage quotas, rate limits, or downtime caused by Google Cloud, Supabase, Clerk, or your internet service provider.
              </p>
            </div>
          </section>

          {/* Section 6: Acceptable Use Policy */}
          <section id="acceptable-use" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Acceptable Use Policy (AUP)
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>When using DevSuite, you strictly agree <strong>NOT</strong> to:</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>Reverse engineer, decompile, disassemble, or derive the source code of any proprietary backend components of DevSuite.</li>
                <li>Distribute computer viruses, ransomware, trojans, worms, or other malicious software payloads via DevStore or DevBoard.</li>
                <li>Conduct unauthorized vulnerability scans, automated stress testing, or denial-of-service (DoS/DDoS) attacks against DevSuite or affiliated domain infrastructure.</li>
                <li>Use automated bots, scrapers, or spiders to harvest user information, database entries, or proprietary formula dictionaries.</li>
                <li>Circumvent or tamper with authentication tokens, cross-domain redirection protocols, or rate limits.</li>
                <li>Use DevSuite for any illegal activities under applicable municipal, state, national, or international statutes.</li>
              </ul>
              <p>
                Violation of this Acceptable Use Policy may result in immediate suspension or permanent termination of your account, revocation of SSO tokens, and potential civil or criminal liability.
              </p>
            </div>
          </section>

          {/* Section 7: Intellectual Property Rights */}
          <section id="intellectual-property" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Intellectual Property &amp; User Content
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>7.1 UV Tech Platform Rights:</strong> All software, neomorphic interface designs, source code, logos, trademarks, and service marks related to DevSuite are the exclusive intellectual property of <strong>UV Tech</strong> (&copy; 2026 Powered by UV Tech). All rights not expressly granted herein are reserved.
              </p>
              <p>
                <strong>7.2 User Content Ownership:</strong> You retain complete ownership, copyright, and intellectual property rights over all formulas, code snippets, notes, documents, and credentials that you create, upload, or store across DevSuite tools. By saving content, you grant UV Tech only the minimal technical license necessary to host, store, and display your data back to you.
              </p>
              <p>
                <strong>7.3 Feedback &amp; Suggestions:</strong> Any feedback, suggestions, or ideas submitted regarding DevSuite improvements may be incorporated by UV Tech into future platform releases without payment, compensation, or attribution obligation to you.
              </p>
            </div>
          </section>

          {/* Section 8: Disclaimer of Warranties & Limitation of Liability */}
          <section id="liability" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Disclaimer of Warranties &amp; Limitation of Liability
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>8.1 &quot;AS IS&quot; Provision:</strong> DEVSUITE AND ALL INTEGRATED TOOLS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED AVAILABILITY.
              </p>
              <p>
                <strong>8.2 Limitation of Damages:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL UV TECH, ITS DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>Your access to, use of, or inability to access or use DevSuite;</li>
                <li>Loss of passwords, API keys, or data resulting from lost master encryption keys or hardware failures;</li>
                <li>Unauthorized access, alteration, or transmission of your content by third parties outside UV Tech&apos;s direct control;</li>
                <li>Downtime, data corruption, or policy enforcement on external platforms like Google Drive or Supabase.</li>
              </ul>
            </div>
          </section>

          {/* Section 9: Termination & Account Deletion */}
          <section id="termination" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Account Termination &amp; Data Deletion
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>9.1 Voluntary Closure:</strong> You may discontinue using DevSuite at any time and request full deletion of your Clerk profile and associated database entries through your account settings or by contacting our support team.
              </p>
              <p>
                <strong>9.2 Termination by UV Tech:</strong> We reserve the right to suspend or terminate your account immediately, without prior notice or liability, if you violate any provision of these Terms or engage in conduct harmful to the platform or other users.
              </p>
              <p>
                <strong>9.3 Effect of Termination:</strong> Upon termination, your right to use DevSuite will immediately cease. Sections regarding Intellectual Property, Disclaimer of Warranties, Limitation of Liability, and Governing Law shall survive termination.
              </p>
            </div>
          </section>

          {/* Section 10: Modifications to Terms & Contact Info */}
          <section id="contact" className="space-y-4 pt-4 border-t border-[#ebd3b7]/60">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 font-black flex items-center justify-center text-sm border border-orange-200">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Modifications to Terms &amp; Contact Information
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-11">
              <p>
                <strong>10.1 Updates to Terms:</strong> We may update these Terms periodically to reflect changes in our technology, regulatory compliance, or operational requirements. We will notify you of material changes by updating the &quot;Effective Date&quot; at the top of this page or by displaying a banner on the central launcher hub.
              </p>
              <p>
                <strong>10.2 Continued Acceptance:</strong> Your continued use of DevSuite after revised Terms have been published constitutes your binding acceptance of the changes.
              </p>
              <p>
                <strong>10.3 Legal &amp; Support Inquiries:</strong> If you have questions, feedback, or legal inquiries regarding these Terms and Conditions, please contact UV Tech:
              </p>
              
              <div className="mt-4 p-5 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] text-xs font-semibold text-slate-700 space-y-1.5">
                <div><strong>Entity:</strong> UV Tech Legal &amp; Compliance Team</div>
                <div><strong>Suite:</strong> DevSuite Developer Workspaces</div>
                <div><strong>Primary Email:</strong> legal@uvtech.internal</div>
                <div><strong>Support Portal:</strong> support@cashms.in</div>
                <div><strong>Effective Year:</strong> &copy; 2026 Powered by UV Tech. All rights reserved.</div>
              </div>
            </div>
          </section>

          {/* Bottom Navigation CTA */}
          <div className="pt-8 border-t border-[#ebd3b7] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] hover:text-orange-600 transition-all"
            >
              &larr; Back to Home
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] hover:text-orange-600 transition-all"
              >
                Privacy Policy &rarr;
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[4px_4px_12px_rgba(234,88,12,0.3)] hover:from-orange-700 hover:to-amber-700 transition-all"
              >
                <span>Explore Features</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Footer Navigation */}
      <Footer />
    </div>
  );
}
