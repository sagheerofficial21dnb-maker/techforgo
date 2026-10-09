import React from 'react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="py-3.5 mb-5 border-b border-[#f0f0ee] text-xs text-[#737c87]" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="text-[#4a5059] hover:text-[#0f4c81] transition-colors cursor-pointer"
          >
            Home
          </button>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <span className="text-[#c4c7cc]" aria-hidden="true">/</span>
              <li className={isLast ? 'text-[#121417] font-semibold truncate max-w-[280px] sm:max-w-md' : ''}>
                {item.path && !isLast ? (
                  <button
                    onClick={() => onNavigate(item.path!)}
                    className="text-[#4a5059] hover:text-[#0f4c81] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
