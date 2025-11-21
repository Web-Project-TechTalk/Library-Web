// js/section3.js  →  PHIÊN BẢN HOÀN CHỈNH, CHẠY NGON 100%

const section3El = document.getElementById('section3');

// ==================== 1. DỊCH NGÔN NGỮ (giữ nguyên của bạn) ====================
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
        if (translations3[lang] && translations3[lang][key]) {
            el.textContent = translations3[lang][key];
        }
    });
}

// Kích hoạt nút đổi ngôn ngữ
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateSection3Language(lang);
        localStorage.setItem('language', lang); // nếu bạn dùng lưu ngôn ngữ
    });
});

// ==================== 2. ĐỔI THEME LIGHT/DARK (giữ nguyên) ====================
function toggleSection3Theme() {
    section3El.classList.toggle('light-theme');
    section3El.classList.toggle('dark-theme');
}

const themeBtn = document.getElementById('theme-switcher-btn') || document.getElementById('theme-switcher-btn-mobile');
themeBtn?.addEventListener('click', toggleSection3Theme);

// ==================== 3. HÀM KÉO NGANG BẰNG CHUỘT + TOUCH (QUAN TRỌNG NHẤT) ====================
function initSection3Drag() {
    const carouselWrapper = document.querySelector('#section3 .book-carousel-wrapper');
    const carousel = document.querySelector('#section3 .book-carousel');
    if (!carouselWrapper || !carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    carouselWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselWrapper.classList.add('active');
        startX = e.pageX - carouselWrapper.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        carouselWrapper.classList.remove('active');
    });

    carouselWrapper.addEventListener('mouseup', () => {
        isDown = false;
        carouselWrapper.classList.remove('active');
    });

    carouselWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events (điện thoại/tablet)
    carouselWrapper.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carouselWrapper.addEventListener('touchend', () => {
        isDown = false;
    });

    carouselWrapper.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// GỌI LẦN ĐẦU KHI TRANG LOAD
initSection3Drag();

// CHO PHÉP home-books.js GỌI LẠI SAU KHI ĐỔ DỮ LIỆU MỚ
window.initSection3Drag = initSection3Drag;

// ==================== XONG! ====================