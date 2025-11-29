// js/advance-search.js

// Import supabase client
import { supabase } from './supabase-client.js';

// --- Khai báo các ID của các bộ lọc và khu vực hiển thị ---
const searchInput = document.getElementById('search-input-adv');
const searchFieldSelect = document.getElementById('search-field-select-adv');
const sortSelect = document.getElementById('sort-select-adv');
const resultsContainer = document.getElementById('results-container-adv');
const paginationFooter = document.querySelector('.pagination-footer');

// Biến trạng thái
let currentPage = 1;
const BOOKS_PER_PAGE = 15;
let currentSortKey = 'created_at';
let currentSortAscending = false;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    if (searchQuery) {
        searchInput.value = searchQuery;
    }

    // Đặt sự kiện lắng nghe để reset trang khi có thay đổi
    searchInput.addEventListener('input', debounce(() => { currentPage = 1; loadFilteredBooks(); }, 500));
    searchFieldSelect.addEventListener('change', () => { currentPage = 1; loadFilteredBooks(); });
    sortSelect.addEventListener('change', handleSortChange);

    loadFilteredBooks();
});

// --- Hàm xử lý thay đổi sắp xếp ---
function handleSortChange() {
    currentPage = 1;
    const sortValue = sortSelect.value;

    if (sortValue === 'date') {
        currentSortKey = 'created_at';
        currentSortAscending = false;
    } else if (sortValue === 'views') {
        currentSortKey = 'view_count';
        currentSortAscending = false;
    }
    else if (sortValue === 'rating') {
        currentSortKey = 'view_count'; // Dùng tạm view_count cho rating
        currentSortAscending = false;
    }
    else if (sortValue === 'title_asc') {
        currentSortKey = 'title';
        currentSortAscending = true;
    }

    loadFilteredBooks();
}

// --- HÀM TÌM KIẾM CHÍNH TRUY VẤN SUPABASE ---
async function loadFilteredBooks() {
    // Sử dụng khóa ngôn ngữ cho spinner loading
    // Chú ý: Vì không có hàm dịch trực tiếp ở đây, ta dùng data-lang-key để app-ui.js dịch sau
    resultsContainer.innerHTML = `<div class="col-12 text-center py-5" data-lang-key="loadingResults"><div class="spinner-border text-primary"></div></div>`;

    const searchTerm = searchInput.value.trim();
    const selectedField = searchFieldSelect.value;
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

        // 1. Lọc theo từ khóa
        if (searchTerm) {
            if (selectedField === 'all') {
                query = query.or(`title.ilike.%${searchTerm}%,author_name.ilike.%${searchTerm}%`);
            } else if (selectedField === 'title') {
                query = query.ilike('title', `%${searchTerm}%`);
            } else if (selectedField === 'author_name') {
                query = query.ilike('author_name', `%${searchTerm}%`);
            }
        }

        // 2. Sắp xếp
        query = query.order(currentSortKey, { ascending: currentSortAscending });

        // 3. Phân trang
        query = query.range(offset, offset + BOOKS_PER_PAGE - 1);

        const { data: books, error, count } = await query;

        if (error) throw error;

        renderBooks(books);
        renderPagination(count);

    } catch (error) {
        console.error('Lỗi tìm kiếm nâng cao:', error);

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

// --- Hàm tạo HTML sách (Thêm khóa ngôn ngữ cho thông báo) ---
function renderBooks(books) {
    if (!books || books.length === 0) {
        // Sử dụng khóa ngôn ngữ cho thông báo không có kết quả
        resultsContainer.innerHTML = '<div class="col-12"><p class="text-muted text-center" data-lang-key="noResultsFound">Không tìm thấy sách nào phù hợp.</p></div>';
        return;
    }

    resultsContainer.innerHTML = books.map(book => {
        const cover = book.thumbnail_url || '/assets/images/default.jpg';
        const rating = 'N/A';

        // GIỮ NGUYÊN tên sách và tác giả
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

// --- Hàm phân trang (Thêm data-lang-key cho 'Trước' và 'Sau') ---
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
                loadFilteredBooks();
            }
        });
    });
}

// --- Hàm debounce (Giữ nguyên) ---
function debounce(func, delay) {
    let timeoutId;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
// === LOGIC CHUYỂN ĐỔI BỐ CỤC (VIEW TOGGLE) ===

document.addEventListener('DOMContentLoaded', () => {
    // ... (logic khởi tạo DOMContentLoaded hiện tại) ...

    // Khai báo các nút chuyển đổi bố cục
    const resultsContainer = document.getElementById('results-container-adv');
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
});

// === LOGIC CHUYỂN ĐỔI BỐ CỤC (VIEW TOGGLE) ===

document.addEventListener('DOMContentLoaded', () => {
    // ... (logic khởi tạo DOMContentLoaded hiện tại) ...

    // Khai báo các nút chuyển đổi bố cục
    const resultsContainer = document.getElementById('results-container-adv');
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
});