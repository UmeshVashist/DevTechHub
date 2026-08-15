'use client';

import { useState } from "react";
import { LayoutGrid, Database, ArrowRight, Key, Calendar, Loader2 } from "lucide-react";

const APP_CONFIG = {
  devboard: {
    name: "DevBoard",
    icon: LayoutGrid,
    color: "text-orange-600",
    envKey: "NEXT_PUBLIC_DEVBOARD_URL",
    fallbackUrl: "http://localhost:3001",
    description: "Excel & Data Knowledge Board. Save, catalog, and query formulas, keyboard shortcuts, snippets, and notes in a unified glassy workspace.",
    tags: ["Supabase DB", "Formula Catalog", "Keyboard Shortcuts"],
    isPublic: false,
  },
  devstore: {
    name: "DevStore",
    icon: Database,
    color: "text-orange-600",
    envKey: "NEXT_PUBLIC_DEVSTORE_URL",
    fallbackUrl: "http://localhost:3002",
    description: "Google Drive Cloud Storage. Direct sync to your drive, custom upload limits, connection setup, retention configurations, and secure cloud sharing.",
    tags: ["Google Drive API", "OAuth Integration", "Retention Policy"],
    isPublic: false,
  },
  devpass: {
    name: "DevPass",
    icon: Key,
    color: "text-orange-600",
    envKey: "NEXT_PUBLIC_DEVPASS_URL",
    fallbackUrl: "http://localhost:3003",
    description: "Secure Glassmorphic Password Manager. Encrypt and manage passwords locally with AES-256 and store them securely in your Google Sheets database.",
    tags: ["AES-256", "Google Sheets", "Zero-Knowledge"],
    isPublic: false,
  },
  daydate: {
    name: "Day Date System",
    icon: Calendar,
    color: "text-orange-600",
    envKey: "NEXT_PUBLIC_DAYDATE_URL",
    fallbackUrl: "https://day-date.vercel.app/",
    description: "Public Day & Date System. Quick access date calculations, scheduling, and calendar utilities without login requirement.",
    tags: ["Public App", "No Login Needed", "Date & Calendar"],
    isPublic: true,
  },
} as const;

type AppId = keyof typeof APP_CONFIG;

interface AppCardProps {
  appId: AppId;
  appUrl: string;
}

function AppCard({ appId, appUrl }: AppCardProps) {
  const [launching, setLaunching] = useState(false);
  const config = APP_CONFIG[appId];
  const Icon = config.icon;

  const handleLaunch = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (config.isPublic) {
      window.open(appUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setLaunching(true);

    try {
      const res = await fetch(`/api/launch?app=${appId}`);
      if (!res.ok) {
        window.location.href = "/auth/login";
        return;
      }
      const data = await res.json();
      if (data.authenticated && data.redirectUrl) {
        window.open(data.redirectUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      window.open(appUrl, "_blank", "noopener,noreferrer");
    } finally {
      setLaunching(false);
    }
  };

  return (
    <button
      onClick={handleLaunch}
      className="group relative rounded-[36px] border border-[#f5e3cc] bg-[#FAEBD7] p-8 md:p-10 shadow-[10px_10px_20px_#d9cbba,_-10px_-10px_20px_#ffffff] transition-all duration-500 hover:-translate-y-2 hover:shadow-[14px_14px_28px_#d9cbba,_-14px_-14px_28px_#ffffff] hover:border-orange-400/40 overflow-hidden w-full text-left cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      disabled={launching}
    >
      <div className="relative space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FAEBD7] shadow-[inset_3px_3px_6px_#d9cbba,_inset_-3px_-3px_6px_#ffffff] border border-[#f5e3cc]/50 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-all duration-300">
          <Icon className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
            {config.name}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm font-medium">
            {config.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {config.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-slate-600 font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center gap-2 text-orange-600 text-sm font-extrabold bg-[#FAEBD7] border border-[#f5e3cc] px-6 py-3 rounded-2xl shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] group-hover:shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] transition-all duration-300">
            {launching ? (
              <>
                <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                Launching...
              </>
            ) : (
              <>
                Launch {config.name}
                <ArrowRight className="w-4 h-4 text-orange-500 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

interface AppLauncherProps {
  urls: {
    devboard: string;
    devstore: string;
    devpass: string;
    daydate: string;
  };
}

export function AppLauncher({ urls }: AppLauncherProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
      <AppCard appId="devboard" appUrl={urls.devboard} />
      <AppCard appId="devstore" appUrl={urls.devstore} />
      <AppCard appId="devpass" appUrl={urls.devpass} />
      <AppCard appId="daydate" appUrl={urls.daydate} />
    </div>
  );
}
