import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getBlogBySlug } from "@/lib/data";
import RelatedContent from "@/components/RelatedContent";
import { getRelatedBlogs } from "@/lib/related";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getArticleJsonLd } from "@/lib/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const canonical = `/blogs/${blog.slug}`;
  const ogImage = `${siteConfig.url}${siteConfig.og.image}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [
      blog.title,
      ...(blog.tags || []),
      blog.category || "Technology",
      "Blog",
      siteConfig.name,
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      title: `${blog.title} | ${siteConfig.name}`,
      description: blog.excerpt,
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: siteConfig.og.imageWidth,
          height: siteConfig.og.imageHeight,
          alt: `${blog.title} - ${siteConfig.name}`,
          type: "image/png",
        },
      ],
      type: "article",
      publishedTime: String(blog.createdAt),
      modifiedTime: String(blog.updatedAt),
      authors: [siteConfig.name],
      tags: blog.tags || [],
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: blog.title,
      description: blog.excerpt,
      images: [ogImage],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

function TableOfContents({ content }: { content: string }) {
  const mdHeadings = Array.from(content.matchAll(/(?:^|\n)(#{2,3})\s+(.*)/g)).map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
    id: match[2].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));

  const htmlHeadings = Array.from(content.matchAll(/<h(2|3)[^>]*>(.*?)<\/h\1>/g)).map((match) => {
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    return {
      level: parseInt(match[1]),
      text,
      id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
  });

  const headings = [...mdHeadings, ...htmlHeadings];

  if (headings.length === 0) return null;

  return (
    <nav
      className="space-y-4 text-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block border-l border-neutral-800 pl-6 ml-8 pb-8"
      aria-label="Table of Contents"
    >
      <h2 className="font-medium text-white uppercase tracking-widest text-[11px] mb-6">
        Table of Contents
      </h2>
      <ul className="space-y-3 font-sans" role="list">
        {headings.map((h, i) => (
          <li key={i} style={{ marginLeft: `${(h.level - 2) * 12}px` }}>
            <a
              href={`#${h.id}`}
              className="text-neutral-400 hover:text-white transition-colors block leading-tight"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const articleSchema = getArticleJsonLd({
    title: blog.title,
    description: blog.excerpt,
    date: String(blog.createdAt),
    url: `${siteConfig.url}/blogs/${blog.slug}`,
    tags: blog.tags,
    category: blog.category,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ]);

  const markdownContent = Array.isArray(blog.content)
    ? blog.content.join("\n\n")
    : blog.content || "";

  const isHtml =
    markdownContent.trim().startsWith("<") && markdownContent.includes("class=");

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="min-h-screen bg-[#000000] text-neutral-300 font-sans selection:bg-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center relative">
            {/* Left Main Content */}
            <div className="flex-1 max-w-[700px] w-full">
              <div className="mb-12">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to Blogs
                </Link>
              </div>

              <Breadcrumb
                items={[
                  { name: "Blogs", href: "/blogs" },
                  { name: blog.title, href: `/blogs/${blog.slug}` },
                ]}
                className="mb-8"
              />

              <header className="mb-14">
                <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                  {blog.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-8 mb-8 border-b border-neutral-800">
                  <p className="text-[15px] text-neutral-400 font-medium">
                    By <span className="text-white">{siteConfig.name}</span>
                  </p>
                  <span className="hidden sm:block text-neutral-600" aria-hidden="true">
                    &middot;
                  </span>
                  <time className="text-[15px] text-neutral-400" dateTime={String(blog.createdAt)}>
                    {formatDate(blog.createdAt)}
                  </time>
                </div>

                {blog.category && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    <span className="text-[11px] font-bold tracking-widest text-yellow-500 uppercase">
                      {blog.category}
                    </span>
                  </div>
                )}
              </header>

              <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:transition-colors prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-neutral-800 prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800 mb-16">
                {isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug, rehypeHighlight]}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                )}
              </article>

              <hr className="border-neutral-800 mb-12" />

              <RelatedContent
                eyebrow="Keep reading"
                heading="More from the developer blog"
                items={await getRelatedBlogs(blog.slug, blog.tags ?? [], 3)}
                hubHref="/blogs"
                hubLabel="Browse all posts"
              />
            </div>

            {/* Right TOC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents content={markdownContent} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
