import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(127,168,140,0.2)] bg-[#1B2B22] py-10 px-4 sm:px-6 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA396]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-[4px] bg-[#16221B] border border-[#8FA396]/20 flex items-center justify-center text-[#E8B84B]">
            <Scissors className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-sm text-[#F4F0E6]">
            Cutly<span className="text-[#E8B84B]">.</span>
          </span>
          <span className="text-[#8FA396]">— A simple URL shortener.</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© 2026 Cutly</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4F0E6] transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
