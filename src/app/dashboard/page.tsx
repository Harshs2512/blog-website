import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getBlogStats } from '@/lib/blogs';
import { ToggleStatusButton } from '@/components/ToggleStatusButton';
import { DeletePostButton } from '@/components/DeletePostButton';
import { ResetDemoButton } from '@/components/ResetDemoButton';
import {
  Plus,
  BookOpen,
  Eye,
  Heart,
  Clock,
  Edit3,
  ArrowRight,
  Sparkles,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Blog Management Dashboard',
  description: 'Manage, edit, publish, and analyze all blog posts.',
};

interface DashboardProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const resolved = await searchParams;
  const statusFilter = typeof resolved.status === 'string' ? resolved.status : 'all';

  const [posts, stats] = await Promise.all([
    getAllPosts({ status: statusFilter }),
    getBlogStats(),
  ]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      {/* Dashboard Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Blogs Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Publish, edit, delete, and monitor engagement across your publication.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ResetDemoButton />
          <Link href="/dashboard/new" className="btn btn-primary">
            <Plus size={18} />
            Create New Post
          </Link>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <BookOpen size={22} />
          </div>
          <div className="stat-val">{stats.total}</div>
          <div className="stat-label">Total Articles</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Sparkles size={22} />
          </div>
          <div className="stat-val">{stats.published}</div>
          <div className="stat-label">Active Published</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Clock size={22} />
          </div>
          <div className="stat-val">{stats.drafts}</div>
          <div className="stat-label">Unpublished Drafts</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Eye size={22} />
          </div>
          <div className="stat-val">{stats.totalViews.toLocaleString()}</div>
          <div className="stat-label">Cumulative Views</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <Heart size={22} />
          </div>
          <div className="stat-val">{stats.totalLikes.toLocaleString()}</div>
          <div className="stat-label">Total Likes</div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            href="/dashboard?status=all"
            className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All ({stats.total})
          </Link>
          <Link
            href="/dashboard?status=published"
            className={`btn btn-sm ${statusFilter === 'published' ? 'btn-primary' : 'btn-outline'}`}
          >
            Published ({stats.published})
          </Link>
          <Link
            href="/dashboard?status=draft"
            className={`btn btn-sm ${statusFilter === 'draft' ? 'btn-primary' : 'btn-outline'}`}
          >
            Drafts ({stats.drafts})
          </Link>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          Tip: Click the status badge to instantly toggle between Published and Draft via Server Action.
        </div>
      </div>

      {/* Management Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Article</th>
              <th>Category</th>
              <th>Status (Click to toggle)</th>
              <th>Engagement</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No articles found in this category. Click 'Create New Post' to add one.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link href={`/blogs/${post.slug}`} className="table-post-title">
                      {post.title}
                    </Link>
                    <div className="table-post-meta">
                      by {post.author.name} · {post.readingTimeMinutes} min read
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{post.category}</span>
                  </td>
                  <td>
                    <ToggleStatusButton postId={post.id} currentStatus={post.status} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Eye size={14} />
                        {post.views}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Heart size={14} color="#f43f5e" />
                        {post.likes}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="btn btn-outline btn-sm"
                        title="View Live"
                        style={{ padding: '0.35rem 0.5rem' }}
                      >
                        <ArrowRight size={15} />
                      </Link>
                      <Link
                        href={`/dashboard/edit/${post.id}`}
                        className="btn btn-secondary btn-sm"
                        title="Edit Article"
                        style={{ padding: '0.35rem 0.5rem' }}
                      >
                        <Edit3 size={15} />
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
