document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const currentYear = document.getElementById("currentYear");

  /* ================= STORAGE ================= */

  function getPreference(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Page controls remain usable without localStorage.
    }
  }

  /* ================= ICONS ================= */

  function renderIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* ================= THEME ================= */

  function setTheme(theme) {
    const isDark = theme === "dark";

    body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i data-lucide="sun" aria-hidden="true"></i>'
        : '<i data-lucide="moon" aria-hidden="true"></i>';

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );

      themeToggle.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    }

    savePreference("theme", isDark ? "dark" : "light");
    renderIcons();
  }

  const savedTheme = getPreference("theme");
  setTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark-mode");
      setTheme(isDark ? "light" : "dark");
    });
  }

  /* ================= RTL / LTR ================= */

  function setDirection(direction) {
    const isRTL = direction === "rtl";

    html.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (rtlToggle) {
      rtlToggle.setAttribute("aria-pressed", String(isRTL));

      rtlToggle.setAttribute(
        "aria-label",
        isRTL
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout",
      );

      rtlToggle.setAttribute(
        "title",
        isRTL ? "Switch to LTR" : "Switch to RTL",
      );
    }

    savePreference("direction", isRTL ? "rtl" : "ltr");
    renderIcons();
  }

  const savedDirection = getPreference("direction");
  setDirection(savedDirection === "rtl" ? "rtl" : "ltr");

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const currentDirection = html.getAttribute("dir");
      setDirection(currentDirection === "rtl" ? "ltr" : "rtl");
    });
  }

  /* ================= FOOTER YEAR ================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ================= ACTIVE SIDEBAR SECTION ================= */

  const sidebarLinks = Array.from(
    document.querySelectorAll(".legal-nav a[href^='#']"),
  );

  const sections = sidebarLinks
    .map((link) => {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function updateActiveLink(sectionId) {
    sidebarLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      updateActiveLink(link.getAttribute("href").slice(1));
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length) {
          updateActiveLink(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ================= INITIALIZE ================= */

  renderIcons();
});
