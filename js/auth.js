// js/auth.js

// Import client đã khởi tạo từ file riêng
import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
    // Tự động chuyển hướng nếu đã đăng nhập (lấy từ file của bạn)
    checkUserSession();

    // Lấy các element dựa trên ID MỚI trong HTML
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const statusDiv = document.getElementById('status'); // Vùng hiển thị trạng thái
    
    // Nút
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');

    const forgotForm = document.getElementById('forgot-form');
    const forgotButton = document.getElementById('forgot-button');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink = document.getElementById('back-to-login-link');
    
    // Khởi tạo các đối tượng Tab của Bootstrap
    const loginTab = new bootstrap.Tab(document.getElementById('login-tab-btn'));
    const registerTab = new bootstrap.Tab(document.getElementById('register-tab-btn'));
    // (Tạo một tab ảo cho forgot-pane, dù không có nút)
    const forgotTab = new bootstrap.Tab(document.createElement('a', { href: '#forgot-pane' }));

    // === GÁN SỰ KIỆN MỚI ===
    
    // Khi bấm "Quên mật khẩu?"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ẩn thanh tab
            document.getElementById('authTabs').style.display = 'none'; 
            
            // Tắt active của các nút tab
            document.getElementById('login-tab-btn').classList.remove('active');
            document.getElementById('register-tab-btn').classList.remove('active');

            // Ẩn các pane cũ
            document.getElementById('login-pane').classList.remove('show', 'active');
            document.getElementById('register-pane').classList.remove('show', 'active');
            
            // Hiện pane quên mật khẩu
            document.getElementById('forgot-pane').classList.add('show', 'active');
        });
    }

    // Khi bấm "Quay về đăng nhập"
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Hiện lại thanh tab
            document.getElementById('authTabs').style.display = 'flex'; 
            
            // Ẩn pane quên mật khẩu
            document.getElementById('forgot-pane').classList.remove('show', 'active');
            
            // Hiện pane đăng nhập
            document.getElementById('login-pane').classList.add('show', 'active');
            
            // Bật active cho nút Đăng nhập (ĐÂY LÀ PHẦN BỊ THIẾU)
            document.getElementById('login-tab-btn').classList.add('active');
            document.getElementById('register-tab-btn').classList.remove('active');
        });
    }

    // Khi submit form quên mật khẩu
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            handleForgotPassword(e, forgotForm, forgotButton, statusDiv);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Truyền các element cần thiết vào hàm
            handleLogin(e, loginForm, loginButton, statusDiv);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            handleRegister(e, registerForm, registerButton, statusDiv);
        });
    }
});

// Hàm kiểm tra session (lấy nguyên gốc từ file của bạn)
async function checkUserSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        // Nếu có session, chuyển đến trang chính (ví dụ: index.html hoặc dashboard.html)
        // Giả sử trang chính là /index.html
        window.location.replace('profile.html');
    }
}

// Hàm Đăng nhập (Logic từ file của bạn, ID đã cập nhật)
async function handleLogin(event, form, button, statusDiv) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Vô hiệu hóa nút và hiển thị trạng thái
    button.disabled = true;
    button.textContent = 'Đang xử lý...';
    statusDiv.style.color = 'blue';
    statusDiv.textContent = 'Đang đăng nhập...';

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        statusDiv.style.color = 'red';
        statusDiv.textContent = `Lỗi: ${error.message}`;
        button.disabled = false;
        button.textContent = 'Đăng nhập';
    } else {
        statusDiv.style.color = 'green';
        statusDiv.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
        // Chuyển hướng đến trang chính
        window.location.replace('/index.html');
    }
}

// Hàm Đăng ký (Logic từ file của bạn + Kiểm tra mật khẩu)
async function handleRegister(event, form, button, statusDiv) {
    event.preventDefault();

    // Lấy giá trị từ các ID MỚI
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const full_name = document.getElementById('register-full_name').value;
    const username = document.getElementById('register-username').value;

    // === BỔ SUNG: Kiểm tra mật khẩu khớp (từ logic cũ của chúng ta) ===
    if (password !== confirmPassword) {
        statusDiv.style.color = 'red';
        statusDiv.textContent = 'Lỗi: Mật khẩu và xác nhận mật khẩu không khớp!';
        return; // Dừng lại
    }
    // === Kết thúc bổ sung ===

    button.disabled = true;
    button.textContent = 'Đang xử lý...';
    statusDiv.style.color = 'blue';
    statusDiv.textContent = 'Đang tạo tài khoản...';

    // Logic signUp từ file của bạn
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'http://127.0.0.1:5500/pages/register-success.html',
            // Phần quan trọng để trigger SQL 'handle_new_user' (nếu có)
            data: {
                full_name: full_name,
                username: username
            }
        }
    });

    if (error) {
        statusDiv.style.color = 'red';
        statusDiv.textContent = `Lỗi: ${error.message}`;
        button.disabled = false;
        button.textContent = 'Đăng ký';
    } else if (data.user) {
        statusDiv.style.color = 'green';
        
        // Đoạn code kiểm tra 'identities' từ file của bạn rất hay, giữ lại
        if (data.user.identities && data.user.identities.length === 0) {
            statusDiv.style.color = 'red';
            statusDiv.textContent = 'Lỗi: Tên đăng nhập (Username) này có thể đã tồn tại.';
            button.disabled = false;
            button.textContent = 'Đăng ký';
        } else {
            statusDiv.textContent = 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.';
            // Xóa form
            form.reset();
            button.disabled = false;
            button.textContent = 'Đăng ký';
            
            // Tự động chuyển qua tab đăng nhập
            const loginTab = new bootstrap.Tab(document.getElementById('login-tab-btn'));
            loginTab.show();
        }
    }
}

// === THÊM MỚI: HÀM XỬ LÝ QUÊN MẬT KHẨU ===
async function handleForgotPassword(event, form, button, statusDiv) {
    event.preventDefault();

    const email = document.getElementById('forgot-email').value;

    button.disabled = true;
    button.textContent = 'Đang gửi...';
    statusDiv.style.color = 'blue';
    statusDiv.textContent = 'Đang xử lý...';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // QUAN TRỌNG: Đây là trang bạn sẽ tạo ở Bước 3
        redirectTo: 'http://127.0.0.1:5500/pages/reset-password.html', // Sửa lại URL của bạn
    });

    if (error) {
        statusDiv.style.color = 'red';
        statusDiv.textContent = `Lỗi: ${error.message}`;
    } else {
        statusDiv.style.color = 'green';
        statusDiv.textContent = 'Gửi email thành công! Vui lòng kiểm tra hộp thư (cả mục Spam).';
        form.reset();
    }

    button.disabled = false;
    button.textContent = 'Gửi link khôi phục';
}