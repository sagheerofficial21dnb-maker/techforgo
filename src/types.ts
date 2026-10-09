export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface PostSection {
  heading: string;
  level: 'h2' | 'h3';
  paragraphs: string[];
  bullets?: string[];
}

export interface PostFAQ {
  question: string;
  answer: string;
}

export interface ComparisonTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  deck: string;
  excerpt: string;
  introduction: string;
  sections: PostSection[];
  conclusion: string;
  faqs: PostFAQ[];
  comparisonTable?: ComparisonTable;
  codeSnippet?: {
    language: string;
    code: string;
  };
  pullQuote?: string;
  category: string;
  categorySlug: 'artificial-intelligence' | 'cloud-infrastructure' | 'cybersecurity' | 'hardware-architecture';
  tags: string[];
  date: string;
  isoDate: string;
  readTime: string;
  author: Author;
  featuredImage: string;
  imageAlt: string;
  visualPrompt: string;
  imageCaption?: string;
}

export interface CommentItem {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}
