// file: reviews.js

// Khởi tạo một chút tương tác cho phần đánh giá sao (Rating) và Bình luận
function initializeReviews() {
    // === [ KHAI BÁO CÁC PHẦN TỬ CHUNG ] ===
    const ratingInput = document.querySelector('.rating-input');
    // Kiểm tra nếu không có phần tử rating, thoát khỏi hàm
    if (!ratingInput) return;
    
    const stars = ratingInput.querySelectorAll('.rating-star');
    const ratingText = document.getElementById('rating-text');
    // Lấy rating ban đầu (0) hoặc từ data-rating nếu có
    let currentRating = parseInt(ratingInput.dataset.rating || 0); 
    
    // Khai báo các phần tử cho chức năng BÌNH LUẬN
    const submitBtn = document.getElementById('submit-comment-btn');
    const commentTextarea = document.getElementById('comment-textarea');
    const commentsListContainer = document.getElementById('comments-list-container');
    
    // Dữ liệu người dùng mặc định cho demo
    const USER_NAME = "Bạn (Người Học)";
    const USER_AVATAR = "https://placehold.co/40x40/0d6efd/ffffff?text=YOU"; 

    // Cập nhật text theo số sao (LẤY TỪ GLOBAL TRANSLATIONS)
    const ratingLabels = {
        0: window.getTranslation('notRated'), 
        1: window.getTranslation('ratingLabel1'),
        2: window.getTranslation('ratingLabel2'),
        3: window.getTranslation('ratingLabel3'),
        4: window.getTranslation('ratingLabel4'),
        5: window.getTranslation('ratingLabel5')
    };

    /** Hàm cập nhật trạng thái icon sao */
    function updateStars(rating, className = 'rated') {
        stars.forEach(s => {
            s.classList.remove('fas', 'far', 'rated', 'hover-active');
            s.classList.add('far');
        });
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas', className);
            } else {
                star.classList.remove('fas', className);
                star.classList.add('far');
            }
        });
        ratingText.textContent = ratingLabels[rating];
    }

    // Xử lý Hover và Click cho Rating
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            updateStars(parseInt(this.dataset.value), 'hover-active'); 
        });
        star.addEventListener('mouseout', function() {
            updateStars(currentRating, 'rated');
        });
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.value);
            updateStars(currentRating, 'rated');
            ratingInput.dataset.rating = currentRating;
        });
    });
    // Khởi tạo ban đầu với text đã dịch
    updateStars(currentRating, 'rated');
    
    // === [ CHỨC NĂNG GỬI BÌNH LUẬN MỚI ] ===
    
    /**
     * Hàm thêm một Comment HTML vào DOM và gắn các sự kiện tương tác
     */
    function appendNewComment(commentContent, userRating) {
        // Dùng Date.now() để tạo ID tạm thời cho demo
        const newCommentHtml = createCommentHtml(commentContent, userRating, Date.now()); 
        
        // Chèn HTML vào đầu danh sách
        commentsListContainer.insertAdjacentHTML('afterbegin', newCommentHtml);
        
        // Lấy lại phần tử bình luận vừa được tạo (phần tử con đầu tiên)
        const newCommentElement = commentsListContainer.firstElementChild; 
        
        // Gắn sự kiện cho bình luận mới (rất quan trọng)
        attachCommentEventListeners(newCommentElement);
    }

    /** Hàm tạo HTML cho bình luận mới */
    function createCommentHtml(content, rating, id) {
        let starHtml = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = (i <= rating) ? 'fas' : 'far';
            starHtml += `<i class="${starClass} fa-star text-warning"></i>`;
        }
        
        return `
            <div class="comment-item mb-4 p-3 border-bottom bg-white rounded" data-comment-id="${id}">
                <div class="d-flex align-items-start">
                    <img src="${USER_AVATAR}" alt="Avatar" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-primary">${USER_NAME}</span>
                            <div class="comment-rating">${starHtml}</div>
                        </div>
                        <p class="text-muted small mb-1">${window.getTranslation('justPosted')}</p>
                        <p class="mt-2 mb-2">${content}</p>

                        <div class="comment-actions small text-muted">
                            <a href="#" class="me-3 btn-like">
                                <i class="far fa-heart me-1 like-icon"></i>
                                ${window.getTranslation('likeBtnText')} (<span class="like-count-text">0</span>)
                            </a>
                            <a href="#" class="me-3 btn-reply">${window.getTranslation('replyBtnText')}</a>
                        </div>
                        <div class="reply-form-container mt-2" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Xử lý sự kiện khi click nút "Gửi bình luận"
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const commentContent = commentTextarea.value.trim();
            const userRating = currentRating;
            
            // Dùng bản dịch cho alert
            if (commentContent.length < 5) {
                alert(window.getTranslation('commentLengthAlert'));
                return;
            }
            
            // Dùng bản dịch cho alert
            if (userRating === 0) {
                alert(window.getTranslation('ratingMissingAlert'));
                return;
            }
            
            // 1. Thêm bình luận mới và gắn sự kiện
            appendNewComment(commentContent, userRating);
            
            // 2. Reset trạng thái sau khi gửi
            commentTextarea.value = '';
            currentRating = 0;
            updateStars(currentRating, 'rated');
            ratingInput.dataset.rating = currentRating;
        });
    }


    // === [ CHỨC NĂNG THÍCH (LIKE) ] ===

    /** Xử lý sự kiện click nút Thích */
    function handleLikeClick(e) {
        e.preventDefault(); 
        
        const btnLike = e.currentTarget;
        const likeCountSpan = btnLike.querySelector('.like-count-text');
        const likeIcon = btnLike.querySelector('.like-icon');
        
        let currentLikes = parseInt(likeCountSpan.textContent);
        
        // Kiểm tra trạng thái và chuyển đổi
        if (likeIcon.classList.contains('far')) { // Nếu chưa thích
            likeIcon.classList.remove('far');
            likeIcon.classList.add('fas', 'text-danger'); 
            currentLikes++;
        } else { // Nếu đã thích
            likeIcon.classList.remove('fas', 'text-danger');
            likeIcon.classList.add('far');
            currentLikes--;
        }
        
        // Cập nhật số lượt thích
        likeCountSpan.textContent = currentLikes;
    }

    // === [ CHỨC NĂNG TRẢ LỜI (REPLY) ] ===

    /** Tạo form trả lời HTML */
    function createReplyFormHtml(parentName) {
        // Lấy bản dịch
        const repNameBadge = window.getTranslation('repNameBadge');
        const repNameText = window.getTranslation('repNameText');
        const replyPlaceholder = window.getTranslation('replyPlaceholder');
        const sendBtn = window.getTranslation('sendBtn');
        
        return `
            <div class="reply-form-content">
                <div class="d-flex align-items-center mb-1">
                    <span class="badge bg-secondary text-white rounded-pill me-2 reply-to-badge">
                        ${repNameBadge}${parentName}
                    </span>
                    <span class="text-muted small">${repNameText}</span>
                </div>
                
                <div class="input-group reply-input-group shadow-sm">
                    <textarea class="form-control form-control-sm border-end-0" 
                              rows="1" 
                              placeholder="${replyPlaceholder}"></textarea>
                              
                    <button class="btn btn-sm btn-primary btn-submit-reply" type="button">
                        ${sendBtn}
                    </button>
                </div>
            </div>
        `;
    }
    
    /** Xử lý sự kiện click nút Trả lời */
    function handleReplyClick(e) {
        e.preventDefault();
        
        const btnReply = e.currentTarget;
        const commentItem = btnReply.closest('.comment-item'); 
        const replyFormContainer = commentItem.querySelector('.reply-form-container');
        const parentName = commentItem.querySelector('.fw-bold').textContent; 
        
        // 1. Ẩn/Hiện form
        if (replyFormContainer.style.display === 'none' || replyFormContainer.innerHTML === '') {
            // Hiện form và điền HTML nếu chưa có
            replyFormContainer.innerHTML = createReplyFormHtml(parentName);
            replyFormContainer.style.display = 'block';
            
            // 2. Gắn sự kiện cho nút Gửi trong form trả lời
            const submitReplyBtn = replyFormContainer.querySelector('.btn-submit-reply');
            submitReplyBtn.addEventListener('click', function() {
                handleSubmitReply(commentItem, parentName);
            });
            
            // Tự động focus vào textarea
            replyFormContainer.querySelector('textarea').focus();
        } else {
            // Ẩn form nếu đã hiện
            replyFormContainer.style.display = 'none';
        }
    }

    /** Xử lý sự kiện Gửi Trả lời */
    function handleSubmitReply(parentComment, parentName) {
        const replyTextarea = parentComment.querySelector('.reply-form-content textarea');
        const replyContent = replyTextarea.value.trim();
        const replyFormContainer = parentComment.querySelector('.reply-form-container');
        
        // Dùng bản dịch cho alert
        if (replyContent.length < 3) {
            alert(window.getTranslation('replyLengthAlert'));
            return;
        }

        // 1. Tạo HTML cho trả lời mới (Dùng bản dịch)
        const newReplyHtml = `
            <div class="d-flex align-items-start mb-2 bg-light p-3 rounded">
                <img src="${USER_AVATAR}" alt="Avatar Reply" class="rounded-circle me-3" style="width: 30px; height: 30px; object-fit: cover;">
                <div>
                    <span class="fw-bold text-primary">${USER_NAME}</span>
                    <p class="text-muted small mb-1">${window.getTranslation('justReplied')}</p>
                    <p class="mt-1 mb-0">
                        <span class="badge bg-secondary me-2">${window.getTranslation('repNameBadge')}${parentName}</span>
                        ${replyContent}
                    </p>
                </div>
            </div>
        `;

        // 2. Tìm hoặc tạo khu vực chứa Replies
        let repliesContainer = parentComment.querySelector('.replies');
        if (!repliesContainer) {
            // Nếu chưa có, tạo container Replies mới
            repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies', 'mt-3', 'ps-4', 'border-start', 'border-2', 'border-info');
            
            // Chèn repliesContainer vào trước comment-actions
            parentComment.querySelector('.comment-actions').before(repliesContainer);
        }
        
        // 3. Chèn câu trả lời mới vào đầu repliesContainer
        repliesContainer.insertAdjacentHTML('afterbegin', newReplyHtml);
        
        // 4. Ẩn form trả lời sau khi gửi thành công
        replyFormContainer.style.display = 'none';
        replyFormContainer.innerHTML = ''; // Xóa nội dung form để reset
    }


    // === [ GẮN SỰ KIỆN CHO TẤT CẢ BÌNH LUẬN ] ===

    /**
     * Hàm gắn sự kiện Like và Reply cho một phần tử bình luận cụ thể.
     */
    function attachCommentEventListeners(commentElement) {
        // Gắn sự kiện cho nút Thích
        const likeBtn = commentElement.querySelector('.btn-like');
        if (likeBtn) {
            // Cập nhật text "Thích" cho các comment tĩnh
            likeBtn.innerHTML = likeBtn.innerHTML.replace('Thích', window.getTranslation('likeBtnText'));
            likeBtn.addEventListener('click', handleLikeClick);
        }

        // Gắn sự kiện cho nút Trả lời
        const replyBtn = commentElement.querySelector('.btn-reply');
        if (replyBtn) {
            // Cập nhật text "Trả lời" cho các comment tĩnh
            replyBtn.textContent = window.getTranslation('replyBtnText');
            replyBtn.addEventListener('click', handleReplyClick);
        }
    }
    
    // Gắn sự kiện cho TẤT CẢ các bình luận hiện có khi trang tải xong
    document.querySelectorAll('#comments-list-container .comment-item').forEach(attachCommentEventListeners);
    
    // *** Cập nhật các chuỗi text tĩnh trong comment template (Ví dụ: @Tên người dùng)
    document.querySelectorAll('.replies .badge.bg-secondary').forEach(badge => {
        // Chỉ thay thế nếu nội dung là @
        if (badge.textContent.startsWith('@')) {
             const name = badge.textContent.substring(1);
             badge.textContent = `${window.getTranslation('repNameBadge')}${name}`;
        }
    });
}

// Chạy logic khi DOM tải xong
document.addEventListener('DOMContentLoaded', initializeReviews);

// *** EXPOSE HÀM NÀY ĐỂ app-ui.js CÓ THỂ GỌI LẠI KHI ĐỔI NGÔN NGỮ ***
window.reInitializeReviewsLogic = function() {
    // Gỡ listener DOMContentLoaded cũ nếu có
    document.removeEventListener('DOMContentLoaded', initializeReviews);
    
    // Chạy lại logic
    initializeReviews();
    
    // Cập nhật lại sao để hiển thị label đúng
    const ratingInput = document.querySelector('.rating-input');
    if (ratingInput) {
        // Lấy lại rating hiện tại
        let currentRating = parseInt(ratingInput.dataset.rating || 0);
        const ratingText = document.getElementById('rating-text');
        
        // Tạo lại ratingLabels bằng bản dịch mới
        const newRatingLabels = {
            0: window.getTranslation('notRated'), 
            1: window.getTranslation('ratingLabel1'),
            2: window.getTranslation('ratingLabel2'),
            3: window.getTranslation('ratingLabel3'),
            4: window.getTranslation('ratingLabel4'),
            5: window.getTranslation('ratingLabel5')
        };
        // Cập nhật text đánh giá hiện tại 
        ratingText.textContent = newRatingLabels[currentRating];
    }
};