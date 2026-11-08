"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffects } from "@/context/effects-context";
import { LINKS } from "@/constants/links";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  User,
  Briefcase,
  Code,
  Cpu,
  GraduationCap,
  MessageCircle,
  Sun,
  Moon,
  Droplets,
  Download,
  Copy,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  Phone,
  Search,
  Package,
  Check,
} from "lucide-react";

interface CommandMenuProps {
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

export function CommandMenu({ onNavigate, className }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { bubblesEnabled, toggleBubbles } = useEffects();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      // fallback
    }
  };

  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted/70 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer select-none ${className}`}
        title="Open Command Palette (Ctrl+K or ⌘K)"
      >
        <Search className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline font-medium">Search & Actions</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] font-mono text-muted-foreground">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search sections, projects, skills..." />
        <CommandList className="max-h-[350px]">
          <CommandEmpty>No matching commands found.</CommandEmpty>

          {/* Section Navigation */}
          <CommandGroup heading="Sections">
            <CommandItem onSelect={() => handleSelect(() => scrollTo("about"))}>
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>About Shubham</span>
              <CommandShortcut>01</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("experience"))}>
              <Briefcase className="mr-2 h-4 w-4 text-primary" />
              <span>Work Experience</span>
              <CommandShortcut>02</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("projects"))}>
              <Code className="mr-2 h-4 w-4 text-primary" />
              <span>Featured Projects</span>
              <CommandShortcut>03</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("skills"))}>
              <Cpu className="mr-2 h-4 w-4 text-primary" />
              <span>Technical Skills</span>
              <CommandShortcut>04</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("education"))}>
              <GraduationCap className="mr-2 h-4 w-4 text-primary" />
              <span>Education</span>
              <CommandShortcut>05</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("contact"))}>
              <MessageCircle className="mr-2 h-4 w-4 text-primary" />
              <span>Contact Form</span>
              <CommandShortcut>06</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Featured Projects */}
          <CommandGroup heading="Projects">
            <CommandItem onSelect={() => handleSelect(() => scrollTo("projects"))}>
              <Package className="mr-2 h-4 w-4 text-sky-500" />
              <span>Inventory & Order Management System (Shopify/Shiprocket)</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("projects"))}>
              <MessageCircle className="mr-2 h-4 w-4 text-emerald-500" />
              <span>WhatsApp Flow Automation Platform</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("projects"))}>
              <Code className="mr-2 h-4 w-4 text-purple-500" />
              <span>Chatbot Analytics Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => scrollTo("projects"))}>
              <Briefcase className="mr-2 h-4 w-4 text-amber-500" />
              <span>AWS to Data Center Migration Pipeline (100k+ Records)</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Quick Actions & Toggles */}
          <CommandGroup heading="Quick Actions & Controls">
            <CommandItem onSelect={() => handleSelect(() => setTheme(theme === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="mr-2 h-4 w-4 text-sky-400" />
              )}
              <span>Switch Theme to {theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </CommandItem>

            <CommandItem onSelect={() => handleSelect(() => toggleBubbles())}>
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              <span>Turn Floating Bubbles {bubblesEnabled ? "OFF" : "ON"}</span>
            </CommandItem>

            <CommandItem onSelect={() => handleSelect(() => copyToClipboard(LINKS.EMAIL, "Email"))}>
              {copiedText === "Email" ? (
                <Check className="mr-2 h-4 w-4 text-emerald-500" />
              ) : (
                <Mail className="mr-2 h-4 w-4 text-rose-500" />
              )}
              <span>Copy Email ({LINKS.EMAIL})</span>
            </CommandItem>

            <CommandItem onSelect={() => handleSelect(() => copyToClipboard(LINKS.LINKEDIN, "LinkedIn"))}>
              {copiedText === "LinkedIn" ? (
                <Check className="mr-2 h-4 w-4 text-emerald-500" />
              ) : (
                <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
              )}
              <span>Copy LinkedIn Profile URL</span>
            </CommandItem>

            <CommandItem onSelect={() => handleSelect(() => window.open(LINKS.RESUME, "_blank"))}>
              <Download className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Download Resume (PDF)</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Socials & Profiles */}
          <CommandGroup heading="Direct Links">
            <CommandItem onSelect={() => handleSelect(() => window.open(LINKS.LINKEDIN, "_blank"))}>
              <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
              <span>Open LinkedIn Profile</span>
              <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => window.open(LINKS.GITHUB, "_blank"))}>
              <Github className="mr-2 h-4 w-4 text-foreground" />
              <span>Open GitHub Profile</span>
              <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(() => window.open(LINKS.WHATSAPP, "_blank"))}>
              <Phone className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Chat on WhatsApp</span>
              <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
