// js/book-details.js

import { supabase } from './supabase-client.js';
import { 
    incrementViewCount, 
    incrementDownloadCount,
    toggleFavorite,
    checkFavoriteStatus,
    getSession, 
    addToReadingHistory 
} from './dashboard.js';

const bookId = new URLSearchParams(window.location.search).get('id');

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Lấy session ngay khi vào trang
    await getSession();

    if (!bookId) {
        document.body.innerHTML = "<div class='container py-5 text-center'><h1>Lỗi: Không tìm thấy ID sách.</h1></div>";
        return;
    }
    
    // 2. Tải chi tiết sách
    loadBookDetails(bookId);
});

async function loadBookDetails(id) {
    const heroWrapper = document.getElementById('book-hero-wrapper');
    const descriptionEl = document.getElementById('book-detail-description');
    
    const readButton = document.getElementById('btn-read');
    const downloadButton = document.getElementById('btn-download');
    const favoriteButton = document.getElementById('btn-favorite'); 
    
    try {
        // --- XỬ LÝ NÚT YÊU THÍCH ---
        if (favoriteButton) {
            const isFav = await checkFavoriteStatus(id);
            updateFavoriteButtonUI(favoriteButton, isFav);

            favoriteButton.onclick = async () => {
                const btnIcon = favoriteButton.querySelector('i');
                const originalClass = btnIcon.className;
                
                // Hiệu ứng loading
                btnIcon.className = 'fas fa-spinner fa-spin';
                favoriteButton.disabled = true;
                
                const result = await toggleFavorite(id);
                
                favoriteButton.disabled = false;
                
                if (result) {
                    const isAdded = (result.action === 'added');
                    updateFavoriteButtonUI(favoriteButton, isAdded);
                } else {
                    btnIcon.className = originalClass;
                }
            };
        }

        // --- TẢI DỮ LIỆU TỪ SUPABASE ---
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

        // Lưu lịch sử ngay khi tải trang thành công (Tùy chọn)
        addToReadingHistory(id);        
        
        document.title = `${book.title} - Thư Viện Số`;
        
        // Hiển thị mô tả
        if (book.description) {
            descriptionEl.innerHTML = book.description.replace(/\n/g, '<br>');
        } else {
            descriptionEl.textContent = "Không có mô tả.";
        }

        // --- RENDER HERO SECTION ---
        const coverUrl = book.thumbnail_url || '/assets/images/default.jpg';
        
        const heroHtml = `
            <div class="pnt-slide-wrapper"> 
                <img src="${coverUrl}" class="pnt-background" alt="Background" draggable="false">
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
                        <div class="d-flex gap-3 mt-3 text-white-50 small">
                            <span><i class="fas fa-eye me-1"></i> ${book.view_count || 0} lượt xem</span>
                            <span><i class="fas fa-download me-1"></i> ${book.download_count || 0} lượt tải</span>
                            <span><i class="fas fa-calendar me-1"></i> ${book.publication_year || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        heroWrapper.innerHTML = heroHtml;
        
        // --- XỬ LÝ FILE ĐÍNH KÈM & BUTTON ---
        if (book.attachments && book.attachments.length > 0) {
            const attachment = book.attachments[0];
            
            // Lấy Public URL
            const { data: urlData } = supabase.storage
                .from('sach-files') // Đảm bảo bucket này đúng tên trong Storage của bạn
                .getPublicUrl(attachment.file_path);
            const publicUrl = urlData.publicUrl;

            // NÚT ĐỌC
            readButton.disabled = false;
            readButton.onclick = async () => {
                console.log('Bắt đầu đọc sách...');
                // 1. Tăng view
                incrementViewCount(book.document_id);
                // 2. Lưu lịch sử (quan trọng)
                await addToReadingHistory(book.document_id);
                // 3. Mở file
                window.open(publicUrl, '_blank');
            };
            
            // NÚT TẢI
            downloadButton.disabled = false;
            downloadButton.onclick = async () => {
                await incrementDownloadCount(book.document_id);
                
                const a = document.createElement('a');
                a.href = publicUrl;
                a.download = attachment.file_name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

        } else {
            // Nếu không có file
            readButton.disabled = true;
            readButton.innerHTML = '<i class="fas fa-ban me-2"></i> Chưa có file';
            downloadButton.disabled = true;
            downloadButton.innerHTML = '<i class="fas fa-ban me-2"></i> Chưa có file';
        }

    } catch (error) {
        console.error('Lỗi khi tải chi tiết sách:', error.message);
        descriptionEl.innerHTML = `<div class="alert alert-danger">Lỗi: ${error.message}</div>`;
        if (readButton) readButton.disabled = true;
        if (downloadButton) downloadButton.disabled = true;
    }
}

function updateFavoriteButtonUI(btn, isFav) {
    if (isFav) {
        btn.classList.remove('btn-outline-danger');
        btn.classList.add('btn-danger');
        btn.innerHTML = '<i class="fas fa-heart"></i> <span class="ms-1 fs-6">Đã thích</span>';
    } else {
        btn.classList.add('btn-outline-danger');
        btn.classList.remove('btn-danger');
        btn.innerHTML = '<i class="far fa-heart"></i> <span class="ms-1 fs-6">Yêu thích</span>';
    }
}