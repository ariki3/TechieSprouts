// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
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
    console.warn('Header element (.site-header) not found in the DOM.');
  }

  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
  } else {
    console.warn('Hamburger menu (.hamburger) or navigation (.site-nav) not found in the DOM.');
  }

  // Course Filter (for Fun-Lessons.html)
  window.filterCourses = function(category) {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
      cards.forEach(card => {
        if (card.dataset.category && card.dataset.category.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      console.warn('No course cards (.card) found in the DOM for filtering.');
    }
  };
});
