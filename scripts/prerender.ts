import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { POSTS, CATEGORIES } from '../src/data/posts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const publicDir = path.resolve(projectRoot, 'public');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateHtml(template: string, options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  jsonLd?: object;
}): string {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(options.title)}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(options.description)}" />`);

  // Replace OpenGraph Title & Description
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(options.title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(options.description)}" />`);

  // Inject Canonical and OpenGraph URL
  const canonicalTag = `<link rel="canonical" href="${options.url}" />\n    <meta property="og:url" content="${options.url}" />`;
  if (options.image) {
    const fullImageUrl = options.image.startsWith('http') ? options.image : `https://techforgo.com${options.image}`;
    const imageTags = `<meta property="og:image" content="${fullImageUrl}" />\n    <meta name="twitter:image" content="${fullImageUrl}" />`;
    html = html.replace('</head>', `    ${canonicalTag}\n    ${imageTags}\n  </head>`);
  } else {
    html = html.replace('</head>', `    ${canonicalTag}\n  </head>`);
  }

  // Inject JSON-LD Schema
  if (options.jsonLd) {
    const jsonLdTag = `\n    <script type="application/ld+json">\n${JSON.stringify(options.jsonLd, null, 2)}\n    </script>`;
    html = html.replace('</head>', `${jsonLdTag}\n  </head>`);
  }

  return html;
}

export function prerender() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');

  // 1. Generate Static Pages for all 21 Blog Posts
  console.log(`Generating static HTML for ${POSTS.length} blog posts...`);
  for (const post of POSTS) {
    const postRouteDir = path.join(distDir, 'post', post.slug);
    fs.mkdirSync(postRouteDir, { recursive: true });

    const postUrl = `https://techforgo.com/post/${post.slug}`;
    const postHtml = generateHtml(template, {
      title: `${post.title} — TechForGo`,
      description: post.excerpt,
      url: postUrl,
      image: post.featuredImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage.startsWith('http') ? post.featuredImage : `https://techforgo.com${post.featuredImage}`,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechForGo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://techforgo.com/favicon.svg',
          },
        },
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
      },
    });

    fs.writeFileSync(path.join(postRouteDir, 'index.html'), postHtml, 'utf-8');
  }

  // 2. Generate Static Pages for Categories
  console.log(`Generating static HTML for ${CATEGORIES.length} categories...`);
  for (const cat of CATEGORIES) {
    const catRouteDir = path.join(distDir, 'category', cat.slug);
    fs.mkdirSync(catRouteDir, { recursive: true });

    const catUrl = `https://techforgo.com/category/${cat.slug}`;
    const catHtml = generateHtml(template, {
      title: `${cat.name} — Technical Coverage & Research — TechForGo`,
      description: cat.description,
      url: catUrl,
    });

    fs.writeFileSync(path.join(catRouteDir, 'index.html'), catHtml, 'utf-8');
  }

  // 3. Generate Static Pages for Top-Level Pages
  const staticPages = [
    { slug: 'blog', title: 'Blog Archive — TechForGo', desc: 'Browse all in-depth architectural teardowns, quantum computing reports, and distributed systems research.' },
    { slug: 'about', title: 'Editorial Charter & About Us — TechForGo', desc: 'Learn about TechForGo editorial standards, peer-review methodology, and our research engineers.' },
    { slug: 'contact', title: 'Contact Desk — TechForGo', desc: 'Connect with the TechForGo editorial desk for technical inquiries, errata, and research submissions.' },
    { slug: 'privacy-policy', title: 'Privacy Policy — TechForGo', desc: 'Review TechForGo privacy policy, data protection standards, and telemetry disclosure.' },
    { slug: 'terms', title: 'Terms & Conditions — TechForGo', desc: 'Review TechForGo user terms, licensing, and code citation guidelines.' },
    { slug: 'disclaimer', title: 'Technical Disclaimer — TechForGo', desc: 'Review TechForGo technical disclaimer regarding benchmarks and code snippets.' },
  ];

  for (const sp of staticPages) {
    const routeDir = path.join(distDir, sp.slug);
    fs.mkdirSync(routeDir, { recursive: true });
    const spHtml = generateHtml(template, {
      title: sp.title,
      description: sp.desc,
      url: `https://techforgo.com/${sp.slug}`,
    });
    fs.writeFileSync(path.join(routeDir, 'index.html'), spHtml, 'utf-8');
  }

  // 4. Generate GitHub Pages SPA 404 Fallback (Redirects any non-static path into the React router)
  const ghPages404 = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TechForGo</title>
    <script>
      // Single Page Apps for GitHub Pages: https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?p=' +
        encodeURIComponent(l.pathname.slice(1) + (l.search ? l.search : '') + l.hash)
      );
    </script>
  </head>
  <body>
    <p>Redirecting to TechForGo...</p>
  </body>
</html>`;
  fs.writeFileSync(path.join(distDir, '404.html'), ghPages404, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '404.html'), ghPages404, 'utf-8');

  // 5. Generate Netlify / Cloudflare Pages rewrite file (_redirects)
  const redirects = `/*    /index.html   200\n`;
  fs.writeFileSync(path.join(distDir, '_redirects'), redirects, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '_redirects'), redirects, 'utf-8');

  // 6. Generate Apache .htaccess
  const htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>\n`;
  fs.writeFileSync(path.join(distDir, '.htaccess'), htaccess, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccess, 'utf-8');

  console.log('✅ Static pre-rendering and routing rules generated successfully!');
}

prerender();
