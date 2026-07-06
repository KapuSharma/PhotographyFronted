import { getTemplate } from "@/templates/registry";

/* Contact route — renders the active template's Contact via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as HomeRenderer). */
const ACTIVE_TEMPLATE = "aria";

export default function ContactPage() {
  const { Contact } = getTemplate(ACTIVE_TEMPLATE);
  if (!Contact) return null;
  return <Contact />;
}
