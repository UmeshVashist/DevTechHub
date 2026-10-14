'use client';

import Link from "next/link";
import { Layers, ShieldCheck, Heart, Sparkles, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = 2026; // Exact year requested by user

  return (
    <footer className="w-full bg-[#FAEBD7] border-t border-[#f0dac0]/80 pt-16 pb-12 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#ebd3b7]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] flex items-center justify-center shadow-[3px_3px_6px_#d9cbba,_-3px_-3px_6px_#ffffff] group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  DevSuite
                </span>
                <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
                  Powered by UV Tech
                </span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm max-w-md leading-relaxed font-medium">
              The unified developer productivity suite uniting Excel & formula knowledge boards, Google Drive cloud file management, client-side zero-knowledge password vaults, and calendar utilities under a single sign-on.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise Grade SSO & Client-Side Encryption</span>
            </div>
          </div>

          {/* Quick Page Navigation (Top Header & Footer requested) */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  href="/"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>App Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-up"
                  className="text-slate-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Create Account</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrated Apps */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
              Suite Applications
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-700">
              <li className="flex items-center justify-between">
                <span className="hover:text-orange-600 transition-colors cursor-pointer">DevBoard</span>
                <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-100/70 px-2 py-0.5 rounded-full">Database</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="hover:text-orange-600 transition-colors cursor-pointer">DevStore</span>
                <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">Drive API</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="hover:text-orange-600 transition-colors cursor-pointer">DevPass</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">AES-256</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Day Date System</span>
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">Public</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with exact required copyright & powered by UV Tech */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-slate-800 font-bold">
              &copy; 2026 Powered by UV Tech
            </span>
            <span className="hidden md:inline text-slate-500">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link href="/features" className="hover:text-orange-600 transition-colors">
              Features
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/auth/login" className="hover:text-orange-600 transition-colors">
              Login
            </Link>
            <span>•</span>
            <Link href="/auth/sign-up" className="hover:text-orange-600 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
