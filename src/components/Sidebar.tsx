import React, { useState } from 'react';
import { POSTS, CATEGORIES } from '../data/posts';

interface SidebarProps {
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
  currentPostId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, onSearchSubmit, currentPostId }) => {
  const [searchInput, setSearchInput] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const recentPosts = POSTS.filter((p) => p.id !== currentPostId).slice(0, 4);

  return (
    <aside className="space-y-8">
      {/* Search Widget */}
      <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#713F12] mb-3.5 pb-2.5 border-b border-[#EAB308]">
          Search Insights
        </h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="search"
            placeholder="Search topics..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="px-3.5 py-2 text-white bg-[#0F172A] hover:bg-black rounded-md transition-colors cursor-pointer flex items-center justify-center shadow-xs"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </section>

      {/* Recent Dispatches Widget */}
      <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#713F12] mb-4 pb-2.5 border-b border-[#EAB308]">
          Recent Dispatches
        </h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id} className="flex gap-3 items-start">
              <button
                onClick={() => onNavigate(`/post/${post.slug}`)}
                className="w-20 aspect-16/10 rounded overflow-hidden shrink-0 bg-[#F5F5F5] border border-[#CA8A04]/40 cursor-pointer"
              >
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </button>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onNavigate(`/post/${post.slug}`)}
                  className="text-[13px] font-bold leading-snug text-[#1A1A1A] hover:text-[#0066CC] transition-colors text-left line-clamp-2 cursor-pointer mb-1 block"
                >
                  {post.title}
                </button>
                <div className="text-[11px] text-[#713F12] flex items-center gap-1.5">
                  <time dateTime={post.isoDate}>{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Coverage Disciplines Widget */}
      <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#713F12] mb-3 pb-2.5 border-b border-[#EAB308]">
          Research Disciplines
        </h3>
        <ul className="divide-y divide-[#EAB308]">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => onNavigate(`/category/${cat.slug}`)}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#0066CC] transition-colors cursor-pointer text-left"
              >
                <span>{cat.name}</span>
                <span className="text-xs font-mono font-bold text-[#713F12] tabular-nums">
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter Widget */}
      <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#713F12] mb-2 pb-2 border-b border-[#EAB308]">
          Weekly Technical Dispatch
        </h3>
        <p className="text-xs leading-relaxed text-[#5A4016] mb-3.5">
          Deep architectural teardowns and hardware benchmark analyses delivered directly to your inbox every Thursday morning.
        </p>

        {isSubscribed ? (
          <div className="p-3 bg-[#ECFDF5] border border-[#10B981] rounded text-xs text-[#065F46] font-bold text-center">
            &check; Subscribed. You will receive Thursday's issue.
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="space-y-2">
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
            />
            <button
              type="submit"
              className="w-full py-2 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded-md transition-colors cursor-pointer shadow-xs"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </section>
    </aside>
  );
};
