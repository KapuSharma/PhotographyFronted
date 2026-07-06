import AriaBlogPost from "@/templates/aria/blog-post";
import { getSite } from "@/lib/get-site";

/* Blog single-post route — resolves the post by slug from the tenant's blog
   list and feeds the full post (incl. its structured body blocks) plus the
   shared blog-post config (author, sidebar, related) into the aria template. */
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  const post = content.blog.find((b) => slugify(b.title) === slug);

  return <AriaBlogPost post={post} cfg={content.blogPostPage} />;
}
