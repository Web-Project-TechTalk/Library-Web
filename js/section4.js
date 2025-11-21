const section4El = document.getElementById('section4');

// 1. Dịch ngôn ngữ
const translations4 = {
    vi: {
        recommendedBooks: "Khám phá bộ sưu tập",
        exploreMore: "Khám phá thêm",
        section4_saying: '"Sách vở chứa đựng nhiều kho báu hơn mọi của cải của cướp biển."'
    },
    en: {
        recommendedBooks: "Explore our collections",
        exploreMore: "Explore More",
        section4_saying: '"There is more treasure in books than the treasures of the pirates."'
    }
};

function updateSection4Language(lang) {
    section4El.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations4[lang][key];
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateSection4Language(lang);
    });
});

// 2. Theme toggle
function toggleSection4Theme() {
    section4El.classList.toggle('light-theme');
    section4El.classList.toggle('dark-theme');
}
const themeBtn4 = document.getElementById('theme-switcher-btn') || document.getElementById('theme-switcher-btn-mobile');
themeBtn4?.addEventListener('click', toggleSection4Theme);

// 3. Carousel theo nhóm 4 sách
const cards4 = Array.from(section4El.querySelectorAll('.book-card'));
const prevBtn4 = section4El.querySelector('.arrow-btn.prev');
const nextBtn4 = section4El.querySelector('.arrow-btn.next');

let currentIndex4 = 0;
const visibleCount4 = 4;

// Thêm transition mượt
cards4.forEach(card => {
    card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
});

function updateVisibleBooks() {
    cards4.forEach((card, i) => {
        if (i >= currentIndex4 && i < currentIndex4 + visibleCount4) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

updateVisibleBooks();

// Chuyển tiếp với looping
nextBtn4.addEventListener('click', () => {
    currentIndex4 += visibleCount4;
    if (currentIndex4 >= cards4.length) {
        currentIndex4 = 0; // quay về đầu
    }
    updateVisibleBooks();
});

prevBtn4.addEventListener('click', () => {
    currentIndex4 -= visibleCount4;
    if (currentIndex4 < 0) {
        // nếu số sách không chia hết 4, tính trang cuối
        currentIndex4 = Math.floor((cards4.length - 1) / visibleCount4) * visibleCount4;
    }
    updateVisibleBooks();
});

// 4. Random baseline
window.addEventListener('load', () => {
    cards4.forEach(card => {
        const offset = Math.random() * 40 - 20; // ±20px lệch baseline
        card.style.transform = `translateY(${offset}px)`;
    });
});
