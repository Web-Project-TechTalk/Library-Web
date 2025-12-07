// Tên file: /js/app-ui-full.js (File đã được hợp nhất)

// === 1. HÀM ÁP DỤNG SÁNG/TỐI ===
function applyTheme(isDarkMode) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (isDarkMode) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// === 2. BỘ TỪ ĐIỂN (Đầy đủ nhất) ===
const translations = {
    vi: {
        // Topbar & Menu (Từ profile.js)
        searchPlaceholder: 'Tìm kiếm sách...',
        themeToggle: ' Sáng / Tối',
        logout: 'Đăng xuất',
        profile: 'Trang cá nhân',
        // Profile Tabs (Từ profile.js)
        infoTab: 'Thông tin',
        uploadTab: 'Tải lên',
        activityTab: 'Hoạt động',
        favoritesTab: 'Yêu thích',

        // === Sidebar (Từ sidebar.html) ===
        home: 'Trang chủ',
        follow: 'Theo dõi',
        readingHistory: 'Lịch sử đọc',
        titles: 'Tiêu đề',
        allBooks: 'Tất cả sách',
        advSearch: 'Tìm kiếm nâng cao',
        recentAdd: 'Mới thêm gần đây',
        random: 'Ngẫu nhiên',
        lib: 'Thư viện',
        rules: 'Quy tắc',
        instructions: 'Hướng dẫn',
        aboutUs: 'Về chúng tôi',
        contact: 'Liên hệ',
        advertise: 'Quảng cáo',

        // === book.html (Page Content) ===
        bookTitle: 'Sách',
        readBtn: 'Đọc',
        downloadBtn: 'Tải về',
        favoriteBtn: 'Yêu thích',
        detailInfoTitle: 'Thông tin chi tiết',
        loadingDescription: 'Đang tải mô tả...',
        reviewsSummaryTitle: 'Đánh giá về sách',
        avgRatingLabel: 'đánh giá',
        userRatingPrompt: 'Bạn đánh giá cuốn sách này thế nào?',
        notRatedDisplay: 'Chưa đánh giá',
        writeCommentTitle: 'Viết bình luận của bạn',
        commentPlaceholder: 'Chia sẻ cảm nghĩ của bạn về cuốn sách...',
        submitCommentBtn: 'Gửi bình luận',
        readerCommentsTitle: 'Bình luận từ độc giả',

        // === reviews.js (Internal/Alerts & Time) ===
        postedDaysAgo: 'Đã đăng {n} ngày trước',
        postedWeeksAgo: 'Đã đăng {n} tuần trước',
        repliedDaysAgo: 'Đã trả lời {n} ngày trước',
        notRated: 'Chưa đánh giá',
        ratingLabel1: 'Rất tệ',
        ratingLabel2: 'Tệ',
        ratingLabel3: 'Trung bình',
        ratingLabel4: 'Tốt',
        ratingLabel5: 'Rất tuyệt vời',
        commentLengthAlert: 'Bình luận cần ít nhất 5 ký tự nhé!',
        ratingMissingAlert: 'Bạn vui lòng chọn số sao đánh giá trước khi gửi nhé!',
        justPosted: 'Vừa đăng',
        justReplied: 'Vừa trả lời',
        likeBtnText: 'Thích',
        replyBtnText: 'Trả lời',
        repNameBadge: '@',
        repNameText: 'Đang trả lời...',
        replyPlaceholder: 'Viết trả lời...',
        sendBtn: 'Gửi',
        replyLengthAlert: 'Nội dung trả lời quá ngắn.',

        // === advance-search.html ===
        advSearchTitle: 'Tìm kiếm Nâng cao',
        searchLabel: 'Tìm kiếm',
        showFilters: 'Hiện bộ lọc',
        hideFilters: 'Ẩn bộ lọc',
        filtersTitle: 'Bộ lọc & Sắp xếp',
        filterHint: 'Ấn "Hiện bộ lọc" để chọn thể loại và sắp xếp ở đây.',
        filterHintSmall: 'Trường tìm kiếm, Sắp xếp theo.',
        booksSectionTitle: 'Sách',
        viewToggleHint: 'Thêm 2 nút ở đây để đổi dạng xem liệt kê sách theo dạng lưới hoặc hàng + mô tả',
        paginationHint: '1 2 3 ... 100',
        sortPlaceholder: 'Sắp xếp theo...',
        categoryPlaceholder: 'Chọn thể loại...',
        resultsTitle: 'Kết quả Tìm kiếm Sách', // KHÓA MỚI

        // KHÓA LỌC THEO TRƯỜNG
        searchFieldAll: 'Tìm kiếm: Tên sách & Tác giả',
        searchFieldTitle: 'Tìm kiếm: Tên sách',
        searchFieldAuthor: 'Tìm kiếm: Tên tác giả',

        // KHÓA SẮP XẾP
        sortByDate: 'Ngày thêm (Mới nhất)',
        sortByViews: 'Lượt xem (Nhiều nhất)',
        sortByRating: 'Đánh giá (Cao nhất)',
        sortByTitleAsc: 'Tên sách (A-Z)',

        // --- Bộ lọc Tag/Thể loại (tag-select-adv) ---
        tagPlaceholder: 'Tag-Thể loại',
        tagLit: 'Văn học',
        tagSciTech: 'Khoa học & Công nghệ',
        tagHistory: 'Lịch sử',
        tagBusiness: 'Kinh doanh & Kinh tế',
        tagKids: 'Thiếu nhi',
        tagSelfHelp: 'Tự lực & Phát triển bản thân',
        tagComics: 'Truyện tranh (Manga/Comic)',
        tagCooking: 'Nấu ăn & Ẩm thực',
        tagArt: 'Nghệ thuật & Thiết kế',
        tagTextbook: 'Sách giáo khoa',

        // --- Bộ lọc Ngôn ngữ (language-select-adv) ---
        langPlaceholder: 'Ngôn ngữ',
        langVi: 'Tiếng Việt',
        langEn: 'Tiếng Anh',
        langZh: 'Tiếng Trung',
        langFr: 'Tiếng Pháp',
        langDe: 'Tiếng Đức',
        langJa: 'Tiếng Nhật',
        langKo: 'Tiếng Hàn',
        langEs: 'Tiếng Tây Ban Nha',
        langRu: 'Tiếng Nga',
        langPt: 'Tiếng Bồ Đào Nha',

        // --- Bộ lọc Năm PH ---
        yearLabel: 'Năm PH',

        // --- Bộ lọc Đánh giá (rating-select-adv) ---
        ratingPlaceholder: 'Đánh giá',

        // KHÓA PHÂN TRANG & THÔNG BÁO
        paginationPrev: 'Trước',
        paginationNext: 'Sau',
        loadingResults: 'Đang tải kết quả...',
        noResultsFound: 'Không tìm thấy sách nào phù hợp.',
        errorLoadingBooks: 'Lỗi tải sách:',

        // === recently-added.html ===
        recentlyAddedTitle: 'Sách mới thêm',
        latestBooksTitle: 'Danh sách Sách mới',

        // --- CÁC KHÓA MỚI CHO TRANG RANDOM.HTML ---
        randomTitle: 'Sách Ngẫu nhiên',
        selectQtyLabel: 'Chọn số lượng sách',
        bookCount1: '1 cuốn sách',
        bookCount5: '5 cuốn sách',
        bookCount10: '10 cuốn sách',
        bookCount20: '20 cuốn sách',
        fetchRandomBtn: 'Tìm sách Ngẫu nhiên',
        gridViewTitle: 'Dạng Lưới',
        listViewTitle: 'Dạng Danh sách',
        resultsTitleRandom: 'Kết quả Ngẫu nhiên', // Đổi tên khóa để tránh trùng với resultsTitle của advance-search
        randomInitialHint: 'Chọn số lượng sách và nhấn **"Tìm sách Ngẫu nhiên"** để bắt đầu khám phá!',
        randomSearching: 'Đang tải sách ngẫu nhiên...',
        randomFetchBtnText: 'Tìm sách Ngẫu nhiên',
        randomNoResults: 'Không tìm thấy sách ngẫu nhiên nào. Hãy thử lại!',

        // --- instructions.html ---
        faqTitle: 'Hướng Dẫn Sử Dụng & Câu Hỏi Thường Gặp (FAQ)',
        faqSubtitle: 'Tìm kiếm câu trả lời cho các thắc mắc của bạn về hệ thống thư viện số.',

        // MỤC 1: Đăng ký tài khoản
        faq1Title: '🔍 1. Làm thế nào để đăng ký tài khoản của hệ thống thư viện số lib?',
        faq1StepsTitle: 'Các bước đăng ký cơ bản:',
        faq1Step1: 'Nhấp vào nút đăng ký/đăng ký ở góc trên cùng bên phải ở giao diện chính của hệ thống, cạnh bộ chuyển đổi ngôn ngữ.',
        faq1Step2: 'Ở giao diện libkey sau khi đã nhấp vào nút đăng nhập/đăng ký. Nhấp vào mục đăng ký ở ngay phía dưới phía bên phải dòng libkey.',
        faq1Step3: 'Điền thông tin vào tất các mục ở phần đăng ký rồi nhấp vào nút Tạo tài khoản phía dưới.',
        faq1Step4: 'Hệ thống thư viện lib sẽ gửi qua cho bạn 1 email để xác thực và khởi động tài khoản. Sau khi xác thực xong, đăng nhập lại 1 lần nữa để có thể đọc sách tại hệ thống thư viện số lib.',

        // MỤC 2: Sách Mới Thêm
        faq2Title: '📕 2. Làm sao tôi biết được sách nào mới được thêm vào?',
        faq2StepsTitle: 'Các bước xem sách mới nhất:',
        faq2Step1: 'Truy cập vào trang cá nhân của bạn.',
        faq2Step2: 'Chọn mục "Sách Mới Thêm" (Recently Added) ở sidebar bên trái. Tại đó, hệ thống sẽ tự động hiển thị danh sách sách được sắp xếp theo thứ tự ngày tải lên mới nhất.',

        // MỤC 3: Chuyển đổi Sáng/Tối
        faq3Title: '🎨 3. Cách chuyển đổi giữa chế độ Sáng và Tối?',
        faq3StepsTitle: 'Các bước chuyển đổi giao diện:',
        faq3Step1: 'Tìm biểu tượng Mặt Trời ☀️ hoặc Mặt Trăng 🌙 trên Top Bar (thanh điều hướng trên cùng) rồi nhấp chuột vào biểu tượng đó.',
        faq3Step2: 'Giao diện sẽ chuyển đổi ngay lập tức giữa chế độ Sáng (Light) và Tối (Dark).',
        faq3Step3: 'Hệ thống sẽ tự động lưu lựa chọn này cho các lần truy cập sau.',
        faq3Step4: 'Trường hợp bạn đang ở trang cá nhân thì bạn có thể tìm thấy nút biểu tượng Mặt Trời ☀️ hoặc Mặt Trăng 🌙 này ở hình đại diện của bạn sau khi nhấp vào.',

        // MỤC 4: Sắp xếp sách
        faq4Title: '🔀 4. Tôi có thể sắp xếp sách theo những tiêu chí nào?',
        faq4StepsTitle: 'Các bước thay đổi sắp xếp:',
        faq4Step1: 'Truy cập trang Tìm kiếm Nâng cao rồi nhấp vào nút hiện bộ lọc ngay dưới thanh tìm kiếm.',
        faq4Step2: 'Nhấn vào mục "Sắp xếp theo...".',
        faq4Step3: 'Chọn một trong các tiêu chí sau:',
        faq4Sort1: 'Ngày thêm (Mới nhất)',
        faq4Sort2: 'Lượt xem (Nhiều nhất)',
        faq4Sort3: 'Đánh giá (Cao nhất)',
        faq4Sort4: 'Tên sách (A-Z)',
        faq4Step4: 'Hệ thống sẽ tải lại kết quả theo thứ tự mới.',

        // MỤC 5: Lọc theo Năm Phát hành và Đánh giá
        faq5Title: '🌪️ 5. Lọc theo Năm Phát hành và Đánh giá hoạt động thế nào?',
        faq5StepsTitleYear: 'Các bước lọc Năm Phát hành:',
        faq5StepYear1: 'Nhấn "Hiện bộ lọc" trong trang Tìm kiếm Nâng cao.',
        faq5StepYear2: 'Nhập năm phát hành mong muốn (ví dụ: 2023) vào ô "Năm PH".',
        faq5StepYear3: 'Kết quả sẽ được lọc theo năm bạn nhập.',
        faq5StepsTitleRating: 'Các bước lọc Đánh giá:',
        faq5StepRating1: 'Mở ô chọn "Đánh giá".',
        faq5StepRating2: 'Chọn mức sao mong muốn (ví dụ: 7 ⭐).',
        faq5StepRating3: 'Hệ thống sẽ chỉ hiển thị các sách có điểm đánh giá bằng hoặc cao hơn mức bạn chọn.',

        // MỤC 6: Thêm sách mới
        faq6Title: '🪶 6. Tôi có thể thêm sách mới không?',
        faq6StepsTitle: 'Các bước đóng góp thêm vào sách mới cho hệ thống thư viện số lib:',
        faq6Step1: 'Vào trang thông tin cá nhân của bạn và chọn mục tải lên.',
        faq6Step2: 'Điền tất cả thông tin về sách cũng như tải lên ảnh bìa, file sách của bạn rồi nhấp vào nút Tải lên Tài liệu.',
        faq6Step3: 'Lưu ý: Nội dung file sách chỉ có thể tải lên hợp lệ với các định dạng PDF, DOC, DOCX, TXT, EPUB, MOBI.',
        faq6Step4: 'Hệ thống thư viện số lib sẽ xem xét qua đóng góp của bạn và thông báo lại với bạn trong thời gian sớm nhất có thể.',

        // MỤC 7: Yêu cầu Hỗ trợ Chung
        faq7Title: '❓ 7. Không có bất kỳ trường hợp nào mà bạn gặp phải?',
        faq7Description: 'Nếu bạn đang gặp phải một vấn đề không được liệt kê ở trên, hoặc cần hỗ trợ kỹ thuật chuyên sâu hơn, vui lòng gửi yêu cầu đến đội ngũ hỗ trợ của chúng tôi.',
        faq7Button: 'Gửi Yêu cầu Hỗ trợ'
    },
    en: {
        // Topbar & Menu (Từ profile.js)
        searchPlaceholder: 'Search books...',
        themeToggle: ' Light / Dark',
        logout: 'Sign out',
        profile: 'Profile Page',
        // Profile Tabs (Từ profile.js)
        infoTab: 'Info',
        uploadTab: 'Uploads',
        activityTab: 'Activity',
        favoritesTab: 'Favorites',

        // === Sidebar (Từ sidebar.html) ===
        home: 'Home',
        follow: 'Follow',
        readingHistory: 'Reading history',
        titles: 'Titles',
        allBooks: 'All Books',
        advSearch: 'Advance search',
        recentAdd: 'Recently Added',
        random: 'Random',
        lib: 'Library',
        rules: 'Rules',
        instructions: 'Instructions',
        aboutUs: 'About us',
        contact: 'Contact',
        advertise: 'Advertise',

        // === book.html (Page Content) ===
        bookTitle: 'Book',
        readBtn: 'Read',
        downloadBtn: 'Download',
        favoriteBtn: 'Favorite',
        detailInfoTitle: 'Details',
        loadingDescription: 'Loading description...',
        reviewsSummaryTitle: 'Book Reviews',
        avgRatingLabel: 'reviews',
        userRatingPrompt: 'How would you rate this book?',
        notRatedDisplay: 'Not rated yet',
        writeCommentTitle: 'Write Your Comment',
        commentPlaceholder: 'Share your thoughts about the book...',
        submitCommentBtn: 'Post Comment',
        readerCommentsTitle: 'Reader Comments',

        // === reviews.js (Internal/Alerts & Time) ===
        postedDaysAgo: 'Posted {n} days ago',
        postedWeeksAgo: 'Posted {n} weeks ago',
        repliedDaysAgo: 'Replied {n} days ago',
        notRated: 'Not rated yet',
        ratingLabel1: 'Terrible',
        ratingLabel2: 'Bad',
        ratingLabel3: 'Average',
        ratingLabel4: 'Good',
        ratingLabel5: 'Excellent',
        commentLengthAlert: 'Comment requires at least 5 characters!',
        ratingMissingAlert: 'Please select a star rating before posting!',
        justPosted: 'Just posted',
        justReplied: 'Just replied',
        likeBtnText: 'Like',
        replyBtnText: 'Reply',
        repNameBadge: '@',
        repNameText: 'Replying...',
        replyPlaceholder: 'Write a reply...',
        sendBtn: 'Send',
        replyLengthAlert: 'Reply content is too short.',

        // === advance-search.html ===
        advSearchTitle: 'Advanced Search',
        searchLabel: 'Search',
        showFilters: 'Show filters',
        hideFilters: 'Hide filters',
        filtersTitle: 'Filters & Sorting',
        filterHint: 'Click "Show filters" to select categories and sorting options here.',
        filterHintSmall: 'Search field, Sort by.',
        booksSectionTitle: 'Books',
        viewToggleHint: 'Add 2 buttons here to switch between book listing views (grid or row + description)',
        paginationHint: '1 2 3 ... 100',
        sortPlaceholder: 'Sort by...',
        categoryPlaceholder: 'Select category...',
        resultsTitle: 'Search Results',

        // KHÓA LỌC THEO TRƯỜNG
        searchFieldAll: 'Search: Title & Author',
        searchFieldTitle: 'Search: Title only',
        searchFieldAuthor: 'Search: Author only',

        // KHÓA SẮP XẾP
        sortByDate: 'Date Added (Newest)',
        sortByViews: 'Views (Most)',
        sortByRating: 'Rating (Highest)',
        sortByTitleAsc: 'Title (A-Z)',

        // --- Bộ lọc Tag/Thể loại (tag-select-adv) ---
        tagPlaceholder: 'Tag-Category',
        tagLit: 'Literature',
        tagSciTech: 'Science & Technology',
        tagHistory: 'History',
        tagBusiness: 'Business & Economics',
        tagKids: "Children's Books",
        tagSelfHelp: 'Self-Help & Personal Dev.',
        tagComics: 'Comics (Manga/Comic)',
        tagCooking: 'Cooking & Food',
        tagArt: 'Art & Design',
        tagTextbook: 'Textbooks',

        // --- Bộ lọc Ngôn ngữ (language-select-adv) ---
        langPlaceholder: 'Language',
        langVi: 'Vietnamese',
        langEn: 'English',
        langZh: 'Chinese',
        langFr: 'French',
        langDe: 'German',
        langJa: 'Japanese',
        langKo: 'Korean',
        langEs: 'Spanish',
        langRu: 'Russian',
        langPt: 'Portuguese',

        // --- Bộ lọc Năm PH ---
        yearLabel: 'Pub. Year',

        // --- Bộ lọc Đánh giá (rating-select-adv) ---
        ratingPlaceholder: 'Rating',

        // KHÓA PHÂN TRANG & THÔNG BÁO
        paginationPrev: 'Previous',
        paginationNext: 'Next',
        loadingResults: 'Loading results...',
        noResultsFound: 'No matching books found.',
        errorLoadingBooks: 'Error loading books:',

        // === recently-added.html ===
        recentlyAddedTitle: 'Recently Added Books',
        latestBooksTitle: 'New Books',

        // --- CÁC KHÓA MỚI CHO TRANG RANDOM.HTML ---
        randomTitle: 'Random Books',
        selectQtyLabel: 'Select book quantity',
        bookCount1: '1 book',
        bookCount5: '5 books',
        bookCount10: '10 books',
        bookCount20: '20 books',
        fetchRandomBtn: 'Find Random Books',
        gridViewTitle: 'Grid View',
        listViewTitle: 'List View',
        resultsTitleRandom: 'Random Results', // Đổi tên khóa để tránh trùng với resultsTitle của advance-search
        randomInitialHint: 'Select the number of books and click **"Find Random Books"** to start exploring!',
        randomSearching: 'Loading random books...',
        randomFetchBtnText: 'Find Random Books',
        randomNoResults: 'No random books found. Please try again!',

        // --- instructions.html ---
        faqTitle: 'Instructions & Frequently Asked Questions (FAQ)',
        faqSubtitle: 'Find answers to your questions about the lib digital library system.',

        // MỤC 1: Đăng ký tài khoản
        faq1Title: '🔍 1. How to register an account for the lib digital library system?',
        faq1StepsTitle: 'Basic registration steps:',
        faq1Step1: 'Click the login/signup button in the upper right corner of the main interface, next to the language switcher.',
        faq1Step2: 'In the libkey interface after clicking the login/signup button, click the "Register" link below and to the right of the libkey line.',
        faq1Step3: 'Fill in all fields in the registration form and click the "Create Account" button at the bottom.',
        faq1Step4: 'The lib library system will send you an email to verify and activate your account. After verification, log in again to be able to read books in the lib digital library system.',

        // MỤC 2: Sách Mới Thêm
        faq2Title: '📕 2. How do I find out which books have been newly added?',
        faq2StepsTitle: 'Steps to view the latest books:',
        faq2Step1: 'Go to your personal profile page.',
        faq2Step2: 'Select the "Recently Added" section on the left sidebar. There, the system will automatically display a list of books sorted by the most recent upload date.',

        // MỤC 3: Chuyển đổi Sáng/Tối
        faq3Title: '🎨 3. How to switch between Light and Dark mode?',
        faq3StepsTitle: 'Steps to switch the interface:',
        faq3Step1: 'Find the Sun ☀️ or Moon 🌙 icon on the Top Bar (top navigation bar) and click on it.',
        faq3Step2: 'The interface will switch instantly between Light and Dark mode.',
        faq3Step3: 'The system will automatically save this choice for subsequent visits.',
        faq3Step4: 'If you are on your profile page, you can find this Sun ☀️ or Moon 🌙 button next to your profile picture after clicking on it.',

        // MỤC 4: Sắp xếp sách
        faq4Title: '🔀 4. What criteria can I use to sort books?',
        faq4StepsTitle: 'Steps to change sorting:',
        faq4Step1: 'Go to the Advanced Search page and click the "Show filters" button right below the search bar.',
        faq4Step2: 'Click on the "Sort by..." section.',
        faq4Step3: 'Select one of the following criteria:',
        faq4Sort1: 'Date Added (Newest)',
        faq4Sort2: 'View Count (Most Viewed)',
        faq4Sort3: 'Rating (Highest)',
        faq4Sort4: 'Title (A-Z)',
        faq4Step4: 'The system will reload the results with the new sorting order.',

        // MỤC 5: Lọc theo Năm Phát hành và Đánh giá
        faq5Title: '🌪️ 5. How do filtering by Release Year and Rating work?',
        faq5StepsTitleYear: 'Steps for filtering by Release Year:',
        faq5StepYear1: 'Click "Show filters" on the Advanced Search page.',
        faq5StepYear2: 'Enter the desired release year (e.g., 2023) into the "Release Year" box.',
        faq5StepYear3: 'Results will be filtered according to the year you entered.',
        faq5StepsTitleRating: 'Steps for filtering by Minimum Rating:',
        faq5StepRating1: 'Open the "Rating" selection box.',
        faq5StepRating2: 'Select the desired star level (e.g., 7 ⭐).',
        faq5StepRating3: 'The system will only display books with a rating equal to or higher than the selected level.',

        // MỤC 6: Thêm sách mới
        faq6Title: '🪶 6. Can I add new books?',
        faq6StepsTitle: 'Steps to contribute new books to the lib digital library system:',
        faq6Step1: 'Go to your personal information page and select the "Upload" section.',
        faq6Step2: 'Fill in all information about the book, upload the cover image and your book file, and click the "Upload Document" button.',
        faq6Step3: 'Note: Book file content can only be uploaded if it is in PDF, DOC, DOCX, TXT, EPUB, or MOBI format.',
        faq6Step4: 'The lib digital library system will review your contribution and notify you as soon as possible.',

        // MỤC 7: Yêu cầu Hỗ trợ Chung
        faq7Title: '❓ 7. Are you experiencing an unlisted issue?',
        faq7Description: 'If you are facing an issue not listed above, or require more specialized technical support, please submit a request to our support team.',
        faq7Button: 'Submit Support Request'
    }
};

