import React, { useState, useEffect } from 'react';
import { Post, CommentItem } from '../types';
import { POSTS } from '../data/posts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AuthorBox } from '../components/AuthorBox';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';

interface SinglePostProps {
  post: Post;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const SinglePost: React.FC<SinglePostProps> = ({ post, onNavigate, onSearchSubmit }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'Henrik Lindqvist',
      date: 'Oct 8, 2026',
      content: 'The architectural breakdown here provides crucial insights that match our lab tests. Specifically, the trade-offs discussed between operational complexity and latency reductions reflect real deployment challenges.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'c2',
      author: 'Dr. Priya Narayanan',
      date: 'Oct 7, 2026',
      content: 'The mathematical framing in this dispatch is exceptionally clear. We have seen similar performance gains in our multi-node cluster benchmarks.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    },
  ]);

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      author: commentAuthor.trim(),
      date: 'Just now',
      content: commentText.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    };

    setComments((prev) => [...prev, newComment]);
    setCommentAuthor('');
    setCommentText('');
  };

  const relatedPosts = POSTS.filter(
    (p) => p.id !== post.id && p.categorySlug === post.categorySlug
  ).slice(0, 3);

  const fallbackRelated = relatedPosts.length === 3 ? relatedPosts : [
    ...relatedPosts,
    ...POSTS.filter((p) => p.id !== post.id && !relatedPosts.find(r => r.id === p.id)).slice(0, 3 - relatedPosts.length)
  ];

  return (
    <>
      {/* Reading Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#0066CC] z-[100] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 py-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: post.category, path: `/category/${post.categorySlug}` },
            { label: post.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* 70% Main Content, 30% Sidebar on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10">
          <main className="lg:col-span-7 min-w-0">
            <article>
              {/* Header */}
              <header className="mb-8">
                {/* Zero-Pill Unboxed Metadata Row */}
                <div className="flex items-center gap-2 text-xs text-[#666666] mb-3">
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

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight mb-4 text-balance">
                  {post.title}
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-[#666666] mb-6">
                  {post.deck}
                </p>

                {/* Author Strip */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5E5E5]">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-[#E5E5E5]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-[#666666] block">
                      {post.author.role}
                    </span>
                  </div>
                </div>
              </header>

              {/* Featured Media with Explicit Dimensions and Clean Alt Text */}
              <figure className="mb-10 rounded-lg overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5]">
                <img
                  src={post.featuredImage}
                  alt={post.imageAlt}
                  width={1200}
                  height={675}
                  loading="eager"
                  className="w-full aspect-16/9 object-cover"
                />
                {post.imageCaption && (
                  <figcaption className="p-3 text-xs text-center text-[#666666] border-t border-[#E5E5E5] bg-[#FFFFFF]">
                    {post.imageCaption}
                  </figcaption>
                )}
              </figure>

              {/* AdSense-Ready Clean Spacing Slot (Top of Content) */}
              <div className="my-6 py-2 border-y border-[#E5E5E5]/60 text-center" aria-label="Article content break">
                <span className="text-[10px] uppercase tracking-widest text-[#666666]">
                  Technical In-Depth Analysis
                </span>
              </div>

              {/* Prose Body */}
              <div className="font-serif text-[17px] leading-[1.8] text-[#1A1A1A] space-y-6 max-w-[760px]">
                {/* Introduction with Drop Cap */}
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1A1A1A]">
                  {post.introduction}
                </p>

                {/* Subsections with H2/H3 and Bullets */}
                {post.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4 pt-2">
                    {section.level === 'h2' ? (
                      <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] pt-4 border-t border-[#E5E5E5]/50">
                        {section.heading}
                      </h2>
                    ) : (
                      <h3 className="font-sans text-lg font-bold text-[#1A1A1A] pt-2">
                        {section.heading}
                      </h3>
                    )}

                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-2 text-base text-[#1A1A1A]">
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Optional Pull Quote */}
                {post.pullQuote && (
                  <blockquote className="my-8 py-5 px-6 border-y border-[#E5E5E5] bg-[#FAFAFA] italic text-xl font-serif text-[#1A1A1A] text-center">
                    &ldquo;{post.pullQuote}&rdquo;
                  </blockquote>
                )}

                {/* Optional Comparison Table */}
                {post.comparisonTable && (
                  <div className="my-8 overflow-hidden border border-[#E5E5E5] rounded-lg">
                    {post.comparisonTable.caption && (
                      <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#E5E5E5] text-xs font-bold text-[#1A1A1A] font-sans">
                        {post.comparisonTable.caption}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-sans text-xs">
                        <thead>
                          <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                            {post.comparisonTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3.5 py-2.5 font-bold text-[#1A1A1A]">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E5E5]">
                          {post.comparisonTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#F9F9F9] transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`px-3.5 py-2.5 ${cIdx === 0 ? 'font-semibold text-[#1A1A1A]' : 'text-[#666666]'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Optional Code Snippet */}
                {post.codeSnippet && (
                  <div className="my-8 font-mono text-xs rounded-lg overflow-hidden border border-[#1e232a] bg-[#111418] text-[#e2e8f0]">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-[#252b33] text-[11px] text-[#8b949e]">
                      <span>Architecture Implementation Snippet</span>
                      <span className="uppercase">{post.codeSnippet.language}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{post.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Conclusion Paragraph */}
                <div className="pt-4 border-t border-[#E5E5E5]">
                  <h2 className="font-sans text-xl font-bold text-[#1A1A1A] mb-3">
                    Conclusion &amp; Key Architectural Takeaways
                  </h2>
                  <p>{post.conclusion}</p>
                </div>

                {/* Relevant FAQ Section at End of Article */}
                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-10 pt-6 border-t border-[#EAB308] font-sans" aria-label="Frequently Asked Questions">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {post.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-4 bg-[#FEF9C3] border border-[#EAB308] rounded-xl shadow-xs">
                          <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
                            {faq.question}
                          </h3>
                          <p className="text-xs leading-relaxed text-[#5A4016]">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Topics / Tags */}
              <div className="mt-10 pt-5 border-t border-[#E5E5E5] flex items-center flex-wrap gap-2 text-xs">
                <span className="font-bold text-[#1A1A1A]">Field Topics:</span>
                {post.tags.map((tag, i) => (
                  <span key={tag} className="text-[#666666]">
                    {tag}
                    {i < post.tags.length - 1 && <span className="ml-2 text-[#CCCCCC]">&middot;</span>}
                  </span>
                ))}
              </div>

              {/* Social Share Bar */}
              <section className="my-10 p-4 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl flex items-center justify-between flex-wrap gap-4 shadow-xs" aria-label="Share article">
                <span className="text-xs font-black uppercase tracking-wider text-[#713F12]">
                  Share Technical Teardown:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded bg-white border border-[#CA8A04] text-[#1A1A1A] hover:bg-[#FEF08A] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X</span>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded bg-white border border-[#CA8A04] text-[#1A1A1A] hover:bg-[#FEF08A] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded bg-white border border-[#CA8A04] text-[#1A1A1A] hover:bg-[#FEF08A] transition-colors cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy Link'}</span>
                  </button>
                </div>
              </section>

              {/* Author Box */}
              <AuthorBox author={post.author} onNavigate={onNavigate} />

              {/* Related Inquiries */}
              <section className="my-12 pt-8 border-t border-[#E5E5E5]" aria-label="Related articles">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">
                  Related Architecture Analyses in {post.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {fallbackRelated.map((relPost) => (
                    <PostCard key={relPost.id} post={relPost} onNavigate={onNavigate} layout="grid" />
                  ))}
                </div>
              </section>

              {/* Comments Section */}
              <section className="my-14 pt-8 border-t border-[#E5E5E5]" aria-label="Reader Discussion">
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    Reader Discussion ({comments.length})
                  </h3>
                  <span className="text-xs text-[#713F12] font-semibold">
                    Peer-moderated technical debate
                  </span>
                </div>

                {/* Existing comments list */}
                <div className="space-y-6 mb-10">
                  {comments.map((c) => (
                    <div key={c.id} className="p-5 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs">
                      <div className="flex items-center gap-3 mb-2.5">
                        <img src={c.avatar} alt={c.author} width={28} height={28} className="w-7 h-7 rounded-full object-cover border border-[#CA8A04]" />
                        <div>
                          <span className="text-xs font-bold text-[#1A1A1A] block">{c.author}</span>
                          <span className="text-[11px] text-[#713F12]">{c.date}</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-[#422006]">{c.content}</p>
                    </div>
                  ))}
                </div>

                {/* Leave a reply form */}
                <div className="p-6 bg-[#FEF9C3] border-2 border-[#EAB308] rounded-xl shadow-xs">
                  <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">
                    Submit Peer Comment
                  </h4>
                  <p className="text-xs text-[#5A4016] mb-4">
                    Contributions require verified technical affiliation. Submissions adhere to publication discourse standards.
                  </p>

                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                        Name &amp; Institution
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Robert Vance, Berkeley AI Labs"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                        Analysis / Question
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Detail your inquiry or peer observation..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded transition-colors cursor-pointer shadow-xs"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </section>
            </article>
          </main>

          {/* 30% Sidebar on Desktop */}
          <div className="lg:col-span-3">
            <Sidebar onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} currentPostId={post.id} />
          </div>
        </div>
      </div>
    </>
  );
};
