const team = "{{ page.team }}";
let seasons = "{{ page.seasons }}".split(", ");
let seasonSelected = 0;

// @TODO: Refactor this to be more DRY

let eventData = {
    loaded: false,
    events: seasons.map(v => ([])),
}

let rankingData = {
    loaded: false,
    rankings: {}
}

let awardData = {
    loaded: false,
    awards: {}
}


// Sort events for easy access
function handleEventData(events) {
    eventData.loaded = true;
    for(var i = 0; i < events.length; i++) {
        let seasonIndex = seasons.indexOf(events[i].season);
        eventData.events[seasonIndex].push(events[i])  
    }

    // Update season when data is loaded
    displaySeason();
}

function handleRankings(rankings) {
    rankingData.loaded = true;
    for(var i = 0; i < rankings.length; i++) {
        rankingData.rankings[rankings[i].sku] = rankings[i]
    }

    displaySeason();
}

function handleAwardData(awards) {
    awardData.loaded = true;
    for(var i = 0; i < awards.length; i++) {
        if(awardData.awards[awards[i].sku]) {
            awardData.awards[awards[i].sku].push(awards[i])
        }  else {
            awardData.awards[awards[i].sku] = [awards[i]]
        }
    }

    displaySeason();
}


// As soon as the page loads, we'll want to start loading our data, we'll fill it in as we get it
fetch("https://api.vexdb.io/v1/get_events?status=past&team=" + team)
    .then(res => res.json())
    .then(a => a.result)
    .then(handleEventData)
    .catch(console.error)

// Fetch ranking data as well
fetch("https://api.vexdb.io/v1/get_rankings?team=" + team)
    .then(res => res.json())
    .then(a => a.result)
    .then(handleRankings)
    .catch(console.error)

// Fetch award data
fetch("https://api.vexdb.io/v1/get_awards?team=" + team)
    .then(res => res.json())
    .then(a => a.result)
    .then(handleAwardData)
    .catch(console.error)

ELEMENTS.stats = {
    forward: null,
    back: null,
    seasonSelection: null,
    root: null
};

window.addEventListener("load", function() {

    ELEMENTS.stats.forward = document.querySelector("nav[for=stats] .forward");
    ELEMENTS.stats.back = document.querySelector("nav[for=stats] .back");
    ELEMENTS.stats.seasonSelection = document.querySelector("#seasonSelection");
    ELEMENTS.stats.root = document.getElementById("stats");
    
    displaySeason();

    ELEMENTS.stats.forward.addEventListener("click", function(e) {
        e.preventDefault();
        if(seasonSelected < seasons.length - 1) {
            seasonSelected++;
            displaySeason();
        }
    });

    ELEMENTS.stats.back.addEventListener("click", function(e) {
        e.preventDefault();
        if(0 < seasonSelected) {
            seasonSelected--;
            displaySeason();
        } 

    });


});

function makeEventDOM(event) {
    let rankings = rankingData.rankings[event.sku],
        awards = awardData.awards[event.sku];
    return h("section", { class: "event" }, [
        h("a", { href: "https://www.robotevents.com/robot-competitions/vex-robotics-competition/"+event.sku+".html" }, [
            h("h3", { class: "left heading"}, [event.name])
        ]),
        h("div", { class: "data" }, [
            rankings ? h("p", { class: "rank" }, ["Ranked " + rankings.rank + " (" + [rankings.wins, rankings.losses, rankings.ties ].join("-") + ")"]) : null,
            awards ? h("p", { class: "awards" }, ["Won " + awards.map(a => a.name.split("(")[0]).join(", ")]) : null
        ])  
    ])
}

function replaceChildren(container, newChildren) {
    while (container.firstChild) {
        container.firstChild.remove();
    }


    for(var i = 0; i < newChildren.length; i++) {
        container.appendChild(newChildren[i]);
    }
}

function displaySeason() {
    
    if(ELEMENTS.stats.seasonSelection) {
        ELEMENTS.stats.seasonSelection.innerHTML = seasons[seasonSelected];
    }

    if(seasonSelected === 0 && ELEMENTS.stats.back) {
         ELEMENTS.stats.back.classList.add("hidden");
    } else {
         ELEMENTS.stats.back.classList.remove("hidden")
    }

    if(seasonSelected === seasons.length - 1 && ELEMENTS.stats.forward) {
        ELEMENTS.stats.forward.classList.add("hidden");
   } else {
        ELEMENTS.stats.forward.classList.remove("hidden")
   }

   if(!eventData.loaded || !rankingData.loaded) return;
   let events = eventData.events[seasonSelected].map(makeEventDOM);
   if(events.length > 0) {
       replaceChildren(ELEMENTS.stats.root, events)
   } else {
       replaceChildren(ELEMENTS.stats.root, [
           h("p", { class: "nothing" }, ["No data"])
       ])
   }
}