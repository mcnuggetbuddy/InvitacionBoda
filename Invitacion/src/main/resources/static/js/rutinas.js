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
        langMenu.querySelectorAll('.lang-option').forEach(function (link) {
            link.addEventListener('click', function () {
                sessionStorage.setItem('scrollRestore', window.scrollY);
            });
        });
    }

    const carouselEl = document.getElementById('nosotrosCarousel');
    if (carouselEl && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carouselEl, { interval: 3000, ride: true });
    }

    const savedScroll = sessionStorage.getItem('scrollRestore');
    if (savedScroll !== null) sessionStorage.removeItem('scrollRestore');

    const container = document.getElementById('lottie-container');
    const preloader = document.getElementById('preloader');

    if (container && typeof lottie !== 'undefined') {
        fetch('https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/animation.json', { mode: 'cors' })
            .then(function (res) { return res.json(); })
            .then(function (animationData) {
                const imageAssets = (animationData.assets || []).filter(function (a) {
                    return a.p && typeof a.u === 'string';
                });

                imageAssets.forEach(function (asset) {
                    asset.u = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';
                });

                const r2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';
                const bgImages = [
                    r2 + 'background.jpeg',
                    r2 + 'foto-versiculo.jpg',
                    r2 + 'foto-vestimenta.jpg',
                    r2 + 'foto_rsvp.jpg'
                ];

                const preloadImages = imageAssets.map(function (asset) {
                    return new Promise(function (resolve) {
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = resolve;
                        img.src = asset.u + asset.p;
                    });
                }).concat(bgImages.map(function (src) {
                    return new Promise(function (resolve) {
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = resolve;
                        img.src = src;
                    });
                }));

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
                    const header = document.querySelector('.header');
                    if (header) header.classList.add('visible');
                    const pageContent = document.getElementById('page-content');
                    if (pageContent) pageContent.classList.add('visible');

                    const scrollTarget = savedScroll !== null ? parseInt(savedScroll, 10) : 0;
                    if (savedScroll !== null && scrollTarget > window.innerHeight) {
                        window.scrollTo(0, scrollTarget);
                    } else {
                        container.classList.add('played');
                        anim.play();
                    }
                });

                anim.addEventListener('complete', function () {
                    const arrow = document.getElementById('scroll-arrow');
                    if (arrow) arrow.classList.add('visible');
                });
            });
    }
});
