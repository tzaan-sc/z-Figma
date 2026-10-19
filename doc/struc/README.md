# AI-POWERED CODING TUTOR & AUTO-GRADER
## HỆ THỐNG TÀI LIỆU ĐẶC TẢ NGHIỆP VỤ, KIẾN TRÚC & HƯỚNG DẪN CẤU HÌNH

Chào mừng bạn đến với bộ tài liệu thiết kế và hướng dẫn phát triển hệ thống **AI-Powered Coding Tutor & Auto-Grader**. Toàn bộ tài liệu đã được chia thành **8 chuyên đề độc lập, chi tiết và có liên kết chặt chẽ**:

---

## 📚 DANH MỤC CÁC TÀI LIỆU CHI TIẾT

| STT | Tên Tài Liệu | File Markdown | Nội Dung Trọng Tâm |
| :---: | :--- | :--- | :--- |
| **01** | **Chiến Lược Phát Triển (MVP Core)** | [01_MVP_STRATEGY.md](file:///d:/GITHUB/ai-coding-tutor/docs/01_MVP_STRATEGY.md) | Triết lý tránh sa đà E-learning truyền thống; Tập trung 4 trụ cột cốt lõi: Quản lý bài tập, Monaco Editor, Docker Sandbox, AI Tutor. |
| **02** | **Đặc Tả Actor & Danh Mục 44 Use Cases** | [02_ACTORS_AND_USE_CASES.md](file:///d:/GITHUB/ai-coding-tutor/docs/02_ACTORS_AND_USE_CASES.md) | Ma trận phân quyền RBAC cho 5 Actors (Sinh viên, Giáo viên, Quản trị viên, Giáo vụ, Quản trị viên hệ thống) và bảng phân rã 44 Use Cases chuẩn hóa. |
| **03** | **Luồng Thực Hiện Chi Tiết (Use Case Flows)** | [03_USE_CASE_FLOWS.md](file:///d:/GITHUB/ai-coding-tutor/docs/03_USE_CASE_FLOWS.md) | Mô tả từng bước (Main flow & Alternative flow) cho toàn bộ 44 UCs theo chuẩn DOAN4.md, đặc biệt luồng Nộp bài (Submit) và Chat Socratic. |
| **04** | **Đánh Giá Kỹ Thuật & Khuyến Nghị Tối Ưu** | [04_TECHNICAL_EVALUATION.md](file:///d:/GITHUB/ai-coding-tutor/docs/04_TECHNICAL_EVALUATION.md) | Xử lý nghẽn hàng đợi (Redis Queue + Celery), chính sách bảo mật Docker Sandbox (RAM/CPU limit, no-network) và Guardrails Socratic AI. |
| **05** | **Kiến Trúc Kỹ Thuật & Data Flow** | [05_SYSTEM_ARCHITECTURE.md](file:///d:/GITHUB/ai-coding-tutor/docs/05_SYSTEM_ARCHITECTURE.md) | Sơ đồ kiến trúc tổng thể, Sơ đồ cơ sở dữ liệu ERD (Mermaid), danh mục RESTful APIs và cơ chế Realtime WebSocket. |
| **06** | **Hướng Dẫn Cài Đặt Môi Trường (Setup Guide)** | [06_ENVIRONMENT_SETUP.md](file:///d:/GITHUB/ai-coding-tutor/docs/06_ENVIRONMENT_SETUP.md) | Hướng dẫn cài đặt từng bước cho Windows (WSL2), Docker Desktop, FastAPI Backend, Next.js Frontend và cách xử lý lỗi thường gặp. |
| **07** | **Mẫu File Cấu Hình Dự Án (Config Templates)** | [07_CONFIG_TEMPLATES.md](file:///d:/GITHUB/ai-coding-tutor/docs/07_CONFIG_TEMPLATES.md) | Mẫu hoàn chỉnh: `docker-compose.yml`, `backend/.env.example`, `requirements.txt`, `package.json`, `Dockerfile.sandbox`, `runner.py`. |
| **08** | **Lộ Trình Triển Khai (Roadmap & Milestones)** | [08_ROADMAP_AND_MILESTONES.md](file:///d:/GITHUB/ai-coding-tutor/docs/08_ROADMAP_AND_MILESTONES.md) | Kế hoạch 8 tuần theo 3 giai đoạn (Phase 1: MVP Core $\rightarrow$ Phase 2: RBAC & Classroom $\rightarrow$ Phase 3: Admin & Optimization). |

---

## ⚡ BẮT ĐẦU NHANH (QUICK START)

1. **Khởi động Database & Redis**:
   ```bash
   docker compose up -d
   ```
2. **Cài đặt & Chạy Backend**:
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
3. **Build Sandbox Runner**:
   ```bash
   cd ../sandbox
   docker build -t sandbox-python:latest -f Dockerfile.python .
   ```
4. **Cài đặt & Chạy Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
