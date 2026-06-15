import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our custom font-size utilities (from @theme --text-*) so tailwind-merge
// recognises them as font sizes and doesn't mistake them for text-color utilities,
// which would strip them when combined (e.g. `text-hero text-ivory-soft`).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "display", "title"] }],
    },
  },
});

/** Compose conditional class names, merging conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
