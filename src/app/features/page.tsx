import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  Rocket,
  Layers,
  CheckCircle,
  ArrowRight,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Next.js 16 Modern Architecture & Features Guide',
  description: 'In-depth interactive overview of Next.js 16 and React 19 architecture implemented in this app.',
};

const FEATURES = [
  {
    id: 'async-request-apis',
    badge: 'Breaking Change in 15 & 16',
    badgeColor: '#f43f5e',
    title: 'Asynchronous Request APIs',
    summary: 'params, searchParams, cookies(), headers(), and draftMode() are now strictly Promises.',
    whyHelpful:
      'Enables Partial Prerendering (PPR) and parallel server streaming. The server renders the static page shell immediately without blocking on incoming dynamic headers.',
    code: `// src/app/blogs/[slug]/page.tsx
export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Await promises before accessing properties
  const { slug } = await params;
  const query = await searchParams;
  const post = await getPostBySlug(slug);
  return <ArticleView post={post} />;
}`,
    file: 'src/app/blogs/[slug]/page.tsx',
  },
  {
    id: 'server-actions-revalidation',
    badge: 'Full-Stack Data Mutations',
    badgeColor: '#10b981',
    title: 'Server Actions & revalidatePath',
    summary: 'Direct server function execution with automated cache invalidation and zero client fetch boilerplate.',
    whyHelpful:
      'Eliminates the need to write separate API route handlers (/api/posts), eliminates manual client-side cache invalidation (like React Query or SWR mutations), and guarantees instant UI sync.',
    code: `// src/app/actions/blog-actions.ts
'use server'

export async function togglePublishAction(id: string) {
  const updated = await togglePostStatus(id);
  // Invalidate Next.js cache across related routes
  revalidatePath('/dashboard');
  revalidatePath('/blogs');
  revalidatePath('/');
  return { success: true, status: updated?.status };
}`,
    file: 'src/app/actions/blog-actions.ts',
  },
  {
    id: 'react-19-form-hooks',
    badge: 'React 19 Integration',
    badgeColor: '#a855f7',
    title: 'React 19 useActionState & useFormStatus',
    summary: 'Native hooks for progressive form enhancement, error states, and child submit indicators.',
    whyHelpful:
      'useActionState replaces deprecated useFormState and returns pending status directly. useFormStatus allows isolated submit buttons to know form submission state without prop drilling.',
    code: `// src/components/PostForm.tsx
'use client'
import { useActionState } from 'react';
import { createPostAction } from '@/app/actions/blog-actions';
import { SubmitButton } from './SubmitButton';

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPostAction, null);

  return (
    <form action={formAction}>
      <input name="title" required />
      {state?.errors?.title && <p>{state.errors.title[0]}</p>}
      <SubmitButton label="Create Article" />
    </form>
  );
}`,
    file: 'src/components/PostForm.tsx',
  },
  {
    id: 'turbopack-by-default',
    badge: 'Next.js 16 Engine',
    badgeColor: '#38bdf8',
    title: 'Turbopack Stable by Default',
    summary: 'Next.js 16 turns on the Rust-based Turbopack bundler for both dev and production builds.',
    whyHelpful:
      'Cold starts are 5x–10x faster, hot module replacement (HMR) updates in milliseconds, and memory consumption during build steps is drastically reduced.',
    code: `// package.json
{
  "scripts": {
    "dev": "next dev",       // Runs Turbopack by default!
    "build": "next build"    // Production Turbopack build!
  }
}`,
    file: 'package.json',
  },
  {
    id: 'streaming-suspense',
    badge: 'Instant Navigation',
    badgeColor: '#f59e0b',
    title: 'Streaming & Route Loading Boundaries',
    summary: 'loading.tsx and React Suspense stream UI chunks from the server to eliminate white screens.',
    whyHelpful:
      'The client transitions between pages instantly. Shared layouts remain mounted while slow asynchronous database queries stream in when ready.',
    code: `// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="posts-grid">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}`,
    file: 'src/app/loading.tsx',
  },
  {
    id: 'dynamic-metadata',
    badge: 'Built-in SEO & OpenGraph',
    badgeColor: '#6366f1',
    title: 'Dynamic generateMetadata API',
    summary: 'Server-side metadata generation tailored to individual dynamic route segments.',
    whyHelpful:
      'Generates automated Twitter cards, OpenGraph social previews, dynamic titles, and canonical links on the server without client layout shifts.',
    code: `// src/app/blogs/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: [{ url: post?.coverImage }],
    },
  };
}`,
    file: 'src/app/blogs/[slug]/page.tsx',
  },
];

export default function FeaturesPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
        <div className="hero-pill">
          <Code2 size={16} />
          Architecture & Feature Matrix
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-main)' }}>
          Next.js 16 Modern Features
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Here is a breakdown of the modern architectural features powering this blog management application, highlighting why each feature is beneficial.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {FEATURES.map((item, index) => (
          <div key={item.id} className="card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  background: `${item.badgeColor}22`,
                  color: item.badgeColor,
                  border: `1px solid ${item.badgeColor}55`,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {item.badge}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                File: {item.file}
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {index + 1}. {item.title}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.25rem' }}>
              {item.summary}
            </p>

            <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                Why This Feature Is Helpful:
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: 1.6 }}>
                {item.whyHelpful}
              </p>
            </div>

            <pre style={{ background: '#070b12', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem' }}>
              <code style={{ color: '#e2e8f0', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                {item.code}
              </code>
            </pre>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Explore the Full Markdown Documentation
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          Check out <code style={{ color: 'var(--accent-cyan)' }}>NEXTJS_FEATURES_GUIDE.md</code> in the repository root for detailed code samples, comparisons, and best practices.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/dashboard" className="btn btn-primary">
            Try Blog Management Dashboard
            <ArrowRight size={16} />
          </Link>
          <Link href="/blogs" className="btn btn-secondary">
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
