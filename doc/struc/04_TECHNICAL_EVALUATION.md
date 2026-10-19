# 04. ĐÁNH GIÁ KỸ THUẬT & KHUYẾN NGHỊ TỐI ƯU (TECHNICAL EVALUATION)

---

## 1. PHÂN TÍCH CÁC ĐIỂM NGHẼN KỸ THUẬT (CRITICAL BOTTLENECKS)

### 1.1. Điểm Nghẽn Đồng Thời Khi Chấm Bài (Submission Concurrency)
- **Bản chất vấn đề**: Vào thời điểm sát hạn nộp bài (Deadline Peak), có thể xuất hiện hàng trăm lượt bấm "Nộp bài" trong cùng một phút.
  - Việc biên dịch/thực thi code trong Docker Sandbox tiêu tốn từ **1.5s - 4.0s / submission**.
  - Việc gọi AI LLM để đánh giá và tạo nhận xét tiêu tốn từ **2.0s - 6.0s / submission**.
  - Nếu xử lý đồng bộ (Synchronous HTTP Request), hệ thống sẽ cạn kiệt Connection Pool của Database và Thread Pool của Web Server, dẫn đến lỗi `504 Gateway Timeout` hoặc làm sập API Server.

> [!IMPORTANT]
> **Khuyến nghị kiến trúc (Async Job Queue)**:
> 1. Bắt buộc tách luồng nộp bài thành **Asynchronous Pipeline** sử dụng **Redis Queue + Celery Workers**.
> 2. Web API chỉ làm nhiệm vụ ghi nhận submission (`status: PENDING`), đẩy payload vào Redis và trả về kết quả ngay lập tức trong `< 50ms`.
> 3. Cụm Grader Workers lấy từng job ra xử lý độc lập, sau đó cập nhật kết quả vào DB và thông báo realtime cho Client qua **WebSocket / Server-Sent Events (SSE)**.

```
Client (Bấm Nộp) ────► API Server (Lưu Pending) ────► Đẩy vào Redis Queue (50ms)
                                                               │
                                                               ▼
                                                      Celery Grader Workers
                                                               │
                                         ┌─────────────────────┴─────────────────────┐
                                         ▼                                           ▼
                              Docker Sandbox (Run tests)                    AI LLM Review Engine
                                         │                                           │
                                         └─────────────────────┬─────────────────────┘
                                                               │
                                                               ▼
                                                      Lưu DB & Bắn WebSocket
```

---

## 2. BẢO MẬT DOCKER SANDBOX (ISOLATION & SECURITY GUARDRAILS)

Hệ thống cho phép người dùng nộp mã nguồn tùy ý, do đó nguy cơ bị tấn công thực thi mã độc từ xa (Remote Code Execution - RCE) hoặc chiếm quyền kiểm soát máy chủ là rất lớn.

### 2.1. Các Mối Đe Dọa Phổ Biến & Giải Pháp Khắc Phục

| Mối đe dọa (Threat) | Hành vi nguy hiểm | Giải pháp bảo mật (Security Policy) |
| :--- | :--- | :--- |
| **Vòng lặp vô hạn (Infinite Loop)** | `while(true)` làm treo CPU máy chủ | Cài đặt **Hard Timeout** (ví dụ: `subprocess.run(timeout=3)`) và tự động kill process. |
| **Tràn bộ nhớ (Memory Exhaustion)** | Khởi tạo mảng khổng lồ làm sập RAM | Giới hạn dung lượng RAM tối đa cho container: `--memory="256m" --memory-swap="256m"`. |
| **Fork Bomb (Cạn kiệt Process)** | Gọi đệ quy sinh ra hàng nghìn tiến trình con | Giới hạn số lượng Process ID: `--pids-limit 64`. |
| **Tấn công Mạng (Network Attack)** | Tải mã độc từ internet, gửi spam, DDoS | Ngắt hoàn toàn card mạng của container: `--network none`. |
| **Xâm nhập File Hệ Thống** | Đọc file cấu hình `/etc/passwd`, ghi đè root | Gắn cờ hệ thống file chỉ đọc: `--read-only`, chỉ mount thư mục `/tmp` dạng `tmpfs`. |
| **Leo thang đặc quyền (Privilege Escalation)** | Lợi dụng lỗ hổng kernel để chiếm quyền root | Chạy container dưới user phi đặc quyền: `USER runner (UID 1001)`. Không dùng `--privileged`. |

### 2.2. Lệnh Khởi Chạy Container Sandbox Chuẩn An Toàn
```bash
docker run --rm \
  --network none \
  --cpus="1.0" \
  --memory="256m" \
  --memory-swap="256m" \
  --pids-limit 64 \
  --read-only \
  --tmpfs /tmp:rw,size=64m \
  -v /path/to/solution.py:/sandbox/solution.py:ro \
  sandbox-python:latest \
  python3 /sandbox/solution.py < /path/to/input.txt
```

