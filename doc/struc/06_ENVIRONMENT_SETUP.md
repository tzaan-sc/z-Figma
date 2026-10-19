# 06. HƯỚNG DẪN CÀI ĐẶT MÔI TRƯỜNG PHÁT TRIỂN (ENVIRONMENT SETUP GUIDE)

---

## 1. YÊU CẦU PHẦN CỨNG & PHẦN MỀM (PREREQUISITES)

### 1.1. Yêu Cầu Phần Cứng Khuyến Nghị
- **CPU**: Tối thiểu 4 Cores (Khuyên dùng 6 - 8 Cores để chạy mượt mà Docker và Workers).
- **RAM**: Tối thiểu 8 GB (Khuyên dùng 16 GB).
- **Dung lượng ổ cứng**: Tối thiểu 20 GB dung lượng trống (SSD).

### 1.2. Danh Sách Phần Mềm Bắt Buộc Cần Cài Trước

| Công cụ | Phiên bản tối thiểu | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Docker Desktop** | `>= 24.0` | Quản lý PostgreSQL, Redis và chạy Docker Sandbox cách ly code. |
| **Python** | `3.11.x` | Môi trường chạy Backend API (FastAPI) và Grader Worker (Celery). |
| **Node.js & npm** | `Node 18.x` hoặc `20.x LTS` | Môi trường chạy Web Frontend (Next.js / React + Monaco Editor). |
| **Git** | Mới nhất | Quản lý mã nguồn. |

---

## 2. HƯỚNG DẪN CÀI ĐẶT TRÊN HỆ ĐIỀU HÀNH WINDOWS (WSL2)

> [!IMPORTANT]
> Trên Windows, Docker Sandbox hoạt động an toàn và ổn định nhất khi sử dụng **WSL2 (Windows Subsystem for Linux)**.

1. **Bật WSL2**:
   - Mở PowerShell với quyền Administrator và chạy lệnh:
     ```powershell
     wsl --install
     ```
   - Khởi động lại máy tính nếu được yêu cầu.
2. **Cài đặt Docker Desktop**:
   - Tải bộ cài từ [docker.com](https://www.docker.com/products/docker-desktop/).
   - Trong quá trình cài, tích chọn **"Use WSL 2 instead of Hyper-V"**.
   - Mở Docker Desktop $\rightarrow$ Settings $\rightarrow$ General $\rightarrow$ Đảm bảo đã bật *"Use the WSL 2 based engine"*.

---

## 3. CÁC BƯỚC THIẾT LẬP DỰ ÁN TỪNG BƯỚC (STEP-BY-STEP)

### Bước 1: Khởi Động Cơ Sở Dữ Liệu & Redis (Docker Compose)
1. Mở Terminal tại thư mục gốc của dự án:
   ```bash
   cd d:/GITHUB/ai-coding-tutor
   ```
2. Khởi chạy 2 service Database và Cache ngầm:
   ```bash
   docker compose up -d postgres redis
   ```
3. Kiểm tra trạng thái hoạt động:
   ```bash
   docker compose ps
   ```
   *Cả 2 container `ai_tutor_postgres` và `ai_tutor_redis` phải ở trạng thái "Up/Running".*

---

### Bước 2: Thiết Lập Môi Trường Backend (FastAPI + Celery)

1. Di chuyển vào thư mục `backend/`:
   ```bash
   cd backend
   ```
2. Tạo môi trường ảo Python (Virtual Environment):
   ```bash
   python -m venv venv
   ```
3. Kích hoạt môi trường ảo:
   - **Windows (Command Prompt / PowerShell)**:
     ```powershell
     .\venv\Scripts\activate
     ```
   - **Linux / macOS / WSL**:
     ```bash
     source venv/bin/activate
     ```
4. Cài đặt toàn bộ thư viện cần thiết:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
5. Tạo và cấu hình file biến môi trường:
   ```bash
   cp .env.example .env
   ```
   *Mở file `.env` và điền `GEMINI_API_KEY` (hoặc `OPENAI_API_KEY`) của bạn.*
6. Chạy Database Migrations để khởi tạo các bảng:
   ```bash
   alembic upgrade head
   ```
7. Chạy server Backend FastAPI ở chế độ Development:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   *Kiểm tra kết nối:* Mở trình duyệt truy cập `http://localhost:8000/docs` (Swagger UI).

8. **Mở một Terminal mới** để khởi chạy Grader Worker:
   ```powershell
   cd backend
   .\venv\Scripts\activate
   # Chú ý: Trên Windows bắt buộc thêm '-P solo' hoặc '-P threads' để Celery chạy không lỗi
   celery -A app.workers.celery_app worker --loglevel=info -P solo
   ```

---

### Bước 3: Build Docker Sandbox Runner Image (Môi Trường Chấm Code)

1. Di chuyển vào thư mục `sandbox/`:
   ```bash
   cd ../sandbox
   ```
2. Build image cho Python Sandbox:
   ```bash
   docker build -t sandbox-python:latest -f Dockerfile.python .
   ```
3. (Tùy chọn) Build image cho C++ Sandbox:
   ```bash
   docker build -t sandbox-cpp:latest -f Dockerfile.cpp .
   ```
4. Kiểm tra image đã tạo thành công:
   ```bash
   docker images | grep sandbox
   ```

---

### Bước 4: Thiết Lập Web Frontend (Next.js + Monaco Editor)

1. Mở một Terminal mới và di chuyển vào `frontend/`:
   ```bash
   cd frontend
   ```
2. Cài đặt các gói phụ thuộc (dependencies):
   ```bash
   npm install
   ```
3. Tạo file cấu hình môi trường Frontend:
   ```bash
   cp .env.example .env.local
   ```
   *Đảm bảo `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`.*
4. Khởi động Web Frontend:
   ```bash
   npm run dev
   ```
5. Mở trình duyệt và truy cập: `http://localhost:3000`.

---

## 4. XỬ LÝ CÁC LỖI THƯỜNG GẶP (TROUBLESHOOTING)

### Lỗi 1: Cổng (Port) 5432 hoặc 6379 bị chiếm dụng
- **Nguyên nhân**: Máy bạn đã có cài sẵn PostgreSQL hoặc Redis local từ trước.
- **Cách khắc phục**:
  - Dừng dịch vụ local trong Windows Services (`services.msc`), hoặc
  - Đổi cổng port mapping trong `docker-compose.yml` (ví dụ: `"5433:5432"`, `"6380:6379"`).

### Lỗi 2: Celery Worker trên Windows báo lỗi `ValueError: not enough values to unpack`
- **Nguyên nhân**: Mặc định Celery dùng cơ chế `prefork` không tương thích hoàn toàn với hệ điều hành Windows.
- **Cách khắc phục**: Luôn thêm cờ `-P solo` hoặc `-P threads` khi chạy trên Windows:
  ```powershell
  celery -A app.workers.celery_app worker --loglevel=info -P solo
  ```

### Lỗi 3: Backend không thể kết nối tới Docker Daemon (`docker.errors.DockerException`)
- **Nguyên nhân**: Docker Desktop chưa được mở hoặc quyền truy cập docker socket bị hạn chế.
- **Cách khắc phục**: Đảm bảo Docker Desktop đã bật và đang ở trạng thái **Engine running**.

### Lỗi 4: WSL2 ngốn quá nhiều RAM máy tính
- **Cách khắc phục**: Tạo file `C:\Users\<Tên_User>\.wslconfig` với nội dung giới hạn RAM:
  ```ini
  [wsl2]
  memory=4GB
  processors=4
  ```
