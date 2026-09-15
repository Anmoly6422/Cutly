"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UrlShortener from "@/components/UrlShortener";
import RecentLinks, { LinkHistoryItem } from "@/components/RecentLinks";
import HowItWorks from "@/components/HowItWorks";
import Statement from "@/components/Statement";
import Footer from "@/components/Footer";

const STORAGE_KEY = "cutly_link_history_v1";

export default function Home() {
  const [history, setHistory] = useState<LinkHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load link history:", e);
    }
  }, []);

  // Save link to history
  function handleLinkCreated(newItem: LinkHistoryItem) {
    setHistory((prev) => {
      // Filter out duplicate IDs if any
      const filtered = prev.filter((item) => item.id !== newItem.id);
      const updated = [newItem, ...filtered];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history:", e);
      }
      return updated;
    });
  }

  // Remove single item
  function handleRemoveItem(id: string) {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update history:", e);
      }
      return updated;
    });
  }

  // Clear all history
  function handleClearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear history:", e);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#090A0F] text-white selection:bg-emerald-500 selection:text-[#090A0F]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <Navbar historyCount={history.length} />

        {/* Main Content */}
        <main className="flex-1">
          <Hero />

          <UrlShortener onLinkCreated={handleLinkCreated} />

          <RecentLinks
            history={history}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveItem}
          />

          <HowItWorks />

          <Statement />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}