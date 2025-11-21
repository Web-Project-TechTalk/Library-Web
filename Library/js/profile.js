// Tên file: js/profile.js
// ĐÃ SỬA LỖI: Gộp hai khối DOMContentLoaded làm một.

import { supabase } from './supabase-client.js';
import { getSession, setupHeader, getCurrentUser, handleSignOut } from './dashboard.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js';

let currentUser = null;
let croppieInstance = null;
let avatarModal = null;
let croppedImageBlob = null; // <-- Lưu trữ ảnh đã cắt

let backgroundCroppieInstance = null;
let backgroundModal = null;
let croppedBackgroundBlob = null;

// Chỉ sử dụng MỘT khối DOMContentLoaded duy nhất (dạng async)
document.addEventListener('DOMContentLoaded', async function () {

    // === 1. LOGIC XÁC THỰC & HEADER (TỪ DASHBOARD.JS) ===
    const session = await getSession(); // Bảo vệ trang
    let profileData = null;

    if (session) {
        // Tải header và lấy dữ liệu profile cơ bản
        profileData = await setupHeader(session.user);
    }
    
    // === BẮT ĐẦU LOGIC UI (ĐÃ DI CHUYỂN TỪ KHỐI 1 VÀO ĐÂY) ===
    
    // === Khai báo biến ===
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchFormWrapper = document.getElementById('searchFormWrapper');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const topbarRightSection = document.getElementById('topbar-right-section');
    
    const DESKTOP_BREAKPOINT = 992;

    // === Sidebar & Search Logic ===
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
    
    // === KẾT THÚC LOGIC UI ===


    // === 3. LOGIC RIÊNG CỦA TRANG PROFILE (Form) ===

    // === THAY THẾ LOGIC ĐỔI EMAIL ===

    const statusDiv = document.getElementById('email-status');
    const sendGroup = document.getElementById('email-otp-send-group');
    const verifyGroup = document.getElementById('email-otp-verify-group');
    const newEmailInput = document.getElementById('new-email');
    const otpInput = document.getElementById('otp-code');
    const sendButton = document.getElementById('send-otp-button');
    const verifyButton = document.getElementById('verify-otp-button');

    let emailToVerify = ''; // Biến lưu email

    // Lấy key dịch (đặt ở ngoài để cả 2 hàm dùng)
    const lang = localStorage.getItem('language') || 'vi';
    const trans = (lang === 'vi') ? 
        { sent: 'OTP đã được gửi! Vui lòng kiểm tra email.', invalid: 'OTP không hợp lệ hoặc đã hết hạn.', success: 'Đổi email thành công!', updating: 'Đang cập nhật...', sending: 'Đang gửi...' } : 
        { sent: 'OTP has been sent!', invalid: 'Invalid or expired OTP.', success: 'Email changed successfully!', updating: 'Updating...', sending: 'Sending...' };


    // === THÊM MỚI LOGIC ĐỔI EMAIL (2-LINK) ===
    const emailChangeForm = document.getElementById('email-change-form');

    if (emailChangeForm) {
        emailChangeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const statusDiv = document.getElementById('email-status');
            const newEmail = document.getElementById('new-email').value;
            const confirmEmail = document.getElementById('confirm-new-email').value;
            const changeButton = document.getElementById('change-email-button');

            // Lấy key dịch
            const lang = localStorage.getItem('language') || 'vi';
            const trans = (lang === 'vi') ? 
                { mismatch: 'Email và xác nhận không khớp!', success: 'Yêu cầu thành công! Vui lòng kiểm tra email (cả cũ và mới) để xác nhận thay đổi.', sending: 'Đang gửi...' } : 
                { mismatch: 'Email and confirmation do not match!', success: 'Request sent! Please check both your old and new email inboxes to confirm the change.', sending: 'Sending...' };

            // 1. Kiểm tra email khớp
            if (newEmail !== confirmEmail) {
                statusDiv.className = 'alert alert-danger';
                statusDiv.textContent = trans.mismatch;
                return;
            }
            
            changeButton.disabled = true;
            changeButton.textContent = trans.sending;
            statusDiv.className = 'alert alert-info';
            statusDiv.textContent = trans.sending;

            // 2. Gọi Supabase updateUser
            // Vì "Secure Email Change" đã BẬT, Supabase sẽ tự động
            // gửi link đến cả 2 email
            const { error } = await supabase.auth.updateUser({
                email: newEmail
            });

            if (error) {
                statusDiv.className = 'alert alert-danger';
                statusDiv.textContent = `Lỗi: ${error.message}`;
            } else {
                statusDiv.className = 'alert alert-success';
                statusDiv.textContent = trans.success;
                emailChangeForm.reset();

                await supabase.auth.signOut();
                window.location.replace('auth.html'); // Chuyển về trang đăng nhập
            }
            
            changeButton.disabled = false;
            changeButton.textContent = (lang === 'vi') ? 'Gửi Yêu cầu Đổi Email' : 'Send Change Email Request';
        });
    }

    const passwordChangeForm = document.getElementById('password-change-form');
    if (passwordChangeForm) {
        passwordChangeForm.addEventListener('submit', handleChangePassword);
    }

    // === THÊM MỚI: Khởi tạo Background Croppie ===
    const bgCropperModalEl = document.getElementById('background-cropper-modal');
    const bgFileInput = document.getElementById('background-file-input');
    const bgCropperUI = document.getElementById('background-cropper-ui');
    const bgCropSaveButton = document.getElementById('background-crop-save-button');

    // Khởi tạo Modal Background
    backgroundModal = new bootstrap.Modal(bgCropperModalEl);

    // Khởi tạo Croppie cho Background (hình chữ nhật)
    // Tỷ lệ viewport (ví dụ: 800x200) phải khớp với tỷ lệ ảnh bìa của bạn
    backgroundCroppieInstance = new Croppie(bgCropperUI, {
        viewport: { width: 800, height: 200 }, // Khung chữ nhật (tỷ lệ 4:1)
        boundary: { width: '100%', height: 350 }, // Chiều cao khớp CSS
        enableExif: true
    });

    // Bắt sự kiện khi CHỌN file background
    bgFileInput.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                backgroundCroppieInstance.bind({ url: event.target.result });
                backgroundModal.show();
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Bắt sự kiện khi MODAL BACKGROUND MỞ XONG (sửa lỗi zoom)
    bgCropperModalEl.addEventListener('shown.bs.modal', function () {
        backgroundCroppieInstance.bind({
            url: backgroundCroppieInstance.data.url 
        });
    });

    // Bắt sự kiện khi BẤM LƯU ảnh background
    bgCropSaveButton.addEventListener('click', function (e) {
        backgroundCroppieInstance.result({
            type: 'blob',
            // === THAY ĐỔI: Cắt background ở độ phân giải cao hơn ===
            // Viewport là 800x200. Cắt ra ảnh 1600x400 (gấp đôi) để sắc nét hơn
            size: { width: 1600, height: 400 }, 
            format: 'jpeg', // jpeg tốt cho ảnh có nhiều màu sắc, dung lượng nhỏ
            quality: 0.9 // Chất lượng 90% vẫn đủ tốt và file không quá nặng
        }).then(function (blob) {
            croppedBackgroundBlob = blob; // Lưu blob
            backgroundModal.hide();
            
            // Hiển thị preview ảnh bìa ngay lập tức
            const previewUrl = URL.createObjectURL(blob);
            const bannerImg = document.querySelector('.profile-banner img');
            if (bannerImg) bannerImg.src = previewUrl;

            bgFileInput.value = ''; // Xóa file gốc trong input
        });
    });

    // --- THÊM MỚI: Khởi tạo modal và Croppie ---
    const cropperModalEl = document.getElementById('avatar-cropper-modal');
    const fileInput = document.getElementById('avatar-file-input');
    const cropperUI = document.getElementById('cropper-ui');
    const cropSaveButton = document.getElementById('crop-save-button');

    // Khởi tạo đối tượng Modal của Bootstrap
    avatarModal = new bootstrap.Modal(cropperModalEl);

    // Khởi tạo Croppie (nhưng chưa load ảnh)
    croppieInstance = new Croppie(cropperUI, {
        viewport: { width: 200, height: 200, type: 'circle' }, // Khung cắt hình tròn 200x200
        boundary: { width: '100%', height: 350 }, // Vùng chứa
        enableExif: true
    });

    // Bắt sự kiện khi người dùng CHỌN 1 file
    fileInput.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function (event) {
                // Load ảnh vào Croppie
                croppieInstance.bind({
                    url: event.target.result
                });
                // Mở Modal
                avatarModal.show();
            };
            
            reader.readAsDataURL(file);
        }
    });
    cropperModalEl.addEventListener('shown.bs.modal', function () {
        // Sau khi modal mở xong, bind (gắn) lại ảnh lần nữa
        // để Croppie tính toán lại kích thước chính xác
        croppieInstance.bind({
            url: croppieInstance.data.url // Lấy lại url đã bind
        });
    });

    // Bắt sự kiện khi người dùng bấm "Lưu ảnh" trong modal
    cropSaveButton.addEventListener('click', function (e) {
        croppieInstance.result({
            type: 'blob', 
            // === THAY ĐỔI: Cắt avatar ở độ phân giải cao hơn ===
            // Cắt ra ảnh 500x500px (thay vì 200x200px của viewport)
            size: { width: 500, height: 500 }, 
            format: 'png', // png tốt cho ảnh có ít chi tiết, background trong suốt
            quality: 0.95 // Chất lượng 95%
        }).then(function (blob) {
            // Lưu file đã cắt vào biến toàn cục
            croppedImageBlob = blob;
            
            // ĐÓNG Modal
            avatarModal.hide();
            
            // THAY ĐỔI: Hiển thị ảnh vừa cắt (xem trước)
            const previewUrl = URL.createObjectURL(blob);
            document.getElementById('display-avatar-img').src = previewUrl;
            document.getElementById('topbar-avatar-img').src = previewUrl;
            
            // Xóa file gốc trong input (vì ta đã có file cắt)
            fileInput.value = '';
        });
    });
    
    // Gán sự kiện cho nút update 
    const updateButton = document.getElementById('update-profile-button');
    if (updateButton) {
        updateButton.addEventListener('click', updateProfile);
    }
    
    // Gán sự kiện cho các nút Đăng xuất (trong profile.html )
    const signOutBtnDesktop = document.getElementById('btn-signout-desktop');
    const signOutBtnMobile = document.getElementById('btn-signout-mobile');
    if (signOutBtnDesktop) signOutBtnDesktop.addEventListener('click', handleSignOut);
    if (signOutBtnMobile) signOutBtnMobile.addEventListener('click', handleSignOut);


    // Tải thông tin chi tiết vào form VÀ khu vực hiển thị
    // (Sử dụng data đã fetch từ setupHeader)
    if (profileData) {
        fillProfileData(profileData);
    } else if (session) {
        // Nếu setupHeader thất bại, thử tải lại chỉ cho form
        console.log("Dự phòng: Đang tải lại profile...");
        const { data } = await supabase.from('users').select('username, full_name, avatar_url').eq('user_id', session.user.id).single();
        if (data) fillProfileData(data);
    }
}); // <-- Khối DOMContentLoaded DUY NHẤT kết thúc tại đây

