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

/** 
 * Calendar stuff
 */

const gcal = {
  key: "AIzaSyCeqavu-XBjsQnkM2qqmgF78_IY77NiQ0A",
  id:
    "greenvilleschools.us_4ba2q4c7b7o4u0l8s7jasmh04c@group.calendar.google.com",

  cache: {},

  events(after = new Date(), before = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) {
    if (this.cache[after.toISOString() + "-" + before.toISOString()]) {
      return Promise.resolve(this.cache[after.toISOString() + "-" + before.toISOString()]);
    }
    return fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${gcal.id}/events?key=${
      gcal.key
      }&singleEvents=true&orderBy=startTime&timeMin=${after.toISOString()}&timeMax=${before.toISOString()}`
    )
      .then(r => r.json())
      .then(res => (this.cache[after.toISOString() + "-" + before.toISOString()] = res.items, res))
      .then(res => res.items);
  }
};

function formatTime(start, end) {
  start = new Date(start),
    end = new Date(end);


  if (start.getDate() === end.getDate()) {
    return start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + "—" + end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return start.toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }) + "—" + end.toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })
}
