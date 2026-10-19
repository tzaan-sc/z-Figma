# TỔNG HỢP TOÀN DIỆN: ĐỊNH HƯỚNG AI, RAG, NÂNG CẤP & CHIẾN LƯỢC TRIỂN KHAI
# (COMPREHENSIVE STRATEGY: AI-FIRST, RAG TAXONOMY, TECH STACK & 0-COST ROADMAP)

> **Tài liệu tổng hợp toàn bộ các quyết định kỹ thuật, kiến trúc AI, kho tri thức RAG, phân tích chi phí và 2 chiến lược phân chia giai đoạn triển khai (Core-First & AI-First) cho Đề tài: Nền tảng Đánh giá Code và Trợ giảng Ảo (AI-Powered Coding Tutor & Auto-Grader).**

---

## 📑 MỤC LỤC
1. [Phân Tích Sự Phù Hợp Với Gợi Ý Của Giảng Viên Hướng Dẫn](#1-phân-tích-sự-phù-hợp-với-gợi-ý-của-giảng-viên-hướng-dẫn)
2. [Bảng Phân Tích Chi Phí Triển Khai (Hoàn Toàn 0 Đồng)](#2-bảng-phân-tích-chi-phí-triển-khai-hoàn-toàn-0-đồng)
3. [Bản Chất RAG & Cấu Trúc Kho Tri Thức Thực Tế (RAG Knowledge Taxonomy)](#3-bản-chất-rag--cấu-trúc-kho-tri-thức-thực-tế-rag-knowledge-taxonomy)
4. [Tác Động Nghiệp Vụ (Use Cases & Business Rules)](#4-tác-động-nghiệp-vụ-use-cases--business-rules)
5. [So Sánh 2 Chiến Lược Triển Khai Trong 4 Tuần (03/10 - 31/10/2026)](#5-so-sánh-2-chiến-lược-triển-khai-trong-4-tuần-0310---31102026)
   - [5.1. Chiến Lược 1: "Chạy Lõi Trước $\rightarrow$ Thông Minh Hóa Sau" (Core-First)](#51-chiến-lược-1-chạy-lõi-trước--thông-minh-hóa-sau-core-first)
   - [5.2. Chiến Lược 2: "AI-First & RAG-Centric" (Khuyên Dùng Cho Đồ Án AI)](#52-chiến-lược-2-ai-first--rag-centric-khuyên-dùng-cho-đồ-án-ai)
   - [5.3. Kế Hoạch Hành Động Chi Tiết Bắt Đầu Ngay (Tuần 1 AI-First)](#53-kế-hoạch-hành-động-chi-tiết-bắt-đầu-ngay-tuần-1-ai-first)
6. [Bản Báo Cáo Tiến Độ Chuẩn Gửi Giảng Viên Hướng Dẫn](#6-bản-báo-cáo-tiến-độ-chuẩn-gửi-giảng-viên-hướng-dẫn)

---

## 1. PHÂN TÍCH SỰ PHÙ HỢP VỚI GỢI Ý CỦA GIẢNG VIÊN HƯỚNG DẪN

### 1.1. Yêu cầu gợi ý từ Giảng viên:
> *"Người dùng nộp mã nguồn trực tiếp trên web. Thay vì chỉ chạy test case thông thường, AI (tích hợp LLMs) sẽ đọc hiểu code, phân tích độ phức tạp thuật toán, phát hiện các lỗi bảo mật tiềm ẩn, chấm điểm phong cách lập trình (clean code) và đưa ra các gợi ý tối ưu hóa chi tiết như một trợ giảng."*
> 
> **Công nghệ đề xuất:** Next.js, Docker Sandbox, LangChain, OpenAI API hoặc mô hình mã nguồn mở cục bộ (Llama/Mistral).

### 1.2. Bảng đối chiếu kỹ thuật:

| Yêu cầu của Cô | Thiết kế hệ thống của Nhóm | Đánh giá độ phù hợp |
| :--- | :--- | :---: |
| **Nộp mã nguồn trên web** | Web IDE tích hợp **Monaco Editor** trên Next.js 14 App Router | ✅ **Hoàn toàn phù hợp** |
| **Docker Sandbox** | Môi trường container cô lập an toàn (`--network none`, non-root, limit RAM/CPU) | ✅ **Hoàn toàn phù hợp** |
| **AI đọc hiểu code** | Tích hợp LLM API (Google Gemini 1.5 Flash + OpenAI GPT-4o-mini fallback) | ✅ **Hoàn toàn phù hợp** |
| **Phân tích độ phức tạp** | Phân tích tĩnh (`radon`, `ast`) kết hợp LLM để đo Cyclomatic Complexity & Big-O | ✅ **Hoàn toàn phù hợp** |
| **Chấm clean code** | Static Analyzer (`flake8`, PEP8) kết hợp AI Code Quality Review | ✅ **Hoàn toàn phù hợp** |
| **Gợi ý tối ưu hóa sư phạm** | Khung chat **Socratic AI Tutor** (gợi mở tư duy, không giải hộ mã nguồn) | ✅ **Hoàn toàn phù hợp** |
| **Phát hiện lỗi bảo mật** | Bổ sung module **AI-based Security Analysis** quét CWE Top 25 & OWASP | ✅ **Đã tích hợp nâng cấp** |
| **LangChain** | Sử dụng LangChain làm framework điều phối Prompt Template & Output Parser | ✅ **Đã sẵn sàng tích hợp** |
| **Local Models (Llama/Mistral)** | Hỗ trợ cấu hình Local LLM thông qua **Ollama** trong Docker Compose | ✅ **Đã sẵn sàng tích hợp** |

---

## 2. BẢNG PHÂN TÍCH CHI PHÍ TRIỂN KHAI (HOÀN TOÀN 0 ĐỒNG)

Toàn bộ hệ thống từ **Lõi MVP** đến **Tất cả các gói nâng cấp mở rộng (Security, LangChain, Ollama, RAG)** đều vận hành với **chi phí 0 đồng (100% Free)**:

| Thành phần / Hạng mục | Chi phí | Nguồn cung cấp / Cơ chế vận hành |
| :--- | :---: | :--- |
| **Google Gemini API (Lõi AI chính)** | **0 ĐỒNG** | Google AI Studio cung cấp gói **Free Tier vĩnh viễn** cho `Gemini 1.5/2.0 Flash`: <br>• **15 RPM** (15 lượt gọi/phút), **1.500 RPD** (1.500 lượt gọi/ngày).<br>• Hoàn toàn miễn phí, không cần nhập thẻ Visa/Mastercard. Quá đủ cho đồ án làm bài và demo. |
| **Phát hiện Lỗ hổng Bảo mật (AI Security)** | **0 ĐỒNG** | Tích hợp vào System Prompt của Gemini Flash, chạy chung lượt gọi API với AI Review $\rightarrow$ nằm trọn trong gói 1.500 lượt Free/ngày. |
| **Thư viện LangChain** | **0 ĐỒNG** | Thư viện mã nguồn mở (`pip install langchain`), miễn phí trọn đời. |
| **Local Models (Llama 3.1 / Mistral qua Ollama)** | **0 ĐỒNG** | Công cụ Ollama và các model mở (Llama 3.1 8B, Mistral 7B) tải về máy chạy offline, không tốn bất kỳ phí bản quyền hay phí API nào. |
| **Hệ thống RAG (Vector DB + Embeddings)** | **0 ĐỒNG** | • Vector DB (ChromaDB / PostgreSQL pgvector): Chạy container local miễn phí.<br>• Embedding Model: Dùng `sentence-transformers` (chạy local trên CPU) hoặc `text-embedding-004` (Google Free Tier). |
| **Hạ tầng Docker, PostgreSQL, Redis, Next.js** | **0 ĐỒNG** | Toàn bộ stack phần mềm đều là mã nguồn mở chạy local. |
| **OpenAI API (GPT-4o-mini - Fallback)** | *0đ - Tùy chọn* | Chỉ dùng làm kênh dự phòng khẩn cấp khi Gemini mất mạng. (Nếu chỉ dùng Gemini Free Tier thì không cần kích hoạt). |

---

## 3. BẢN CHẤT RAG & CẤU TRÚC KHO TRI THỨC THỰC TẾ (RAG KNOWLEDGE TAXONOMY)

### 3.1. Bản chất của RAG trong hệ thống này:
* **Không phải đi cào dữ liệu khổng lồ (Big Data) hay huấn luyện lại mô hình (Training).**
* RAG là kỹ thuật **"Cung cấp sách tham khảo chuẩn cho AI tra cứu trước khi trả lời"**:
  1. Nạp sẵn tài liệu giáo trình, chuẩn phong cách code và cẩm nang lỗi vào Vector Database (ChromaDB).
  2. Khi sinh viên gặp lỗi hoặc đặt câu hỏi $\rightarrow$ Hệ thống tự động **truy xuất (Retrieve)** đúng đoạn tài liệu liên quan nhất.
  3. AI đọc tài liệu đó cùng với mã nguồn của sinh viên để đưa ra lời khuyên chuẩn xác 100% theo giáo trình của trường, loại bỏ hoàn toàn hiện tượng "ảo giác" (hallucination).

### 3.2. Sơ đồ phân loại Kho Tri thức 2 Chiều:

```text
                                  KHO TRI THỨC RAG (CHROMADB)
                                                 │
          ┌──────────────────────────┬───────────┴──────────┬──────────────────────────┐
          ▼                          ▼                      ▼                          ▼
     [PYTHON]                      [C++]                  [JAVA]                 [JAVASCRIPT]
     • PEP 8 & Idioms              • STL & Templates      • Collections & OOP        • ES6+ & Async
     • AST & Memory                • Con trỏ & Memory     • Exception Handling       • Closures & V8
     • 300+ Error Patterns         • 250+ Error Patterns  • 200+ Error Patterns      • 200+ Error Patterns
          │                          │                      │                          │
          └──────────────────────────┼──────────────────────┴──────────────────────────┘
                                     ▼
                     [6 MẢNG CHUYÊN MÔN DÙNG CHUNG / MỞ RỘNG]
      1. Cấu trúc Dữ liệu & Thuật toán (DSA)  │  4. Debugging & Error Diagnostics
      2. Clean Code & Code Smells             │  5. An toàn Lập trình (Secure Coding - CWE)
      3. Phân tích Độ phức tạp (Big-O)        │  6. Thư viện Gợi ý Sư phạm Socratic
```

### 3.3. Quy mô dữ liệu mục tiêu:
* **Tổng số lượng tài liệu:** Khoảng 350 – 500 tài liệu tuyển chọn $\approx$ **5.000 – 8.000 chunks vector**.
* **Dung lượng Vector DB:** Khoảng **150MB – 300MB** (cực kỳ nhẹ, ChromaDB xử lý truy vấn trong < 20ms).
* **Cấu trúc Metadata Tagging bắt buộc** (đảm bảo không bao giờ tìm nhầm chéo ngôn ngữ):
  ```json
  {
    "document_id": "DSA_PY_BIN_SEARCH_001",
    "language": "python",
    "domain": "data_structures_and_algorithms",
    "topic": "binary_search",
    "error_type": "infinite_loop_tle",
    "difficulty": "medium",
    "source": "BK_DSA_Curriculum"
  }
  ```

---

## 4. TÁC ĐỘNG NGHIỆP VỤ (USE CASES & BUSINESS RULES)

> [!IMPORTANT]
> **KẾT LUẬN: CÁC NÂNG CẤP TRÊN KHÔNG LÀM THAY ĐỔI 44 USE CASES VÀ BUSINESS RULES HIỆN TẠI.**

1. **Giữ nguyên 100% các nguyên tắc cốt lõi theo [RULES.md](file:///D:/GITHUB/ai-coding-tutor/RULES.md) và [nopbai.md](file:///D:/GITHUB/ai-coding-tutor/nopbai.md):**
   * Sinh viên làm bài trên Monaco Editor, nộp 1 bản chính thức duy nhất, khóa Read-only (không có chức năng chạy thử trước deadline).
   * Server-side Auto-submit tự động khi hết giờ deadline.
   * Batch Grading tập trung sau deadline bằng Docker Sandbox để tính điểm chính thức (`Official Score`).
   * AI chỉ đóng vai trò phân tích và hỗ trợ sư phạm, **tuyệt đối không can thiệp hay thay đổi điểm số chính thức**.
2. **Nâng cấp chiều sâu cho 3 Use Case đã có:**
   * **`UC-13` (Xem nhận xét AI) & `UC-26` (Xem AI đánh giá):** Bổ sung thêm thẻ **"Cảnh báo Lỗ hổng Bảo mật"** (SQL injection, buffer overflow, hardcoded secrets...) bên cạnh Clean Code và Big-O.
   * **`UC-14` (Tương tác với AI Tutor):** Kết nối RAG để AI trích dẫn đúng bài học/giáo trình khi định hướng Socratic cho sinh viên.
   * **`UC-40` (Quản lý cấu hình AI):** Quản trị viên hệ thống có thể chọn Provider giữa *Gemini Flash*, *OpenAI* hoặc *Local Ollama*.

---

## 5. SO SÁNH 2 CHIẾN LƯỢC TRIỂN KHAI TRONG 4 TUẦN (03/10 - 31/10/2026)

### 5.1. Chiến Lược 1: "Chạy Lõi Trước $\rightarrow$ Thông Minh Hóa Sau" (Core-First)

🎯 **Nguyên tắc:** Dựng luồng chấm bài cơ bản trước, sau đó mới lắp AI vào.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ TUẦN 1 (03/10 - 09/10): LÕI CHẤM BÀI (EXECUTION & GRADING CORE)             │
│ • Database Schema + Auth JWT + Docker Sandbox + Auto-Grader + Monaco IDE    │
│ 🎯 Kết quả: Sinh viên nộp code -> Docker Sandbox chạy thật -> Chấm điểm thật│
├─────────────────────────────────────────────────────────────────────────────┤
│ TUẦN 2 (10/10 - 16/10): TRÍ TUỆ NHÂN TẠO & KHO TRI THỨC (AI + RAG CORE)    │
│ • ContextBuilder + ChromaDB Vector Store + Nạp dữ liệu DSA/Lỗi/Bảo mật      │
│ • Tích hợp Gemini Flash/LangChain -> AI Review + AI Tutor Socratic          │
│ 🎯 Kết quả: AI phân tích code, phát hiện lỗi bảo mật, hỏi đáp theo giáo trình│
├─────────────────────────────────────────────────────────────────────────────┤
│ TUẦN 3 (17/10 - 23/10): NGHIỆP VỤ ĐÀO TẠO & PHÂN QUYỀN (PORTAL SUITE)       │
│ • Phân quyền 5 Actors (RBAC) + Quản lý bài tập & Test Cases + Quản lý lớp   │
│ • Giao bài, Chấm bài thủ công theo Rubric, Xác nhận điểm chính thức         │
│ 🎯 Kết quả: Giáo viên giao bài cho lớp, chấm điểm và quản lý lớp học mượt mà│
├─────────────────────────────────────────────────────────────────────────────┤
│ TUẦN 4 (24/10 - 31/10): SUITE HỆ THỐNG, KIỂM THỬ TẢI & BÀN GIAO PRODUCTION │
│ • Import Excel 5 cột + Giám sát Sandbox + System Logs + Load Testing        │
│ • Đóng gói 1-lệnh Docker Compose, tài liệu hướng dẫn và Slide báo cáo       │
│ 🎯 Kết quả: Bàn giao sản phẩm v1.0.0 hoàn chỉnh 100% để bảo vệ đồ án        │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Chi tiết phân công công việc Chiến lược 1:
* **🟢 TUẦN 1 (03/10 – 09/10): DỰNG LÕI HỆ THỐNG & CHẤM ĐIỂM TỰ ĐỘNG**
  * **Người A (Backend & DevOps/Sandbox):**
    * Ngày 1-2 (03-04/10): Viết Database Models (SQLAlchemy + Alembic) cho Users, Problems, TestCases, Submissions.
    * Ngày 3 (05/10): Viết Auth API (JWT Login/Logout/Refresh Token).
    * Ngày 4-5 (06-07/10): Xây dựng Docker Sandbox Runner cô lập (áp dụng giới hạn CPU, RAM 256MB, ngắt mạng `--network none`, non-root user) cho Python và C++.
    * Ngày 6-7 (08-09/10): Kết nối Hàng đợi Redis/Celery $\rightarrow$ Chạy test cases $\rightarrow$ Auto-Grader tính điểm `auto_score`.
  * **Người B (Frontend & IDE):**
    * Ngày 1-3 (03-05/10): Dựng UI Atoms, trang Login, Layout App.
    * Ngày 4-5 (06-07/10): Tích hợp trình soạn thảo Monaco Editor (Autosave nháp, Upload tệp, chế độ Read-only khi nộp).
    * Ngày 6-7 (08-09/10): Trang xem chi tiết đề bài + Result View hiển thị kết quả kiểm thử (AC, WA, TLE, CE).
  * 🏆 *Nghiệm thu Milestone 1 (09/10):* Sinh viên đăng nhập $\rightarrow$ làm bài $\rightarrow$ nộp $\rightarrow$ nhận điểm từ Docker Sandbox.

* **🔵 TUẦN 2 (10/10 – 16/10): TÍCH HỢP TRÍ TUỆ NHÂN TẠO & RAG TRI THỨC**
  * **Người A (Backend & AI Pipelines):**
    * Ngày 8-9 (10-11/10): Xây dựng ContextBuilder (gom đề bài, code sinh viên, compiler error, phân tích tĩnh AST/Flake8).
    * Ngày 10-11 (12-13/10): Dựng Vector Database ChromaDB local + script nạp dữ liệu tri thức (`knowledge_base/` gồm DSA, 50+ mẫu lỗi, Clean code, CWE bảo mật).
    * Ngày 12-14 (14-16/10): Kết nối LLM API (Google Gemini 1.5 Flash Free) qua LangChain / Direct API, cấu hình Prompt Socratic và Pydantic Schema cho AI Review (UC-13) và AI Tutor Chat (UC-14).
  * **Người B (Frontend AI & Tutor Interface):**
    * Ngày 8-10 (10-12/10): Thiết kế Thẻ đánh giá AI (hiển thị Code Quality, Big-O Complexity, Cảnh báo Lỗ hổng Bảo mật).
    * Ngày 11-14 (13-16/10): Xây dựng AI Tutor Chat Drawer gắn cạnh Monaco Editor (hỗ trợ Markdown, code highlight, hỏi đáp định hướng Socratic).
  * 🏆 *Nghiệm thu Milestone 2 (16/10):* AI Tutor trả lời thông minh, dẫn dắt tư duy dựa trên đúng giáo trình tra cứu từ RAG, không giải hộ bài.

* **🟡 TUẦN 3 (17/10 – 23/10): NGHIỆP VỤ ĐÀO TẠO & PHÂN QUYỀN LỚP HỌC**
  * **Người A (Backend RBAC & Class Management):**
    * Ngày 15-16 (17-18/10): Phân quyền Middleware RBAC 5 vai trò (Sinh viên, Giáo viên, Quản trị viên, Giáo vụ, Quản trị viên hệ thống).
    * Ngày 17-18 (19-20/10): API Quản lý lớp học, Giao bài cho lớp (UC-23), cấu hình Deadline một mốc duy nhất (UC-20), Server-side Auto-submit khi hết giờ.
    * Ngày 19-21 (21-23/10): API Chấm bài thủ công theo Rubric (UC-27), lưu tạm và nút "Xác nhận điểm chính thức" (Official Score), Bảng điểm cá nhân/lớp (UC-16, UC-25).
  * **Người B (Teacher Portal UI):**
    * Ngày 15-17 (17-19/10): Giao diện Quản lý Lớp học, Form Giao bài tập cho lớp.
    * Ngày 18-21 (20-23/10): Giao diện Giáo viên xem danh sách bài nộp (UC-24), màn hình Chấm bài theo Rubric và Xác nhận điểm chính thức.
  * 🏆 *Nghiệm thu Milestone 3 (23/10):* Giáo viên giao bài cho lớp, sinh viên làm bài, hệ thống chốt deadline và giáo viên xác nhận điểm thành công.

* **🔴 TUẦN 4 (24/10 – 31/10): QUẢN TRỊ NỀN TẢNG, KIỂM THỬ & BÀN GIAO**
  * **Người A & B phối hợp:**
    * Ngày 22-23 (24-25/10):
      - Quản trị viên: Quản lý tài khoản, Import danh sách người dùng từ Excel/CSV 5 cột chuẩn (UC-33), Quản lý tổ chức / Khoa / Bộ môn (UC-43).
      - Quản lý vòng đời lớp: Đóng/Mở lớp (UC-36), Archive/Restore/Hard Delete guard (UC-37).
    * Ngày 24-25 (26-27/10):
      - Quản trị viên hệ thống: Cấu hình tham số AI (UC-40), Cấu hình & Giám sát Docker Sandbox (UC-41, UC-42), Quản lý System Logs (UC-44).
    * Ngày 26-28 (28-30/10):
      - Kiểm thử bảo mật Sandbox, kiểm thử tải (Load testing 50-100 bài nộp đồng thời).
      - Đóng gói toàn bộ hệ thống bằng Docker Compose 1 câu lệnh (`docker compose up -d`).
    * Ngày 29 (31/10): Tổng duyệt hệ thống, chốt phiên bản v1.0.0, hoàn thiện tài liệu kỹ thuật và Slide báo cáo đồ án.
  * 🏆 *Nghiệm thu Milestone 4 (31/10):* Toàn bộ 44 Use Cases hoàn thành 100%, sẵn sàng bảo vệ đồ án đạt điểm tối đa.

---

### 5.2. Chiến Lược 2: "AI-First & RAG-Centric" (Khuyên Dùng Cho Đồ Án AI)

💡 **Lý do nên chọn hướng AI-First:**
1. **Giải quyết phần khó nhất & giá trị nhất trước:** "Bộ não" AI (Socratic Tutor, RAG tri thức giáo trình, phân tích bảo mật CWE, đo Big-O) chính là linh hồn và điểm ăn tiền nhất của đề tài.
2. **Thấy kết quả thông minh ngay lập tức:** Có thể chạy thử nghiệm và kiểm chứng ngay AI đọc hiểu code thế nào, tra cứu tài liệu ra sao trên các bài code lỗi thực tế mà không cần đợi làm xong Web hay Database.
3. **Các phần hệ thống còn lại (CRUD, Login, Lớp học) chỉ là công việc kỹ thuật tiêu chuẩn:** Sau khi AI đã mượt mà thì lắp ghép vào cực kỳ nhanh chóng và an toàn.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 1 (03/10 - 09/10): XÂY DỰNG "BỘ NÃO" AI & KHO TRI THỨC RAG        │
│ • Xây dựng Vector DB (ChromaDB) + Nạp kho tri thức DSA, 50+ Lỗi, Security   │
│ • Viết ContextBuilder + Prompt Socratic + Guardrails chống lộ code          │
│ • Tích hợp Gemini Flash / LangChain + Pydantic Schema Structured Output     │
│ 🎯 Deliverable: Nạp code lỗi vào -> AI tra cứu RAG và trả về gợi ý sư phạm chuẩn│
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 2 (10/10 - 16/10): TẠO "BẰNG CHỨNG THỰC THI" (EVIDENCE ENGINE)    │
│ • Phân tích tĩnh Static Analyzer (AST, Radon Big-O, Flake8 code smells)     │
│ • Docker Sandbox Runner (chạy code cô lập, đo RAM/CPU, bắt TLE/MLE/Crash)   │
│ • Auto-Grader chấm Test Cases -> Nạp Execution Evidence vào cho AI phân tích│
│ 🎯 Deliverable: AI có đầy đủ bằng chứng chạy thực tế để tư vấn chính xác 100%│
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 3 (17/10 - 23/10): GIAO DIỆN WEB TƯƠNG TÁC AI (AI-POWERED WEB IDE)│
│ • Monaco Editor + Khung chat Socratic AI Tutor Drawer tương tác thời gian thực│
│ • Dashboard hiển thị Thẻ phân tích Clean Code, Độ phức tạp & Cảnh báo Bảo mật│
│ 🎯 Deliverable: Trải nghiệm người dùng hoàn chỉnh: Viết code -> Hỏi đáp với AI│
├─────────────────────────────────────────────────────────────────────────────┤
│ GIAI ĐOẠN 4 (24/10 - 31/10): HOÀN THIỆN TOÀN BỘ BỘ KHUNG NỀN TẢNG (PLATFORM)│
│ • Bổ sung Auth JWT, RBAC 5 vai trò, Quản lý lớp, Giao bài, Import Excel CSV │
│ • Giám sát Docker Sandbox, System Logs, Đóng gói 1-lệnh Docker Compose      │
│ 🎯 Deliverable: Hoàn chỉnh 100% sản phẩm 44 Use Cases để bảo vệ đồ án       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.3. Kế Hoạch Hành Động Chi Tiết Bắt Đầu Ngay (Tuần 1 AI-First)

Để triển khai theo hướng AI-First, 3 module cốt lõi được xây dựng đầu tiên:

* **Module 1: Kho Tri thức RAG (`backend/knowledge_base/` & `services/rag_service.py`):**
  - Chuẩn bị thư mục dữ liệu phân loại theo mảng (DSA, Python/C++ Pitfalls, Clean Code, OWASP/CWE Security).
  - Khởi tạo ChromaDB local và viết script tự động Ingest & Embedding tài liệu với Metadata Tagging chuẩn.
* **Module 2: ContextBuilder (`services/context_builder.py`):**
  - Thu thập và chuẩn hóa dữ liệu: Đề bài + Code sinh viên + Tri thức tra cứu từ RAG + Compiler Errors.
  - Lọc untrusted input, cắt gọt token chống tràn context window.
* **Module 3: AI Engine & Socratic Prompting (`services/ai_service.py`):**
  - Kết nối Google Gemini API (kèm fallback OpenAI/Ollama) với Pydantic Schema cho Structured Output.
  - Thiết lập Guardrails kiểm soát chặt chẽ để AI chỉ gợi mở theo phong cách Socratic mà không giải hộ code.

---

## 6. BẢN BÁO CÁO TIẾN ĐỘ CHUẨN GỬI GIẢNG VIÊN HƯỚNG DẪN

> *"Kính thưa Thầy/Cô, nhóm đã bám sát 100% các định hướng chiến lược của Thầy/Cô:
> 1. Xây dựng hệ sinh thái Web IDE (Next.js + Monaco Editor) và Docker Sandbox thực thi cô lập an toàn.
> 2. Áp dụng mô hình **Hybrid AI Tutor kết hợp Evidence-Grounded AI**: Điểm số do Auto-Grader quyết định trong Sandbox; AI đóng vai trò Trợ giảng Sư phạm phân tích độ phức tạp Big-O, chấm Clean Code, phát hiện lỗ hổng bảo mật (CWE) và định hướng giải bài theo phương pháp Socratic.
> 3. Tích hợp **Kho tri thức RAG chuyên sâu** (DSA, Error Patterns, Coding Standards) và thiết kế modular hỗ trợ cả Cloud LLM (Gemini/OpenAI) lẫn Local LLM (Ollama/Llama 3) với **chi phí vận hành 0 đồng**."*
