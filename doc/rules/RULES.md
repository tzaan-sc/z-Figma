# RULES.md — BỘ QUY TẮC NGHIỆP VỤ MASTER
# Nền tảng AI-Powered Coding Tutor & Auto-Grader
# (ĐỒNG BỘ 100% THEO CHUẨN ĐẶC TẢ DOAN4.MD — 44 USE CASES)

> **Source of Truth duy nhất** cho các quyết định nghiệp vụ, business rules, ràng buộc logic và các tài liệu liên quan (Use Case, Activity Diagram, Sequence Diagram, Database, API, UI và Test).
>
> **Nguyên tắc ưu tiên:** Rule được chốt sau cùng trong tài liệu này sẽ ưu tiên và thay thế rule cũ nếu có mâu thuẫn.

---

# I. TỔNG QUAN HỆ THỐNG

Hệ thống là nền tảng hỗ trợ đào tạo lập trình, cho phép:
- Sinh viên làm bài lập trình trực tiếp trên hệ thống.
- Sinh viên viết/chỉnh sửa/upload mã nguồn.
- Autosave và lưu bản nháp (Draft).
- Nộp bài chính thức.
- Tự động khóa bài khi Sinh viên nộp hoặc khi hết deadline.
- Auto-submit bản code cuối cùng khi Sinh viên chưa chủ động nộp.
- Chấm bài theo đợt (Batch Grading) sau deadline.
- Thực thi mã nguồn bằng Docker Sandbox.
- Auto-Grader chấm dựa trên Hidden Test Cases.
- Phân tích chất lượng/độ tối ưu mã nguồn.
- AI Review tạo phản hồi dựa trên evidence.
- Đối soát trùng lặp mã nguồn/đạo văn (Plagiarism Check).
- Giáo viên xem kết quả và chấm thủ công.
- Giáo viên xác nhận điểm chính thức.
- Sinh viên xem kết quả và sử dụng AI Tutor để hậu kiểm sau đánh giá.

### Quy tắc thực thi mã nguồn của Sinh viên:
- **Sinh viên không được chạy thử mã nguồn trên các Sample Test Cases.**
- **Hệ thống không cung cấp chức năng cho Sinh viên chủ động thực thi code trên Sample Test Cases trong thời gian làm bài.**
- Việc thực thi mã nguồn được thực hiện bởi hệ thống trong quy trình Batch Grading sau Deadline thông qua Docker Sandbox.
- Hệ thống không theo hướng LLM-only. AI phải sử dụng context/evidence từ:
  - Mã nguồn.
  - Kết quả thực thi.
  - Test Cases.
  - Phân tích mã nguồn.
  - Rubric/thông tin bài tập.

---

# II. TÁC NHÂN (ACTORS) & PHẠM VI

Tất cả tác nhân được định danh chuẩn bằng Tiếng Việt:
1. **Sinh viên**
2. **Giáo viên**
3. **Quản trị viên** (Phòng Đào tạo)
4. **Giáo vụ** (Khoa / Bộ môn)
5. **Quản trị viên hệ thống** (IT Vận hành nền tảng)

---

## 1. Sinh viên
- **Quyền hạn:**
  - Đăng nhập / đăng xuất / quên mật khẩu / đổi mật khẩu / xem và cập nhật thông tin cá nhân (UC-01..06).
  - Xem lớp mình tham gia.
  - Xem bài tập được giao (UC-07, UC-08).
  - Làm bài: viết/chỉnh sửa code (UC-09), Upload file bài làm (UC-10), lưu bản nháp, autosave.
  - Nộp bài chính thức (UC-11 - Explicit Submit hoặc Auto-submit khi hết giờ).
  - Xem bài đã nộp (UC-15 - bản nộp duy nhất).
  - Xem kết quả Auto-Grader được phép công bố (UC-12).
  - Xem AI Review được phép công bố (UC-13).
  - Xem bảng điểm cá nhân & điểm chính thức sau khi Giáo viên xác nhận (UC-16).
  - Tương tác với AI Tutor sau đánh giá để hậu kiểm (UC-14).
