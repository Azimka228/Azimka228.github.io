Window.onscroll = function FixedHeader () {

    var header = document.querySelector ('.header');

    if (window.pageYOffset > 10) {
        header.classList.add ('header_fixed')
    }

} 