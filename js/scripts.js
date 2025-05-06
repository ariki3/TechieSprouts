document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing scripts');
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
    hamburger.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      console.log('Hamburger touched');
      const isExpanded = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.classList.toggle('open');
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  } else {
    console.error('Hamburger or nav not found');
  }
});
