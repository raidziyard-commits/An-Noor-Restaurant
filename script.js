/* ============================================================
   AN NOOR FAMILY RESTAURANT – JAVASCRIPT
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. PRELOADER
   ---------------------------------------------------------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1800);
});

document.body.style.overflow = 'hidden'; // lock scroll during preload


/* ----------------------------------------------------------
   2. STICKY NAVBAR  (scroll + active link highlight)
   ---------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky style
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - parseInt(getComputedStyle(navbar).height) - 20;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load


/* ----------------------------------------------------------
   3. MOBILE HAMBURGER MENU
   ---------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


/* ----------------------------------------------------------
   4. SMOOTH SCROLL (for older browsers without CSS support)
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 76;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ----------------------------------------------------------
   5. MENU CATEGORY TABS
   ---------------------------------------------------------- */
let menuCards = []; // Will be populated dynamically
const menuGrid = document.getElementById('menu-grid');

function renderMenu() {
  if (!menuGrid) return;
  const menuData = typeof getMenuData === 'function' ? getMenuData() : [];
  menuGrid.innerHTML = '';
  
  menuData.forEach(item => {
    const badgeHtml = item.badge ? `<div class="menu-badge ${item.badge.toLowerCase() === 'popular' ? 'popular-badge' : ''}">${item.badge}</div>` : '';
    const whatsappText = `I'd like to order ${item.name}`;
    
    const cardHtml = `
      <div class="menu-card reveal-up visible" data-category="${item.category}">
        <div class="menu-card-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          ${badgeHtml}
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-card-footer">
            <span class="price">${item.price}</span>
            <a href="https://wa.me/94782992575?text=${encodeURIComponent(whatsappText)}" target="_blank" class="order-btn" rel="noopener noreferrer">Order</a>
          </div>
        </div>
      </div>
    `;
    menuGrid.innerHTML += cardHtml;
  });
  
  menuCards = document.querySelectorAll('.menu-card');
}

// Initial render
renderMenu();

const menuTabs  = document.querySelectorAll('.menu-tab');

function showCategory(category) {
  menuCards.forEach(card => {
    if (card.dataset.category === category) {
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      // Trigger animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.display = 'none';
    }
  });
}

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    showCategory(tab.dataset.category);
  });
});

// Default: show mandi on load
showCategory('mandi');


/* ----------------------------------------------------------
   6. GALLERY LIGHTBOX
   ---------------------------------------------------------- */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightbox-img');
const lbCaption    = document.getElementById('lightbox-caption');
const lbClose      = document.getElementById('lightbox-close');
const lbPrev       = document.getElementById('lightbox-prev');
const lbNext       = document.getElementById('lightbox-next');

let currentGalleryIndex = 0;
const galleryData = [];

galleryItems.forEach((item, idx) => {
  const img     = item.querySelector('img');
  const caption = item.querySelector('.gallery-overlay span');
  galleryData.push({
    src     : img.src,
    alt     : img.alt,
    caption : caption ? caption.textContent : ''
  });

  item.addEventListener('click', () => openLightbox(idx));
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openLightbox(idx);
  });
});

function openLightbox(idx) {
  currentGalleryIndex = idx;
  const data = galleryData[idx];
  lbImg.src              = data.src;
  lbImg.alt              = data.alt;
  lbCaption.textContent  = data.caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevImage() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentGalleryIndex);
}

function nextImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
  openLightbox(currentGalleryIndex);
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click',  prevImage);
lbNext.addEventListener('click',  nextImage);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  prevImage();
  if (e.key === 'ArrowRight') nextImage();
});


/* ----------------------------------------------------------
   7. SCROLL REVEAL ANIMATIONS  (IntersectionObserver)
   ---------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ----------------------------------------------------------
   8. HERO STAT COUNTER ANIMATION
   ---------------------------------------------------------- */
function animateCounter(el, target, suffix, decimals = 0) {
  const duration = 2000;
  const start    = performance.now();
  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = eased * target;
    el.textContent = (decimals ? value.toFixed(decimals) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Observe the stats section to trigger counters once
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const statNums = document.querySelectorAll('.stat-num');
      // stat-num[0] = 4.3, [1] = 69+, [2] = Rs 1k–2k (static), [3] = 11:30 PM (static)
      if (statNums[0]) animateCounter(statNums[0], 4.3, '', 1);
      if (statNums[1]) animateCounter(statNums[1], 69, '+');
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}




/* ----------------------------------------------------------
   10. STAR RATING DISPLAY  (reviews section)
   ---------------------------------------------------------- */
// Already handled via HTML/CSS — no dynamic changes needed.


/* ----------------------------------------------------------
   11. BACK-TO-TOP on logo click
   ---------------------------------------------------------- */
document.querySelector('.nav-logo')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ----------------------------------------------------------
   12. PARALLAX EFFECT on hero image
   ---------------------------------------------------------- */
const heroImg = document.querySelector('.hero-img');
if (heroImg && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.08) translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
}


/* ----------------------------------------------------------
   13. TOUCH SWIPE SUPPORT for lightbox
   ---------------------------------------------------------- */
let touchStartX = 0;
let touchEndX   = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextImage() : prevImage();
  }
}, { passive: true });


/* ----------------------------------------------------------
   14. FOOTER YEAR AUTO-UPDATE
   ---------------------------------------------------------- */
document.querySelectorAll('.footer-bottom p').forEach(p => {
  p.innerHTML = p.innerHTML.replace('2025', new Date().getFullYear());
});


/* ----------------------------------------------------------
   15. FORM INPUT ANIMATION (floating label feel)
   ---------------------------------------------------------- */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
  input.addEventListener('focus',  () => input.parentElement.classList.add('focused'));
  input.addEventListener('blur',   () => input.parentElement.classList.remove('focused'));
});


/* ----------------------------------------------------------
   16. MENU TAB KEYBOARD NAVIGATION
   ---------------------------------------------------------- */
menuTabs.forEach((tab, idx) => {
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      const next = menuTabs[(idx + 1) % menuTabs.length];
      next.focus(); next.click();
    }
    if (e.key === 'ArrowLeft') {
      const prev = menuTabs[(idx - 1 + menuTabs.length) % menuTabs.length];
      prev.focus(); prev.click();
    }
  });
});


/* ----------------------------------------------------------
   17. WHATSAPP BUTTON PULSE ON HOVER STOP
   ---------------------------------------------------------- */
const waBtn = document.getElementById('whatsapp-btn');
if (waBtn) {
  waBtn.addEventListener('mouseenter', () => waBtn.style.animation = 'none');
  waBtn.addEventListener('mouseleave', () => waBtn.style.animation = 'float-btn 3s ease-in-out infinite');
}


/* ----------------------------------------------------------
   18. CONSOLE BRANDING
   ---------------------------------------------------------- */
console.log(
  '%c 🌟 An Noor Family Restaurant \n%c Panadura, Sri Lanka | +94 78 299 2575 ',
  'background:#1a0a00;color:#d4a017;font-size:18px;font-weight:bold;padding:8px 16px;',
  'background:#3b1a00;color:#f0c040;font-size:13px;padding:4px 16px;'
);
