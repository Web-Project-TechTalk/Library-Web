import { supabase } from './supabase-client.js';
import { 
    getSession, 
    setupHeader, 
    getCurrentUser, 
    handleSignOut,
    // Phần Đạt mới thêm - hd.dat
    incrementViewCount,      
    incrementDownloadCount   
} from './dashboard.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js';

getCurrentUser();
let croppieInstance = null;
let avatarModal = null;
let croppedImageBlob = null; // Lưu trữ ảnh đã cắt

let backgroundCroppieInstance = null;
let backgroundModal = null;
let croppedBackgroundBlob = null;

document.addEventListener('DOMContentLoaded', async function () {

    // === 1. LOGIC XÁC THỰC & HEADER (TỪ DASHBOARD.JS) ===
    const session = await getSession(); // Bảo vệ trang
    let profileData = null;
    initializeUploadForm();

    if (session) {
        // Tải header và lấy dữ liệu profile cơ bản
        profileData = await setupHeader(session.user);
    }
        
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
    
    // === KẾT THÚC LOGIC UI ===

    // === 3. LOGIC RIÊNG CỦA TRANG PROFILE  ===

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
                window.location.replace('/pages/auth.html'); // Chuyển về trang đăng nhập
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
            url: backgroundCroppieInstance.bind(tempUrl)
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
        window.location.replace('/pages/auth.html'); // Chuyển về trang đăng nhập
    }
    
    changeButton.disabled = false; // Bật lại nút
}
// === THÊM MỚI: HÀM XỬ LÝ UPLOAD TÀI LIỆU ===

// Khởi tạo sự kiện cho form upload
function initializeUploadForm() {
    const uploadForm = document.getElementById('upload-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleDocumentUpload);
    }
    
    // Tải danh sách tài liệu đã upload
    loadUploadedDocuments();
}

