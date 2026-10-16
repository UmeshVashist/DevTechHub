'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Layers, Menu, X, ArrowRight, LogIn, UserPlus, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAEBD7]/85 border-b border-[#f0dac0]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Switches to Home Page on click */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            title="DevSuite Home - Powered by UV Tech"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] flex items-center justify-center shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] group-hover:shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] transition-all duration-300">
              <Layers className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                DevSuite
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                by UV Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Home, Features, Privacy Policy, Dashboard) */}
          <nav className="hidden md:flex items-center gap-2 bg-[#FAEBD7] border border-[#f5e3cc] px-3 py-1.5 rounded-full shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[2px_2px_6px_rgba(234,88,12,0.35)]"
                      : "text-slate-700 hover:text-orange-600 hover:bg-[#f5e3cc]/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons (Login & Sign Up when logged out, Dashboard + Profile when logged in) */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoaded && isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold text-orange-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Launch Hub</span>
                </Link>
                <div className="bg-[#FAEBD7] border border-[#f5e3cc] p-1 rounded-full shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] flex items-center justify-center">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] hover:text-orange-600 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4 text-orange-600" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff] hover:text-orange-600 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4 text-orange-600" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {isLoaded && isSignedIn && (
              <div className="bg-[#FAEBD7] border border-[#f5e3cc] p-1 rounded-full shadow-[3px_3px_6px_#d9cbba,_-3px_-3px_6px_#ffffff]">
                <UserButton />
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#FAEBD7] border border-[#f5e3cc] text-slate-700 shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#d9cbba,_inset_-2px_-2px_4px_#ffffff]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#f0dac0] bg-[#FAEBD7] px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
                      : "text-slate-800 hover:bg-[#f5e3cc]/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#f0dac0]/80 flex flex-col gap-2">
            {isLoaded && isSignedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-orange-700 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff]"
              >
                Open Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff]"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:text-orange-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
