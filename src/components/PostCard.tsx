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
      <article className="flex flex-col sm:flex-row bg-[#FEF9C3] border border-[#EAB308] rounded-xl overflow-hidden hover:border-[#CA8A04] hover:shadow-md transition-all duration-200 group">
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
              className="text-left hover:text-[#0066CC] transition-colors cursor-pointer line-clamp-2 block"
            >
              {post.title}
            </button>
          </h3>

          {/* Excerpt */}
          <p className="text-xs leading-relaxed text-[#5A4016] line-clamp-2 sm:line-clamp-3 mb-3 flex-1">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="pt-2.5 border-t border-[#EAB308] flex items-center justify-between text-xs text-[#713F12] mt-auto">
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
              className="font-bold text-[#0F172A] hover:underline cursor-pointer"
            >
              Read &rarr;
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid layout (default)
  return (
    <article className="flex flex-col bg-[#FEF9C3] border border-[#EAB308] rounded-xl overflow-hidden hover:border-[#CA8A04] hover:shadow-md transition-all duration-200 group">
      {/* Thumbnail */}
      <button
        onClick={() => onNavigate(`/post/${post.slug}`)}
        className="aspect-16/9 overflow-hidden bg-[#F5F5F5] relative block w-full text-left cursor-pointer"
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </button>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Zero-Pill Unboxed Metadata Row */}
        <div className="flex items-center gap-2 text-xs text-[#713F12] mb-2.5">
          <button
            onClick={() => onNavigate(`/category/${post.categorySlug}`)}
            className="font-bold uppercase tracking-wider text-[11px] text-[#0066CC] hover:underline transition-colors cursor-pointer text-left"
          >
            {post.category}
          </button>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug text-[#1A1A1A] mb-2">
          <button
            onClick={() => onNavigate(`/post/${post.slug}`)}
            className="text-left hover:text-[#0066CC] transition-colors cursor-pointer line-clamp-2 block"
          >
            {post.title}
          </button>
        </h3>

        {/* Excerpt */}
        <p className="text-xs leading-relaxed text-[#5A4016] line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Author & Date Footer Row */}
        <div className="pt-3 border-t border-[#EAB308] flex items-center justify-between text-xs text-[#713F12] mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-semibold text-[#1A1A1A]">{post.author.name}</span>
          </div>
          <time dateTime={post.isoDate}>{post.date}</time>
        </div>
      </div>
    </article>
  );
};
