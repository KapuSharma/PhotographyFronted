import { getTemplate } from "@/templates/registry";

/* Blog route — renders the active template's Blog listing via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function BlogPage() {
  const { Blog } = getTemplate(ACTIVE_TEMPLATE);
  if (!Blog) return null;
  return <Blog />;
}