// Xử lý upload tài liệu
// Sửa phần upload storage trong hàm handleDocumentUpload
async function handleDocumentUpload(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('upload-status');
    const submitButton = document.getElementById('upload-submit-button');
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = 'Lỗi: Vui lòng đăng nhập để tải lên tài liệu.';
        return;
    }
    
    // --- Lấy dữ liệu từ form ---
    const title = document.getElementById('document-title').value;
    const author = document.getElementById('document-author').value;
    const year = parseInt(document.getElementById('document-year').value);
    const description = document.getElementById('document-description').value;
    
    // Lấy file tài liệu
    const docFileInput = document.getElementById('document-file');
    const docFile = docFileInput.files[0];
    
    // Lấy file ảnh bìa (input mới)
    const thumbnailInput = document.getElementById('document-thumbnail-file');
    const thumbnailFile = thumbnailInput.files[0];
    
    let thumbnailUrl = null; // Biến này sẽ lưu URL ảnh bìa sau khi upload

    // --- Kiểm tra file ---
    if (!docFile) {
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = 'Vui lòng chọn file tài liệu (PDF, DOCX...).';
        return;
    }
    if (docFile.size > 10 * 1024 * 1024) { // 10MB
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = 'File tài liệu quá lớn. Tối đa là 10MB.';
        return;
    }
    // Kiểm tra ảnh bìa (nếu có)
    if (thumbnailFile && thumbnailFile.size > 2 * 1024 * 1024) { // 2MB
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = 'File ảnh bìa quá lớn. Tối đa là 2MB.';
        return;
    }
    
    // Vô hiệu hóa nút và hiển thị trạng thái
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Đang tải lên...';
    
    try {
        // --- 0. (MỚI) Upload ảnh bìa (nếu người dùng chọn) ---
        if (thumbnailFile) {
            statusDiv.className = 'alert alert-info';
            statusDiv.textContent = 'Đang tải lên ảnh bìa...';
            
            const fileExt = thumbnailFile.name.split('.').pop();
            // Lưu ảnh bìa vào một thư mục riêng cho gọn gàng
            const thumbnailPath = `thumbnails/${currentUser.id}/${Date.now()}-thumbnail.${fileExt}`;
            
            const { data: thumbUploadData, error: thumbUploadError } = await supabase.storage
                .from('sach-files') // Dùng chung bucket 'sach-files'
                .upload(thumbnailPath, thumbnailFile);
                
            if (thumbUploadError) throw thumbUploadError;
            
            // Lấy URL public của ảnh bìa vừa upload
            const { data: thumbUrlData } = supabase.storage
                .from('sach-files')
                .getPublicUrl(thumbUploadData.path);
            
            thumbnailUrl = thumbUrlData.publicUrl; // Lưu URL vào biến
        }

        // --- 1. Upload file tài liệu chính ---
        statusDiv.className = 'alert alert-info';
        statusDiv.textContent = 'Đang tải lên tài liệu...';
        
        const docFileExt = docFile.name.split('.').pop();
        const docFileName = `documents/${currentUser.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${docFileExt}`;
        
        const { data: docUploadData, error: docUploadError } = await supabase.storage
            .from('sach-files')
            .upload(docFileName, docFile);
            
        if (docUploadError) throw docUploadError;
        
        // --- 2. Lấy URL public của file tài liệu ---
        const { data: docUrlData } = supabase.storage
            .from('sach-files')
            .getPublicUrl(docUploadData.path);
        
        // --- 3. Thêm bản ghi vào bảng documents ---
        const newDocument = {
            user_id: currentUser.id,
            title: title,
            author_name: author,
            publication_year: year,
            description: description,
            thumbnail_url: thumbnailUrl // <-- SỬ DỤNG BIẾN ĐÃ UPLOAD
        };
        
        const { data: docData, error: docError } = await supabase
            .from('documents')
            .insert([newDocument])
            .select();
            
        if (docError) throw docError;
        
        // --- 4. Thêm bản ghi vào bảng attachments ---
        const newAttachment = {
            document_id: docData[0].document_id,
            file_path: docUploadData.path, // Path của file tài liệu
            file_type: docFile.type,
            file_name: docFile.name
        };
        
        const { error: attachmentError } = await supabase
            .from('attachments')
            .insert([newAttachment]);
            
        if (attachmentError) throw attachmentError;
        
        // --- 5. Thành công ---
        statusDiv.className = 'alert alert-success';
        statusDiv.textContent = 'Tải lên tài liệu thành công!';
        document.getElementById('upload-form').reset();
        loadUploadedDocuments();
        
    } catch (error) {
        console.error('Lỗi upload:', error);
        statusDiv.className = 'alert alert-danger';
        statusDiv.textContent = `Lỗi: ${error.message}`;
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-upload me-2"></i> Tải lên Tài liệu';
    }
}
// Tải danh sách tài liệu đã upload
// Sửa phần lấy URL trong hàm loadUploadedDocuments
async function loadUploadedDocuments() {
    const container = document.getElementById('uploaded-documents-list');
    const currentUser = getCurrentUser();
    
    if (!currentUser || !container) return;
    
    try {
        const { data, error } = await supabase
            .from('documents')
            .select(`
                document_id,
                title,
                author_name,
                publication_year,
                description,
                thumbnail_url,
                created_at,
                view_count,
                download_count,
                attachments (
                    attachment_id,
                    file_path,
                    file_type,
                    file_name
                )
            `)
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        if (data.length === 0) {
            container.innerHTML = '<p class="text-muted">Bạn chưa tải lên tài liệu nào.</p>';
            return;
        }
        
        let html = '<div class="list-group">';
        data.forEach(doc => {
            const createdDate = new Date(doc.created_at).toLocaleDateString('vi-VN');
            const attachment = doc.attachments && doc.attachments[0];
            
            let fileUrl = '';
            let fileName = 'Không có file';
            
            if (attachment) {
                const { data: urlData } = supabase.storage
                    .from('sach-files')
                    .getPublicUrl(attachment.file_path);
                fileUrl = urlData.publicUrl;
                fileName = attachment.file_name;
            }
            
            html += `
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${doc.title}</h6>
                            <p class="mb-1 text-muted">
                                <i class="fas fa-user-edit me-1"></i> ${doc.author_name} 
                                <span class="mx-2">•</span> 
                                <i class="fas fa-calendar me-1"></i> ${doc.publication_year}
                            </p>
                            <small class="text-muted d-block mb-2">
                                <i class="fas fa-file-alt me-1"></i> ${fileName} 
                                <span class="ms-3 badge bg-primary">
                                    <i class="fas fa-eye me-1"></i> ${doc.view_count || 0}
                                </span> 
                                <span class="ms-2 badge bg-success">
                                    <i class="fas fa-download me-1"></i> ${doc.download_count || 0}
                                </span>
                            </small>
                        </div>
                        <small class="text-muted">${createdDate}</small>
                    </div>
                    
                    <div class="btn-group mt-2" role="group">`;
            
            // Nút Xem và Tải với logic tăng chỉ số
            if (attachment && fileUrl) {
                // Escape các ký tự đặc biệt trong URL và tên file
                const safeUrl = fileUrl.replace(/'/g, "\\'");
                const safeName = fileName.replace(/'/g, "\\'");
                
                html += `
                        <button type="button" 
                                class="btn btn-sm btn-outline-primary"
                                onclick="handleViewDocument('${doc.document_id}').then(() => window.open('${safeUrl}', '_blank'))">
                            <i class="fas fa-eye me-1"></i> Xem
                        </button>
                        <button type="button"
                                class="btn btn-sm btn-outline-success"
                                onclick="handleDownloadDocument('${doc.document_id}').then(() => { const a = document.createElement('a'); a.href='${safeUrl}'; a.download='${safeName}'; a.click(); })">
                            <i class="fas fa-download me-1"></i> Tải về
                        </button>`;
            }
            
            html += `
                        <button type="button" 
                                class="btn btn-sm btn-outline-danger" 
                                onclick="deleteUploadedDocument('${doc.document_id}', '${doc.title.replace(/'/g, "\\'")}')">
                            <i class="fas fa-trash me-1"></i> Xóa
                        </button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Lỗi tải danh sách tài liệu:', error);
        container.innerHTML = `<div class="alert alert-danger">Lỗi khi tải danh sách: ${error.message}</div>`;
    }
}


// Xóa tài liệu đã upload (GIỮ NGUYÊN)
async function deleteUploadedDocument(documentId, title) {
    if (!confirm(`Bạn có chắc chắn muốn xóa tài liệu "${title}" không?`)) {
        return;
    }
    
    try {
        const { data: attachments, error: attachmentsError } = await supabase
            .from('attachments')
            .select('file_path')
            .eq('document_id', documentId);
            
        if (attachmentsError) throw attachmentsError;
        
        if (attachments && attachments.length > 0) {
            const filePaths = attachments.map(att => att.file_path);
            const { error: storageError } = await supabase.storage
                .from('sach-files')
                .remove(filePaths);
                
            if (storageError) {
                console.error('Lỗi xóa file từ storage:', storageError);
            }
        }
        
        const { error } = await supabase
            .from('documents')
            .delete()
            .eq('document_id', documentId);
            
        if (error) throw error;
        
        alert('✅ Đã xóa tài liệu thành công!');
        loadUploadedDocuments();
        
    } catch (error) {
        console.error('Lỗi xóa tài liệu:', error);
        alert(`❌ Lỗi khi xóa tài liệu: ${error.message}`);
    }
}
// Hàm tăng lượt xem - GỌI RPC VÀ TỰ ĐỘNG RELOAD DANH SÁCH
async function handleViewDocument(documentId) {
    console.log(`🔍 Đang xem tài liệu ${documentId}...`);
    
    const success = await incrementViewCount(documentId);
    
    if (success) {
        // Tự động reload danh sách sau 500ms để cập nhật số liệu
        setTimeout(() => {
            loadUploadedDocuments();
        }, 500);
    }
}

// Hàm tăng lượt tải - GỌI RPC VÀ TỰ ĐỘNG RELOAD DANH SÁCH
async function handleDownloadDocument(documentId) {    
    console.log(`⬇️ Đang tải tài liệu ${documentId}...`);

    const success = await incrementDownloadCount(documentId);
    
    if (success) {
        // Tự động reload danh sách sau 500ms
        setTimeout(() => {
            loadUploadedDocuments();
        }, 500);
    }
}
window.handleViewDocument = handleViewDocument;
window.handleDownloadDocument = handleDownloadDocument;
window.deleteUploadedDocument = deleteUploadedDocument;