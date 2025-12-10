// js/recently-added.js

// Import supabase client
import { supabase } from './supabase-client.js';

// --- Khai báo các ID của các bộ lọc và khu vực hiển thị ---
// Lưu ý: Đổi ID container kết quả và footer phân trang
const resultsContainer = document.getElementById('results-container-recent');
const paginationFooter = document.getElementById('pagination-footer-recent');

// Biến trạng thái
let currentPage = 1;
const BOOKS_PER_PAGE = 15;
// Cố định sắp xếp: theo ngày tạo, giảm dần (mới nhất)
const currentSortKey = 'created_at';
const currentSortAscending = false;

document.addEventListener('DOMContentLoaded', () => {
    // Không cần lắng nghe sự kiện input/select vì không có
    loadRecentlyAddedBooks();
    
    // Logic chuyển đổi bố cục view cũng được đặt ở dưới
    setupViewToggle();
});

// --- HÀM TẢI SÁCH MỚI NHẤT TRUY VẤN SUPABASE ---
async function loadRecentlyAddedBooks() {
    // Sử dụng khóa ngôn ngữ cho spinner loading
    resultsContainer.innerHTML = `<div class="col-12 text-center py-5" data-lang-key="loadingResults"><div class="spinner-border text-primary"></div></div>`;

    const offset = (currentPage - 1) * BOOKS_PER_PAGE;

    try {
        let query = supabase
            .from('documents')
            .select(`
                document_id, 
                title, 
                author_name, 
                thumbnail_url, 
                view_count, 
                created_at 
            `, { count: 'exact' });

        // 1. KHÔNG CẦN LỌC THEO TỪ KHÓA
        query = query.order(currentSortKey, { ascending: currentSortAscending });

        // 3. Phân trang
        query = query.range(offset, offset + BOOKS_PER_PAGE - 1);

        const { data: books, error, count } = await query;

        if (error) throw error;

        renderBooks(books);
        renderPagination(count);

    } catch (error) {
        console.error('Lỗi tải sách mới nhất:', error);

        let errorMessage = 'Lỗi không xác định.';
        if (error.message) {
            errorMessage = error.message;
        } else if (typeof error === 'object') {
            errorMessage = JSON.stringify(error);
        } else {
            errorMessage = String(error);
        }

        // HIỂN THỊ THÔNG BÁO LỖI CHI TIẾT
        resultsContainer.innerHTML = `<div class="col-12"><div class="alert alert-danger"><span data-lang-key="errorLoadingBooks">Lỗi tải sách:</span> ${errorMessage}</div></div>`;
        paginationFooter.textContent = 'Lỗi tải dữ liệu';
    }
}

// --- Hàm tạo HTML sách (Giữ nguyên từ advance-search.js) ---
function renderBooks(books) {
    if (!books || books.length === 0) {
        // Sử dụng khóa ngôn ngữ cho thông báo không có kết quả
        resultsContainer.innerHTML = '<div class="col-12"><p class="text-muted text-center" data-lang-key="noResultsFound">Không tìm thấy sách nào phù hợp.</p></div>';
        return;
    }

    resultsContainer.innerHTML = books.map(book => {
        const cover = book.thumbnail_url || '/assets/images/default.jpg';
        const rating = 'N/A';

        return `
        <div class="col">
            <div class="card h-100 shadow-sm border-0 book-card-hover bg-transparent">
                <div class="position-relative overflow-hidden" style="padding-top: 150%;"> 
                    <a href="/pages/book.html?id=${book.document_id}">
                        <img src="${cover}" class="position-absolute top-0 start-0 w-100 h-100" 
                             style="object-fit: cover; transition: transform 0.3s;" 
                             alt="${book.title}">
                    </a>
                </div>
                <div class="card-body p-3 d-flex flex-column text-white">
                    <h6 class="card-title text-truncate mb-1" style="font-size: 0.95rem;">
                        <a href="/pages/book.html?id=${book.document_id}" class="text-decoration-none text-white fw-bold" title="${book.title}">
                            ${book.title}
                        </a>
                    </h6>
                    <small class="text-muted mb-2 text-truncate">${book.author_name}</small>
                    <div class="mt-auto d-flex justify-content-between align-items-center small text-secondary">
                        <span class="text-warning"><i class="fas fa-star me-1"></i>${rating}</span>
                        <span><i class="fas fa-eye me-1"></i>${book.view_count || 0}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// --- Hàm phân trang  ---
function renderPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / BOOKS_PER_PAGE);

    if (totalPages <= 1) {
        paginationFooter.textContent = '';
        return;
    }

    let paginationHtml = '';

    // Thêm data-lang-key cho liên kết "Trước"
    paginationHtml += `<a href="#" data-page="${currentPage - 1}" class="text-decoration-none mx-1 ${currentPage === 1 ? 'text-muted' : 'text-primary'}" data-lang-key="paginationPrev">Trước</a>`;
    paginationHtml += `<span class="fw-bold mx-2 text-dark">${currentPage}</span>`;
    // Thêm data-lang-key cho liên kết "Sau"
    paginationHtml += `<a href="#" data-page="${currentPage + 1}" class="text-decoration-none mx-1 ${currentPage === totalPages ? 'text-muted' : 'text-primary'}" data-lang-key="paginationNext">Sau</a>`;

    paginationFooter.innerHTML = paginationHtml;

    // Sau khi chèn HTML, gọi lại hàm updateLanguageUI (nếu nó được expose toàn cục)
    if (typeof window.updateLanguageUI === 'function') {
        const lang = localStorage.getItem('language') || 'vi';
        // Chỉ cập nhật phần tử được tạo động (paginationFooter)
        window.updateLanguageUI(lang);
    }

    paginationFooter.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(link.dataset.page);
            if (page > 0 && page <= totalPages) {
                currentPage = page;
                loadRecentlyAddedBooks(); // Gọi hàm tải sách mới
            }
        });
    });
}

// === LOGIC CHUYỂN ĐỔI BỐ CỤC (VIEW TOGGLE) - Lấy từ advance-search.js ===
function setupViewToggle() {
    // Khai báo các nút chuyển đổi bố cục
    const resultsContainer = document.getElementById('results-container-recent'); // Đổi ID
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const viewButtons = document.querySelectorAll('.view-toggle-buttons button');

    // Hàm áp dụng bố cục
    function setView(viewType) {
        if (!resultsContainer) return;

        // 1. Áp dụng class CSS cho container
        resultsContainer.classList.remove('book-view-grid', 'book-view-list');
        resultsContainer.classList.add(`book-view-${viewType}`);

        // 2. Cập nhật trạng thái 'active' của các nút
        viewButtons.forEach(btn => {
            if (btn.dataset.view === viewType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 3. Lưu trạng thái vào Local Storage
        localStorage.setItem('bookListView', viewType);
    }

    // 4. Gắn sự kiện cho các nút
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => setView('grid'));
    }
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => setView('list'));
    }

    // 5. Khôi phục bố cục đã lưu khi tải trang
    const savedView = localStorage.getItem('bookListView') || 'grid';
    setView(savedView);
}