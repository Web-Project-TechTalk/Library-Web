// Tên file: /js/app-ui-full.js (File đã được hợp nhất)

// === 1. HÀM ÁP DỤNG SÁNG/TỐI ===
function applyTheme(isDarkMode) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (isDarkMode) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// === 2. BỘ TỪ ĐIỂN (Đầy đủ nhất) ===
const translations = {
    vi: {
        // Topbar & Menu (Từ profile.js)
        searchPlaceholder: 'Tìm kiếm sách...',
        themeToggle: ' Sáng / Tối',
        logout: 'Đăng xuất',
        profile: 'Trang cá nhân',
        // Profile Tabs (Từ profile.js)
        infoTab: 'Thông tin',
        uploadTab: 'Tải lên',
        activityTab: 'Hoạt động',
        favoritesTab: 'Yêu thích',

        // === Sidebar (Từ sidebar.html) ===
        home: 'Trang chủ',
        follow: 'Theo dõi',
        readingHistory: 'Lịch sử đọc',
        titles: 'Tiêu đề',
        allBooks: 'Tất cả sách',
        advSearch: 'Tìm kiếm nâng cao',
        recentAdd: 'Mới thêm gần đây',
        random: 'Ngẫu nhiên',
        lib: 'Thư viện',
        guidelines: 'Quy tắc & Hướng dẫn',
        announcement: 'Thông báo',
        aboutUs: 'Về chúng tôi',
        contact: 'Liên hệ',
        advertise: 'Quảng cáo',

        // === book.html (Page Content) ===
        bookTitle: 'Sách',
        readBtn: 'Đọc',
        downloadBtn: 'Tải về',
        favoriteBtn: 'Yêu thích',
        detailInfoTitle: 'Thông tin chi tiết',
        loadingDescription: 'Đang tải mô tả...',
        reviewsSummaryTitle: 'Đánh giá về sách',
        avgRatingLabel: 'đánh giá',
        userRatingPrompt: 'Bạn đánh giá cuốn sách này thế nào?',
        notRatedDisplay: 'Chưa đánh giá',
        writeCommentTitle: 'Viết bình luận của bạn',
        commentPlaceholder: 'Chia sẻ cảm nghĩ của bạn về cuốn sách...',
        submitCommentBtn: 'Gửi bình luận',
        readerCommentsTitle: 'Bình luận từ độc giả',

        // === reviews.js (Internal/Alerts & Time) ===
        postedDaysAgo: 'Đã đăng {n} ngày trước',
        postedWeeksAgo: 'Đã đăng {n} tuần trước',
        repliedDaysAgo: 'Đã trả lời {n} ngày trước',
        notRated: 'Chưa đánh giá',
        ratingLabel1: 'Rất tệ',
        ratingLabel2: 'Tệ',
        ratingLabel3: 'Trung bình',
        ratingLabel4: 'Tốt',
        ratingLabel5: 'Rất tuyệt vời',
        commentLengthAlert: 'Bình luận cần ít nhất 5 ký tự nhé!',
        ratingMissingAlert: 'Bạn vui lòng chọn số sao đánh giá trước khi gửi nhé!',
        justPosted: 'Vừa đăng',
        justReplied: 'Vừa trả lời',
        likeBtnText: 'Thích',
        replyBtnText: 'Trả lời',
        repNameBadge: '@',
        repNameText: 'Đang trả lời...',
        replyPlaceholder: 'Viết trả lời...',
        sendBtn: 'Gửi',
        replyLengthAlert: 'Nội dung trả lời quá ngắn.',

        // === advance-search.html ===
        advSearchTitle: 'Tìm kiếm Nâng cao',
        searchLabel: 'Tìm kiếm',
        showFilters: 'Hiện bộ lọc',
        hideFilters: 'Ẩn bộ lọc',
        filtersTitle: 'Bộ lọc & Sắp xếp',
        filterHint: 'Ấn "Hiện bộ lọc" để chọn thể loại và sắp xếp ở đây.',
        filterHintSmall: 'Trường tìm kiếm, Sắp xếp theo.',
        booksSectionTitle: 'Sách',
        viewToggleHint: 'Thêm 2 nút ở đây để đổi dạng xem liệt kê sách theo dạng lưới hoặc hàng + mô tả',
        paginationHint: '1 2 3 ... 100',
        sortPlaceholder: 'Sắp xếp theo...',
        categoryPlaceholder: 'Chọn thể loại...',
        resultsTitle: 'Kết quả Tìm kiếm Sách', // KHÓA MỚI

        // KHÓA LỌC THEO TRƯỜNG
        searchFieldAll: 'Tìm kiếm: Tên sách & Tác giả',
        searchFieldTitle: 'Tìm kiếm: Tên sách',
        searchFieldAuthor: 'Tìm kiếm: Tên tác giả',

        // KHÓA SẮP XẾP
        sortByDate: 'Ngày thêm (Mới nhất)',
        sortByViews: 'Lượt xem (Nhiều nhất)',
        sortByRating: 'Đánh giá (Cao nhất)',
        sortByTitleAsc: 'Tên sách (A-Z)',

        // --- Bộ lọc Tag/Thể loại (tag-select-adv) ---
        tagPlaceholder: 'Tag-Thể loại',
        tagLit: 'Văn học',
        tagSciTech: 'Khoa học & Công nghệ',
        tagHistory: 'Lịch sử',
        tagBusiness: 'Kinh doanh & Kinh tế',
        tagKids: 'Thiếu nhi',
        tagSelfHelp: 'Tự lực & Phát triển bản thân',
        tagComics: 'Truyện tranh (Manga/Comic)',
        tagCooking: 'Nấu ăn & Ẩm thực',
        tagArt: 'Nghệ thuật & Thiết kế',
        tagTextbook: 'Sách giáo khoa',

        // --- Bộ lọc Ngôn ngữ (language-select-adv) ---
        langPlaceholder: 'Ngôn ngữ',
        langVi: 'Tiếng Việt',
        langEn: 'Tiếng Anh',
        langZh: 'Tiếng Trung',
        langFr: 'Tiếng Pháp',
        langDe: 'Tiếng Đức',
        langJa: 'Tiếng Nhật',
        langKo: 'Tiếng Hàn',
        langEs: 'Tiếng Tây Ban Nha',
        langRu: 'Tiếng Nga',
        langPt: 'Tiếng Bồ Đào Nha',

        // --- Bộ lọc Năm PH ---
        yearLabel: 'Năm PH',

        // --- Bộ lọc Đánh giá (rating-select-adv) ---
        ratingPlaceholder: 'Đánh giá',

        // KHÓA PHÂN TRANG & THÔNG BÁO
        paginationPrev: 'Trước',
        paginationNext: 'Sau',
        loadingResults: 'Đang tải kết quả...',
        noResultsFound: 'Không tìm thấy sách nào phù hợp.',
        errorLoadingBooks: 'Lỗi tải sách:',

        // === recently-added.html ===
        recentlyAddedTitle: 'Sách mới thêm',
        latestBooksTitle: 'Danh sách Sách mới',
    },
    en: {
        // Topbar & Menu (Từ profile.js)
        searchPlaceholder: 'Search books...',
        themeToggle: ' Light / Dark',
        logout: 'Sign out',
        profile: 'Profile Page',
        // Profile Tabs (Từ profile.js)
        infoTab: 'Info',
        uploadTab: 'Uploads',
        activityTab: 'Activity',
        favoritesTab: 'Favorites',

        // === Sidebar (Từ sidebar.html) ===
        home: 'Home',
        follow: 'Follow',
        readingHistory: 'Reading history',
        titles: 'Titles',
        allBooks: 'All Books',
        advSearch: 'Advance search',
        recentAdd: 'Recently Added',
        random: 'Random',
        lib: 'Library',
        guidelines: 'Guidelines',
        announcement: 'Announcement',
        aboutUs: 'About us',
        contact: 'Contact',
        advertise: 'Advertise',

        // === book.html (Page Content) ===
        bookTitle: 'Book',
        readBtn: 'Read',
        downloadBtn: 'Download',
        favoriteBtn: 'Favorite',
        detailInfoTitle: 'Details',
        loadingDescription: 'Loading description...',
        reviewsSummaryTitle: 'Book Reviews',
        avgRatingLabel: 'reviews',
        userRatingPrompt: 'How would you rate this book?',
        notRatedDisplay: 'Not rated yet',
        writeCommentTitle: 'Write Your Comment',
        commentPlaceholder: 'Share your thoughts about the book...',
        submitCommentBtn: 'Post Comment',
        readerCommentsTitle: 'Reader Comments',

        // === reviews.js (Internal/Alerts & Time) ===
        postedDaysAgo: 'Posted {n} days ago',
        postedWeeksAgo: 'Posted {n} weeks ago',
        repliedDaysAgo: 'Replied {n} days ago',
        notRated: 'Not rated yet',
        ratingLabel1: 'Terrible',
        ratingLabel2: 'Bad',
        ratingLabel3: 'Average',
        ratingLabel4: 'Good',
        ratingLabel5: 'Excellent',
        commentLengthAlert: 'Comment requires at least 5 characters!',
        ratingMissingAlert: 'Please select a star rating before posting!',
        justPosted: 'Just posted',
        justReplied: 'Just replied',
        likeBtnText: 'Like',
        replyBtnText: 'Reply',
        repNameBadge: '@',
        repNameText: 'Replying...',
        replyPlaceholder: 'Write a reply...',
        sendBtn: 'Send',
        replyLengthAlert: 'Reply content is too short.',

        // === advance-search.html ===
        advSearchTitle: 'Advanced Search',
        searchLabel: 'Search',
        showFilters: 'Show filters',
        hideFilters: 'Hide filters',
        filtersTitle: 'Filters & Sorting',
        filterHint: 'Click "Show filters" to select categories and sorting options here.',
        filterHintSmall: 'Search field, Sort by.',
        booksSectionTitle: 'Books',
        viewToggleHint: 'Add 2 buttons here to switch between book listing views (grid or row + description)',
        paginationHint: '1 2 3 ... 100',
        sortPlaceholder: 'Sort by...',
        categoryPlaceholder: 'Select category...',
        resultsTitle: 'Search Results',

        // KHÓA LỌC THEO TRƯỜNG
        searchFieldAll: 'Search: Title & Author',
        searchFieldTitle: 'Search: Title only',
        searchFieldAuthor: 'Search: Author only',

        // KHÓA SẮP XẾP
        sortByDate: 'Date Added (Newest)',
        sortByViews: 'Views (Most)',
        sortByRating: 'Rating (Highest)',
        sortByTitleAsc: 'Title (A-Z)',

        // --- Bộ lọc Tag/Thể loại (tag-select-adv) ---
        tagPlaceholder: 'Tag-Category',
        tagLit: 'Literature',
        tagSciTech: 'Science & Technology',
        tagHistory: 'History',
        tagBusiness: 'Business & Economics',
        tagKids: "Children's Books",
        tagSelfHelp: 'Self-Help & Personal Dev.',
        tagComics: 'Comics (Manga/Comic)',
        tagCooking: 'Cooking & Food',
        tagArt: 'Art & Design',
        tagTextbook: 'Textbooks',

        // --- Bộ lọc Ngôn ngữ (language-select-adv) ---
        langPlaceholder: 'Language',
        langVi: 'Vietnamese',
        langEn: 'English',
        langZh: 'Chinese',
        langFr: 'French',
        langDe: 'German',
        langJa: 'Japanese',
        langKo: 'Korean',
        langEs: 'Spanish',
        langRu: 'Russian',
        langPt: 'Portuguese',

        // --- Bộ lọc Năm PH ---
        yearLabel: 'Pub. Year',

        // --- Bộ lọc Đánh giá (rating-select-adv) ---
        ratingPlaceholder: 'Rating',

        // KHÓA PHÂN TRANG & THÔNG BÁO
        paginationPrev: 'Previous',
        paginationNext: 'Next',
        loadingResults: 'Loading results...',
        noResultsFound: 'No matching books found.',
        errorLoadingBooks: 'Error loading books:',

        // === recently-added.html ===
        recentlyAddedTitle: 'Recently Added Books',
        latestBooksTitle: 'New Books',

    }
};

