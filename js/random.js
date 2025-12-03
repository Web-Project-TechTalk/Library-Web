// js/random.js
document.addEventListener('DOMContentLoaded', () => {
    const randomCountSelect = document.getElementById('random-count-select');
    const fetchRandomBooksBtn = document.getElementById('fetchRandomBooksBtn');
    const resultsContainer = document.getElementById('results-container-random');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');

    // Mẫu dữ liệu sách giả định với 20 cuốn
    const mockBooks = [
        { id: 1, title: "Sự Sống", author: "Lê Văn Tám", cover: "/assets/images/su_song.jpg", rating: 9.5, views: "1.2K" },
        { id: 2, title: "Lập trình Web Nâng cao", author: "Nguyễn Thị Hoa", cover: "/assets/images/sach_lap_trinh_web.jpg", rating: 8.9, views: "5.5K" },
        { id: 3, title: "Kinh tế học Vĩ mô", author: "Trần Văn A", cover: "/assets/images/kinh_te_vi_mo.jpg", rating: 7.8, views: "800" },
        { id: 4, title: "Văn học Việt Nam Hiện đại", author: "Phạm Văn B", cover: "/assets/images/van-hoc-viet-nam-hien-dai.jpg", rating: 9.1, views: "2.1K" },
        { id: 5, title: "Công nghệ AI và Tương lai", author: "Hoàng Minh C", cover: "/assets/images/ai-tri-tue-nhan-tao.jpg", rating: 9.8, views: "3.4K" },
        { id: 6, title: "Cấu trúc Dữ liệu & Giải thuật", author: "Đỗ Tuấn Khôi", cover: "/assets/images/dsa.jpg", rating: 9.3, views: "6.7K" },
        { id: 7, title: "Tâm lý học Hành vi", author: "Dương Thị Lan", cover: "/assets/images/tam-ly-hoc-hanh-vi.jpg", rating: 8.5, views: "1.9K" },
        { id: 8, title: "Lịch sử Thế giới Cổ đại", author: "Phùng Gia Huy", cover: "/assets/images/lich-su-the-gioi-co-dai.jpg", rating: 7.9, views: "950" },
        { id: 9, title: "Thiết kế UI/UX Hiện đại", author: "Ngô Quang Thắng", cover: "/assets/images/sach-ui-ux.jpg", rating: 9.6, views: "4.8K" },
        { id: 10, title: "Toán Cao cấp A1", author: "Mai Thanh Trúc", cover: "/assets/images/toan_cao_cap_a1.jpg", rating: 7.5, views: "3.2K" },
        { id: 11, title: "Khởi nghiệp Từ A đến Z", author: "Võ Minh Đức", cover: "/assets/images/khoi-nghiep-tu-a-den-z-01.jpg", rating: 9.0, views: "2.5K" },
        { id: 12, title: "Nghệ thuật Viết Code Sạch", author: "Nguyễn Văn Đạt", cover: "/assets/images/clean-code-ma-sach.jpg", rating: 9.7, views: "7.1K" },
        { id: 13, title: "Bí mật Cây Cỏ", author: "Trần Thị Thu", cover: "/assets/images/bi_mat_cua_cay.jpg", rating: 8.3, views: "1.5K" },
        { id: 14, title: "Figma cho người mới", author: "Lê Hữu Nghĩa", cover: "/assets/images/hoc-figma.jpg", rating: 9.2, views: "3.9K" },
        { id: 15, title: "Đắc nhân tâm", author: "Dale Carnegie", cover: "/assets/images/dac-nhan-tam.jpg", rating: 9.9, views: "10.0K" },
        { id: 16, title: "Sức mạnh của Thói quen", author: "Charles Duhigg", cover: "/assets/images/habit.jpg", rating: 8.8, views: "6.2K" },
        { id: 17, title: "Vật lý Lượng tử", author: "Albert Einstein", cover: "/assets/images/luocsuvatlyluongtu.jpg", rating: 8.6, views: "1.1K" },
        { id: 18, title: "Truyện Kiều", author: "Nguyễn Du", cover: "/assets/images/truyen_kieu.jpg", rating: 9.4, views: "5.0K" },
        { id: 19, title: "Thực vật học Cơ bản", author: "Phan Văn Lực", cover: "/assets/images/thuc_vat_hoc.jpg", rating: 8.0, views: "750" },
        { id: 20, title: "Hóa học Đại cương", author: "Đặng Xuân", cover: "/assets/images/hoa-hoc-dai-cuong.jpg", rating: 7.2, views: "2.8K" },
    ];
    
    // Biến để lưu trữ sách đã được random hiện tại
    let currentRandomBooks = [];

    /**
     * Hàm giả lập việc lấy sách ngẫu nhiên từ server
     * @param {number} count Số lượng sách cần lấy
     * @returns {Promise<Array>} Danh sách sách
     */
    async function fetchRandomBooks(count) {
        // Tạm thời dùng mock data
        const maxIndex = mockBooks.length;
        const randomBooks = [];
        
        // Tạo một mảng các index có thể chọn
        const availableIndexes = [...Array(maxIndex).keys()];
        
        // Đảm bảo không chọn quá số lượng sách mẫu có
        const actualCount = Math.min(count, maxIndex); 

        // Lấy sách ngẫu nhiên không lặp (nếu actualCount <= maxIndex)
        for(let i = 0; i < actualCount; i++) {
            // Chọn một index ngẫu nhiên từ mảng availableIndexes
            const randomArrIndex = Math.floor(Math.random() * availableIndexes.length);
            const dataIndex = availableIndexes[randomArrIndex];
            
            // Xóa index đã chọn khỏi mảng để không bị lặp
            availableIndexes.splice(randomArrIndex, 1);
            
            randomBooks.push({...mockBooks[dataIndex], displayId: mockBooks[dataIndex].id});
        }
        
        return new Promise(resolve => {
            setTimeout(() => resolve(randomBooks), 500); // Giả lập độ trễ 0.5s
        });
    }

    /**
     * Tạo HTML cho một cuốn sách (dạng Grid hoặc List)
     * @param {Object} book Dữ liệu cuốn sách
     * @returns {string} Chuỗi HTML
     */
    function createBookCardHTML(book) {
        const isList = resultsContainer.classList.contains('book-view-list');
        
        // Bạn sẽ thay thế 'path/to/covers/' bằng đường dẫn thực tế đến folder ảnh của mình
        const imagePath = book.cover; 
        
        if (isList) {
            // Dạng Danh sách (List View)
            return `
                <div class="col">
                    <div class="card book-card-hover rounded shadow-sm border-0">
                        <div class="position-relative bg-light rounded overflow-hidden">
                            <img src="${imagePath}" class="card-img-top object-fit-cover w-100 h-100" alt="${book.title}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title fw-bold text-truncate mb-0">${book.title}</h6>
                            <small class="text-muted mb-2">${book.author}</small>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="badge bg-warning text-dark"><i class="fas fa-star me-1"></i>${book.rating}</span>
                                <small class="text-muted"><i class="fas fa-eye me-1"></i>${book.views}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Dạng Lưới (Grid View)
            return `
                <div class="col">
                    <div class="card book-card-hover rounded shadow-sm border-0">
                        <div class="position-relative" style="padding-top: 150%;">
                            <img src="${imagePath}" class="card-img-top position-absolute top-0 start-0 w-100 h-100 object-fit-cover" alt="${book.title}">
                        </div>
                        <div class="card-body p-3">
                            <h6 class="card-title fw-bold text-truncate">${book.title}</h6>
                            <small class="text-muted d-block mb-2 text-truncate">${book.author}</small>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="badge bg-warning text-dark"><i class="fas fa-star me-1"></i>${book.rating}</span>
                                <small class="text-muted"><i class="fas fa-eye me-1"></i>${book.views}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Render danh sách sách lên giao diện
     * @param {Array} books Danh sách sách
     */
    function renderBooks(books) {
        if (!books || books.length === 0) {
            // Dùng hàm getTranslation toàn cục từ app-ui.js
            const noResultsText = window.getTranslation('randomNoResults');
            resultsContainer.innerHTML = `
                <div class="col-12 text-center text-muted p-5">
                    <i class="fas fa-search-location fa-2x mb-3"></i>
                    <p class="lead">${noResultsText}</p>
                </div>
            `;
            return;
        }

        currentRandomBooks = books; // Lưu lại kết quả
        const bookHTML = books.map(createBookCardHTML).join('');
        resultsContainer.innerHTML = bookHTML;
    }

    /**
     * Xử lý khi nhấn nút "Tìm sách Ngẫu nhiên"
     */
    async function handleFetchRandom() {
        // Dùng hàm getTranslation toàn cục từ app-ui.js
        const searchingText = window.getTranslation('randomSearching');
        const fetchBtnText = window.getTranslation('randomFetchBtnText');
        
        // Vô hiệu hóa nút và hiện spinner
        fetchRandomBooksBtn.disabled = true;
        fetchRandomBooksBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> ${searchingText}`;
        
        // Hiện thông báo đang tải
        resultsContainer.innerHTML = `
            <div class="col-12 text-center text-muted p-5">
                <p class="lead"><i class="fas fa-spinner fa-spin me-2"></i> ${searchingText}</p>
            </div>
        `;

        const count = parseInt(randomCountSelect.value);
        const books = await fetchRandomBooks(count);
        
        renderBooks(books);

        // Kích hoạt lại nút
        fetchRandomBooksBtn.disabled = false;
        fetchRandomBooksBtn.innerHTML = `<i class="fas fa-dice me-1"></i> ${fetchBtnText}`;
    }

    // --- Đăng ký sự kiện ---

    // 1. Sự kiện Tìm sách Ngẫu nhiên
    fetchRandomBooksBtn.addEventListener('click', handleFetchRandom);

    // 2. Sự kiện chuyển đổi chế độ xem (Grid/List)
    function toggleView(event) {
        const targetBtn = event.currentTarget;
        const viewMode = targetBtn.getAttribute('data-view');
        
        if (viewMode === 'grid' && resultsContainer.classList.contains('book-view-list')) {
            resultsContainer.classList.remove('book-view-list');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else if (viewMode === 'list' && !resultsContainer.classList.contains('book-view-list')) {
            resultsContainer.classList.add('book-view-list');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
        
        // Render lại sách để áp dụng style mới (Giờ đây ta dùng currentRandomBooks)
        if (currentRandomBooks.length > 0) {
            renderBooks(currentRandomBooks);
        }
    }

    gridViewBtn.addEventListener('click', toggleView);
    listViewBtn.addEventListener('click', toggleView);

    console.log("Random book feature initialized.");
});