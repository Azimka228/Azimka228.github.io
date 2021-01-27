'use strict';
window.onload = function () {
    const BODY = document.querySelector('body');
    const MENU = document.getElementById('menu');
    const MOBILE_MENU = document.querySelector('.header__mobile-menu');
    const BURGER = document.getElementById('burger');
    const BUTTON_IPHONE_VERTICAL = document.getElementById('button_iphone-vertical');
    const BUTTON_IPHONE_HORIZONTAL = document.getElementById('button_iphone-horizontal');
    const BUTTON_IPHONE_CENTRAL = document.getElementById('back-slide-button');
    const TABS = document.getElementById('tabs_menu');
    const PROJECTS = document.getElementById('projects');
    const FORM = document.getElementById('form');
    const BUTTON = document.getElementById('form__button');
    const POPUP = document.getElementById('popup');
    const CLOSE_BUTTON = document.getElementById('close__button');
    const REQUIRED = "Это обязательное поле";
    const TYPE_MISMATCH_EMAIL= "Неправильный формат, введите email";
    const PATTERN_MISMATCH_NAME = "В имени не должно быть цифр";
    const inputs = Array.from(document.querySelectorAll('form[name=form] input'));

    //Открываем меню бургер

    BURGER.addEventListener('click', (e) => {
        if (e.target.tagName === "DIV") {
            if (e.target.classList[1] == 'header__burger-button_active') {
                e.target.classList.remove('header__burger-button_active');
                document.getElementById('mobile-menu').classList.add('header__mobile-menu_hidden');
                BODY.classList.remove('scroll-hidden');
            }
            else {
                e.target.classList.add('header__burger-button_active');
                document.getElementById('mobile-menu').classList.remove('header__mobile-menu_hidden');
                BODY.classList.add('scroll-hidden');
            }
        }

        else {
            if (e.target.parentElement.classList[1] == 'header__burger-button_active') {
                e.target.parentElement.classList.remove('header__burger-button_active');
                document.getElementById('mobile-menu').classList.add('header__mobile-menu_hidden');
                BODY.classList.remove('scroll-hidden');
            }
            else {
                e.target.parentElement.classList.add('header__burger-button_active');
                document.getElementById('mobile-menu').classList.remove('header__mobile-menu_hidden');
                BODY.classList.add('scroll-hidden');
            }
        }
    });



    function chooseItemMenuBurger(event) {
        MOBILE_MENU.querySelectorAll('a').forEach(el =>
            el.classList.remove('navigation__link-mobile_state_active'));

        event.target.classList.add('navigation__link-mobile_state_active');
        document.getElementById('mobile-menu').classList.add('header__mobile-menu_hidden');
        BODY.classList.remove('scroll-hidden');
    }

    MOBILE_MENU.addEventListener('click', chooseItemMenuBurger);

    //Реализуем активные пункты меню при перемещении по ним

    function chooseItemMenu(event) {
        MENU.querySelectorAll('a').forEach(el =>
            el.classList.remove('navigation__link_state_active'));

        event.target.classList.add('navigation__link_state_active');
    }


    //Плавный скролл до нужного раздела
    document.addEventListener('scroll', onScroll);

    function onScroll() {
        const curPos = window.scrollY;
        const sections = document.querySelectorAll('header, section');
        const links = document.querySelectorAll('#menu a');

        sections.forEach((el) => {
            const heightHeader = 95;
            if(el.offsetTop - heightHeader <= curPos && (el.offsetTop + el.offsetHeight - heightHeader) > curPos) {
                links.forEach((a) => {
                    a.classList.remove('navigation__link_state_active');
                    if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                        a.classList.add('navigation__link_state_active');
                    }

                })
            }
        })

    }


