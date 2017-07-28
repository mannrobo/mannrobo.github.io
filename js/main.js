
// Carosel Images
var images = [
    "https://images.unsplash.com/photo-1496482475496-a91f31e0386c?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1498477386155-805b90bf61f7?dpr=1&auto=format&fit=crop&w=1500&h=913&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
    "https://images.unsplash.com/photo-1496251713551-8cef3b476b0c?dpr=1&auto=format&fit=crop&w=1500&h=998&q=80&cs=tinysrgb&crop="
];
// Preload all these images
images.forEach(function(src) {
    var img = new Image();
    img.src = src;
});

// Attach all the listeners
window.addEventListener("load", function() {
    function $(query) { return document.querySelector(query) }; // Like jQuery, but better

    $("header a.hamburger").addEventListener("click", function(e) {
        e.preventDefault();
        $("header a.hamburger").classList.toggle("active");
        $("header ul.links").classList.toggle("active");
    });

    var links = document.querySelectorAll("header ul.links li a");
    for(var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function(e) {
            e.preventDefault();
            console.log(e.target.dataset.scrollto);
            scrollToElement($(e.target.dataset.scrollto), 400);
            for (var x = 0; x < links.length; x++) links[x].classList.remove("active");
            e.target.classList.add("active");
        });
    }

    if(window.carosel) {
        console.log("Carosel Activated");
        var i = 0;
        var top = $("header .bg .top");
        var bottom = $("header .bg .bottom");
        setInterval(function() {
            top.classList.toggle("step");
            bottom.classList.toggle("step");

            if(i++ % 2) {
                top.src = carosel[i % carosel.length]
            } else {
                bottom.src = carosel[i % carosel.length]
            }
        }, 10 * 1000)
    }

});



function scrollToElement(element, duration, callback) {
    if(!element) return;
    var startingY = window.pageYOffset;
    var diff = getYOffset(element) - startingY;
    var start;

    requestAnimationFrame(function go(timestamp) {
        if(!start) start = timestamp;
        var delta = timestamp - start, // Elapsed time
            percent = Math.min(delta / duration, 1); // [0, 1]

        scrollTo(0, startingY + diff * percent);
        if (delta < duration) {
            window.requestAnimationFrame(go);
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    });
    animateScroll();
}

/**
 * Returns the y offset of the specified element
 * @param {Element} element 
 */
function getYOffset(element) {
    var rec = element.getBoundingClientRect();
    return rec.top + window.scrollY;
}


var ScrollEvents = (function() {
    var events = {};
    window.addEventListener("scroll", function() {
        var current = window.scrollY;
        Object.keys(events)
            .filter( function(pixel) { return pixel < current && !events[pixel].run } ) // Goddamn Internet Explorer, not supporting Arrow Functions!
            .forEach( function(pixel) { events[pixel].fn(); events[pixel].run = true } );
    });
    /**
     * Adds a new scroll event at `value`
     * @param {Number} value The pixel value to trigger this call
     * @param {Function} fn The function to call
     */
    function add(value, fn) { 
        return events[value] = {
            fn: fn,
            run: false
        }
    }

    /**
     * Removes a scroll event from execution
     * @param {Number} value The pixel value of the trigger to be removed
     */
    function remove(value) {
        delete events[value];
    }

    // I should really hook up babel so I don't have to use this nonsense anymore
    return { 
        add: add,
        remove: remove
    };
})();
