/* ============================================================
   JOÃO BEAUTY — app.js
   Funcionalidades gerais: header, carrossel, scroll reveal,
   dark mode, microinterações e inicialização
   ============================================================ */

/* ── HEADER: transparente → sólido ao rolar ── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 60) {
      header.classList.remove('transparent');
      header.classList.add('scrolled');
    } else {
      header.classList.add('transparent');
      header.classList.remove('scrolled');
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* ── MENU MOBILE ── */
function initMobileNav() {
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Fechar ao clicar em link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── CARROSSEL DE DEPOIMENTOS ── */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let autoTimer = null;

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 364;
    return card.offsetWidth + 24; // card width + gap
  }

  function goTo(idx) {
    const len = cards.length;
    current = ((idx % len) + len) % len;
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.getElementById('carouselPrev')?.addEventListener('click', prev);
  document.getElementById('carouselNext')?.addEventListener('click', next);
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-play
  function startAuto() { autoTimer = setInterval(next, 4500); }
  function stopAuto() { clearInterval(autoTimer); }

  startAuto();
  track.closest('.carousel-wrapper')?.addEventListener('mouseenter', stopAuto);
  track.closest('.carousel-wrapper')?.addEventListener('mouseleave', startAuto);

  // Touch/swipe
  let touchStart = 0;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── LAZY LOADING ── */
function initLazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  });

  imgs.forEach(img => obs.observe(img));
}

/* ── DARK MODE ── */
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const saved = localStorage.getItem('jb_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  if (toggle) {
    updateDarkIcon(toggle, saved);
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jb_theme', next);
      updateDarkIcon(toggle, next);
    });
  }
}

function updateDarkIcon(toggle, theme) {
  toggle.innerHTML = theme === 'dark'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

/* ── FILTROS NA PÁGINA DE PRODUTOS ── */
function initProductFilters() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  let currentFilters = { categoria: 'todos', sort: 'relevancia', search: '' };

  async function render() {
    const products = allProducts.length ? allProducts : await loadProducts();
    const filtered = filterProducts(products, currentFilters);

    if (countEl) countEl.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px;color:#999">
          <p style="font-family:var(--display);font-size:1.3rem;margin-bottom:8px">Nenhum produto encontrado</p>
          <p style="font-size:.85rem">Tente outros filtros ou <button class="btn btn-outline" style="padding:6px 14px;margin-left:6px" onclick="resetFilters()">limpar filtros</button></p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }

  // Chips de categoria
  document.querySelectorAll('.filter-chip[data-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip[data-cat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilters.categoria = chip.dataset.cat;
      render();
    });
  });

  // Select de ordenação
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      currentFilters.sort = sortSel.value;
      render();
    });
  }

  window.resetFilters = () => {
    currentFilters = { categoria: 'todos', sort: 'relevancia', search: '' };
    document.querySelectorAll('.filter-chip[data-cat]').forEach(c => c.classList.remove('active'));
    document.querySelector('.filter-chip[data-cat="todos"]')?.classList.add('active');
    if (sortSel) sortSel.value = 'relevancia';
    render();
  };

  render();
}

/* ── RENDER PRODUTOS NA HOME ── */
async function initHomeFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const products = allProducts.length ? allProducts : await loadProducts();
  const featured = products.filter(p => p.destaque).slice(0, 4);
  grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
}

/* ── RENDER DESTAQUES (featured blocks) ── */
async function initFeaturedBlocks() {
  // Renderizado estaticamente no HTML com placeholders visuais
}

/* ── ACTIVE NAV LINK ── */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a, .mobile-nav-list a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── INIT TUDO ── */
document.addEventListener('DOMContentLoaded', async () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initLazyLoad();
  initDarkMode();
  initActiveNav();

  // Carrega produtos
  if (!allProducts.length) {
    await loadProducts();
  }

  // Funcionalidades por página
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    await initHomeFeatured();
    initCarousel();
  }

  if (page === 'produtos.html') {
    initProductFilters();
  }

  // Cart overlay close
  document.getElementById('cartOverlay')?.addEventListener('click', closeCartSidebar);
  document.getElementById('closeCartBtn')?.addEventListener('click', closeCartSidebar);
});

// Expose global
window.showToast = showToast;
