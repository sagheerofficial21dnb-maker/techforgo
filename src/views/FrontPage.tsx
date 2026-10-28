import React, { useState } from 'react';
import { POSTS, CATEGORIES } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';

interface FrontPageProps {
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({ onNavigate, onSearchSubmit }) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 12; // Exactly 12 posts per page in rows of 3 compact cards

  const totalPages = Math.ceil(POSTS.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const mainFeedPosts = POSTS.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('latest-inquiries');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group posts by key categories for Category Feeds
  const aiPosts = POSTS.filter((p) => p.categorySlug === 'artificial-intelligence').slice(0, 2);
  const cloudPosts = POSTS.filter((p) => p.categorySlug === 'cloud-infrastructure').slice(0, 2);
  const securityPosts = POSTS.filter((p) => p.categorySlug === 'cybersecurity').slice(0, 2);

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-6">
      {/* 1. Hero Introduction Banner with Beautiful High-Tech Image on the Right */}
      <section className="mb-10 p-6 sm:p-8 lg:p-10 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-2xl shadow-xs transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtext, Feature Tags & CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FEF08A] border border-[#CA8A04] text-[#713F12] text-[11px] font-extrabold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
              Engineering Journal &middot; Published Daily
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-3 leading-tight">
              In-Depth Architectural Teardowns for Modern Technologists
            </h1>

            <p className="text-sm sm:text-base text-[#422006] leading-relaxed mb-5 max-w-xl">
              Welcome to <strong className="text-[#1A1A1A]">TechForGo</strong>. Delivering peer-reviewed technical inquiries into cryogenic quantum buses, Linux kernel eBPF pipelines, post-quantum hardware enclaves, and distributed systems.
            </p>

            {/* Quick Domain Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {['Quantum Architecture', 'Linux eBPF', 'Zero-Trust Enclaves', 'Distributed Systems'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-[#F5F5F5] border border-[#E5E5E5] text-[#1A1A1A] rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => {
                  const el = document.getElementById('latest-inquiries');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#991B1B] rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-2"
              >
                <span>Explore Latest Articles</span>
                <span>&darr;</span>
              </button>
              <button
                onClick={() => onNavigate('/blog')}
                className="px-5 py-2.5 font-bold text-[#1A1A1A] bg-white border-2 border-[#CA8A04] hover:bg-[#FEF08A] rounded-lg transition-colors cursor-pointer"
              >
                Full Blog Archive (Page 1 & 2) &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful and Attractive Tech Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border-2 border-[#CA8A04] shadow-md bg-[#0F172A] group relative">
              <img
                src="/images/hero_quantum_datacenter_1791528928438.jpg"
                alt="TechForGo Quantum Computing Datacenter Lab & Cryogenic Bus Facility"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Sleek bottom status telemetry overlay */}
              <div className="p-3 bg-[#0F172A]/95 text-white flex items-center justify-between text-[11px] font-mono border-t border-[#334155]">
                <span className="text-[#FACC15] flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
                  CRYOGENIC_QBUS_LAB_01
                </span>
                <span className="text-gray-300 font-semibold">45 Gbps Active Mesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Inquiries Section (70% Content with Grid/List switcher, 30% Sidebar) */}
      <div id="latest-inquiries" className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 mb-16 scroll-mt-24">
        <div className="lg:col-span-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#E5E5E5]">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                Latest Engineering Inquiries
              </h2>
              <span className="text-xs text-[#666666]">
                Showing {startIndex + 1}&ndash;{Math.min(startIndex + postsPerPage, POSTS.length)} of {POSTS.length} Articles &middot; Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Grid vs List View Switcher */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-semibold text-[#713F12] uppercase tracking-wider hidden sm:inline">
                View:
              </span>
              <div className="inline-flex items-center p-1 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-lg shadow-2xs">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    layoutMode === 'grid'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-[#713F12] hover:text-[#0F172A] hover:bg-[#FEF08A]'
                  }`}
                  title="Grid View (3 Compact Cards / Row)"
                  aria-label="Switch to Grid View"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span>Grid</span>
                </button>

                <button
                  onClick={() => setLayoutMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    layoutMode === 'list'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-[#713F12] hover:text-[#0F172A] hover:bg-[#FEF08A]'
                  }`}
                  title="List View"
                  aria-label="Switch to List View"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Render in 3-per-row compact grid or list layout */}
          {layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 transition-all duration-300">
              {mainFeedPosts.map((post) => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 transition-all duration-300">
              {mainFeedPosts.map((post) => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="list" />
              ))}
            </div>
          )}

          {/* Pagination Navigation: Exactly 12 blogs per page */}
          <div className="mt-10 pt-6 border-t border-[#E5E5E5] flex flex-col items-center gap-4">
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 h-9 flex items-center justify-center text-xs font-bold rounded-lg bg-white border border-[#CA8A04] text-[#1A1A1A] hover:bg-[#FEF08A] hover:text-[#991B1B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                >
                  &larr; Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs ${
                      currentPage === pageNum
                        ? 'bg-[#991B1B] text-white border-2 border-[#7F1D1D]'
                        : 'bg-white text-[#1A1A1A] border border-[#CA8A04] hover:bg-[#FEF08A] hover:text-[#991B1B]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 h-9 flex items-center justify-center text-xs font-bold rounded-lg bg-white border border-[#CA8A04] text-[#1A1A1A] hover:bg-[#FEF08A] hover:text-[#991B1B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                >
                  Next &rarr;
                </button>
              </nav>
            )}

            <div className="flex flex-wrap items-center justify-between w-full text-xs text-[#713F12] pt-2">
              <span className="font-medium">
                Showing {startIndex + 1} &ndash; {Math.min(startIndex + postsPerPage, POSTS.length)} of {POSTS.length} articles (12 per page)
              </span>
              <button
                onClick={() => onNavigate('/blog')}
                className="font-bold text-[#0F172A] hover:text-[#991B1B] hover:underline cursor-pointer"
              >
                Browse Complete Journal Archive &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* 30% Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} />
        </div>
      </div>

      {/* 4. Dedicated Category Feeds Section */}
      <section className="pt-8 border-t border-[#E5E5E5] mb-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
            Topic Tracks
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
            Curated Discipline Feeds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Track */}
          <div className="p-5 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl shadow-xs transition-colors duration-300">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]/60">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Artificial Intelligence</h3>
              <button
                onClick={() => onNavigate('/category/artificial-intelligence')}
                className="text-[11px] font-bold text-[#0F172A] hover:text-[#991B1B] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {aiPosts.map((post) => (
                <div key={post.id} className="p-1 rounded transition-colors">
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#991B1B] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#713F12]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Track */}
          <div className="p-5 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl shadow-xs transition-colors duration-300">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]/60">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Cloud &amp; DevOps</h3>
              <button
                onClick={() => onNavigate('/category/cloud-infrastructure')}
                className="text-[11px] font-bold text-[#0F172A] hover:text-[#991B1B] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {cloudPosts.map((post) => (
                <div key={post.id} className="p-1 rounded transition-colors">
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#991B1B] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#713F12]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Track */}
          <div className="p-5 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl shadow-xs transition-colors duration-300">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]/60">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Cyber Defense</h3>
              <button
                onClick={() => onNavigate('/category/cybersecurity')}
                className="text-[11px] font-bold text-[#0F172A] hover:text-[#991B1B] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {securityPosts.map((post) => (
                <div key={post.id} className="p-1 rounded transition-colors">
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#991B1B] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#713F12]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