- **Ràng buộc:**
  - Sinh viên không được chạy thử mã nguồn trên Sample Test Cases.
  - Sinh viên chỉ được truy cập dữ liệu thuộc quyền của mình.

---

# III. GIÁO VIÊN

- **Phạm vi:** Các lớp / bài tập do Giáo viên được phân công phụ trách.
- **Quyền hạn:**
  - Đóng / mở lại lớp do mình phụ trách (UC-36).
  - Tạo bài tập và cấu hình ban đầu (UC-17).
  - Chỉnh sửa thông tin chung bài tập (UC-18).
  - Xóa / vô hiệu hóa bài tập (UC-19).
  - Thiết lập Deadline (UC-20).
  - Thiết lập Test Cases (UC-21).
  - Thiết lập Rubric (UC-22).
  - Giao bài tập cho lớp (UC-23).
  - Xem bài nộp (UC-24).
  - Xem điểm (UC-25).
  - Xem AI đánh giá & kết quả đối soát trùng lặp (UC-26).
  - Chấm thủ công và xác nhận điểm chính thức (UC-27).
  - Xem kết quả / bảng điểm của lớp mình phụ trách.
- **Lưu ý đặc tả:**
  - Việc tạo lớp, sửa lớp và quản lý sinh viên trong lớp được tập trung quản lý tại cấp Quản trị viên / Giáo vụ (UC-34, UC-35, UC-38). Giáo viên chỉ đóng/mở lớp mình phụ trách (UC-36).

---

# IV. QUẢN TRỊ VIÊN

- **Định danh:** Quản trị viên = Phòng Đào tạo / Người quản lý nghiệp vụ đào tạo.
- **Phạm vi:** Toàn trường về nghiệp vụ đào tạo.
- **Quyền hạn:**
  - Tạo tài khoản Sinh viên, Giáo viên, Giáo vụ (UC-28).
  - Khóa / mở khóa tài khoản (UC-29).
  - Xóa tài khoản (UC-30 - Soft Delete nếu có dữ liệu học tập).
  - Phân quyền người dùng trong phạm vi nghiệp vụ đào tạo (UC-31).
  - Đặt lại mật khẩu (UC-32).
  - Nhập danh sách từ Excel/CSV (UC-33 - 5 cột: Mã người dùng, Họ tên, Email, Vai trò, Lớp).
  - Quản lý lớp toàn trường: Tạo lớp (UC-34), Chỉnh sửa lớp (UC-35), Đóng / mở lại lớp (UC-36), Archive / Restore / Hard Delete lớp nếu đủ điều kiện (UC-37).
  - Quản lý Sinh viên trong lớp cấp toàn trường (UC-38).
  - Phân công Giáo viên vào lớp cấp toàn trường (UC-39).
  - Quản lý cơ cấu tổ chức, Khoa / Bộ môn và phân công Giáo vụ (UC-43).

---

# V. GIÁO VỤ

- **Định danh:** Giáo vụ là actor riêng biệt, không gộp vào Quản trị viên.
- **Phạm vi:** Khoa / Bộ môn được phân công phụ trách.
- **Quyền hạn:**
  - Tạo lớp trong phạm vi Khoa/Bộ môn (UC-34).
  - Chỉnh sửa lớp trong phạm vi Khoa/Bộ môn (UC-35).
  - Đóng / mở lại lớp trong phạm vi Khoa/Bộ môn (UC-36).
  - Archive / Restore / Hard Delete lớp trong phạm vi Khoa/Bộ môn nếu đủ điều kiện (UC-37).
  - Quản lý Sinh viên trong lớp thuộc Khoa/Bộ môn (UC-38).
  - Phân công Giáo viên vào lớp thuộc Khoa/Bộ môn (UC-39).
- **Ràng buộc:** Giáo vụ không được thao tác ngoài Khoa/Bộ môn được phân công.

---

