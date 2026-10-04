'use client';

import React, { useState, useTransition } from 'react';
import { likePostAction } from '@/app/actions/blog-actions';
import { Heart } from './icons';

export function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (liked) return;
    setLikes((prev) => prev + 1);
    setLiked(true);

    startTransition(async () => {
      const res = await likePostAction(postId);
      if (res.success) {
        setLikes(res.likes);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || isPending}
      className="btn btn-secondary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderColor: liked ? '#f43f5e' : undefined,
        background: liked ? 'rgba(244, 63, 94, 0.15)' : undefined,
        color: liked ? '#f43f5e' : 'var(--text-main)',
        cursor: liked ? 'default' : 'pointer',
      }}
    >
      <Heart size={18} fill={liked ? '#f43f5e' : 'none'} color="#f43f5e" />
      <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
}
