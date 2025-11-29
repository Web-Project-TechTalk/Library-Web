// js/topbar-search.js

// KHÔNG CẦN LẤY ELEMENT DESKTOP NỮA VÌ DÙNG THẺ <a> TỰ CHUYỂN HƯỚNG

document.addEventListener('DOMContentLoaded', () => {

    // 1. Xử lý icon tìm kiếm trên mobile
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    if (mobileSearchIcon) {
         mobileSearchIcon.addEventListener('click', (e) => {
             e.preventDefault();
             // Chuyển hướng đến trang tìm kiếm nâng cao
             window.location.href = '/pages/advance-search.html';
         });
    }
    
    // Đã loại bỏ tất cả logic tìm kiếm input, focus, keypress cũ.
});