// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Scroll Sections Active Links

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky navbar

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //    remove toggle icon and navbar when click navbar link

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// scroll reveal

ScrollReveal({
//   reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// typed js

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
    });

// ================= GitHub Projects Auto Fetch =================

const githubUsername = "Sandhiya04gs"; // change this

fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then(response => response.json())
  .then(repos => {
    const projectContainer = document.getElementById("github-projects");

    repos
      .filter(repo => !repo.fork) // hide forked repos
      .slice(0, 6) // show only 6 projects
      .forEach(repo => {
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
  .catch(error => console.error("GitHub Fetch Error:", error));

