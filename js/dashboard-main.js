import { supabase } from './supabase-client.js';
import { fetchDashboardStats } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    loadPopularBooks();     // Carousel (Section 1)
    loadNewBooks();         // Sách mới (Section 2 - Cột trái)
    fetchDashboardStats();  // Thống kê (Section 2 - Cột phải)
});

async function loadPopularBooks() {
    const carouselInner = document.querySelector('#popularNewTitlesCarousel .carousel-inner');
    if (!carouselInner) return;

    carouselInner.innerHTML = `<div class="pnt-slide-wrapper p-5 text-center">Đang tải sách...</div>`;

    try {
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
        books.forEach((book, index) => {
            const isActive = index === 0 ? 'active' : '';
            const title = book.title || 'Chưa có tiêu đề';
            const description = book.description || 'Chưa có mô tả.';
            const author = book.author_name || 'Không rõ tác giả';
            const coverUrl = book.thumbnail_url || '/assets/images/default.jpg'; 

            const slideHtml = `
                <div class="carousel-item ${isActive}">
                    <a href="/pages/book.html?id=${book.document_id}" class="pnt-slide-link">
                        <div class="pnt-slide-wrapper"> 
                            <img src="${coverUrl}" class="pnt-background" alt="bg" draggable="false">
                            <div class="pnt-gradient-overlay"></div>
                            <div class="pnt-content">
                                <div class="pnt-cover">
                                    <img src="${coverUrl}" alt="${title}" draggable="false">
                                </div>
                                <div class="pnt-info">
                                    <h3 class="pnt-title">${title}</h3>
                                    <p class="pnt-description">${description}</p>
                                    <p class="pnt-author"><i class="fas fa-user-edit me-2"></i>${author}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            carouselInner.insertAdjacentHTML('beforeend', slideHtml);
        });

    } catch (error) {
        console.error('Lỗi load sách phổ biến:', error);
        carouselInner.innerHTML = `<div class="pnt-slide-wrapper text-danger">Lỗi tải dữ liệu.</div>`;
    }
}

/**
 * Load sách mới cập nhật ra Grid (Cột bên trái)
 */
async function loadNewBooks() {
    const container = document.getElementById('new-books-row');
    if (!container) return;

    try {
        // Lấy 8 cuốn sách mới nhất
        const { data: books, error } = await supabase
            .from('documents')
            .select('document_id, title, author_name, thumbnail_url, view_count, created_at')
            .order('created_at', { ascending: false }) 
            .limit(8);

        if (error) throw error;

        if (!books || books.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted text-center">Chưa có sách nào được đăng tải.</p></div>';
            return;
        }

        // Render HTML
        container.innerHTML = books.map(book => {
            const cover = book.thumbnail_url || '/assets/images/default.jpg';
            // Format ngày tháng (VN)
            const date = new Date(book.created_at).toLocaleDateString('vi-VN');
            
            return `
            <div class="col">
                <div class="card h-100 shadow-sm border-0 book-card-hover">
                    <div class="position-relative overflow-hidden" style="padding-top: 140%;">
                        <a href="/pages/book.html?id=${book.document_id}">
                            <img src="${cover}" class="position-absolute top-0 start-0 w-100 h-100" 
                                 style="object-fit: cover; transition: transform 0.3s;" 
                                 alt="${book.title}">
                        </a>
                    </div>
                    <div class="card-body p-3 d-flex flex-column">
                        <h6 class="card-title text-truncate mb-1" style="font-size: 0.95rem;">
                            <a href="/pages/book.html?id=${book.document_id}" class="text-decoration-none text-dark fw-bold" title="${book.title}">
                                ${book.title}
                            </a>
                        </h6>
                        <small class="text-muted mb-2 text-truncate">${book.author_name}</small>
                        <div class="mt-auto d-flex justify-content-between align-items-center small text-secondary">
                            <span><i class="fas fa-eye me-1"></i>${book.view_count}</span>
                            <span style="font-size: 0.75rem;">${date}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Lỗi load sách mới:', error);
        container.innerHTML = `<div class="alert alert-danger w-100">Lỗi: ${error.message}</div>`;
    }
}