document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing scripts');

  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  if (!hamburger || !nav) {
    console.error('Hamburger or nav not found');
    return;
  }

  console.log('Hamburger and nav found, attaching events');

  // Menu Toggle Handlers
  ['click', 'touchstart'].forEach(evt =>
    hamburger.addEventListener(evt, (e) => {
      e.stopPropagation();
      console.log(`Hamburger ${evt} triggered`);
      toggleMenu();
    })
  );

  // Close menu on nav link click
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  // Click outside to close menu
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Resize handler to close menu on desktop view
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMenu();
    }
  }, 150));

  // Dropdown handlers
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      console.log('Dropdown found, attaching events');

      ['click', 'touchstart'].forEach(evt =>
        toggle.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(`Dropdown toggle ${evt} triggered`);
          toggleDropdown(dropdown, toggle);
        })
      );

      menu.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => {
          closeDropdown(dropdown, toggle);
          closeMenu();
        })
      );
    }
  });

  // Helper Functions
  function toggleMenu() {
    const isExpanded = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    hamburger.classList.toggle('open');
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    closeAllDropdowns();
  }

  function closeMenu() {
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    closeAllDropdowns();
  }

  function toggleDropdown(dropdown, toggle) {
    const isActive = dropdown.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
    document.querySelectorAll('.dropdown.active').forEach(other => {
      if (other !== dropdown) {
        other.classList.remove('active');
        const otherToggle = other.querySelector('[data-dropdown-toggle]');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeDropdown(dropdown, toggle) {
    dropdown.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
      const toggle = dropdown.querySelector('[data-dropdown-toggle]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
});
