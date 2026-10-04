'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from './icons';

const CATEGORIES = ['All', 'Engineering', 'Architecture', 'Design', 'AI & Tech', 'Tutorials'];

export function FilterBar({ currentCategory = 'All', currentSearch = '' }: { currentCategory?: string; currentSearch?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleCategorySelect = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="filter-bar">
      <div className="search-input-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search articles by title, tags, or author..."
          defaultValue={currentSearch}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div className="category-pills">
          {CATEGORIES.map((cat) => {
            const active = (currentCategory === cat) || (!currentCategory && cat === 'All');
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`category-pill-btn ${active ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {isPending && (
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
            Filtering results...
          </span>
        )}
      </div>
    </div>
  );
}
