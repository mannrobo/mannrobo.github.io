document.addEventListener("DOMContentLoaded", function() {
  ELEMENTS.calendarItems = document.querySelectorAll(
    "#calendar .calendar section"
  );

  ELEMENTS.calendarItems.forEach(function(item) {
    var header = item.querySelector("header");
    header.addEventListener("click", function() {
      item.classList.toggle("open");
    });
  });

  gcal.events().then(events =>
    ELEMENTS.calendarItems.forEach((item, i) => {
      let event = events[i],
        title = item.querySelector("p.title"),
        date = item.querySelector("p.date"),
        desc = item.querySelector("div.calendar-desc"),
        time = item.querySelector(".calendar-time"),
        location = item.querySelector(".calendar-location");

      title.innerHTML = event.summary;
      date.innerHTML = new Date(event.start.dateTime).toLocaleDateString();
      desc.innerHTML = event.description;
      time.innerHTML = formatTime(event.start.dateTime, event.end.dateTime);
      location.innerHTML = `<a target="_blank" rel="noopener" href="${"https://www.google.com/maps/dir/?api=1&origin=" +
        encodeURIComponent(event.location)}">${
        event.location.split(",")[0]
      }</a>`;
    })
  );
});
