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
    const prev = document.getElementById('btn_prev'),
        next = document.getElementById('btn_next'),
        slides = document.querySelectorAll('.main_content'),
        Main = document.querySelector('.main'),
        PTags = document.querySelectorAll(".tag"),
        Hmenu = document.querySelector('.hamburger-menu'),
        HnavMenu = document.querySelector('.header_nav_menu');

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
    const prevslide = () => {
        if (index == 0) {
            index = slides.length - 1;
            activeSlide(index);
        } else {
            index--;
            activeSlide(index);
        }
    }
    next.addEventListener('click', nextSlide)
    prev.addEventListener('click', prevslide)
    /* slider bg*/
    document.querySelector('.main__arrow-right').onclick = function () {
        if (Main.classList.contains("main_bg")) {
            Main.classList.remove("main_bg")
        } else {
            Main.classList.add("main_bg")
        }
    }
    document.querySelector('.main__arrow-left').onclick = function () {
        if (Main.classList.contains("main_bg")) {
            Main.classList.remove("main_bg")
        } else {
            Main.classList.add("main_bg")
        }

    }
    Hmenu.onclick = function (e) {
        e.preventDefault();

        Hmenu.classList.toggle("hamburger-menu_img_opened")
        if (HnavMenu.classList.contains("header_nav_menu_opened")) {
            HnavMenu.classList.remove("header_nav_menu_opened")
        } else {
            HnavMenu.classList.add("header_nav_menu_opened")
        }
        if (Hmenu !== e.target) {
            Hmenu.classList.remove("header_nav_menu_opened");
        }

    }
    /* chips */


    function SetupChips (){
        const ProfileBTN = document.querySelectorAll('.tag');
        const ProfilePhoto = document.querySelectorAll ('.avatar');
        ProfileBTN.forEach(button => {
            button.addEventListener('click', (e) => {
                for (let i = 0; i < ProfileBTN.length; i++) {
                    ProfileBTN[i].classList.remove('tag_active')
                }
                e.target.classList.add('tag_active');
                ProfilePhoto.forEach (image => {
                   if (image.dataset.tag === e.target.dataset.tagValue || e.target.dataset.tagValue === 'All') {
                    image.style = '';
                   } else {
                    image.style = 'display: none';
                   }
                
                })
            });
        });
     }
     SetupChips ();
});