import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, getFeaturedPosts, getBlogStats } from '@/lib/blogs';
import { PostCard } from '@/components/PostCard';
import { FilterBar } from '@/components/FilterBar';
import {
  Sparkles,
  Rocket,
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Code2,
  Clock,
  Eye,
  Heart,
} from '@/components/icons';

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // In Next.js 15+, searchParams is a Promise
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';

  const [posts, featuredPosts, stats] = await Promise.all([
    getPublishedPosts({ search: q, category }),
    getFeaturedPosts(),
    getBlogStats(),
  ]);

  const spotlightPost = featuredPosts[0] || posts[0];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-pill">
          <Sparkles size={15} />
          Built with Next.js 16 & React 19 Server Components
        </div>
        <h1 className="hero-title">
          Modern Knowledge & <br />
          <span className="hero-title-highlight">Full-Stack Blog Engine</span>
        </h1>
        <p className="hero-desc">
          Craft, publish, and manage production-ready articles with instant Turbopack compilation, React 19 Server Actions, and asynchronous App Router data fetching.
        </p>
        <div className="hero-actions">
          <Link href="/dashboard/new" className="btn btn-primary">
            <Rocket size={18} />
            Write an Article
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            <LayoutDashboard size={18} />
            Manage Dashboard
          </Link>
          <Link href="/features" className="btn btn-outline">
            <Code2 size={18} />
            Next.js Architecture Guide
          </Link>
        </div>
      </section>

      {/* Metric Stats Banner */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <BookOpen size={22} />
          </div>
          <div className="stat-val">{stats.published}</div>
          <div className="stat-label">Published Articles</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Clock size={22} />
          </div>
          <div className="stat-val">{stats.drafts}</div>
          <div className="stat-label">Drafts in Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Eye size={22} />
          </div>
          <div className="stat-val">{stats.totalViews.toLocaleString()}</div>
          <div className="stat-label">Total Article Reads</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <Heart size={22} />
          </div>
          <div className="stat-val">{stats.totalLikes.toLocaleString()}</div>
          <div className="stat-label">Community Likes</div>
        </div>
      </section>

      {/* Spotlight Featured Post (if not filtering) */}
      {!q && !category && spotlightPost && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="#38bdf8" />
              Featured Spotlight
            </h2>
            <span className="badge badge-category">Editor's Pick</span>
          </div>

          <div
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', minHeight: '300px' }}>
              <Image
                src={spotlightPost.coverImage}
                alt={spotlightPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <span className="badge badge-category">{spotlightPost.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} />
                  {spotlightPost.readingTimeMinutes} min read
                </span>
              </div>
              <Link href={`/blogs/${spotlightPost.slug}`}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {spotlightPost.title}
                </h3>
              </Link>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {spotlightPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Image
                    src={spotlightPost.author.avatar}
                    alt={spotlightPost.author.name}
                    width={40}
                    height={40}
                    className="post-author-avatar"
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{spotlightPost.author.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{spotlightPost.author.role}</div>
                  </div>
                </div>
                <Link href={`/blogs/${spotlightPost.slug}`} className="btn btn-primary btn-sm">
                  Read Article
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Explore Articles
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Showing {posts.length} published {posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        <FilterBar currentCategory={category} currentSearch={q} />

        {posts.length === 0 ? (
          <div className="card" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <BookOpen size={40} color="var(--text-dim)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No articles match your criteria</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Try searching for different keywords or clear the category filters.
            </p>
            <Link href="/" className="btn btn-secondary btn-sm">
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Architecture Highlights Banner */}
      <section
        className="card"
        style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(56, 189, 248, 0.08) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.25)',
          marginTop: '4rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="badge badge-category" style={{ marginBottom: '0.75rem' }}>Under the Hood</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Engineered with Modern Next.js 16 Features
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              This app leverages Async Request APIs (<code style={{ color: 'var(--accent-cyan)' }}>await searchParams</code>, <code style={{ color: 'var(--accent-cyan)' }}>await params</code>), React 19 form actions with <code style={{ color: 'var(--accent-cyan)' }}>useActionState</code>, streaming Suspense, and Turbopack compilation.
            </p>
          </div>
          <Link href="/features" className="btn btn-primary">
            Explore Feature Breakdown
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
