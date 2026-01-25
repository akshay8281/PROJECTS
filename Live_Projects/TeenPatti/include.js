document.addEventListener("DOMContentLoaded", () => {
  // HEADER — no cache
  fetch("header.html")
    .then((r) => r.text())
    .then((t) => {
      document.getElementById("header-container").innerHTML = t;
      loadActiveNav();
    });

  // FOOTER — no cache
  fetch("footer.html")
    .then((r) => r.text())
    .then((t) => {
      document.getElementById("footer").innerHTML = t;
      loadActiveFooter();
    });
});

function loadActiveNav() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  document.querySelectorAll(".nav-link").forEach((link) => {
    let linkPath = link.getAttribute("href");

    // normalize
    if (!linkPath.startsWith("/")) linkPath = "/" + linkPath;
    linkPath = linkPath.replace(/\/$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ========= FOOTER ACTIVE STATE ========= */
function loadActiveFooter() {
  try {
    let url = window.location.pathname.toLowerCase();

    // if / treat as index.html
    if (url.endsWith("/")) url += "index.html";

    // remove trailing slash
    url = url.replace(/\/$/, "");

    // get filename
    const currentFile = url.substring(url.lastIndexOf("/") + 1) || "index.html";

    document.querySelectorAll(".footer-links-row a").forEach((link) => {
      const linkURL = new URL(
        link.getAttribute("href"),
        window.location.origin,
      );
      let linkPath = linkURL.pathname.toLowerCase().replace(/\/$/, "");

      const linkFile =
        linkPath.substring(linkPath.lastIndexOf("/") + 1) || "index.html";

      if (currentFile === linkFile) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  } catch (e) {
    console.warn("Footer active link could not be processed:", e);
  }
}
/* ====================================== */

function redirectToTeenPatti() {
  window.open(
    "https://www.earntp.com/m/34jyen?scene=quick_share&f=w&p=wa&l=en&tp=m154",
    "_blank",
    "noopener",
  );
}

// Scroll Button

// ===== Dual Scroll Button Behavior (SAFE) =====
document.addEventListener("DOMContentLoaded", () => {
  const up = document.getElementById("scrollUpBtn");
  const down = document.getElementById("scrollDownBtn");

  // Stop running if buttons are missing on this page
  if (!up || !down) return;

  function updateButtons() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (y <= 5) {
      down.classList.add("show");
      up.classList.remove("show");
    } else if (y >= max - 5) {
      up.classList.add("show");
      down.classList.remove("show");
    } else {
      up.classList.add("show");
      down.classList.add("show");
    }
  }

  up.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  down.addEventListener("click", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max, behavior: "smooth" });
  });

  updateButtons();
  window.addEventListener("scroll", updateButtons);
});
