/* =====================================================================
   Mock data for the public site (ported from HOI_prototype.html).
   Replace with real assets / API data in production.
   ===================================================================== */

export type Photo = {
  id: string;
  title: string;
  category: string;
  src: string;
};

export const PHOTOS: Photo[] = [
  { id: "wedding", title: "Harbour Wedding", category: "Wedding", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" },
  { id: "prewed", title: "Riverside Pre-Wedding", category: "Pre-Wedding", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80" },
  { id: "fashion", title: "Lookbook Campaign", category: "Fashion", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80" },
  { id: "maternity", title: "Golden Maternity", category: "Maternity", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80" },
  { id: "product", title: "Product Detail", category: "Product", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
  { id: "corporate", title: "Founder Portrait", category: "Corporate", src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" },
  { id: "event", title: "Private Event", category: "Event", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" },
  { id: "portrait", title: "Studio Portrait", category: "Portrait", src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80" },
];

export type Service = {
  name: string;
  from: string;
  fromMax?: string; // optional upper end of a price range
  img: number; // index into PHOTOS
  desc: string;
};

// Map a stored currency ("INR", "INR (₹)", or "₹") to just its symbol, so the
// studio's Profile → Country choice drives the symbol shown on every price.
const SYMBOL_BY_CODE: Record<string, string> = {
  INR: "₹", USD: "$", GBP: "£", EUR: "€", AUD: "A$", CAD: "C$", AED: "د.إ",
  SGD: "S$", NZD: "NZ$", CHF: "CHF", JPY: "¥", CNY: "¥", HKD: "HK$", MYR: "RM",
  IDR: "Rp", THB: "฿", PHP: "₱", VND: "₫", ZAR: "R", NGN: "₦", KES: "KSh",
  SAR: "﷼", QAR: "ر.ق", BDT: "৳", LKR: "Rs", NPR: "रू", PKR: "₨", BRL: "R$",
  MXN: "MX$", ARS: "AR$", TRY: "₺", SEK: "kr", NOK: "kr", DKK: "kr", RUB: "₽",
  KRW: "₩", EGP: "E£", ILS: "₪", PLN: "zł", CZK: "Kč",
};

export function symbolFromCurrency(currency?: string | null): string {
  if (!currency) return "₹";
  const s = String(currency).trim();
  const paren = s.match(/\(([^)]+)\)/);                 // "INR (₹)" → "₹"
  if (paren) return paren[1];
  if (/^[A-Za-z]{3}$/.test(s) && SYMBOL_BY_CODE[s.toUpperCase()]) return SYMBOL_BY_CODE[s.toUpperCase()];
  return s || "₹";                                       // already a symbol
}

/**
 * Format one price value with the studio's currency symbol. Any symbol/ISO
 * code the admin may have typed is stripped first so we never double up
 * ("₹15,000" or "INR 15,000" both become "<symbol>15,000"). Non-numeric text
 * (e.g. "On request") is returned untouched.
 */
export function formatPrice(value?: string, symbol = "₹"): string {
  const raw = (value || "").trim();
  if (!raw) return "";
  const stripped = raw.replace(/^[A-Za-z]{3}\b[\s.]*/, "").replace(/^[^\d]+/, "").trim();
  if (!/^\d/.test(stripped)) return raw;                 // free text, leave as-is
  return `${symbol}${stripped}`;
}

/**
 * Build the price string shown on cards. When a max is provided (and differs
 * from the min) we render a range "min – max"; otherwise the single value.
 * `isRange` lets callers swap the "Starting from" label for "Price range".
 */
export function priceRange(min?: string, max?: string, symbol = "₹"): { text: string; isRange: boolean } {
  const lo = formatPrice(min, symbol);
  const hi = formatPrice(max, symbol);
  if (lo && hi && lo !== hi) return { text: `${lo} – ${hi}`, isRange: true };
  return { text: lo || hi, isRange: false };
}

export const SERVICES: Service[] = [
  { name: "Wedding", from: "₹50,000", img: 0, desc: "Full-day story coverage, private gallery, guided portraits." },
  { name: "Pre-Wedding", from: "₹25,000", img: 1, desc: "Outdoor and themed couple shoots with locations." },
  { name: "Fashion", from: "₹35,000", img: 2, desc: "Lookbooks, campaigns, model direction, retouching." },
  { name: "Maternity", from: "₹15,000", img: 3, desc: "Warm, private sessions with soft guided posing." },
  { name: "Corporate", from: "₹20,000", img: 5, desc: "Headshots, founder stories, team and brand imagery." },
  { name: "Product", from: "₹12,000", img: 4, desc: "Clean product photography for stores and campaigns." },
];

export type Package = {
  id: string;
  name: string;
  price: string;
  priceMax?: string; // optional upper end of a price range
  duration: string;
  bestFor: string;
  popular?: boolean;
  includes: string[];
};

export const PACKAGES: Package[] = [
  { id: "essential", name: "Essential Frame", price: "₹18,000", duration: "2 hours", bestFor: "Portraits, maternity, small product shoots", includes: ["25 edited images", "Private gallery", "1 location", "7-day delivery"] },
  { id: "signature", name: "Signature Story", price: "₹50,000", duration: "Half day", bestFor: "Pre-wedding, fashion, events, brand shoots", popular: true, includes: ["120 edited images", "Client selection flow", "2 locations", "48-hour sneak peek"] },
  { id: "legacy", name: "Legacy Coverage", price: "₹1,20,000", duration: "Full day", bestFor: "Weddings and destination events", includes: ["400+ edited images", "Second shooter", "Premium album", "Full delivery suite"] },
];

export type Testimonial = {
  client: string;
  city: string;
  rating: number;
  text: string;
  avatar?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { client: "Aisha & Rohan", city: "Kolkata", rating: 5, text: "They captured our wedding exactly the way it felt. The private gallery and quick sneak peek were a lovely touch." },
  { client: "Nupur Sen", city: "Howrah", rating: 5, text: "My maternity shoot was calm and so well guided. The photos are stunning and arrived ahead of time." },
  { client: "Nexa Store", city: "Salt Lake", rating: 5, text: "Clean product shots that lifted our store listings. Fast turnaround and easy booking." },
];

export type BlogPost = {
  title: string;
  date: string;
  img: number; // index into PHOTOS
  excerpt: string;
};

export const BLOG: BlogPost[] = [
  { title: "How to choose your wedding photography package", date: "2 Jun 2026", img: 0, excerpt: "A simple guide to coverage hours, deliverables, and what actually matters on the day." },
  { title: "5 pre-wedding shoot locations around Kolkata", date: "24 May 2026", img: 1, excerpt: "Riverside, heritage, and golden-hour spots that photograph beautifully." },
  { title: "Why product photos decide your online sales", date: "12 May 2026", img: 4, excerpt: "What good lighting and angles do for conversion on marketplaces." },
];

export const GALLERY_CATEGORIES = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Fashion",
  "Maternity",
  "Corporate",
  "Product",
  "Event",
] as const;

export const SITE_NAV: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
