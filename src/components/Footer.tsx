import Link from 'next/link';
import { BookOpen, Sparkles } from './icons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon-box" style={{ width: '1.75rem', height: '1.75rem' }}>
            <BookOpen size={16} />
          </div>
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>BlogSphere</span>
          <span style={{ color: 'var(--text-dim)' }}>|</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Powered by Next.js 16 (App Router) & React 19
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
          <Link href="/blogs" style={{ color: 'var(--text-muted)' }}>Articles</Link>
          <Link href="/dashboard" style={{ color: 'var(--text-muted)' }}>Management</Link>
          <Link href="/features" style={{ color: 'var(--accent-cyan)' }}>Next.js Features Guide</Link>
        </div>
      </div>
    </footer>
  );
}
