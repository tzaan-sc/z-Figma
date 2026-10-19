# 02. HỆ THỐNG THÀNH PHẦN TỪ NHỎ ĐẾN LỚN (ATOMIC DESIGN)

Tài liệu này hệ thống hóa toàn bộ các khung thành phần (UI Components) từ cấp độ nguyên tử (Atoms) đến các cấu trúc phức tạp (Organisms) và bố cục tổng thể (Templates).

---

## 1. ATOMS — CÁC THÀNH PHẦN NGUYÊN TỬ NHỎ NHẤT

### 1.1. Nút Bấm (Buttons)
Quy chuẩn bo góc: `border-radius: var(--radius-md)` (8px). Chiều cao chuẩn: `36px` (sm: `28px`, lg: `44px`).

* **Primary Button (`.btn-primary`)**:
  * Nền: `var(--brand-primary)` (`#172D45`)
  * Chữ: Trắng `#FFFFFF`, font-weight 600
  * Dùng cho: Hành động tạo mới, nộp bài, lưu cấu hình, xác nhận chính.
* **Secondary Button (`.btn-secondary`)**:
  * Nền: `var(--bg-surface)` (`#FFFFFF`)
  * Viền: `1px solid var(--border-medium)` (`#CBD5E1`)
  * Chữ: `var(--text-primary)` (`#0F172A`)
  * Dùng cho: Nút Hủy, Xem chi tiết, Đóng cửa sổ, Quay lại.
* **Accent Sky Button (`.btn-sky`)**:
  * Nền: `var(--brand-accent-sky)` (`#93C5FD`)
  * Chữ: `var(--brand-accent-sky-dark)` (`#0F3564`), font-weight 700
  * Dùng cho: Mở AI Tutor, Hành động nổi bật nhẹ.
* **Gold CTA Button (`.btn-gold`)**:
  * Nền: `var(--brand-cta)` (`#FDE047`)
  * Chữ: `#0F172A`, font-weight 700
  * Dùng cho: Nút hỏi trợ giảng AI Socratic, Xác thực đặc biệt.
* **Danger Button (`.btn-danger`)**:
  * Nền: `var(--danger)` (`#DC2626`)
  * Chữ: Trắng `#FFFFFF`
  * Dùng cho: Đóng lớp, Xóa bài tập, Khóa tài khoản.

### 1.2. Thẻ Trạng Thái & Nhãn (Pill Badges)
Quy chuẩn bo góc: `border-radius: var(--radius-pill)` (12px) hoặc `9999px`. Font-size: `12px`, padding: `4px 10px`.

* **SAMPLE Test Case (`.badge-sample`)**: Nền Xanh lam nhạt (`#E0F2FE`), Chữ `#0369A1`, Viền `#BAE6FD`. (Dành cho Test công khai).
* **HIDDEN Test Case (`.badge-hidden`)**: Nền Đỏ nhạt (`#FEE2E2`), Chữ `#B91C1C`, Viền `#FECACA`. (Dành cho Test bảo mật).
* **Độ Khó**:
  * Dễ: Xanh lá (`#DCFCE7` / `#15803D`)
  * Trung bình: Vàng ấm (`#FEF3C7` / `#B45309`)
  * Khó: Đỏ cam (`#FEE2E2` / `#B91C1C`)
* **Trạng Thái Bài Nộp**:
  * `DRAFT` (Bản nháp): Nền `#FEF3C7`, Chữ `#B45309`
  * `SUBMITTED` (Đã nộp): Nền `#DBEAFE`, Chữ `#1D4ED8`
  * `COMPLETED` (Đã chấm): Nền `#DCFCE7`, Chữ `#15803D`

### 1.3. Ô Nhập Liệu (Form Controls)
Quy chuẩn: Nền `var(--bg-surface)`, Viền `1px solid var(--border-medium)`, Bo góc `var(--radius-md)` (8px). Khi focus: Viền `var(--brand-primary)` và bóng mờ `var(--shadow-focus)`.
* Ô tìm kiếm có Icon kính lúp bên trái (`.form-input`).
* Ô lựa chọn thả xuống (`.form-select`).
* Thanh trượt giới hạn tài nguyên (`range-slider` với màu `var(--brand-primary)`).

---

## 2. MOLECULES — CÁC KHỐI KẾT HỢP VỪA

### 2.1. Thẻ Thống Kê (Stat KPI Cards)
Khung hiển thị một chỉ số quan trọng, gồm:
1. Icon container bo góc tròn `12px` với màu pastel.
2. Tiêu đề chỉ số in hoa nhỏ `12.5px`, màu `var(--text-muted)`.
3. Con số kết quả lớn `24px - 28px`, font-weight 800.
4. Dòng trạng thái phụ bên dưới (ví dụ: "Đang hoạt động bình thường").
5. Tương tác: Thêm `.glass-card-interactive` để bấm trực tiếp chuyển sang phân hệ tương ứng.

