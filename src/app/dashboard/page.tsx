import { currentUser } from "@clerk/nextjs/server";
import { AppLauncher } from "@/components/AppLauncher";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMaintenanceState } from "@/lib/maintenance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const maintenance = await getMaintenanceState();
  if (maintenance.isMaintenance) {
    redirect("/maintenance");
  }

  const user = await currentUser();
  const firstName =
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Developer";

  const devboardUrl = process.env.NEXT_PUBLIC_DEVBOARD_URL || "http://localhost:3001";
  const devstoreUrl = process.env.NEXT_PUBLIC_DEVSTORE_URL || "http://localhost:3002";
  const devpassUrl = process.env.NEXT_PUBLIC_DEVPASS_URL || "http://localhost:3003";
  const daydateUrl = process.env.NEXT_PUBLIC_DAYDATE_URL || "https://day-date.vercel.app/";

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#FAEBD7] text-slate-800 selection:bg-orange-200/50 selection:text-orange-950">
      {/* Shared Header Navigation with Home, Features, Privacy Policy, Dashboard, Login/Signup */}
      <Navbar />

      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-12 py-10 max-w-7xl w-full mx-auto relative z-10 space-y-10">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[45%] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[45%] h-[45%] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Dashboard Title & Welcome */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAEBD7] border border-[#f5e3cc] shadow-[inset_1px_1px_3px_#d9cbba,_inset_-1px_-1px_3px_#ffffff] text-xs font-extrabold uppercase tracking-widest text-orange-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Welcome Back, {firstName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Central Application{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Launchpad
            </span>
          </h1>

          <p className="text-slate-600 max-w-2xl text-base font-medium leading-relaxed">
            Access all your unified development tools and encrypted databases. Select an application below to jump directly into your work with Single Sign-On.
          </p>
        </div>

        {/* Application Launcher Grid */}
        <div className="flex-1">
          <AppLauncher
            urls={{
              devboard: devboardUrl,
              devstore: devstoreUrl,
              devpass: devpassUrl,
              daydate: daydateUrl,
            }}
          />
        </div>
      </main>

      {/* Shared Footer Navigation with page links & © 2026 Powered by UV Tech */}
      <Footer />
    </div>
  );
}
