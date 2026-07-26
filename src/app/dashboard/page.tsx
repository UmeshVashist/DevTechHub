import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import { AppLauncher } from "@/components/AppLauncher";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "Developer";

  const devboardUrl = process.env.NEXT_PUBLIC_DEVBOARD_URL || "http://localhost:3001";
  const devstoreUrl = process.env.NEXT_PUBLIC_DEVSTORE_URL || "http://localhost:3002";
  const devpassUrl = process.env.NEXT_PUBLIC_DEVPASS_URL || "http://localhost:3003";

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-[#FAEBD7] text-slate-800 overflow-hidden px-6 py-10 md:px-16">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-200/25 rounded-full blur-[120px] pointer-events-none" />

      <header className="w-full flex items-center justify-between z-10 border-b border-[#f3dfc6]/80 pb-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FAEBD7] border border-[#f5e3cc] flex items-center justify-center shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff]">
            <Layers className="w-5 h-5 text-orange-600 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
              DevSuite
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#FAEBD7] border border-[#f5e3cc] rounded-full px-5 py-2.5 shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff]">
          <span className="text-sm font-semibold text-slate-700">
            {firstName}
          </span>
          <div className="border-l border-[#d9cbba] h-5 pl-2">
            <UserButton />
          </div>
        </div>
      </header>

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center z-10 space-y-12">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.25em] text-orange-600 font-extrabold">
            Central Application Hub
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">DevSuite Workspace</span>
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg font-medium leading-relaxed">
            Access your unified development tools and databases. Select an environment below to jump directly into your work without logging in again — single sign-on handles it seamlessly.
          </p>
        </div>

        <AppLauncher urls={{
          devboard: devboardUrl,
          devstore: devstoreUrl,
          devpass: devpassUrl,
        }} />
      </div>

      <footer className="w-full text-center py-8 text-xs text-slate-500 z-10 border-t border-[#f3dfc6]/80 mt-16">
        &copy; {new Date().getFullYear()} DevSuite Hub. Powered by Clerk SSO Authentication.
      </footer>
    </main>
  );
}
