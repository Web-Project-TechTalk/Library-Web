import { fetchReadingHistoryList } from './dashboard.js';

// Tự động tải ngay khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Tìm container
    const listContainer = document.getElementById('sidebarHistoryList');
    if (listContainer) {
        loadSidebarHistory(listContainer);
    }
});

// Sự kiện click để người dùng có thể tải lại nếu muốn
document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#btn-load-sidebar-history');
    if (!toggleBtn) return;

    const listContainer = document.getElementById('sidebarHistoryList');
    if (!listContainer) return;

    const isAlreadyLoaded = listContainer.querySelector('a'); 
    if (!isAlreadyLoaded) {
        loadSidebarHistory(listContainer);
    }
});

// Hàm xử lý việc gọi API và hiển thị 
async function loadSidebarHistory(container) {
    console.log('Đang tải lịch sử đọc...');
    
    // Hiển thị loading 
    container.innerHTML = '<li class="text-center py-2"><div class="spinner-border spinner-border-sm text-secondary"></div></li>';

    try {
        // Gọi API lấy 10 cuốn sách gần nhất
        const history = await fetchReadingHistoryList(10);
        renderSidebarHistory(container, history);
    } catch (err) {
        console.error('Lỗi sidebar:', err);
        container.innerHTML = '<li class="text-danger small ms-3 py-2">Lỗi tải dữ liệu.</li>';
    }
}

// Hàm render HTML
function renderSidebarHistory(container, books) {
    if (!books || books.length === 0) {
        // SỬA LỖI MÀU SẮC: Dùng text-muted thay vì text-white-50
        container.innerHTML = '<li class="text-muted small fst-italic ms-3 py-2">Chưa có lịch sử.</li>';
        return;
    }

    const html = books.map(book => {
        const thumb = book.thumbnail_url || '/assets/images/default.jpg';
        const shortTitle = book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title;

        return `
            <li class="mb-2 mt-2 ms-2">
                <a href="/pages/book.html?id=${book.document_id}" class="d-flex align-items-center text-decoration-none sidebar-history-item">
                    <img src="${thumb}" alt="cover" 
                         style="width: 30px; height: 40px; object-fit: cover; border-radius: 3px; margin-right: 10px; flex-shrink: 0;">
                    <div style="line-height: 1.2;">
                        <span class="d-block small fw-bold text-truncate" style="max-width: 140px;" title="${book.title}">${shortTitle}</span>
                        <span class="d-block text-muted" style="font-size: 0.7rem;">
                            <i class="fas fa-clock me-1"></i> Vừa xem
                        </span>
                    </div>
                </a>
            </li>
        `;
    }).join('');

    container.innerHTML = html;
}