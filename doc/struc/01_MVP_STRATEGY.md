# 01. CHIẾN LƯỢC PHÁT TRIỂN: NGUYÊN TẮC MVP (CORE FIRST)

---

## 1. TRIẾT LÝ PHÁT TRIỂN: TẬP TRUNG VÀO GIÁ TRỊ LÕI

Trong quá trình xây dựng hệ thống **AI-Powered Coding Tutor & Auto-Grader**, rủi ro lớn nhất của các dự án giáo dục công nghệ (EdTech) là sa đà vào các tính năng của một **LMS (Learning Management System) truyền thống** trước khi hoàn thiện được phần cốt lõi.

> [!WARNING]
> **NHỮNG TÍNH NĂNG TUYỆT ĐỐI KHÔNG XÂY DỰNG TRONG GIAI ĐOẠN ĐẦU**:
> - Hệ thống upload và phát video bài giảng trực tuyến.
> - Trình xem và quản lý tài liệu PDF / Slide bài giảng.
> - Tính năng điểm danh, biểu đồ chuyên cần sinh viên.
> - Diễn đàn thảo luận / Hỏi đáp (Q&A Forum) dạng mạng xã hội.
> - Cổng thanh toán học phí, giỏ hàng khóa học.
> 
> *Lý do*: Những tính năng trên tiêu tốn **70% - 80% thời gian phát triển** nhưng không tạo ra bất kỳ giá trị nghiên cứu hoặc điểm khác biệt nào cho một hệ thống AI Auto-Grader.

---

## 2. BỐN TRỤ CỘT LÕI CỦA SẢN PHẨM KHẢ DỤNG TỐI THIỂU (MVP)

Hệ thống MVP chỉ cần tập trung hoàn thiện chính xác **4 màn hình và chức năng trọng tâm**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        4 TRỤ CỘT LÕI (MVP CORE)                        │
├────────────────────────────┬───────────────────────────────────────────┤
│ 1. Quản lý bài tập         │ Đăng tải đề bài, mô tả thuật toán, giới   │
│    (Problem Management)    │ hạn Time/Memory, bộ Test Cases (In/Out).  │
├────────────────────────────┼───────────────────────────────────────────┤
│ 2. Web IDE & Nộp bài       │ Monaco Editor trên Web, hỗ trợ viết code, │
│    (IDE & Submission)      │ upload file và bấm Nộp bài.               │
├────────────────────────────┼───────────────────────────────────────────┤
│ 3. Chấm tự động            │ Docker Sandbox thực thi cách ly an toàn,  │
│    (Docker Auto-Grader)    │ so khớp kết quả Test Case (Pass/Fail).    │
├────────────────────────────┼───────────────────────────────────────────┤
│ 4. Trợ giảng AI            │ LLM đọc code, phân tích lỗi logic, đánh   │
│    (AI Tutor & Reviewer)   │ giá complexity, gợi ý Socratic sửa lỗi.   │
└────────────────────────────┴───────────────────────────────────────────┘
```

---

### Trụ Cột 1: Quản Lý Bài Tập (Problem Management)
- **Đối tượng sử dụng**: Giảng viên (`Teacher`).
- **Nhiệm vụ trọng tâm**:
  - Soạn thảo đề bài (tiêu đề, mô tả bài toán, định dạng Input/Output chuẩn, ví dụ minh họa).
  - Thiết lập giới hạn tài nguyên: **Time Limit** (ví dụ: 1.0s - 3.0s) và **Memory Limit** (ví dụ: 128MB - 256MB).
  - Quản lý bộ **Test Cases**:
    - *Sample Test Cases*: Ví dụ công khai trong đề bài để sinh viên tham khảo.
    - *Hidden Test Cases*: Test ẩn dùng để chấm điểm chính thức (bao gồm các Edge Cases: số 0, số âm, mảng rỗng, dữ liệu cực đại).
  - Thiết lập **Rubric tiêu chí chấm**: Phân bổ trọng số (ví dụ: 70% Test Cases, 20% Code Quality/Static Analysis, 10% Algorithm Complexity).

---

### Trụ Cột 2: Môi Trường Viết Code & Nộp Bài (Web IDE & Submission)
- **Đối tượng sử dụng**: Sinh viên (`Student`).
- **Nhiệm vụ trọng tâm**:
  - Giao diện chia đôi màn hình (Split View): Bên trái hiển thị Đề bài + Ví dụ, bên phải là **Monaco Editor** (trình soạn thảo lõi của VS Code).
  - Hỗ trợ chọn ngôn ngữ (Python, C/C++, Java), cú pháp highlight, gợi ý code (IntelliSense cơ bản).
  - Tính năng **Upload File Source Code**: Tự động load nội dung file vào editor.
  - Nút hành động cốt lõi:
    - **Nút "Nộp bài" (Submit)**: Đẩy code vào hàng đợi chấm điểm chính thức.

---

### Trụ Cột 3: Hệ Thống Chấm Tự Động Cách Ly (Docker Sandbox & Auto-Grader)
- **Nhiệm vụ trọng tâm**:
  - Khởi tạo container Docker tạm thời để biên dịch (nếu là C++/Java) và thực thi mã nguồn sinh viên.
  - **Bảo mật tuyệt đối**: Ngắt kết nối mạng (`--network none`), giới hạn RAM/CPU, chạy dưới quyền `non-root user`.
  - Thu thập **Execution Evidence**:
    - Trạng thái từng test case: `AC` (Accepted), `WA` (Wrong Answer), `TLE` (Time Limit Exceeded), `MLE` (Memory Limit Exceeded), `CE` (Compile Error), `RE` (Runtime Error).
    - Thời gian thực thi thực tế (ms) và dung lượng RAM tiêu thụ (MB).
  - Tổng hợp điểm số sơ bộ dựa trên tỷ lệ Test Case vượt qua.

---

### Trụ Cột 4: Trợ Giảng AI Phân Tích & Phản Hồi (AI Tutor & Code Reviewer)
- **Nhiệm vụ trọng tâm**:
  - **Static Analysis**: Phân tích AST (Abstract Syntax Tree), đo độ phức tạp Cyclomatic Complexity và phát hiện Code Smell.
  - **LLM Assessment**: Kết hợp Đề bài + Source Code + Execution Evidence + Rubric để đưa ra đánh giá toàn diện.
  - **Socratic AI Tutor**: Cung cấp giao diện Chat trực tiếp tại trang làm bài. Khi sinh viên gặp lỗi (WA, TLE, RE), AI sẽ:
    - Giải thích nguyên nhân lỗi một cách dễ hiểu.
    - Đặt câu hỏi gợi mở tư duy (Socratic method).
    - **TUYỆT ĐỐI KHÔNG viết code giải hộ** để đảm bảo tính sư phạm.

---

## 3. TIÊU CHÍ ĐO LƯỜNG THÀNH CÔNG CỦA BẢN MVP (SUCCESS METRICS)

1. **Về chức năng**: Một sinh viên có thể đăng nhập $\rightarrow$ xem bài tập $\rightarrow$ viết code $\rightarrow$ nộp bài $\rightarrow$ nhận kết quả chấm từ Docker Sandbox và nhận xét từ AI trong vòng **dưới 10 giây**.
2. **Về tính ổn định**: Docker Sandbox không bị treo khi sinh viên nộp mã nguồn có vòng lặp vô hạn `while(true)` hoặc code độc hại cố tình truy cập file hệ thống.
3. **Về tính sư phạm của AI**: AI chỉ ra được chính xác dòng code gây lỗi logic và đưa ra gợi ý phù hợp mà không tiết lộ lời giải hoàn chỉnh.
