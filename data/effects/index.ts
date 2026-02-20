import type { Effect, EffectCategory } from "~/types/effects";
import { CATEGORY_META } from "~/types/effects";
import { textEffects } from "./text";
import { scrollEffects } from "./scroll";
import { buttonEffects } from "./button";
import { loadingEffects } from "./loading";

// All effects registry
const allEffects: Effect[] = [
  ...textEffects,
  ...scrollEffects,
  ...buttonEffects,
  ...loadingEffects,
];

// Get all effects
export function getAllEffects(): Effect[] {
  return allEffects;
}

// Get effects by category
export function getEffectsByCategory(category: EffectCategory): Effect[] {
  return allEffects.filter((effect) => effect.category === category);
}

// Get effect by ID
export function getEffectById(id: string): Effect | undefined {
  return allEffects.find((effect) => effect.id === id);
}

// Get effect by category and ID
export function getEffect(category: EffectCategory, id: string): Effect | undefined {
  return allEffects.find((effect) => effect.category === category && effect.id === id);
}

// Get category metadata
export function getCategoryMeta(category: EffectCategory) {
  return CATEGORY_META[category];
}

// Get all categories with effect counts
export function getCategoriesWithCounts() {
  const categories = Object.values(CATEGORY_META);

  return categories.map((cat) => ({
    ...cat,
    count: getEffectsByCategory(cat.id).length,
  }));
}

// Check if category has effects
export function categoryHasEffects(category: EffectCategory): boolean {
  return getEffectsByCategory(category).length > 0;
}

// Export for convenience
export { CATEGORY_META };
export type { Effect, EffectCategory };
