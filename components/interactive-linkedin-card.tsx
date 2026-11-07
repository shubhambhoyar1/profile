"use client";

import { useState } from "react";
import { Linkedin, Check, Copy, ExternalLink, Sparkles, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LINKS } from "@/constants/links";

interface InteractiveLinkedInCardProps {
  className?: string;
  variant?: "hero" | "compact" | "contact";
}

export function InteractiveLinkedInCard({ className = "", variant = "hero" }: InteractiveLinkedInCardProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(LINKS.LINKEDIN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = LINKS.LINKEDIN;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-sky-500/20 ${className}`}
        onClick={() => window.open(LINKS.LINKEDIN, "_blank", "noopener,noreferrer")}
      >
        <Linkedin className="h-4 w-4 text-[#0A66C2] fill-current" />
        <span className="text-xs font-medium">linkedin.com/in/shubham-bhoyar</span>
        <button
          onClick={handleCopy}
          title="Copy LinkedIn URL"
          className="ml-1 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 opacity-70 hover:opacity-100" />}
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group rounded-2xl p-6 border transition-all duration-500 overflow-hidden ${
        hovered
          ? "border-[#0A66C2]/60 bg-gradient-to-br from-card via-[#0A66C2]/5 to-card shadow-xl shadow-[#0A66C2]/15 -translate-y-1"
          : "border-border/60 bg-card/60 backdrop-blur-md shadow-lg"
      } ${className}`}
    >
      {/* Decorative gradient glow */}
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#0A66C2]/20 blur-3xl pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-30"
        }`}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left side: Avatar & Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#0A66C2]/40 bg-muted shrink-0 shadow-md">
              <img
                src="/Profile.png"
                alt="Shubham Bhoyar"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes("Profile.png")) {
                    target.src = "/profile.jpg";
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            {/* LinkedIn Badge overlay on Avatar */}
            <div className="absolute -bottom-1 -right-1 bg-[#0A66C2] text-white p-1 rounded-lg shadow-sm">
              <Linkedin className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                Shubham Bhoyar
                <ShieldCheck className="h-4 w-4 text-[#0A66C2]" />
              </h3>
              <Badge
                variant="outline"
                className="text-[11px] font-normal border-emerald-500/40 text-emerald-500 bg-emerald-500/10 flex items-center gap-1 py-0 px-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Opportunities
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Full Stack Developer (Node.js, React.js) • Leadows Technologies
            </p>
            <p className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
              <span>Nagpur, Maharashtra, India</span>
              <span>•</span>
              <span className="text-[#0A66C2] font-mono">500+ Connections</span>
            </p>
          </div>
        </div>

        {/* Right side: Interactive Actions & URL */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2.5">
          {/* Interactive URL Badge */}
          <div
            onClick={handleCopy}
            className="group/copy flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border/60 hover:border-[#0A66C2]/40 cursor-pointer transition-all duration-200 text-xs font-mono"
            title="Click to copy full LinkedIn URL"
          >
            <span className="text-muted-foreground group-hover/copy:text-foreground truncate max-w-[210px]">
              in/shubham-bhoyar-522a0b218
            </span>
            <div className="shrink-0 flex items-center gap-1 text-[#0A66C2]">
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[11px] text-emerald-500 font-sans font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 opacity-70 group-hover/copy:opacity-100" />
                  <span className="text-[11px] opacity-70 group-hover/copy:opacity-100 font-sans">Copy</span>
                </>
              )}
            </div>
          </div>

          {/* Connect / Visit Button */}
          <Button
            asChild
            className="bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md hover:shadow-lg hover:shadow-[#0A66C2]/25 transition-all duration-300"
          >
            <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span>Connect on LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5 ml-0.5 opacity-80" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

