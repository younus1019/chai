document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  const rtlToggle = document.getElementById("rtlToggle");
  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  } else if (savedTheme === "light") {
    body.classList.remove("dark-mode");
  }

  if (savedDirection === "rtl") {
    html.setAttribute("dir", "rtl");
  } else if (savedDirection === "ltr") {
    html.setAttribute("dir", "ltr");
  }

  function updateThemeIcon() {
    if (!themeToggle) return;

    const iconName = body.classList.contains("dark-mode") ? "sun" : "moon";

    themeToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    themeToggle.setAttribute(
      "aria-label",
      body.classList.contains("dark-mode")
        ? "Switch to light mode"
        : "Switch to dark mode",
    );
  }

  function updateDirectionIcon() {
    if (!rtlToggle) return;

    rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';

    rtlToggle.setAttribute(
      "aria-label",
      html.getAttribute("dir") === "rtl"
        ? "Switch to left-to-right direction"
        : "Switch to right-to-left direction",
    );

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");

      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateThemeIcon();
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const isRTL = html.getAttribute("dir") !== "rtl";

      html.setAttribute("dir", isRTL ? "rtl" : "ltr");
      localStorage.setItem("direction", isRTL ? "rtl" : "ltr");

      updateDirectionIcon();
    });
  }

  updateThemeIcon();
  updateDirectionIcon();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
