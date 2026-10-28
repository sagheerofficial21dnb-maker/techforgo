import React, { useState } from 'react';
import { POSTS, CATEGORIES } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, onNavigate, onSearchSubmit }) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug) || {
    name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    slug: categorySlug,
    description: 'Technical coverage and architectural teardowns in this specialized domain.',
    count: 0,
  };

  const matchingPosts = POSTS.filter((p) => p.categorySlug === categorySlug);

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-4">
      <Breadcrumbs
        items={[{ label: 'Blog', path: '/blog' }, { label: categoryInfo.name }]}
        onNavigate={onNavigate}
      />

      <header className="mb-8 p-6 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl shadow-xs transition-colors duration-300 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#713F12] mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[#991B1B]">Discipline Archive</span>
            <span aria-hidden="true">&middot;</span>
            <span>{matchingPosts.length} Technical Dispatches</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-1">
            {categoryInfo.name}
          </h1>
          <p className="text-sm text-[#5A4016] max-w-xl">
            {categoryInfo.description}
          </p>
        </div>

        {/* View Switcher: Grid vs List */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#CA8A04] rounded-lg self-start sm:self-auto shrink-0 shadow-2xs">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              layoutMode === 'grid'
                ? 'bg-[#FEF08A] text-[#1A1A1A] shadow-xs'
                : 'text-[#713F12] hover:text-[#1A1A1A]'
            }`}
            aria-label="Grid layout"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            onClick={() => setLayoutMode('list')}
            className={`p-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              layoutMode === 'list'
                ? 'bg-[#FEF08A] text-[#1A1A1A] shadow-xs'
                : 'text-[#713F12] hover:text-[#1A1A1A]'
            }`}
            aria-label="List layout"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </header>

      {/* Two-Column Layout (70% Main Content, 30% Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10">
        <div className="lg:col-span-7">
          {matchingPosts.length > 0 ? (
            layoutMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {matchingPosts.map((post) => (
                  <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {matchingPosts.map((post) => (
                  <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="list" />
                ))}
              </div>
            )
          ) : (
            <div className="p-12 text-center bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No publications yet</h3>
              <p className="text-sm text-[#666666] mb-4">
                Research manuscripts in this discipline are currently in peer review.
              </p>
              <button
                onClick={() => onNavigate('/')}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0066CC] rounded"
              >
                Return Home
              </button>
            </div>
          )}
        </div>

        {/* 30% Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
    </div>
  );
};
