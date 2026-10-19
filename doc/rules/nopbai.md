# BỘ QUY TẮC VẬN HÀNH HỆ THỐNG NỘP & CHẤM BÀI (AUTO-GRADER & SUBMISSION LIFECYCLE)

---

### 1. Quy Trình & Trạng Thái Bài Làm (Submission Lifecycle)

Hệ thống quản lý bài làm của sinh viên qua 4 trạng thái chính:

```text
DRAFT ──> SUBMITTED ──> GRADING ──> COMPLETED
```

* **`DRAFT` (Bản nháp):** Sinh viên đang viết/chỉnh sửa/upload code trong Editor trong thời gian mở bài tập ($T < T_{\text{deadline}}$), chưa nộp chính thức. Cho phép lưu thủ công và Autosave tự động. **Không có chức năng Chạy thử mã nguồn (Run Code) trên Sample Test Cases dành cho sinh viên.**
* **`SUBMITTED` (Đã nộp bài):** Bài làm đã được chốt và khóa vĩnh viễn (Read-only). Sinh viên không thể chỉnh sửa, upload, save hay nộp lại.
* **`GRADING` (Đang chấm gom sau Deadline):** Sau giờ deadline, hệ thống gom toàn bộ bài `SUBMITTED` vào Message Queue để thực thi trong Docker Sandbox và chấm tự động.
* **`COMPLETED` (Đã hoàn thành đánh giá tự động):** Đã có kết quả Hidden Test Cases, điểm Auto-Grader, phản hồi từ AI Review và kết quả đối soát trùng lặp/quét đạo văn. Giáo viên sẽ sử dụng các kết quả này để hỗ trợ chấm thủ công và xác nhận điểm chính thức.

---

### 2. Quy Tắc Trong Giờ Làm Bài ($T < T_{\text{deadline}}$)

#### Thao tác trong Editor:
* **Lưu bài làm:** Hệ thống hỗ trợ nút "Lưu bài làm" thủ công và tự động Autosave theo chu kỳ cấu hình (5–10 giây hoặc 2 giây sau khi ngừng gõ). Code được lưu ở dạng `DRAFT`.
* **Tải tệp mã nguồn (Upload):** Cho phép nạp file mã nguồn từ máy tính vào Editor để chỉnh sửa và lưu vào `DRAFT` (Upload không tạo Submission).
* **Quy tắc thực thi mã nguồn:** **Không cung cấp tính năng Chạy thử (Run Code) cho Sinh viên.** Việc thực thi mã nguồn thuộc quy trình đánh giá của hệ thống trong Docker Sandbox sau khi hết Deadline.

#### Luồng Nộp bài chính thức (Explicit Submit):
1. Sinh viên kiểm tra code và bấm nút **"Nộp bài"**.
2. **Popup xác nhận cảnh báo:** Màn hình hiển thị thông báo:
   > *"Bạn có chắc chắn muốn nộp bài? Sau khi nộp, bài làm sẽ bị khóa và bạn KHÔNG THỂ chỉnh sửa hoặc nộp lại nữa."*
3. **Khóa vĩnh viễn:** Ngay khi nhấn "Xác nhận":
   * Trạng thái bài làm chuyển từ `DRAFT` $\rightarrow$ `SUBMITTED` với nhãn `trigger_type = MANUAL`.
   * Editor lập tức chuyển sang chế độ Read-only. Sinh viên **không được phép sửa code, upload hay nộp lại dưới bất kỳ hình thức nào**.
   * Bài nộp được giữ nguyên ở trạng thái `SUBMITTED` chờ đến giờ Deadline để đưa vào quy trình Batch Grading.

---

### 3. Quy Tắc Tại Thời Điểm Hết Giờ ($T = T_{\text{deadline}}$)

Dành riêng cho các trường hợp sinh viên **chưa chủ động bấm nút "Nộp bài"** trước giờ đóng:

