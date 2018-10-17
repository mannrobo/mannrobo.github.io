const team = "{{ page.team }}";
let seasons = "{{ page.seasons }}".split(", ");
let seasonSelected = 0;

ELEMENTS.stats = {
    forward: null,
    back: null,
    seasonSelection: null
};

window.addEventListener("load", function() {

    ELEMENTS.stats.forward = document.querySelector("nav[for=stats] .forward");
    ELEMENTS.stats.back = document.querySelector("nav[for=stats] .back");
    ELEMENTS.stats.seasonSelection = document.querySelector("#seasonSelection");
    
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

function displaySeason() {
    ELEMENTS.stats.seasonSelection.innerHTML = seasons[seasonSelected];

    if(seasonSelected === 0) {
         ELEMENTS.stats.back.classList.add("hidden");
    } else {
         ELEMENTS.stats.back.classList.remove("hidden")
    }

    if(seasonSelected === seasons.length - 1) {
        ELEMENTS.stats.forward.classList.add("hidden");
   } else {
        ELEMENTS.stats.forward.classList.remove("hidden")
   }
}