document.addEventListener('DOMContentLoaded', function () {
    // === Khai báo biến ===
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchFormWrapper = document.getElementById('searchFormWrapper');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const topbarRightSection = document.getElementById('topbar-right-section');
    
    const DESKTOP_BREAKPOINT = 992;

    // === Language (ENG/VI) Logic ===
    const translations = {
        vi: {
            // Topbar & Menu
            searchPlaceholder: 'Tìm kiếm sách...',
            themeToggle: ' Chế độ tối',
            logout: 'Đăng xuất',
            // Profile Tabs
            infoTab: 'Thông tin',
            uploadTab: 'Tải lên',
            activityTab: 'Hoạt động',
            favoritesTab: 'Yêu thích',
            // Sidebar
            home: 'Trang chủ',
            follow: 'Theo dõi',
            readingHistory: 'Lịch sử đọc',
            titles: 'Đầu sách',
            allBooks: 'Tất cả sách',
            advSearch: 'Tìm kiếm nâng cao',
            recentAdd: 'Mới thêm gần đây',
            random: 'Ngẫu nhiên',
            lib: 'Thư viện',
            guidelines: 'Hướng dẫn',
            announcement: 'Thông báo',
            aboutUs: 'Về chúng tôi',
            contact: 'Liên hệ',
            advertise: 'Quảng cáo',
            // Action Buttons
            uploadBtn: 'Tải lên',
            followBtn: 'Theo dõi',
            reportBtn: 'Báo cáo',
            signOutBtn: 'Đăng xuất',
        },
        en: {
            // Topbar & Menu
            searchPlaceholder: 'Search for books...',
            themeToggle: ' Dark Mode',
            logout: 'Sign Out',
            // Profile Tabs
            infoTab: 'Info',
            uploadTab: 'Upload',
            activityTab: 'Activity',
            favoritesTab: 'Favorites',
            // Sidebar
            home: 'Home',
            follow: 'Follow',
            readingHistory: 'Reading History',
            titles: 'Titles',
            allBooks: 'All Books',
            advSearch: 'Advance Search',
            recentAdd: 'Recently Added',
            random: 'Random',
            lib: 'Lib',
            guidelines: 'Guidelines',
            announcement: 'Announcement',
            aboutUs: 'About Us',
            contact: 'Contact',
            advertise: 'Advertise',
            // Action Buttons
            uploadBtn: 'Upload',
            followBtn: 'Follow',
            reportBtn: 'Report',
            signOutBtn: 'Sign Out',
        }
    };

    const updateLanguageUI = (lang) => {
        const langData = translations[lang];
        document.documentElement.lang = lang;

        langToggle.innerHTML = `<i class="fas fa-globe me-2"></i> ${lang === 'vi' ? 'English' : 'Tiếng Việt'}`;
        
        // Topbar, Menu, Tabs
        searchInput.placeholder = langData.searchPlaceholder;
        themeToggle.lastChild.textContent = langData.themeToggle;
        document.querySelector('a[href="#"][class="dropdown-item"]:last-of-type').lastChild.textContent = ` ${langData.logout}`;
        document.getElementById('info-tab').textContent = langData.infoTab;
        document.getElementById('upload-tab').textContent = langData.uploadTab;
        document.getElementById('activity-tab').textContent = langData.activityTab;
        document.getElementById('favorites-tab').textContent = langData.favoritesTab;

        // Sidebar
        document.getElementById('sidebar-home').innerHTML = `<i class="fas fa-home"></i> ${langData.home}`;
        document.getElementById('sidebar-follow').innerHTML = `<i class="fas fa-book-reader"></i> ${langData.follow}`;
        document.getElementById('sidebar-reading-history').textContent = langData.readingHistory;
        document.getElementById('sidebar-titles').innerHTML = `<i class="fas fa-book"></i> ${langData.titles}`;
        document.getElementById('sidebar-all-books').textContent = langData.allBooks;
        document.getElementById('sidebar-adv-search').textContent = langData.advSearch;
        document.getElementById('sidebar-recent-add').textContent = langData.recentAdd;
        document.getElementById('sidebar-random').textContent = langData.random;
        document.getElementById('sidebar-lib').innerHTML = `<i class="fas fa-university"></i> ${langData.lib}`;
        document.getElementById('sidebar-guidelines').textContent = langData.guidelines;
        document.getElementById('sidebar-announce').textContent = langData.announcement;
        document.getElementById('sidebar-about').textContent = langData.aboutUs;
        document.getElementById('sidebar-contact').textContent = langData.contact;
        document.getElementById('sidebar-advertise').textContent = langData.advertise;

        // Action Buttons
        document.getElementById('btn-upload-desktop').textContent = langData.uploadBtn;
        document.getElementById('btn-follow-desktop').textContent = langData.followBtn;
        document.getElementById('btn-report-desktop').textContent = langData.reportBtn;
        document.getElementById('btn-signout-desktop').textContent = langData.signOutBtn;
        document.getElementById('btn-upload-mobile').textContent = langData.uploadBtn;
        document.getElementById('btn-follow-mobile').textContent = langData.followBtn;
        document.getElementById('btn-report-mobile').textContent = langData.reportBtn;
        document.getElementById('btn-signout-mobile').textContent = langData.signOutBtn;
    };

    let currentLang = localStorage.getItem('language') || 'vi';
    updateLanguageUI(currentLang);

    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        currentLang = currentLang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('language', currentLang);
        updateLanguageUI(currentLang);
    });

    // === Theme (Sáng/Tối) Logic ===
    const updateThemeUI = (isDarkMode) => {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            body.classList.add('dark-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        updateLanguageUI(currentLang);
    };
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    updateThemeUI(isDarkMode);

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        isDarkMode = !body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeUI(isDarkMode);
    });

    // === Sidebar & Search Logic (Giữ nguyên) ===
    const hideSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    };
    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) { hideSidebar(); } 
        else {
            sidebar.classList.add('active');
            if (window.innerWidth < DESKTOP_BREAKPOINT) { sidebarOverlay.classList.add('active'); }
        }
    };
    if (window.innerWidth >= DESKTOP_BREAKPOINT) { sidebar.classList.add('active'); }
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    sidebarCloseBtn.addEventListener('click', hideSidebar);
    sidebarOverlay.addEventListener('click', hideSidebar);
    
    const showSearch = () => {
        searchOverlay.classList.add('active');
        searchFormWrapper.classList.add('active');
        body.classList.add('search-active');
        const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(searchInput);
        dropdownInstance.show();
    };
    const hideSearch = () => {
        searchOverlay.classList.remove('active');
        searchFormWrapper.classList.remove('active');
        body.classList.remove('search-active');
        const dropdownInstance = bootstrap.Dropdown.getInstance(searchInput);
        if (dropdownInstance) { dropdownInstance.hide(); }
    };
    searchInput.addEventListener('focus', showSearch);
    searchOverlay.addEventListener('click', hideSearch);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && searchOverlay.classList.contains('active')) { hideSearch(); }});
    mobileSearchIcon.addEventListener('click', (e) => { e.preventDefault(); showSearch(); searchInput.focus(); });
    topbarRightSection.addEventListener('click', (e) => { if (e.target === topbarRightSection && body.classList.contains('search-active')) { hideSearch(); }});
});