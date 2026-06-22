import { getSite } from "@/lib/get-site";
import { BookingFlow } from "@/components/site/booking/booking-flow";

/* Server component: resolves the tenant (by domain) and feeds the booking flow
   the studio's real services & packages plus the domain to submit against. */
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  return (
    <BookingFlow
      services={site.content.services}
      packages={site.content.packages}
      domain={site.domain}
    />
  );
}
