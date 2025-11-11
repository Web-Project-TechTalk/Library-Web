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
        profile: 'Trang cá nhân', // Key mới bạn thêm ở topbar
        // Profile Tabs (Từ profile.js)
        infoTab: 'Thông tin',
        uploadTab: 'Tải lên',
        activityTab: 'Hoạt động',
        favoritesTab: 'Yêu thích',
        // Sidebar (Từ profile.js)
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
        // Action Buttons (Từ profile.js)
        uploadBtn: 'Tải lên',
        followBtn: 'Theo dõi',
        reportBtn: 'Báo cáo',
        signOutBtn: 'Đăng xuất',
        
        // === MỚI: Thêm key cho auth.html ===
        loginTitle: 'Đăng nhập',
        registerTitle: 'Đăng ký',
        emailLabel: 'Địa chỉ email',
        passwordLabel: 'Mật khẩu',
        forgotPassword: 'Quên mật khẩu?',
        loginButton: 'Đăng nhập',
        registerButton: 'Tạo tài khoản',
        fullNameLabel: 'Họ và tên',
        usernameLabel: 'Tên đăng nhập',
        confirmPasswordLabel: 'Xác nhận mật khẩu',

        // === MỚI: Thêm key cho register-success.html ===
        regSuccessTitle: 'Đăng ký thành công!',
        regSuccessMessage: 'Cảm ơn bạn đã tham gia cộng đồng của chúng tôi.\nBạn bây giờ có thể quay về trang đăng nhập để bắt đầu.',
        backToLogin: 'Quay về Đăng nhập',

        // === MỚI: Thêm key cho profile.html (tab Info) ===
        settingsInfoTitle: 'Cài đặt Thông tin',
        settingsInfoSubtitle: 'Đây là cách người khác nhìn thấy bạn.',
        usernameHelpText: 'Bạn không thể thay đổi tên đăng nhập.',
        fullNamePlaceholder: 'Tên của bạn...',
        avatarLinkLabel: 'Link ảnh đại diện:',
        avatarChangeLabel: 'Thay đổi avatar:',
        backgroundChangeLabel: 'Thay đổi ảnh bìa:',
        updateProfileButton: 'Cập nhật Profile',

        phoneLabel: 'Số điện thoại',
        ageLabel: 'Tuổi',
        securityTab: 'Bảo mật',
        changePasswordTitle: 'Đổi mật khẩu',
        newPasswordLabel: 'Mật khẩu mới',
        confirmNewPasswordLabel: 'Xác nhận mật khẩu mới',
        changePasswordButton: 'Lưu Mật Khẩu Mới',
        passwordMismatchError: 'Mật khẩu mới và xác nhận không khớp!',
        passwordTooShortError: 'Mật khẩu phải dài ít nhất 6 ký tự.',

        //Đổi Email
        changeEmailTitle: 'Đổi Email',
        changeEmailSubtitle: 'Chúng tôi sẽ gửi link xác nhận đến cả email cũ và mới của bạn.',
        newEmailLabel: 'Email mới',
        confirmNewEmailLabel: 'Xác nhận email mới',
        changeEmailButton: 'Gửi Yêu cầu Đổi Email',
        emailMismatchError: 'Email và xác nhận không khớp!',
        emailChangeSuccess: 'Yêu cầu thành công! Vui lòng kiểm tra email (cả cũ và mới) để xác nhận thay đổi.',

        emailChangeSuccessTitle: 'Xác Nhận Đổi Email Thành Công!',
        emailChangeSuccessMsg: 'Hãy chắc chắn bạn đã xác nhận cả hai email của mình.\nVui lòng quay về trang đăng nhập để đăng nhập lại với email mới.',
        uploadTitle: "Tải lên Tài liệu",
        uploadSubtitle: "Chọn file tài liệu để tải lên thư viện.",
        documentTitle: "Tiêu đề tài liệu",
        documentAuthor: "Tác giả",
        documentYear: "Năm xuất bản",
        documentDescription: "Mô tả",
        documentThumbnail: "URL ảnh bìa (tùy chọn)",
        documentFile: "Chọn file tài liệu",
        documentFileHelp: "Hỗ trợ: PDF, DOC, DOCX, TXT, EPUB, MOBI (Tối đa 10MB)",
        uploadSubmit: "Tải lên Tài liệu",
        uploadedDocuments: "Tài liệu đã tải lên",
        loadingDocuments: "Đang tải danh sách tài liệu..."
    },
    en: {
        // Topbar & Menu
        searchPlaceholder: 'Search for books...',
        themeToggle: ' Dark / Light',
        logout: 'Sign Out',
        profile: 'Profile', // Key mới bạn thêm ở topbar
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

        // === MỚI: Thêm key cho auth.html ===
        loginTitle: 'Login',
        registerTitle: 'Register',
        emailLabel: 'Email address',
        passwordLabel: 'Password',
        forgotPassword: 'Forgot password?',
        loginButton: 'Login',
        registerButton: 'Create Account',
        fullNameLabel: 'Full Name',
        usernameLabel: 'Username',
        confirmPasswordLabel: 'Confirm Password',

        // === MỚI: Thêm key cho register-success.html ===
        regSuccessTitle: 'Registration Successful!',
        regSuccessMessage: 'Thank you for joining our community.\nYou can now return to the login page to get started.',
        backToLogin: 'Back to Login',

        // === MỚI: Thêm key cho profile.html (tab Info) ===
        settingsInfoTitle: 'Info Settings',
        settingsInfoSubtitle: 'This is how other users see you.',
        usernameHelpText: 'You cannot change your username.',
        fullNamePlaceholder: 'Your name...',
        avatarLinkLabel: 'Avatar URL:',
        avatarChangeLabel: 'Change avatar:',
        backgroundChangeLabel: 'Change background:',
        updateProfileButton: 'Update Profile',

        phoneLabel: 'Phone Number',
        ageLabel: 'Age',
        securityTab: 'Security',
        changePasswordTitle: 'Change Password',
        newPasswordLabel: 'New Password',
        confirmNewPasswordLabel: 'Confirm New Password',
        changePasswordButton: 'Save New Password',
        passwordMismatchError: 'New password and confirmation do not match!',
        passwordTooShortError: 'Password must be at least 6 characters long.',

        //Đổi Email
        changeEmailTitle: 'Change Email',
        changeEmailSubtitle: 'We will send confirmation links to both your old and new email addresses.',
        newEmailLabel: 'New Email',
        confirmNewEmailLabel: 'Confirm New Email',
        changeEmailButton: 'Send Change Email Request',
        emailMismatchError: 'Email and confirmation do not match!',
        emailChangeSuccess: 'Request sent! Please check both your old and new email inboxes to confirm the change.',

        emailChangeSuccessTitle: 'Email Changed Successfully!',
        emailChangeSuccessMsg: 'Your email has been updated.\nPlease return to the login page to sign in with your new email.',
        // === THÊM MỚI: Key cho upload tab ===
        uploadTitle: "Upload Documents",
        uploadSubtitle: "Select document files to upload to the library.",
        documentTitle: "Document Title",
        documentAuthor: "Author",
        documentYear: "Publication Year",
        documentDescription: "Description",
        documentThumbnail: "Thumbnail URL (optional)",
        documentFile: "Choose Document File",
        documentFileHelp: "Supported: PDF, DOC, DOCX, TXT, EPUB, MOBI (Max 10MB)",
        uploadSubmit: "Upload Document",
        uploadedDocuments: "Uploaded Documents",
        loadingDocuments: "Loading documents list..."
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

// === 4. LOGIC CHẠY NGAY KHI TẢI SCRIPT ===
// (Đọc cài đặt và áp dụng ngay lập tức)

let currentLang = localStorage.getItem('language') || 'vi';
let isDarkMode = (localStorage.getItem('theme') === 'dark') || 
                 (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Áp dụng theme và ngôn ngữ ngay lập tức
// (Phải chạy sau khi các hàm đã được định nghĩa)
applyTheme(isDarkMode);
updateLanguageUI(currentLang);


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
            // (Ví dụ: gọi hàm handleSignOut() từ dashboard.js)
            //
            console.log('Nút Đăng xuất đã được bấm!');
            // Ví dụ: 
            // import { handleSignOut } from '/js/dashboard.js';
            // handleSignOut();
        });
    }
}

// === 7. LOGIC CHẠY KHI DOM TẢI XONG ===
// (Chỉ chạy loadComponent)
document.addEventListener('DOMContentLoaded', () => {
    
    // Tải topbar trước
    loadComponent('topbar-placeholder', '/components/topbar.html', () => {
        // Tải sidebar sau khi topbar tải xong
        loadComponent('sidebar-placeholder', '/components/sidebar.html', () => {
            
            // Cả hai đã tải xong, GÁN TẤT CẢ SỰ KIỆN
            initializeDynamicElementsLogic(); 
            
            // Cập nhật lại UI (quan trọng)
            // Vì component mới tải, cần chạy lại 2 hàm này
            // để áp dụng đúng icon và ngôn ngữ cho các nút vừa tải
            let currentLang = localStorage.getItem('language') || 'vi';
            let isDarkMode = localStorage.getItem('theme') === 'dark';
            
            applyTheme(isDarkMode);
            updateLanguageUI(currentLang);
        });
    });
});