import React, { useState } from 'react';
import { POSTS } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface BlogArchiveProps {
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const BlogArchive: React.FC<BlogArchiveProps> = ({ onNavigate, onSearchSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const postsPerPage = 10; // Exactly 10 posts per page constraint!
  
  const totalPages = Math.ceil(POSTS.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = POSTS.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-4">
      <Breadcrumbs items={[{ label: 'Blog Archive' }]} onNavigate={onNavigate} />

      <header className="mb-8 p-6 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#713F12] mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[#0F172A]">Publication Archive</span>
            <span aria-hidden="true">&middot;</span>
            <span>{POSTS.length} Technical Articles</span>
            <span aria-hidden="true">&middot;</span>
            <span>10 Posts / Page</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-1">
            Blog Archive
          </h1>
          <p className="text-sm text-[#5A4016] max-w-xl">
            In-depth architectural teardowns, post-quantum hardware reviews, and distributed systems research.
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
          {layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="list" />
              ))}
            </div>
          )}

          {/* WordPress Native-Style Numeric Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-12 mb-6" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 h-10 flex items-center justify-center text-xs font-semibold rounded bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#0066CC] hover:text-[#0066CC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                &larr; Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center text-xs font-semibold rounded transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#0066CC] text-[#FFFFFF] border border-[#0066CC]'
                      : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E5E5] hover:border-[#0066CC] hover:text-[#0066CC]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 h-10 flex items-center justify-center text-xs font-semibold rounded bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#0066CC] hover:text-[#0066CC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Next &rarr;
              </button>
            </nav>
          )}

          <div className="text-center text-xs text-[#666666] mt-3">
            Showing {startIndex + 1} &ndash; {Math.min(startIndex + postsPerPage, POSTS.length)} of {POSTS.length} articles (Page {currentPage} of {totalPages})
          </div>
        </div>

        {/* 30% Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
    </div>
  );
};
