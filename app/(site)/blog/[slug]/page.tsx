import AriaBlogPost from "@/templates/aria/blog-post";

/* Blog single-post route — renders the aria template's blog post.
   FRONTEND ONLY: static placeholder content. CMS wiring will resolve the
   post by slug and feed it in later. */
export default function BlogPostPage() {
  return <AriaBlogPost />;
}
