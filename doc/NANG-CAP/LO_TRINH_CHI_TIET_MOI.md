# LỘ TRÌNH TRIỂN KHAI CHI TIẾT 4 TUẦN (03/10 - 31/10/2026)
# DETAILED IMPLEMENTATION ROADMAP - AI CODING TUTOR

> **Chiến lược:** Core-First Hybrid - Xây dựng lõi hệ thống trước, sau đó tích hợp AI một cách có chiến lược
> **Deadline:** 31/10/2026
> **Chi phí:** 0 đồng (100% Free)

---

## 📑 MỤC LỤC

1. [Tổng quan chiến lược & Phân công vai trò](#1-tổng-quán-chien-lược--phân-công-vai-trò)
2. [Tuần 1: Lõi hệ thống & Chấm điểm tự động (03/10 - 09/10)](#2-tuần-1-lõi-hệ-thống--chấm-điểm-tự-động-0310---0910)
3. [Tuần 2: Tích hợp AI & RAG Tri thức (10/10 - 16/10)](#3-tuần-2-tích-hợp-ai--rag-tri-thức-1010---1610)
4. [Tuần 3: Nghiệp vụ đào tạo & Phân quyền (17/10 - 23/10)](#4-tuần-3-nghiệp-vụ-đào-tạo--phân-quyền-1710---2310)
5. [Tuần 4: Quản trị hệ thống & Bàn giao (24/10 - 31/10)](#5-tuần-4-quản-trị-hệ-thống--bàn-giao-2410---3110)
6. [Danh sách Milestone & Deliverable](#6-danh-sách-milestone--deliverable)
7. [Ma trận rủi ro & Giải pháp](#7-ma-trận-rủi-ro--giải-pháp)

---

## 1. TỔNG QUÁN CHIẾN LƯỢC & PHÂN CÔNG VAI TRÒ

### 1.1. Chiến lược triển khai: Core-First Hybrid

**Nguyên tắc:**
1. Tuần 1: Xây dựng "xương sống" hệ thống (Database, Auth, Docker Sandbox, Auto-Grader)
2. Tuần 2: Tích hợp "bộ não" AI (RAG, ContextBuilder, AI Engine, Socratic Tutor)
3. Tuần 3: Hoàn thiện "lớp vỏ" nghiệp vụ (RBAC, Lớp học, Giao bài, Chấm thủ công)
4. Tuần 4: Đóng gói & "hệ thần kinh" quản trị (Logs, Monitoring, Import/Export, Production)

**Ưu điểm:**
- ✅ Đảm bảo deadline 31/10
- ✅ Có sản phẩm hoạt động ngay sau Tuần 1
- ✅ AI được tích hợp một cách có chiến lược, không rủi ro
- ✅ Dễ debug và kiểm tra từng module

---

### 1.2. Phân công vai trò (Giả định 2 thành viên)

| Vai trò | Trách nhiệm chính | Tech Stack |
|--------|-------------------|------------|
| **Người A (Backend & DevOps)** | Database, Auth, Docker Sandbox, AI Engine, RAG, API | Python, FastAPI, SQLAlchemy, Docker, Celery, ChromaDB |
| **Người B (Frontend & UI/UX)** | Next.js App Router, Monaco Editor, AI Tutor UI, Portal Suite | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |

**Lưu ý:** Nếu làm solo, điều chỉnh timeline bằng cách tập trung vào MVP core (Auto-Grader + AI Tutor) trước, defer các tính năng quản trị (Teacher Portal, Admin Panel) sang Phase 2.

---

## 2. TUẦN 1: LỐI HỆ THỐNG & CHẤM ĐIỂM TỰ ĐỘNG (03/10 - 09/10)

### 🎯 Mục tiêu Tuần 1
Sinh viên có thể đăng nhập, làm bài trên Monaco Editor, nộp bài, và nhận điểm tự động từ Docker Sandbox.

---

### Ngày 1 (Thứ 7, 03/10): Khởi tạo dự án & Database Schema

**Người A (Backend):**
- [ ] **Setup Backend Project**
  - Clone repo hoặc init FastAPI project
  - Configure Poetry/Virtual environment
  - Install dependencies: `fastapi`, `uvicorn`, `sqlalchemy`, `alembic`, `psycopg2-binary`, `redis`, `celery`
  - Setup `.env` với biến môi trường cơ bản:
    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/ai_coding_tutor
    REDIS_URL=redis://localhost:6379/0
    SECRET_KEY=your-secret-key
    ```

- [ ] **Design Database Schema**
  - Tạo models trong `backend/app/models/`:
    - `User` (id, email, password_hash, role, created_at)
    - `Problem` (id, title, description, input_format, output_format, constraints, time_limit, memory_limit, language, difficulty)
    - `TestCase` (id, problem_id, input, expected_output, is_hidden, sample)
    - `Submission` (id, user_id, problem_id, code, language, submitted_at, status, auto_score, memory_used, time_used)
    - `Class` (id, name, code, created_by, created_at)
    - `Enrollment` (id, class_id, user_id, role, joined_at)
  - Setup Alembic migrations

**Người B (Frontend):**
- [ ] **Setup Frontend Project**
  - Init Next.js 14 App Router project
  - Configure TypeScript, ESLint, Prettier
  - Install dependencies: `shadcn/ui`, `@monaco-editor/react`, `axios`, `react-hook-form`, `zod`
  - Setup environment variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

- [ ] **Setup Design System**
  - Configure Tailwind CSS theme
  - Setup shadcn/ui components (Button, Input, Card, Dialog, etc.)
  - Create layout structure: `app/layout.tsx` với Navigation, Sidebar

**Deliverable cuối ngày:**
- ✅ Backend project chạy được với Database migration
- ✅ Frontend project chạy được với base UI components
- ✅ Code được commit lên Git với message rõ ràng

---

### Ngày 2 (Chủ nhật, 04/10): Authentication API & Login UI

**Người A (Backend):**
- [ ] **Implement Authentication API**
  - JWT Login/Logout endpoint (`POST /api/v1/auth/login`, `POST /api/v1/auth/logout`)
  - Password hashing với `bcrypt`
  - JWT token generation với `python-jose`
  - Middleware `get_current_user` để validate token
  - Refresh token mechanism (optional)

- [ ] **Create Seed Data Script**
  - Script tạo user test: admin, teacher, student
  - Hash passwords mặc định

**Người B (Frontend):**
- [ ] **Implement Login Page**
  - `app/login/page.tsx` với form login
  - Integrate với backend auth API
  - Store JWT token in localStorage/cookies
  - Redirect to dashboard sau khi login

- [ ] **Implement Auth Context**
  - `contexts/AuthContext.tsx` để quản lý auth state
  - Provider component wrap toàn bộ app
  - Protected route component

**Deliverable cuối ngày:**
- ✅ Có thể đăng nhập với user test
- ✅ Token được lưu và validate thành công
- ✅ Logout hoạt động

---

### Ngày 3 (Thứ 2, 05/10): Docker Sandbox Runner

**Người A (Backend):**
- [ ] **Design Docker Sandbox Architecture**
  - Research Docker Python SDK (`docker-py`)
  - Design security constraints:
    - `--network none` (ngắt mạng)
    - `--read-only` (filesystem read-only)
    - `--memory 256m` (giới hạn RAM)
    - `--cpus 0.5` (giới hạn CPU)
    - Non-root user trong container
    - Ulimit cho số process

- [ ] **Implement Docker Sandbox Service**
  - `backend/app/services/sandbox_service.py`:
    - `run_code(code, language, test_cases)` function
    - Support Python (interpreter: `python3`)
    - Support C++ (compiler: `g++`, runtime: `./a.out`)
    - Capture stdout, stderr, exit code
    - Measure execution time và memory usage
    - Handle timeout (TLE - Time Limit Exceeded)
    - Handle memory limit (MLE - Memory Limit Exceeded)

- [ ] **Test Sandbox Locally**
  - Test với sample Python code (hello world, simple algorithm)
  - Test với C++ code
  - Test security: try to access file system, network (should fail)

**Người B (Frontend):**
- [ ] **Implement Problem List Page**
  - `app/problems/page.tsx` hiển thị danh sách bài tập
  - Table/Grid với columns: Title, Difficulty, Language, Time Limit, Memory Limit
  - Filter/Search by difficulty, language
  - Card component cho mỗi problem

- [ ] **Implement Problem Detail Page**
  - `app/problems/[id]/page.tsx` hiển thị chi tiết đề bài
  - Sections: Description, Input Format, Output Format, Constraints, Sample I/O
  - Tabs cho test cases (hidden/visible)

**Deliverable cuối ngày:**
- ✅ Docker Sandbox chạy được Python và C++ code
- ✅ Security guardrails hoạt động (network blocked, memory limited)
- ✅ Frontend hiển thị danh sách bài tập và chi tiết đề bài

---

### Ngày 4 (Thứ 3, 06/10): Monaco Editor Integration

**Người B (Frontend):**
- [ ] **Integrate Monaco Editor**
  - Install `@monaco-editor/react`
  - Create `components/MonacoEditor.tsx` component
  - Configure language support (Python, C++, Java, JavaScript)
  - Configure theme (dark/light mode)
  - Add basic features: line numbers, minimap, word wrap

- [ ] **Implement Submission Page**
  - `app/problems/[id]/submit/page.tsx` với Monaco Editor
  - Button "Nộp bài" (Submit)
  - Autosave draft code to localStorage
  - Display problem description sidebar

- [ ] **Implement Read-only Mode**
  - Logic: Nếu đã nộp bài chính thức, lock editor (read-only)
  - Warning message khi cố gắng edit sau submission

**Người A (Backend):**
- [ ] **Implement Submission API**
  - `POST /api/v1/submissions` endpoint
  - Validate input: problem_id, code, language
  - Check user permissions (student only)
  - Check deadline (nếu có)
  - Save submission to database với status "PENDING"

**Deliverable cuối ngày:**
- ✅ Monaco Editor hoạt động với syntax highlighting
- ✅ Có thể viết code và nộp bài
- ✅ Submission được lưu vào database

---

### Ngày 5 (Thứ 4, 07/10): Auto-Grader Integration

**Người A (Backend):**
- [ ] **Implement Auto-Grader Service**
  - `backend/app/services/grader_service.py`:
    - `grade_submission(submission_id)` function
    - Fetch submission from database
    - Fetch test cases for problem
    - Run each test case in Docker Sandbox
    - Compare output with expected output
    - Calculate score: `(passed_test_cases / total_test_cases) * 100`
    - Handle edge cases: CE (Compilation Error), RE (Runtime Error), TLE, MLE

- [ ] **Implement Celery Task Queue**
  - Setup Celery with Redis broker
  - Create Celery task: `grade_submission_task(submission_id)`
  - Configure Celery worker
  - Configure Celery beat (optional for scheduled tasks)

- [ ] **Integrate Submission with Grader**
  - Khi submission được tạo → trigger Celery task `grade_submission_task`
  - Update submission status: PENDING → GRADING → COMPLETED
  - Save results: auto_score, test_case_results, memory_used, time_used

**Người B (Frontend):**
- [ ] **Implement Submission Result Page**
  - `app/submissions/[id]/page.tsx` hiển thị kết quả chấm bài
  - Display: auto_score, status (AC, WA, TLE, CE, RE)
  - Table of test cases with status (✓/✗)
  - Display memory usage và time usage
  - Show stderr/error output nếu có

**Deliverable cuối ngày:**
- ✅ Auto-Grader chấm bài tự động với test cases
- ✅ Kết quả được lưu và hiển thị trên frontend
- ✅ Celery worker chạy tasks thành công

---

### Ngày 6 (Thứ 5, 08/10): File Upload & Multi-language Support

**Người A (Backend):**
- [ ] **Implement File Upload API**
  - `POST /api/v1/submissions/upload` endpoint
  - Support upload single file (.py, .cpp, .java, .js)
  - Validate file size (max 1MB)
  - Validate file extension
  - Extract code from file
  - Create submission with extracted code

- [ ] **Add Language-specific Compilers**
  - Support Java: `javac` compiler, `java` runtime
  - Support JavaScript: `node` runtime
  - Update Sandbox service to handle different compilers

**Người B (Frontend):**
- [ ] **Implement File Upload Component**
  - `components/FileUpload.tsx` với drag-and-drop
  - Integrate với backend upload API
  - Display file name, size after upload
  - Button "Submit" sau khi upload

- [ ] **Refine Monaco Editor UI**
  - Add language selector dropdown
  - Add template code cho từng language
  - Add keyboard shortcuts (Ctrl+S to save, Ctrl+Enter to submit)

**Deliverable cuối ngày:**
- ✅ Có thể upload file code thay vì copy-paste
- ✅ Hỗ trợ Python, C++, Java, JavaScript
- ✅ Language selector hoạt động

---

### Ngày 7 (Thứ 6, 09/10): Milestone 1 - Core Grading System

**Người A & B (Testing & Bug Fixes):**
- [ ] **End-to-End Testing**
  - Test flow: Login → View Problems → Select Problem → Write Code → Submit → View Result
  - Test với Python, C++, Java, JavaScript
  - Test edge cases: Empty submission, invalid code, timeout, memory limit
  - Test security: Try to break sandbox (should fail)

- [ ] **Bug Fixes & Refinement**
  - Fix any bugs discovered during testing
  - Optimize performance (reduce grading time)
  - Improve error messages

- [ ] **Documentation**
  - Update README.md with setup instructions
  - Document API endpoints with Swagger/OpenAPI
  - Create user guide for students

**Deliverable cuối ngày:**
- ✅ Milestone 1 hoàn thành: Core Grading System hoạt động 100%
- ✅ Sinh viên có thể làm bài và nhận điểm tự động
- ✅ Documentation hoàn chỉnh

---

## 3. TUẦN 2: TÍCH HỢP AI & RAG TRI THỨC (10/10 - 16/10)

### 🎯 Mục tiêu Tuần 2
AI đọc hiểu code sinh viên, phân tích độ phức tạp, chấm điểm clean code, phát hiện lỗi bảo mật, và gợi ý theo phương pháp Socratic.

---

### Ngày 8 (Thứ 7, 10/10): ContextBuilder & Static Analysis

**Người A (Backend):**
- [ ] **Implement ContextBuilder Service**
  - `backend/app/services/context_builder.py`:
    - `build_context(submission_id)` function
    - Collect data: problem description, student code, test case results, compiler errors
    - Run static analysis:
      - Python: `flake8` (code style), `radon` (cyclomatic complexity), `ast` (analyze AST)
      - C++: `clang-tidy` (static analysis)
    - Extract metrics: lines of code, number of functions, number of classes, imports, etc.
    - Build structured context object for AI

- [ ] **Implement Static Analysis Tools**
  - Install `flake8`, `radon`, `pylint` cho Python
  - Install `clang-tidy` cho C++
  - Create wrapper functions to run analysis and parse output
  - Create schemas to store analysis results

**Người B (Frontend):**
- [ ] **Implement User Dashboard**
  - `app/dashboard/page.tsx` hiển thị dashboard cá nhân
  - Sections: Recent submissions, Score distribution, Statistics
  - Charts: Score over time, Problems attempted
  - Quick links: View problems, View submissions

- [ ] **Implement Navigation Improvements**
  - Add breadcrumbs navigation
  - Add search bar for problems
  - Add notification system (optional)

**Deliverable cuối ngày:**
- ✅ ContextBuilder thu thập đầy đủ dữ liệu cho AI
- ✅ Static analysis chạy được và trả về metrics
- ✅ Dashboard hiển thị thông tin cá nhân

---

### Ngày 9 (Chủ nhật, 11/10): RAG Knowledge Base Setup

**Người A (Backend):**
- [ ] **Setup Vector Database (ChromaDB)**
  - Install `chromadb` and `sentence-transformers`
  - Run ChromaDB in Docker container hoặc local mode
  - Create collections:
    - `error_patterns` - Database các lỗi phổ biến
    - `algorithm_knowledge` - Tài liệu thuật toán, cấu trúc dữ liệu
    - `coding_standards` - Coding conventions, best practices
    - `security_vulnerabilities` - OWASP/CWE security patterns

- [ ] **Implement RAG Service**
  - `backend/app/services/rag_service.py`:
    - `embed_text(text)` - Generate embedding
    - `add_document(collection, doc)` - Add document to vector DB
    - `search_similar(collection, query, top_k)` - Search similar documents
    - Support both local embeddings (sentence-transformers) and API embeddings (OpenAI/Gemini)

- [ ] **Create Knowledge Base Seeding Scripts**
  - `scripts/seed_error_patterns.py` - Seed common errors (IndexError, KeyError, TypeError, etc.)
  - `scripts/seed_algorithm_knowledge.py` - Seed algorithm docs (Binary Search, Sorting, DP, etc.)
  - `scripts/seed_coding_standards.py` - Seed PEP 8, Java coding standards, C++ best practices
  - `scripts/seed_security_patterns.py` - Seed OWASP Top 10, CWE Top 25

**Deliverable cuối ngày:**
- ✅ ChromaDB chạy được với các collections
- ✅ RAG service hoạt động với embedding và search
- ✅ Knowledge base được seeded với tài liệu mẫu

---

### Ngày 10 (Thứ 2, 12/10): AI Engine Integration

**Người A (Backend):**
- [ ] **Setup LLM API Integration**
  - Sign up for Google AI Studio để lấy API key (Free Tier)
  - Install `google-generativeai` library
  - Create `backend/app/services/ai_service.py`:
    - `generate_ai_feedback(context)` function
    - Use Google Gemini 1.5 Flash (fast, free tier)
    - Configure fallback to OpenAI GPT-4o-mini (optional)

- [ ] **Define AI Feedback Schema**
  - `backend/app/schemas/ai_feedback.py`:
    ```python
    class AIFeedbackResponseSchema(BaseModel):
        quality_score: int  # 0-100
        complexity_score: int  # 0-100
        cyclomatic_analysis: str  # "Low/Medium/High"
        code_smells: List[str]  # List of code smell issues
        security_vulnerabilities: List[SecurityVulnerability]
        socratic_hints: List[str]  # Socratic prompts
    ```

- [ ] **Implement System Prompt**
  - Design Socratic AI Tutor prompt:
    - Instruct AI to guide without giving code
    - Encourage critical thinking
    - Reference RAG knowledge base
    - Focus on learning, not solving

**Deliverable cuối ngày:**
- ✅ Google Gemini API integration hoạt động
- ✅ AI Feedback Schema được định nghĩa
- ✅ System prompt được thiết kế

---

### Ngày 11 (Thứ 3, 13/10): AI Review Pipeline

**Người A (Backend):**
- [ ] **Implement AI Review Pipeline**
  - Integrate ContextBuilder + RAG + AI Engine
  - Create Celery task: `ai_review_task(submission_id)`
  - Pipeline:
    1. Build context from submission
    2. Run static analysis
    3. Query RAG for relevant knowledge
    4. Call LLM with context + RAG knowledge
    5. Parse structured output (Pydantic schema)
    6. Save AI feedback to database

- [ ] **Update Submission Model**
  - Add fields: `ai_feedback` (JSON), `ai_reviewed_at` (timestamp)
  - Create table: `ai_feedback` với columns: submission_id, quality_score, complexity_score, code_smells, security_vulnerabilities, socratic_hints

- [ ] **Integrate with Auto-Grader**
  - After grading complete → trigger AI review task
  - Update submission status: COMPLETED → AI_REVIEWING → AI_REVIEWED

**Người B (Frontend):**
- [ ] **Implement AI Feedback UI**
  - `components/AIFeedbackCard.tsx` hiển thị kết quả AI review
  - Tabs/Sections:
    - Code Quality (quality_score, code_smells)
    - Complexity (complexity_score, cyclomatic_analysis)
    - Security (security_vulnerabilities)
    - Socratic Hints (list of prompts)
  - Use progress bars, badges, icons for visual appeal

**Deliverable cuối ngày:**
- ✅ AI Review pipeline hoạt động end-to-end
- ✅ AI feedback được lưu vào database
- ✅ Frontend hiển thị AI feedback

---

### Ngày 12 (Thứ 4, 14/10): AI Tutor Chat Interface

**Người A (Backend):**
- [ ] **Implement AI Tutor Chat API**
  - `POST /api/v1/tutor/chat` endpoint
  - Accept: submission_id, user_message
  - Pipeline:
    1. Build context from submission
    2. Query RAG for relevant knowledge
    3. Retrieve conversation history (from database)
    4. Call LLM with context + RAG + history + user_message
    5. Enforce Socratic method (guardrails)
    6. Save message to conversation history
  - Return: AI response

- [ ] **Implement Conversation History**
  - Create table: `tutor_conversation` với columns: id, submission_id, user_id, messages (JSON), created_at
  - Store conversation as array of messages: `{role: "user"/"assistant", content: "...", timestamp: "..."}`

- [ ] **Implement Guardrails**
  - Prevent AI from giving full code solutions
  - Implement keyword filtering (detect if AI is giving code)
  - Fallback response if guardrails triggered

**Người B (Frontend):**
- [ ] **Implement AI Tutor Chat UI**
  - `components/AITutorChat.tsx` chat interface
  - Drawer/Sidebar next to Monaco Editor
  - Features:
    - Message list with user/AI distinction
    - Input field with send button
    - Markdown rendering for code blocks
    - Syntax highlighting for code
    - Auto-scroll to latest message
    - Typing indicator

- [ ] **Integrate Chat with Submission Page**
  - Add AI Tutor button next to Monaco Editor
  - Open chat drawer on click
  - Pre-fill context with current submission

**Deliverable cuối ngày:**
- ✅ AI Tutor Chat API hoạt động
- ✅ Conversation history được lưu
- ✅ Chat UI hoạt động với real-time messages

---

### Ngày 13 (Thứ 5, 15/10): AI Security Analysis

**Người A (Backend):**
- [ ] **Enhance AI Prompt for Security Analysis**
  - Add security analysis instructions to system prompt:
    - Detect SQL injection vulnerabilities
    - Detect buffer overflow risks
    - Detect hardcoded secrets/passwords
    - Detect insecure randomness
    - Detect command injection risks
  - Add OWASP CWE references to RAG knowledge base

- [ ] **Update AI Feedback Schema**
  - Add `SecurityVulnerability` schema:
    ```python
    class SecurityVulnerability(BaseModel):
        issue_type: str  # SQL_INJECTION, BUFFER_OVERFLOW, etc.
        severity: str  # LOW, MEDIUM, HIGH, CRITICAL
        line_number: Optional[int]
        description: str
        remediation_hint: str
    ```
  - Add to `AIFeedbackResponseSchema`

- [ ] **Test Security Analysis**
  - Create test submissions with security vulnerabilities
  - Verify AI detects them correctly
  - Verify severity levels are accurate

**Người B (Frontend):**
- [ ] **Implement Security Tab in AI Feedback**
  - Add tab "Security" in AIFeedbackCard
  - Display security vulnerabilities with severity badges
  - Show line numbers (link to code editor)
  - Display remediation hints

**Deliverable cuối ngày:**
- ✅ AI detects security vulnerabilities
- ✅ Security tab displays vulnerabilities with severity
- ✅ Remediation hints are shown

---

### Ngày 14 (Thứ 6, 16/10): Milestone 2 - AI Integration Complete

**Người A & B (Testing & Refinement):**
- [ ] **End-to-End AI Testing**
  - Test flow: Submit code → Auto-grader → AI Review → AI Tutor Chat
  - Test with various code quality levels (good, bad, ugly)
  - Test Socratic method (AI should not give code)
  - Test RAG retrieval (AI should reference knowledge base)
  - Test security analysis (AI should detect vulnerabilities)

- [ ] **Performance Optimization**
  - Optimize AI response time (< 2s)
  - Optimize RAG retrieval time (< 100ms)
  - Implement caching for repeated queries

- [ ] **Bug Fixes**
  - Fix any AI hallucinations
  - Fix RAG retrieval accuracy issues
  - Fix chat conversation history bugs

**Deliverable cuối ngày:**
- ✅ Milestone 2 hoàn thành: AI Integration 100%
- ✅ AI Tutor hoạt động với Socratic method
- ✅ RAG knowledge base được sử dụng hiệu quả
- ✅ Security analysis hoạt động

---

## 4. TUẦN 3: NGHIỆP VỤ ĐÀO TẠO & PHÂN QUYỀN (17/10 - 23/10)

### 🎯 Mục tiêu Tuần 3
Giáo viên có thể quản lý lớp học, giao bài tập, chấm điểm thủ công, và xác nhận điểm chính thức.

---

### Ngày 15 (Thứ 7, 17/10): RBAC Implementation

**Người A (Backend):**
- [ ] **Implement Role-Based Access Control (RBAC)**
  - Define 5 roles: STUDENT, TEACHER, ADMIN, ACADEMIC_STAFF, SYSTEM_ADMIN
  - Create `Role` enum and assign to User model
  - Implement middleware: `require_role(role)` to check permissions
  - Define permission matrix:
    - STUDENT: View problems, submit code, view own submissions, chat with AI tutor
    - TEACHER: Manage classes, assign problems, grade submissions, view all submissions
    - ADMIN: Manage users, manage organizations, view system logs
    - ACADEMIC_STAFF: Manage classes, manage students
    - SYSTEM_ADMIN: Configure AI, configure sandbox, manage system settings

- [ ] **Update API Endpoints with RBAC**
  - Add role checks to all protected endpoints
  - Return 403 Forbidden if unauthorized

**Người B (Frontend):**
- [ ] **Implement Role-Based UI**
  - Show/hide navigation items based on user role
  - Teacher Portal: Visible to TEACHER, ACADEMIC_STAFF
  - Admin Panel: Visible to ADMIN, SYSTEM_ADMIN
  - Student Dashboard: Visible to STUDENT

**Deliverable cuối ngày:**
- ✅ RBAC middleware hoạt động
- ✅ 5 roles được định nghĩa và enforced
- ✅ UI adapts based on user role

---

### Ngày 16 (Chủ nhật, 18/10): Class Management API

**Người A (Backend):**
- [ ] **Implement Class Management API**
  - `POST /api/v1/classes` - Create class (TEACHER, ACADEMIC_STAFF)
  - `GET /api/v1/classes` - List classes (with pagination)
  - `GET /api/v1/classes/{id}` - Get class details
  - `PUT /api/v1/classes/{id}` - Update class
  - `DELETE /api/v1/classes/{id}` - Delete class (soft delete)
  - `POST /api/v1/classes/{id}/enroll` - Enroll student (by code or invite)
  - `DELETE /api/v1/classes/{id}/enroll/{user_id}` - Remove student

- [ ] **Update Database Schema**
  - Add `Class` model: id, name, code, description, created_by, created_at, status (ACTIVE/ARCHIVED)
  - Add `Enrollment` model: id, class_id, user_id, role (STUDENT/TEACHER), joined_at

**Người B (Frontend):**
- [ ] **Implement Class Management UI**
  - `app/classes/page.tsx` - List classes
  - `app/classes/create/page.tsx` - Create class form
  - `app/classes/[id]/page.tsx` - Class details
  - Components: ClassCard, EnrollmentList, InviteModal

**Deliverable cuối ngày:**
- ✅ Class management API hoạt động
- ✅ Teacher có thể tạo và quản lý lớp
- ✅ Student có thể tham gia lớp bằng code

---

### Ngày 17 (Thứ 2, 19/10): Problem Assignment API

**Người A (Backend):**
- [ ] **Implement Problem Assignment API**
  - `POST /api/v1/classes/{class_id}/assignments` - Assign problem to class
  - `GET /api/v1/classes/{class_id}/assignments` - List assignments
  - `PUT /api/v1/assignments/{id}` - Update assignment (deadline, etc.)
  - `DELETE /api/v1/assignments/{id}` - Delete assignment

- [ ] **Update Database Schema**
  - Add `Assignment` model: id, class_id, problem_id, deadline, max_attempts, created_at, created_by
  - Add constraint: 1 problem can be assigned to multiple classes

- [ ] **Implement Deadline Logic**
  - Check deadline before allowing submission
  - Implement server-side auto-submit at deadline (optional for MVP)

**Người B (Frontend):**
- [ ] **Implement Assignment UI**
  - `app/classes/[id]/assignments/page.tsx` - List assignments
  - `app/classes/[id]/assignments/create/page.tsx` - Create assignment form
  - Select problem from dropdown
  - Set deadline with datetime picker
  - Display assignments with deadline countdown

**Deliverable cuối ngày:**
- ✅ Teacher có thể giao bài tập cho lớp
- ✅ Deadline được enforce
- ✅ Student chỉ có thể nộp trước deadline

---

### Ngày 18 (Thứ 3, 20/10): Manual Grading & Rubric

**Người A (Backend):**
- [ ] **Implement Manual Grading API**
  - `GET /api/v1/classes/{class_id}/submissions` - List submissions for class
  - `GET /api/v1/submissions/{id}` - Get submission details
  - `POST /api/v1/submissions/{id}/manual-grade` - Submit manual grade
  - `PUT /api/v1/submissions/{id}/confirm-score` - Confirm official score

- [ ] **Implement Rubric System**
  - Create `Rubric` model: id, assignment_id, criteria (JSON), max_score
  - Criteria example: `[{"name": "Correctness", "weight": 0.5}, {"name": "Efficiency", "weight": 0.3}, {"name": "Code Quality", "weight": 0.2}]`
  - Manual grade input based on rubric

- [ ] **Update Submission Model**
  - Add fields: `manual_score`, `official_score`, `confirmed_at`, `confirmed_by`
  - `official_score` = average of `auto_score` and `manual_score` (or manual only)

**Người B (Frontend):**
- [ ] **Implement Manual Grading UI**
  - `app/grading/page.tsx` - Grading dashboard
  - `app/grading/submissions/[id]/page.tsx` - Submission review
  - Display code with Monaco Editor (read-only)
  - Display auto-grader results
  - Display AI feedback
  - Rubric form for manual grading
  - Button "Confirm Official Score"

**Deliverable cuối ngày:**
- ✅ Teacher có thể chấm bài thủ công theo rubric
- ✅ Official score được xác nhận
- ✅ Submission review UI hiển thị đầy đủ thông tin

---

### Ngày 19 (Thứ 4, 21/10): Gradebook & Score Management

**Người A (Backend):**
- [ ] **Implement Gradebook API**
  - `GET /api/v1/classes/{class_id}/gradebook` - Get gradebook (student × assignment matrix)
  - `GET /api/v1/users/{user_id}/grades` - Get student's grades
  - `GET /api/v1/assignments/{id}/grades` - Get assignment grades
  - Export gradebook to CSV/Excel

- [ ] **Implement Score Calculation**
  - Calculate average score per student
  - Calculate class statistics (mean, median, std dev)
  - Calculate assignment statistics

**Người B (Frontend):**
- [ ] **Implement Gradebook UI**
  - `app/classes/[id]/gradebook/page.tsx` - Gradebook table
  - Columns: Student Name, Assignment 1, Assignment 2, ..., Average
  - Color coding: Green (high score), Yellow (medium), Red (low)
  - Sort by name, average score
  - Filter by assignment
  - Export to CSV button

- [ ] **Implement Student Grade View**
  - `app/grades/page.tsx` - Student's grades
  - Display grades for all assignments
  - Display average score
  - Display score distribution chart

**Deliverable cuối ngày:**
- ✅ Gradebook API hoạt động
- ✅ Gradebook UI hiển thị matrix điểm số
- ✅ Export to CSV hoạt động

---

### Ngày 20 (Thứ 5, 22/10): Teacher Portal Refinement

**Người B (Frontend):**
- [ ] **Refine Teacher Portal**
  - Create unified teacher dashboard: `app/teacher/page.tsx`
  - Sections: My Classes, Recent Submissions, Pending Grading, Statistics
  - Charts: Class performance over time, Score distribution
  - Quick actions: Create class, Assign problem, View gradebook

- [ ] **Improve UX**
  - Add loading states
  - Add error handling
  - Add empty states
  - Add confirmation dialogs (delete, confirm score)

**Người A (Backend):**
- [ ] **Optimize Teacher Portal APIs**
  - Add pagination to list endpoints
  - Add caching for frequently accessed data
  - Optimize queries (reduce N+1 queries)

**Deliverable cuối ngày:**
- ✅ Teacher Portal UI hoàn thiện
- ✅ UX improvements
- ✅ APIs optimized

---

### Ngày 21 (Thứ 6, 23/10): Milestone 3 - Teaching Suite Complete

**Người A & B (Testing & Bug Fixes):**
- [ ] **End-to-End Teacher Testing**
  - Test flow: Create class → Enroll students → Assign problem → Students submit → Teacher grades → Confirm scores → View gradebook
  - Test RBAC: Verify permissions are enforced
  - Test deadline: Verify submissions blocked after deadline
  - Test gradebook: Verify calculations are correct

- [ ] **Bug Fixes**
  - Fix any grading calculation bugs
  - Fix permission issues
  - Fix UI bugs

**Deliverable cuối ngày:**
- ✅ Milestone 3 hoàn thành: Teaching Suite 100%
- ✅ Teacher có thể quản lý lớp học và chấm điểm
- ✅ Gradebook hoạt động chính xác

---

## 5. TUẦN 4: QUẢN TRỊ HỆ THỐNG & BÀN GIAO (24/10 - 31/10)

### 🎯 Mục tiêu Tuần 4
Quản trị viên có thể quản lý tài khoản, cấu hình AI, giám sát Sandbox, và hệ thống được đóng gói để bàn giao.

---

### Ngày 22 (Thứ 7, 24/10): User Management & Import/Export

**Người A (Backend):**
- [ ] **Implement User Management API**
  - `GET /api/v1/users` - List users (with pagination, filter by role)
  - `POST /api/v1/users` - Create user (ADMIN only)
  - `PUT /api/v1/users/{id}` - Update user
  - `DELETE /api/v1/users/{id}` - Delete user (soft delete)
  - `POST /api/v1/users/import` - Import users from CSV/Excel

- [ ] **Implement CSV/Excel Import**
  - Support 5-column format: Email, Name, Role, Class Code, Password
  - Parse CSV/Excel file
  - Validate data
  - Create users in batch
  - Enroll users to classes

**Người B (Frontend):**
- [ ] **Implement User Management UI**
  - `app/admin/users/page.tsx` - User list
  - `app/admin/users/create/page.tsx` - Create user form
  - `app/admin/users/import/page.tsx` - Import from CSV/Excel
  - Table with columns: Name, Email, Role, Status, Actions
  - Filter by role
  - Search by name/email

**Deliverable cuối ngày:**
- ✅ User management API hoạt động
- ✅ Import from CSV/Excel hoạt động
- ✅ User management UI hoàn thiện

---

### Ngày 23 (Chủ nhật, 25/10): Organization Management

**Người A (Backend):**
- [ ] **Implement Organization Management API**
  - `POST /api/v1/organizations` - Create organization (Khoa, Bộ môn)
  - `GET /api/v1/organizations` - List organizations
  - `PUT /api/v1/organizations/{id}` - Update organization
  - `DELETE /api/v1/organizations/{id}` - Delete organization

- [ ] **Update Database Schema**
  - Add `Organization` model: id, name, code, parent_id, created_at
  - Update `User` model: add `organization_id`
  - Update `Class` model: add `organization_id`

**Người B (Frontend):**
- [ ] **Implement Organization Management UI**
  - `app/admin/organizations/page.tsx` - Organization list
  - Tree view for hierarchical organizations
  - Create/Edit organization forms

**Deliverable cuối ngày:**
- ✅ Organization management API hoạt động
- ✅ Hierarchical organization structure supported
- ✅ Organization UI hoàn thiện

---

### Ngày 24 (Thứ 2, 26/10): AI Configuration & Monitoring

**Người A (Backend):**
- [ ] **Implement AI Configuration API**
  - `GET /api/v1/system/ai-config` - Get AI configuration
  - `PUT /api/v1/system/ai-config` - Update AI configuration
  - Config options:
    - Primary LLM provider (Gemini/OpenAI/Ollama)
    - Fallback LLM provider
    - API keys (encrypted)
    - Model names
    - Temperature, max tokens
    - RAG enabled/disabled
    - Security analysis enabled/disabled

- [ ] **Implement AI Monitoring**
  - Track AI API usage (calls, tokens, cost)
  - Track AI response times
  - Track RAG retrieval accuracy
  - Store metrics in database

**Người B (Frontend):**
- [ ] **Implement AI Configuration UI**
  - `app/admin/ai-config/page.tsx` - AI configuration form
  - Provider selection dropdown
  - API key input (masked)
  - Model name input
  - Sliders for temperature, max tokens
  - Toggles for RAG, security analysis

- [ ] **Implement AI Monitoring Dashboard**
  - `app/admin/ai-monitoring/page.tsx` - AI metrics
  - Charts: API calls over time, token usage, response time
  - Tables: Recent AI calls, errors

**Deliverable cuối ngày:**
- ✅ AI configuration API hoạt động
- ✅ AI monitoring được track
- ✅ AI configuration UI hoàn thiện

---

### Ngày 25 (Thứ 3, 27/10): Sandbox Monitoring & Logs

**Người A (Backend):**
- [ ] **Implement Sandbox Monitoring**
  - Track Sandbox execution metrics:
    - Total executions
    - Success rate
    - Failure rate (TLE, MLE, RE, CE)
    - Average execution time
    - Average memory usage
  - Track resource usage (CPU, RAM)

- [ ] **Implement System Logging**
  - Log all API requests
  - Log all Sandbox executions
  - Log all AI calls
  - Log errors and exceptions
  - Store logs in database or file

- [ ] **Implement Log API**
  - `GET /api/v1/system/logs` - List logs (with pagination, filter by level)
  - `GET /api/v1/system/logs/{id}` - Get log details

**Người B (Frontend):**
- [ ] **Implement Sandbox Monitoring Dashboard**
  - `app/admin/sandbox-monitoring/page.tsx` - Sandbox metrics
  - Charts: Executions over time, Success rate, Resource usage
  - Real-time monitoring (optional)

- [ ] **Implement System Logs UI**
  - `app/admin/logs/page.tsx` - Log viewer
  - Filter by level (INFO, WARNING, ERROR)
  - Filter by service (API, Sandbox, AI)
  - Search by message
  - View log details modal

**Deliverable cuối ngày:**
- ✅ Sandbox monitoring được track
- ✅ System logging hoạt động
- ✅ Monitoring dashboards hoàn thiện

---

### Ngày 26 (Thứ 4, 28/10): Docker Compose & Production Packaging

**Người A (Backend & DevOps):**
- [ ] **Create Docker Compose Configuration**
  - `docker-compose.yml` with services:
    - `postgres` - PostgreSQL database
    - `redis` - Redis broker
    - `backend` - FastAPI backend
    - `frontend` - Next.js frontend
    - `celery-worker` - Celery worker
    - `chromadb` - Vector database (optional)
    - `ollama` - Local LLM (optional)
  - Configure volumes, networks, environment variables
  - Create `.env.example` with all required variables

- [ ] **Create Production-ready Dockerfiles**
  - `backend/Dockerfile` - Multi-stage build for backend
  - `frontend/Dockerfile` - Multi-stage build for frontend
  - Optimize image sizes
  - Use non-root user in containers

- [ ] **Create Setup Scripts**
  - `scripts/setup.sh` - One-command setup
  - `scripts/init-db.sh` - Initialize database with migrations
  - `scripts/seed-data.sh` - Seed initial data (admin user, sample problems)

**Deliverable cuối ngày:**
- ✅ Docker Compose configuration hoàn chỉnh
- ✅ System có thể chạy với 1 lệnh: `docker compose up -d`
- ✅ Setup scripts hoạt động

---

### Ngày 27 (Thứ 5, 29/10): Documentation & Testing

**Người A & B (Documentation):**
- [ ] **Update README.md**
  - Project overview
  - Features list
  - Tech stack
  - Installation instructions (Docker Compose)
  - Configuration guide
  - Usage guide

- [ ] **Create API Documentation**
  - Use Swagger/OpenAPI with FastAPI
  - Document all endpoints
  - Include request/response examples
  - Include authentication requirements

- [ ] **Create User Manual**
  - Student guide: How to submit code, use AI tutor
  - Teacher guide: How to manage class, grade submissions
  - Admin guide: How to configure system, monitor

- [ ] **Create Technical Documentation**
  - Architecture diagram
  - Database schema
  - AI prompt engineering guide
  - RAG knowledge base structure

**Người A & B (Testing):**
- [ ] **Load Testing**
  - Test with 50-100 concurrent submissions
  - Monitor system performance
  - Identify bottlenecks

- [ ] **Security Testing**
  - Test Sandbox security (try to break out)
  - Test API security (unauthorized access)
  - Test SQL injection, XSS (if applicable)

**Deliverable cuối ngày:**
- ✅ Documentation hoàn chỉnh
- ✅ Load testing completed
- ✅ Security testing completed

---

### Ngày 28 (Thứ 6, 30/10): Bug Fixes & Final Polish

**Người A & B (Bug Fixes):**
- [ ] **Fix Bugs from Testing**
  - Fix performance issues
  - Fix security vulnerabilities
  - Fix UI/UX issues

- [ ] **Final Polish**
  - Improve error messages
  - Add loading spinners
  - Add empty states
  - Improve responsive design
  - Add dark mode (optional)

**Deliverable cuối ngày:**
- ✅ All critical bugs fixed
- ✅ UI/UX polished
- ✅ System stable

---

### Ngày 29 (Thứ 7, 31/10): Milestone 4 - Production Ready

**Người A & B (Final Review & Handover):**
- [ ] **Final System Review**
  - Review all 44 Use Cases
  - Verify all features work end-to-end
  - Verify all edge cases handled

- [ ] **Create Presentation Slides**
  - Project overview
  - Features demo
  - Architecture
  - AI integration
  - RAG knowledge base
  - Security features
  - Performance metrics
  - Future work

- [ ] **Prepare Demo**
  - Prepare demo scenarios:
    - Student submits code → Auto-grader → AI Tutor
    - Teacher manages class → Grades → Gradebook
    - Admin configures AI → Monitors system

- [ ] **Final Commit & Tag**
  - Commit all changes
  - Create git tag: `v1.0.0`
  - Write release notes

**Deliverable cuối ngày:**
- ✅ Milestone 4 hoàn thành: Production Ready
- ✅ System hoàn chỉnh 100%
- ✅ Documentation hoàn chỉnh
- ✅ Presentation slides hoàn chỉnh
- ✅ Demo scenarios chuẩn bị
- ✅ Release v1.0.0

---

## 6. DANH SÁCH MILESTONE & DELIVERABLE

### Milestone 1: Core Grading System (09/10)
**Deliverables:**
- ✅ Database schema hoàn chỉnh
- ✅ Authentication (JWT) hoạt động
- ✅ Docker Sandbox chạy Python/C++/Java/JS
- ✅ Auto-Grader chấm điểm tự động
- ✅ Monaco Editor UI
- ✅ Submission & Result pages
- ✅ Documentation cơ bản

**Success Criteria:**
- Sinh viên có thể đăng nhập, làm bài, nộp bài, nhận điểm tự động
- Sandbox security hoạt động (network blocked, memory limited)
- Auto-grader chấm đúng với test cases

---

### Milestone 2: AI Integration (16/10)
**Deliverables:**
- ✅ ContextBuilder thu thập dữ liệu
- ✅ Static analysis (flake8, radon, clang-tidy)
- ✅ RAG knowledge base (ChromaDB)
- ✅ AI Engine (Google Gemini integration)
- ✅ AI Review pipeline
- ✅ AI Tutor Chat interface
- ✅ Security analysis
- ✅ AI Feedback UI

**Success Criteria:**
- AI đọc hiểu code và phân tích độ phức tạp
- AI chấm điểm clean code
- AI phát hiện lỗi bảo mật
- AI Tutor gợi ý theo phương pháp Socratic (không giải hộ code)
- RAG retrieval hoạt động chính xác

---

### Milestone 3: Teaching Suite (23/10)
**Deliverables:**
- ✅ RBAC (5 roles)
- ✅ Class management
- ✅ Problem assignment
- ✅ Manual grading with rubric
- ✅ Gradebook
- ✅ Teacher Portal
- ✅ Student grade view

**Success Criteria:**
- Giáo viên có thể tạo lớp, giao bài, chấm điểm
- Giáo viên có thể xác nhận điểm chính thức
- Gradebook hiển thị chính xác
- RBAC enforced đúng permissions

---

### Milestone 4: Production Ready (31/10)
**Deliverables:**
- ✅ User management & Import/Export
- ✅ Organization management
- ✅ AI configuration & monitoring
- ✅ Sandbox monitoring & logs
- ✅ Docker Compose packaging
- ✅ Documentation (README, API docs, User manual, Technical docs)
- ✅ Load testing & Security testing
- ✅ Presentation slides
- ✅ Release v1.0.0

**Success Criteria:**
- Hệ thống chạy được với 1 lệnh: `docker compose up -d`
- Quản trị viên có thể cấu hình và giám sát hệ thống
- Documentation hoàn chỉnh
- Presentation slides hoàn chỉnh
- Demo scenarios hoạt động
- 44 Use Cases hoàn thành 100%

---

## 7. MA TRẬN RỦI RO & GIẢI PHÁP

| Rủi ro | Mức độ | Giải pháp | Kế hoạch dự phòng |
|--------|--------|-----------|-------------------|
| **AI API rate limit exceeded** | Trung bình | Dùng Google Gemini Free Tier (1.500 RPD) - đủ cho đồ án | Thêm OpenAI làm fallback, hoặc dùng Local LLM (Ollama) |
| **Docker Sandbox security breach** | Cao | Test thoroughly, use read-only fs, network none, non-root user | Thêm thêm layers: seccomp, AppArmor, SELinux |
| **AI gives code solutions (not Socratic)** | Trung bình | Implement guardrails, filter keywords, test extensively | Manual review of AI responses, fallback to generic hints |
| **RAG retrieval inaccurate** | Trung bình | Fine-tune embeddings, improve metadata tagging, test with sample queries | Disable RAG for MVP, use direct LLM only |
| **Performance issues (slow grading)** | Trung bình | Optimize Docker container, use caching, optimize queries | Add Celery workers for parallel processing |
| **Database migration fails** | Thấp | Test migrations on dev environment, backup database | Manual SQL fix, rollback migration |
| **Frontend build fails** | Thấp | Test build on different environments, use Docker for consistency | Fix dependencies, use stable versions |
| **Deadline missed** | Cao | Focus on MVP core (Auto-Grader + AI Tutor), defer non-essential features | Negotiate extension, reduce scope |

---

## 8. GHI CHÚ QUAN TRỌNG

### 8.1. Chi phí 0 đồng
- Google Gemini Free Tier: 1.500 RPD (sufficient for development and demo)
- OpenAI: Chỉ dùng làm fallback (optional)
- ChromaDB: Local, free
- Sentence-Transformers: Local, free
- Docker, PostgreSQL, Redis: Open-source, free

### 8.2. Tech Stack Summary
**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy + Alembic
- PostgreSQL
- Redis + Celery
- Docker (docker-py)
- Google Generative AI (Gemini)
- ChromaDB
- sentence-transformers

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Monaco Editor
- Axios

**DevOps:**
- Docker Compose
- Git

### 8.3. Backup Plan (Nếu solo hoặc time constrained)
Nếu chỉ có 1 người hoặc thời gian không đủ:
- **Phase 1 (Week 1-2):** Focus chỉ trên MVP core
  - Auto-Grader + Docker Sandbox
  - Basic AI Tutor (không RAG, không security analysis)
  - Student dashboard + submission UI
- **Phase 2 (Week 3-4):** Nếu còn thời gian
  - Thêm RAG
  - Thêm security analysis
  - Thêm teacher portal (có thể defer)
  - Thêm admin panel (có thể defer)

### 8.4. Success Metrics
- ✅ 44 Use Cases hoàn thành
- ✅ AI Tutor gợi ý Socratic (không giải hộ code)
- ✅ Auto-Grader chấm điểm chính xác
- ✅ Docker Sandbox an toàn
- ✅ Hệ thống chạy stable với Docker Compose
- ✅ Documentation hoàn chỉnh
- ✅ Demo hoạt động mượt mà

---

**Last Updated:** 03/10/2026
**Version:** 2.0 (Detailed Implementation Roadmap)
