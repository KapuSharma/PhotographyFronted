import { getTemplate } from "@/templates/registry";

/* Packages route — renders the active template's Packages via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function PackagesPage() {
  const { Packages } = getTemplate(ACTIVE_TEMPLATE);
  if (!Packages) return null;
  return <Packages />;
}