# VI. QUẢN TRỊ VIÊN HỆ THỐNG

- **Định danh:** Quản trị viên hệ thống = IT / Người vận hành kỹ thuật nền tảng.
- **Phụ trách:**
  - Quản lý cấu hình AI, API Key, tham số mô hình AI (UC-40).
  - Cấu hình Docker Sandbox (UC-41).
  - Giám sát Docker Sandbox, theo dõi execution (UC-42).
  - Quản lý System Logs (UC-44).
  - Phân quyền cấp hệ thống (UC-31: cấp vai trò Quản trị viên / Quản trị viên hệ thống).
- **Đặc biệt (Ràng buộc nghiêm ngặt):**
  - Quản trị viên hệ thống **không** quản lý nghiệp vụ lớp học hay đào tạo.
  - **Không được:** Tạo lớp, chỉnh sửa lớp, đóng lớp, mở lớp, archive lớp, restore lớp, hard delete lớp, quản lý Sinh viên trong lớp, phân công Giáo viên, quản lý tổ chức / Khoa / Bộ môn (không tham gia UC-34..39, UC-43).

---

# VII. PHẠM VI QUẢN LÝ LỚP

| Tác nhân (Actor) | Phạm vi |
|---|---|
| **Giáo viên** | Đóng / mở lớp mình được phân công phụ trách (UC-36) |
| **Giáo vụ** | Khoa/Bộ môn được phân công (UC-34 $\rightarrow$ UC-39) |
| **Quản trị viên** | Toàn trường (UC-34 $\rightarrow$ UC-39, UC-43) |
| **Quản trị viên hệ thống** | Không quản lý nghiệp vụ lớp |

---

# VIII. LIFECYCLE LỚP HỌC

```text
Hoạt động
    ↓ Đóng (UC-36)
Đã đóng
    ↓ Lưu trữ (UC-37)
Lưu trữ
```

### 1. Đóng lớp (UC-36)
- **Tác nhân:** Giáo viên (lớp phụ trách), Giáo vụ (Khoa/Bộ môn), Quản trị viên (toàn trường).
- Chuyển trạng thái: `Hoạt động` $\rightarrow$ `Đã đóng`.
- Lớp đã đóng: Ngăn các hoạt động học tập bình thường; dữ liệu vẫn được bảo toàn; có thể mở lại theo quyền.

### 2. Mở lại lớp (UC-36)
- **Tác nhân:** Giáo viên, Giáo vụ, Quản trị viên.
- Chuyển trạng thái: `Đã đóng` $\rightarrow$ `Hoạt động`.

### 3. Archive (Lưu trữ lớp - UC-37)
- **Tác nhân:** Giáo vụ (trong phạm vi Khoa/Bộ môn), Quản trị viên (trên toàn trường).
- Chuyển trạng thái: `Đã đóng` $\rightarrow$ `Lưu trữ`.
- Lớp lưu trữ: Không xuất hiện trong danh sách vận hành thông thường; dữ liệu vẫn được bảo lưu.

### 4. Restore (Khôi phục lớp - UC-37)
- **Tác nhân:** Giáo vụ, Quản trị viên.
- Chuyển trạng thái: `Lưu trữ` $\rightarrow$ `Đã đóng`.
- **Restore không tự động đưa lớp về Hoạt động.** Muốn hoạt động lại:
  ```text
  Lưu trữ ──(Restore UC-37)──> Đã đóng ──(Mở lại UC-36)──> Hoạt động
  ```

### 5. Hard Delete (Xóa vĩnh viễn - UC-37)
- Chỉ được Hard Delete khi thỏa mãn đồng thời:
  ```text
  student_count = 0
  AND
  assignment_count = 0
  ```
  *(Tức là: 0 Sinh viên và 0 bài tập).*
- Nếu chỉ cần 1 trong 2 điều kiện không đạt: **Hard Delete bị chặn $\rightarrow$ chuyển sang Archive (Lưu trữ).**
- Rule này áp dụng cho Giáo vụ và Quản trị viên. Quản trị viên hệ thống không tham gia lifecycle lớp.

