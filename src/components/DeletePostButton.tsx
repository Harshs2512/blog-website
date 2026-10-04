'use client';

import React, { useState, useTransition } from 'react';
import { deletePostAction } from '@/app/actions/blog-actions';
import { Trash2 } from './icons';

export function DeletePostButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePostAction(postId);
      setIsConfirming(false);
    });
  };

  if (isConfirming) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="btn btn-danger btn-sm"
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
        >
          {isPending ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          disabled={isPending}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="btn btn-outline btn-sm"
      style={{ padding: '0.35rem 0.5rem', color: '#f87171' }}
      title={`Delete "${postTitle}"`}
    >
      <Trash2 size={15} />
    </button>
  );
}
