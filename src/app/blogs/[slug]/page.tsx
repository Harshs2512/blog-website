import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPublishedPosts, incrementPostViews } from '@/lib/blogs';
import { LikeButton } from '@/components/LikeButton';
import { PostCard } from '@/components/PostCard';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  Edit3,
  Share2,
} from '@/components/icons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Next.js 15+ Async Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  // In Next.js 15 & 16, params is a Promise
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Increment views
  await incrementPostViews(post.id);

  // Fetch related posts from same category
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="container" style={{ paddingTop: '2rem' }}>
      {/* Navigation & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <Link href="/blogs" className="btn btn-outline btn-sm">
          <ArrowLeft size={16} />
          Back to Articles
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href={`/dashboard/edit/${post.id}`} className="btn btn-secondary btn-sm">
            <Edit3 size={15} />
            Edit Post
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="article-header">
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-category">{post.category}</span>
          <span className={`badge ${post.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
            {post.status}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} />
            {formattedDate}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} />
            {post.readingTimeMinutes} min read
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Eye size={14} />
            {post.views} views
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
          {post.title}
        </h1>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
          {post.excerpt}
        </p>

        {/* Author Bio Box */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="post-author-avatar"
              style={{ width: '48px', height: '48px' }}
            />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{post.author.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{post.author.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LikeButton postId={post.id} initialLikes={post.likes} />
          </div>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="article-hero-img-wrap">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={600}
          className="article-hero-img"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="article-body">
        {post.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('## ')) {
            return <h2 key={idx}>{block.replace('## ', '')}</h2>;
          }
          if (block.startsWith('### ')) {
            return <h3 key={idx}>{block.replace('### ', '')}</h3>;
          }
          if (block.startsWith('```')) {
            const lines = block.split('\n');
            const code = lines.slice(1, -1).join('\n');
            return (
              <pre key={idx}>
                <code>{code}</code>
              </pre>
            );
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n').map((l) => l.replace(/^- /, ''));
            return (
              <ul key={idx}>
                {items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{block}</p>;
        })}

        {/* Tags Section */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>TAGS:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Related Articles
          </h2>
          <div className="posts-grid">
            {relatedPosts.map((related) => (
              <PostCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
