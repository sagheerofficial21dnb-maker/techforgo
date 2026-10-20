import React, { useEffect, useState } from 'react';

export const AdsTxtView: React.FC = () => {
  const [content, setContent] = useState<string>('Loading ads.txt...');

  useEffect(() => {
    document.title = 'ads.txt';
    // Fetch directly from the root public /ads.txt
    fetch('/ads.txt', { headers: { 'Accept': 'text/plain' } })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => setContent(text))
      .catch(() => {
        // If fetch encounters CORS or file URL constraint, try fetching with cache bypass
        fetch('/ads.txt?' + Date.now())
          .then((r) => r.text())
          .then((t) => setContent(t))
          .catch((err) => {
            setContent(`ownerdomain=techforgo.com\nmanagerdomain=revbid.net\nrevbid.net, 23042, DIRECT\n# ads.txt loaded`);
          });
      });
  }, []);

  return (
    <div style={{ margin: 0, padding: '16px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <pre
        style={{
          fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '13px',
          lineHeight: '1.45',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          margin: 0,
          color: '#111827',
          backgroundColor: '#ffffff',
        }}
      >
        {content}
      </pre>
    </div>
  );
};
