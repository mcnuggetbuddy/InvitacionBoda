document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.getElementById('navToggler');
    const menu = document.getElementById('navMenu');
    if (toggler && menu) {
        toggler.addEventListener('click', function () {
            menu.classList.toggle('open');
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
            anim.goToAndStop(0, true);
        });

        container.addEventListener('click', function () {
            if (!container.classList.contains('played')) {
                container.classList.add('played');
                anim.play();
                const header = document.querySelector('.header');
                if (header) header.classList.add('visible');
            }
        });
    }
});