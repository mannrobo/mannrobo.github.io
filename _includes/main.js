const ELEMENTS = {
  burger: null,
  header: null,
  navExpandos: null,
  calendarItems: null,
  main: null
};
const gcal = {
  key: "AIzaSyCeqavu-XBjsQnkM2qqmgF78_IY77NiQ0A",
  id:
    "greenvilleschools.us_4ba2q4c7b7o4u0l8s7jasmh04c@group.calendar.google.com",

  cache: {},

  events(after, before) {
    if (!after) {
      after = new Date();
    }
    if (!before) {
      before = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }
    if (this.cache[after.toISOString() + "-" + before.toISOString()]) {
      return Promise.resolve(
        this.cache[after.toISOString() + "-" + before.toISOString()]
      );
    }
    return fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${gcal.id}/events?key=${
        gcal.key
      }&singleEvents=true&orderBy=startTime&timeMin=${after.toISOString()}&timeMax=${before.toISOString()}`
    )
      .then(r => r.json())
      .then(
        res => (
          (this.cache[after.toISOString() + "-" + before.toISOString()] =
            res.items),
          res
        )
      )
      .then(res => res.items);
  }
};

function formatTime(start, end) {
  (start = new Date(start)), (end = new Date(end));

  if (start.getDate() === end.getDate()) {
    return (
      start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
      "—" +
      end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }

  return (
    start.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short"
    }) +
    "—" +
    end.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short"
    })
  );
}

let sizeEvent;
let smallScreen = false;
window.addEventListener(
  "resize",
  (sizeEvent = function sizeEvent() {
    if (document.documentElement.clientWidth < 1090) {
      ELEMENTS.header.classList.add("white-bg");
      ELEMENTS.burger.classList.remove("hidden");
    } else {
      ELEMENTS.header.classList.remove("white-bg");
      ELEMENTS.burger.classList.add("hidden");
    }
  })
);

function scrollEvent() {
  if (ELEMENTS.main) {
    if (
      this.scrollY >
      window.pageYOffset + ELEMENTS.main.getBoundingClientRect().top - 64
    ) {
      ELEMENTS.header.classList.add("scrolled");
    } else {
      ELEMENTS.header.classList.remove("scrolled");
    }
  }
}
window.addEventListener("scroll", scrollEvent);

document.addEventListener("DOMContentLoaded", function() {
  ELEMENTS.burger = document.querySelector("nav a.burger");
  ELEMENTS.header = document.querySelector("header");
  ELEMENTS.navExpandos = document.querySelectorAll("nav#global li.expando");
  ELEMENTS.burger.addEventListener("click", function(e) {
    e.preventDefault();
    ELEMENTS.burger.classList.toggle("active");
    ELEMENTS.header.classList.toggle("phoneNavOpen");
  });
  ELEMENTS.main = document.querySelector("main.container");
  ELEMENTS.navExpandos.forEach(function(expando) {
    expando.addEventListener("click", function() {
      expando.classList.toggle("open");
    });
  });
  sizeEvent();
  scrollEvent();
});