---

# IX. CẤU HÌNH BÀI TẬP

Một bài tập bao gồm các nhóm thông tin:
1. **Thông tin chung:** Tên bài, đề bài / mô tả, ngôn ngữ lập trình, độ khó, giới hạn thời gian chạy, giới hạn bộ nhớ / tài nguyên.
2. **Deadline:** Có một thời điểm kết thúc nhận bài. Sau thời điểm này hệ thống đóng hoàn toàn, không nhận bài mới.
3. **Test Cases:** Gồm Sample Test Cases và Hidden Test Cases (Input, Expected Output, Trọng số điểm).
   - *Quy tắc Sample Test Cases:* Sample Test Cases không phải chức năng chạy thử dành cho Sinh viên. Sinh viên không được chủ động thực thi mã nguồn trên Sample Test Cases.
4. **Rubric:** Tiêu chí, mô tả, mức điểm / trọng số. Tiêu chí `Correctness` được tính tự động dựa trên kết quả Hidden Test Cases.

---

# X. RANH GIỚI CÁC USE CASE CẤU HÌNH BÀI TẬP

- **UC-17 – Tạo bài tập:** Dùng để tạo bài tập và thiết lập cấu hình ban đầu (thông tin chung, ngôn ngữ, độ khó, giới hạn tài nguyên, deadline ban đầu, cấu hình ban đầu cần thiết cho Test Case/Rubric).
- **UC-18 – Chỉnh sửa thông tin chung:** Chỉ xử lý Tên, Đề bài, Ngôn ngữ, Độ khó, Giới hạn tài nguyên. **Không** xử lý Deadline, Test Cases, Rubric.
- **UC-19 – Xóa bài tập:** Xóa mềm / vô hiệu hóa bài tập.
- **UC-20 – Thiết lập hạn nộp:** Chỉ xử lý Deadline.
- **UC-21 – Thiết lập Test Case:** Chỉ xử lý Test Cases (Thêm, Sửa, Xóa, Sample/Hidden, Input, Output, Trọng số). Việc cấu hình Sample Test Cases không đồng nghĩa với việc cung cấp chức năng chạy thử cho Sinh viên.
- **UC-22 – Thiết lập Rubric:** Chỉ xử lý Rubric (Tiêu chí, Mô tả, Trọng số, Mức điểm).
- **UC-23 – Giao bài tập cho lớp:** Chỉ xử lý việc giao bài tập cho một hoặc nhiều lớp.

---

# XI. QUY TẮC NỘP BÀI — BẢN MỚI NHẤT

### 1. Không còn Max Submissions
- Đã loại bỏ hoàn toàn: Max Submissions, Attempt limit, Unlimited attempts, `submission_count` dùng để giới hạn số lần nộp.

### 2. Không còn Highest Score / Latest Score
- Đã loại bỏ hoàn toàn: Highest Score, Latest Score, chính sách chọn điểm giữa nhiều Submission.
- Lý do: Mỗi Sinh viên chỉ có một bản nộp chính thức hiện tại cho một bài tập.

### 3. Không còn Late Submission (Strict No-Late Submission)
- Sau Deadline:
  - Không nhận Submission mới.
  - Không nhận chỉnh sửa code.
  - Không nhận Upload file bài làm.
  - Không nhận Save / Autosave.
  - Không nhận bất kỳ request gửi code mới nào.
- Backend phải chặn request sau Deadline (trả về lỗi `403 Forbidden` / `Assignment Closed`).
- Frontend: Hiển thị "Bài tập đã đóng", vô hiệu hóa Editor, ẩn/vô hiệu hóa nút Nộp bài.

---

# XII. TRẠNG THÁI BÀI LÀM

Hệ thống sử dụng 4 trạng thái nghiệp vụ chính:

```text
DRAFT ──> SUBMITTED ──> GRADING ──> COMPLETED
```

