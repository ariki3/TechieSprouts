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

  // Language Toggle
  const languageSelect = document.getElementById('language');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      if (lang === 'sw') {
        window.location.href = 'index-sw.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  } else {
    console.warn('Language select element (#language) not found in the DOM.');
  }

  // Search Functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchResults = document.querySelector('.search-results');
  const courses = [
    { title: "Scratch Coding", url: "Fun-Lessons.html#scratch" },
    { title: "Python Basics", url: "Fun-Lessons.html#python" },
    { title: "Web Development", url: "Fun-Lessons.html#web" },
    { title: "Digital Citizenship", url: "Fun-Lessons.html#digital-citizenship" },
    { title: "Robotics", url: "Fun-Lessons.html#robotics" }
  ];
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      if (query.length > 0) {
        const results = courses.filter(course => course.title.toLowerCase().includes(query));
        if (results.length > 0) {
          results.forEach(result => {
            const link = document.createElement('a');
            link.href = result.url;
            link.textContent = result.title;
            searchResults.appendChild(link);
          });
          searchResults.classList.add('active');
        } else {
          searchResults.classList.remove('active');
        }
      } else {
        searchResults.classList.remove('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  } else {
    console.warn('Search bar (.search-bar input) or search results (.search-results) not found in the DOM.');
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
