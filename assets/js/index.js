/**
 * Cryptocurrency Dashboard - Main JavaScript File
 *
 */

// DOM Elements
const navToggleBtn = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const header = document.querySelector("[data-header]");
const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");
const sections = document.querySelectorAll("[data-section]");
const tabBtns = document.querySelectorAll(".tab-btn");
const marketTables = document.querySelectorAll(".market-table");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

// Utility Functions
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// Mobile Navigation Toggle
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  document.body.classList.toggle("active");
};

// Close mobile menu when clicking on nav links
const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggleBtn.classList.remove("active");
  document.body.classList.remove("active");
};

// Sticky Header
const activeHeader = function () {
  header.classList.toggle("active", window.scrollY > 300);
};

// Favorite Button Toggle
const toggleActive = function () {
  this.classList.toggle("active");
};

// Scroll Reveal Animation
const scrollReveal = function () {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    section.classList.toggle("active", sectionTop < window.innerHeight / 1.5);
  });
};

// Market Stats Carousel for Mobile
const initStatsCarousel = () => {
  const statsContainer = document.querySelector(".stats-list");
  if (!statsContainer) return;

  const statsItems = document.querySelectorAll(".stat-item");
  let currentIndex = 0;
  const itemWidth = 200;
  const visibleItems = Math.max(1, Math.floor(window.innerWidth / itemWidth));

  if (window.innerWidth > 768) {
    statsItems.forEach((item) => (item.style.display = "flex"));
    return;
  }

  const showItems = (index) => {
    statsContainer.style.transform = `translateX(${-index * itemWidth}px)`;
  };

  const autoRotate = setInterval(() => {
    currentIndex =
      (currentIndex + 1) % Math.max(1, statsItems.length - visibleItems + 1);
    showItems(currentIndex);
  }, 3000);

  return () => clearInterval(autoRotate);
};

// Responsive Table Handling
const handleResponsiveTables = () => {
  marketTables.forEach((table) => {
    if (!table.parentNode.classList.contains("table-responsive")) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-responsive";
      wrapper.style.overflowX = "auto";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
};

// Search Functionality
const initSearch = () => {
  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Searching for:", searchInput.value);
      // Actual search implementation would go here
    });
  }
};

// Touch Device Detection
const detectTouchDevice = () => {
  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  document.body.classList.add(isTouch ? "touch-device" : "no-touch-device");
};

// Initialize all functionality
const init = () => {
  // Event Listeners
  addEventOnElem(navToggleBtn, "click", toggleNavbar);
  addEventOnElem(navbarLinks, "click", closeNavbar);
  addEventOnElem(window, "scroll", activeHeader);
  addEventOnElem(addToFavBtns, "click", toggleActive);
  addEventOnElem(window, "scroll", scrollReveal);
  addEventOnElem(window, "load", scrollReveal);

  // Tab functionality
  tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // Add content switching logic here
    });

    // Activate first tab by default
    if (index === 0) btn.classList.add("active");
  });

  // Responsive features
  const cleanUpCarousel = initStatsCarousel();
  handleResponsiveTables();
  initSearch();
  detectTouchDevice();

  // Window resize handler
  window.addEventListener("resize", () => {
    if (cleanUpCarousel) cleanUpCarousel();
    initStatsCarousel();
    handleResponsiveTables();
  });
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
