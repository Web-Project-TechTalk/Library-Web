// Tên file: /js/app-ui.js
// File này sẽ xử lý Sáng/Tối và Ngôn ngữ cho TOÀN BỘ trang web.

// 1. ĐỊNH NGHĨA BẢN DỊCH (Đã mở rộng)
const translations = {
    vi: {
        // Topbar & Menu (Từ profile.js)
        searchPlaceholder: 'Tìm kiếm sách...',
        themeToggle: ' Sáng / Tối',
        logout: 'Đăng xuất',
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
        emailChangeSuccessMsg: 'Hãy chắc chắn bạn đã xác nhận cả hai email của mình.\nVui lòng quay về trang đăng nhập để đăng nhập lại với email mới.'
    },
    en: {
        // Topbar & Menu
        searchPlaceholder: 'Search for books...',
        themeToggle: ' Dark / Light',
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
        emailChangeSuccessMsg: 'Your email has been updated.\nPlease return to the login page to sign in with your new email.'
    }
};

// 2. HÀM CẬP NHẬT NGÔN NGỮ (Tối ưu hóa)
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

    // === THÊM MỚI: Dịch PLACEHOLDER ===
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

// 3. HÀM CẬP NHẬT GIAO DIỆN SÁNG/TỐI
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

// 4. LOGIC CHÍNH (Chạy ngay khi file được tải)

// Đọc cài đặt từ localStorage
let currentLang = localStorage.getItem('language') || 'vi';
let isDarkMode = (localStorage.getItem('theme') === 'dark') || 
                 (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Áp dụng theme và ngôn ngữ ngay lập tức
applyTheme(isDarkMode);
updateLanguageUI(currentLang);

// 5. GÁN SỰ KIỆN (Chờ DOM tải xong)
document.addEventListener('DOMContentLoaded', () => {
    
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');

    // Gán sự kiện cho nút Ngôn ngữ
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = (localStorage.getItem('language') || 'vi') === 'vi' ? 'en' : 'vi';
            localStorage.setItem('language', currentLang);
            updateLanguageUI(currentLang);
        });
    }

    // Gán sự kiện cho nút Sáng/Tối
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isDarkMode = !document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            applyTheme(isDarkMode);
            // Gọi lại hàm dịch để cập nhật text "Chế độ tối"
            updateLanguageUI(localStorage.getItem('language') || 'vi');
        });
    }
});