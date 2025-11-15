import { supabase } from './supabase-client.js';

let currentUser = null;
let userProfile = null;

// --- HÀM BẢO VỆ TRANG (ĐỂ EXPORT) ---
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    
    // Lấy cờ từ sessionStorage
    const isRedirecting = sessionStorage.getItem('isRedirecting');

    if (error) {
        console.error('Lỗi lấy session:', error);
        return null;
    }

    if (!data.session) {
        // Chỉ chuyển hướng nếu chưa ở trong quá trình chuyển hướng
        if (!isRedirecting) {
            console.log('Chưa đăng nhập. Đang chuyển về auth.html');
            sessionStorage.setItem('isRedirecting', 'true'); // Đặt cờ
            window.location.replace('/pages/auth.html');
        }
        return null;
    }
    
    // Nếu có session, xóa cờ để cho phép điều hướng mới
    sessionStorage.removeItem('isRedirecting'); 
    
    currentUser = data.session.user;
    return data.session;
}

// --- HÀM SETUP HEADER (ĐỂ EXPORT) ---
export async function setupHeader(user) {
    const topbarAvatarImg = document.getElementById('topbar-avatar-img');
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', handleSignOut);
    } else {
        console.warn('Không tìm thấy #logout-button');
    }

    const { data, error } = await supabase
        .from('users')
        .select('username, avatar_url, full_name, background_url, phone, age')
        .eq('user_id', user.id)
        .single();

    if (data) {
        userProfile = data;
        
        if (topbarAvatarImg && data.avatar_url) {
            topbarAvatarImg.src = data.avatar_url;
        } else if (topbarAvatarImg) {
            topbarAvatarImg.src = '/assets/images/logo.gif';
        }
        
        return data; 
        
    } else {
        console.warn('Không tìm thấy profile, có thể user mới tạo:', error);
        return null;
    }
}

export async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Lỗi đăng xuất:', error);
    } else {
        sessionStorage.removeItem('isRedirecting');
        window.location.replace('/index.html');
    }
}

export function getCurrentUser() {
    return currentUser;
}

/**
 * Tải tất cả các thống kê cho Dashboard
 */
export async function fetchDashboardStats() {
    console.log('Đang tải thống kê Dashboard...');
    
    const [authorResult, categoryResult, docResult] = await Promise.all([
        supabase.rpc('get_popular_authors', { limit_count: 3 }),
        supabase.rpc('get_popular_categories', { limit_count: 3 }),
        supabase.rpc('get_most_viewed_documents', { limit_count: 3 })
    ]);

    // === 1. Xử lý Tác giả nổi bật ===
    const { data: authors, error: authorError } = authorResult;
    if (authorError) {
        console.error('Lỗi tải tác giả:', authorError);
    } else if (authors) {
        console.log('Tác giả phổ biến nhất:', authors);
        const authorList = document.getElementById('popular-authors-list');
        if (authorList) {
            authorList.innerHTML = '<h3>Tác giả nổi bật</h3>';
            if (authors.length === 0) {
                authorList.innerHTML += '<p>Chưa có dữ liệu</p>';
            } else {
                authors.forEach(author => {
                    authorList.innerHTML += `
                        <div class="stat-item">
                            <img src="${author.avatar_url || 'https://via.placeholder.com/32'}" alt="avatar">
                            <strong>${author.username}</strong>
                            <span>(${author.average_rating} sao / ${author.total_ratings_received} lượt)</span>
                        </div>`;
                });
            }
        }
    }

    // === 2. Xử lý Thể loại phổ biến ===
    const { data: categories, error: catError } = categoryResult;
    if (catError) {
        console.error('Lỗi tải thể loại:', catError);
    } else if (categories) {
        console.log('Thể loại phổ biến nhất:', categories);
        const catList = document.getElementById('popular-categories-list');
        if (catList) {
            catList.innerHTML = '<h3>Thể loại phổ biến</h3>';
            if (categories.length === 0) {
                catList.innerHTML += '<p>Chưa có dữ liệu</p>';
            } else {
                categories.forEach(cat => {
                    catList.innerHTML += `<div class="stat-item"><strong>${cat.name}</strong> (${cat.document_count} tài liệu)</div>`;
                });
            }
        }
    }

    // === 3. Xử lý Sách xem nhiều nhất ===
    const { data: docs, error: docError } = docResult;
    if (docError) {
        console.error('Lỗi tải sách xem nhiều:', docError);
    } else if (docs) {
        console.log('Sách xem nhiều nhất:', docs);
        const docList = document.getElementById('most-viewed-list');
        if (docList) {
            docList.innerHTML = '<h3>Xem nhiều nhất</h3>';
            if (docs.length === 0) {
                docList.innerHTML += '<p>Chưa có dữ liệu</p>';
            } else {
                docs.forEach(doc => {
                    docList.innerHTML += `
                        <div class="stat-item">
                            <img src="${doc.thumbnail_url || 'https://via.placeholder.com/40'}" 
                                 alt="thumbnail" 
                                 style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
                            <div>
                                <strong>${doc.title}</strong>
                                <small class="text-muted d-block">
                                    <i class="fas fa-eye me-1"></i> ${doc.view_count} lượt xem
                                    <span class="ms-2">bởi ${doc.author_username || 'Ẩn danh'}</span>
                                </small>
                            </div>
                        </div>`;
                });
            }
        }
    }
}