// === 3. HÀM CẬP NHẬT NGÔN NGỮ (Đầy đủ nhất) ===
function updateLanguageUI(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang; // Cập nhật <html lang="">
    const langData = translations[lang];

    // Cập nhật tất cả các element có data-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (langData[key]) {
            // === LOGIC MỚI CHO CÁC CHUỖI ĐẶC BIỆT (Từ app-ui.js) ===
            if (key === 'avgRatingLabel') {
                // Xử lý chuỗi đánh giá trung bình: (128) đánh giá / (128) reviews
                // Lấy số từ data-rating-count hoặc từ text cũ
                const number = el.dataset.ratingCount || el.textContent.match(/\d+/)?.[0];
                if (number) {
                    el.textContent = `(${number}) ${langData[key]}`;
                    el.dataset.ratingCount = number; // Lưu lại số để lần sau dịch
                } else {
                    el.textContent = langData[key];
                }
            }
            else if (['postedDaysAgo', 'postedWeeksAgo', 'repliedDaysAgo'].includes(key)) {
                // Xử lý chuỗi thời gian: Đã đăng 2 ngày trước
                // Lấy số từ text cũ
                const match = el.textContent.match(/\d+/);
                const number = match ? match[0] : '...';

                // Thay thế {n} bằng số
                el.textContent = langData[key].replace('{n}', number);
            }
            // === KẾT THÚC LOGIC CHUỖI ĐẶC BIỆT ===

            // Xử lý xuống dòng cho <p> (nếu có \n)
            else if (el.tagName === 'P' && langData[key].includes('\n')) {
                el.innerHTML = langData[key].replace(/\n/g, '<br>');
            } else {
                el.textContent = langData[key];
            }
        }
    });

    // Dịch PLACEHOLDER
    document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
        const key = el.dataset.langKeyPlaceholder;
        if (langData[key]) {
            el.placeholder = langData[key];
        }
    });

    // Cập nhật riêng cho các element đặc biệt (nếu cần)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = langData.searchPlaceholder;
    }

    // Cập nhật text của nút Lang Toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.innerHTML = `<i class="fas fa-globe me-2"></i> ${lang === 'vi' ? 'English' : 'Tiếng Việt'}`;
    }

    // Cập nhật text của nút Theme Toggle (quan trọng)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Giữ icon, chỉ thay text
        const icon = themeToggle.querySelector('i');
        // Phải đảm bảo icon tồn tại, vì icon được thêm khi applyTheme() chạy
        if (icon) {
            themeToggle.innerHTML = icon.outerHTML + langData.themeToggle;
        } else {
            // Trường hợp icon chưa kịp load (hiếm), chỉ gán text
            themeToggle.textContent = langData.themeToggle;
        }
    }
}

