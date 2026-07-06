import { getTemplate } from "@/templates/registry";

/* Gallery route — renders the active template's Gallery via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function GalleryPage() {
  const { Gallery } = getTemplate(ACTIVE_TEMPLATE);
  if (!Gallery) return null;
  return <Gallery />;
}