// === CÁC HÀM XỬ LÝ RIÊNG CỦA PROFILE ===

/**
 * Hàm này điền dữ liệu vào TẤT CẢ các vị trí trên trang profile.
 * (Khu vực hiển thị tĩnh VÀ các ô input trong form)
 */
function fillProfileData(data) {
    // 1. Điền form "Cài đặt thông tin" 
    const inputUsername = document.getElementById('profile-username');
    const inputFullname = document.getElementById('profile-fullname');
    const inputAvatar = document.getElementById('profile-avatar');

    if (inputUsername) inputUsername.value = data.username; 
    if (inputFullname) inputFullname.value = data.full_name || ''; 
    if (inputAvatar) inputAvatar.value = data.avatar_url || ''; 

    // === THÊM MỚI: ĐIỀN PHONE VÀ AGE ===
    const inputPhone = document.getElementById('profile-phone');
    const inputAge = document.getElementById('profile-age');
    if (inputPhone) inputPhone.value = data.phone || '';
    if (inputAge) inputAge.value = data.age || '';

    // 2. Điền khu vực hiển thị tĩnh (bên trên/bên trái) 
    const displayUsername = document.getElementById('display-username');
    const displayRealname = document.getElementById('display-realname');
    const displayAvatarImg = document.getElementById('display-avatar-img');

    if(displayUsername) displayUsername.textContent = data.username;
    if(displayRealname) displayRealname.textContent = data.full_name || 'Chưa cập nhật tên';
    if(displayAvatarImg && data.avatar_url) displayAvatarImg.src = data.avatar_url;

    const bannerImg = document.querySelector('.profile-banner img');
    if (bannerImg && data.background_url) {
        bannerImg.src = data.background_url;
    }
}

