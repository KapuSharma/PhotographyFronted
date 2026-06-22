"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Calendar, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE_NAV } from "@/lib/data";
import { useSiteStore } from "@/store/use-site-store";
import { Button } from "@/components/ui/button";

function Brand({
  studioName,
  logoUrl,
  tagline,
}: {
  studioName: string;
  logoUrl: string | null;
  tagline: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={studioName} className="h-9 w-9 rounded-xl object-cover" />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Aperture width={20} height={20} />
        </div>
      )}
      <div className="text-left leading-tight">
        <div className="text-sm font-extrabold tracking-tight text-foreground">{studioName}</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {tagline}
        </div>
      </div>
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] items-center gap-3 px-4 py-3 md:px-6 2xl:px-12">
        <Brand studioName={studioName} logoUrl={logoUrl} tagline={tagline} />

        <nav className="ml-4 hidden items-center gap-0.5 lg:flex">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground",
                isActive(item.href) && "bg-brand-50 text-brand-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button asChild>
            <Link href="/booking">
              <Calendar width={16} height={16} />
              {bookLabel}
            </Link>
          </Button>
        </div>

        <button
          onClick={toggleNav}
          aria-label="Toggle navigation"
          className="ml-auto text-foreground md:hidden"
        >
          {navOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
        </button>
      </div>

      {navOpen ? (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1.5">
            {SITE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setNavOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm font-semibold text-muted-foreground",
                  isActive(item.href) && "bg-brand-50 text-brand-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-2">
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setNavOpen(false)}>
                <Calendar width={16} height={16} />
                Book now
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
