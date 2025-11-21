const section3El = document.getElementById('section3');

// 1. Chuyển ngôn ngữ
const translations3 = {
    vi: {
        featuredBooks: "Sách nổi bật",
        exploreMore: "Khám phá thêm",
        section3_saying: '"Đọc vạn quyển sách, đi vạn dặm đường."'
    },
    en: {
        featuredBooks: "Featured Books",
        exploreMore: "Explore More",
        section3_saying: '"Read thousands of books, travel thousands of miles."'
    }
};

function updateSection3Language(lang) {
    section3El.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations3[lang][key];
    });
}

// Kích hoạt nút language
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateSection3Language(lang);
    });
});

// 2. Chuyển theme light/dark
function toggleSection3Theme() {
    section3El.classList.toggle('light-theme');
    section3El.classList.toggle('dark-theme');
}

// Nút theme switcher (có thể dùng nút chung trên navbar)
const themeBtn = document.getElementById('theme-switcher-btn') || document.getElementById('theme-switcher-btn-mobile');
themeBtn?.addEventListener('click', toggleSection3Theme);

window.addEventListener('load', () => {
    const carouselWrapper = document.querySelector('#section3 .book-carousel-wrapper');
    const carousel = document.querySelector('#section3 .book-carousel');
    if (!carouselWrapper || !carousel) return;

    // --- Desktop & Mobile drag ---
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag (desktop)
    carouselWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselWrapper.classList.add('active');
        startX = e.pageX - carouselWrapper.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselWrapper.offsetLeft;
        const walk = (x - startX) * 2; // tốc độ kéo
        carousel.scrollLeft = scrollLeft - walk;
    });

    window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        carouselWrapper.classList.remove('active');
    });

    // Touch drag (mobile/tablet)
    let isTouchDown = false;
    let touchStartX;
    let touchScrollLeft;

    carouselWrapper.addEventListener('touchstart', (e) => {
        isTouchDown = true;
        touchStartX = e.touches[0].pageX - carouselWrapper.offsetLeft;
        touchScrollLeft = carousel.scrollLeft;
    });

    carouselWrapper.addEventListener('touchmove', (e) => {
        if (!isTouchDown) return;
        const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
        const walk = (x - touchStartX) * 2;
        carousel.scrollLeft = touchScrollLeft - walk;
    });

    carouselWrapper.addEventListener('touchend', () => {
        isTouchDown = false;
    });
});

