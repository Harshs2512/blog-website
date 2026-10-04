import { BlogPost, BlogCategory, BlogFilter, BlogStats } from './types';
import fs from 'fs';
import path from 'path';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'mastering-nextjs-16-turbopack-app-router',
    title: 'Mastering Next.js 16: Turbopack, Async APIs & Production Patterns',
    excerpt: 'Explore how Next.js 16 stabilizes Turbopack for lightning-fast builds, makes request APIs asynchronous, and revolutionizes full-stack React architecture.',
    content: `## The Evolution of Full-Stack React

Next.js 16 marks a monumental milestone in modern web development. With **Turbopack enabled by default** in both development and production builds, bundling and compilation reach speeds up to 10x faster than traditional Webpack pipelines.

### Why Asynchronous Request APIs Matter

One of the foundational architectural changes in modern Next.js is that request-dependent APIs are now strictly asynchronous:

\`\`\`tsx
// Modern Next.js 15 & 16:
export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { slug } = await params;
  const filters = await searchParams;
  return <ArticleView slug={slug} filters={filters} />;
}
\`\`\`

By treating \`params\` and \`searchParams\` as promises, Next.js enables **Partial Prerendering (PPR)** and smarter streaming architectures. The server can start rendering static shells without waiting for incoming dynamic request headers.

### React 19 Integration

React 19 brings native support for form handling and actions through hooks like:
- \`useActionState\`: Streamlines form submissions and action states.
- \`useFormStatus\`: Provides live loading states for child submit buttons without prop drilling.
- \`useOptimistic\`: Immediate UI feedback before server confirmation.

Combine these with Server Actions (\`'use server'\`), and full-stack mutations become clean, type-safe, and free of boilerplate API routes!`,
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Principal Web Architect',
    },
    category: 'Engineering',
    tags: ['Next.js 16', 'React 19', 'Turbopack', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    status: 'published',
    featured: true,
    views: 3420,
    likes: 215,
    readingTimeMinutes: 6,
    createdAt: '2026-09-15T10:30:00.000Z',
    updatedAt: '2026-09-20T14:10:00.000Z',
    publishedAt: '2026-09-15T12:00:00.000Z',
  },
  {
    id: 'post-2',
    slug: 'react-19-actions-and-server-components-deep-dive',
    title: 'React 19 Server Actions & Server Components Deep Dive',
    excerpt: 'Demystifying how Server Components and Server Actions collaborate to eliminate client-side state boilerplate and deliver zero-bundle overhead.',
    content: `## Beyond Traditional Client Fetching

For years, React developers wrote \`useEffect\`, created \`fetch()\` wrappers, managed loading spinners, and synced query caches with external stores.

### Server Actions: Mutations as First-Class Citizens

Server Actions allow you to define server-executed functions that can be invoked directly from forms or client transitions:

\`\`\`tsx
// app/actions.ts
'use server'

export async function createBlogPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  await db.post.create({ data: { title } });
  revalidatePath('/blogs');
  return { success: true };
}
\`\`\`

### Form Submission with \`useActionState\`

\`\`\`tsx
'use client'
import { useActionState } from 'react';
import { createBlogPost } from './actions';

export function CreateBlogForm() {
  const [state, formAction, isPending] = useActionState(createBlogPost, null);

  return (
    <form action={formAction}>
      <input name="title" required />
      <button disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  );
}
\`\`\`

### Automatic Revalidation

With \`revalidatePath\`, Next.js purges the server cache for that route and automatically streams the updated Server Component payload back to the client. Zero stale client caches, zero manual refetches!`,
    author: {
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'Staff Frontend Engineer',
    },
    category: 'Architecture',
    tags: ['React 19', 'Server Actions', 'Data Fetching'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    status: 'published',
    featured: true,
    views: 2890,
    likes: 184,
    readingTimeMinutes: 5,
    createdAt: '2026-09-18T09:00:00.000Z',
    updatedAt: '2026-09-18T09:00:00.000Z',
    publishedAt: '2026-09-18T09:30:00.000Z',
  },
  {
    id: 'post-3',
    slug: 'designing-modern-design-systems-with-vanilla-css',
    title: 'Designing High-Performance Design Systems with Pure CSS Tokens',
    excerpt: 'Why modern CSS custom properties, color-mix, and subgrid provide greater long-term resilience and build performance than heavy CSS utility runtimes.',
    content: `## The Modern CSS Renaissance

CSS has evolved dramatically. Features like CSS Custom Properties (variables), \`color-mix()\`, container queries, and native nesting provide incredible expressiveness without requiring preprocessors or heavyweight styling engines.

### Token Architecture

A robust token architecture separates semantic intent from raw values:

\`\`\`css
:root {
  /* Primitive Tokens */
  --slate-900: #0f172a;
  --indigo-500: #6366f1;
  --cyan-400: #38bdf8;

  /* Semantic Tokens */
  --bg-primary: var(--slate-900);
  --accent-glow: linear-gradient(135deg, var(--indigo-500), var(--cyan-400));
  --border-subtle: rgba(255, 255, 255, 0.08);
}
\`\`\`

### Glassmorphism & Depth

To create interfaces that feel tactile and deep, combine background blurs with subtle inset shadows and gradient borders:

\`\`\`css
.card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.4);
}
\`\`\`

This delivers 60fps hardware-accelerated animations with minimal bundle size!`,
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Design Technologist',
    },
    category: 'Design',
    tags: ['Design Systems', 'CSS Tokens', 'Glassmorphism', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    status: 'published',
    featured: false,
    views: 1940,
    likes: 142,
    readingTimeMinutes: 4,
    createdAt: '2026-09-22T14:00:00.000Z',
    updatedAt: '2026-09-22T14:00:00.000Z',
    publishedAt: '2026-09-22T14:15:00.000Z',
  },
  {
    id: 'post-4',
    slug: 'ai-agents-code-generation-in-modern-workspaces',
    title: 'Building Intelligent AI Agents for Automated Workspace Workflows',
    excerpt: 'How autonomous AI coding agents read context, execute commands, verify builds, and deliver production-ready software solutions with verifiable confidence.',
    content: `## The Next Frontier: Agentic Engineering

Autonomous software engineering agents don't simply autocomplete text; they analyze multi-file architectures, plan dependency changes, verify builds, and run automated browser tests.

### Key Capabilities of Modern AI Agents

1. **Deterministic Verification**: Running \`npm run build\` and lint tests after code edits to verify zero regressions.
2. **Context-Aware Navigation**: Scanning configuration files, documentation, and dependencies before attempting modifications.
3. **Structured Mutation**: Employing targeted multi-line replacements and atomic file operations.

### Future Perspectives

As frameworks like Next.js evolve with dedicated guides like \`AGENTS.md\` and version-matched bundled docs, AI agents can read precise local version requirements directly from \`node_modules/next/dist/docs/\`, avoiding outdated training heuristics.`,
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'AI Systems Researcher',
    },
    category: 'AI & Tech',
    tags: ['AI Agents', 'Automation', 'Developer Experience'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
    status: 'published',
    featured: false,
    views: 4120,
    likes: 388,
    readingTimeMinutes: 7,
    createdAt: '2026-09-25T11:20:00.000Z',
    updatedAt: '2026-09-28T16:00:00.000Z',
    publishedAt: '2026-09-25T12:00:00.000Z',
  },
  {
    id: 'post-5',
    slug: 'zero-config-streaming-and-suspense-in-nextjs',
    title: 'Instant Navigation: Zero-Config Streaming and Suspense in Next.js',
    excerpt: 'Leverage loading.tsx and React Suspense boundaries to render instant visual skeletons while heavy database queries stream smoothly into the DOM.',
    content: `## The End of White Screens

Users hate waiting for full page reloads. With traditional server-side rendering (SSR), if one slow query takes 800ms, the entire browser page waits.

### Enter App Router Streaming

Next.js App Router integrates React Suspense at the route layout level:

\`\`\`tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
\`\`\`

When a user navigates to \`/dashboard\`:
1. The shared \`layout.tsx\` remains mounted.
2. Next.js instantly swaps the page content with \`loading.tsx\`.
3. The server asynchronously executes \`page.tsx\`.
4. As HTML chunks become available, they are streamed down the wire and hydrated instantly.

No client-side state machines required!`,
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Full-Stack Lead',
    },
    category: 'Tutorials',
    tags: ['Streaming', 'Suspense', 'App Router', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    status: 'draft',
    featured: false,
    views: 120,
    likes: 12,
    readingTimeMinutes: 4,
    createdAt: '2026-10-01T08:15:00.000Z',
    updatedAt: '2026-10-01T08:15:00.000Z',
  },
  {
    id: 'post-6',
    slug: 'dynamic-seo-metadata-open-graph-in-nextjs',
    title: 'Dynamic SEO & OpenGraph Generation with Next.js Metadata API',
    excerpt: 'Master generateMetadata to create automated social preview cards, dynamic canonical tags, and rich structured JSON-LD data for your blog articles.',
    content: `## Why Metadata is Crucial

In the modern web, every article needs search engine discoverability and engaging rich previews on platforms like Twitter, LinkedIn, and Discord.

### Using \`generateMetadata\`

Next.js provides a first-class \`generateMetadata\` function in dynamic route segments:

\`\`\`tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: \`\${post.title} | BlogCraft\`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}
\`\`\`

Next.js automatically streams the corresponding \`<title>\`, \`<meta>\`, and OpenGraph tags into the document head before the page is served!`,
    author: {
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'Staff Frontend Engineer',
    },
    category: 'Engineering',
    tags: ['SEO', 'Metadata', 'OpenGraph', 'Web Standards'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    status: 'draft',
    featured: false,
    views: 85,
    likes: 9,
    readingTimeMinutes: 5,
    createdAt: '2026-10-03T15:40:00.000Z',
    updatedAt: '2026-10-03T15:40:00.000Z',
  },
];

// Persistent file path to store data between hot-reloads and requests
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'blogs.json');

