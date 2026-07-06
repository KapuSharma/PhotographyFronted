import { getTemplate } from "@/templates/registry";

/* Services route — renders the active template's Services via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function ServicesPage() {
  const { Services } = getTemplate(ACTIVE_TEMPLATE);
  if (!Services) return null;
  return <Services />;
}
