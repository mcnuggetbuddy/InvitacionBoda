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
    const preloader = document.getElementById('preloader');

    if (container && typeof lottie !== 'undefined') {
        fetch('/img/animation.json')
            .then(function (res) { return res.json(); })
            .then(function (animationData) {
                const imageAssets = (animationData.assets || []).filter(function (a) {
                    return a.p && typeof a.u === 'string';
                });

                imageAssets.forEach(function (asset) {
                    asset.u = '/img/' + asset.u;
                });

                const preloadImages = imageAssets.map(function (asset) {
                    return new Promise(function (resolve) {
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = resolve;
                        img.src = asset.u + asset.p;
                    });
                });

                return Promise.all(preloadImages).then(function () {
                    return animationData;
                });
            })
            .then(function (animationData) {
                const anim = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: animationData
                });

                anim.addEventListener('DOMLoaded', function () {
                    if (preloader) preloader.classList.add('hidden');
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
            });
    }
});
