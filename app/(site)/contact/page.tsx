import { Mail, MapPin, Phone } from "lucide-react";

import { getSite } from "@/lib/get-site";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/site/section-title";
import { ContactForm } from "@/components/site/contact-form";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });
  const { contact, services } = site.content;
  const serviceNames = services.map((s) => s.name);

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
      <SectionTitle title={contact.title} desc={contact.tagline} />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <ContactForm services={serviceNames} domain={site.domain} />
        </Card>

        <Card>
          <div className="space-y-4 p-6 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone width={18} height={18} className="text-brand-600" /> {contact.phone}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail width={18} height={18} className="text-brand-600" /> {contact.email}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin width={18} height={18} className="text-brand-600" /> {contact.address}
            </div>
            <div className="rounded-xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              {contact.note}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
