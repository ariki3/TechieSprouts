document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing scripts');

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    console.log('Hamburger and nav found, attaching events');

    // Toggle menu on click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Hamburger clicked');
      toggleMenu();
    });

    // Toggle menu on touch
    hamburger.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      console.log('Hamburger touched');
      toggleMenu();
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMenu();
      }
    });

    function toggleMenu() {
      const isExpanded = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.classList.toggle('open');
      document.body.style.overflow = isExpanded ? 'hidden' : '';
      // Close any open dropdowns when toggling menu
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }

    function closeMenu() {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
      // Close any open dropdowns
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  } else {
    console.error('Hamburger or nav not found');
  }

  // Dropdown Menu
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      console.log('Dropdown found, attaching events');

      // Toggle dropdown on click
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Dropdown toggle clicked');
        toggleDropdown(dropdown, toggle);
      });

      // Toggle dropdown on touch
      toggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Dropdown toggle touched');
        toggleDropdown(dropdown, toggle);
      });

      // Close dropdown when clicking a link inside
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeDropdown(dropdown, toggle);
          // Also close the main menu if open
          closeMenu();
        });
      });
    }
  });

  function toggleDropdown(dropdown, toggle) {
    const isActive = dropdown.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
    // Close other open dropdowns
    document.querySelectorAll('.
