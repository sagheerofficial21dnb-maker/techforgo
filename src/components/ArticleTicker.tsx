import React from 'react';
import { POSTS } from '../data/posts';

interface ArticleTickerProps {
  onNavigate: (path: string) => void;
}

export const ArticleTicker: React.FC<ArticleTickerProps> = ({ onNavigate }) => {
  const recentArticles = POSTS.slice(0, 8);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <section
      className="w-full bg-[#059669] border-b border-[#047857] text-white overflow-hidden select-none shadow-xs"
      aria-label="Latest Article Ticker"
    >
      <div className="max-w-[1240px] mx-auto px-5 flex items-center h-10">
        {/* Static Ticker Badge */}
        <div className="shrink-0 flex items-center gap-2 pr-3.5 mr-3 border-r border-[#10B981] z-10 bg-[#059669]">
          <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-wider text-[#FFFFFF] whitespace-nowrap bg-[#047857] px-2 py-0.5 rounded">
            Latest
          </span>
        </div>

        {/* Marquee Content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker py-1 flex items-center">
            {/* First sequence */}
            {recentArticles.map((article) => (
              <span key={`first-${article.id}`} className="inline-flex items-center text-xs whitespace-nowrap">
                <a
                  href={`/post/${article.slug}`}
                  onClick={(e) => handleLink(e, `/post/${article.slug}`)}
                  className="text-white hover:text-[#D1FAE5] font-semibold transition-colors cursor-pointer px-3 text-left"
                  title={article.title}
                >
                  {article.title}
                </a>
                <span className="text-[#A7F3D0] font-bold select-none px-1" aria-hidden="true">
                  &bull;
                </span>
              </span>
            ))}

            {/* Second sequence for seamless loop */}
            {recentArticles.map((article) => (
              <span key={`second-${article.id}`} className="inline-flex items-center text-xs whitespace-nowrap" aria-hidden="true">
                <a
                  href={`/post/${article.slug}`}
                  onClick={(e) => handleLink(e, `/post/${article.slug}`)}
                  tabIndex={-1}
                  className="text-white hover:text-[#D1FAE5] font-semibold transition-colors cursor-pointer px-3 text-left"
                >
                  {article.title}
                </a>
                <span className="text-[#A7F3D0] font-bold select-none px-1">
                  &bull;
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