// In-memory fallback
let inMemoryPosts: BlogPost[] = [...INITIAL_POSTS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_POSTS, null, 2), 'utf8');
      inMemoryPosts = [...INITIAL_POSTS];
    } else {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      inMemoryPosts = JSON.parse(content);
    }
  } catch {
    // If file operations fail, keep using in-memory store
  }
}

function savePosts() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inMemoryPosts, null, 2), 'utf8');
  } catch {
    // Keep in memory
  }
}

// Initialize on module load
ensureDataFile();

export async function getAllPosts(filter?: BlogFilter): Promise<BlogPost[]> {
  ensureDataFile();
  let list = [...inMemoryPosts];

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.name.toLowerCase().includes(q)
    );
  }

  if (filter?.category && filter.category !== 'All') {
    list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((p) => p.status === filter.status);
  }

  // Sort
  if (filter?.sortBy === 'oldest') {
    list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (filter?.sortBy === 'views') {
    list.sort((a, b) => b.views - a.views);
  } else if (filter?.sortBy === 'likes') {
    list.sort((a, b) => b.likes - a.likes);
  } else {
    // newest default
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return list;
}

export async function getPublishedPosts(filter?: Omit<BlogFilter, 'status'>): Promise<BlogPost[]> {
  return getAllPosts({ ...filter, status: 'published' });
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.featured);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureDataFile();
  const post = inMemoryPosts.find((p) => p.slug === slug);
  return post || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  ensureDataFile();
  const post = inMemoryPosts.find((p) => p.id === id);
  return post || null;
}