// Hàm cập nhật profile
async function updateProfile() {
    const statusDiv = document.getElementById('profile-status');
    const currentUser = getCurrentUser(); 

    if (!currentUser) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = 'Lỗi: Phiên đăng nhập không hợp lệ. Vui lòng tải lại trang.';
        return;
    }

    statusDiv.className = 'alert alert-info';
    statusDiv.textContent = 'Đang xử lý, vui lòng đợi...';

    try {
        let newAvatarUrl = null;
        let newBackgroundUrl = null; // <-- Thêm biến cho background

        // --- 1. XỬ LÝ UPLOAD AVATAR (nếu có) ---
        if (croppedImageBlob) {
            statusDiv.textContent = 'Đang tải ảnh đại diện...';
            const fileExt = 'png';
            // Tạo tên file duy nhất
            const filePath = `public/${currentUser.id}-avatar-${Date.now()}.${fileExt}`;
            const file = new File([croppedImageBlob], filePath, { type: 'image/png' });

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars') // Bucket 'avatars'
                .upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);
            newAvatarUrl = urlData.publicUrl;
        }
        
        // --- 2. XỬ LÝ UPLOAD BACKGROUND (nếu có) ---
        if (croppedBackgroundBlob) {
            statusDiv.textContent = 'Đang tải ảnh bìa...';
            const fileExt = 'jpeg';
            // Tạo tên file duy nhất
            const filePath = `public/${currentUser.id}-bg-${Date.now()}.${fileExt}`;
            // Bạn có thể dùng bucket 'avatars' chung, hoặc tạo bucket 'backgrounds' riêng
            const file = new File([croppedBackgroundBlob], filePath, { type: 'image/jpeg' });

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars') // Giả sử dùng chung bucket 'avatars'
                .upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);
            newBackgroundUrl = urlData.publicUrl;
        }

        // --- 3. CHUẨN BỊ DỮ LIỆU UPDATE BẢNG 'users' ---
        statusDiv.textContent = 'Đang cập nhật thông tin...';

        const updates = {
            full_name: document.getElementById('profile-fullname').value,
            username: document.getElementById('profile-username').value,
            // === THÊM MỚI: LẤY PHONE VÀ AGE ===
            phone: document.getElementById('profile-phone').value,
            age: document.getElementById('profile-age').value
        };

        if (newAvatarUrl) {
            updates.avatar_url = newAvatarUrl;
        }
        if (newBackgroundUrl) {
            // TÊN CỘT NÀY PHẢI KHỚP VỚI DATABASE CỦA BẠN
            updates.background_url = newBackgroundUrl; 
        }

        // --- 4. GỌI UPDATE BẢNG 'users' ---
        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('user_id', currentUser.id);

        if (error) throw error; 

        // --- 5. THÀNH CÔNG ---
        statusDiv.className = 'alert alert-success';
        statusDiv.textContent = 'Cập nhật profile thành công!';

        // === ĐỒNG BỘ GIAO DIỆN ===
        // (Đồng bộ Username, Fullname, Avatar...)
        const displayRealname = document.getElementById('display-realname');
        if(displayRealname) displayRealname.textContent = updates.full_name || 'Chưa cập nhật tên';
        
        const displayUsername = document.getElementById('display-username');
        if (displayUsername) displayUsername.textContent = updates.username;

        if (updates.avatar_url) {
            document.getElementById('profile-avatar').value = updates.avatar_url; 
            document.getElementById('display-avatar-img').src = updates.avatar_url;
            document.getElementById('topbar-avatar-img').src = updates.avatar_url;
        }
        
        // ĐỒNG BỘ BACKGROUND
        if (updates.background_url) {
            const bannerImg = document.querySelector('.profile-banner img');
            if (bannerImg) bannerImg.src = updates.background_url;
        }
        
        // Reset blobs
        croppedImageBlob = null;
        croppedBackgroundBlob = null; // <-- Reset blob background

    } catch (error) {
        statusDiv.className = 'alert alert-danger';
        if (error.code === '23505') { 
            statusDiv.textContent = 'Lỗi: Tên đăng nhập (Username) này đã tồn tại. Vui lòng chọn tên khác.';
        } else {
            statusDiv.textContent = `Lỗi: ${error.message}`;
        }
    }
}