* **Tự động nộp bài (Server-side Auto-submit):**
  * Xử lý hoàn toàn ở Backend bằng Worker/Cron Job độc lập (không phụ thuộc vào trình duyệt, kết nối mạng hay thiết bị của sinh viên).
  * Backend quét toàn bộ tài khoản còn ở trạng thái `DRAFT` của bài tập vừa hết hạn:
    * Lấy bản code nháp (Autosave/Save) mới nhất được lưu trong Database/Cache.
    * Tự động tạo bản nộp chính thức ở trạng thái `SUBMITTED` với nhãn `trigger_type = AUTO_EXPIRED`.
    * Khóa toàn bộ Editor của các tài khoản này trên giao diện người dùng.

---

### 4. Quy Tắc Sau Giờ Deadline ($T > T_{\text{deadline}}$) & Mô Hình Chấm Gom (Batch Grading)

#### Tắt Nộp Muộn (Strict No-Late Submission):
* **Frontend:** Hiển thị trạng thái "Bài tập đã đóng", vô hiệu hóa Editor, ẩn/vô hiệu hóa hoàn toàn nút Nộp bài.
* **Backend:** Chặn toàn bộ các request gửi code lên API sau $T_{\text{deadline}}$ (trả về lỗi `403 Forbidden` / `Assignment Closed`).

#### Quy trình Chấm Gom Tập Trung (Batch Grading Pipeline):
Sau khi đóng hoàn toàn việc nhận bài, hệ thống kích hoạt tiến trình chấm theo đợt:

```text
[Chốt danh sách SUBMITTED] ──> [Message Queue] ──> [Docker Sandbox (Hidden Tests)]
                                                            │
                                                            ▼
[Official Score] <── [Giáo viên chấm thủ công] <── [COMPLETED] <── [AI Review & Plagiarism Check]
```

1. **Chốt danh sách:** Gom đúng 1 bản nộp `SUBMITTED` duy nhất của mỗi sinh viên cho bài tập đó.
2. **Auto-Grader:** Đẩy các bài làm vào Message Queue để biên dịch, kiểm tra giới hạn tài nguyên (Time/Memory Limit) và chạy trên tập **Hidden Test Cases** bên trong Docker Sandbox.
3. **AI Review & Anti-cheat:** AI phân tích độ tối ưu thuật toán, Code Style, chất lượng mã nguồn, đưa ra phản hồi chi tiết dựa trên evidence và hệ thống thực hiện đối soát trùng lặp mã nguồn giữa các sinh viên (Quét đạo văn).
4. **COMPLETED:** Hoàn tất quá trình đánh giá tự động, lưu trữ đầy đủ kết quả test, điểm Auto-Grader, AI feedback và kết quả đối soát.
5. **Chấm thủ công & Xác nhận điểm chính thức:** Giáo viên xem xét toàn bộ kết quả, chấm theo Rubric, bổ sung nhận xét và xác nhận điểm chính thức (Official Score).
6. **Hậu kiểm với AI Tutor:** Sinh viên xem kết quả được công bố và có thể trao đổi với AI Tutor theo phương pháp Socratic để hiểu rõ lỗi và định hướng cải thiện.

---

### 5. Cấu Trúc Bảng Dữ Liệu Cơ Bản (`submissions`)

| Trường dữ liệu | Kiểu dữ liệu | Mô tả |
| --- | --- | --- |
| `id` | BIGINT / UUID | Khóa chính |
| `user_id` | BIGINT | ID sinh viên |
| `assignment_id` | BIGINT | ID bài tập |
| `code_text` | TEXT | Nội dung mã nguồn nộp |
| `status` | ENUM | `DRAFT`, `SUBMITTED`, `GRADING`, `COMPLETED` |
| `trigger_type` | ENUM | `MANUAL` (Sinh viên chủ động nộp), `AUTO_EXPIRED` (Backend tự động nộp khi hết giờ) |
| `auto_score` | FLOAT / NULL | Điểm Auto-Grader từ Hidden Test Cases |
| `official_score` | FLOAT / NULL | Điểm chính thức sau khi Giáo viên xác nhận |
| `teacher_feedback`| TEXT / NULL | Nhận xét của Giáo viên khi chấm bài |
| `submitted_at` | TIMESTAMP | Thời điểm bài chuyển sang `SUBMITTED` |