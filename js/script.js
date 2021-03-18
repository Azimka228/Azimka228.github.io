window.addEventListener('scroll', () => {
    let ScrollDistance = window.scrollY;



    document.querySelectorAll("section").forEach((el, i) => {
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

document.addEventListener("DOMContentLoaded", () => {
    const prev = document.querySelector('.slider__button_left'),
        next = document.querySelector('.slider__button_right'),
        slides = document.querySelectorAll('.slides'),
        Main = document.querySelector('.main'),
        PTags = document.querySelectorAll(".tag"),
        Hmenu = document.querySelector('.hamburger-menu'),
        HnavMenu = document.querySelector('.header_nav');

    let index = 0;
    const activeSlide = n => {
        for (slide of slides) {
            slide.classList.remove('selected');

        }
        slides[n].classList.add('selected');
    }

    const nextSlide = () => {
        if (index == slides.length - 1) {
            index = 0;
            activeSlide(index);

        } else {
            index++;
            activeSlide(index);
        }
    }

    next.addEventListener('click', nextSlide);

    const prevSlide = () => {
        if (index == 0) {
            index = slides.length - 1;
            activeSlide(index);
        } else {
            index--;
            activeSlide(index);
        }
    }
    prev.addEventListener('click', prevSlide);


    Hmenu.onclick = function (e) {
        e.preventDefault();

        Hmenu.classList.toggle("hamburger-menu_img_opened")
        if (HnavMenu.classList.contains("header_nav_opened")) {
            HnavMenu.classList.remove("header_nav_opened")
        } else {
            HnavMenu.classList.add("header_nav_opened")
        }

        document.querySelector('.header_nav_modal').classList.toggle("header_nav_modal_opened");
    }

    let HeaderModal = document.querySelector('.header_nav_modal');

    HeaderModal.addEventListener("click", e => {
        HnavMenu.classList.remove("header_nav_opened");
        HeaderModal.classList.remove("header_nav_modal_opened");
        Hmenu.classList.remove("hamburger-menu_img_opened");
    });

    let HeaderNavLi = document.querySelectorAll(".header_nav li a");
    for (var i = 0; i < HeaderNavLi.length; i++) {
        HeaderNavLi[i].addEventListener('click', (e) => {
            HnavMenu.classList.remove("header_nav_opened");
            HeaderModal.classList.remove("header_nav_modal_opened");
            Hmenu.classList.remove("hamburger-menu_img_opened");
        });
    }

    /* chips */


    function SetupChips() {
        const ProfileBTN = document.querySelectorAll('.tag');
        const ProfilePhoto = document.querySelectorAll('.avatar');
        ProfileBTN.forEach(button => {
            button.addEventListener('click', (e) => {
                for (let i = 0; i < ProfileBTN.length; i++) {
                    ProfileBTN[i].classList.remove('tag_active')
                }
                e.target.classList.add('tag_active');
                ProfilePhoto.forEach(image => {
                    if (image.dataset.tag === e.target.dataset.tagValue || e.target.dataset.tagValue === 'All') {
                        image.style = '';
                    } else {
                        image.style = 'display: none';
                    }

                })
            });
        });
        ProfilePhoto.forEach(images => {
            images.addEventListener('click', (e) => {
                e.target.style = 'opacity: 0.5;'
            })
        });
    }
    SetupChips();
});