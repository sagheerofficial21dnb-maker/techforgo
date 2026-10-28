import React, { useState } from 'react';
import { POSTS } from '../data/posts';
import { PostCard } from '../components/PostCard';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  const popularPosts = POSTS.slice(0, 3);

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-12">
      <div className="max-w-[760px] mx-auto text-center mb-12 p-8 sm:p-12 bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl shadow-xs transition-colors duration-300">
        <span className="text-6xl font-black text-[#991B1B] tracking-tight block mb-2">
          404
        </span>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-3">
          Endpoint Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#422006] max-w-lg mx-auto mb-8 leading-relaxed">
          The technical dispatch or journal volume you requested has been archived, relocated, or does not exist in the current index.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-6">
          <input
            type="search"
            placeholder="Search the TechForGo library (e.g. eBPF, Quantum)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#991B1B]"
          />
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#991B1B] rounded-md transition-colors cursor-pointer shadow-xs"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#0F172A]">
          <button onClick={() => onNavigate('/')} className="hover:underline cursor-pointer">
            &larr; Front Page
          </button>
          <span>&middot;</span>
          <button onClick={() => onNavigate('/blog')} className="hover:underline cursor-pointer">
            Full Blog Archive
          </button>
          <span>&middot;</span>
          <button onClick={() => onNavigate('/about')} className="hover:underline cursor-pointer">
            About TechForGo
          </button>
        </div>
      </div>

      {/* Popular Engineering Dispatches */}
      <section className="pt-8 border-t border-[#E5E5E5]">
        <h2 className="text-lg font-bold text-[#1A1A1A] mb-6 text-center">
          Popular Engineering Dispatches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularPosts.map((post) => (
            <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
          ))}
        </div>
      </section>
    </div>
  );
};
