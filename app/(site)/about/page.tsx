import { getTemplate } from "@/templates/registry";

/* About route — renders the active template's About page via the registry.

   FRONTEND ONLY for now: pinned to the new "aria" template we're building.
   During CMS wiring this becomes the tenant's resolved template (same pattern
   as HomeRenderer), and templates without an About fall back to a shared page. */
const ACTIVE_TEMPLATE = "aria";

export default function AboutPage() {
  const { About } = getTemplate(ACTIVE_TEMPLATE);
  if (!About) return null;
  return <About />;
}
