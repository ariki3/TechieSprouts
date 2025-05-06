document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing scripts');

  // Retracting Navigation (unchanged)
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
    hamburger.addEventListener('click', () => {
      console.log('Hamburger clicked');
      const isExpanded = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.classList.toggle('open'); // For icon animation
      // Prevent body scrolling when menu is open
      document.body.style.overflow = isExpanded ? 'hidden' : '';
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
  } else {
    console.error('Hamburger (.hamburger) or navigation (.site-nav) not found.');
  }

  // Dropdown Toggle for Mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  if (dropdownToggles.length > 0) {
    console.log('Dropdown toggles found:', dropdownToggles.length);
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) { // Only on mobile
          e.preventDefault();
          const dropdown = toggle.closest('.dropdown');
          const isActive = dropdown.classList.contains('active');
          // Close other open dropdowns
          document.querySelectorAll('.dropdown.active').forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('active');
              d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
          });
          dropdown.classList.toggle('active');
          toggle.setAttribute('aria-expanded', !isActive);
          console.log('Dropdown toggled, active:', !isActive);
        }
      });
    });
  } else {
    console.warn('No dropdown toggles (.dropdown-toggle) found.');
  }

  // Course Filter (unchanged)
  window.filterCourses = function(category) {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
      console.log('Filtering courses for category:', category);
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category?.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      console.warn('No course cards (.card) found.');
    }
  };
});