// === 3. HÀM CẬP NHẬT NGÔN NGỮ (Đầy đủ nhất) ===
function updateLanguageUI(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang; // Cập nhật <html lang="">
    const langData = translations[lang];

    // Cập nhật tất cả các element có data-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (langData[key]) {
            // === LOGIC MỚI CHO CÁC CHUỖI ĐẶC BIỆT (Từ app-ui.js) ===
            if (key === 'avgRatingLabel') {
                // Xử lý chuỗi đánh giá trung bình: (128) đánh giá / (128) reviews
                // Lấy số từ data-rating-count hoặc từ text cũ
                const number = el.dataset.ratingCount || el.textContent.match(/\d+/)?.[0];
                if (number) {
                    el.textContent = `(${number}) ${langData[key]}`;
                    el.dataset.ratingCount = number; // Lưu lại số để lần sau dịch
                } else {
                    el.textContent = langData[key];
                }
            }
            else if (['postedDaysAgo', 'postedWeeksAgo', 'repliedDaysAgo'].includes(key)) {
                // Xử lý chuỗi thời gian: Đã đăng 2 ngày trước
                // Lấy số từ text cũ
                const match = el.textContent.match(/\d+/);
                const number = match ? match[0] : '...';

                // Thay thế {n} bằng số
                el.textContent = langData[key].replace('{n}', number);
            }
            // === KẾT THÚC LOGIC CHUỖI ĐẶC BIỆT ===

            // Xử lý xuống dòng cho <p> (nếu có \n)
            else if (el.tagName === 'P' && langData[key].includes('\n')) {
                el.innerHTML = langData[key].replace(/\n/g, '<br>');
            } else {
                el.textContent = langData[key];
            }
        }
    });

    // Dịch PLACEHOLDER
    document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
        const key = el.dataset.langKeyPlaceholder;
        if (langData[key]) {
            el.placeholder = langData[key];
        }
    });

    // DỊCH TITLE (MỚI THÊM để dịch title của các nút icon)
    document.querySelectorAll('[data-lang-key-title]').forEach(el => {
        const key = el.dataset.langKeyTitle;
        if (langData[key]) {
            el.title = langData[key];
        }
    });

    // Cập nhật riêng cho các element đặc biệt (nếu cần)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = langData.searchPlaceholder;
    }

    // Cập nhật text của nút Lang Toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.innerHTML = `<i class="fas fa-globe me-2"></i> ${lang === 'vi' ? 'English' : 'Tiếng Việt'}`;
    }

    // Cập nhật text của nút Theme Toggle (quan trọng)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Giữ icon, chỉ thay text
        const icon = themeToggle.querySelector('i');
        // Phải đảm bảo icon tồn tại, vì icon được thêm khi applyTheme() chạy
        if (icon) {
            themeToggle.innerHTML = icon.outerHTML + langData.themeToggle;
        } else {
            // Trường hợp icon chưa kịp load (hiếm), chỉ gán text
            themeToggle.textContent = langData.themeToggle;
        }
    }
}

