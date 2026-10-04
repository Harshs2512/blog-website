'use client';

import React, { useState, useTransition } from 'react';
import { togglePublishAction } from '@/app/actions/blog-actions';
import { BlogStatus } from '@/lib/types';
import { CheckCircle, RefreshCw } from './icons';

export function ToggleStatusButton({ postId, currentStatus }: { postId: string; currentStatus: BlogStatus }) {
  const [status, setStatus] = useState<BlogStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextStatus = status === 'published' ? 'draft' : 'published';
    setStatus(nextStatus);

    startTransition(async () => {
      const res = await togglePublishAction(postId);
      if (res.success && res.status) {
        setStatus(res.status);
      } else {
        // Rollback on failure
        setStatus(currentStatus);
      }
    });
  };

  const isPublished = status === 'published';

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`badge ${isPublished ? 'badge-published' : 'badge-draft'}`}
      style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: 'none' }}
      title={`Click to switch to ${isPublished ? 'draft' : 'published'}`}
    >
      {isPending ? (
        <RefreshCw size={12} className="spin-animation" />
      ) : (
        <CheckCircle size={12} />
      )}
      {status}
    </button>
  );
}
