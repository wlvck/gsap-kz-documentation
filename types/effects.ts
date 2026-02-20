export type EffectCategory =
  | "text"
  | "scroll"
  | "image"
  | "card"
  | "navigation"
  | "button"
  | "container"
  | "loading"
  | "svg"
  | "cursor"
  | "micro"
  | "3d";

export interface EffectCode {
  vue: string;
  script: string;
  css: string;
}

export type PlaygroundType = "text" | "hover" | "scroll" | "loading" | "default";

export interface Effect {
  id: string;
  name: string;
  nameKz: string;
  category: EffectCategory;
  description: string;
  descriptionKz: string;
  code: EffectCode;
  defaultText: string;
  playgroundType?: PlaygroundType;
}

export interface CategoryMeta {
  id: EffectCategory;
  name: string;
  nameKz: string;
  description: string;
  icon: string;
}

export const CATEGORY_META: Record<EffectCategory, CategoryMeta> = {
  text: {
    id: "text",
    name: "Text",
    nameKz: "Мәтін",
    description: "Мәтін анимациялары: fade, slide, typewriter, glitch және т.б.",
    icon: "T",
  },
  scroll: {
    id: "scroll",
    name: "Scroll",
    nameKz: "Скролл",
    description: "Скролл эффекттері: parallax, pin, reveal және т.б.",
    icon: "↕",
  },
  image: {
    id: "image",
    name: "Image",
    nameKz: "Сурет",
    description: "Сурет анимациялары: clip, mask, hover, gallery және т.б.",
    icon: "🖼",
  },
  card: {
    id: "card",
    name: "Card",
    nameKz: "Карточка",
    description: "Карточка эффекттері: lift, tilt, flip, expand және т.б.",
    icon: "▢",
  },
  navigation: {
    id: "navigation",
    name: "Navigation",
    nameKz: "Навигация",
    description: "Навигация анимациялары: menu, dropdown, hamburger және т.б.",
    icon: "☰",
  },
  button: {
    id: "button",
    name: "Button",
    nameKz: "Батырма",
    description: "Батырма эффекттері: ripple, magnetic, shine және т.б.",
    icon: "◉",
  },
  container: {
    id: "container",
    name: "Container",
    nameKz: "Контейнер",
    description: "Контейнер анимациялары: gradient, wave, section және т.б.",
    icon: "◻",
  },
  loading: {
    id: "loading",
    name: "Loading",
    nameKz: "Жүктелу",
    description: "Жүктелу анимациялары: spinner, progress, skeleton және т.б.",
    icon: "◌",
  },
  svg: {
    id: "svg",
    name: "SVG",
    nameKz: "SVG",
    description: "SVG анимациялары: draw, morph, path және т.б.",
    icon: "◇",
  },
  cursor: {
    id: "cursor",
    name: "Cursor",
    nameKz: "Курсор",
    description: "Курсор эффекттері: custom, follower, magnetic және т.б.",
    icon: "↗",
  },
  micro: {
    id: "micro",
    name: "Micro",
    nameKz: "Микро",
    description: "Микро-интеракциялар: input, checkbox, toggle және т.б.",
    icon: "·",
  },
  "3d": {
    id: "3d",
    name: "3D",
    nameKz: "3D",
    description: "3D эффекттер: flip, carousel, perspective және т.б.",
    icon: "⬡",
  },
};
