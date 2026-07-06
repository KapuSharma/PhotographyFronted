"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Camera, Calendar, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { SITE_NAV } from "@/lib/data";
import { useSiteStore } from "@/store/use-site-store";

export function Brand({
  studioName,
  logoUrl,
  tagline,
  invert = false,
}: {
  studioName: string;
  logoUrl: string | null;
  tagline: string;
  invert?: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={studioName} className="h-11 w-11 rounded-2xl object-cover" />
      ) : (
        <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
          <Camera width={22} height={22} className="relative transition-transform duration-500 group-hover:scale-110" />
        </span>
      )}
      <span className="text-left leading-tight">
        <span className={cn("block text-[17px] font-extrabold tracking-tight", invert ? "text-white" : "text-foreground")}>
          {studioName}
        </span>
        <span className={cn("block text-[9px] font-bold uppercase tracking-[0.22em]", invert ? "text-white/60" : "text-muted-foreground")}>
          {tagline}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader({
  studioName,
  logoUrl,
  tagline,
  bookLabel,
}: {
  studioName: string;
  logoUrl: string | null;
  tagline: string;
  bookLabel: string;
}) {
  const pathname = usePathname();
  const navOpen = useSiteStore((s) => s.navOpen);
  const toggleNav = useSiteStore((s) => s.toggleNav);
  const setNavOpen = useSiteStore((s) => s.setNavOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-xl" : "bg-white/70 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl 2xl:max-w-[1500px] items-center gap-4 px-4 py-3 md:px-6">
        <Brand studioName={studioName} logoUrl={logoUrl} tagline={tagline} />

        <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
          {SITE_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors",
                  active ? "text-brand-700" : "text-foreground/70 hover:text-brand-700"
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/booking"
          className="ml-auto hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 md:inline-flex lg:ml-0"
        >
          <Calendar width={16} height={16} />
          {bookLabel}
        </Link>

        <button
          onClick={toggleNav}
          aria-label="Toggle navigation"
          className="ml-auto text-foreground lg:hidden"
        >
          {navOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
        </button>
      </div>

      <AnimatePresence>
        {navOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-1.5">
                {SITE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setNavOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition",
                      isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-foreground/70 hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/booking"
                onClick={() => setNavOpen(false)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white"
              >
                <Calendar width={16} height={16} />
                {bookLabel}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