//Переключение слайдов бесконечной каруселькой
    const ARROW_PREV = document.getElementById('arrow-prev');
    const ARROW_NEXT = document.getElementById('arrow-next');

    const SLIDER = document.getElementById('slider');
    const SLIDES = document.querySelectorAll('.slider__item');
    let currentSlide = 0;
    let isEnabled = true;

    function changeCurrentSlide(n) {
        currentSlide = (n + SLIDES.length) % SLIDES.length; //делаем промотку, доходя до границы получаем 0
    }

    function hideSlide(direction) {
        isEnabled = false;
        SLIDES[currentSlide].classList.add(direction);
        SLIDES[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('slider__item_active', direction);
        })
    }

    function showSlide(direction) {
        SLIDES[currentSlide].classList.add('slider__item_next', direction);
        SLIDES[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('slider__item_next', direction);
            this.classList.add('slider__item_active');
            isEnabled = true;
        })
    }

    function previousSlide(n) {
        hideSlide('to-right');
        changeCurrentSlide(n - 1);
        showSlide('from-left');
        SLIDER.classList.toggle("slider_blue");
        document.querySelector(".slider__arrow.left").classList.toggle("arrow_color");
        document.querySelector(".slider__arrow.right").classList.toggle("arrow_color");
        document.querySelector('.slider__item_back-slide').classList.add('show')
    }

    function nextSlide(n) {
        hideSlide('to-left');
        changeCurrentSlide(n + 1)
        showSlide('from-right');
        SLIDER.classList.toggle("slider_blue");
        document.querySelector(".slider__arrow.left").classList.toggle("arrow_color");
        document.querySelector(".slider__arrow.right").classList.toggle("arrow_color");
        document.querySelector('.slider__item_back-slide').classList.add('show')

    }

    ARROW_PREV.addEventListener('click', function () {
        // changeCurrentSlide(currentSlide - 1);
        if (isEnabled) {
            previousSlide(currentSlide);
        }
    })

    ARROW_NEXT.addEventListener('click', function () {
        if (isEnabled) {
            nextSlide(currentSlide);
        }
    })



//Активация телефонов слайда1 (экран гаснет)
    function offDisplayLeftPhone() {
        const blackDisplayVertical = document.getElementById('black-display-vertical')
        blackDisplayVertical.classList.toggle('slider__black-display_display-off');
    }

    function offDisplayRightPhone() {
        const blackDisplayHorizontal = document.getElementById('black-display-horizontal');
        blackDisplayHorizontal.classList.toggle('slider__black-display_display-off');
    }

//Активация телефона слайда2 (экран гаснет)
    function offDisplayCentralPhone() {
        const blackDisplayCentral = document.getElementById('back-phone-display')
        blackDisplayCentral.classList.toggle('back-slide__phone-display_off');
    }

//Переключение табов Portfolio и рандомное перемещение картинок Portfolio
    function chooseTabAndMakeRandom(event) {
        if (event.target.tagName === 'BUTTON') {
            TABS.querySelectorAll('button').forEach(el =>
                el.classList.remove('portfolio__tabs-item_active'));
            event.target.classList.add('portfolio__tabs-item_active');
            event.stopPropagation();

            let arrOfSrc = [];
            PROJECTS.querySelectorAll('img').forEach((el) => {
                arrOfSrc.push(el.src);
                el.src = '';
            })
            let randomArr = arrOfSrc.sort(() => Math.random() - 0.5);
            PROJECTS.querySelectorAll('img').forEach((el, i) => el.src = randomArr[i]);
        }
    }

//Добавляем рамку выбранному проекту Portfolio
    function addBorderForProjects(event) {
        if (event.target.tagName === 'IMG') {
            PROJECTS.querySelectorAll('img').forEach(el => {
                el.classList.remove('portfolio__photo-grid-item_active');
            });
            event.target.classList.add('portfolio__photo-grid-item_active');
        }
    };

