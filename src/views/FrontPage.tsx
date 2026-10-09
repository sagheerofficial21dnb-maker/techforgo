import React from 'react';
import { POSTS, CATEGORIES } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';

interface FrontPageProps {
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({ onNavigate, onSearchSubmit }) => {
  const leadPost = POSTS[0];
  const spotlightPosts = POSTS.slice(1, 4);
  const mainGridPosts = POSTS.slice(4, 8);

  // Group posts by key categories for Category Feeds
  const aiPosts = POSTS.filter((p) => p.categorySlug === 'artificial-intelligence').slice(0, 2);
  const cloudPosts = POSTS.filter((p) => p.categorySlug === 'cloud-infrastructure').slice(0, 2);
  const securityPosts = POSTS.filter((p) => p.categorySlug === 'cybersecurity').slice(0, 2);

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-6">
      {/* 1. Hero Introduction Banner (Yellow Box with Professional Architecture Image) */}
      <section className="mb-8 p-6 sm:p-8 bg-[#FEF08A] border-2 border-[#EAB308] rounded-xl shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713F12] block mb-1.5">
              Engineering Journal &middot; Published Daily
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-3">
              In-Depth Architectural Teardowns for Modern Technologists
            </h1>
            <p className="text-sm sm:text-base text-[#422006] leading-relaxed mb-5">
              Welcome to <strong className="text-[#1A1A1A]">TechForGo</strong>. We deliver peer-reviewed technical inquiries into cryogenic quantum buses, Linux kernel eBPF pipelines, post-quantum hardware enclaves, and distributed systems.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => onNavigate('/blog')}
                className="px-4 py-2 font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded transition-colors cursor-pointer shadow-xs"
              >
                Browse 10-Article Journal &rarr;
              </button>
              <button
                onClick={() => onNavigate('/about')}
                className="px-4 py-2 font-bold text-[#1A1A1A] bg-white border border-[#CA8A04] hover:bg-[#FEF9C3] rounded transition-colors cursor-pointer"
              >
                Our Editorial Charter
              </button>
            </div>
          </div>

          {/* Professional Architectural Diagram Image Directly In Front */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-lg overflow-hidden border-2 border-[#CA8A04] shadow-md bg-[#0F172A] group">
              <img
                src="/src/assets/images/gemini_pro_arch_1791535252317.jpg"
                alt="In-Depth Architectural Diagram and High-Performance Infrastructure Overview"
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2.5 bg-[#0F172A] text-white flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#FACC15] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
                  SYSTEM_ARCH_DIAGRAM_V2.6
                </span>
                <span className="text-gray-400">45 Gbps Active Mesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lead Story (Yellow Box) */}
      <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl overflow-hidden mb-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Media 7 cols on lg */}
          <div className="lg:col-span-7 bg-[#F5F5F5] relative overflow-hidden">
            <button
              onClick={() => onNavigate(`/post/${leadPost.slug}`)}
              className="block w-full h-full cursor-pointer text-left group"
            >
              <img
                src={leadPost.featuredImage}
                alt={leadPost.title}
                className="w-full h-full object-cover min-h-[300px] lg:min-h-[460px] group-hover:scale-[1.01] transition-transform duration-300"
              />
            </button>
          </div>

          {/* Lead Content 5 cols on lg */}
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-[#713F12] mb-3">
              <button
                onClick={() => onNavigate(`/category/${leadPost.categorySlug}`)}
                className="font-bold uppercase tracking-wider text-[11px] text-[#0066CC] hover:underline transition-colors cursor-pointer text-left"
              >
                {leadPost.category}
              </button>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={leadPost.isoDate}>{leadPost.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{leadPost.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] mb-3 text-balance">
              <button
                onClick={() => onNavigate(`/post/${leadPost.slug}`)}
                className="hover:text-[#0066CC] transition-colors cursor-pointer text-left"
              >
                {leadPost.title}
              </button>
            </h2>

            <p className="text-sm leading-relaxed text-[#5A4016] mb-6">
              {leadPost.deck}
            </p>

            <div className="pt-4 border-t border-[#EAB308] flex items-center justify-between text-xs text-[#713F12]">
              <div className="flex items-center gap-2.5">
                <img
                  src={leadPost.author.avatar}
                  alt={leadPost.author.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="font-semibold text-[#1A1A1A]">{leadPost.author.name}</span>
              </div>
              <button
                onClick={() => onNavigate(`/post/${leadPost.slug}`)}
                className="font-bold text-[#0F172A] hover:underline cursor-pointer"
              >
                Read Full Teardown &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Section (Spotlight Row) */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[#E5E5E5]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC] block mb-0.5">
              Spotlight Investigations
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Featured Technical Dispatches
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-semibold text-[#0066CC] hover:underline cursor-pointer"
          >
            All Articles &rarr;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightPosts.map((post) => (
            <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
          ))}
        </div>
      </section>

      {/* 3. Main Grid (70% Content, 30% Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 mb-16">
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[#E5E5E5]">
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              Latest Engineering Inquiries
            </h2>
            <span className="text-xs text-[#666666]">
              Updated Daily by Senior Editors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mainGridPosts.map((post) => (
              <PostCard key={post.id} post={post} onNavigate={onNavigate} layout="grid" />
            ))}
          </div>

          <div className="mt-8 text-center pt-6 border-t border-[#E5E5E5]">
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#0066CC] hover:text-[#0066CC] rounded shadow-xs transition-colors cursor-pointer"
            >
              Browse Complete 10-Post Journal Archive &rarr;
            </button>
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
          <div className="p-5 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Artificial Intelligence</h3>
              <button
                onClick={() => onNavigate('/category/artificial-intelligence')}
                className="text-[11px] font-bold text-[#0F172A] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {aiPosts.map((post) => (
                <div key={post.id}>
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#0066CC] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#713F12]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Track */}
          <div className="p-5 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Cloud &amp; DevOps</h3>
              <button
                onClick={() => onNavigate('/category/cloud-infrastructure')}
                className="text-[11px] font-bold text-[#0F172A] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {cloudPosts.map((post) => (
                <div key={post.id}>
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#0066CC] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#713F12]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Track */}
          <div className="p-5 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAB308]">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Cyber Defense</h3>
              <button
                onClick={() => onNavigate('/category/cybersecurity')}
                className="text-[11px] font-bold text-[#0F172A] hover:underline cursor-pointer"
              >
                View Track &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {securityPosts.map((post) => (
                <div key={post.id}>
                  <button
                    onClick={() => onNavigate(`/post/${post.slug}`)}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#0066CC] transition-colors text-left line-clamp-2 block mb-1 cursor-pointer"
                  >
                    {post.title}
                  </button>
                  <span className="text-[11px] text-[#666666]">{post.date} &middot; {post.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