// Thêm hàm lấy bản dịch cho reviews.js và các module khác
function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'vi';
    return translations[lang] ? translations[lang][key] : key;
}

// === 4. LOGIC CHẠY NGAY KHI TẢI SCRIPT ===
// (Đọc cài đặt và áp dụng ngay lập tức)

let currentLang = localStorage.getItem('language') || 'vi';
let isDarkMode = (localStorage.getItem('theme') === 'dark') ||
    (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Áp dụng theme và ngôn ngữ ngay lập tức
// (Phải chạy sau khi các hàm đã được định nghĩa)
applyTheme(isDarkMode);
updateLanguageUI(currentLang);

// *** QUAN TRỌNG: Expose hàm dịch cho các script khác (reviews.js) ***
window.getTranslation = getTranslation;
window.translations = translations; // Expose full object for easier access

// === 5. HÀM TẢI COMPONENT (Giữ nguyên) ===
/**
 * Hàm tải một component HTML vào một placeholder
 */
async function loadComponent(elementId, url, callback) {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) {
        return;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        placeholder.innerHTML = html;
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error(`Error loading component ${url}:`, error);
        placeholder.innerHTML = `<p class="text-danger p-3">Lỗi tải component: ${url}</p>`;
    }
}

// === 6. HÀM GÁN SỰ KIỆN SAU KHI TẢI COMPONENT (Đầy đủ nhất) ===
/**
 * Gán sự kiện cho Sidebar, Search và các nút Topbar.
 * Hàm này phải được gọi SAU KHI component đã tải xong.
 */
