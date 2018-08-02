let sizeEvent;
let smallScreen = false;
window.addEventListener(
  "resize",
  (sizeEvent = function sizeEvent() {
    smallScreen =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <
      600;
    if (smallScreen) {
      ELEMENTS.burger.setAttribute("aria-hidden", "false");
      ELEMENTS.header.classList.add("smol");
    } else {
      ELEMENTS.burger.setAttribute("aria-hidden", "true");
      ELEMENTS.header.classList.remove("smol");
    }

    if (document.documentElement.clientWidth < 1090) {
      ELEMENTS.header.classList.add("white-bg");
    } else {
      ELEMENTS.header.classList.remove("white-bg");
    }
  })
);

window.addEventListener("scroll", function () {
  if (ELEMENTS.main) {
    if (this.scrollY > window.pageYOffset + ELEMENTS.main.getBoundingClientRect().top) {
      ELEMENTS.header.classList.add("scrolled");
    } else {
      ELEMENTS.header.classList.remove("scrolled");
    }
  }
});

window.addEventListener("load", function () {
  ELEMENTS.burger = document.querySelector("nav a.burger");
  ELEMENTS.header = document.querySelector("header");
  ELEMENTS.navLinks = document.querySelectorAll("header nav ul li");
  ELEMENTS.burger.addEventListener("click", function (e) {
    e.preventDefault();
    ELEMENTS.burger.classList.toggle("active");
  });
  ELEMENTS.navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (smallScreen) {
        ELEMENTS.burger.classList.toggle("active");
      }
    });
  });
  ELEMENTS.main = document.querySelector("main.container");
  sizeEvent();
});