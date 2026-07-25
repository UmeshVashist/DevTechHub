import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTech App Hub",
  description: "Central launch hub for DevSuite applications",
  icons: {
    icon: "https://jxechgirxrbrblyrrqmt.supabase.co/storage/v1/object/public/images/bb5b5ced-6b47-425c-aad2-065017342a96/1784716404934-network.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/auth/login"
      allowedRedirectOrigins={[
        "https://devboard.cashms.in",
        "https://devstore.cashms.in",
        "https://devpass.cashms.in",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
      ]}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full bg-[#FAEBD7] text-slate-800 antialiased font-sans selection:bg-orange-200/50 selection:text-orange-950">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
