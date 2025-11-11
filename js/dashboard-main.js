// js/dashboard-main.js

import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
    loadPopularBooks();
});

/**
 * Lấy dữ liệu sách "Phổ biến" từ Supabase và
 * điền vào carousel. (Đã sửa lỗi - Bỏ category)
 */
async function loadPopularBooks() {
    const carouselInner = document.querySelector('#popularNewTitlesCarousel .carousel-inner');
    if (!carouselInner) {
        console.error('Không tìm thấy .carousel-inner!');
        return;
    }

    carouselInner.innerHTML = `<div class="pnt-slide-wrapper p-5 text-center">Đang tải sách...</div>`;

    try {
        // 1. Truy vấn Supabase (Đã bỏ 'category' khỏi .select())
        const { data: books, error } = await supabase
            .from('documents')
            .select('document_id, title, author_name, description, thumbnail_url')
            .order('view_count', { ascending: false }) 
            .limit(5);

        if (error) throw error;

        if (!books || books.length === 0) {
            carouselInner.innerHTML = `<div class="pnt-slide-wrapper p-5 text-center">Không tìm thấy sách nào.</div>`;
            return;
        }

        carouselInner.innerHTML = '';

        // 3. Tạo HTML cho từng slide
        books.forEach((book, index) => {
            const isActive = index === 0 ? 'active' : '';
            
            const title = book.title || 'Chưa có tiêu đề';
            const description = book.description || 'Chưa có mô tả.';
            const author = book.author_name || 'Không rõ tác giả';
            
            const coverUrl = book.thumbnail_url || '/assets/images/default.jpg'; 

            // Đã xóa dòng <span class="badge ...">
            const slideHtml = `
                <div class="carousel-item ${isActive}">
                    <a href="/pages/book.html?id=${book.document_id}" class="pnt-slide-link">
                        <div class="pnt-slide-wrapper"> 
                            <img src="${coverUrl}" class="pnt-background" alt="Blurred Background" draggable="false">
                            <div class="pnt-gradient-overlay"></div>
                            
                            <div class="pnt-content">
                                <div class="pnt-cover">
                                    <img src="${coverUrl}" alt="${title}" draggable="false">
                                </div>
                                <div class="pnt-info">
                                    <h3 class="pnt-title">${title}</h3>
                                    <p class="pnt-description">${description}</p>
                                    <p class="pnt-author">
                                        <i class="fas fa-user-edit me-2"></i>
                                        ${author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            
            carouselInner.insertAdjacentHTML('beforeend', slideHtml);
        });

    } catch (error) {
        console.error('Lỗi khi tải sách phổ biến:', error.message);
        carouselInner.innerHTML = `<div class="pnt-slide-wrapper p-5 text-center text-danger">Lỗi khi tải dữ liệu.</div>`;
    }
}