//очищаем область ошибок
    function _removeHtmlErrors(elems) {
        elems.forEach((field) => field.textContent = '');
    }

    //проверка полей при наборе
    function _checkValidityOnInput(target, validityState, error, form) {
        const inputs = Array.from(document.querySelectorAll('form[name=form] input'));
        inputs.forEach((input) => {
            if (target.name === input.name) {
                if (validityState) {
                    form.querySelector(`#${input.name}`)
                        .textContent = error;
                }

                if (target.validity.valid) {
                    form.querySelector(`#${input.name}`)
                        .textContent = '';
                }
            }
        });
    }

    //проверка полей при сабмите
    function _checkValidityOnSubmit(inputs, error, form) {
        inputs.forEach((input) => {
            if (error === REQUIRED) {
                if (input.validity.valueMissing) {
                    form.querySelector(`#${input.name}`)
                        .textContent = error;
                }
            }

            if (error === TYPE_MISMATCH_EMAIL) {
                if (input.validity.typeMismatch) {
                    form.querySelector(`#${input.name}`)
                        .textContent = error;

                }
            }

            if (error === PATTERN_MISMATCH_NAME) {
                if (input.validity.patternMismatch) {
                    form.querySelector(`#${input.name}`)
                        .textContent = error;

                }
            }

            if (input.validity.valid) {
                form.querySelector(`#${input.name}`)
                    .textContent = '';
            }

        });
    }

    //добавление ошибок, ннада повесить на событие ввода
    function addHtmlErrors(e) {
        const {target} = e;
        _checkValidityOnInput(target, target.validity.valueMissing, REQUIRED, FORM);
        _checkValidityOnInput(target, target.validity.typeMismatch, TYPE_MISMATCH_EMAIL, FORM);
        _checkValidityOnInput(target, target.validity.patternMismatch, PATTERN_MISMATCH_NAME, FORM);

    }


//Отменяем отправление данных по кнопке Сабмит. Добавляем попап с отправленными опциями поверх.
    function popupHandler(event) {

        if (validate(inputs)) {
            event.preventDefault();
            openPopup();
        } else {
            _checkValidityOnSubmit(inputs, REQUIRED, FORM);
            _checkValidityOnSubmit(inputs, TYPE_MISMATCH_EMAIL, FORM);
            _checkValidityOnSubmit(inputs, PATTERN_MISMATCH_NAME, FORM);

        }
    }

    function openPopup() {
        let subjectValue = FORM.subject.value;
        let describeValue = FORM.describe.value;
        if (subjectValue.length) {
            document.getElementById('popup__result-subject').innerText = subjectValue;
        } else
            document.getElementById('popup__subject').innerText = 'Without subject'

        if (describeValue.length) {

            document.getElementById('popup__result-describe').innerText = describeValue;
        } else
            document.getElementById('popup__describe').innerText = 'Without description';

        POPUP.classList.remove('popup__hidden');

    }

    function closePopup(event) {
        if (event.target.tagName === 'BUTTON') {
            POPUP.classList.add('popup__hidden');
            FORM.reset();
        }
    }

    function validate(inputs) {
        return inputs.every((elem) => elem.checkValidity());
    }

    function _enableButton() {
        BUTTON.removeAttribute('disabled', true);
    }

    function _disableButton() {
        BUTTON.setAttribute("disabled", true);
    }

    function checkButton(event) {
        event.preventDefault();
        const inputs = Array.from(document.querySelectorAll('form[name=form] input'));
        if (validate(inputs)) {
            _enableButton();
            _removeHtmlErrors(inputs);
        } else {
            _disableButton();
        }
    }

//Слушатели событий
    MENU.addEventListener('click', chooseItemMenu);
    BUTTON_IPHONE_VERTICAL.addEventListener('click', offDisplayLeftPhone);
    BUTTON_IPHONE_HORIZONTAL.addEventListener('click', offDisplayRightPhone);
    BUTTON_IPHONE_CENTRAL.addEventListener('click', offDisplayCentralPhone);
    TABS.addEventListener('click', chooseTabAndMakeRandom);
    PROJECTS.addEventListener('click', addBorderForProjects);
    FORM.addEventListener('submit', checkButton);
    FORM.addEventListener('submit', popupHandler);
    FORM.addEventListener('input', addHtmlErrors);
    FORM.addEventListener('input', checkButton);
    CLOSE_BUTTON.addEventListener('click', closePopup);


}
