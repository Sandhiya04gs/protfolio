/* ================= MENU TOGGLE (SAFE) ================= */

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });
}

/* ================= SECTIONS & NAV ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
const header = document.querySelector("header");

function highlightNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 100);
  }
  highlightNav();
});

/* ================= TYPED JS (SAFE) ================= */

if (document.querySelector(".multiple-text")) {
  new Typed(".multiple-text", {
    strings: ["Frontend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

/* ================= SCROLL REVEAL (SAFE) ================= */

if (typeof ScrollReveal !== "undefined") {
  ScrollReveal({
    distance: "80px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
  ScrollReveal().reveal(".home-img, .portfolio-box, .contact form", { origin: "bottom" });
  ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
  ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });
}

window.addEventListener("DOMContentLoaded", () => {
  const githubUsername = "Sandhiya04gs"; // your GitHub username
  const projectContainer = document.getElementById("github-projects");
  if (!projectContainer) return;

  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      // Filter out forks if you want
      const projects = repos.filter(repo => !repo.fork);

      projects.forEach(repo => {
        const projectBox = document.createElement("div");
        projectBox.classList.add("portfolio-box");

        projectBox.innerHTML = `
          <h4>${repo.name}</h4>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        projectContainer.appendChild(projectBox);
      });
    })
    .catch(err => console.error(err));
});
