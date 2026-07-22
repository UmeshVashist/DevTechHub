"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-[#FAEBD7] overflow-hidden">
      {/* Decorative Neomorphic Background Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#FAEBD7] rounded-full shadow-[16px_16px_32px_#d9cbba,_-16px_-16px_32px_#ffffff]" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FAEBD7] rounded-full shadow-[20px_20px_40px_#d9cbba,_-20px_-20px_40px_#ffffff]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Join DevSuite
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            Create an account to access all workspaces.
          </p>
        </div> */}

        <SignUp
          path="/auth/sign-up"
          routing="path"
          signInUrl="/auth/login"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: "bg-[#FAEBD7] border border-[#f5e3cc] shadow-[12px_12px_24px_#d9cbba,_-12px_-12px_24px_#ffffff] rounded-[28px] p-6",
              headerTitle: "text-slate-800 font-bold text-2xl",
              headerSubtitle: "text-slate-500",
              socialButtonsBlockButton: "bg-[#FAEBD7] hover:bg-[#f3dfc6] text-slate-800 border-0 shadow-[4px_4px_8px_#d9cbba,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d9cbba,_-2px_-2px_4px_#ffffff] transition-all duration-200",
              socialButtonsBlockButtonText: "text-slate-700 font-medium",
              formButtonPrimary: "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold border-0 shadow-[4px_4px_12px_rgba(249,115,22,0.2)] hover:shadow-none transition-all duration-200",
              footerActionLink: "text-orange-600 hover:text-orange-700",
              dividerLine: "bg-[#d9cbba]",
              dividerText: "text-slate-500 bg-[#FAEBD7] px-2",
              formFieldLabel: "text-slate-700 font-medium text-xs mb-1",
              formFieldInput: "bg-[#FAEBD7] border border-[#f3dfc6] rounded-xl px-4 py-2.5 focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/30 text-slate-800 shadow-[inset_2px_2px_5px_#d9cbba,_inset_-2px_-2px_5px_#ffffff] transition-all",
            },
          } as any}
        />
      </motion.div>
    </div>
  )
}
