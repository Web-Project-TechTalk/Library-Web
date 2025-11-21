// js/book-details.js

import { supabase } from './supabase-client.js';
// Import các hàm đếm từ dashboard.js (giống như profile.js đã làm)
import { incrementViewCount, incrementDownloadCount } from './dashboard.js';

// Lấy ID sách từ URL
const bookId = new URLSearchParams(window.location.search).get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (!bookId) {
        document.body.innerHTML = "<h1>Lỗi: Không tìm thấy ID sách.</h1>";
        return;
    }
    
    loadBookDetails(bookId);
});

async function loadBookDetails(id) {
    const heroWrapper = document.getElementById('book-hero-wrapper');
    const descriptionEl = document.getElementById('book-detail-description');
    
    // ▼▼▼ TÌM CẢ 2 NÚT ▼▼▼
    const readButton = document.getElementById('btn-read');
    const downloadButton = document.getElementById('btn-download');
    
    try {
        const { data: book, error } = await supabase
            .from('documents')
            .select(`
                *, 
                attachments ( file_path, file_name )
            `)
            .eq('document_id', id)
            .single();

        if (error) throw error;
        if (!book) throw new Error('Không tìm thấy sách');

        // Cập nhật Tiêu đề trang (tab trình duyệt)
        document.title = `${book.title} - Thư Viện Số`;
        descriptionEl.textContent = book.description || "Không có mô tả.";

        // Xây dựng Hero Section
        const coverUrl = book.thumbnail_url || '/assets/images/placeholder-cover.jpg';
        
        const heroHtml = `
            <div class="pnt-slide-wrapper"> 
                <img src="${coverUrl}" class="pnt-background" alt="Blurred Background" draggable="false">
                <div class="pnt-gradient-overlay"></div>
                <div class="pnt-content">
                    <div class="pnt-cover">
                        <img src="${coverUrl}" alt="${book.title}" draggable="false">
                    </div>
                    <div class="pnt-info">
                        <h3 class="pnt-title">${book.title}</h3>
                        <p class="pnt-author">
                            <i class="fas fa-user-edit me-2"></i>
                            ${book.author_name || 'Không rõ'}
                        </p>
                    </div>
                </div>
            </div>
        `;
        heroWrapper.innerHTML = heroHtml;
        
        // 4. Gán sự kiện cho Nút Đọc và Tải về
        if (book.attachments && book.attachments.length > 0) {
            const attachment = book.attachments[0];
            
            // Lấy URL public từ file_path
            const { data: urlData } = supabase.storage
                .from('sach-files')
                .getPublicUrl(attachment.file_path);
            
            const publicUrl = urlData.publicUrl;

            // GÁN SỰ KIỆN CHO NÚT ĐỌC
            readButton.onclick = () => {
                // Tăng view count (không cần đợi)
                incrementViewCount(book.document_id);
                // Mở file trong tab mới
                window.open(publicUrl, '_blank');
            };
            
            // GÁN SỰ KIỆN CHO NÚT TẢI
            downloadButton.onclick = () => {
                // Tăng download count (không cần đợi)
                incrementDownloadCount(book.document_id);

                // Tạo link ẩn và bấm vào để tải
                const a = document.createElement('a');
                a.href = publicUrl;
                a.download = attachment.file_name; // Tên file gốc
                a.click();
            };
        } else {
            // Nếu không có file, vô hiệu hóa cả 2 nút
            readButton.disabled = true;
            readButton.textContent = "Không có file";
            downloadButton.disabled = true;
            downloadButton.textContent = "Không có file";
        }

    } catch (error) {
        console.error('Lỗi khi tải chi tiết sách:', error.message);
        descriptionEl.textContent = `Lỗi: ${error.message}`;
        // Vô hiệu hóa nút nếu có lỗi
        readButton.disabled = true;
        downloadButton.disabled = true;
    }
}