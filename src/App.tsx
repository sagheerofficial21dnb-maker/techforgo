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

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
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

  // Route Resolution for All 10 Required Pages
  let view = <FrontPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;

  if (currentPath === '/' || currentPath === '') {
    // 1. Home (front-page.php)
    view = <FrontPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/blog' || currentPath === '/home') {
    // 2. Blog (home.php with 10 articles/page + pagination)
    view = <BlogArchive onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath.startsWith('/post/')) {
    const slug = currentPath.replace('/post/', '').split('?')[0];
    const post = POSTS.find((p) => p.slug === slug);
    if (post) {
      view = <SinglePost post={post} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
    } else {
      view = <NotFoundPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
    }
  } else if (currentPath.startsWith('/category/')) {
    // 8. Category Archive Pages
    const slug = currentPath.replace('/category/', '').replace(/\/$/, '').split('?')[0];
    view = <CategoryPage categorySlug={slug} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath.startsWith('/search')) {
    // 9. Search Results Page
    const query = searchQuery || new URLSearchParams(window.location.search).get('q') || 'Quantum';
    view = <SearchPage initialQuery={query} onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/about') {
    // 3. About Us
    view = <StaticPage pageType="about" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/contact') {
    // 4. Contact Us
    view = <StaticPage pageType="contact" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/privacy-policy') {
    // 5. Privacy Policy
    view = <StaticPage pageType="privacy-policy" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/terms' || currentPath === '/terms-and-conditions') {
    // 6. Terms & Conditions
    view = <StaticPage pageType="terms" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else if (currentPath === '/disclaimer') {
    // 7. Disclaimer
    view = <StaticPage pageType="disclaimer" onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  } else {
    // 10. 404 Error Page
    view = <NotFoundPage onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1A1A1A] antialiased selection:bg-[#F0F7FF] selection:text-[#0066CC]">
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
