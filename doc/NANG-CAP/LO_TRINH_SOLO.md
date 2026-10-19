# LỘ TRÌNH TRIỂN KHAI CHO SOLO DEVELOPER (1 NGƯỜI)
# SOLO DEVELOPER ROADMAP - AI CODING TUTOR

> **Chiến lược:** MVP-First - Tập trung vào tính năng cốt lõi trước, mở rộng sau
> **Deadline:** 31/10/2026
> **Chi phí:** 0 đồng (100% Free)
> **Scope:** Reduced MVP (thay vì full 44 Use Cases)

---

## 📑 MỤC LỤC

1. [Chiến lược Solo Developer](#1-chien-lược-solo-developer)
2. [Phân chia Scope (MVP vs Full)](#2-phan-chia-scope-mvp-vs-full)
3. [Tuần 1: MVP Core - Auto-Grader (03/10 - 09/10)](#3-tuần-1-mvp-core---auto-grader-0310---0910)
4. [Tuần 2: MVP Core - AI Tutor (10/10 - 16/10)](#4-tuần-2-mvp-core---ai-tutor-1010---1610)
5. [Tuần 3: Enhancement - RAG & Security (17/10 - 23/10)](#5-tuần-3-enhancement---rag--security-1710---2310)
6. [Tuần 4: Polish & Handover (24/10 - 31/10)](#6-tuần-4-polish--handover-2410---3110)
7. [Phase 2: Tính năng mở rộng (Sau deadline)](#7-phase-2-tinh-nang-mo-rong-sau-deadline)
8. [Tips cho Solo Developer](#8-tips-cho-solo-developer)

---

## 1. CHIẾN LƯỢC SOLO DEVELOPER

### 1.1. Thực tế solo developer

**Giới hạn:**
- ⏰ Thời gian: 4 tuần (28 ngày) - rất chặt
- 🧠 Cognitive load: Phải làm cả Backend + Frontend + DevOps + AI
- 🔧 Resources: Chỉ có 1 máy, không có peer review
- 📊 Scope: Không thể làm full 44 Use Cases trong 4 tuần

**Chiến lược:**
1. **MVP-First:** Chỉ làm những gì cần thiết để đồ án đạt điểm tối đa
2. **Single Role:** Không làm RBAC phức tạp, chỉ có 2 role: Student và Admin
3. **No Teacher Portal:** Giáo viên dùng Admin Panel để giao bài và chấm điểm
4. **Deferred Features:** RAG, Security Analysis, Advanced Monitoring có thể làm sau
5. **Leverage AI:** Dùng AI để giúp coding (GitHub Copilot, Cursor, Devin)

---

### 1.2. Success Criteria cho MVP

**Tối thiểu phải có:**
- ✅ Sinh viên đăng nhập, làm bài, nộp bài
- ✅ Auto-Grader chấm điểm tự động với Docker Sandbox
- ✅ AI Tutor gợi ý theo phương pháp Socratic
- ✅ AI phân tích code quality và độ phức tạp
- ✅ Admin có thể tạo bài tập và xem kết quả
- ✅ Hệ thống chạy được với Docker Compose

**Nice-to-have (nếu còn thời gian):**
- ⭐ RAG knowledge base
- ⭐ Security analysis
- ⭐ Teacher Portal riêng biệt
- ⭐ Advanced monitoring
- ⭐ Gradebook export

---

## 2. PHÂN CHIA SCOPE (MVP VS FULL)

### 2.1. MVP Scope (Solo Developer - 4 tuần)

| Tính năng | MVP | Full | Lý do defer |
|----------|-----|-----|-------------|
| **Authentication** | ✅ JWT Login/Logout | ✅ RBAC 5 roles | Chỉ cần Student + Admin |
| **Database** | ✅ Users, Problems, TestCases, Submissions | ✅ + Classes, Enrollments, Rubrics | Admin quản lý trực tiếp |
| **Docker Sandbox** | ✅ Python, C++ | ✅ + Java, JavaScript | 2 ngôn ngữ đủ cho demo |
| **Auto-Grader** | ✅ Chấm test cases | ✅ + Batch grading, Retry | Chấm single submission đủ |
| **AI Tutor** | ✅ Socratic chat, basic AI review | ✅ + RAG, Security Analysis | AI cơ bản đủ cho MVP |
| **Class Management** | ❌ | ✅ Classes, Enrollments | Admin giao bài trực tiếp cho tất cả |
| **Manual Grading** | ❌ | ✅ Rubric, Manual score | Chỉ dùng auto-score |
| **Gradebook** | ❌ | ✅ Export CSV, Statistics | Admin xem trực tiếp database |
| **Admin Panel** | ✅ Basic CRUD | ✅ Advanced monitoring | Basic CRUD đủ |
| **User Management** | ✅ Create user | ✅ Import CSV, Organizations | Tạo thủ công đủ |
| **Monitoring** | ❌ | ✅ Logs, Metrics, Dashboard | Không cần cho MVP |
| **Documentation** | ✅ README | ✅ API docs, User manual | README đủ |

---

### 2.2. Use Cases cho MVP (giảm từ 44 xuống ~20)

**Core Use Cases (Must-have):**
- UC-01: Đăng nhập
- UC-02: Đăng xuất
- UC-05: Xem danh sách bài tập
- UC-06: Xem chi tiết đề bài
- UC-07: Viết code trên Monaco Editor
- UC-08: Nộp bài
- UC-09: Xem kết quả chấm điểm
- UC-13: Xem nhận xét AI
- UC-14: Tương tác với AI Tutor
- UC-28: Admin tạo bài tập
- UC-29: Admin xem danh sách bài nộp
- UC-30: Admin xem chi tiết bài nộp
- UC-31: Admin xóa bài tập
- UC-32: Admin xóa bài nộp

**Deferred Use Cases (Nice-to-have):**
- Class management (UC-23, UC-36, UC-37)
- Manual grading (UC-27)
- Gradebook (UC-16, UC-25)
- User import (UC-33)
- Organizations (UC-43)
- AI config (UC-40)
- Sandbox monitoring (UC-41, UC-42)
- System logs (UC-44)

---

## 3. TUẦN 1: MVP CORE - AUTO-GRADER (03/10 - 09/10)

### 🎯 Mục tiêu Tuần 1
Sinh viên có thể đăng nhập, làm bài (Python/C++), nộp bài, và nhận điểm tự động từ Docker Sandbox.

---

### Ngày 1 (Thứ 7, 03/10): Khởi tạo dự án & Database

**Tasks:**
- [ ] **Setup Backend**
  - Init FastAPI project: `fastapi create backend`
  - Setup Poetry: `poetry init`
  - Install dependencies:
    ```bash
    poetry add fastapi uvicorn sqlalchemy alembic psycopg2-binary redis celery python-jose bcrypt passlib[bcrypt]
    ```
  - Setup `.env`:
    ```env
    DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_coding_tutor
    REDIS_URL=redis://localhost:6379/0
    SECRET_KEY=your-secret-key-change-this
    ```

- [ ] **Setup Frontend**
  - Init Next.js: `npx create-next-app@latest frontend`
  - Install dependencies:
    ```bash
    cd frontend
    npm install @monaco-editor/react axios react-hook-form zod clsx tailwind-merge
    npm install -D @types/node
    ```
  - Setup Tailwind CSS

- [ ] **Design Database Schema (Minimal)**
  - `User`: id, email, password_hash, role (STUDENT/ADMIN), created_at
  - `Problem`: id, title, description, input_format, output_format, constraints, time_limit, memory_limit, language (python/cpp)
  - `TestCase`: id, problem_id, input, expected_output, is_hidden
  - `Submission`: id, user_id, problem_id, code, language, submitted_at, status, auto_score, memory_used, time_used
  - Create Alembic migrations

**Deliverable:**
- ✅ Backend và Frontend projects setup
- ✅ Database migrations chạy được
- ✅ Docker Compose với PostgreSQL và Redis

---

### Ngày 2 (Chủ nhật, 04/10): Authentication

**Tasks:**
- [ ] **Backend Auth**
  - `POST /api/v1/auth/login` - JWT login
  - `POST /api/v1/auth/logout` - JWT logout
  - Middleware `get_current_user`
  - Password hashing với bcrypt

- [ ] **Frontend Auth**
  - Login page: `app/login/page.tsx`
  - Auth context: `contexts/AuthContext.tsx`
  - Protected route wrapper
  - Store token in localStorage

- [ ] **Seed Data**
  - Script tạo admin user: `admin@demo.com` / `admin123`
  - Script tạo student user: `student@demo.com` / `student123`

**Deliverable:**
- ✅ Có thể đăng nhập với admin và student
- ✅ Token được validate thành công

---

### Ngày 3 (Thứ 2, 05/10): Docker Sandbox

**Tasks:**
- [ ] **Setup Docker Sandbox**
  - Install `docker-py`: `poetry add docker`
  - Design security constraints:
    - `--network none`
    - `--memory 256m`
    - `--read-only`
    - Non-root user
  - Create `services/sandbox_service.py`:
    ```python
    def run_code(code: str, language: str, test_input: str, time_limit: int, memory_limit: int):
        # Create Docker container
        # Run code with constraints
        # Capture stdout, stderr, exit code
        # Measure time and memory
        # Return result
    ```

- [ ] **Test Sandbox**
  - Test Python hello world
  - Test C++ hello world
  - Test timeout (infinite loop)
  - Test memory limit (array quá lớn)
  - Test security (try to access filesystem)

**Deliverable:**
- ✅ Docker Sandbox chạy được Python và C++
- ✅ Security guardrails hoạt động

---

### Ngày 4 (Thứ 3, 06/10): Monaco Editor & Submission

**Tasks:**
- [ ] **Frontend Monaco Editor**
  - Install: `npm install @monaco-editor/react`
  - Create `components/MonacoEditor.tsx`
  - Configure language support (Python, C++)
  - Add syntax highlighting

- [ ] **Frontend Submission Page**
  - `app/problems/[id]/submit/page.tsx`
  - Monaco Editor + Submit button
  - Display problem description sidebar
  - Autosave to localStorage

- [ ] **Backend Submission API**
  - `POST /api/v1/submissions`
  - Validate input
  - Save to database (status: PENDING)

**Deliverable:**
- ✅ Monaco Editor hoạt động
- ✅ Có thể nộp bài

---

### Ngày 5 (Thứ 4, 07/10): Auto-Grader

**Tasks:**
- [ ] **Backend Auto-Grader**
  - `services/grader_service.py`:
    ```python
    def grade_submission(submission_id: int):
        # Fetch submission
        # Fetch test cases
        # Run each test case in sandbox
        # Compare output
        # Calculate score
        # Update submission
    ```
  - Setup Celery: `poetry add celery`
  - Create Celery task: `grade_submission_task(submission_id)`
  - Configure Celery worker

- [ ] **Integrate with Submission**
  - Trigger Celery task after submission created
  - Update status: PENDING → GRADING → COMPLETED

- [ ] **Frontend Result Page**
  - `app/submissions/[id]/page.tsx`
  - Display: score, status, test case results

**Deliverable:**
- ✅ Auto-Grader chấm điểm tự động
- ✅ Kết quả hiển thị trên frontend

---

### Ngày 6 (Thứ 5, 08/10): Problem Management (Admin)

**Tasks:**
- [ ] **Backend Problem API**
  - `POST /api/v1/problems` - Create problem (ADMIN only)
  - `GET /api/v1/problems` - List problems
  - `GET /api/v1/problems/{id}` - Get problem details
  - `PUT /api/v1/problems/{id}` - Update problem
  - `DELETE /api/v1/problems/{id}` - Delete problem

- [ ] **Frontend Problem Management**
  - `app/admin/problems/page.tsx` - List problems
  - `app/admin/problems/create/page.tsx` - Create problem form
  - Add test case inputs (multiple)

- [ ] **Frontend Problem List (Student)**
  - `app/problems/page.tsx` - Display problems
  - Filter by language

**Deliverable:**
- ✅ Admin có thể tạo bài tập
- ✅ Student có thể xem danh sách bài tập

---

### Ngày 7 (Thứ 6, 09/10): Milestone 1 - Auto-Grader Complete

**Tasks:**
- [ ] **End-to-End Testing**
  - Test flow: Login → View Problems → Select Problem → Write Code → Submit → View Result
  - Test với Python và C++
  - Test edge cases

- [ ] **Bug Fixes**
  - Fix any bugs
  - Optimize performance

- [ ] **Documentation**
  - Update README with setup instructions

**Deliverable:**
- ✅ Milestone 1 hoàn thành: Auto-Grader hoạt động 100%
- ✅ Sinh viên có thể làm bài và nhận điểm

---

## 4. TUẦN 2: MVP CORE - AI TUTOR (10/10 - 16/10)

### 🎯 Mục tiêu Tuần 2
AI đọc hiểu code, phân tích độ phức tạp, chấm điểm clean code, và gợi ý theo phương pháp Socratic.

---

### Ngày 8 (Thứ 7, 10/10): AI Integration Setup

**Tasks:**
- [ ] **Setup Google Gemini API**
  - Sign up Google AI Studio: https://aistudio.google.com/
  - Get API key (Free Tier)
  - Install: `poetry add google-generativeai`
  - Create `services/ai_service.py`:
    ```python
    import google.generativeai as genai

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash")
    ```

- [ ] **Define AI Feedback Schema**
  - `schemas/ai_feedback.py`:
    ```python
    from pydantic import BaseModel
    from typing import List

    class AIFeedbackResponse(BaseModel):
        quality_score: int  # 0-100
        complexity_score: int  # 0-100
        cyclomatic_analysis: str  # "Low/Medium/High"
        code_smells: List[str]
        socratic_hints: List[str]
    ```

- [ ] **Design System Prompt**
  - Socratic AI Tutor prompt:
    ```python
    SYSTEM_PROMPT = """
    Bạn là trợ giảng AI chuyên về lập trình. Nhiệm vụ của bạn:
    1. Phân tích code của sinh viên
    2. Chấm điểm chất lượng code (0-100)
    3. Đánh giá độ phức tạp thuật toán
    4. Phát hiện code smells
    5. Đưa ra gợi ý theo phương pháp Socratic (không giải hộ code)

    QUAN TRỌNG: KHÔNG BAO GIỜ ĐƯA CODE GIẢI QUYẾT TRỰC TIẾP.
    Thay vào đó, hãy đặt câu hỏi gợi mở để sinh viên tự tìm ra giải pháp.
    """
    ```

**Deliverable:**
- ✅ Google Gemini API setup
- ✅ AI Feedback Schema định nghĩa
- ✅ System prompt thiết kế

---

### Ngày 9 (Chủ nhật, 11/10): ContextBuilder & Static Analysis

**Tasks:**
- [ ] **Implement ContextBuilder**
  - `services/context_builder.py`:
    ```python
    def build_context(submission_id: int) -> dict:
        # Fetch submission
        # Fetch problem description
        # Fetch test case results
        # Run static analysis
        # Return structured context
    ```

- [ ] **Static Analysis Tools**
  - Install: `poetry add flake8 radon`
  - Python static analysis:
    ```python
    def analyze_python_code(code: str):
        # Run flake8 for code style
        # Run radon for cyclomatic complexity
        # Return metrics
    ```
  - C++ static analysis (optional, use clang-tidy if available)

**Deliverable:**
- ✅ ContextBuilder hoạt động
- ✅ Static analysis chạy được

---

### Ngày 10 (Thứ 2, 12/10): AI Review Pipeline

**Tasks:**
- [ ] **Implement AI Review Service**
  - `services/ai_review_service.py`:
    ```python
    def generate_ai_feedback(submission_id: int) -> AIFeedbackResponse:
        # Build context
        # Call LLM with context
        # Parse structured output
        # Return feedback
    ```

- [ ] **Integrate with Auto-Grader**
  - After grading complete → trigger AI review task
  - Update submission with AI feedback

- [ ] **Update Database Schema**
  - Add `ai_feedback` column to Submission (JSON)
  - Add `ai_reviewed_at` timestamp

**Deliverable:**
- ✅ AI Review pipeline hoạt động
- ✅ AI feedback được lưu

---

### Ngày 11 (Thứ 3, 13/10): AI Feedback UI

**Tasks:**
- [ ] **Frontend AI Feedback Component**
  - `components/AIFeedbackCard.tsx`
  - Tabs:
    - Code Quality (quality_score, code_smells)
    - Complexity (complexity_score, cyclomatic_analysis)
    - Socratic Hints (list of prompts)
  - Use progress bars, badges

- [ ] **Integrate with Submission Page**
  - Add AI Feedback tab to submission result page
  - Display after AI review complete

**Deliverable:**
- ✅ AI Feedback UI hiển thị kết quả

---

### Ngày 12 (Thứ 4, 14/10): AI Tutor Chat

**Tasks:**
- [ ] **Backend Chat API**
  - `POST /api/v1/tutor/chat`
  - Accept: submission_id, user_message
  - Pipeline:
    1. Build context
    2. Call LLM with context + message
    3. Enforce Socratic method
    4. Return response

- [ ] **Conversation History**
  - Simple in-memory storage (đơn giản cho MVP)
  - Hoặc lưu trong database nếu còn thời gian

- [ ] **Frontend Chat UI**
  - `components/AITutorChat.tsx`
  - Drawer/Sidebar next to Monaco Editor
  - Message list with user/AI distinction
  - Input field with send button
  - Markdown rendering

**Deliverable:**
- ✅ AI Tutor Chat API hoạt động
- ✅ Chat UI hoạt động

---

### Ngày 13 (Thứ 5, 15/10): Guardrails & Testing

**Tasks:**
- [ ] **Implement Guardrails**
  - Prevent AI from giving code solutions
  - Keyword filtering (detect if AI is giving code)
  - Fallback response if guardrails triggered

- [ ] **Test AI Tutor**
  - Test với các câu hỏi khác nhau
  - Verify AI không đưa code giải quyết
  - Verify AI gợi ý theo phương pháp Socratic

- [ ] **Refine System Prompt**
  - Adjust prompt based on testing
  - Improve Socratic hints

**Deliverable:**
- ✅ Guardrails hoạt động
- ✅ AI Tutor hoạt động đúng Socratic method

---

### Ngày 14 (Thứ 6, 16/10): Milestone 2 - AI Tutor Complete

**Tasks:**
- [ ] **End-to-End AI Testing**
  - Test flow: Submit code → Auto-grader → AI Review → AI Tutor Chat
  - Test với code quality khác nhau

- [ ] **Bug Fixes**
  - Fix AI hallucinations
  - Fix chat bugs

- [ ] **Performance Optimization**
  - Optimize AI response time (< 2s)

**Deliverable:**
- ✅ Milestone 2 hoàn thành: AI Tutor hoạt động 100%
- ✅ AI gợi ý theo phương pháp Socratic

---

## 5. TUẦN 3: ENHANCEMENT - RAG & SECURITY (17/10 - 23/10)

### 🎯 Mục tiêu Tuần 3
Nếu còn thời gian, thêm RAG knowledge base và Security Analysis. Nếu không, skip sang Week 4.

---

### Ngày 15 (Thứ 7, 17/10): RAG Setup (Optional)

**Tasks:**
- [ ] **Setup ChromaDB**
  - Install: `poetry add chromadb sentence-transformers`
  - Run ChromaDB local
  - Create collections: `error_patterns`, `algorithm_knowledge`

- [ ] **Implement RAG Service**
  - `services/rag_service.py`:
    ```python
    def embed_text(text: str):
        # Generate embedding

    def search_similar(collection: str, query: str, top_k: int):
        # Search vector DB
    ```

- [ ] **Seed Knowledge Base**
  - Script seed error patterns phổ biến
  - Script seed algorithm knowledge

**Deliverable:**
- ✅ ChromaDB setup (optional)

---

### Ngày 16 (Chủ nhật, 18/10): Integrate RAG (Optional)

**Tasks:**
- [ ] **Update AI Prompt to Use RAG**
  - Query RAG before calling LLM
  - Add retrieved context to prompt

- [ ] **Test RAG**
  - Test retrieval accuracy
  - Test if AI references knowledge base

**Deliverable:**
- ✅ RAG integration (optional)

---

### Ngày 17 (Thứ 2, 19/10): Security Analysis (Optional)

**Tasks:**
- [ ] **Enhance AI Prompt for Security**
  - Add security analysis instructions
  - Detect SQL injection, buffer overflow, hardcoded secrets

- [ ] **Update AI Feedback Schema**
  - Add `security_vulnerabilities` field

- [ ] **Test Security Analysis**
  - Create test submissions with vulnerabilities
  - Verify AI detects them

**Deliverable:**
- ✅ Security analysis (optional)

---

### Ngày 18-21 (Thứ 3 - Thứ 6, 20/10 - 23/10): Skip hoặc Polish

**Option A: Nếu Week 3 làm RAG/Security**
- [ ] Testing và refinement
- [ ] Bug fixes

**Option B: Nếu Week 3 skip RAG/Security**
- [ ] Bắt đầu Week 4 sớm hơn
- [ ] Tập trung vào polish và documentation

**Deliverable:**
- ✅ Enhancement hoàn chỉnh (hoặc skip)

---

## 6. TUẦN 4: POLISH & HANDOVER (24/10 - 31/10)

### 🎯 Mục tiêu Tuần 4
Polish UI, đóng gói Docker Compose, documentation, và chuẩn bị demo.

---

### Ngày 22 (Thứ 7, 24/10): UI Polish

**Tasks:**
- [ ] **Improve UI/UX**
  - Add loading states
  - Add error handling
  - Add empty states
  - Improve responsive design
  - Add dark mode (optional)

- [ ] **Fix UI Bugs**
  - Fix layout issues
  - Fix alignment
  - Fix accessibility

**Deliverable:**
- ✅ UI polished

---

### Ngày 23 (Chủ nhật, 25/10): Admin Panel Enhancement

**Tasks:**
- [ ] **Enhance Admin Panel**
  - `app/admin/page.tsx` - Admin dashboard
  - Statistics: Total submissions, average score
  - Quick actions: Create problem, View submissions

- [ ] **Admin Submission List**
  - `app/admin/submissions/page.tsx`
  - Table with all submissions
  - Filter by problem, user, status
  - View details button

**Deliverable:**
- ✅ Admin panel enhanced

---

### Ngày 24 (Thứ 2, 26/10): Docker Compose Packaging

**Tasks:**
- [ ] **Create Docker Compose**
  - `docker-compose.yml`:
    ```yaml
    services:
      postgres:
        image: postgres:15
        environment:
          POSTGRES_DB: ai_coding_tutor
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
        volumes:
          - postgres_data:/var/lib/postgresql/data

      redis:
        image: redis:7
        ports:
          - "6379:6379"

      backend:
        build: ./backend
        ports:
          - "8000:8000"
        depends_on:
          - postgres
          - redis
        environment:
          DATABASE_URL: postgresql://postgres:password@postgres:5432/ai_coding_tutor
          REDIS_URL: redis://redis:6379/0

      frontend:
        build: ./frontend
        ports:
          - "3000:3000"
        depends_on:
          - backend

      celery-worker:
        build: ./backend
        command: celery -A app.main worker --loglevel=info
        depends_on:
          - postgres
          - redis
        environment:
          DATABASE_URL: postgresql://postgres:password@postgres:5432/ai_coding_tutor
          REDIS_URL: redis://redis:6379/0

    volumes:
      postgres_data:
    ```

- [ ] **Create Dockerfiles**
  - `backend/Dockerfile`
  - `frontend/Dockerfile`

- [ ] **Test Docker Compose**
  - `docker compose up -d`
  - Verify all services run
  - Test end-to-end flow

**Deliverable:**
- ✅ Docker Compose hoạt động

---

### Ngày 25 (Thứ 3, 27/10): Documentation

**Tasks:**
- [ ] **Update README.md**
  - Project overview
  - Features
  - Tech stack
  - Installation (Docker Compose)
  - Usage
  - Demo credentials

- [ ] **Create Setup Guide**
  - Step-by-step setup instructions
  - Troubleshooting

- [ ] **Create API Documentation**
  - Use FastAPI auto-docs (`/docs`)
  - Document key endpoints

**Deliverable:**
- ✅ Documentation hoàn chỉnh

---

### Ngày 26 (Thứ 4, 28/10): Testing & Bug Fixes

**Tasks:**
- [ ] **Load Testing**
  - Test với 10-20 concurrent submissions
  - Monitor performance

- [ ] **Security Testing**
  - Test Sandbox security
  - Test API security

- [ ] **Bug Fixes**
  - Fix any remaining bugs

**Deliverable:**
- ✅ Testing hoàn tất
- ✅ Bugs fixed

---

### Ngày 27 (Thứ 5, 29/10): Presentation Slides

**Tasks:**
- [ ] **Create Presentation**
  - Slide 1: Title & Team
  - Slide 2: Problem Statement
  - Slide 3: Solution Overview
  - Slide 4: Architecture
  - Slide 5: Tech Stack
  - Slide 6: Features (Auto-Grader, AI Tutor)
  - Slide 7: AI Integration (Socratic Method)
  - Slide 8: Docker Sandbox Security
  - Slide 9: Demo (Video/Screenshots)
  - Slide 10: Challenges & Solutions
  - Slide 11: Future Work
  - Slide 12: Q&A

- [ ] **Prepare Demo**
  - Create demo script
  - Record demo video (optional)

**Deliverable:**
- ✅ Presentation slides
- ✅ Demo chuẩn bị

---

### Ngày 28 (Thứ 6, 30/10): Final Review

**Tasks:**
- [ ] **Final System Review**
  - Review all features
  - Verify end-to-end flow
  - Check documentation

- [ ] **Final Polish**
  - Minor fixes
  - Code cleanup

**Deliverable:**
- ✅ System ready

---

### Ngày 29 (Thứ 7, 31/10): Handover

**Tasks:**
- [ ] **Final Commit**
  - Commit all changes
  - Create tag: `v1.0.0`

- [ ] **Export Project**
  - Zip project files
  - Include Docker Compose
  - Include documentation

- [ ] **Submit**
  - Submit to teacher
  - Prepare for defense

**Deliverable:**
- ✅ Project submitted
- ✅ v1.0.0 release

---

## 7. PHASE 2: TÍNH NĂNG MỞ RỘNG (SAU DEADLINE)

Nếu còn thời gian sau deadline hoặc muốn phát triển thêm:

### 7.1. Class Management
- Classes và Enrollments
- Student join class by code
- Teacher manage their classes

### 7.2. Teacher Portal
- Separate teacher dashboard
- Assign problems to classes
- Manual grading with rubric
- Gradebook with export

### 7.3. Advanced AI Features
- RAG knowledge base (full implementation)
- Security analysis (OWASP CWE)
- Code similarity detection
- Personalized learning paths

### 7.4. Advanced Monitoring
- System logs dashboard
- AI usage metrics
- Sandbox monitoring
- Performance analytics

### 7.5. User Management
- Import users from CSV
- Organization management
- Bulk operations

---

## 8. TIPS CHO SOLO DEVELOPER

### 8.1. Quản lý thời gian

**Pomodoro Technique:**
- 25 phút work → 5 phút break
- 4 cycles → 30 phút break
- Giúp duy trì focus

**Time Blocking:**
- Block 4-6 tiếng mỗi ngày cho coding
- Block 1 tiếng cho planning/review
- Block 1 tiếng cho documentation

**Weekly Review:**
- Cuối mỗi tuần: review progress
- Điều chỉnh kế hoạch nếu cần
- Don't be afraid to cut scope

---

### 8.2. Quản lý scope

**MVP Mindset:**
- Focus on core value first
- Defer nice-to-have features
- "Done is better than perfect"

**Feature Prioritization:**
1. Must-have (Auto-Grader, AI Tutor)
2. Should-have (Admin Panel, Documentation)
3. Nice-to-have (RAG, Security Analysis, Advanced Monitoring)

**Scope Creep Prevention:**
- Define MVP clearly before starting
- Stick to the plan
- If adding feature, remove another

---

### 8.3. Sử dụng AI để hỗ trợ

**GitHub Copilot / Cursor:**
- Dùng để generate boilerplate code
- Dùng để refactor
- Dùng để write tests

**ChatGPT / Claude:**
- Dùng để debug errors
- Dùng để explain code
- Dùng để brainstorm solutions

**Devin (current tool):**
- Dùng để search codebase
- Dùng để refactor large sections
- Dùng to write documentation

---

### 8.4. Testing strategies

**Test Early, Test Often:**
- Don't wait until end to test
- Test each feature as you build it
- Write simple tests if possible

**Manual Testing Checklist:**
- [ ] Login/logout works
- [ ] Can submit code
- [ ] Auto-grader grades correctly
- [ ] AI Tutor responds
- [ ] Admin can create problems
- [ ] Docker Compose runs

**Edge Cases:**
- Empty submission
- Invalid code
- Timeout
- Memory limit
- Network error

---

### 8.5. Debugging tips

**Log Everything:**
- Log API requests
- Log AI calls
- Log Sandbox executions
- Log errors

**Use breakpoints:**
- VS Code debugger
- Print statements (quick and dirty)

**Error Handling:**
- Try-except where needed
- Graceful error messages
- Don't crash on errors

---

### 8.6. Code organization

**Keep it Simple:**
- Don't over-engineer
- Use simple patterns
- Avoid premature optimization

**Folder Structure:**
```
backend/
  app/
    main.py
    models/
    schemas/
    services/
    api/
      v1/
        endpoints/
frontend/
  app/
    components/
    pages/
    contexts/
    lib/
docs/
  NANG-CAP/
```

**Naming Conventions:**
- Use descriptive names
- Follow language conventions (PEP 8 for Python, camelCase for JS)

---

### 8.7. Mental health

**Take Breaks:**
- Don't code 12 hours straight
- Take 5-10 minute breaks every hour
- Go for a walk

**Sleep:**
- Get 7-8 hours of sleep
- Sleep deprivation kills productivity

**Stay Positive:**
- Don't stress too much
- Remember: MVP is okay
- You can always improve later

---

## 9. SUCCESS METRICS FOR SOLO MVP

### Minimum Viable Success:
- ✅ Sinh viên có thể đăng nhập, làm bài, nộp bài
- ✅ Auto-Grader chấm điểm tự động
- ✅ AI Tutor gợi ý theo phương pháp Socratic
- ✅ Admin có thể tạo bài tập
- ✅ Hệ thống chạy được với Docker Compose
- ✅ Documentation cơ bản (README)
- ✅ Demo hoạt động

### Bonus Success (if time permits):
- ⭐ RAG knowledge base
- ⭐ Security analysis
- ⭐ Teacher Portal
- ⭐ Advanced monitoring
- ⭐ Gradebook export

---

## 10. CONTINGENCY PLAN

### Nếu gặp trục trặc:

**Week 1 quá chậm:**
- Skip C++ support, chỉ Python
- Defer Celery, run grading synchronously
- Reduce test cases

**Week 2 quá chậm:**
- Skip AI Tutor chat, chỉ AI Feedback
- Use simpler prompt
- Skip static analysis

**Week 3 quá chậm:**
- Skip RAG và Security Analysis
- Jump to Week 4 early

**Week 4 quá chậm:**
- Focus only on Docker Compose and README
- Skip presentation slides (use simple slides)
- Skip load testing

**Thành thật với giáo viên:**
- Nếu không kịp, nói trước
- Giải lý do (solo, scope lớn)
- Đề xuất extension
- Hoặc giảm scope

---

**Last Updated:** 03/10/2026
**Version:** 1.0 (Solo Developer Roadmap)
