'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, Plus, Sparkles, Code2 } from './icons';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link href="/" className="brand-logo">
          <div className="brand-icon-box">
            <BookOpen size={20} />
          </div>
          <span className="brand-title">BlogSphere</span>
        </Link>

        <nav className="nav-links">
          <Link
            href="/"
            className={`nav-link ${isActive('/') && pathname === '/' ? 'active' : ''}`}
          >
            Explore
          </Link>
          <Link
            href="/blogs"
            className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}
          >
            All Articles
          </Link>
          <Link
            href="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <LayoutDashboard size={16} />
              Dashboard
            </span>
          </Link>
          <Link
            href="/features"
            className={`nav-link ${isActive('/features') ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Code2 size={16} color="#38bdf8" />
              Next.js 16 Features
            </span>
          </Link>
        </nav>

        <div className="nav-actions">
          <Link href="/dashboard/new" className="btn btn-primary btn-sm">
            <Plus size={16} />
            Write Post
          </Link>
        </div>
      </div>
    </header>
  );
}
