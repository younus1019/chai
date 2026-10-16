document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  // ========================================
  // ELEMENTS
  // ========================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

  const navDropdown = document.querySelector(".nav-dropdown");
  const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");

  // ========================================
  // SAFE LOCAL STORAGE
  // ========================================

  const getSavedValue = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  const saveValue = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Continue working if storage is unavailable.
    }
  };

  const savedTheme = getSavedValue("theme");
  const savedDirection = getSavedValue("direction");

  // ========================================
  // LUCIDE ICONS
  // ========================================

  const setLucideIcons = () => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  };

  // ========================================
  // THEME ICON
  // ========================================

  const updateThemeIcon = () => {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark-mode");

    themeToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );

    themeToggle.setAttribute("title", isDark ? "Light Mode" : "Dark Mode");

    setLucideIcons();
  };

  // ========================================
  // RTL ICON
  // ========================================

  const updateRtlIcon = () => {
    if (!rtlToggle) return;

    const isRtl = html.getAttribute("dir") === "rtl";

    rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';

    rtlToggle.setAttribute(
      "aria-label",
      isRtl ? "Switch to left-to-right" : "Switch to right-to-left",
    );

    rtlToggle.setAttribute("title", isRtl ? "Switch to LTR" : "Switch to RTL");

    setLucideIcons();
  };

  // ========================================
  // MOBILE MENU ICON
  // ========================================

  const updateMenuIcon = () => {
    if (!menuToggle) return;

    const isOpen = navMenu?.classList.contains("active");

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    setLucideIcons();
  };

  // ========================================
  // CLOSE MOBILE MENU
  // ========================================

  const closeMobileMenu = () => {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (navDropdown) {
      navDropdown.classList.remove("open");
    }

    if (navDropdownToggle) {
      navDropdownToggle.setAttribute("aria-expanded", "false");
    }

    updateMenuIcon();
  };

  // ========================================
  // APPLY SAVED THEME
  // ========================================

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  // ========================================
  // APPLY SAVED DIRECTION
  // ========================================

  html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

  // ========================================
  // INITIAL ICONS
  // ========================================

  updateThemeIcon();
  updateRtlIcon();
  updateMenuIcon();

  // ========================================
  // THEME TOGGLE
  // ========================================

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");

      saveValue("theme", isDark ? "dark" : "light");

      updateThemeIcon();
    });
  }

  // ========================================
  // RTL TOGGLE
  // ========================================

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const isRtl = html.getAttribute("dir") === "rtl";

      const newDirection = isRtl ? "ltr" : "rtl";

      html.setAttribute("dir", newDirection);
      saveValue("direction", newDirection);

      updateRtlIcon();
    });
  }

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      if (!isOpen && navDropdown) {
        navDropdown.classList.remove("open");
      }

      if (navDropdownToggle) {
        navDropdownToggle.setAttribute(
          "aria-expanded",
          navDropdown?.classList.contains("open") ? "true" : "false",
        );
      }

      updateMenuIcon();
    });
  }

  // ========================================
  // DROPDOWN TOGGLE
  // ========================================

  if (navDropdown && navDropdownToggle) {
    navDropdownToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = navDropdown.classList.toggle("open");

      navDropdownToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false",
      );
    });
  }

  // ========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ========================================

  document.addEventListener("click", (event) => {
    if (navDropdown && !navDropdown.contains(event.target)) {
      navDropdown.classList.remove("open");

      navDropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });

  // ========================================
  // ACTIVE LINK FOR ALL PAGES
  // ========================================

  const normalizePage = (href) => {
    if (!href) return "";

    try {
      const url = new URL(href, window.location.href);

      if (url.origin !== window.location.origin) {
        return "";
      }

      const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, "");

      const filename = pathname.split("/").pop().toLowerCase();

      // Treat the website root as index.html.
      return filename || "index.html";
    } catch (error) {
      return "";
    }
  };

  const currentPage = normalizePage(window.location.href);

  const navLinks = document.querySelectorAll(".nav-link, .nav-dropdown-link");

  // Remove stale active states first.
  navLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) => {
    toggle.classList.remove("active");
    toggle.removeAttribute("aria-current");
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    const linkPage = normalizePage(href);

    if (!linkPage || linkPage !== currentPage) return;

    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    // Highlight the parent dropdown when a submenu page is active.
    if (link.classList.contains("nav-dropdown-link")) {
      const dropdown = link.closest(".nav-dropdown");

      const dropdownToggle = dropdown?.querySelector(".nav-dropdown-toggle");

      if (dropdownToggle) {
        dropdownToggle.classList.add("active");
      }
    }
  });

  // ========================================
  // CLOSE MOBILE MENU AFTER NAVIGATION
  // ========================================

  document.querySelectorAll(".nav-link, .nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // ========================================
  // RESET MOBILE MENU ON RESIZE
  // ========================================

  window.addEventListener("resize", () => {
    if (window.innerWidth > 740) {
      closeMobileMenu();
    }
  });

  // ========================================
  // INITIALIZE LUCIDE ICONS
  // ========================================

  setLucideIcons();
});