function initializeDynamicElementsLogic() {
    // --- Lấy các phần tử ---
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchFormWrapper = document.getElementById('searchFormWrapper');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const topbarRightSection = document.getElementById('topbar-right-section');

    const DESKTOP_BREAKPOINT = 992;

    // --- Logic Đóng/Mở Sidebar ---
    const hideSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        body.classList.remove('sidebar-is-active');
    };
    const toggleSidebar = () => {
        if (!sidebar) return;
        if (sidebar.classList.contains('active')) {
            hideSidebar();
        } else {
            sidebar.classList.add('active');
            body.classList.add('sidebar-is-active');
            if (window.innerWidth < DESKTOP_BREAKPOINT && sidebarOverlay) {
                sidebarOverlay.classList.add('active');
            }
        }
    };
    // Khởi tạo trạng thái sidebar cho Desktop
    if (window.innerWidth >= DESKTOP_BREAKPOINT && sidebar) {
        sidebar.classList.add('active');
        body.classList.add('sidebar-is-active');
    }
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', hideSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', hideSidebar);

    // --- Logic Đóng/Mở Search ---
    const showSearch = () => {
        if (searchOverlay) searchOverlay.classList.add('active');
        if (searchFormWrapper) searchFormWrapper.classList.add('active');
        if (body) body.classList.add('search-active');
        if (searchInput && typeof bootstrap !== 'undefined' && bootstrap.Dropdown) { // Kiểm tra Bootstrap
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(searchInput);
            dropdownInstance.show();
        }
    };
    const hideSearch = () => {
        if (searchOverlay) searchOverlay.classList.remove('active');
        if (searchFormWrapper) searchFormWrapper.classList.remove('active');
        if (body) body.classList.remove('search-active');
        if (searchInput && typeof bootstrap !== 'undefined' && bootstrap.Dropdown) { // Kiểm tra Bootstrap
            const dropdownInstance = bootstrap.Dropdown.getInstance(searchInput);
            if (dropdownInstance) { dropdownInstance.hide(); }
        }
    };
    if (searchInput) searchInput.addEventListener('focus', showSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', hideSearch);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            hideSearch();
        }
    });
    if (mobileSearchIcon) mobileSearchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showSearch();
        if (searchInput) searchInput.focus();
    });
    if (topbarRightSection) topbarRightSection.addEventListener('click', (e) => {
        if (e.target === topbarRightSection && body && body.classList.contains('search-active')) {
            hideSearch();
        }
    });

    // --- GÁN SỰ KIỆN CHO CÁC NÚT TOPBAR ---
    // (Bị thiếu trong app-ui.js ban đầu, đã được lấy từ app-ui1.js)

    // 1. Nút Đổi Ngôn ngữ
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Đọc lại từ localStorage để chắc chắn
            let currentLang = (localStorage.getItem('language') || 'vi') === 'vi' ? 'en' : 'vi';
            localStorage.setItem('language', currentLang);

            // Gọi hàm updateLanguageUI (đã được định nghĩa ở ngoài)
            updateLanguageUI(currentLang);
            console.log('Đã đổi ngôn ngữ sang:', currentLang);

            // *** QUAN TRỌNG: Kích hoạt lại logic cần dịch trong reviews.js sau khi đổi ngôn ngữ ***
            if (typeof window.reInitializeReviewsLogic === 'function') {
                window.reInitializeReviewsLogic();
            }
        });
    }

    // 2. Nút Đổi Sáng/Tối
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Đọc lại từ body
            let isDarkMode = !document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

            // Gọi hàm applyTheme (đã được định nghĩa ở ngoài)
            applyTheme(isDarkMode);
            // Gọi lại hàm dịch để cập nhật text "Sáng / Tối"
            updateLanguageUI(localStorage.getItem('language') || 'vi');
            console.log('Đã đổi theme sang:', isDarkMode ? 'dark' : 'light');
        });
    }

    // 3. Nút Đăng xuất
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            //
            // === LOGIC ĐĂNG XUẤT CỦA BẠN SẼ Ở ĐÂY ===
            //
            console.log('Nút Đăng xuất đã được bấm!');
        });
    }
}