// Thêm hàm lấy bản dịch cho reviews.js và các module khác
function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'vi';
    return translations[lang] ? translations[lang][key] : key;
}

// === 4. LOGIC CHẠY NGAY KHI TẢI SCRIPT ===
// (Đọc cài đặt và áp dụng ngay lập tức)

let currentLang = localStorage.getItem('language') || 'vi';
let isDarkMode = (localStorage.getItem('theme') === 'dark') ||
    (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Áp dụng theme và ngôn ngữ ngay lập tức
// (Phải chạy sau khi các hàm đã được định nghĩa)
applyTheme(isDarkMode);
updateLanguageUI(currentLang);

// *** QUAN TRỌNG: Expose hàm dịch cho các script khác (reviews.js) ***
window.getTranslation = getTranslation;
window.translations = translations; // Expose full object for easier access

// === 5. HÀM TẢI COMPONENT (Giữ nguyên) ===
/**
 * Hàm tải một component HTML vào một placeholder
 */
async function loadComponent(elementId, url, callback) {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) {
        return;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        placeholder.innerHTML = html;
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error(`Error loading component ${url}:`, error);
        placeholder.innerHTML = `<p class="text-danger p-3">Lỗi tải component: ${url}</p>`;
    }
}

// === 6. HÀM GÁN SỰ KIỆN SAU KHI TẢI COMPONENT (Đầy đủ nhất) ===
/**
 * Gán sự kiện cho Sidebar, Search và các nút Topbar.
 * Hàm này phải được gọi SAU KHI component đã tải xong.
 */
