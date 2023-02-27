"use strict"

// Pricing

const pricingBtn = document.querySelectorAll(".btn__pricing");
const pricingCard = document.querySelectorAll(".pricing__card");

pricingBtn.forEach(onCardClick);

function onCardClick(item) {
    item.addEventListener("click", function () {
        let currentBtn = item;
        let cardId = currentBtn.getAttribute("data-card");
        let currentCard = document.querySelector(cardId);

        if( ! currentBtn.classList.contains('active') ) {
            pricingBtn.forEach(function (item) {
                item.classList.remove('active');
            });

            pricingCard.forEach(function (item) {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentCard.classList.add('active');
        }
    });
}

document.querySelector('.btn__pricing').click(); // имитация клика


// FAQ accardion
const faqs = document.querySelectorAll(".faq__item");

if (faqs.length > 0) {
    faqs.forEach(faq => {
        faq.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    });
}

// document.querySelector(".faq__item:nth-child(1)").click()


//BurgerMenu

const menuBurger = document.querySelector(".burger");
const menuNav = document.querySelector(".nav");

if (menuBurger) {
    menuBurger.addEventListener("click", () => {
        document.body.classList.toggle("lock");
        menuBurger.classList.toggle("active");
        menuNav.classList.toggle("active");
        header.classList.toggle("active")
    });
}

//Прокрутка при клике

const menuLinks = document.querySelectorAll('[data-goto]');

if (menuLinks.length > 0) {
    const header = document.querySelector('.header');
    for (let index = 0; index < menuLinks.length; index++) {
        const menuLink = menuLinks[index];
        menuLink.addEventListener("click", onMenuLinkClick)
    }

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - header.offsetHeight;

            if (menuBurger.classList.contains("active")) {
                document.body.classList.remove("lock");
                menuBurger.classList.remove("active");
                menuNav.classList.remove("active");
                header.classList.remove("active");
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}

// Header fixed
const header = document.querySelector('.header');
const intro = document.querySelector('.intro');
const headerH = header.offsetHeight;
const introH = intro.offsetHeight;

// if (document.documentElement.clientWidth > 990) {
    window.addEventListener("scroll", () => {
        let scrollDistance = window.scrollY;
    
        if (scrollDistance > introH - 75) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    });



// Animation
const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const AnimItemOffset = offset(animItem).top;
            const animStart = 4;  

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > AnimItemOffset - animItemPoint) && scrollY < (AnimItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (! animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove("_active");
                }

            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}
