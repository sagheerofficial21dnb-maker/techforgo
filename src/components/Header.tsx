import React, { useState } from 'react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onSearchSubmit }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
      setIsSearchOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'AI & Models', path: '/category/artificial-intelligence' },
    { label: 'Cloud & DevOps', path: '/category/cloud-infrastructure' },
    { label: 'Cyber Defense', path: '/category/cybersecurity' },
    { label: 'Hardware', path: '/category/hardware-architecture' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FACC15] border-b border-[#EAB308] shadow-xs transition-all">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex items-center justify-between h-[72px] gap-4 lg:gap-6">
          {/* Left: Logo / Site Name */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#1A1A1A] whitespace-nowrap cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] group"
            >
              {/* Site Favicon Logo */}
              <img
                src="/favicon.svg"
                alt="TechForGo Site Logo"
                className="w-8 h-8 rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
              />
              <span className="text-xl">
                <span className="text-[#0F172A] font-black">tech</span><span className="text-[#1E293B] font-extrabold">forgo</span>
              </span>
            </button>
          </div>

          {/* Center: Primary Navigation (Desktop) */}
          <nav
            className="hidden md:flex items-center justify-center gap-3.5 lg:gap-5 text-sm font-bold text-[#1A1A1A] flex-1"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`hover:text-black hover:bg-[#EAB308]/50 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer relative text-[13px] lg:text-[13.5px] font-bold focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] ${
                    isActive ? 'text-black bg-[#EAB308]/70 shadow-xs' : 'text-[#1A1A1A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#0F172A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search Icon/Field & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Desktop Quick Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden xl:flex items-center relative"
            >
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 pl-3 pr-8 py-1.5 text-xs bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] placeholder-[#854D0E] outline-none focus:border-[#0F172A] focus:w-48 transition-all shadow-2xs"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-2 text-[#713F12] hover:text-[#0F172A] cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>

            {/* Search Icon (<1280px) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="xl:hidden p-2 text-[#1A1A1A] hover:bg-[#EAB308] rounded transition-colors cursor-pointer"
              aria-label="Toggle Search Box"
              aria-expanded={isSearchOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle (<768px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A] hover:bg-[#EAB308] rounded transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Input (Mobile/Tablet) */}
        {isSearchOpen && (
          <div className="py-3 border-t border-[#EAB308] animate-in fade-in duration-150 xl:hidden">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="search"
                autoFocus
                placeholder="Search tech articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#CA8A04] rounded text-[#1A1A1A] outline-none focus:border-[#0F172A]"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-Out / Dropdown Drawer (<768px) */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EAB308] animate-in fade-in duration-150 space-y-4 bg-[#FACC15]">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#713F12] px-2 block mb-1">
                Primary Tracks
              </span>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-2.5 text-sm font-bold rounded block cursor-pointer transition-colors ${
                    (item.path === '/' && currentPath === '/') || (item.path !== '/' && currentPath.startsWith(item.path))
                      ? 'bg-[#EAB308] text-black shadow-2xs'
                      : 'text-[#1A1A1A] hover:bg-[#EAB308]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Contact & Legal Pages */}
            <div className="pt-3 border-t border-[#E5E5E5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 block mb-1">
                Compliance &amp; Legal
              </span>
              <button
                onClick={() => {
                  onNavigate('/privacy-policy');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2.5 text-xs font-medium text-[#1A1A1A] hover:text-[#0066CC] block cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  onNavigate('/terms');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2.5 text-xs font-medium text-[#1A1A1A] hover:text-[#0066CC] block cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => {
                  onNavigate('/disclaimer');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2.5 text-xs font-medium text-[#1A1A1A] hover:text-[#0066CC] block cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