function initializeDynamicElementsLogic() {
    // --- Lấy các phần tử ---
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchFormWrapper = document.getElementById('searchFormWrapper');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const topbarRightSection = document.getElementById('topbar-right-section');

    const DESKTOP_BREAKPOINT = 992;

    // --- Logic Đóng/Mở Sidebar ---
    const hideSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        body.classList.remove('sidebar-is-active');
    };
    const toggleSidebar = () => {
        if (!sidebar) return;
        if (sidebar.classList.contains('active')) {
            hideSidebar();
        } else {
            sidebar.classList.add('active');
            body.classList.add('sidebar-is-active');
            if (window.innerWidth < DESKTOP_BREAKPOINT && sidebarOverlay) {
                sidebarOverlay.classList.add('active');
            }
        }
    };
    // Khởi tạo trạng thái sidebar cho Desktop
    if (window.innerWidth >= DESKTOP_BREAKPOINT && sidebar) {
        sidebar.classList.add('active');
        body.classList.add('sidebar-is-active');
    }
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', hideSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', hideSidebar);

    // --- Logic Đóng/Mở Search ---
    const showSearch = () => {
        if (searchOverlay) searchOverlay.classList.add('active');
        if (searchFormWrapper) searchFormWrapper.classList.add('active');
        if (body) body.classList.add('search-active');
        if (searchInput && typeof bootstrap !== 'undefined' && bootstrap.Dropdown) { // Kiểm tra Bootstrap
            const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(searchInput);
            dropdownInstance.show();
        }
    };
    const hideSearch = () => {
        if (searchOverlay) searchOverlay.classList.remove('active');
        if (searchFormWrapper) searchFormWrapper.classList.remove('active');
        if (body) body.classList.remove('search-active');
        if (searchInput && typeof bootstrap !== 'undefined' && bootstrap.Dropdown) { // Kiểm tra Bootstrap
            const dropdownInstance = bootstrap.Dropdown.getInstance(searchInput);
            if (dropdownInstance) { dropdownInstance.hide(); }
        }
    };
    if (searchInput) searchInput.addEventListener('focus', showSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', hideSearch);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            hideSearch();
        }
    });
    if (mobileSearchIcon) mobileSearchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showSearch();
        if (searchInput) searchInput.focus();
    });
    if (topbarRightSection) topbarRightSection.addEventListener('click', (e) => {
        if (e.target === topbarRightSection && body && body.classList.contains('search-active')) {
            hideSearch();
        }
    });

    // --- GÁN SỰ KIỆN CHO CÁC NÚT TOPBAR ---
    // (Bị thiếu trong app-ui.js ban đầu, đã được lấy từ app-ui1.js)

    // 1. Nút Đổi Ngôn ngữ
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Đọc lại từ localStorage để chắc chắn
            let currentLang = (localStorage.getItem('language') || 'vi') === 'vi' ? 'en' : 'vi';
            localStorage.setItem('language', currentLang);

            // Gọi hàm updateLanguageUI (đã được định nghĩa ở ngoài)
            updateLanguageUI(currentLang);
            console.log('Đã đổi ngôn ngữ sang:', currentLang);

            // *** QUAN TRỌNG: Kích hoạt lại logic cần dịch trong reviews.js sau khi đổi ngôn ngữ ***
            if (typeof window.reInitializeReviewsLogic === 'function') {
                window.reInitializeReviewsLogic();
            }
        });
    }

    // 2. Nút Đổi Sáng/Tối
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Đọc lại từ body
            let isDarkMode = !document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

            // Gọi hàm applyTheme (đã được định nghĩa ở ngoài)
            applyTheme(isDarkMode);
            // Gọi lại hàm dịch để cập nhật text "Sáng / Tối"
            updateLanguageUI(localStorage.getItem('language') || 'vi');
            console.log('Đã đổi theme sang:', isDarkMode ? 'dark' : 'light');
        });
    }

    // 3. Nút Đăng xuất
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            //
            // === LOGIC ĐĂNG XUẤT CỦA BẠN SẼ Ở ĐÂY ===
            //
            console.log('Nút Đăng xuất đã được bấm!');
        });
    }
}

