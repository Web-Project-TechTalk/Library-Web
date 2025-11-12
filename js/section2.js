document.addEventListener('DOMContentLoaded', () => {

    const bookData = [
        {
            id: 1,
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
            id: 2,
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
    const slides = document.querySelectorAll('.book-slide');
    let currentBookIndex = 0;
    let currentLang = localStorage.getItem('language') || 'vi';

    // Cập nhật nội dung slide theo index và ngôn ngữ
    const renderBookDetails = (index, lang) => {
        const slide = slides[index];
        const body = slide.querySelector('.details-table tbody');
        const cover = slide.querySelector('.book-cover-lg');
        const details = bookData[index].details[lang];

        cover.src = bookData[index].cover;
        cover.alt = details.title;

        let html = '';
        html += `<tr><td>${details.author_label}</td><td>${details.author_value}</td></tr>`;
        html += `<tr><td>${details.translator_label}</td><td>${details.translator_value}</td></tr>`;
        html += `<tr><td>${details.publisher_label}</td><td>${details.publisher_value}</td></tr>`;
        html += `<tr><td>${details.size_label}</td><td>${details.size_value}</td></tr>`;
        html += `<tr><td>${details.pages_label}</td><td>${details.pages_value}</td></tr>`;
        html += `<tr><td>${details.release_label}</td><td>${details.release_value}</td></tr>`;

        body.innerHTML = html;
        //cập nhật header của section
        const title = document.querySelector('[data-key="section2_title"]');
        if (title) {
            title.textContent = lang === 'vi'
                ? "Sách mới"
                : "What's New";
        }
        // Cập nhật câu nói
        const saying = document.querySelector('[data-key="section2_saying"]');
        if (saying) {
            saying.textContent = lang === 'vi'
                ? "“Đọc trước khi nghĩ, nói sau khi nghĩ.”"
                : "\"Think before you speak. Read before you think.\"";
        }
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
        if (direction === 'next') {
            currentBookIndex = (currentBookIndex + 1) % total;
        } else {
            currentBookIndex = (currentBookIndex - 1 + total) % total;
        }
        showSlide(currentBookIndex);
    };

    // Gán sự kiện
    if (nextBtn) nextBtn.addEventListener('click', () => switchBook('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => switchBook('prev'));

    // Gán event cho đổi ngôn ngữ
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentLang = e.currentTarget.dataset.lang;
            setTimeout(() => showSlide(currentBookIndex), 50);
        });
    });

    // Khởi tạo
    showSlide(currentBookIndex);
});
