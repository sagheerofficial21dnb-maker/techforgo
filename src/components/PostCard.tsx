import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onNavigate: (path: string) => void;
  layout?: 'grid' | 'list';
}

export const PostCard: React.FC<PostCardProps> = ({ post, onNavigate, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <article className="flex flex-col sm:flex-row bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308]/60 hover:border-[#CA8A04] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group">
        {/* List Thumbnail */}
        <button
          onClick={() => onNavigate(`/post/${post.slug}`)}
          className="w-full sm:w-52 md:w-60 shrink-0 aspect-16/10 sm:aspect-auto overflow-hidden bg-[#F5F5F5] relative block text-left cursor-pointer"
        >
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </button>

        {/* List Body */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-[#713F12] mb-2">
            <button
              onClick={() => onNavigate(`/category/${post.categorySlug}`)}
              className="font-bold uppercase tracking-wider text-[11px] text-[#0066CC] hover:underline transition-colors cursor-pointer text-left"
            >
              {post.category}
            </button>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.isoDate}>{post.date}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold leading-snug text-[#1A1A1A] mb-2">
            <button
              onClick={() => onNavigate(`/post/${post.slug}`)}
              className="text-left hover:text-[#991B1B] transition-colors cursor-pointer line-clamp-2 block"
            >
              {post.title}
            </button>
          </h3>

          {/* Excerpt */}
          <p className="text-xs leading-relaxed text-[#5A4016] line-clamp-2 sm:line-clamp-3 mb-3 flex-1">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="pt-2.5 border-t border-[#EAB308]/60 flex items-center justify-between text-xs text-[#713F12] mt-auto">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-[#1A1A1A]">{post.author.name}</span>
            </div>
            <button
              onClick={() => onNavigate(`/post/${post.slug}`)}
              className="font-bold text-[#0F172A] hover:text-[#991B1B] hover:underline cursor-pointer"
            >
              Read &rarr;
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid layout (default compact 3-per-row card)
  return (
    <article className="flex flex-col bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308]/60 hover:border-[#CA8A04] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group h-full">
      {/* Compact Thumbnail */}
      <button
        onClick={() => onNavigate(`/post/${post.slug}`)}
        className="aspect-16/10 overflow-hidden bg-[#F5F5F5] relative block w-full text-left cursor-pointer shrink-0"
        aria-label={post.title}
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </button>

      {/* Card Content - Space-Optimized Padding */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Category & Read Time Row */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#713F12] mb-1.5">
          <button
            onClick={() => onNavigate(`/category/${post.categorySlug}`)}
            className="font-bold uppercase tracking-wider text-[10px] text-[#991B1B] hover:underline transition-colors cursor-pointer text-left truncate max-w-[140px]"
          >
            {post.category}
          </button>
          <span aria-hidden="true">&middot;</span>
          <span className="shrink-0 text-[10.5px]">{post.readTime}</span>
        </div>

        {/* Compact Title */}
        <h3 className="text-sm sm:text-[15px] font-bold leading-snug text-[#1A1A1A] mb-1.5">
          <button
            onClick={() => onNavigate(`/post/${post.slug}`)}
            className="text-left hover:text-[#991B1B] transition-colors cursor-pointer line-clamp-2 block"
            title={post.title}
          >
            {post.title}
          </button>
        </h3>

        {/* Compact Excerpt */}
        <p className="text-xs leading-relaxed text-[#5A4016] line-clamp-2 mb-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author & Date Footer Row */}
        <div className="pt-2.5 border-t border-[#EAB308]/50 flex items-center justify-between text-[11px] text-[#713F12] mt-auto">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-4.5 h-4.5 rounded-full object-cover shrink-0"
            />
            <span className="font-semibold text-[#1A1A1A] truncate max-w-[90px] sm:max-w-[110px]">
              {post.author.name}
            </span>
          </div>
          <time dateTime={post.isoDate} className="shrink-0 text-[#713F12]/80 text-[10.5px]">
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
};
