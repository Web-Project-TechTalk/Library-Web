// Tên file: /js/app-ui.js

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

// === 2. BỘ TỪ ĐIỂN (Đưa ra ngoài) ===
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
        
        // === MỚI: Thêm key cho book.html (Page Content) ===
        bookTitle: 'Sách',
        readBtn: 'Đọc',
        downloadBtn: 'Tải về',
        detailInfoTitle: 'Thông tin chi tiết',
        loadingDescription: 'Đang tải mô tả...',
        reviewsSummaryTitle: 'Đánh giá về sách',
        userRatingPrompt: 'Bạn đánh giá cuốn sách này thế nào?',
        writeCommentTitle: 'Viết bình luận của bạn',
        commentPlaceholder: 'Chia sẻ cảm nghĩ của bạn về cuốn sách...',
        submitCommentBtn: 'Gửi bình luận',
        readerCommentsTitle: 'Bình luận từ độc giả', 
        
        // === MỚI: Thêm key cho reviews.js (Internal/Alerts) ===
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
        
        // === MỚI: Thêm key cho book.html (Page Content) ===
        bookTitle: 'Book',
        readBtn: 'Read',
        downloadBtn: 'Download',
        detailInfoTitle: 'Details',
        loadingDescription: 'Loading description...',
        reviewsSummaryTitle: 'Book Reviews',
        userRatingPrompt: 'How would you rate this book?',
        writeCommentTitle: 'Write Your Comment',
        commentPlaceholder: 'Share your thoughts about the book...',
        submitCommentBtn: 'Post Comment',
        readerCommentsTitle: 'Reader Comments',

        // === MỚI: Thêm key cho reviews.js (Internal/Alerts) ===
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
    }
};

// === 3. HÀM CẬP NHẬT NGÔN NGỮ (Đưa ra ngoài) ===
// Hàm này sẽ tìm tất cả các element có [data-lang-key] và dịch chúng
function updateLanguageUI(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang; // Cập nhật <html lang="">
    const langData = translations[lang];

    // Cập nhật tất cả các element có data-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (langData[key]) {
            // Xử lý xuống dòng cho <p> (nếu có \n)
            if (el.tagName === 'P' && langData[key].includes('\n')) {
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
        themeToggle.innerHTML = icon.outerHTML + langData.themeToggle;
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

// === 6. HÀM GÁN SỰ KIỆN SAU KHI TẢI COMPONENT ===
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
        if (searchInput) {
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(searchInput);
            dropdownInstance.show();
        }
    };
    const hideSearch = () => {
        if (searchOverlay) searchOverlay.classList.remove('active');
        if (searchFormWrapper) searchFormWrapper.classList.remove('active');
        if (body) body.classList.remove('search-active');
        if (searchInput) {
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

    // --- SỬA LỖI: GÁN SỰ KIỆN CHO CÁC NÚT TOPBAR ---
    // (Vì các nút này chỉ tồn tại sau khi loadComponent)

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
 * Hàm 1: Highlight mục sidebar tương ứng với trang hiện tại
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
 * Hàm 2: Lưu trạng thái mở/đóng của các submenu vào sessionStorage
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
 * Hàm 3: Khôi phục trạng thái mở/đóng của các submenu từ sessionStorage khi tải trang
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

// === 7. LOGIC CHẠY KHI DOM TẢI XONG ===
// (Chỉ chạy loadComponent)
document.addEventListener('DOMContentLoaded', () => {

    // Tải topbar trước
    loadComponent('topbar-placeholder', '/components/topbar.html', () => {
        // Tải sidebar sau khi topbar tải xong
        loadComponent('sidebar-placeholder', '/components/sidebar.html', () => {

            // === BẮT ĐẦU VỊ TRÍ MỚI CHO LOGIC SIDEBAR ===

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

            // GÁN TẤT CẢ CÁC SỰ KIỆN KHÁC CỦA TOPBAR VÀ SIDEBAR (Logic đã có sẵn ở đây)
            initializeDynamicElementsLogic();

            // Cập nhật lại UI (quan trọng)
            let currentLang = localStorage.getItem('language') || 'vi';
            let isDarkMode = localStorage.getItem('theme') === 'dark';

            applyTheme(isDarkMode);
            updateLanguageUI(currentLang);
            
            // === KẾT THÚC VỊ TRÍ MỚI CHO LOGIC SIDEBAR ===
        });
    });

    // 1. Highlight link đang active và đảm bảo submenu cha được mở
    highlightSidebarLink(); 

    // 2. Khôi phục trạng thái mở/đóng đã lưu từ lần chuyển trang trước
    restoreSidebarCollapseState();
    
    // 3. Đăng ký listener để tự động lưu trạng thái MỚI nhất mỗi khi submenu mở/đóng
    const submenus = document.querySelectorAll('.sidebar .collapse');
    submenus.forEach(submenu => {
        // Lắng nghe sự kiện của Bootstrap khi submenu mở (shown.bs.collapse) và đóng (hidden.bs.collapse)
        submenu.addEventListener('shown.bs.collapse', saveSidebarCollapseState);
        submenu.addEventListener('hidden.bs.collapse', saveSidebarCollapseState);
    });

    highlightSidebarLink();
});