// Khóa dùng để lưu trạng thái vào sessionStorage
const COLLAPSE_STATE_KEY = 'sidebarCollapseState';

/**
 * Hàm 1: Highlight mục sidebar tương ứng với trang hiện tại (Giữ nguyên)
 */
function highlightSidebarLink() {
    // Lấy đường dẫn hiện tại và chuẩn hóa (ví dụ: '/pages/dashboard.html')
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';

    // Lấy tất cả các liên kết trong sidebar
    const sidebarLinks = document.querySelectorAll('#sidebar .components a');

    sidebarLinks.forEach(link => {
        const linkHref = (link.getAttribute('href') || '').replace(/\/$/, '');

        // Kiểm tra nếu đường dẫn khớp với href của liên kết
        if (linkHref && currentPath.endsWith(linkHref)) {

            // 1. Thêm class highlight vào thẻ <li> cha
            let listItem = link.closest('li');
            if (listItem) {
                listItem.classList.add('active-orange');
            }

            // 2. Mở submenu cha nếu link là con (Đảm bảo trang active luôn hiển thị)
            let parentSubmenu = link.closest('.collapse');
            if (parentSubmenu) {
                // Thêm class 'show' để mở
                parentSubmenu.classList.add('show');
                // Cập nhật thuộc tính của nút toggle cha
                parentSubmenu.previousElementSibling.setAttribute('aria-expanded', 'true');
            }
        }
    });
}


