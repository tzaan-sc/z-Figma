# 05. KIẾN TRÚC KỸ THUẬT (SYSTEM ARCHITECTURE & DATA FLOW)

---

## 1. KIẾN TRÚC TỔNG THỂ (HIGH-LEVEL ARCHITECTURE)

Hệ thống được thiết kế theo kiến trúc **Modular Monolith / Microservices-ready**, phân tách rõ ràng giữa Web Client, API Gateway, Cơ sở dữ liệu, Hàng đợi chấm bài và Môi trường Sandbox cách ly:

```
                                      ┌────────────────────────────────────────────────────────┐
                                      │                     CLIENT LAYER                       │
                                      │  Next.js 14 (App Router) + Tailwind CSS + Monaco IDE   │
                                      └───────────────────────────┬────────────────────────────┘
                                                                  │ HTTPS / WSS
                                                                  ▼
                                      ┌────────────────────────────────────────────────────────┐
                                      │                  API GATEWAY LAYER                     │
                                      │          FastAPI (Python 3.11) Asynchronous            │
                                      │  - JWT & RBAC Middleware  - Problem & Class Services   │
                                      │  - Submission Dispatcher  - AI Tutor Proxy Service     │
                                      └─────────────┬──────────────────────────┬───────────────┘
                                                    │                          │
                                        PostgreSQL Read/Write            Enqueue Submission
                                                    │                          │
                                                    ▼                          ▼
                                      ┌────────────────────────┐  ┌────────────────────────────┐
                                      │    DATA PERSISTENCE    │  │       MESSAGE BROKER       │
                                      │   PostgreSQL 15 (DB)   │  │       Redis 7 (Queue)      │
                                      └────────────────────────┘  └────────────┬───────────────┘
                                                                               │ Pull Job
                                                                               ▼
                                                                  ┌────────────────────────────┐
                                                                  │    GRADER WORKER CLUSTER   │
                                                                  │     Celery / Redis Worker  │
                                                                  └──────┬──────────────┬──────┘
                                                                         │              │
                                                       Spawn Container   │              │ Call API
                                                                         ▼              ▼
                                      ┌────────────────────────────────────┐ ┌─────────────────┐
                                      │       DOCKER SANDBOX ENGINE        │ │    AI ENGINE    │
                                      │ - gVisor / Non-root Sandbox runner │ │ - Google Gemini │
                                      │ - CPU/RAM/Time Limit Enforcement   │ │ - OpenAI GPT-4o │
                                      │ - Execution Evidence Collector     │ │ - Local Ollama  │
                                      └────────────────────────────────────┘ └─────────────────┘
```

---

## 2. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA & ERD)

### 2.1. Sơ Đồ Thực Thể Liên Kết (Entity Relationship Diagram - Mermaid)

```mermaid
erDiagram
    ORGANIZATION ||--o{ DEPARTMENT : contains
    DEPARTMENT ||--o{ USER : "staffed by"
    DEPARTMENT ||--o{ CLASS : owns
    ORGANIZATION ||--o{ USER : contains
    ORGANIZATION ||--o{ CLASS : owns
    USER ||--o{ CLASS_MEMBER : participates
    CLASS ||--o{ CLASS_MEMBER : has
    CLASS ||--o{ CLASS_ASSIGNMENT : assigns
    PROBLEM ||--o{ CLASS_ASSIGNMENT : assigned_to
    USER ||--o{ PROBLEM : creates
    PROBLEM ||--o{ TEST_CASE : contains
    PROBLEM ||--o{ RUBRIC_CRITERIA : defines
    USER ||--o{ SUBMISSION : submits
    PROBLEM ||--o{ SUBMISSION : target_of
    SUBMISSION ||--o{ TEST_RESULT : produces
    SUBMISSION ||--o{ AI_FEEDBACK : reviewed_by
    SUBMISSION ||--o{ TUTOR_CHAT_MESSAGE : discusses

    USER {
        uuid id PK
        uuid organization_id FK
        string email UK
        string hashed_password
        string full_name
        string role "STUDENT | TEACHER | ADMIN | STAFF | SUPER_ADMIN"
        boolean is_active
        timestamp created_at
    }

    DEPARTMENT {
        uuid id PK
        uuid organization_id FK
        string name
        string code UK
    }

    CLASS {
        uuid id PK
        uuid organization_id FK
        uuid department_id FK
        uuid teacher_id FK
        string name
        string code UK
        string description
        string status "ACTIVE | CLOSED | ARCHIVED"
    }

    PROBLEM {
        uuid id PK
        uuid author_id FK
        string title
        text description
        string allowed_languages
        float time_limit_sec
        int memory_limit_mb
        timestamp created_at
    }

    TEST_CASE {
        uuid id PK
        uuid problem_id FK
        text input_data
        text expected_output
        boolean is_sample
        float score_weight
    }

    SUBMISSION {
        uuid id PK
        uuid user_id FK
        uuid problem_id FK
        uuid class_id FK
        text source_code
        string language "PYTHON | CPP | JAVA"
        string status "PENDING | RUNNING | COMPLETED | INTERRUPTED"
        float auto_score
        float final_score
        float execution_time_sec
        int memory_used_kb
        timestamp submitted_at
    }

    AI_FEEDBACK {
        uuid id PK
        uuid submission_id FK
        float quality_score
        float complexity_score
        text logic_analysis
        text pedagogical_hints
        text raw_llm_response
    }
```

