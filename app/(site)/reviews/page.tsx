import { getTemplate } from "@/templates/registry";

/* Reviews route — renders the active template's Reviews via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function ReviewsPage() {
  const { Reviews } = getTemplate(ACTIVE_TEMPLATE);
  if (!Reviews) return null;
  return <Reviews />;
}
