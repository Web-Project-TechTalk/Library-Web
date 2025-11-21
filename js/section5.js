// i18n + Theme (giữ nguyên)
const section5El = document.getElementById('section5');
const translations5 = {
    vi: {
        events: "Sự kiện",
        section5_saying: '"Kiến thức là sức mạnh – chia sẻ là lan tỏa."',
        footer_tagline: "Không ngừng sáng tạo",
        footer_help: "TRỢ GIÚP",
        footer_support: "Hỗ trợ",
        footer_faqs: "Câu hỏi thường gặp",
        footer_team: "TEAM",
        footer_about: "Giới thiệu",
        footer_contact: "Liên hệ",
        footer_license: "Giấy phép",
        copyright: "Copyright © 2025 TechTalk"
    },

    en: {
        events: "Events",
        section5_saying: '"Knowledge is power – sharing spreads it."',
        footer_tagline: "Constantly creative",
        footer_help: "HELP",
        footer_support: "Support",
        footer_faqs: "FAQs",
        footer_team: "TEAM",
        footer_about: "About",
        footer_contact: "Contact us",
        footer_license: "Our license",
        copyright: "Copyright © 2025 TechTalk"
    }
};
function updateSection5Language(lang) { section5El.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); el.textContent = translations5[lang][key]; }); }
document.querySelectorAll('.lang-btn').forEach(btn => { btn.addEventListener('click', () => { const lang = btn.getAttribute('data-lang'); updateSection5Language(lang); }); });

// Theme toggle + đổi màu lib/icon
function toggleSection5Theme() {
    section5El.classList.toggle('light-theme');
    section5El.classList.toggle('dark-theme');

    const isDark = section5El.classList.contains('dark-theme');
    const logo = section5El.querySelector('.footer-logo');
    const icons = section5El.querySelectorAll('.footer-social-icons a');

    // Thay đổi màu logo và icon theo theme
    logo.style.color = isDark ? '#fff' : '#000';
    icons.forEach(ic => ic.style.color = isDark ? '#fff' : '#000');
}

const themeBtn5 = document.getElementById('theme-switcher-btn') || document.getElementById('theme-switcher-btn-mobile');
themeBtn5?.addEventListener('click', toggleSection5Theme);

// Carousel: chỉ scroll tay
const carousel = section5El.querySelector('.event-carousel');

