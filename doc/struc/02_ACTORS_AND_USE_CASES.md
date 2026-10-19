# 02. ĐẶC TẢ TÁC NHÂN (ACTORS) & DANH MỤC USE CASES (UC)

---

## 1. MÔ HÌNH PHÂN QUYỀN (RBAC MATRIX)

Hệ thống được thiết kế theo mô hình **Role-Based Access Control (RBAC)** với 5 nhóm Tác nhân (Actor) chính chuẩn hóa theo [DOAN4.md](file:///d:/GITHUB/ai-coding-tutor/DOAN4.md):

| Tác nhân | Cấp độ quản trị | Phạm vi dữ liệu truy cập |
| :--- | :--- | :--- |
| **Sinh viên** | Người học (End-user) | Chỉ xem được lớp mình tham gia, bài tập được giao, bài làm và điểm của chính mình; tương tác AI Tutor hậu kiểm sau đánh giá. **Không có quyền chạy thử code trên Sample Test Cases.** |
| **Giáo viên** | Giảng viên | Đóng/mở lớp được phân công phụ trách, tạo/cấu hình bài tập, giao bài, chấm điểm thủ công, xác nhận điểm chính thức và xem toàn bộ bài nộp của học viên trong lớp. |
| **Quản trị viên** | Quản trị Nghiệp vụ Đào tạo (Toàn trường) | Quản lý tài khoản (Sinh viên/Giáo viên/Giáo vụ), quản lý lớp toàn trường (Tạo, Sửa, Đóng/Mở, Archive/Restore/Hard Delete), phân công giảng viên, quản lý cơ cấu tổ chức/Khoa/Bộ môn và phân công Giáo vụ. |
| **Giáo vụ** | Hành chính Khoa/Bộ môn | Quản lý lớp, sinh viên trong lớp và phân công giáo viên trong phạm vi Khoa/Bộ môn được phân công phụ trách. |
| **Quản trị viên hệ thống** | Quản trị Kỹ thuật Nền tảng (IT) | Quản lý cấu hình hạ tầng, AI Engine (API Key, Model), Docker Sandbox, giám sát hệ thống và System Logs. **Không quản lý nghiệp vụ lớp học hay đào tạo.** |

---

## 2. MA TRẬN PHÂN QUYỀN CHỨC NĂNG (44 USE CASES)

| Nhóm Chức Năng | Sinh viên | Giáo viên | Quản trị viên | Giáo vụ | Quản trị viên hệ thống |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Đăng nhập / Đăng xuất / Quên & Đổi mật khẩu (UC-01..03, UC-06) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Xem & Cập nhật thông tin cá nhân (UC-04, UC-05) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Viết code, Autosave nháp & Nộp bài chính thức (UC-09..11) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Tương tác AI Tutor hậu kiểm sau đánh giá (UC-14) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Xem bài đã nộp & Bảng điểm cá nhân (UC-15, UC-16) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Tạo/Sửa/Xóa bài tập & Thiết lập Test case / Rubric (UC-17..22) | ❌ | ✅ | ❌ | ❌ | ❌ |
| Giao bài tập cho lớp & Đặt Deadline (UC-23, UC-20) | ❌ | ✅ | ❌ | ❌ | ❌ |
| Xem bài nộp, Chấm thủ công & Xác nhận điểm chính thức (UC-24..27) | ❌ | ✅ | ❌ | ❌ | ❌ |
| Đóng/Mở lại lớp học (UC-36) | ❌ | ✅ (lớp phụ trách) | ✅ (toàn trường) | ✅ (Khoa/Bộ môn) | ❌ |
| Quản lý tài khoản (Tạo, Khóa, Xóa, Phân quyền, Đặt lại MK) (UC-28..32) | ❌ | ❌ | ✅ (SV/GV/Giáo vụ) | ❌ | ✅ (Cấp hệ thống) |
| Import danh sách người dùng từ Excel/CSV (5 cột) (UC-33) | ❌ | ❌ | ✅ | ❌ | ❌ |
| Quản lý lớp cấp quản trị (Tạo, Sửa) (UC-34, UC-35) | ❌ | ❌ | ✅ (toàn trường) | ✅ (Khoa/Bộ môn) | ❌ |
| Lưu trữ & Xóa lớp học (Archive/Restore/Hard Delete) (UC-37) | ❌ | ❌ | ✅ (toàn trường) | ✅ (Khoa/Bộ môn) | ❌ |
| Quản lý sinh viên trong lớp (cấp quản trị) (UC-38) | ❌ | ❌ | ✅ (toàn trường) | ✅ (Khoa/Bộ môn) | ❌ |
| Phân công giảng viên vào lớp (UC-39) | ❌ | ❌ | ✅ (toàn trường) | ✅ (Khoa/Bộ môn) | ❌ |
| Quản lý tổ chức, Khoa/Bộ môn & Phân công Giáo vụ (UC-43) | ❌ | ❌ | ✅ | ❌ | ❌ |
| Cấu hình AI Engine & Docker Sandbox (UC-40, UC-41) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Giám sát Docker Sandbox & Quản lý System Logs (UC-42, UC-44) | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 3. DANH MỤC CHI TIẾT 44 USE CASES (CHUẨN HÓA THEO DOAN4.MD)

### 3.1. Các Use Case Xác Thực & Quản Lý Tài Khoản Chung (6 UC)
| Mã UC | Tên Use Case | Tác nhân | Mô tả vắn tắt |
| :--- | :--- | :--- | :--- |
| **UC-01** | Đăng nhập | Người dùng | Xác thực tài khoản bằng Email và Mật khẩu, cấp JWT token (access/refresh). Bắt buộc đổi mật khẩu nếu dùng mật khẩu tạm. |
| **UC-02** | Đăng xuất | Người dùng | Kết thúc phiên làm việc, thu hồi refresh_token và xóa token trên client. |
| **UC-03** | Quên mật khẩu | Người dùng | Gửi mã OTP/Link xác thực qua email để đặt lại mật khẩu mới. Vô hiệu hóa mã/link sau khi sử dụng. |
| **UC-04** | Xem thông tin cá nhân | Người dùng | Hiển thị hồ sơ: Họ tên, Email, Số điện thoại, Ảnh đại diện, Vai trò. |
| **UC-05** | Cập nhật thông tin cá nhân | Người dùng | Cho phép cập nhật họ tên, số điện thoại, ảnh đại diện. |
| **UC-06** | Đổi mật khẩu | Người dùng | Thay đổi mật khẩu tài khoản sau khi xác thực mật khẩu hiện tại. Mật khẩu mới phải khác mật khẩu cũ. |

---

### 3.2. Phân Hệ Sinh Viên (10 Use Cases)
| Mã UC | Tên Use Case | Tác nhân | Mô tả vắn tắt |
| :--- | :--- | :--- | :--- |
| **UC-07** | Xem danh sách bài tập | Sinh viên | Xem danh sách bài tập được giao theo lớp, hiển thị Deadline, trạng thái (DRAFT, SUBMITTED, GRADING, COMPLETED) và điểm chính thức nếu có. |
| **UC-08** | Xem chi tiết bài tập | Sinh viên | Xem đề bài (Markdown/LaTeX), yêu cầu I/O, ràng buộc, Time/Memory Limit, Sample Test Cases và Rubric. |
| **UC-09** | Viết code | Sinh viên | Soạn thảo mã nguồn trên Monaco Editor với Autosave/Save lưu vào bản nháp `DRAFT`. Không có chức năng chạy thử trên Sample Tests. |
| **UC-10** | Upload file bài làm | Sinh viên | Nạp file mã nguồn từ máy tính vào editor và lưu vào `DRAFT`. Không tạo Submission. |
| **UC-11** | Nộp bài | Sinh viên | Explicit Submit với popup xác nhận cảnh báo $\rightarrow$ chuyển sang `SUBMITTED`, `trigger_type = MANUAL`, khóa Read-only. Auto-submit khi hết giờ lấy bản draft mới nhất $\rightarrow$ `SUBMITTED`, `trigger_type = AUTO_EXPIRED`. Strict No-Late sau Deadline. Chờ Batch Grading sau Deadline. |
| **UC-12** | Xem kết quả Auto-Grader | Sinh viên | Xem kết quả kiểm thử sau Batch Grading (COMPLETED): điểm Auto-Grader, trạng thái test cases (Input/Output của Hidden Test Cases được bảo mật). |
| **UC-13** | Xem nhận xét AI | Sinh viên | Xem phản hồi AI Review về Code Quality, Complexity, Code Style, giải thích lỗi và đề xuất cải thiện. |
| **UC-14** | Tương tác với AI Tutor | Sinh viên | Tương tác hậu kiểm sau đánh giá theo phương pháp Socratic (hỏi mở, định hướng, không đưa code giải sẵn). Context: Đề bài, code nộp cuối, kết quả Auto-Grader, AI Review, nhận xét GV, điểm chính thức. |
| **UC-15** | Xem bài đã nộp | Sinh viên | Xem bản nộp chính thức duy nhất của mình cho bài tập (mã nguồn, thời điểm nộp, trigger_type, trạng thái). |
| **UC-16** | Xem bảng điểm cá nhân | Sinh viên | Tổng hợp điểm các bài tập và lớp học. Điểm chính thức do Giáo viên xác nhận; điểm Auto-Grader tạm tính khi chưa có điểm GV. |

---

### 3.3. Phân Hệ Giáo Viên (11 Use Cases)
| Mã UC | Tên Use Case | Tác nhân | Mô tả vắn tắt |
| :--- | :--- | :--- | :--- |
| **UC-17** | Tạo bài tập | Giáo viên | Tạo bài tập mới và cấu hình ban đầu: Tên bài, mô tả, thời hạn, tiêu chí chấm điểm và trọng số. |
| **UC-18** | Chỉnh sửa thông tin chung bài tập | Giáo viên | Cập nhật Tên, Đề bài, Ngôn ngữ, Mức độ khó, Giới hạn tài nguyên. Không sửa Deadline, Test Case, Rubric. |
| **UC-19** | Xóa bài tập | Giáo viên | Xóa mềm / vô hiệu hóa bài tập để bảo toàn dữ liệu học tập. |
| **UC-20** | Thiết lập hạn nộp bài | Giáo viên | Thiết lập / điều chỉnh thời hạn nộp bài (Deadline) cho bài tập đã tạo. |
| **UC-21** | Thiết lập test case | Giáo viên | Quản lý bộ Test Cases (Sample/Hidden, Input, Output mong đợi, Trọng số điểm). Sample Test Cases không dùng để chạy thử cho SV. |
| **UC-22** | Thiết lập rubric | Giáo viên | Quản lý bộ tiêu chí và mức điểm đánh giá (Rubric). Correctness do hệ thống tự tính từ Test Case. |
| **UC-23** | Giao bài tập cho lớp | Giáo viên | Giao bài tập đã có cho một hoặc nhiều lớp học phụ trách đang ở trạng thái Hoạt động. |
| **UC-24** | Xem bài nộp | Giáo viên | Xem thông tin và kết quả bài nộp chính thức của sinh viên theo từng bài tập. |
| **UC-25** | Xem điểm | Giáo viên | Xem điểm và kết quả đánh giá bài làm của sinh viên đối với các bài tập đã giao. |
| **UC-26** | Xem AI đánh giá | Giáo viên | Xem kết quả phân tích và đánh giá bài nộp do hệ thống AI thực hiện nhằm hỗ trợ quá trình chấm bài. |
| **UC-27** | Đánh giá/chấm bài thủ công | Giáo viên | Đánh giá theo Rubric, nhập điểm/nhận xét, lưu bản tạm và xác nhận Điểm chính thức (Official Score). |

---

### 3.4. Phân Hệ Quản Trị Viên & Giáo Vụ (12 Use Cases)
| Mã UC | Tên Use Case | Tác nhân | Mô tả vắn tắt |
| :--- | :--- | :--- | :--- |
| **UC-28** | Tạo tài khoản người dùng | Quản trị viên | Tạo tài khoản Sinh viên, Giáo viên hoặc Giáo vụ; sinh mật khẩu tạm, bắt buộc đổi lần đầu, gửi email. |
| **UC-29** | Khóa/mở tài khoản | Quản trị viên | Khóa hoặc mở khóa tài khoản Sinh viên, Giáo viên, Giáo vụ; thu hồi phiên làm việc khi khóa. |
| **UC-30** | Xóa tài khoản | Quản trị viên | Xóa tài khoản người dùng; chuyển sang cơ chế xóa mềm (Soft Delete) nếu có dữ liệu bài nộp/điểm số. |
| **UC-31** | Phân quyền người dùng | Quản trị viên | Phân công hoặc thay đổi vai trò và quyền nghiệp vụ cho Sinh viên, Giáo viên, Giáo vụ trong toàn trường. |
| **UC-32** | Đặt lại mật khẩu | Quản trị viên | Tự sinh mật khẩu tạm mới, băm lưu CSDL, gửi email, bắt buộc đổi mật khẩu và thu hồi các phiên đăng nhập. |
| **UC-33** | Nhập danh sách từ Excel/CSV | Quản trị viên | Import danh sách người dùng từ tệp Excel/CSV 5 cột bắt buộc; hỗ trợ xem trước và xử lý lỗi từng bản ghi. |
| **UC-34** | Tạo lớp | Quản trị viên, Giáo vụ | Quản trị viên tạo lớp toàn trường; Giáo vụ tạo lớp trong phạm vi Khoa/Bộ môn được phân công phụ trách. |
| **UC-35** | Chỉnh sửa lớp | Quản trị viên, Giáo vụ | Quản trị viên chỉnh sửa lớp toàn trường; Giáo vụ chỉnh sửa lớp thuộc Khoa/Bộ môn phụ trách (lớp đang Hoạt động). |
| **UC-36** | Đóng/ Mở lại lớp học | Giáo viên, Quản trị viên, Giáo vụ | Đóng hoặc mở lại lớp học theo đúng phạm vi quản lý (GV: lớp phụ trách; Giáo vụ: Khoa/Bộ môn; QTV: toàn trường). |
| **UC-37** | Quản lý Lưu trữ, Khôi phục & Xóa lớp học | Quản trị viên, Giáo vụ | Lưu trữ (Đã đóng $\rightarrow$ Lưu trữ), Khôi phục (Lưu trữ $\rightarrow$ Đã đóng), Hard Delete (chỉ khi 0 SV và 0 bài tập). |
| **UC-38** | Quản lý sinh viên trong lớp | Quản trị viên, Giáo vụ | Thêm, xóa và xem thông tin sinh viên trong lớp theo đúng phạm vi quyền (lớp đang Hoạt động). |
| **UC-39** | Phân công Giáo viên vào lớp | Quản trị viên, Giáo vụ | Phân công một hoặc nhiều Giáo viên phụ trách giảng dạy cho lớp theo đúng phạm vi quản lý. |

---

### 3.5. Phân Hệ Quản Trị Hệ Thống & Tổ Chức (5 Use Cases)
| Mã UC | Tên Use Case | Tác nhân | Mô tả vắn tắt |
| :--- | :--- | :--- | :--- |
| **UC-40** | Quản lý cấu hình AI | Quản trị viên hệ thống | Thiết lập, cập nhật, kích hoạt/vô hiệu hóa và kiểm tra cấu hình AI (API Key, Model, Timeout). |
| **UC-41** | Cấu hình Docker Sandbox | Quản trị viên hệ thống | Cấu hình tham số môi trường Docker Sandbox, giới hạn CPU, RAM, thời gian chạy và base images. |
| **UC-42** | Giám sát Docker Sandbox | Quản trị viên hệ thống | Theo dõi trạng thái hoạt động, tài nguyên, phiên thực thi, dừng phiên và xem nhật ký Docker Sandbox. |
| **UC-43** | Quản lý tổ chức, Khoa/Bộ môn & Phân công Giáo vụ | Quản trị viên | Quản lý tổ chức, cơ cấu Khoa/Bộ môn trực thuộc, và phân công tài khoản Giáo vụ phụ trách Khoa/Bộ môn. |
| **UC-44** | Quản lý System Logs | Quản trị viên hệ thống | Xem, tìm kiếm, lọc, xem chi tiết và xuất System Logs toàn hệ thống phục vụ giám sát và xử lý sự cố. |
