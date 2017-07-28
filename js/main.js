
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
            scrollTo(
                getYOffset($(e.target.dataset.scrollto)) - 20,
                null,
                300
            );
            for (var x = 0; x < links.length; x++) links[x].classList.remove("active");
            e.target.classList.add("active");
        });
    }

    // Image "Carosel" (really just a fade in and out) in the header
    
    var i = 0;
    var top = $("header img.top");
    var bottom = $("header img.bottom");
    setInterval(function() {
        top.classList.toggle("step");
        bottom.classList.toggle("step");
        if(i++ % 2) {
            top.src = images[i % images.length]
        } else {
            bottom.src = images[i % images.length]
        }
    }, 10 * 1000);

});



/**
 * Nice Quadradtic Ease-In-Out replacement for scrollTo() by james2doyle
 * https://gist.github.com/james2doyle/5694700
 */
// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
        change = to - start,
        currentTime = 0,
        increment = 20;
    duration = (typeof (duration) === 'undefined') ? 500 : duration;
    var animateScroll = function () {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    };
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
