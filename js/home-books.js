// js/home-books.js  →  PHIÊN BẢN ĐÃ SỬA – GIỮ LẠI KÉO NGANG SECTION 3

import { supabase } from './supabase-client.js';

const createBookCard = (book, section = '') => {
    const cover = book.thumbnail_url || '/assets/images/default.jpg';
    const title = book.title || 'Không có tiêu đề';
    const author = book.author_name || 'Ẩn danh';
    const id = book.document_id;
    const views = book.view_count || 0;
    const created = book.created_at ? new Date(book.created_at).toLocaleDateString('vi-VN') : '';

    // CHỈ HIỆN BADGE KHI CẦN
    let badgeHTML = '';
    if (section === 'section2') {
        badgeHTML = `<span class="badge bg-primary position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill fw-bold">
                        ${book.category || 'Mới cập nhật'}
                     </span>`;
    }
    else if (section === 'section3') {
        badgeHTML = `<span class="badge bg-primary position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill fw-bold">
                        Sách hay
                     </span>`;
    }
    // Section 4: badgeHTML = '' → không hiện gì cả

    return `
    <div class="book-card">
        <a href="/pages/book.html?id=${id}&t=${Date.now()}" class="text-decoration-none">
            <div class="book-cover-wrapper position-relative overflow-hidden rounded shadow-sm">
                <img src="${cover}" alt="${title}" class="book-cover w-100" loading="lazy" style="height: 280px; object-fit: cover;">
                ${badgeHTML}   <!-- ĐÚNG CHỖ NÀY QUYẾT ĐỊNH HIỆN HAY KHÔNG -->
            </div>
            <div class="book-info mt-3 text-center">
                <h6 class="book-title text-dark mb-1 line-clamp-2 fw-bold">${title}</h6>
                <p class="book-author text-muted small mb-2">${author}</p>
                <div class="d-flex justify-content-center gap-3 small text-secondary">
                    <span><i class="fas fa-eye me-1"></i>${views.toLocaleString()}</span>
                    <span><i class="fas fa-calendar me-1"></i>${created}</span>
                </div>
            </div>
        </a>
    </div>`;
};
// Section 3 – Sách nổi bật – QUAN TRỌNG: 
export const loadSection3 = async () => {
    const container = document.querySelector('#section3 .book-carousel');
    if (!container) return;

    container.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;

    const { data } = await supabase
        .from('documents')
        .select('document_id, title, author_name, thumbnail_url, view_count')
        .order('view_count', { ascending: false })
        .limit(6); // CHỈ LẤY 6 CUỐN THÔI

    container.innerHTML = data.map(createBookCard).join('');
    

};


// ==================== SECTION 2 – SÁCH MỚI NHẤT  ====================
export const loadSection2 = async () => {
    const container = document.querySelector('#section2 .book-carousel');
    if (!container) return;

    // Hiển thị loading
    container.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;

    const { data } = await supabase
        .from('documents')
        .select('document_id, title, author_name, thumbnail_url, view_count, category')
        .order('created_at', { ascending: false })
        .limit(12); // lấy 12 cuốn mới nhất

    // Dùng lại đúng HTML đẹp lung linh như cũ của bạn
    container.innerHTML = data.map(book => `
        <div class="book-card">
            <a href="/pages/book.html?id=${book.document_id}&t=${Date.now()}" class="text-decoration-none">
                <div class="book-cover-wrapper position-relative overflow-hidden rounded shadow-sm">
                    <img src="${book.thumbnail_url || '/assets/images/default.jpg'}" 
                         alt="${book.title}" class="book-cover w-100" loading="lazy" style="height: 280px; object-fit: cover;">
                    <span class="badge bg-primary position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill fw-bold">
                        ${book.category || 'Sách mới'}
                    </span>
                </div>
                <div class="book-info mt-3 text-center">
                    <h6 class="book-title text-dark mb-1 line-clamp-2">${book.title}</h6>
                    <p class="book-author text-muted small mb-1">${book.author_name || 'Ẩn danh'}</p>
                    <small class="text-secondary">
                        <i class="fas fa-eye me-1"></i> ${book.view_count || 0}
                    </small>
                </div>
            </a>
        </div>
    `).join('');
};

export const loadSection4 = async () => {
    const container = document.querySelector('#section4 .book-carousel');
    if (!container) return;
    container.innerHTML = `<div class="text-center py-5"><div class="spinner-border"></div></div>`;
    const { data } = await supabase.from('documents')
        .select('document_id, title, author_name, thumbnail_url, view_count')
        .limit(15);
    container.innerHTML = data.map(createBookCard).join('');
};