// Tên file: js/profile.js

// === THÊM MỚI: HÀM XỬ LÝ ĐỔI MẬT KHẨU ===
async function handleChangePassword(event) {
    event.preventDefault(); // Ngăn form tải lại trang
    
    const statusDiv = document.getElementById('password-status');
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    const changeButton = document.getElementById('change-password-button');
    
    // Lấy key dịch từ localStorage (nếu không có app-ui.js, dùng text cứng)
    const lang = localStorage.getItem('language') || 'vi';
    const translations = (lang === 'vi') ? 
        { mismatch: 'Mật khẩu mới và xác nhận không khớp!', short: 'Mật khẩu phải dài ít nhất 6 ký tự.' } : 
        { mismatch: 'New password and confirmation do not match!', short: 'Password must be at least 6 characters long.' };

    // 1. Kiểm tra mật khẩu khớp
    if (newPassword !== confirmPassword) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = translations.mismatch;
        return;
    }
    
    // 2. Kiểm tra độ dài (Supabase yêu cầu 6)
    if (newPassword.length < 6) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = translations.short;
        return;
    }

    // 3. Vô hiệu hóa nút và gọi Supabase
    statusDiv.className = 'alert alert-info';
    statusDiv.textContent = 'Đang cập nhật...';
    changeButton.disabled = true;

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    // 4. Xử lý kết quả
    if (error) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = `Lỗi: ${error.message}`;
    } else {
        statusDiv.className = 'alert alert-success';
        statusDiv.textContent = 'Đổi mật khẩu thành công!';
        document.getElementById('password-change-form').reset(); // Xóa form

        await supabase.auth.signOut();
        window.location.replace('auth.html'); // Chuyển về trang đăng nhập
    }
    
    changeButton.disabled = false; // Bật lại nút
}