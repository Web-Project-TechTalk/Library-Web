// js/all-books.js
import { supabase } from './supabase-client.js';

const PER_PAGE = 30;
let currentPage = 1;
let totalBooks = 0;

async function loadBooks(page = 1) {
  currentPage = page;
  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  const container = document.getElementById('books-container');
  const totalEl = document.getElementById('total-count');
  const paginationEl = document.getElementById('pagination');

  container.innerHTML = `<div class="col-12 text-center py-5"><div class="spinner-border text-primary"></div></div>`;

  try {
    const { data, count, error } = await supabase
      .from('documents')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    totalBooks = count || 0;
    totalEl.textContent = `(${totalBooks} cuốn)`;

    if (!data || data.length === 0) {
      container.innerHTML = `<div class="col-12 text-center py-5 text-muted fs-4">Chưa có sách nào</div>`;
      paginationEl.innerHTML = '';
      return;
    }

    container.innerHTML = data.map(book => `
      <div class="col">
        <div class="card h-100 shadow-sm book-card">
          <a href="/pages/book.html?id=${book.document_id}&t=${Date.now()}">
            <img src="${book.thumbnail_url || '/assets/images/default.jpg'}" 
                 class="card-img-top" alt="${book.title}">
          </a>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title mb-1">
              <a href="/pages/book.html?id=${book.document_id}&t=${Date.now()}" 
                 class="text-decoration-none">
                ${book.title}
              </a>
            </h6>
            <small class="text-muted">${book.author_name || 'Ẩn danh'}</small>
            <div class="mt-auto small text-secondary">
              <i class="fas fa-eye me-1"></i>${book.view_count || 0} lượt
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Phân trang
    const totalPages = Math.ceil(totalBooks / PER_PAGE);
    let pag = '';
    for (let i = 1; i <= totalPages; i++) {
      pag += `<button class="btn ${i === page ? 'btn-primary' : 'btn-outline-primary'} mx-1"
                     onclick="loadBooks(${i})">${i}</button>`;
    }
    paginationEl.innerHTML = totalPages > 1 ? pag : '';

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="col-12 text-danger text-center p-5">
        <h5>Không load được dữ liệu</h5>
        <p>${err.message}</p>
        <small>Vui lòng kiểm tra lại dữ liệu mạng</small>
      </div>`;
  }
}
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab === "category") {
        // mở tab Thể Loại
        const trigger = document.querySelector('#tab-category-tab');
        bootstrap.Tab.getOrCreateInstance(trigger).show();
    }
});


// Global function để onclick hoạt động
window.loadBooks = loadBooks;
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const closeBtn  = document.getElementById('sidebarCloseBtn');

    toggleBtn?.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-closed');
    });
    closeBtn?.addEventListener('click', () => {
        document.body.classList.add('sidebar-closed');
    });

    // Mobile: vào trang là tự tắt sidebar
    if (window.innerWidth < 992) {
        document.body.classList.add('sidebar-closed');
    }
});
// Load lần đầu
document.addEventListener('DOMContentLoaded', () => loadBooks(1));