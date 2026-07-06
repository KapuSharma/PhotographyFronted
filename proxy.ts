import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Resolves the tenant domain for every request and exposes it as the
   `x-tenant-domain` request header. This lets server components that can't read
   searchParams (notably the layout, for the header/footer) still know which
   tenant they're rendering. Order: ?domain= override → real host.

   Next.js 16 renamed the "middleware" file convention to "proxy". */
export function proxy(request: NextRequest) {
  const qDomain = request.nextUrl.searchParams.get("domain")?.trim();
  const host = (request.headers.get("host") || "").split(":")[0];
  const isLocal = !host || host === "localhost" || host === "127.0.0.1";
  const domain = qDomain || (isLocal ? "" : host);

  const headers = new Headers(request.headers);
  if (domain) headers.set("x-tenant-domain", domain);
  // Forward a template preview override (dashboard "Preview"/live-preview links)
  // so the layout — which can't read searchParams — can theme the whole page.
  const preview = request.nextUrl.searchParams.get("previewTemplate")?.trim();
  if (preview) headers.set("x-preview-template", preview);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|templates/).*)"],
};
