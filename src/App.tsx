import React, { useState, useEffect } from 'react';
import { POSTS } from './data/posts';
import { Header } from './components/Header';
import { ArticleTicker } from './components/ArticleTicker';
import { Footer } from './components/Footer';
import { AnimatedCursor } from './components/AnimatedCursor';
import { FrontPage } from './views/FrontPage';
import { BlogArchive } from './views/BlogArchive';
import { SinglePost } from './views/SinglePost';
import { CategoryPage } from './views/CategoryPage';
import { SearchPage } from './views/SearchPage';
import { StaticPage, StaticPageType } from './views/StaticPage';
import { NotFoundPage } from './views/NotFoundPage';
import { AdsTxtView } from './views/AdsTxtView';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Handle SPA redirects from 404.html (e.g. GitHub Pages /?p=/post/slug or /?/post/slug)
    const search = window.location.search;
    if (search.startsWith('?p=')) {
      const redirected = decodeURIComponent(search.replace('?p=', ''));
      window.history.replaceState({}, '', redirected + window.location.hash);
      return redirected;
    }
    if (search.startsWith('?/')) {
      const decoded = search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
      window.history.replaceState({}, '', decoded + window.location.hash);
      return decoded;
    }
    return window.location.pathname && window.location.pathname !== ''
      ? window.location.pathname
      : '/';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    navigateTo(`/search?q=${encodeURIComponent(query)}`);
  };

  // Robust path normalization (strips queries, hashes, and trailing slashes)
  const normalizedPath = (currentPath || '/')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '') || '/';

  // Route Resolution
  let view = <FrontPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;

  if (normalizedPath === '/' || normalizedPath === '') {
    // 1. Home
    view = <FrontPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/blog' || normalizedPath === '/home') {
    // 2. Blog Archive
    view = <BlogArchive onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath.startsWith('/post/')) {
    // Post slug extraction with thorough normalization
    const rawSlug = normalizedPath.replace(/^\/post\//, '');
    const cleanSlug = decodeURIComponent(rawSlug).replace(/\/+$/, '').trim().toLowerCase();
    const post = POSTS.find((p) => p.slug.toLowerCase() === cleanSlug);
    if (post) {
      view = <SinglePost post={post} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
    } else {
      view = <NotFoundPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
    }
  } else if (normalizedPath.startsWith('/category/')) {
    // Category slug extraction with thorough normalization
    const rawSlug = normalizedPath.replace(/^\/category\//, '');
    const cleanSlug = decodeURIComponent(rawSlug).replace(/\/+$/, '').trim().toLowerCase();
    view = <CategoryPage categorySlug={cleanSlug} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath.startsWith('/search')) {
    // Search Results Page
    const query = searchQuery || new URLSearchParams(window.location.search).get('q') || 'Quantum';
    view = <SearchPage initialQuery={query} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/about') {
    view = <StaticPage pageType="about" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/contact') {
    view = <StaticPage pageType="contact" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/privacy-policy') {
    view = <StaticPage pageType="privacy-policy" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/terms' || normalizedPath === '/terms-and-conditions') {
    view = <StaticPage pageType="terms" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/disclaimer') {
    view = <StaticPage pageType="disclaimer" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (normalizedPath === '/ads.txt' || currentPath.includes('ads.txt')) {
    return <AdsTxtView />;
  } else {
    // 404 Error Page
    view = <NotFoundPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  }

  if (normalizedPath === '/ads.txt' || currentPath.includes('ads.txt')) {
    return <AdsTxtView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFCE8] text-[#1A1A1A] antialiased selection:bg-[#FEE2E2] selection:text-[#991B1B]">
      <AnimatedCursor />
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Article Ticker placed right below the Header in vibrant green */}
      <ArticleTicker onNavigate={navigateTo} />
      
      <div className="flex-1">
        {view}
      </div>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
