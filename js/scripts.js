document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing scripts');

  // Retracting Navigation
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) {
        let currentScrollTop = window.scrollY;
        if (currentScrollTop > lastScrollTop) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
        lastScrollTop = currentScrollTop;
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        header.classList.remove('header-hidden');
      }
    });
  } else {
    console.warn('Header element (.site-header) not found.');
  }

  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  if (hamburger && nav) {
    console.log('Hamburger and nav found, attaching click event');
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Hamburger clicked');
      const isExpanded = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.classList.toggle('open');
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  } else {
    console.error('Hamburger (.hamburger) or navigation (.site-nav) not found.');
  }
});
