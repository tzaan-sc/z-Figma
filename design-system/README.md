# 📚 ETV & CODEASSESS DESIGN SYSTEM DIRECTORY

Thư mục này chứa toàn bộ tài liệu đặc tả và hướng dẫn quy chuẩn giao diện của dự án **CodeAssess / ETV (AI-Powered Coding Tutor & Auto-Grader)**.

---

## 📂 Danh mục tài liệu trong thư mục:

1. 📄 **[01_DESIGN_TOKENS.md](file:///d:/GITHUB/z-Figma/design-system/01_DESIGN_TOKENS.md)**:
   * Hệ thống bảng màu chuẩn (Brand, Sidebar Petrol `#172D45`, Nền trang ngà kem `#FEF3C7`, Text Slate `#0F172A`, Semantics).
   * Thang đo bo góc (`--radius-sm` 6px đến `--radius-xl` 18px và viên thuốc `9999px`).
   * Hệ thống đổ bóng (Elevation & Shadows) và Lưới khoảng cách 8-Point Grid.

2. 📄 **[02_COMPONENTS_ATOMS_TO_ORGANISMS.md](file:///d:/GITHUB/z-Figma/design-system/02_COMPONENTS_ATOMS_TO_ORGANISMS.md)**:
   * Cấu trúc khung các thành phần từ nhỏ đến lớn:
     * **Atoms**: Nút bấm (Primary Petrol, Sky Blue, Gold CTA), Pill Badges (SAMPLE, HIDDEN, Độ khó), Form Controls.
     * **Molecules**: Thẻ KPI thống kê, Role Status Pill, Hộp thông báo quy tắc.
     * **Organisms**: Thẻ bài tập tương tác (`Assignment Card`), Bảng dữ liệu SaaS (`Data Table`), Top Navbar, ETV Sidebar, Modal Dialogs.
     * **Templates**: Bố cục Desktop Enterprise và Bố cục Web IDE Dual-Pane.

3. 🎨 **File màu duy nhất dùng chung**:
   * 👉 **[theme.css](file:///d:/GITHUB/z-Figma/jsx/theme.css)**: Nơi khai báo tập trung 100% biến màu CSS (`:root`). Chỉnh sửa màu ở đây sẽ tự động thay đổi toàn bộ ứng dụng.

4. 🖥️ **Giao diện Showcase trực quan trên Web**:
   * Thành phần mã nguồn: [DesignSystemShowcase.jsx](file:///d:/GITHUB/z-Figma/jsx/components/design-system/DesignSystemShowcase.jsx)
   * Giúp xem trực tiếp và kiểm tra tương tác toàn bộ bảng màu, thước đo bo góc, các loại nút bấm, badges, thẻ card và bảng dữ liệu ngay trên trình duyệt.