1. **`DRAFT` (Bản nháp):**
   - Sinh viên đang làm bài trong thời gian mở bài tập ($T < T_{\text{deadline}}$).
   - Cho phép: Viết/sửa code, Upload file bài làm (UC-10), Save thủ công, Autosave tự động.
   - **Không có chức năng Chạy thử mã nguồn trên Sample Test Cases cho Sinh viên.**
   - Chưa phải bài nộp chính thức.
2. **`SUBMITTED` (Đã nộp bài):**
   - Bài đã được chốt (Read-only).
   - Không sửa code, không Upload, không Save, không Submit lại.
   - Bản Submit được giữ nguyên cho đến khi Batch Grading bắt đầu sau Deadline.
3. **`GRADING` (Đang chấm gom sau Deadline):**
   - Bài được đưa vào quy trình chấm theo đợt sau Deadline: Message Queue $\rightarrow$ Docker Sandbox execution $\rightarrow$ Hidden Test Cases $\rightarrow$ Auto-Grader $\rightarrow$ AI Review $\rightarrow$ Anti-cheat / Plagiarism Check.
4. **`COMPLETED` (Đã đánh giá tự động hoàn tất):**
   - Đã có đầy đủ: Kết quả Test Cases, điểm Auto-Grader, AI feedback, kết quả đối soát trùng lặp/đạo văn.
   - Giáo viên sử dụng các kết quả này để hỗ trợ chấm thủ công và xác nhận điểm chính thức.

---

# XIII. DRAFT & AUTOSAVE

- Trong thời gian làm bài ($T < T_{\text{deadline}}$):
  ```text
  Viết / sửa / upload code ──> Autosave / Save thủ công ──> DRAFT
  ```
- Hệ thống hỗ trợ:
  - Autosave tự động (theo chu kỳ cấu hình, ví dụ 5–10s hoặc sau 2s ngừng gõ).
  - Save thủ công ("Lưu bài làm").

---

# XIV. QUY TẮC CHẠY THỬ MÃ NGUỒN

- **Sinh viên không được Chạy thử mã nguồn trên các Sample Test Cases.**
- Không có nút / chức năng Run Code dành cho Sinh viên.
- Sinh viên chỉ viết, chỉnh sửa, Upload file bài làm, Save và Autosave code trong thời gian `DRAFT`.
- Việc thực thi mã nguồn thuộc quy trình đánh giá của hệ thống sau Deadline trong Docker Sandbox.

---

# XV. UPLOAD FILE BÀI LÀM (UC-10)

```text
File mã nguồn ──> Editor ──> DRAFT
```
- Upload không phải Submission.
- Sinh viên vẫn có thể tiếp tục chỉnh sửa sau Upload nếu Deadline chưa đến và bài vẫn ở trạng thái `DRAFT`.

---

# XVI. EXPLICIT SUBMIT (NỘP BÀI THỦ CÔNG - UC-11)

Quy trình nộp bài chủ động của Sinh viên:
1. Sinh viên chọn "Nộp bài".
2. Hệ thống kiểm tra bài còn trong thời gian nhận bài ($T < T_{\text{deadline}}$).
3. Hệ thống hiển thị popup xác nhận cảnh báo:
   > *"Sau khi nộp, bài làm sẽ bị khóa và không thể chỉnh sửa hoặc nộp lại."*
4. Sinh viên xác nhận.
5. Hệ thống lấy code `DRAFT` hiện tại.
6. Hệ thống tạo bản nộp chính thức: Chuyển `DRAFT` $\rightarrow$ `SUBMITTED`, ghi `trigger_type = MANUAL`.
7. Editor chuyển sang chế độ Read-only. Sinh viên bị khóa hoàn toàn, không được chỉnh sửa hay nộp lại.

---

# XVII. KHÔNG CHỈNH SỬA SAU SUBMIT

- Rule này là **tuyệt đối**.
- Không có setting "Cho phép chỉnh sửa sau khi nộp = Có/Không".
- Sau khi Submit: `SUBMITTED` $\rightarrow$ `LOCKED` (Không Edit, Không Upload, Không Save, Không Submit lần 2).

