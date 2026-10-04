'use client';

import React, { useState, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, BlogCategory, BlogStatus } from '@/lib/types';
import { createPostAction, updatePostAction } from '@/app/actions/blog-actions';
import { SubmitButton } from './SubmitButton';
import { BookOpen, Sparkles, Eye, Edit3, ArrowLeft } from './icons';
import Link from 'next/link';

interface PostFormProps {
  post?: BlogPost;
}

const CATEGORIES: BlogCategory[] = ['Engineering', 'Architecture', 'Design', 'AI & Tech', 'Tutorials'];

const PRESET_IMAGES = [
  { label: 'Next.js Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Abstract AI', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Cyber Minimal', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Neural Mesh', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Cloud Stream', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80' },
];

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(post);

  // Form action binding
  const boundAction = isEditing
    ? updatePostAction.bind(null, post!.id)
    : createPostAction;

  const [state, formAction] = useActionState(boundAction, null);

  // Local state for live preview
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState<BlogCategory>(post?.category || 'Engineering');
  const [coverImage, setCoverImage] = useState(post?.coverImage || PRESET_IMAGES[0].url);
  const [status, setStatus] = useState<BlogStatus>(post?.status || 'published');
  const [featured, setFeatured] = useState<boolean>(post?.featured || false);
  const [tags, setTags] = useState(post?.tags.join(', ') || 'Next.js 16, React 19');
  const [authorName, setAuthorName] = useState(post?.author.name || 'Harsh Vardhan');
  const [authorRole, setAuthorRole] = useState(post?.author.role || 'Full-Stack Architect');

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <Link href="/dashboard" className="btn btn-outline btn-sm">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`btn btn-sm ${activeTab === 'editor' ? 'btn-secondary' : 'btn-outline'}`}
          >
            <Edit3 size={15} />
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`btn btn-sm ${activeTab === 'preview' ? 'btn-secondary' : 'btn-outline'}`}
          >
            <Eye size={15} />
            Live Preview
          </button>
        </div>
      </div>

      {state?.message && (
        <div className={`alert-box ${state.success ? 'alert-success' : 'alert-error'}`}>
          {state.success ? <Sparkles size={18} /> : <BookOpen size={18} />}
          <span>{state.message}</span>
        </div>
      )}

      {activeTab === 'editor' ? (
        <form action={formAction} className="form-card">
          <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Handled via React 19 <code style={{ color: 'var(--accent-cyan)' }}>useActionState</code> and Next.js Server Action
            </p>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">Article Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Full-Stack Engineering with Next.js 16"
              className="form-input"
            />
            {state?.errors?.title && (
              <p className="form-error">{state.errors.title[0]}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label className="form-label" htmlFor="excerpt">Short Summary / Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence hook for cards and SEO descriptions..."
              className="form-textarea"
              style={{ minHeight: '80px' }}
            />
            {state?.errors?.excerpt && (
              <p className="form-error">{state.errors.excerpt[0]}</p>
            )}
          </div>

          {/* Category & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="form-label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="form-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" htmlFor="status">Publish Status</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogStatus)}
                className="form-select"
              >
                <option value="published">Published (Visible to readers)</option>
                <option value="draft">Draft (Saved privately)</option>
              </select>
            </div>
          </div>

          {/* Cover Image Presets & Input */}
          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {PRESET_IMAGES.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setCoverImage(img.url)}
                  className={`btn btn-sm ${coverImage === img.url ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {img.label}
                </button>
              ))}
            </div>
            <input
              name="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Custom image URL (https://...)"
              className="form-input"
            />
          </div>

          {/* Content Body */}
          <div className="form-group">
            <label className="form-label" htmlFor="content">Article Body (Supports Markdown & Sections)</label>
            <textarea
              id="content"
              name="content"
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here. Use ## Headings, code blocks, and paragraphs..."
              className="form-textarea"
            />
            {state?.errors?.content && (
              <p className="form-error">{state.errors.content[0]}</p>
            )}
            <p className="form-helper">Tip: You can preview formatted output instantly using the 'Live Preview' tab.</p>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label className="form-label" htmlFor="tags">Tags (Comma-separated)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Next.js 16, React 19, Server Actions, Turbopack"
              className="form-input"
            />
          </div>

          {/* Author Details & Featured */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="form-label" htmlFor="authorName">Author Name</label>
              <input
                id="authorName"
                name="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="authorRole">Author Role</label>
              <input
                id="authorRole"
                name="authorRole"
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="form-input"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.8rem' }}>
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
              <label htmlFor="featured" style={{ fontSize: '0.9rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                Featured on Homepage
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link href="/dashboard" className="btn btn-secondary">
              Cancel
            </Link>
            <SubmitButton
              label={isEditing ? 'Save Changes' : 'Create Article'}
              pendingLabel={isEditing ? 'Updating...' : 'Publishing...'}
            />
          </div>
        </form>
      ) : (
        /* Live Preview Mode */
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="badge badge-category">{category}</span>
            <span className={`badge ${status === 'published' ? 'badge-published' : 'badge-draft'}`} style={{ marginLeft: '0.5rem' }}>
              {status}
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {title || 'Untitled Blog Post'}
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
            {excerpt || 'Your article excerpt will appear here.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {authorName.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{authorName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{authorRole}</div>
            </div>
          </div>

          {coverImage && (
            <div style={{ width: '100%', height: '360px', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#cbd5e1', fontSize: '1.05rem' }}>
            {content || 'Start typing in the editor to see your live preview content here...'}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
