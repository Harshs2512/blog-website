import React from 'react';
import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/blogs';
import { PostCard } from '@/components/PostCard';
import { FilterBar } from '@/components/FilterBar';
import { BookOpen } from '@/components/icons';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Explore the complete directory of engineering, design, and architecture articles.',
};

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  // In Next.js 15+, searchParams is a Promise
  const resolved = await searchParams;
  const q = typeof resolved.q === 'string' ? resolved.q : '';
  const category = typeof resolved.category === 'string' ? resolved.category : '';
  const sortBy = (typeof resolved.sortBy === 'string' ? resolved.sortBy : 'newest') as
    | 'newest'
    | 'oldest'
    | 'views'
    | 'likes';

  const posts = await getPublishedPosts({ search: q, category, sortBy });

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Articles Catalog
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Discover cutting-edge insights, technical deep-dives, and tutorials.
        </p>
      </div>

      <FilterBar currentCategory={category} currentSearch={q} />

      {posts.length === 0 ? (
        <div className="card" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <BookOpen size={40} color="var(--text-dim)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No articles found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            No articles match the current filter criteria.
          </p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
