// Tên file: js/dashboard.js
// (File thư viện, chỉ export hàm, không tự chạy)

import { supabase } from './supabase-client.js';

let currentUser = null;
let userProfile = null;

// --- HÀM BẢO VỆ TRANG (ĐỂ EXPORT) ---
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('Lỗi lấy session:', error);
        return null;
    }

    if (!data.session) {
        console.log('Chưa đăng nhập. Đang chuyển về auth.html');
        // Chuyển về trang auth.html (trang đăng nhập/đăng ký của chúng ta)
        window.location.replace('auth.html'); 
        return null;
    }
    
    currentUser = data.session.user;
    return data.session;
}

// --- HÀM SETUP HEADER (ĐỂ EXPORT) ---
// Hàm này sẽ tải profile và điền vào các vị trí chung
export async function setupHeader(user) {
    // Lấy các element trên Topbar và Sidebar
    const topbarAvatarImg = document.getElementById('topbar-avatar-img');
    const logoutButton = document.getElementById('logout-button'); // Nút đăng xuất

    // Gán sự kiện đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', handleSignOut);
    } else {
        console.warn('Không tìm thấy #logout-button');
    }

    // Tải profile (username, avatar_url) từ bảng 'users'
    const { data, error } = await supabase
        .from('users')
        .select('username, avatar_url, full_name, background_url, phone, age') // Lấy tất cả thông tin cần
        .eq('user_id', user.id)
        .single();

    if (data) {
        userProfile = data; // Lưu profile
        
        // Cập nhật avatar trên topbar
        if (topbarAvatarImg && data.avatar_url) {
            topbarAvatarImg.src = data.avatar_url;
        } else if (topbarAvatarImg) {
            topbarAvatarImg.src = '/assets/images/logo.gif'; // Ảnh mặc định
        }
        
        // Trả về data để profile.js có thể dùng cho các trường riêng
        return data; 
        
    } else {
        console.warn('Không tìm thấy profile, có thể user mới tạo:', error);
        return null;
    }
}

// --- HÀM ĐĂNG XUẤT (ĐỂ EXPORT) ---
export async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Lỗi đăng xuất:', error);
    } else {
        // Chuyển về auth.html
        window.location.replace('auth.html');
    }
}

// Hàm helper để file profile.js lấy user id khi update
export function getCurrentUser() {
    return currentUser;
}