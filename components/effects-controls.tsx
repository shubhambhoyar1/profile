"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffects } from "@/context/effects-context";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Droplets,
  CircleOff,
  Sparkles,
  Layers,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EffectsControlsProps {
  showThemeToggle?: boolean;
  className?: string;
  size?: "sm" | "default";
}

export function EffectsControls({
  showThemeToggle = true,
  className,
  size = "default",
}: EffectsControlsProps) {
  const { theme, setTheme } = useTheme();
  const {
    effects,
    bubblesEnabled,
    toggleBubbles,
    toggleEffect,
    resetEffects,
  } = useEffects();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-9 w-9 rounded-md bg-muted/40 animate-pulse" />
        <div className="h-9 w-9 rounded-md bg-muted/40 animate-pulse" />
        {showThemeToggle && <div className="h-9 w-9 rounded-md bg-muted/40 animate-pulse" />}
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 p-1 rounded-xl bg-card/60 backdrop-blur-md border border-border/60 shadow-xs",
        className
      )}
    >
      {/* 1. Quick Bubble ON / OFF Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={bubblesEnabled ? "default" : "outline"}
            size={size === "sm" ? "sm" : "icon"}
            onClick={toggleBubbles}
            className={cn(
              "relative transition-all duration-200 select-none",
              size === "sm" ? "h-8 px-2.5 text-xs gap-1.5" : "h-9 w-9",
              bubblesEnabled
                ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/60 border-border/70"
            )}
            aria-label={bubblesEnabled ? "Turn bubbles off" : "Turn bubbles on"}
          >
            {bubblesEnabled ? (
              <Droplets className="h-4 w-4 animate-pulse text-primary-foreground" />
            ) : (
              <CircleOff className="h-4 w-4 text-muted-foreground" />
            )}

            {size === "sm" && (
              <span className="font-medium text-xs">
                {bubblesEnabled ? "Bubbles On" : "Bubbles Off"}
              </span>
            )}

            {/* Glowing active indicator dot */}
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full transition-colors",
                bubblesEnabled
                  ? "bg-emerald-400 ring-2 ring-background animate-ping"
                  : "bg-muted-foreground/30"
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p className="font-semibold">
            Bubbles: {bubblesEnabled ? "Enabled (Click to turn off)" : "Disabled (Click to turn on)"}
          </p>
          <p className="text-[10px] text-muted-foreground">Toggle floating background bubbles</p>
        </TooltipContent>
      </Tooltip>

      {/* 2. Visual Effects Configuration Menu (Popover) */}
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={size === "sm" ? "sm" : "icon"}
                className={cn(
                  "hover:bg-muted/80 bg-background/50 border-border/70 transition-all duration-200",
                  size === "sm" ? "h-8 px-2 text-xs" : "h-9 w-9"
                )}
                aria-label="Visual effects settings"
              >
                <SlidersHorizontal className="h-4 w-4 text-foreground/80" />
                {size === "sm" && <span className="ml-1 text-xs">Effects</span>}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Visual Effects Settings
          </TooltipContent>
        </Tooltip>

        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-80 p-4 bg-card/95 backdrop-blur-xl border border-border/80 shadow-xl rounded-xl z-50"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h4 className="font-semibold text-sm leading-none flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Visual Effects
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Configure ambient animations
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 uppercase tracking-wider font-mono">
                Interactive
              </Badge>
            </div>

            {/* List of Toggles */}
            <div className="space-y-3">
              {/* Bubbles */}
              <div className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                    <Droplets className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <label
                      htmlFor="bubble-toggle"
                      className="text-xs font-medium text-foreground cursor-pointer block"
                    >
                      Floating Bubbles
                    </label>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Liquid bubbles reacting to mouse repel
                    </p>
                  </div>
                </div>
                <Switch
                  id="bubble-toggle"
                  checked={effects.bubbles}
                  onCheckedChange={() => toggleEffect("bubbles")}
                />
              </div>

              {/* Cursor Particles */}
              <div className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1.5 rounded-md bg-purple-500/10 text-purple-500">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <label
                      htmlFor="cursor-toggle"
                      className="text-xs font-medium text-foreground cursor-pointer block"
                    >
                      Cursor Particles
                    </label>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Trailing particles tracking cursor
                    </p>
                  </div>
                </div>
                <Switch
                  id="cursor-toggle"
                  checked={effects.cursorEffects}
                  onCheckedChange={() => toggleEffect("cursorEffects")}
                />
              </div>

              {/* Floating Shapes */}
              <div className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <label
                      htmlFor="shapes-toggle"
                      className="text-xs font-medium text-foreground cursor-pointer block"
                    >
                      Floating Elements
                    </label>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Drifting ambient geometric orbs
                    </p>
                  </div>
                </div>
                <Switch
                  id="shapes-toggle"
                  checked={effects.floatingElements}
                  onCheckedChange={() => toggleEffect("floatingElements")}
                />
              </div>

              {/* Parallax */}
              <div className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                    <Eye className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <label
                      htmlFor="parallax-toggle"
                      className="text-xs font-medium text-foreground cursor-pointer block"
                    >
                      Parallax Depth
                    </label>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Multi-layered background depth
                    </p>
                  </div>
                </div>
                <Switch
                  id="parallax-toggle"
                  checked={effects.parallax}
                  onCheckedChange={() => toggleEffect("parallax")}
                />
              </div>
            </div>

            {/* Footer with Reset */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetEffects}
                className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground gap-1.5"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Defaults
              </Button>
              <span className="text-[10px] text-muted-foreground/80">
                Preferences saved
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* 3. Theme Toggle (Sun / Moon) */}
      {showThemeToggle && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : "icon"}
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(
                "hover:scale-105 transition-transform duration-200 bg-background/50 border-border/70",
                size === "sm" ? "h-8 w-8" : "h-9 w-9"
              )}
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Theme: {isDark ? "Dark (Click for Light)" : "Light (Click for Dark)"}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