---

## 3. DANH SÁCH RESTFUL API ENDPOINTS CHÍNH

### 3.1. Authentication & Users (`/api/v1/auth`, `/api/v1/users`)
- `POST /api/v1/auth/login`: Đăng nhập, trả về Access Token + Refresh Token.
- `POST /api/v1/auth/refresh`: Cấp mới Access Token.
- `POST /api/v1/auth/forgot-password`: Gửi email khôi phục mật khẩu.
- `POST /api/v1/auth/reset-password`: Thiết lập lại mật khẩu với token.
- `GET /api/v1/users/me`: Lấy thông tin tài khoản hiện tại.
- `PUT /api/v1/users/me`: Cập nhật thông tin cá nhân.
- `POST /api/v1/users/import`: Import danh sách người dùng từ Excel (Admin).

### 3.2. Problems & Test Cases (`/api/v1/problems`)
- `GET /api/v1/problems`: Danh sách bài tập (hỗ trợ phân trang, lọc theo tags).
- `GET /api/v1/problems/{id}`: Chi tiết đề bài và các Sample Test Cases.
- `POST /api/v1/problems`: Tạo bài tập mới (Teacher/Admin).
- `PUT /api/v1/problems/{id}`: Chỉnh sửa bài tập.
- `POST /api/v1/problems/{id}/testcases`: Thêm hoặc cập nhật bộ Test Cases.
- `POST /api/v1/problems/{id}/rubrics`: Cấu hình Rubric đánh giá.

### 3.3. Submissions & Grading (`/api/v1/submissions`)
- `POST /api/v1/submissions`: **Nộp bài chính thức** (Đẩy vào Queue, trả về submission ID).
- `GET /api/v1/submissions/{id}`: Tra cứu trạng thái và kết quả chi tiết của bài nộp.
- `GET /api/v1/submissions/history`: Xem lịch sử nộp bài của sinh viên.
- `PUT /api/v1/submissions/{id}/manual-grade`: Giảng viên chấm đè điểm số thủ công.

### 3.4. AI Tutor & Chat (`/api/v1/tutor`)
- `POST /api/v1/tutor/chat`: Gửi câu hỏi tương tác với AI Tutor kèm submission context.
- `GET /api/v1/tutor/conversations/{submission_id}`: Lấy lịch sử đoạn chat với AI của bài nộp.

### 3.5. System & Sandbox Management (`/api/v1/system`)
- `GET /api/v1/system/ai-config`: Lấy cấu hình AI hiện tại (Super Admin).
- `PUT /api/v1/system/ai-config`: Cập nhật API Key và thông số AI Model.
- `GET /api/v1/system/sandbox/metrics`: Xem tình trạng container và tải server.
- `GET /api/v1/system/logs`: Tra cứu logs hệ thống.

---

## 4. LUỒNG TRUYỀN DỮ LIỆU REALTIME (WEBSOCKET DATA FLOW)

Khi sinh viên bấm Nộp bài, giao diện sẽ duy trì kết nối WebSocket để cập nhật tiến độ tức thì theo các sự kiện:

```text
1. [EVENT: SUBMISSION_QUEUED]      -> "Bài làm đang trong hàng đợi..."
2. [EVENT: RUNNING_TESTS]          -> "Đang thực thi 10/10 test cases..."
3. [EVENT: ANALYZING_AI]           -> "Trợ giảng AI đang phân tích mã nguồn..."
4. [EVENT: SUBMISSION_COMPLETED]   -> Trả về JSON kết quả hoàn chỉnh, tự động render UI.
```