// Khóa dùng để lưu trạng thái vào sessionStorage
const COLLAPSE_STATE_KEY = 'sidebarCollapseState';

/**
 * Hàm 1: Highlight mục sidebar tương ứng với trang hiện tại (Giữ nguyên)
 */
function highlightSidebarLink() {
    // Lấy đường dẫn hiện tại và chuẩn hóa (ví dụ: '/pages/dashboard.html')
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';

    // Lấy tất cả các liên kết trong sidebar
    const sidebarLinks = document.querySelectorAll('#sidebar .components a');

    sidebarLinks.forEach(link => {
        const linkHref = (link.getAttribute('href') || '').replace(/\/$/, '');

        // Kiểm tra nếu đường dẫn khớp với href của liên kết
        if (linkHref && currentPath.endsWith(linkHref)) {

            // 1. Thêm class highlight vào thẻ <li> cha
            let listItem = link.closest('li');
            if (listItem) {
                listItem.classList.add('active-orange');
            }

            // 2. Mở submenu cha nếu link là con (Đảm bảo trang active luôn hiển thị)
            let parentSubmenu = link.closest('.collapse');
            if (parentSubmenu) {
                // Thêm class 'show' để mở
                parentSubmenu.classList.add('show');
                // Cập nhật thuộc tính của nút toggle cha
                parentSubmenu.previousElementSibling.setAttribute('aria-expanded', 'true');
            }
        }
    });
}


