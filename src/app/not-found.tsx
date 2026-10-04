import Link from 'next/link';
import { ArrowLeft, BookOpen } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '4rem' }}>
      <div style={{ maxWidth: '500px' }}>
        <div className="brand-icon-box" style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', borderRadius: '16px' }}>
          <BookOpen size={32} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Article or Page Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The article or resource you are looking for might have been moved, deleted, or never existed in the database.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            Return Home
          </Link>
          <Link href="/blogs" className="btn btn-secondary">
            Browse All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
