import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAEBD7] text-slate-800 antialiased selection:bg-orange-200/50 selection:text-orange-950">
      {/* Top Header Navigation */}
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Transparency & Security</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Privacy Policy & Security Standards
          </h1>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            Effective as of 2026 • Published by UV Tech for DevSuite Ecosystem
          </p>
        </div>

        {/* Main Content Card */}
        <div className="rounded-[36px] bg-[#FAEBD7] border border-[#f5e3cc] p-8 sm:p-12 shadow-[12px_12px_24px_#d9cbba,_-12px_-12px_24px_#ffffff] space-y-10">
          
          {/* Executive Summary Callout */}
          <div className="p-6 rounded-2xl bg-[#FAEBD7] border border-orange-200/60 shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] space-y-2">
            <div className="flex items-center gap-2 text-orange-700 font-black text-sm">
              <Lock className="w-4 h-4" />
              <span>Core Security Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              At <strong>UV Tech</strong>, we believe your personal data, credentials, and code belongs exclusively to you. DevSuite is architected around <strong>zero-knowledge client-side encryption</strong> and direct user cloud integration. We never sell your personal data or inspect your encrypted passwords.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">1.</span> Information We Collect
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              When you create an account or interact with DevSuite, we collect minimal information necessary to deliver Single Sign-On and workspace management:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
              <li>
                <strong>Account Credentials:</strong> Handled securely via Clerk SSO (such as email address, full name, and avatar). We never store plaintext passwords on our application servers.
              </li>
              <li>
                <strong>Authentication Tokens:</strong> Temporary cryptographically signed JWT tokens to authorize access across our satellite applications (DevBoard, DevStore, DevPass).
              </li>
              <li>
                <strong>Application Metadata:</strong> Workspace preferences and configuration options to preserve your visual settings.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">2.</span> Zero-Knowledge Architecture (DevPass)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              The DevPass application enforces client-side zero-knowledge security. When you save a password or API credential:
            </p>
            <div className="p-4 rounded-xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs text-slate-700 space-y-2">
              <p>
                <strong>Client-Side Encryption:</strong> All encryption and decryption occurs locally in your browser using AES-256-GCM before any payload is transmitted.
              </p>
              <p>
                <strong>No Server Decryption Keys:</strong> UV Tech servers never receive, possess, or store your master password or encryption key. Even if our servers are compromised, your data remains fully encrypted.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">3.</span> Google Drive & Third-Party APIs (DevStore)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              DevStore uses Google Drive APIs to enable personal file management. Files uploaded through DevStore travel directly to your connected Google Drive storage. UV Tech does not inspect, analyze, or archive your files on our servers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">4.</span> Cookies & Local Storage
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We use strictly necessary cookies and local browser storage to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
              <li>Maintain your authenticated session across DevSuite tools.</li>
              <li>Store your theme preferences and active tab states.</li>
            </ul>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We do not use invasive third-party ad tracking cookies or fingerprinting scripts.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">5.</span> Your Data Rights & Deletion
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              You retain complete ownership over your data at all times:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
              <li><strong>Right to Access:</strong> View all snippets, formulas, and stored entries.</li>
              <li><strong>Right to Erase:</strong> Delete your account and associated records immediately at any time.</li>
              <li><strong>Data Portability:</strong> Export formulas, notes, and cloud files whenever you need.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-orange-600">6.</span> Contact UV Tech
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              If you have any questions about this Privacy Policy or how UV Tech handles your information across DevSuite, please reach out to our privacy and engineering team:
            </p>
            <div className="p-4 rounded-xl bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] text-xs font-semibold text-slate-700 space-y-1">
              <div><strong>Organization:</strong> UV Tech</div>
              <div><strong>Product:</strong> DevSuite Workspace Hub</div>
              <div><strong>Copyright:</strong> &copy; 2026 Powered by UV Tech</div>
              <div><strong>Inquiries:</strong> privacy@uvtech.internal / support@cashms.in</div>
            </div>
          </section>

          {/* Action Button */}
          <div className="pt-6 border-t border-[#ebd3b7] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] hover:text-orange-600 transition-all"
            >
              &larr; Back to Home
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-[4px_4px_12px_rgba(234,88,12,0.3)] hover:from-orange-700 hover:to-amber-700 transition-all"
            >
              Explore Features &rarr;
            </Link>
          </div>

        </div>
      </main>

      {/* Bottom Footer Navigation */}
      <Footer />
    </div>
  );
}
