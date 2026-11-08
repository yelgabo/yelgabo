// Shares the "rl-theme" key with the blog posts' own toggles, so one choice holds site-wide.
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("rl-theme");
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function isDark() {
    var set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.querySelector(".nav, .subnav__inner");
    if (!host) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    function label() { btn.textContent = isDark() ? "Light mode" : "Dark mode"; }
    label();
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("rl-theme", next); } catch (e) {}
      label();
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", label);
    }
    host.appendChild(btn);
  });
})();
