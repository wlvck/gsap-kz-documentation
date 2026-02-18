export interface Showcase {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const showcases: Showcase[] = [
  {
    id: "apple",
    title: "Apple",
    description: "Apple өнімдерінің интерактивті презентациялары мен scroll анимациялары",
    url: "https://www.apple.com",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
    tags: ["ScrollTrigger", "3D", "Pin"],
    featured: true,
  },
  {
    id: "linear",
    title: "Linear",
    description: "Заманауи SaaS сайтының анимациялары мен микро-интерактивтері",
    url: "https://linear.app",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
    tags: ["Timeline", "SVG", "Easing"],
    featured: true,
  },
  {
    id: "stripe",
    title: "Stripe",
    description: "Төлем жүйесінің элегантты анимациялары мен визуал эффекттері",
    url: "https://stripe.com",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["ScrollTrigger", "Canvas", "WebGL"],
    featured: true,
  },
  {
    id: "awwwards",
    title: "Awwwards",
    description: "Креативті веб-дизайн галереясы мен интерактивті элементтер",
    url: "https://www.awwwards.com",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    tags: ["Draggable", "Timeline", "ScrollTrigger"],
  },
  {
    id: "figma",
    title: "Figma",
    description: "Дизайн құралының landing page анимациялары",
    url: "https://www.figma.com",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop",
    tags: ["SVG", "Timeline", "Easing"],
  },
  {
    id: "notion",
    title: "Notion",
    description: "Productivity қосымшасының микро-анимациялары",
    url: "https://www.notion.so",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
    tags: ["Timeline", "Easing", "Flip"],
  },
  {
    id: "vercel",
    title: "Vercel",
    description: "Developer платформасының заманауи анимациялары",
    url: "https://vercel.com",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop",
    tags: ["ScrollTrigger", "3D", "Canvas"],
  },
  {
    id: "framer",
    title: "Framer",
    description: "No-code платформасының интерактивті демонстрациялары",
    url: "https://www.framer.com",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Draggable", "MotionPath", "Timeline"],
  },
  {
    id: "webflow",
    title: "Webflow",
    description: "Визуалды веб-әзірлеу платформасының showcase",
    url: "https://webflow.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    tags: ["ScrollTrigger", "SVG", "TextPlugin"],
  },
];

export const allTags = [...new Set(showcases.flatMap((s) => s.tags))].sort();
