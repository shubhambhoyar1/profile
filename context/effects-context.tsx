"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { DEFAULT_EFFECTS_CONFIG, EFFECTS_STORAGE_KEY, EffectsConfig } from "@/constants/effects-config";

interface EffectsContextType {
  effects: EffectsConfig;
  mounted: boolean;
  bubblesEnabled: boolean;
  bubbleCount: number;
  bubbleSpeed: number;
  cursorEffectsEnabled: boolean;
  floatingElementsEnabled: boolean;
  parallaxEnabled: boolean;
  toggleBubbles: () => void;
  setBubbleCount: (count: number) => void;
  setBubbleSpeed: (speed: number) => void;
  toggleCursorEffects: () => void;
  toggleFloatingElements: () => void;
  toggleParallax: () => void;
  setEffect: <K extends keyof EffectsConfig>(key: K, value: EffectsConfig[K]) => void;
  toggleEffect: (key: "bubbles" | "cursorEffects" | "floatingElements" | "parallax") => void;
  resetEffects: () => void;
}

const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

export function EffectsProvider({ children }: { children: React.ReactNode }) {
  const [effects, setEffects] = useState<EffectsConfig>(DEFAULT_EFFECTS_CONFIG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(EFFECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setEffects((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn("Could not read effects configuration from localStorage:", e);
    }
  }, []);

  const updateEffects = (newEffects: EffectsConfig) => {
    setEffects(newEffects);
    try {
      localStorage.setItem(EFFECTS_STORAGE_KEY, JSON.stringify(newEffects));
    } catch (e) {
      console.warn("Could not save effects configuration to localStorage:", e);
    }
  };

  const toggleEffect = (key: "bubbles" | "cursorEffects" | "floatingElements" | "parallax") => {
    updateEffects({
      ...effects,
      [key]: !effects[key],
    });
  };

  const setEffect = <K extends keyof EffectsConfig>(key: K, value: EffectsConfig[K]) => {
    updateEffects({
      ...effects,
      [key]: value,
    });
  };

  const resetEffects = () => {
    updateEffects(DEFAULT_EFFECTS_CONFIG);
  };

  const value = useMemo(
    () => ({
      effects,
      mounted,
      bubblesEnabled: mounted ? effects.bubbles : DEFAULT_EFFECTS_CONFIG.bubbles,
      bubbleCount: mounted ? effects.bubbleCount : DEFAULT_EFFECTS_CONFIG.bubbleCount,
      bubbleSpeed: mounted ? effects.bubbleSpeed : DEFAULT_EFFECTS_CONFIG.bubbleSpeed,
      cursorEffectsEnabled: mounted ? effects.cursorEffects : DEFAULT_EFFECTS_CONFIG.cursorEffects,
      floatingElementsEnabled: mounted ? effects.floatingElements : DEFAULT_EFFECTS_CONFIG.floatingElements,
      parallaxEnabled: mounted ? effects.parallax : DEFAULT_EFFECTS_CONFIG.parallax,
      toggleBubbles: () => toggleEffect("bubbles"),
      setBubbleCount: (count: number) => setEffect("bubbleCount", count),
      setBubbleSpeed: (speed: number) => setEffect("bubbleSpeed", speed),
      toggleCursorEffects: () => toggleEffect("cursorEffects"),
      toggleFloatingElements: () => toggleEffect("floatingElements"),
      toggleParallax: () => toggleEffect("parallax"),
      setEffect,
      toggleEffect,
      resetEffects,
    }),
    [effects, mounted]
  );

  return <EffectsContext.Provider value={value}>{children}</EffectsContext.Provider>;
}

export function useEffects() {
  const context = useContext(EffectsContext);
  if (!context) {
    return {
      effects: DEFAULT_EFFECTS_CONFIG,
      mounted: true,
      bubblesEnabled: DEFAULT_EFFECTS_CONFIG.bubbles,
      bubbleCount: DEFAULT_EFFECTS_CONFIG.bubbleCount,
      bubbleSpeed: DEFAULT_EFFECTS_CONFIG.bubbleSpeed,
      cursorEffectsEnabled: DEFAULT_EFFECTS_CONFIG.cursorEffects,
      floatingElementsEnabled: DEFAULT_EFFECTS_CONFIG.floatingElements,
      parallaxEnabled: DEFAULT_EFFECTS_CONFIG.parallax,
      toggleBubbles: () => {},
      setBubbleCount: () => {},
      setBubbleSpeed: () => {},
      toggleCursorEffects: () => {},
      toggleFloatingElements: () => {},
      toggleParallax: () => {},
      setEffect: () => {},
      toggleEffect: () => {},
      resetEffects: () => {},
    };
  }
  return context;
}
