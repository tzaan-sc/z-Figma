# 01. DESIGN TOKENS & CÁC QUY CHUẨN NỀN TẢNG (FOUNDATIONS)

Tài liệu này định nghĩa hệ thống token nền tảng của hệ thống ETV / CodeAssess theo phong cách **Petrol, Slate & Warm Ivory Modern SaaS**.

---

## 1. HỆ THỐNG MÀU SẮC (COLOR TOKENS)

Mọi mã màu được quản lý tập trung tại file [theme.css](file:///d:/GITHUB/z-Figma/jsx/theme.css).

### 1.1. Bảng Màu Nhận Diện & Sidebar (Brand & Sidebar Palette)
| Tên Biến CSS | Mã Màu Hex | Mô tả / Vị trí sử dụng |
| :--- | :--- | :--- |
| `--sidebar-bg` | `#172D45` | Màu nền chính thanh Sidebar bên trái (Deep Petrol Blue). |
| `--sidebar-card-bg` | `#0F2236` | Nền khung viên thuốc Role Status Badge trên Sidebar. |
| `--sidebar-active-bg` | `#93C5FD` | Nền mục menu đang chọn (Baby Blue / Soft Sky Blue). |
| `--sidebar-active-text`| `#0F3564` | Chữ & Icon của mục menu đang chọn (Navy sẫm tương phản cao). |
| `--sidebar-text` | `#CBD5E1` | Chữ & Icon menu bình thường (Bạc ánh xanh). |
| `--sidebar-dot` | `#FDE047` | Chấm tròn dạ quang trạng thái hoạt động trên Sidebar. |
| `--sidebar-badge-bg` | `#FEF3C7` | Nền viên thuốc `Active` màu vàng ngà kem trên Sidebar. |
| `--sidebar-badge-text`| `#1E293B` | Chữ nhãn `Active`. |

### 1.2. Bảng Màu Bề Mặt & Nền Trang (Surfaces & Backgrounds)
| Tên Biến CSS | Mã Màu Hex | Mô tả / Vị trí sử dụng |
| :--- | :--- | :--- |
| `--bg-page` | `#FEF3C7` | **Màu nền trang chính**: Vàng ngà kem ấm cúng (Warm Ivory), chống mỏi mắt. |
| `--bg-surface` | `#FFFFFF` | **Bề mặt khối**: Nền các thẻ Card, Bảng dữ liệu, Navbar trên cùng. |
| `--bg-subtle` | `#FFFBEB` | Nền ô tìm kiếm, ô switch vai trò, thẻ lồng bên trong. |
| `--bg-dark-code` | `#0F172A` | Nền tối chuyên dụng cho Monaco Code Editor & Logs Terminal. |
| `--bg-dark-code-header`| `#1E293B`| Thanh header công cụ của trình soạn thảo mã nguồn. |

### 1.3. Bảng Màu Chữ & Phân Cấp Nội Dung (Typography Colors)
| Tên Biến CSS | Mã Màu Hex | Mô tả / Vị trí sử dụng |
| :--- | :--- | :--- |
| `--text-primary` | `#0F172A` | Chữ tiêu đề lớn, nội dung chính (Slate 900 đậm rõ nét). |
| `--text-secondary` | `#475569` | Chữ mô tả, nhãn phụ thông tin (Slate 600). |
| `--text-muted` | `#64748B` | Chú thích ngày giờ, placeholder ô nhập liệu (Slate 500). |
| `--text-inverse` | `#FFFFFF` | Chữ trắng trên nền nút màu đậm hoặc nền đen editor. |
| `--text-accent` | `#172D45` | Màu liên kết, mã bài tập cần nhấn mạnh. |

### 1.4. Bảng Màu Trạng Thái Nghiệp Vụ (Semantic Colors)
| Trạng Thái | Text / Icon | Nền (Background) | Viền (Border) | Ứng Dụng Nghiệp Vụ |
| :--- | :--- | :--- | :--- | :--- |
| **Success (Thành công)** | `#15803D` | `#DCFCE7` | `#86EFAC` | Bài nộp hoàn thành, 10/10 điểm, Lớp đang hoạt động |
| **Warning (Cảnh báo)** | `#B45309` | `#FEF3C7` | `#FDE68A` | Bài nháp (DRAFT), gần hạn nộp, MOSS tương đồng > 15% |
| **Danger (Nguy hiểm)** | `#B91C1C` | `#FEE2E2` | `#FECACA` | Quá hạn nộp, Compile Error, TLE, Đạo văn cao, Lớp đã đóng |
| **Info / Sample Tests** | `#0369A1` | `#E0F2FE` | `#BAE6FD` | Tag Test Case công khai (`SAMPLE`), thông tin tiến trình |

---

## 2. QUY CHUẨN BO GÓC (BORDER RADIUS SYSTEM)

Hệ thống bo góc tuân thủ chặt chẽ tỉ lệ hình học để tạo cảm giác mềm mại, hiện đại:

| Tên Token | Giá Trị | Áp Dụng Cho Thành Phần |
| :--- | :--- | :--- |
| `--radius-sm` | `6px` | Tag nhỏ, nhãn phụ, ô input nhỏ, badge con. |
| `--radius-md` | `8px` | Nút bấm (`Buttons`), Ô nhập liệu (`Inputs`, `Selects`, `Textarea`). |
| `--radius-lg` | `12px - 14px` | Khối thẻ Card (`.glass-card`), Khung bảng dữ liệu, Khung Editor. |
| `--radius-xl` | `18px` | Hộp thoại nổi (`Modals`, `Drawers`, `Popups`). |
| `--radius-pill` | `12px` | Pill Badge vuông góc bo tròn. |
| `--radius-full` | `9999px` | Viên thuốc tròn hoàn toàn (`Role Badge`, `Active Pill`, Chấm trạng thái). |

---

## 3. HỆ THỐNG ĐỔ BÓNG (ELEVATION & SHADOWS)

| Tên Token | Giá Trị Shadow | Áp Dụng |
| :--- | :--- | :--- |
| `--shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.04)` | Viền nhẹ nút phụ, ô input khi bình thường. |
| `--shadow-sm` | `0 1px 3px rgba(15, 23, 42, 0.08)` | Thẻ Card bình thường, Thanh Navbar. |
| `--shadow-md` | `0 4px 6px -1px rgba(15, 23, 42, 0.07)` | Thẻ Card khi hover, Dropdown Menu. |
| `--shadow-lg` | `0 10px 15px -3px rgba(15, 23, 42, 0.08)` | Thẻ Card đang tương tác, Nút CTA nổi bật. |
| `--shadow-modal`| `0 20px 25px -5px rgba(15, 23, 42, 0.15)` | Cửa sổ Modal, AI Drawer trượt từ cạnh phải. |

---

## 4. HỆ THỐNG LƯỚI & KHOẢNG CÁCH (8-POINT GRID SPACING)

Mọi khoảng cách được nhân bản theo bội số của `4px` và `8px`:
- `4px`: Khoảng cách giữa icon và chữ nhỏ.
- `8px`: Khoảng cách giữa các nút bấm, padding nhỏ của badge.
- `12px`: Padding bên trong ô input, khoảng cách dòng tóm tắt.
- `16px`: Padding tiêu chuẩn cho thẻ, khoảng cách giữa các mục menu.
- `20px - 24px`: Padding thẻ Card lớn, gap giữa các cột trong grid.
- `28px - 32px`: Padding lề trang (`page-body`).
- `270px`: Chiều rộng cố định của thanh Sidebar bên trái.
