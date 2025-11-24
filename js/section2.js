// js/section2.js
document.addEventListener('DOMContentLoaded', () => {

    const bookData = [
        {
            cover: '/assets/images/thanthoai_va_truyenthuyet.jpg',
            details: {
                vi: {
                    title: "Thần Thoại Truyền Thuyết",
                    author_label: "Tác giả", author_value: "PHILIP WILKINSON",
                    translator_label: "Dịch giả", translator_value: "HỒ HỒNG ĐĂNG",
                    publisher_label: "Nhà xuất bản", publisher_value: "THẾ GIỚI",
                    size_label: "Kích thước", size_value: "19.5x23.5 cm",
                    pages_label: "Số trang", pages_value: "352",
                    release_label: "Ngày phát hành", release_value: "2025"
                },
                en: {
                    title: "Myth and Legend",
                    author_label: "Author", author_value: "PHILIP WILKINSON",
                    translator_label: "Translator", translator_value: "HO HONG DANG",
                    publisher_label: "Publisher", publisher_value: "THE GIOI",
                    size_label: "Size", size_value: "19.5x23.5 cm",
                    pages_label: "Pages", pages_value: "352",
                    release_label: "Release Date", release_value: "2025"
                }
            }
        },
        {
            cover: '/assets/images/sach_2_placeholder.jpg',
            details: {
                vi: {
                    title: "Sách Mới Tiếp Theo",
                    author_label: "Tác giả", author_value: "Tác giả 2",
                    translator_label: "Dịch giả", translator_value: "Dịch giả 2",
                    publisher_label: "Nhà xuất bản", publisher_value: "Nhà xuất bản 2",
                    size_label: "Kích thước", size_value: "xx cm",
                    pages_label: "Số trang", pages_value: "200",
                    release_label: "Ngày phát hành", release_value: "2025"
                },
                en: {
                    title: "Next New Book",
                    author_label: "Author", author_value: "Author 2",
                    translator_label: "Translator", translator_value: "Translator 2",
                    publisher_label: "Publisher", publisher_value: "Publisher 2",
                    size_label: "Size", size_value: "xx cm",
                    pages_label: "Pages", pages_value: "200",
                    release_label: "Release Date", release_value: "2025"
                }
            }
        }
    ];

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // Lấy các slide bằng class 'book-info-slide'
    const slides = document.querySelectorAll('.book-info-slide'); 
    const carousel = document.querySelector('.book-info-carousel');

    let currentBookIndex = 0;
    // Lấy ngôn ngữ hiện tại
    let currentLang = localStorage.getItem('language') || 'vi'; 
    let autoInterval;

    // Cập nhật chiều cao carousel
    const updateHeight = () => {
        let maxH = 0;
        // Chỉ tính chiều cao của slide đang hiển thị
        slides.forEach(slide => {
             if (slide.classList.contains('active')) {
                maxH = Math.max(maxH, slide.offsetHeight);
            }
        });
        if (maxH > 0 && carousel) {
            carousel.style.height = `${maxH}px`; 
        } else if (carousel) {
             carousel.style.minHeight = '400px'; 
        }
    };

    // Render chi tiết sách
    const renderBookDetails = (index, lang) => {
        // Truy cập body và cover qua ID để đảm bảo khớp với HTML
        const body = document.getElementById(`book-details-body-${index + 1}`); 
        const cover = document.getElementById(`book-cover-${index + 1}`);
        const details = bookData[index].details[lang];

        if (!body || !cover) return;

        cover.src = bookData[index].cover;
        cover.alt = details.title;

        let html = '';
        // Xây dựng HTML cho bảng chi tiết sách
        ['author', 'translator', 'publisher', 'size', 'pages', 'release'].forEach(field => {
            const label = details[`${field}_label`];
            const value = details[`${field}_value`];
            // Cấu trúc <tr><td>Label</td><td>Value</td></tr>
            if (label && value) html += `<tr><td>${label}</td><td>${value}</td></tr>`;
        });

        body.innerHTML = html;
        updateHeight();
    };

    // Hiển thị slide hiện tại
    const showSlide = (index) => {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        renderBookDetails(index, currentLang);
    };

    // Xử lý chuyển slide
    const switchBook = (direction) => {
        const total = slides.length;
        currentBookIndex = direction === 'next' 
            ? (currentBookIndex + 1) % total 
            : (currentBookIndex - 1 + total) % total;
        showSlide(currentBookIndex);
    };

    // Auto switch
    const startAuto = () => {
        autoInterval = setInterval(() => switchBook('next'), 8000);
    };

    // Gán sự kiện cho nút
    if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(autoInterval); switchBook('next'); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(autoInterval); switchBook('prev'); startAuto(); });

    // Tạm dừng/tiếp tục tự động cuộn khi hover
    const container = document.querySelector('.book-info-carousel-container');
    container?.addEventListener('mouseenter', () => clearInterval(autoInterval));
    container?.addEventListener('mouseleave', startAuto);
    
    // LẮNG NGHE SỰ KIỆN ĐỔI NGÔN NGỮ TỪ MAIN.JS
    document.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        // Gọi lại showSlide để render lại chi tiết sách với ngôn ngữ mới
        showSlide(currentBookIndex); 
    });

    // Khởi tạo
    showSlide(currentBookIndex); 
    startAuto();
});