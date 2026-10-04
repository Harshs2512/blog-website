'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from '@/components/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Caught Error:', error);
  }, [error]);

  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '4rem' }}>
      <div style={{ maxWidth: '520px' }}>
        <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', borderRadius: '16px', background: 'rgba(244, 63, 94, 0.15)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RefreshCw size={28} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
          Something went wrong
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          An unexpected error occurred while rendering this page or processing server action mutations.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => reset()} className="btn btn-primary">
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            <ArrowLeft size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
