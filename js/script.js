//const menuIcon = document.querySelector("#menu-icon");
//const navbar = document.querySelector(".navbar");
// Only close menu on mobile screens
if (window.innerWidth < 768) { // 768px is common mobile breakpoint
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
}


// ===== Sections and nav links =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a"); // ✅ correct selector
const header = document.querySelector("header");

// ===== Function to highlight nav links based on scroll =====
function highlightNav() {
  const scrollY = window.scrollY;

  let current = "";
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 100; // adjust for navbar
    const sectionHeight = section.offsetHeight;

    // Highlight current section
    if (scrollY >= sectionTop && (scrollY < sectionTop + sectionHeight || index === sections.length - 1)) {
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

// ===== Click event for nav links =====
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Remove active from all links
    navLinks.forEach(l => l.classList.remove("active"));
    // Add active to clicked link
    link.classList.add("active");

    // Close mobile menu if open
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// ===== Scroll event for sticky navbar & active link =====
window.addEventListener("scroll", () => {
  // Sticky navbar
  header.classList.toggle("sticky", window.scrollY > 100);

  // Highlight nav links
  highlightNav();
});

// ===== Highlight nav on page load =====
window.addEventListener("load", () => {
  highlightNav();
});

// ===== Scroll Reveal =====
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// ===== Typed JS =====
const typed = new Typed('.multiple-text', {
  strings: ['Frontend Developer', 'Web Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});
// ================= GitHub Projects Auto Fetch =================

window.addEventListener("DOMContentLoaded", () => {
  fetch("projects.json")
    .then(res => res.json())
    .then(projects => {
      const projectContainer = document.getElementById("github-projects");
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

