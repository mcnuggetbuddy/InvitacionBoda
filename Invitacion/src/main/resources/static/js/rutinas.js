document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.getElementById('navToggler');
    const menu = document.getElementById('navMenu');
    if (toggler && menu) {
        toggler.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
    }

    const langToggler = document.getElementById('langToggler');
    const langMenu = document.getElementById('langMenu');
    if (langToggler && langMenu) {
        langToggler.addEventListener('click', function (e) {
            e.stopPropagation();
            langMenu.classList.toggle('open');
        });
        document.addEventListener('click', function () {
            langMenu.classList.remove('open');
        });
    }

    const carouselEl = document.getElementById('nosotrosCarousel');
    if (carouselEl && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carouselEl, { interval: 3000, ride: true });
    }

    const container = document.getElementById('lottie-container');
    if (container && typeof lottie !== 'undefined') {
        const anim = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/img/animation.json'
        });

        anim.addEventListener('DOMLoaded', function () {
            container.classList.add('played');
            anim.play();
            const header = document.querySelector('.header');
            if (header) header.classList.add('visible');
            const pageContent = document.getElementById('page-content');
            if (pageContent) pageContent.classList.add('visible');
        });

        anim.addEventListener('complete', function () {
            const arrow = document.getElementById('scroll-arrow');
            if (arrow) arrow.classList.add('visible');
        });
    }
});