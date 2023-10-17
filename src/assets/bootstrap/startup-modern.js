(function () {
    "use strict";

    var mainNav = document.querySelector("#mainNav");

    if (mainNav) {
        var collapseNavbar = function () {
            var scrollTop =
                window.pageYOffset !== undefined
                    ? window.pageYOffset
                    : (
                        document.documentElement ||
                        document.body.parentNode ||
                        document.body
                    ).scrollTop;

            if (scrollTop > 100) {
                mainNav.classList.add("navbar-shrink");
            } else {
                mainNav.classList.remove("navbar-shrink");
            }
        };
        collapseNavbar();
        document.addEventListener("scroll", collapseNavbar);
    }
})();
