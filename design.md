Dưới đây là bộ **Prompt Đặc Tả Màu Sắc** và **Bộ Quy Luật Thiết Kế (Design Rules & Guidelines)** được trích xuất và chuẩn hóa chính xác 100% từ tab **`00 — Design System`** (Bộ token `CodeAssess/Design System`) của dự án để bạn có thể copy và dùng làm tài liệu hoặc prompt cho AI/Designer:

---

# 🎨 PROMPT ĐẶC TẢ MÀU SẮC (DESIGN TOKENS PALETTE)

> *"Sử dụng bảng mã màu chuẩn của hệ thống **CodeAssess / ETV Design System** với phong cách **Petrol, Slate & Ivory Modern SaaS**, cụ thể như sau:"*

### 1. Brand Colors (Màu Nhận Diện Thương Hiệu)
* **Brand Primary (Chủ đạo)**: `#0047AB` (hoặc `rgb(0, 71, 171)`) — Biến: `var:color/brand/primary` *(Xanh Cobalt / Deep Navy chuyên nghiệp cho Giáo dục & Công nghệ)*.
* **Brand Light (Màu phụ sáng)**: `#A1C4E9` — Biến: `var:color/brand/light` *(Dùng cho avatar placeholder, badge nền nhạt)*.
* **Brand Neutral**: `#CBD5E1` — Biến: `var:color/brand/neutral`.
* **Brand CTA / Accent Gold**: `#FDD023` — Biến: `var:color/brand/cta` *(Vàng kim nhấn mạnh các tính năng VIP, chứng chỉ)*.
* **Brand Light Warning**: `#FEF3C7` — Biến: `var:color/brand/light-warning`.

### 2. Surface & Background Colors (Màu Nền & Bề Mặt Khối)
* **Page Background (Nền trang tổng)**: `#F8FAFC` — Biến: `var:color/background/page` *(Trắng xám dịu mắt, chống mỏi mắt khi code lâu)*.
* **Surface Background (Nền Card/Bảng)**: `#FFFFFF` — Biến: `var:color/background/surface` *(Trắng tinh khiết làm nổi bật thẻ dữ liệu)*.
* **Subtle Background (Nền phụ/Input)**: `#F1F5F9` — Biến: `var:color/background/subtle` *(Dùng cho ô tìm kiếm, dòng bảng hover)*.
* **Dark Code Background**: `#0F172A` / `#1E293B` *(Dành riêng cho Monaco Code Editor và Terminal Logs)*.

### 3. Text Colors (Màu Chữ & Thứ Bậc Nội Dung)
* **Text Primary (Tiêu đề, nội dung chính)**: `#0F172A` — Biến: `var:color/text/primary` *(Đen than Slate 900 tương phản cao)*.
* **Text Secondary (Mô tả, sub-text, nhãn phụ)**: `#475569` — Biến: `var:color/text/secondary` *(Xám trung tính Slate 600)*.
* **Text Disabled / Placeholder**: `#94A3B8` — Biến: `var:color/text/disabled`.
* **Text Inverse (Chữ trên nền đậm/nút bấm)**: `#FFFFFF` — Biến: `var:color/text/inverse`.

### 4. Semantic Status Colors (Màu Trạng Thái Hệ Thống)
* **Success (Đạt, Hoàn thành, 10/10)**:
  * Text/Border: `#16A34A` (`#15803D`) — Biến: `var:color/status/success`.
  * Background: `#DCFCE7` — Biến: `var:color/status/success-bg`.
* **Warning (Cần review, Gần hạn, Moss > 15%)**:
  * Text/Border: `#D97706` — Biến: `var:color/status/warning`.
  * Background: `#FEF3C7` — Biến: `var:color/status/warning-bg`.
* **Error / Danger (Lỗi cú pháp, TLE, Đạo văn cao)**:
  * Text/Border: `#DC2626` — Biến: `var:color/status/error`.
  * Background: `#FEE2E2` — Biến: `var:color/status/error-bg`.
