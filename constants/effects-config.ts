export interface EffectsConfig {
  bubbles: boolean;
  bubbleCount: number;
  bubbleSpeed: number;
  cursorEffects: boolean;
  floatingElements: boolean;
  parallax: boolean;
}

/**
 * Default visual effects configuration.
 * You can easily turn on or off any effect by default here.
 */
export const DEFAULT_EFFECTS_CONFIG: EffectsConfig = {
  bubbles: true, // Interactive liquid bubbles in background
  bubbleCount: 7, // Number of bubbles (3 to 15)
  bubbleSpeed: 1, // Speed multiplier (0.5 to 2)
  cursorEffects: true, // Particle trail following cursor
  floatingElements: true, // Ambient floating geometric elements
  parallax: true, // Multi-layered depth on scroll/mouse
};

export const EFFECTS_STORAGE_KEY = "shubham_portfolio_effects_config_v1";
