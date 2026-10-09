import React from 'react';
import { Author } from '../types';

interface AuthorBoxProps {
  author: Author;
  onNavigate: (path: string) => void;
}

export const AuthorBox: React.FC<AuthorBoxProps> = ({ author, onNavigate }) => {
  return (
    <section className="bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl p-6 my-10 flex flex-col sm:flex-row gap-5 items-start shadow-xs">
      <div className="shrink-0">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#EAB308]"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713F12] block mb-1">
          Written By
        </span>
        <h3 className="text-base font-bold text-[#1A1A1A] mb-1">
          {author.name}
        </h3>
        <p className="text-xs font-semibold text-[#854D0E] mb-2.5">
          {author.role}
        </p>
        <p className="text-xs leading-relaxed text-[#422006] mb-3">
          {author.bio}
        </p>
        <div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-bold text-[#0F172A] hover:underline cursor-pointer"
          >
            Browse all articles by {author.name.split(' ')[0]} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
