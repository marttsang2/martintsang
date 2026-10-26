import type { CSSProperties } from "react";

// Feeds the --i custom property that globals.css multiplies into a transition delay.
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
