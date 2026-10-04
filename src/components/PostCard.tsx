import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { Clock, Eye, Heart } from './icons';

interface PostCardProps {
  post: BlogPost;
  showStatus?: boolean;
}

export function PostCard({ post, showStatus = false }: PostCardProps) {
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={`/blogs/${post.slug}`} className="post-card-image-wrap">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="post-card-img"
          loading="lazy"
        />
        {showStatus && (
          <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 2 }}>
            <span className={`badge ${post.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
              {post.status}
            </span>
          </div>
        )}
      </Link>

      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="badge badge-category">{post.category}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <Clock size={13} />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <Link href={`/blogs/${post.slug}`}>
          <h3 className="post-card-title">{post.title}</h3>
        </Link>

        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <div className="post-card-author">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="post-author-avatar"
            />
            <div>
              <div className="post-author-name">{post.author.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{post.author.role}</div>
            </div>
          </div>

          <div className="post-card-stats">
            <span className="post-stat-item" title="Views">
              <Eye size={14} />
              {post.views}
            </span>
            <span className="post-stat-item" title="Likes">
              <Heart size={14} color="#f43f5e" />
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
