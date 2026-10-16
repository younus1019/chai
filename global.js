document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

  const navDropdown = document.querySelector(".nav-dropdown");
  const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  const setLucideIcons = () => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  };

  const updateThemeIcon = () => {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

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

  const closeMobileMenu = () => {
    if (!navMenu) return;

    navMenu.classList.remove("active");

    if (navDropdown) {
      navDropdown.classList.remove("open");
    }

    if (navDropdownToggle) {
      navDropdownToggle.setAttribute("aria-expanded", "false");
    }

    updateMenuIcon();
  };

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  if (savedDirection === "rtl") {
    html.setAttribute("dir", "rtl");
  } else {
    html.setAttribute("dir", "ltr");
  }

  updateThemeIcon();
  updateRtlIcon();
  updateMenuIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");

      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateThemeIcon();
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const isRtl = html.getAttribute("dir") === "rtl";

      if (isRtl) {
        html.setAttribute("dir", "ltr");
        localStorage.setItem("direction", "ltr");
      } else {
        html.setAttribute("dir", "rtl");
        localStorage.setItem("direction", "rtl");
      }

      updateRtlIcon();
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      if (!isOpen && navDropdown) {
        navDropdown.classList.remove("open");

        if (navDropdownToggle) {
          navDropdownToggle.setAttribute("aria-expanded", "false");
        }
      }

      updateMenuIcon();
    });
  }

  if (navDropdown && navDropdownToggle) {
    navDropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navDropdown.classList.toggle("open");

      navDropdownToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false",
      );
    });
  }

  document.addEventListener("click", (event) => {
    if (navDropdown && !navDropdown.contains(event.target)) {
      navDropdown.classList.remove("open");

      if (navDropdownToggle) {
        navDropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.querySelectorAll(".nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 740) {
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
    }
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  setLucideIcons();
});
