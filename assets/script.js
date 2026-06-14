/* ==========================================
   KADROLLI FINANCIAL SERVICES
   PREMIUM WEBSITE SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCounters();
    initTestimonialSlider();
    initFAQ();
    initSmoothScroll();
    initNavbarScroll();

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initCounters() {

    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {

        const target = +counter.getAttribute('data-target');

        let current = 0;

        const increment = target / 100;

        const updateCounter = () => {

            current += increment;

            if(current < target){

                counter.innerText = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            }else{

                counter.innerText = target;

            }

        };

        updateCounter();

    });

}

/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

function initTestimonialSlider(){

    const track = document.querySelector('.testimonial-track');

    if(!track) return;

    let currentIndex = 0;

    const cards = document.querySelectorAll('.testimonial-card');

    const totalCards = cards.length;

    setInterval(() => {

        currentIndex++;

        if(currentIndex >= totalCards){

            currentIndex = 0;

        }

        const cardWidth = cards[0].offsetWidth + 25;

        track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    },5000);

}

/* ==========================================
   FAQ ACCORDION
========================================== */

function initFAQ(){

    const questions =
    document.querySelectorAll('.faq-question');

    questions.forEach(question => {

        question.addEventListener('click', () => {

            const answer =
            question.nextElementSibling;

            if(answer.style.display === "block"){

                answer.style.display = "none";

            }else{

                answer.style.display = "block";

            }

        });

    });

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll(){

    const links =
    document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener('click', function(e){

            e.preventDefault();

            const target =
            document.querySelector(this.getAttribute('href'));

            if(target){

                target.scrollIntoView({

                    behavior:'smooth'

                });

            }

        });

    });

}

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

function initNavbarScroll(){

    const header =
    document.querySelector('.header');

    if(!header) return;

    window.addEventListener('scroll', () => {

        if(window.scrollY > 50){

            header.style.boxShadow =
            '0 10px 30px rgba(0,0,0,.08)';

        }else{

            header.style.boxShadow =
            '0 2px 10px rgba(0,0,0,.05)';

        }

    });

}

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn =
document.querySelector('.menu-toggle');

const navLinks =
document.querySelector('.nav-links');

if(menuBtn){

    menuBtn.addEventListener('click', () => {

        navLinks.classList.toggle('active');

    });

}

/* ==========================================
   FUTURE CALCULATORS SUPPORT
========================================== */

function calculateSIP(
monthlyInvestment,
annualReturn,
years
){

    const r = annualReturn / 12 / 100;

    const n = years * 12;

    const futureValue =
    monthlyInvestment *
    (((Math.pow(1+r,n)-1)/r)*(1+r));

    return futureValue.toFixed(0);

}

function calculateLumpsum(
investment,
annualReturn,
years
){

    const futureValue =
    investment *
    Math.pow(
        (1+annualReturn/100),
        years
    );

    return futureValue.toFixed(0);

}

/* ==========================================
   GOOGLE ANALYTICS READY
========================================== */

function trackEvent(
eventName
){

    if(typeof gtag !== 'undefined'){

        gtag('event',eventName);

    }

}
const hamburger =
document.getElementById("hamburger");

const navLinks =
document.getElementById("navLinks");

if(hamburger){

hamburger.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}