### 2.2. Role Status Pill (Trên Sidebar)
Khung viên thuốc dài bo tròn `9999px`:
* Nền: `var(--sidebar-card-bg)` (`#0F2236`)
* Bên trái: Chấm tròn vàng dạ quang `8px` + Tên vai trò (`● Giáo Viên`, `● Sinh Viên`).
* Bên phải: Badge `Active` màu vàng ngà kem (`#FEF3C7`), chữ `#1E293B` đậm.

### 2.3. Hộp Cảnh Báo Quy Tắc (Notice / Rule Banner)
Khung nền `var(--info-bg)` hoặc `var(--warning-bg)`, bo góc `8px`, viền mỏng 1px, chứa thông tin nhắc nhở nghiệp vụ (ví dụ: Quy tắc vòng đời lớp học, Không cho chạy thử sample test).

---

## 3. ORGANISMS — CÁC KHỐI THÀNH PHẦN LỚN & PHỨC TẠP

### 3.1. Thẻ Bài Tập Tương Tác (Assignment Card)
* **Khung tổng thể**: Nền trắng `#FFFFFF`, bo góc `12px`, bóng đổ nhẹ `var(--shadow-sm)`.
* **Đường viền biên trái (Color-coded Left Accent)**:
  * Xanh lá `4px` nếu đã hoàn thành (`COMPLETED`).
  * Xanh lam `4px` nếu đã nộp chờ chấm (`SUBMITTED`).
  * Vàng cam `4px` nếu đang là bản nháp (`DRAFT`).
* **Khu vực nội dung**: Mã bài, lớp học, badge trạng thái, tiêu đề h3, thẻ ngôn ngữ/độ khó/thời gian, hộp tóm tắt hạn nộp & điểm số.
* **Khu vực nút bấm dưới cùng**: Nút phụ "Chi tiết đề" và Nút chính "Vào làm bài" / "Kết quả & AI".
* **Tương tác**: Cho phép click thẳng vào thân thẻ bài tập để mở IDE làm bài hoặc xem kết quả.

### 3.2. Bảng Dữ Liệu SaaS (Data Table)
* Header bảng (`<thead>`): Nền `#F1F5F9`, chữ in hoa nhẹ, font-weight 700, phân cách bằng border 1px.
* Dòng bảng (`<tbody> <tr>`): Nền trắng, khi hover đổi màu sang `#FFFDF5`, chữ đen Slate `#0F172A`.
* Cột hành động: Các nút bấm thao tác nhanh gọn (Xem, Sửa, Giao bài, Chấm bài, Xóa).

### 3.3. Thanh Điều Hướng Trên Cùng (Top Navigation Bar)
* Nằm cố định ở đỉnh màn hình (`height: 64px`, `position: sticky; top: 0`).
* Bên trái: Breadcrumb phân hệ (`Không gian làm việc / Giáo viên`).
* Ở giữa: Master Role Switcher Hub (các pill chuyển đổi nhanh giữa 5 vai trò).
* Bên phải: Nút Profile người dùng (Avatar tròn + Tên GV/SV + Vai trò) và Nút Đăng xuất.

### 3.4. Thanh Sidebar Thương Hiệu (ETV Left-docked Sidebar)
* Chiều rộng cố định: `270px`, chiều cao full-screen `100vh`, màu nền Deep Petrol `#172D45`.
* Đỉnh Sidebar: Logo ETV tách nền + Chữ ETV + AI-POWERED CODING TUTOR.
* Bên dưới: Khung Role Status Pill.
* Danh sách Menu: Bo góc tròn mềm mại `14px`, padding `12px 18px`, hiệu ứng active màu Baby Blue `#93C5FD` với chữ sẫm `#0F3564`.

### 3.5. Cửa Sổ Hộp Thoại (Modal Dialog)
* Lớp nền làm mờ Backdrop: `rgba(15, 23, 42, 0.6)`.
* Khung modal: Nền trắng `#FFFFFF`, bo góc `18px`, bóng đổ `var(--shadow-modal)`, thanh tiêu đề có nút đóng (X), thân cuộn tự động và hàng nút Xác nhận / Hủy dưới chân.

---

## 4. TEMPLATES & CẤU TRÚC LAYOUT TỔNG THỂ

1. **Enterprise Split Layout (Giao diện tổng quát)**:
   * Cột trái: `<Sidebar />` (`width: 270px; height: 100vh; position: sticky;`)
   * Khung phải: `<main className="main-viewport">` gồm `<Navbar />` ở trên và `<main className="page-body">` ở dưới.
2. **Dual-Pane IDE Layout (Màn hình làm bài UC-09 & Chấm bài UC-27)**:
   * Cột trái: Đề bài, ràng buộc, ví dụ I/O, tiêu chí Rubric.
   * Cột phải: Khối Monaco Editor nền đen `#0F172A`, Terminal Output, Khung chat AI Socratic Drawer.
