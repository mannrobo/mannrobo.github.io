// Attach all the listeners
window.addEventListener("load", function() {
    function $(query) { return document.querySelector(query) }; // Like jQuery, but better

    $("header a.hamburger").addEventListener("click", function(e) {
        e.preventDefault();
        $("header a.hamburger").classList.toggle("active");
        $("header ul.links").classList.toggle("active");
    });



});