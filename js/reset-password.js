// Tên file: /js/reset-password.js
// (ĐÃ SỬA LỖI NGƯỜI DÙNG QUÁ NHANH)

import { supabase } from './supabase-client.js';

let userSession = null;

// Lấy các element ở scope ngoài (bên ngoài DOMContentLoaded)
// để hàm onAuthStateChange có thể truy cập
const statusDiv = document.getElementById('reset-status');
const updateButton = document.getElementById('update-password-button');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-new-password');

// Hàm helper để kích hoạt form
function enableForm() {
    if (statusDiv) {
        statusDiv.className = 'alert alert-success';
        statusDiv.textContent = 'Đã xác thực. Bạn có thể đặt mật khẩu mới.';
    }
    if (updateButton) updateButton.disabled = false;
    if (newPasswordInput) newPasswordInput.disabled = false;
    if (confirmPasswordInput) confirmPasswordInput.disabled = false;
}

// --- QUAN TRỌNG: ĐẶT BÊN NGOÀI DOMContentLoaded ---
// Phải lắng nghe ngay lập tức để bắt sự kiện từ URL hash
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
        userSession = session;
        // Kích hoạt form VÌ token đã hợp lệ
        enableForm();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const resetForm = document.getElementById('reset-password-form');

    // Kiểm tra nếu session đã được bắt (cho trường hợp race condition ngược)
    // (Nếu onAuthStateChange chạy XONG TRƯỚC khi DOMContentLoaded chạy)
    if (userSession) {
        enableForm();
    }

    // Gán sự kiện cho Form Submit
    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Kiểm tra session (dù form đã enable, kiểm tra lại)
            if (!userSession) {
                statusDiv.className = 'alert alert-danger';
                statusDiv.textContent = 'Lỗi: Phiên khôi phục không hợp lệ. Vui lòng thử lại từ email.';
                return;
            }

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // 2. Kiểm tra mật khẩu khớp
            if (newPassword !== confirmPassword) {
                statusDiv.className = 'alert alert-danger';
                statusDiv.textContent = 'Lỗi: Mật khẩu và xác nhận không khớp!';
                return;
            }

            updateButton.disabled = true;
            statusDiv.className = 'alert alert-info';
            statusDiv.textContent = 'Đang cập nhật...';

            // 3. Gọi Supabase
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                statusDiv.className = 'alert alert-danger';
                statusDiv.textContent = `Lỗi: ${error.message}`;
                updateButton.disabled = false; // Cho phép thử lại
            } else {
                statusDiv.className = 'alert alert-success';
                statusDiv.textContent = 'Cập nhật mật khẩu thành công! Bạn có thể quay về trang đăng nhập.';
                resetForm.reset();
                
                // Vô hiệu hóa form
                newPasswordInput.disabled = true;
                confirmPasswordInput.disabled = true;
                updateButton.disabled = true;
                userSession = null;

                // === THÊM MỚI: Đăng xuất phiên khôi phục ===
                // (Điều này đảm bảo token khôi phục bị vô hiệu hóa)
                supabase.auth.signOut();
                // === KẾT THÚC THÊM MỚI ===

                // Hiển thị nút "Quay về Đăng nhập"
                const backButtonWrapper = document.getElementById('back-to-login-wrapper');
                if (backButtonWrapper) {
                    backButtonWrapper.classList.remove('d-none'); 
                }
            }
        });
    }
});