* **Info (Đang diễn ra, Thông tin học phần)**:
  * Text/Border: `#2563EB` — Biến: `var:color/status/info`.
  * Background: `#DBEAFE` — Biến: `var:color/status/info-bg`.

### 5. Border Colors (Đường Viền Khối)
* **Border Default**: `#E2E8F0` — Biến: `var:color/border/default` *(1px cho thẻ Card, Bảng, Input)*.
* **Border Subtle**: `#F1F5F9` — Biến: `var:color/border/subtle` *(Đường kẻ phân cách Divider mỏng)*.
* **Border Focus**: `#0047AB` — Biến: `var:color/border/focus` *(Viền khi focus vào Input/Form)*.

---

# 📐 QUY LUẬT THIẾT KẾ CỐT LÕI (DESIGN PRINCIPLES)

### 1. Nguyên Tắc Cấu Trúc Bố Cục (Layout & Spacing)
* **Hệ thống lưới (Grid 8-point)**: Mọi khoảng cách padding, margin, gap đều chia hết cho 4 và 8 (ví dụ: `4px, 8px, 12px, 16px, 20px, 24px, 32px`).
* **Kích thước chuẩn Web Desktop**: `1440px` (chiều rộng) x `960px` (chiều cao cơ sở).
* **Sidebar cố định**:
  * Độ rộng: `260px` đến `288px`.
  * Luôn sử dụng variant với mục đang active được highlight bằng màu chủ đạo `Brand Primary` + nền `Info-bg`.
* **Nội dung chính (Main Content)**: Padding ngoài `28px - 32px`, khoảng cách giữa các khối lớn `gap = 20px - 24px`.

### 2. Nguyên Tắc Bo Góc (Border Radius)
* **Nút bấm (Buttons) & Ô nhập liệu (Inputs)**: `rounded = 6px - 8px`.
* **Thẻ thống kê (Cards) & Khối nội dung lớn**: `rounded = 12px - 14px`.
* **Hộp thoại Pop-up (Modals) & Cửa sổ nổi**: `rounded = 16px - 20px`.
* **Pill Badges (Thẻ tag trạng thái)**: `rounded = 10px - 12px` (bo tròn kiểu viên thuốc).

### 3. Nguyên Tắc Phân Bổ Màu Sắc (Quy tắc 60 - 30 - 10)
* **60% Nền**: Sử dụng màu trung tính sáng (`#F8FAFC` cho Page, `#FFFFFF` cho Card) để giao diện thoáng đãng, dễ tập trung vào mã nguồn.
* **30% Cấu trúc & Text**: Nền Sidebar đậm (`#0F172A`) hoặc viền (`#E2E8F0`), chữ phân cấp rõ ràng giữa `#0F172A` và `#64748B`.
* **10% Nhấn Accent (Call To Action)**: Dành riêng màu xanh `#0047AB` / `#3B82F6` cho nút hành động chính (`+ Tạo bài tập`, `Lưu cấu hình`, `Chấm bài`). Tuyệt đối không dùng tràn lan.

### 4. Quy Luật Trình Bày Dữ Liệu Nghiệp Vụ
* **Mã nguồn (Code)**: Luôn dùng phông chữ đơn cách (Monospace font như JetBrains Mono, Fira Code hoặc Courier) trên nền tối `#0F172A` để tạo cảm giác IDE chân thực.
* **Test Case**: Luôn phân tách bằng Tag màu:
  * **SAMPLE (Công khai)**: Tag Xanh lam nhạt.
  * **HIDDEN (Bảo mật)**: Tag Đỏ nhạt để giáo viên nhận diện ngay trường hợp kiểm thử chống gian lận.
* **Thông báo & Tương tác**:
  * Các hành động nguy hiểm (Xóa bài, Khóa tài khoản) luôn phải qua **Confirmation Dialog**.
  * Các tiến trình chạy nền (Batch Grading) dùng **Toast notification** góc dưới, không chặn màn hình của người dùng.