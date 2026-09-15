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
  title: "Cutly — Premium URL Shortener & Analytics",
  description: "Turn long URLs into clean, trackable short links. Fast, secure, and beautiful.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased selection:bg-[#10B981] selection:text-[#090A0F]`}
    >
      <body className="min-h-full flex flex-col bg-[#090A0F] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
