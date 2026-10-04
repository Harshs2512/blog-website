'use client';

import React, { useTransition } from 'react';
import { resetDemoAction } from '@/app/actions/blog-actions';
import { RefreshCw } from './icons';

export function ResetDemoButton() {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (confirm('Reset blog data to default demo posts? Any custom changes will be replaced.')) {
      startTransition(async () => {
        await resetDemoAction();
      });
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isPending}
      className="btn btn-outline btn-sm"
      title="Restore sample posts"
    >
      <RefreshCw size={14} className={isPending ? 'spin-animation' : ''} />
      <span>{isPending ? 'Resetting...' : 'Reset Demo Data'}</span>
    </button>
  );
}