export async function createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): Promise<BlogPost> {
  ensureDataFile();
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    ...data,
    id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    views: 0,
    likes: 0,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === 'published' ? now : undefined,
  };

  inMemoryPosts.unshift(newPost);
  savePosts();
  return newPost;
}

export async function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'views' | 'likes'>>
): Promise<BlogPost | null> {
  ensureDataFile();
  const index = inMemoryPosts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = inMemoryPosts[index];
  const now = new Date().toISOString();

  let publishedAt = current.publishedAt;
  if (data.status === 'published' && !publishedAt) {
    publishedAt = now;
  }

  const updated: BlogPost = {
    ...current,
    ...data,
    updatedAt: now,
    publishedAt,
  };

  inMemoryPosts[index] = updated;
  savePosts();
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  ensureDataFile();
  const index = inMemoryPosts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  inMemoryPosts.splice(index, 1);
  savePosts();
  return true;
}

export async function togglePostStatus(id: string): Promise<BlogPost | null> {
  ensureDataFile();
  const post = inMemoryPosts.find((p) => p.id === id);
  if (!post) return null;

  const nextStatus = post.status === 'published' ? 'draft' : 'published';
  return updatePost(id, { status: nextStatus });
}

export async function likePost(id: string): Promise<number | null> {
  ensureDataFile();
  const post = inMemoryPosts.find((p) => p.id === id);
  if (!post) return null;

  post.likes += 1;
  savePosts();
  return post.likes;
}

export async function incrementPostViews(id: string): Promise<number | null> {
  ensureDataFile();
  const post = inMemoryPosts.find((p) => p.id === id);
  if (!post) return null;

  post.views += 1;
  savePosts();
  return post.views;
}

export async function getBlogStats(): Promise<BlogStats> {
  ensureDataFile();
  const total = inMemoryPosts.length;
  const published = inMemoryPosts.filter((p) => p.status === 'published').length;
  const drafts = inMemoryPosts.filter((p) => p.status === 'draft').length;
  const totalViews = inMemoryPosts.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = inMemoryPosts.reduce((acc, p) => acc + p.likes, 0);

  const categories: Record<string, number> = {};
  for (const post of inMemoryPosts) {
    categories[post.category] = (categories[post.category] || 0) + 1;
  }

  return {
    total,
    published,
    drafts,
    totalViews,
    totalLikes,
    categories,
  };
}

export async function resetToDemoData(): Promise<void> {
  inMemoryPosts = [...INITIAL_POSTS];
  savePosts();
}
