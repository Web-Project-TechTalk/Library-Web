<a href="https://commons.wikimedia.org/wiki/File:HTML5_logo_resized.svg#/media/T%E1%BA%ADp_tin:HTML5_logo_resized.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/8/80/HTML5_logo_resized.svg" alt="HTML5 logo resized.svg" height="100"></a>
<a href="https://commons.wikimedia.org/wiki/File:Official_CSS_Logo.svg#/media/T%E1%BA%ADp_tin:Official_CSS_Logo.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg" alt="Official CSS Logo.svg" height="100"></a>
<a href="https://commons.wikimedia.org/wiki/File:Unofficial_JavaScript_logo_2.svg#/media/File:Unofficial_JavaScript_logo_2.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="Unofficial JavaScript logo 2.svg" height="100"></a>
<a href="https://commons.wikimedia.org/wiki/File:Bootstrap_logo.svg#/media/File:Bootstrap_logo.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" alt="Bootstrap logo.svg" height="100"></a>
<img width="100" alt="Image" src="https://github.com/user-attachments/assets/f66d746b-ec56-4e23-9b92-6d7e2fdfa406" />
<img width="100" alt="Image" src="https://github.com/user-attachments/assets/c771ee41-181d-4014-a824-aca0850d8464" />
<img width="100" alt="Image" src="https://github.com/user-attachments/assets/a4cb8591-12ee-46ed-b4e1-4105f692f79b" />

# LibKey - Nền tảng Thư Viện Số & Chia sẻ Tài liệu

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-GPLv3-blue)

**LibKey** là một dự án web thư viện số mã nguồn mở, nơi mọi người không chỉ tìm kiếm, đọc sách mà còn có thể **chia sẻ** tài liệu cá nhân để đóng góp cho cộng đồng. Dự án tập trung vào trải nghiệm người dùng hiện đại, mượt mà và khả năng tương tác cao.

## Tính năng nổi bật

* **Giao diện:**
    * Sử dụng **FullPage.js** tại trang chủ để tạo hiệu ứng cuộn trang theo từng phân đoạn (section scrolling), giúp nội dung hiển thị ấn tượng và tập trung.
* **Chia sẻ tài liệu cộng đồng:**
    * Người dùng có thể đăng tải sách, báo cáo, tài liệu học tập.
    * Hỗ trợ điền thông tin chi tiết: Tác giả, năm xuất bản, thể loại và ảnh bìa.
* **Hệ thống Tài khoản:**
    * Đăng ký / Đăng nhập / Quên mật khẩu an toàn.
    * Xác thực người dùng thời gian thực (Real-time Auth) vận hành bởi **Supabase**.
* **Quản lý Cá nhân:**
    * Trang Dashboard tổng quan.
    * Chỉnh sửa thông tin cá nhân, thay đổi mật khẩu/email.
    * Tích hợp công cụ **Cắt ảnh (Cropping)** cho Avatar và Ảnh bìa trước khi upload.
* **Giao diện tùy biến & Đa ngôn ngữ:**
    * Hỗ trợ chế độ **Sáng / Tối**.
    * Chuyển đổi ngôn ngữ linh hoạt: **Tiếng Việt / English**.
    * Giao diện tương thích mọi thiết bị (Mobile/Desktop) nhờ **Bootstrap 5**.

## 🛠 Công nghệ sử dụng

Dự án được xây dựng trên nền tảng web tiêu chuẩn (Vanilla JS) kết hợp với các thư viện mạnh mẽ:

### Frontend
* **HTML5 / CSS3 / JavaScript (ES6 Modules)**
* **[Bootstrap 5](https://getbootstrap.com/)**: Framework CSS cho giao diện Responsive.
* **[FullPage.js](https://alvarotrigo.com/fullPage/)**: Thư viện tạo hiệu ứng cuộn trang toàn màn hình (One Page Scroll).
* **[Croppie](https://foliotek.github.io/Croppie/)**: Xử lý cắt ảnh phía client.
* **FontAwesome 6**: Hệ thống icon.

### Backend & Database
* **[Supabase](https://supabase.com/)**: Nền tảng Backend-as-a-Service (BaaS) thay thế Firebase.
    * **Auth**: Quản lý phiên đăng nhập.
    * **PostgreSQL**: Cơ sở dữ liệu lưu trữ sách và người dùng.
    * **Storage**: Lưu trữ file sách PDF và hình ảnh.
 
# Hướng dẫn dành cho dev:

## Cấu hình Supabase

* Để ứng dụng hoạt động, bạn cần có dự án Supabase:

* Tạo project tại Supabase.com.

* Tạo các bảng Database (users, books...) theo thiết kế.

* Lấy URL và Anon Key trong phần Settings > API.

Cập nhật file js/supabase-client.js:

```
// js/supabase-client.js
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Khởi chạy
Do dự án sử dụng ES6 Modules (type="module" trong thẻ script), bạn không thể mở trực tiếp file HTML bằng cách click đúp. Bạn cần chạy qua một Local Server.

Khuyên dùng: Cài đặt Extension Live Server trên VS Code.

Click chuột phải vào index.html -> Chọn "Open with Live Server".

## Cấu trúc dự án

```text
LibKey/
├── assets/                 # Tài nguyên tĩnh (images, css, fonts)
├── components/             # Các thành phần tái sử dụng (sidebar.html, topbar.html)
├── js/                     # Mã nguồn JavaScript chính
│   ├── main.js             # Logic trang chủ & cấu hình FullPage.js
│   ├── auth.js             # Xử lý đăng nhập, đăng ký
│   ├── profile.js          # Logic trang cá nhân & upload
│   ├── supabase-client.js  # Cấu hình kết nối Supabase
│   └── ...
├── pages/                  # Các trang con (auth, dashboard, profile...)
├── index.html              # Trang chủ (Landing Page)
└── README.md
```

# Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng để làm giàu thêm kho sách và tính năng:

* Fork dự án này.

* Tạo nhánh tính năng mới (git checkout -b feature/AmazingFeature).

* Commit thay đổi (git commit -m 'Add some AmazingFeature').

* Push lên nhánh (git push origin feature/AmazingFeature).

* Mở một Pull Request.

# Về FullPage.js và Bản quyền
Dự án sử dụng thư viện FullPage.js để tạo trải nghiệm cuộn trang ấn tượng tại trang chủ (index.html).

Trong file js/main.js, chúng tôi khởi tạo FullPage như sau:

```
new fullpage('#fullpage', {
    licenseKey: "YOUR_OPEN_SOURCE_KEY", // Key dành cho dự án mã nguồn mở
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    // ...
});
```

Lưu ý: Dự án này sử dụng FullPage.js dưới dạng giấy phép mã nguồn mở (GPLv3) phục vụ mục đích học tập và chia sẻ phi thương mại. Nếu bạn sử dụng dự án cho mục đích thương mại, vui lòng mua bản quyền từ tác giả.

---
    Copyright © 2025 TechTalk. Dự án được phân phối dưới giấy phép GPL-3.0
