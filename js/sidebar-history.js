// File: js/sidebar-history.js
import { fetchReadingHistoryList } from './dashboard.js';

// Lắng nghe sự kiện click trên toàn bộ document 
document.addEventListener('click', async (e) => {
    //  Tìm phần tử cha gần nhất có id là btn-load-sidebar-history
    const toggleBtn = e.target.closest('#btn-load-sidebar-history');
    
    // Nếu không phải nút này thì bỏ qua
    if (!toggleBtn) return;

    const listContainer = document.getElementById('sidebarHistoryList');
    if (!listContainer) return;

    //Kiểm tra trạng thái:
    const currentContent = listContainer.innerText.trim();
    const isAlreadyLoaded = listContainer.querySelector('a'); // Nếu có thẻ <a> tức là đã load sách

    if (!isAlreadyLoaded) {
        console.log('Đang tải lịch sử đọc cho Sidebar...');
            listContainer.innerHTML = '<li class="text-center py-2"><div class="spinner-border spinner-border-sm text-secondary"></div></li>';

        try {
            // Gọi API lấy 10 cuốn sách gần nhất
            const history = await fetchReadingHistoryList(10);
            renderSidebarHistory(listContainer, history);
        } catch (err) {
            console.error('Lỗi sidebar:', err);
            listContainer.innerHTML = '<li class="text-danger small ms-3 py-2">Lỗi tải dữ liệu.</li>';
        }
    }
});

function renderSidebarHistory(container, books) {
    if (!books || books.length === 0) {
        container.innerHTML = '<li class="text-white-50 small fst-italic ms-3 py-2">Chưa có lịch sử.</li>';
        return;
    }

    const html = books.map(book => {
        const thumb = book.thumbnail_url || '/assets/images/default.jpg';
        const shortTitle = book.title.length > 25 ? book.title.substring(0, 25) + '...' : book.title;

        return `
            <li class="mb-2 mt-2 ms-2">
                <a href="/pages/book.html?id=${book.document_id}" class="d-flex align-items-center text-decoration-none text-light">
                    <img src="${thumb}" alt="cover" 
                         style="width: 30px; height: 40px; object-fit: cover; border-radius: 3px; margin-right: 10px; flex-shrink: 0;">
                    <div style="line-height: 1.2;">
                        <span class="d-block small fw-bold" title="${book.title}">${shortTitle}</span>
                        <span class="d-block text-white-50" style="font-size: 0.7rem;">
                            <i class="fas fa-clock me-1"></i> Vừa xem
                        </span>
                    </div>
                </a>
            </li>
        `;
    }).join('');

   

    container.innerHTML = html;
}