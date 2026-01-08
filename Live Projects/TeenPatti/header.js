function loadActiveNav() {

  const path = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(a => {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
    }
  });
}
