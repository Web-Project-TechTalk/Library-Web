import { supabase } from './supabase-client.js';
import { handleSignOut } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {

    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');

    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        anchors: ['home', 'collections', 'news', 'about'],

        afterLoad: function(origin, destination, direction){
            const lastSectionIndex = document.querySelectorAll('.section').length - 1;

            // Điều khiển nút "Lên trên"
            if(destination.index > 0){
                scrollUpBtn.classList.add('visible');
            } else {
                scrollUpBtn.classList.remove('visible');
            }

            // Điều khiển nút "Xuống dưới"
            if(destination.index === lastSectionIndex){
                scrollDownBtn.classList.remove('visible');
            } else {
                scrollDownBtn.classList.add('visible');
            }
        }
    });

    if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fullpage_api.moveTo('home'); // Cuộn về trang có anchor là 'home'
    });
    }
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fullpage_api.moveTo('about'); // Cuộn đến trang có anchor là 'about'
        });
    }

    // --- LOGIC THEME SWITCHER & LANGUAGE (Không thay đổi) ---
    const themeSwitcherBtns = document.querySelectorAll('#theme-switcher-btn, #theme-switcher-btn-mobile');
    const themeIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile');
    const htmlElement = document.documentElement;
    const updateThemeIcons = (theme) => {
        const newIconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeIcons.forEach(icon => icon.className = newIconClass);
    };
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcons(savedTheme);
    themeSwitcherBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-bs-theme', newTheme);
            updateThemeIcons(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });
    const langButtons = document.querySelectorAll('.lang-btn');
    const translations = {
        en: {
            // General
            home_title: "Home | Digital Library",
            login_btn: "Login",
            signup_btn: "Sign Up",
            
            // Navbar Dropdowns
            nav_books: "Books",
            nav_books_scan: "Scanned Books",
            nav_books_online: "Online Books",
            nav_books_audio: "Audiobooks",
            nav_books_ebooks: "Ebooks",
            nav_books_all: "All",
            nav_collections: "Collections",
            nav_collections_category: "By Category",
            nav_collections_author: "By Author",
            nav_collections_series: "By Series",
            nav_collections_all: "All",
            nav_news: "News & Events",
            nav_news_news: "News",
            nav_news_events: "Events",
            nav_about: "About",
            nav_about_team: "Team",
            nav_about_license: "License",
            nav_about_contact: "Contact",

            // Hero Section
            hero_title_mobile: "Welcome!",
            hero_title_desktop: "Welcome to our Digital Library",
            hero_description: "You can find every kind of book here",
            search_placeholder: "Enter book title, author...",
            search_btn: "Search",
            all_books_btn: "All Books",
            
            // Carousel
            featured_books: "Featured Books",
            explore_btn: "Explore More Categories",
            saying_1: "We read books not to memorize every word, but to deeply understand and apply them in life.",

            profile_link: "My Profile",
            my_books_link: "My Books",
            logout_btn: "Sign Out"
        },
        vi: {
            // General
            home_title: "Trang Chủ | Thư Viện Số",
            login_btn: "Đăng Nhập",
            signup_btn: "Đăng Ký",
            
            // Navbar Dropdowns
            nav_books: "Sách",
            nav_books_scan: "Sách scan",
            nav_books_online: "Sách online",
            nav_books_audio: "Sách nói",
            nav_books_ebooks: "Ebooks",
            nav_books_all: "Tất cả",
            nav_collections: "Bộ sưu tập",
            nav_collections_category: "Theo thể loại",
            nav_collections_author: "Theo tác giả",
            nav_collections_series: "Theo bộ",
            nav_collections_all: "Tất cả",
            nav_news: "Tin tức & Sự kiện",
            nav_news_news: "Tin tức",
            nav_news_events: "Sự kiện",
            nav_about: "Giới thiệu",
            nav_about_team: "Đội ngũ",
            nav_about_license: "Giấy phép",
            nav_about_contact: "Liên lạc",
            
            // Hero Section
            hero_title_mobile: "Chào mừng",
            hero_title_desktop: "Chào mừng đến với thư viện số",
            hero_description: "Bạn có thể tìm mọi loại sách ở đây",
            search_placeholder: "Nhập tên sách, tác giả...",
            search_btn: "Tìm Kiếm",
            all_books_btn: "Tất Cả Sách",
            
            // Carousel
            featured_books: "Sách Nổi Bật",
            explore_btn: "Khám phá thêm thể loại",
            saying_1: "Chúng ta đọc sách không phải thuộc lòng từng câu chữ, mà để thấu hiểu sâu sắc và vận dụng vào cuộc sống.",

            profile_link: "Thông tin tài khoản",
            my_books_link: "Sách của tôi",
            logout_btn: "Đăng xuất"
        }
    };
    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => { const key = element.getAttribute('data-key'); if (translations[lang][key]) { element.textContent = translations[lang][key]; } });
        document.querySelectorAll('[data-key-placeholder]').forEach(element => { const key = element.getAttribute('data-key-placeholder'); if (translations[lang][key]) { element.placeholder = translations[lang][key]; } });
        htmlElement.setAttribute('lang', lang);
        localStorage.setItem('language', lang);
        langButtons.forEach(btn => { if (btn.getAttribute('data-lang') === lang) { btn.classList.add('active'); } else { btn.classList.remove('active'); } });
    };
    langButtons.forEach(button => { button.addEventListener('click', () => { const selectedLang = button.getAttribute('data-lang'); setLanguage(selectedLang); }); });
    const savedLanguage = localStorage.getItem('language') || 'vi';
    setLanguage(savedLanguage);

    // --- LOGIC CAROUSEL SÁCH ---
    window.addEventListener('load', () => {
        const carouselWrapper = document.querySelector('.book-carousel-wrapper');
        const carousel = document.getElementById('book-carousel');
        if (carouselWrapper && carousel) {
            const originalCards = carousel.innerHTML;
            carousel.innerHTML += originalCards;
            let scrollAmount = 0;
            const scrollSpeed = 0.5;
            let isPaused = false;
            let isDown = false;
            let startX;
            let scrollLeft;
            function autoScroll() {
                if (!isPaused && !isDown) {
                    scrollAmount += scrollSpeed;
                    if (scrollAmount >= carousel.scrollWidth / 2) { scrollAmount = 0; }
                    carousel.scrollLeft = scrollAmount;
                }
                requestAnimationFrame(autoScroll);
            }
            carouselWrapper.addEventListener('mouseenter', () => { isPaused = true; });
            carouselWrapper.addEventListener('mouseleave', () => { isPaused = false; });
            carouselWrapper.addEventListener('mousedown', (e) => {
                isDown = true;
                carouselWrapper.classList.add('active');
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            window.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
            window.addEventListener('mouseup', () => {
                if (!isDown) return;
                isDown = false;
                carouselWrapper.classList.remove('active');
                scrollAmount = carousel.scrollLeft;
            });

            // --- LOGIC HIỂN THỊ NÚT KHÁM PHÁ (ĐÃ THÊM LẠI) ---
            const exploreSection = document.getElementById('explore-section');
            if (exploreSection) {
                let hasReachedEnd = false;

                carousel.addEventListener('scroll', () => {
                    if (!hasReachedEnd && carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
                        exploreSection.classList.add('visible');
                        hasReachedEnd = true;
                    }
                });
            }
            
            requestAnimationFrame(autoScroll);
        }
    });

    // --- LOGIC HỘP THOẠI NGẪU NHIÊN (ĐÃ NÂNG CẤP) ---
    const bubble = document.getElementById('speech-bubble');
    const bubbleText = document.getElementById('speech-bubble-text');
    const funnySpeech = {
        vi: [
            "Bạn có biết: 1 giờ đọc sách giúp bạn bớt đi 60 phút lướt điện thoại.",
            "Đọc sách không giúp bạn giàu, nhưng chắc chắn là trông bạn sẽ 'trí thức' hơn.",
            "Quyển sách này thú vị đến mức tôi quên cả sạc điện thoại.",
            "Psst... thử tìm 'bí kíp võ công' xem có gì không.",
            "Đừng lo, sách không cắn đâu...",
            "Đọc xong quyển này, IQ của bạn có thể sẽ tăng... hoặc không.",
            "Thư viện này có sách dạy cách gấp ga trải giường vừa vặn không?",
            "Tôi nghe nói đọc sách giúp giảm stress. Chắc chắn rồi, trừ khi bạn đang đọc hạn trả sách.",
            "Một số người đi lạc trong âm nhạc, còn tôi đi lạc trong tiểu thuyết.",
            "Wifi ở đây có thể yếu, nhưng kết nối với tri thức thì luôn mạnh.",
            "Một cuốn sách có thể thay đổi cuộc đời bạn. Hoặc ít nhất là thay đổi cái bàn cà phê của bạn."
        ],
        en: [
            "Did you know: 1 hour of reading saves you 60 minutes of scrolling.",
            "Reading won't make you rich, but you'll definitely look smarter.",
            "This book is so good I forgot to charge my phone.",
            "Psst... try searching for 'ancient spells'. You never know.",
            "Don't worry, the books don't bite... unless they're about sharks.",
            "Finish this book and your IQ might go up... or not.",
            "Does this library have a book on how to fold a fitted sheet?",
            "I heard reading reduces stress. Sure, unless you're reading the due date.",
            "Some people get lost in music, I get lost in the fiction aisle.",
            "The wifi here might be weak, but the connection to knowledge is always strong.",
            "A book can change your life. Or at least, your coffee table."
        ]
    };
    let remainingViQuotes = [];
    let remainingEnQuotes = [];
    if (bubble && bubbleText) {
        function showNextBubble() {
            bubble.classList.remove('visible');
            setTimeout(() => {
                const currentLang = localStorage.getItem('language') || 'vi';
                let quoteToShow = '';
                if (currentLang === 'vi') {
                    if (remainingViQuotes.length === 0) {
                        remainingViQuotes = [...funnySpeech.vi];
                    }
                    const randomIndex = Math.floor(Math.random() * remainingViQuotes.length);
                    quoteToShow = remainingViQuotes.splice(randomIndex, 1)[0];
                } else {
                    if (remainingEnQuotes.length === 0) {
                        remainingEnQuotes = [...funnySpeech.en];
                    }
                    const randomIndex = Math.floor(Math.random() * remainingEnQuotes.length);
                    quoteToShow = remainingEnQuotes.splice(randomIndex, 1)[0];
                }
                bubbleText.textContent = quoteToShow;
                bubble.classList.add('visible');
                setTimeout(showNextBubble, 7000);
            }, 2000);
        }
        setTimeout(showNextBubble, 3000);
    }
    
    // --- BẮT ĐẦU: TÍCH HỢP XÁC THỰC SUPABASE ---

    // Lấy các element (giống như code cũ, nhưng thêm avatar)
    const authButtonsDesktop = document.getElementById('auth-buttons-desktop');
    const profileDropdownDesktop = document.getElementById('profile-dropdown-desktop');
    const desktopUserName = document.getElementById('desktop-user-name');
    const desktopUserAvatar = document.getElementById('desktop-user-avatar'); // <-- Element mới

    const authButtonsMobile = document.getElementById('auth-buttons-mobile');
    const profileDropdownMobile = document.getElementById('profile-dropdown-mobile');
    const mobileUserAvatar = document.getElementById('mobile-user-avatar'); // <-- Element mới
    
    const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');

    // Hàm helper để bật/tắt class 'd-none' (giữ lại từ code cũ)
    const toggleVisibility = (isLoggedIn, loggedOutEl, loggedInEl) => {
        if (loggedOutEl) loggedOutEl.classList.toggle('d-none', isLoggedIn);
        if (loggedInEl) loggedInEl.classList.toggle('d-none', !isLoggedIn);
    };

    // Hàm khởi tạo UI xác thực
    async function initializeAuthUI() {
        // 1. Lấy phiên đăng nhập (session)
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Lỗi khi lấy session:", error.message);
            toggleVisibility(false, authButtonsDesktop, profileDropdownDesktop);
            toggleVisibility(false, authButtonsMobile, profileDropdownMobile);
            return;
        }

        if (session) {
            // 2. Nếu đã đăng nhập, lấy thông tin profile
            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('username, avatar_url')
                .eq('user_id', session.user.id)
                .single();
            
            if (profileError) {
                    console.warn("Không thể lấy profile:", profileError.message);
            }

            // 3. Cập nhật UI
            toggleVisibility(true, authButtonsDesktop, profileDropdownDesktop);
            toggleVisibility(true, authButtonsMobile, profileDropdownMobile);

            // Sử dụng thông tin profile (nếu có)
            const userName = profile?.username || session.user.email; // Ưu tiên username
            const avatarUrl = profile?.avatar_url || '/assets/images/logo.gif'; // Ảnh mặc định

            // Cập nhật desktop
            if (desktopUserName) desktopUserName.textContent = userName;
            if (desktopUserAvatar) desktopUserAvatar.src = avatarUrl;
            
            // Cập nhật mobile
            if (mobileUserAvatar) mobileUserAvatar.src = avatarUrl;

            // 4. Gắn sự kiện Đăng xuất (dùng hàm import từ dashboard.js)
            if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', handleSignOut);
            if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleSignOut);

        } else {
            // 5. Nếu chưa đăng nhập, hiển thị nút Đăng nhập/Đăng ký
            toggleVisibility(false, authButtonsDesktop, profileDropdownDesktop);
            toggleVisibility(false, authButtonsMobile, profileDropdownMobile);
        }
    }

    // Chạy hàm
    initializeAuthUI();

    // --- KẾT THÚC: TÍCH HỢP XÁC THỰC SUPABASE ---
});