/**
 * Hàm 2: Lưu trạng thái mở/đóng của các submenu vào sessionStorage (Giữ nguyên)
 */
function saveSidebarCollapseState() {
    const openSubmenus = [];
    // Lấy tất cả các submenu có class 'collapse'
    const submenus = document.querySelectorAll('.sidebar .collapse');

    submenus.forEach(submenu => {
        // Nếu submenu đang mở (có class 'show')
        if (submenu.classList.contains('show') && submenu.id) {
            // Lưu ID của submenu đó
            openSubmenus.push(submenu.id);
        }
    });

    sessionStorage.setItem(COLLAPSE_STATE_KEY, JSON.stringify(openSubmenus));
}

/**
 * Hàm 3: Khôi phục trạng thái mở/đóng của các submenu từ sessionStorage khi tải trang (Giữ nguyên)
 */
function restoreSidebarCollapseState() {
    const savedState = sessionStorage.getItem(COLLAPSE_STATE_KEY);

    if (savedState) {
        try {
            const openSubmenus = JSON.parse(savedState);

            openSubmenus.forEach(id => {
                const submenu = document.getElementById(id);
                if (submenu) {
                    // Thêm class 'show' để mở submenu khi tải trang
                    submenu.classList.add('show');
                    // Cập nhật aria-expanded cho thẻ a cha
                    const parentToggle = submenu.previousElementSibling;
                    if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                        parentToggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        } catch (e) {
            console.error("Error parsing sidebar collapse state:", e);
        }
    }
}

// === 7. LOGIC CHẠY KHI DOM TẢI XONG (Giữ nguyên, chỉ loại bỏ code thừa) ===
document.addEventListener('DOMContentLoaded', () => {

    // Tải topbar trước
    loadComponent('topbar-placeholder', '/components/topbar.html', () => {
        // Tải sidebar sau khi topbar tải xong
        loadComponent('sidebar-placeholder', '/components/sidebar.html', () => {

            // 1. Khôi phục trạng thái mở/đóng đã lưu từ lần chuyển trang trước
            restoreSidebarCollapseState();

            // 2. Highlight link đang active và đảm bảo submenu cha được mở
            highlightSidebarLink();

            // 3. Đăng ký listener để tự động lưu trạng thái MỚI nhất mỗi khi submenu mở/đóng
            const submenus = document.querySelectorAll('.sidebar .collapse');
            submenus.forEach(submenu => {
                // Lắng nghe sự kiện của Bootstrap khi submenu mở và đóng
                submenu.addEventListener('shown.bs.collapse', saveSidebarCollapseState);
                submenu.addEventListener('hidden.bs.collapse', saveSidebarCollapseState);
            });

            // GÁN TẤT CẢ CÁC SỰ KIỆN KHÁC CỦA TOPBAR VÀ SIDEBAR
            initializeDynamicElementsLogic();

            // Cập nhật lại UI (quan trọng vì component mới được load)
            let currentLang = localStorage.getItem('language') || 'vi';
            let isDarkMode = (localStorage.getItem('theme') === 'dark');

            applyTheme(isDarkMode);
            updateLanguageUI(currentLang);
        });
    });

    // *** Gỡ bỏ logic lặp lại bị đặt sai vị trí (1, 2, 3, highlightSidebarLink() cuối) ***
    // Các dòng này sẽ chạy trước khi topbar và sidebar được tải, gây ra lỗi vì các phần tử chưa tồn tại.
    // Logic đúng đã nằm trong callback của loadComponent.
});