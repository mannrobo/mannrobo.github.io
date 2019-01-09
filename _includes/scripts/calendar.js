let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let selection = [new Date().getMonth(), new Date().getFullYear()];

function advanceMonth(current) {
  if (current[0] > 10) {
    return [0, current[1] + 1];
  }
  return [current[0] + 1, current[1]];
}
function regressMonth(current) {
  if (current[0] < 1) {
    return [11, current[1] - 1];
  }
  return [current[0] - 1, current[1]];
}

function dateString(sel) {
  return months[sel[0]] + " " + sel[1].toString();
}

function getEvents(sel) {
  return gcal.events(new Date(sel[1], sel[0]), new Date(sel[1], sel[0] + 1));
}

function loadEvents() {
  return getEvents(selection)
    .then(
      events => (
        events.length
          ? (ELEMENTS.calendarList.innerHTML = "")
          : (ELEMENTS.calendarList.innerHTML = "<p>Nothing this month...</p>"),
        events
      )
    )
    .then(events => events.map(makeEventDOM))
    .then(events => events.map(evt => ELEMENTS.calendarList.appendChild(evt)));
}

function makeEventDOM(event) {
  let dom = h(
    "section",
    {
      "aria-label": event.summary,
      class:
        Date.parse(event.end.dateTime) > Date.now()
          ? "future-event"
          : "past-event"
    },
    [
      h("header", { "aria-haspopup": true }, [
        h("p", { class: "title" }, [event.summary]),
        h("p", { class: "date" }, [
          new Date(event.start.dateTime).toLocaleDateString("en-us", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        ]),
        h("i", { class: "material-icons" }, ["expand_more"])
      ]),
      h("div", { class: "calendar-body" }, [
        h("div", { class: "calendar-meta" }, [
          h("div", { class: "calendar-time" }, [
            formatTime(event.start.dateTime, event.end.dateTime)
          ]),
          h("div", { class: "calendar-location" }, [
            h(
              "a",
              {
                href:
                  "https://www.google.com/maps/dir/?api=1&origin=" +
                  encodeURIComponent(event.location),
                target: "_blank",
                rel: "noopener"
              },
              [event.location.split(",")[0]]
            )
          ])
        ]),
        h("div", { class: "calendar-desc" }, [event.description || ""])
      ])
    ]
  );
  dom.addEventListener("click", function() {
    dom.classList.toggle("open");
  });
  return dom;
}

window.addEventListener("load", function() {
  ELEMENTS.calendarSelection = document.getElementById("monthSelection");
  ELEMENTS.calendarBack = document.querySelector("nav[for=calendar] a.back");
  ELEMENTS.calendarForward = document.querySelector(
    "nav[for=calendar] a.forward"
  );
  ELEMENTS.calendarList = document.querySelector("#calendar .calendar");

  ELEMENTS.calendarSelection.innerText = dateString(selection);

  ELEMENTS.calendarBack.addEventListener("click", function(e) {
    e.preventDefault();
    selection = regressMonth(selection);
    loadEvents();
    getEvents(regressMonth(selection));

    ELEMENTS.calendarSelection.innerText = dateString(selection);
  });

  ELEMENTS.calendarForward.addEventListener("click", function(e) {
    e.preventDefault();
    selection = advanceMonth(selection);
    loadEvents();
    getEvents(advanceMonth(selection));
    ELEMENTS.calendarSelection.innerText = dateString(selection);
  });

  loadEvents();
});