/**
 * Hàm 2: Lưu trạng thái mở/đóng của các submenu vào sessionStorage (Giữ nguyên)
 */
function saveSidebarCollapseState() {
    const openSubmenus = [];
    // Lấy tất cả các submenu có class 'collapse'
    const submenus = document.querySelectorAll('.sidebar .collapse');

    submenus.forEach(submenu => {
        // Nếu submenu đang mở (có class 'show')
        if (submenu.classList.contains('show') && submenu.id) {
            // Lưu ID của submenu đó
            openSubmenus.push(submenu.id);
        }
    });

    sessionStorage.setItem(COLLAPSE_STATE_KEY, JSON.stringify(openSubmenus));
}

/**
 * Hàm 3: Khôi phục trạng thái mở/đóng của các submenu từ sessionStorage khi tải trang (Giữ nguyên)
 */
function restoreSidebarCollapseState() {
    const savedState = sessionStorage.getItem(COLLAPSE_STATE_KEY);

    if (savedState) {
        try {
            const openSubmenus = JSON.parse(savedState);

            openSubmenus.forEach(id => {
                const submenu = document.getElementById(id);
                if (submenu) {
                    // Thêm class 'show' để mở submenu khi tải trang
                    submenu.classList.add('show');
                    // Cập nhật aria-expanded cho thẻ a cha
                    const parentToggle = submenu.previousElementSibling;
                    if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                        parentToggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        } catch (e) {
            console.error("Error parsing sidebar collapse state:", e);
        }
    }
}

// === 7. LOGIC CHẠY KHI DOM TẢI XONG (Giữ nguyên, chỉ loại bỏ code thừa) ===
document.addEventListener('DOMContentLoaded', () => {

    // Tải topbar trước
    loadComponent('topbar-placeholder', '/components/topbar.html', () => {
        // Tải sidebar sau khi topbar tải xong
        loadComponent('sidebar-placeholder', '/components/sidebar.html', () => {

            // 1. Khôi phục trạng thái mở/đóng đã lưu từ lần chuyển trang trước
            restoreSidebarCollapseState();

            // 2. Highlight link đang active và đảm bảo submenu cha được mở
            highlightSidebarLink();

            // 3. Đăng ký listener để tự động lưu trạng thái MỚI nhất mỗi khi submenu mở/đóng
            const submenus = document.querySelectorAll('.sidebar .collapse');
            submenus.forEach(submenu => {
                // Lắng nghe sự kiện của Bootstrap khi submenu mở và đóng
                submenu.addEventListener('shown.bs.collapse', saveSidebarCollapseState);
                submenu.addEventListener('hidden.bs.collapse', saveSidebarCollapseState);
            });

            // GÁN TẤT CẢ CÁC SỰ KIỆN KHÁC CỦA TOPBAR VÀ SIDEBAR
            initializeDynamicElementsLogic();

            // Cập nhật lại UI (quan trọng vì component mới được load)
            let currentLang = localStorage.getItem('language') || 'vi';
            let isDarkMode = (localStorage.getItem('theme') === 'dark');

            applyTheme(isDarkMode);
            updateLanguageUI(currentLang);
        });
    });

    // *** Gỡ bỏ logic lặp lại bị đặt sai vị trí (1, 2, 3, highlightSidebarLink() cuối) ***
    // Các dòng này sẽ chạy trước khi topbar và sidebar được tải, gây ra lỗi vì các phần tử chưa tồn tại.
    // Logic đúng đã nằm trong callback của loadComponent.
});