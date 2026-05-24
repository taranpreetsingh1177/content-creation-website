import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { CopyEmailHandler } from "@/components/copy-email-handler";
import { ToastNotification } from "@/components/toast-notification";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.bio.specialty,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-zinc-100">
        <CopyEmailHandler email={siteConfig.email} />
        <ToastNotification />
        <div className="flex min-h-full flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
