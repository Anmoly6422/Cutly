import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090A0F] py-12 px-6 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <span className="font-extrabold text-sm text-white">
            CUTLY<span className="text-emerald-400">.</span>
          </span>
          <span className="text-slate-500">— Modern URL Shortener & Analytics</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-slate-500">© 2026 Cutly Project</span>
          <a
            href="https://github.com/anmoly6422"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
