
$(window).ready(function() {
    $("#foot").hide();
    $("#loading_div").fadeIn(1500);

    if ($("#information").text().length == 0) {
        getInner();
    }

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);

        }
    });
});

function getInner() {
    /*
      async fetch for resources
    */
    $.ajax({
        method: 'GET',
        url: 'body.html',
        dataType: 'html',
        success: (html_div) => {
            var imageURLs = ['images/home.jpg',
                'images/autoportrait.jpg',
                'images/autoportrait_home.jpg',
                'images/kayak.jpg',
                'images/bateau.jpg'
            ];

            function preloadImages(srcs) {
                function loadImage(src) {
                    return new Promise((resolve, reject) => {
                        var img = new Image();
                        img.onload = () => {
                            resolve(img);
                        };
                        img.onerror = img.onabort = () => {
                            reject(src);
                        };
                        img.src = src;
                    });
                }
                var promises = [];
                srcs.forEach(el => {
                    promises.push(loadImage(el));
                });
                return Promise.all(promises);
            }

            preloadImages(imageURLs).then((imgs) => {
                console.log('Loaded all images' + imgs);
                $("#loading_div").fadeOut('100');
                $("#information").html(html_div);
                $("#foot").show();
            }, (errImg) => {
                console.log(new Error('Error loading images'));
                $("#loading_div").fadeOut('100');
                $("#information").html(html_div);
                $("#foot").show();
            });
        }
    });
}

var inpage_lock = false;

window.onscroll = function() {
    makeNavVisible()
};

// change style of navbar as going through different sections of the website
function makeNavVisible() {
    var navbar = document.getElementById("myNavbar");
    var navbar_container = document.getElementById("navbar-container");

    if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) && inpage_lock == false) { //after passing 100px in terms of scroll
        navbar_container.classList.remove('w3-white');
        navbar_container.classList.remove('w3-opacity');
        navbar.className = "w3-bar" + " w3-card-2" + " w3-animate-top" + " w3-white";
        setTimeout(() => {
            navbar.classList.remove('w3-animate-top');
        }, 1000);
        inpage_lock = true;
    } else if ($(document).scrollTop() == 0) {
        navbar.className = navbar.className.replace(" w3-card-2 w3-white", "");
        navbar_container.classList.add('w3-white');
        navbar_container.classList.add('w3-opacity');
        inpage_lock = false;
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

//Scrolling to about section for a tags that were not binded to event at load time
function async_scroll_about() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 700);
}
