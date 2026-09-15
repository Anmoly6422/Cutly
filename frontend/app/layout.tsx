import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Cutly — Precision URL Shortener",
  description: "Turn long URLs into clean, shareable links. No account. No clutter. Just Cutly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-[#E8B84B] selection:text-[#20241F]`}
    >
      <body className="min-h-full flex flex-col bg-[#1B2B22] text-[#F4F0E6] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