---

## 3. THIẾT KẾ TRỢ GIẢNG AI (SOCRATIC PROMPT & PEDAGOGICAL GUARDRAILS)

### 3.1. Thách Thức Về Mặt Sư Phạm
Nếu AI cung cấp trực tiếp code hoàn chỉnh hoặc giải hộ bài toán, sinh viên sẽ không rèn luyện được tư duy thuật toán và kỹ năng gỡ lỗi (debugging).

### 3.2. Cấu Trúc Prompt Chuẩn Cho AI Reviewer & AI Tutor

```text
[SYSTEM PROMPT]
Bạn là Trợ Giảng Lập Trình Thông Minh (AI Coding Tutor).
Nhiệm vụ của bạn là hỗ trợ sinh viên học tập theo PHƯƠNG PHÁP SOCRATIC (Gợi mở tư duy).

CÁC NGUYÊN TẮC BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG cung cấp toàn bộ mã nguồn bài giải hoặc sửa trực tiếp code cho sinh viên.
2. Dựa vào Execution Evidence (kết quả test case đúng/sai, lỗi runtime) và Code của sinh viên để chỉ ra:
   - Dòng code hoặc khối logic đang gặp vấn đề.
   - Trường hợp biên (Edge case) mà code chưa xử lý (ví dụ: mảng rỗng, n=0, số âm).
3. Đặt từ 1 đến 2 câu hỏi định hướng để sinh viên tự suy nghĩ và tự sửa bài.
4. Đánh giá độ phức tạp thời gian O(n) và gợi ý cấu trúc dữ liệu phù hợp nếu thuật toán hiện tại chưa tối ưu.
5. Luôn giữ phong cách giao tiếp tích cực, khuyến khích và mang tính sư phạm.

[INPUT CONTEXT]
- Problem Title: {problem_title}
- Problem Description: {problem_description}
- Student Code: {student_code}
- Execution Results: {execution_summary} (Passed {passed}/{total} tests, Failed on Test #{first_failed_test_id})
- Static Analysis: Cyclomatic Complexity = {complexity_score}, Code Smells = {code_smells}
```

---

## 4. TỐI ƯU CHI PHÍ TOKEN & TỐC ĐỘ PHẢN HỒI CỦA AI (LLM OPTIMIZATION)

1. **Phân Tầng Mô Hình (Model Tiering)**:
   - Sử dụng **Model nhẹ, tốc độ cao, chi phí thấp (Gemini 1.5 Flash / GPT-4o-mini)** cho việc chấm bài hàng loạt và tương tác AI Chat thông thường.
   - Chỉ kích hoạt **Model mạnh (Gemini 1.5 Pro / Claude 3.5 Sonnet)** khi giảng viên yêu cầu phân tích sâu mã nguồn phức tạp hoặc đề thi học thuật.
2. **Context Compression (Tối ưu độ dài Prompt)**:
   - Không gửi toàn bộ 50 Test Cases vào prompt của AI. Chỉ gửi tóm tắt: *"Đạt 8/10 test cases, thất bại tại Test 9 (Input độ dài lớn, kết quả bị Time Limit Exceeded)"*.
3. **Caching Phổ Biến**:
   - Đối với cùng một đề bài và lỗi phổ biến (ví dụ lỗi sai chỉ số mảng `IndexError`), lưu cache phản hồi của AI vào Redis để giảm thiểu việc gọi lặp lại LLM API.

---

## 5. CƠ CHẾ TEST CASE: STANDARD I/O VS UNIT TEST

| Tiêu chí | Standard I/O (Stdin / Stdout) | Unit Testing (pytest / GoogleTest) |
| :--- | :--- | :--- |
| **Cơ chế hoạt động** | Đọc dữ liệu từ `sys.stdin`, in kết quả ra `sys.stdout`. So sánh chuỗi (String diff). | Import hàm của sinh viên vào file test suite, gọi hàm và kiểm tra `assert`. |
| **Ưu điểm** | Độc lập ngôn ngữ, cực kỳ dễ tạo đề bài và import test cases từ các nền tảng LeetCode, Codeforces. | Bắt được lỗi chi tiết của từng hàm, kiểm tra được kiểu dữ liệu trả về chính xác. |
| **Khuyến nghị cho dự án** | **Ưu tiên Standard I/O cho giai đoạn MVP** vì tính linh hoạt và dễ cấu hình cho nhiều ngôn ngữ. Có thể mở rộng Unit Test ở các học phần Lập trình Hướng đối tượng nâng cao. |
