(function () {
  var year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;
  function set(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { set(!header.classList.contains("nav-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  document.querySelectorAll(".site-nav a, .site-nav button").forEach(function (el) { el.addEventListener("click", function () { set(false); }); });
})();
