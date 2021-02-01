
window.addEventListener('scroll', () => {
    let ScrollDistance = window.scrollY;



    document.querySelectorAll("header,section").forEach((el, i) => {
        if (el.offsetTop - document.querySelector(".header_nav").clientHeight <= ScrollDistance) {
            document.querySelectorAll(".header_nav a").forEach((el) => {
                if (el.classList.contains("active")) {
                    el.classList.remove("active");
                }
            });

            document.querySelectorAll(".header_nav li")[i].querySelector("a").classList.add("active")
        }
    });

});


const prev = document.getElementById('btn_prev'),
    next = document.getElementById('btn_next'),
    slides = document.querySelectorAll('.main_content');

let index = 0;
console.log(prev);
const activeSlide = n => {
    for (slide of slides) {
        slide.classList.remove('selected');

    }
    slides[n].classList.add('selected');
}

const nextSlide = () => {
    if (index == slides.length - 1) {
        index = 0;
        Activeslide(index);
    } else {
        index++;
        Activeslide(index);
    }
}
next.addEventListener('click', nextSlide);