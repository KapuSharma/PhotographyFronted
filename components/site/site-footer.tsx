import Link from "next/link";
import { Aperture, Mail, MapPin, Phone } from "lucide-react";

import { SITE_NAV } from "@/lib/data";
import type { SiteContent } from "@/templates/types";

type FooterContact = { phone: string; email: string; address: string };

export function SiteFooter({
  studioName,
  logoUrl,
  contact,
  footer,
}: {
  studioName: string;
  logoUrl: string | null;
  contact: FooterContact;
  footer: SiteContent["footer"];
}) {
  const links = footer.links.length > 0 ? footer.links : SITE_NAV;
  const year = new Date().getFullYear();
  const copyright = (footer.copyright || `© {year} {studio}. All rights reserved.`)
    .replace(/\{year\}/g, String(year))
    .replace(/\{studio\}/g, studioName);

  // Columns shown to the right of the brand block — only render the ones with content.
  const showContact = footer.showContact && (contact.phone || contact.email || contact.address);
  const showSocials = footer.socials.length > 0;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6 2xl:px-12">
        <div>
          <div className="flex items-center gap-2.5">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={studioName} className="h-9 w-9 rounded-xl object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Aperture width={20} height={20} />
              </div>
            )}
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-foreground">
                {studioName}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {footer.brandTagline}
              </div>
            </div>
          </div>
          <div
            className="rich-content mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: footer.description }}
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {footer.linksTitle}
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-muted-foreground transition hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {showContact ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {footer.contactTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {contact.phone ? (
                <li className="flex items-center gap-3">
                  <Phone width={18} height={18} className="text-brand-600" /> {contact.phone}
                </li>
              ) : null}
              {contact.email ? (
                <li className="flex items-center gap-3">
                  <Mail width={18} height={18} className="text-brand-600" /> {contact.email}
                </li>
              ) : null}
              {contact.address ? (
                <li className="flex items-center gap-3">
                  <MapPin width={18} height={18} className="text-brand-600" /> {contact.address}
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {showSocials ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {footer.socialTitle}
            </p>
            <ul className="mt-4 space-y-2">
              {footer.socials.map((s) => (
                <li key={s.label + s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-muted-foreground transition hover:text-brand-700"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-5 text-center text-xs text-muted-foreground md:px-6 2xl:px-12">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
