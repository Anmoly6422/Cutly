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

  function handleLinkCreated(newItem: LinkHistoryItem) {
    setHistory((prev) => {
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

  function handleClearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear history:", e);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1B2B22] text-[#F4F0E6] selection:bg-[#E8B84B] selection:text-[#20241F]">
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <Navbar historyCount={history.length} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section: --bg-base with cutting mat grid */}
          <Hero />

          {/* Shortener Card */}
          <UrlShortener onLinkCreated={handleLinkCreated} />

          {/* History Drawer */}
          <RecentLinks
            history={history}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveItem}
          />

          {/* Process Section: --bg-lift background */}
          <HowItWorks />

          {/* Features Section: --bg-base background */}
          <Statement />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}