// === HÀM TĂNG LƯỢT XEM ===
export async function incrementViewCount(documentId) {
    if (!documentId) {
        console.error('incrementViewCount: Thiếu documentId');
        return false;
    }

    console.log(`Đang tăng lượt xem cho tài liệu ${documentId}...`);
    
    const { data, error } = await supabase.rpc('increment_document_metric', {
        doc_id: documentId,
        metric: 'views'
    });
    
    if (error) {
        console.error('Lỗi tăng view:', error);
        return false;
    }
    
    console.log('Tăng view thành công.');
    return true;
}

// === HÀM TĂNG LƯỢT TẢI ===
export async function incrementDownloadCount(documentId) {
    if (!documentId) {
        console.error('incrementDownloadCount: Thiếu documentId');
        return false;
    }

    console.log(`Đang tăng lượt tải cho tài liệu ${documentId}...`);
    
    const { data, error } = await supabase.rpc('increment_document_metric', {
        doc_id: documentId,
        metric: 'downloads'
    });
    
    if (error) {
        console.error('Lỗi tăng download:', error);
        return false;
    }
    
    console.log('Tăng download thành công.');
    return true;
}

// === HÀM THÊM/XÓA YÊU THÍCH ===
export async function toggleFavorite(documentId) {
    if (!currentUser) {
        console.error('toggleFavorite: Chưa đăng nhập');
        alert('Vui lòng đăng nhập để thêm yêu thích!');
        return false;
    }

    if (!documentId) {
        console.error('toggleFavorite: Thiếu documentId');
        return false;
    }

    // Kiểm tra xem đã yêu thích chưa
    const { data: existingFav, error: checkError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('document_id', documentId)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        console.error('Lỗi kiểm tra favorite:', checkError);
        return false;
    }

    if (existingFav) {
        // Đã yêu thích -> Xóa
        const { error: deleteError } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', currentUser.id)
            .eq('document_id', documentId);

        if (deleteError) {
            console.error('Lỗi xóa favorite:', deleteError);
            return false;
        }

        console.log('Đã bỏ yêu thích');
        return { action: 'removed' };
    } else {
        // Chưa yêu thích -> Thêm
        const { error: insertError } = await supabase
            .from('favorites')
            .insert([{ 
                user_id: currentUser.id, 
                document_id: documentId 
            }]);

        if (insertError) {
            console.error('Lỗi thêm favorite:', insertError);
            return false;
        }

        console.log('Đã thêm yêu thích');
        return { action: 'added' };
    }
}

// === HÀM KIỂM TRA TRẠNG THÁI YÊU THÍCH ===
export async function checkFavoriteStatus(documentId) {
    if (!currentUser || !documentId) return false;

    const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('document_id', documentId)
        .single();

    return !error && data;
}

// === HÀM LẤY DANH SÁCH TÀI LIỆU XEM NHIỀU NHẤT (CHI TIẾT HƠN) ===
export async function getMostViewedDocuments(limit = 10) {
    const { data, error } = await supabase.rpc('get_most_viewed_documents', {
        limit_count: limit
    });

    if (error) {
        console.error('Lỗi lấy tài liệu xem nhiều:', error);
        return [];
    }

    return data || [];
}

// === HÀM RENDER DANH SÁCH TÀI LIỆU XEM NHIỀU ===
export async function renderMostViewedDocuments(containerId, limit = 10) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container: ${containerId}`);
        return;
    }

    container.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';

    const docs = await getMostViewedDocuments(limit);

    if (docs.length === 0) {
        container.innerHTML = '<p class="text-muted">Chưa có dữ liệu</p>';
        return;
    }

    let html = '<div class="row g-3">';
    docs.forEach(doc => {
        html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${doc.thumbnail_url || 'https://via.placeholder.com/300x400'}" 
                         class="card-img-top" 
                         alt="${doc.title}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h6 class="card-title">${doc.title}</h6>
                        <p class="card-text small text-muted">
                            <i class="fas fa-user me-1"></i> ${doc.author_username || 'Ẩn danh'}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-secondary">
                                <i class="fas fa-eye me-1"></i> ${doc.view_count}
                            </small>
                            <a href="#" class="btn btn-sm btn-primary" 
                               onclick="viewDocument('${doc.document_id}'); return false;">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

// === HÀM XEM TÀI LIỆU (GỌI TỪ UI) ===
// Hàm này được gọi khi user click vào nút "Xem chi tiết"
window.viewDocument = async function(documentId) {
    // Tăng lượt xem
    await incrementViewCount(documentId);
    
    // Chuyển đến trang chi tiết (hoặc mở modal)
    window.location.href = `document-detail.html?id=${documentId}`;
}

// === HÀM TẢI TÀI LIỆU (GỌI TỪ UI) ===
window.downloadDocument = async function(documentId, fileUrl, fileName) {
    // Tăng lượt tải
    await incrementDownloadCount(documentId);
    
    // Tải file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
}

// === HÀM GLOBAL CHO PROFILE.JS SỬ DỤNG ===
// Export để profile.js có thể import và dùng
window.handleViewDocumentMetric = async function(documentId) {
    return await incrementViewCount(documentId);
}

window.handleDownloadDocumentMetric = async function(documentId) {
    return await incrementDownloadCount(documentId);
}

// === HÀM TOGGLE YÊU THÍCH (GỌI TỪ UI) ===
window.toggleDocumentFavorite = async function(documentId, buttonElement) {
    const result = await toggleFavorite(documentId);
    
    if (result) {
        // Cập nhật UI của nút
        if (result.action === 'added') {
            buttonElement.innerHTML = '<i class="fas fa-heart text-danger"></i> Đã thích';
            buttonElement.classList.add('active');
        } else {
            buttonElement.innerHTML = '<i class="far fa-heart"></i> Yêu thích';
            buttonElement.classList.remove('active');
        }
    }
}