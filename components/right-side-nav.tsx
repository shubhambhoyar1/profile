"use client";

import * as React from "react";
import {
  User,
  Briefcase,
  Code,
  Cpu,
  GraduationCap,
  MessageCircle,
  ArrowUp,
  Menu,
  X,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSideNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  className?: string;
}

const SECTIONS = [
  { id: "about", label: "About", number: "01", icon: User },
  { id: "experience", label: "Experience", number: "02", icon: Briefcase },
  { id: "projects", label: "Projects", number: "03", icon: Code },
  { id: "skills", label: "Skills", number: "04", icon: Cpu },
  { id: "education", label: "Education", number: "05", icon: GraduationCap },
  { id: "contact", label: "Contact", number: "06", icon: MessageCircle },
];

export function RightSideNav({
  activeSection,
  onNavigate,
  className,
}: RightSideNavProps) {
  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentSection = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];
  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const handleSelect = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* 1. Desktop & Tablet: Always-Visible Right-Side Navigation Dock */}
      <aside
        aria-label="Section Navigation"
        className={cn(
          "fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col select-none",
          className
        )}
      >
        <div className="flex flex-col p-2 rounded-2xl bg-card/90 dark:bg-card/85 backdrop-blur-xl border border-border/80 shadow-2xl shadow-black/10 dark:shadow-black/40 w-[175px] transition-all duration-300">
          {/* Header clearly informing the user that 6 options are present */}
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/60 mb-1.5 text-muted-foreground">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
              Sections
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              6 Options
            </span>
          </div>

          {/* All 6 Options */}
          <div className="flex flex-col gap-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  className={cn(
                    "group relative flex items-center justify-between gap-2 py-2 px-3 text-xs rounded-xl cursor-pointer transition-all duration-200 text-left w-full",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-md shadow-black/20 dark:shadow-white/10 scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70 font-medium"
                  )}
                  aria-label={`Jump to ${section.label} section`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                        isActive
                          ? "text-white dark:text-zinc-900"
                          : "text-muted-foreground group-hover:text-primary"
                      )}
                    />
                    <span className="truncate">{section.label}</span>
                  </div>

                  {/* Active dot indicator • exactly as in the user screenshot */}
                  {isActive ? (
                    <span
                      className="font-bold text-sm leading-none shrink-0 animate-pulse text-white dark:text-zinc-900"
                      title="Current Section"
                    >
                      •
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0 group-hover:text-foreground/70">
                      {section.number}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Jump: Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-2 pt-1.5 border-t border-border/60 flex items-center justify-center gap-1.5 py-1 text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer w-full rounded-lg hover:bg-muted/40 font-medium"
            title="Scroll to top of page"
          >
            <ArrowUp className="h-3 w-3" />
            <span>Top</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile & Tablet (< 1024px): Floating Right-Side Collapsible Pill */}
      <div className="lg:hidden fixed right-3 bottom-6 z-40 flex flex-col items-end">
        {mobileOpen && (
          <div className="mb-2 p-2 rounded-2xl bg-card/95 dark:bg-card/90 backdrop-blur-xl border border-border/80 shadow-2xl min-w-[170px] flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none">
            <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
              <span>Section Menu</span>
              <span className="text-[9px] font-bold text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded-full">
                6 Options
              </span>
            </div>

            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  className={cn(
                    "flex items-center justify-between gap-2.5 py-2 px-3 text-xs rounded-xl text-left w-full transition-all duration-150",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{section.label}</span>
                  </div>
                  {isActive ? (
                    <span className="font-bold text-sm leading-none">•</span>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/60">
                      {section.number}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Quick Trigger Pill */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl border border-border/70 text-xs font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Toggle section navigation menu"
        >
          {mobileOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Layers className="h-3.5 w-3.5" />
              <span>
                {currentSection.label} • {currentIndex + 1}/6
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