---

# XVIII. AUTO-SUBMIT KHI HẾT DEADLINE

Dành cho trường hợp Sinh viên chưa chủ động bấm "Nộp bài" trước thời điểm kết thúc:
- **Cơ chế:** Xử lý bằng Backend Worker / Cron Job / Scheduled Worker độc lập (không phụ thuộc vào Browser, kết nối mạng hay thiết bị của Sinh viên).
- **Quy trình:**
  1. Backend quét các bài vẫn ở trạng thái `DRAFT` của bài tập vừa hết hạn.
  2. Lấy bản Autosave / Save mới nhất được lưu trên Database / Cache.
  3. Tạo bản Submission chính thức: Chuyển `DRAFT` $\rightarrow$ `SUBMITTED`, ghi `trigger_type = AUTO_EXPIRED`.
  4. Khóa Editor trên giao diện người dùng.

---

# XIX. CHỈ GIỮ MỘT BẢN NỘP DUY NHẤT

- Mỗi cặp **(Sinh viên + Bài tập)** chỉ có **1 bản nộp chính thức hiện tại**.
- Không lưu Submission #1, Submission #2, Submission #3.
- Không có lịch sử nhiều phiên bản Submission trong phạm vi bài tập.

---

# XX. BATCH GRADING (CHẤM THEO ĐỢT SAU DEADLINE)

- Auto-Grader **không** chạy ngay khi Sinh viên bấm Submit.
- Toàn bộ bài nộp ở trạng thái `SUBMITTED` sẽ chờ đến khi Deadline đóng hoàn toàn.
- Trình tự:
  ```text
  Sinh viên Submit / Auto-submit
          ↓
      SUBMITTED
          ↓
     Chờ Deadline
          ↓
  Deadline đóng hoàn toàn
          ↓
  Chốt danh sách SUBMITTED
          ↓
    Message Queue
          ↓
       GRADING
  ```

---

# XXI. MANUAL GRADING & ĐIỂM CHÍNH THỨC (UC-27)

- Sau khi Batch Grading hoàn tất (`COMPLETED`):
  1. Giáo viên xem mã nguồn bản nộp cuối cùng (UC-24), kết quả Auto-Grader, AI Review (UC-26), Rubric, kết quả đối soát trùng lặp.
  2. Giáo viên đánh giá theo Rubric, nhập/chỉnh điểm, nhập nhận xét.
  3. Giáo viên xác nhận kết quả $\rightarrow$ Điểm chính thức (Official Score).
- `Teacher Score` $\rightarrow$ `Official Score`. Auto-Grader và AI chỉ là kết quả hỗ trợ.

---

# XXII. AI TUTOR (HẬU KIỂM SOCRATIC - UC-14)

- **AI Tutor là chức năng hậu kiểm sau đánh giá** (sau khi đã có kết quả đánh giá / công bố điểm).
- **AI Tutor không được dùng để hỗ trợ Sinh viên trong lúc đang làm bài (giai đoạn `DRAFT`).**
- Tiếp cận theo phương pháp Socratic (gợi mở, đặt câu hỏi định hướng, không đưa ngay đáp án). Context: Đề bài, code nộp cuối, Auto-Grader, AI Review, nhận xét GV, điểm chính thức.

---

# XXIII. SYSTEM ADMINISTRATION & ORGANIZATIONAL MANAGEMENT

- **UC-40:** Quản lý cấu hình AI (Tác nhân: Quản trị viên hệ thống).
- **UC-41:** Cấu hình Docker Sandbox (Tác nhân: Quản trị viên hệ thống).
- **UC-42:** Giám sát Docker Sandbox (Tác nhân: Quản trị viên hệ thống).
- **UC-43:** Quản lý tổ chức, Khoa/Bộ môn & Phân công Giáo vụ (Tác nhân: Quản trị viên).
- **UC-44:** Quản lý System Logs (Tác nhân: Quản trị viên hệ thống).
