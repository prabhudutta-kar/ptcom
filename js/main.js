/**
* Template Name: EasyFolio
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
  let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  let filter = isotopeItem.getAttribute('data-default-filter') ?? '.filter-web';
  let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  const filtersList = isotopeItem.querySelector('.isotope-filters');
  let titleEl = isotopeItem.querySelector('.portfolio-filter-title');
  if (!titleEl) {
    titleEl = document.createElement('div');
    titleEl.className = 'portfolio-filter-title';
    titleEl.setAttribute('role', 'status');
    titleEl.setAttribute('aria-live', 'polite');
    if (filtersList && filtersList.parentNode) {
      filtersList.parentNode.insertBefore(titleEl, filtersList.nextSibling);
    } else {
      isotopeItem.insertBefore(titleEl, isotopeItem.querySelector('.isotope-container'));
    }
  }

  // ------- EDIT THIS MAP to change hard-coded titles for each filter -------
  const FILTER_TITLE_MAP = {
    '.filter-web': 'Corporate Health & Wellness Program',
    '.filter-graphics': 'Wellness For Young Minds',
    '.filter-motion': 'Happiness program - with The Art of Living',
    '.filter-brand': 'Wellness, wherever you are!<br>Guided Live Online Sessions',
    '*': 'All Projects'
  };
  // ------------------------------------------------------------------------

  // helper to get a filter key from an li element
  function keyFromLi(li) {
    if (!li) return null;
    // prefer data-filter attribute (keeps it robust even if visible text differs)
    const df = li.getAttribute('data-filter');
    return df ?? li.textContent.trim();
  }

  // set initial title using active filter or fallback to default map
  const activeLi = isotopeItem.querySelector('.isotope-filters .filter-active') || isotopeItem.querySelector('.isotope-filters li');
  const initialKey = keyFromLi(activeLi) || filter || '*';
  titleEl.innerHTML = FILTER_TITLE_MAP[initialKey] ?? (initialKey === '*' ? FILTER_TITLE_MAP['*'] : activeLi.textContent.trim());

  let initIsotope;
  imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
    initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
      itemSelector: '.isotope-item',
      layoutMode: layout,
      filter: filter,
      sortBy: sort
    });
  });

function updateTitleByKey(key) {
  const newTitle = FILTER_TITLE_MAP[key] ?? (key === '*' ? FILTER_TITLE_MAP['*'] : '');
  titleEl.classList.add('fade-out');
  window.setTimeout(function() {
    titleEl.innerHTML = newTitle || '';
    titleEl.classList.remove('fade-out');
  }, 160);
}

  isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
    filters.addEventListener('click', function() {
      const currentActive = isotopeItem.querySelector('.isotope-filters .filter-active');
      if (currentActive) currentActive.classList.remove('filter-active');
      this.classList.add('filter-active');

      const filterVal = this.getAttribute('data-filter') ?? '*';
      if (initIsotope && typeof initIsotope.arrange === 'function') {
        initIsotope.arrange({ filter: filterVal });
      }

      updateTitleByKey(filterVal);

      if (typeof aosInit === 'function') {
        aosInit();
      }
    }, false);
  });
});
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();