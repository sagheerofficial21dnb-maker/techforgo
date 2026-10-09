/**
 * TechForGo Theme Main JavaScript
 * Ultra-lightweight, zero-dependency, Core Web Vitals optimized
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Toggle (<768px)
    var menuToggle = document.getElementById('tfg-mobile-menu-toggle-btn');
    var mobileDrawer = document.getElementById('tfg-mobile-drawer');

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener('click', function () {
        var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileDrawer.style.display = isExpanded ? 'none' : 'block';
      });
    }

    // 2. Search Bar Toggle (Mobile)
    var searchToggle = document.getElementById('tfg-search-toggle-btn');
    var searchBar = document.getElementById('tfg-header-search-bar');
    var searchInput = document.getElementById('tfg-header-search-input');

    if (searchToggle && searchBar) {
      searchToggle.addEventListener('click', function () {
        var isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
        searchToggle.setAttribute('aria-expanded', !isExpanded);
        searchBar.style.display = isExpanded ? 'none' : 'block';
        if (!isExpanded && searchInput) {
          setTimeout(function () {
            searchInput.focus();
          }, 50);
        }
      });
    }

    // 3. Close with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (searchBar && searchBar.style.display === 'block') {
          searchBar.style.display = 'none';
          if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
        }
        if (mobileDrawer && mobileDrawer.style.display === 'block') {
          mobileDrawer.style.display = 'none';
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // 4. Archive Grid / List View Switcher
    var gridBtn = document.getElementById('tfg-view-grid-btn');
    var listBtn = document.getElementById('tfg-view-list-btn');
    var postsContainer = document.getElementById('tfg-posts-container');

    if (gridBtn && listBtn && postsContainer) {
      // Check stored preference
      var savedView = localStorage.getItem('tfg_view_preference');
      if (savedView === 'list') {
        postsContainer.classList.add('is-list-view');
        listBtn.classList.add('is-active');
        listBtn.setAttribute('aria-pressed', 'true');
        gridBtn.classList.remove('is-active');
        gridBtn.setAttribute('aria-pressed', 'false');
      }

      gridBtn.addEventListener('click', function () {
        postsContainer.classList.remove('is-list-view');
        gridBtn.classList.add('is-active');
        gridBtn.setAttribute('aria-pressed', 'true');
        listBtn.classList.remove('is-active');
        listBtn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('tfg_view_preference', 'grid');
      });

      listBtn.addEventListener('click', function () {
        postsContainer.classList.add('is-list-view');
        listBtn.classList.add('is-active');
        listBtn.setAttribute('aria-pressed', 'true');
        gridBtn.classList.remove('is-active');
        gridBtn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('tfg_view_preference', 'list');
      });
    }

    // 5. Copy URL to Clipboard
    var copyBtn = document.querySelector('.tfg-copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var url = this.getAttribute('data-url') || window.location.href;
        var copyTextSpan = this.querySelector('.tfg-copy-text');
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            if (copyTextSpan) {
              var originalText = copyTextSpan.textContent;
              copyTextSpan.textContent = 'Link Copied!';
              setTimeout(function () {
                copyTextSpan.textContent = originalText;
              }, 2500);
            }
          });
        }
      });
    }

    // 6. Single post reading progress indicator
    var progressBar = document.getElementById('tfg-reading-progress-bar');
    var article = document.querySelector('.tfg-single-post');

    if (progressBar && article) {
      window.addEventListener('scroll', function () {
        var rect = article.getBoundingClientRect();
        var totalHeight = rect.height;
        var progress = Math.min(100, Math.max(0, ((-rect.top) / (totalHeight - window.innerHeight)) * 100));
        progressBar.style.width = progress + '%';
      }, { passive: true });
    }
  });
})();
