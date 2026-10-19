# 07. MẪU FILE CẤU HÌNH DỰ ÁN (CONFIG TEMPLATES)

---

## 1. FILE `docker-compose.yml` (HẠ TẦNG DB & CACHE HOÀN CHỈNH)

Đặt file này tại thư mục gốc của dự án (`d:/GITHUB/ai-coding-tutor/docker-compose.yml`):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: ai_tutor_postgres
    restart: always
    environment:
      POSTGRES_DB: ai_tutor_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d ai_tutor_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: ai_tutor_redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

---

## 2. FILE `backend/.env.example` (BIẾN MÔI TRƯỜNG BACKEND)

Đặt file này tại `backend/.env.example`:

```ini
# ==============================================================================
# AI-POWERED CODING TUTOR & AUTO-GRADER - BACKEND CONFIGURATION
# ==============================================================================

# --- APPLICATION SETTINGS ---
PROJECT_NAME="AI Coding Tutor & Auto-Grader"
ENVIRONMENT=development
DEBUG=True
API_V1_STR=/api/v1
CORS_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]

# --- DATABASE SETTINGS ---
DATABASE_URL=postgresql+asyncpg://postgres:postgrespassword@localhost:5432/ai_tutor_db

# --- REDIS & CELERY SETTINGS ---
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# --- JWT AUTHENTICATION ---
SECRET_KEY=replace_this_with_a_super_secret_key_minimum_32_characters_long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
REFRESH_TOKEN_EXPIRE_DAYS=7

# --- AI PROVIDER CONFIGURATION ---
AI_PROVIDER=gemini
# Lấy API Key miễn phí tại: https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL_NAME=gemini-1.5-flash
AI_TEMPERATURE=0.2
AI_MAX_TOKENS=2048

# --- DOCKER SANDBOX SECURITY LIMITS ---
DOCKER_PYTHON_IMAGE=sandbox-python:latest
DOCKER_CPP_IMAGE=sandbox-cpp:latest
DEFAULT_TIME_LIMIT_SEC=2.0
DEFAULT_MEMORY_LIMIT_MB=256
DEFAULT_MAX_OUTPUT_BYTES=65536
```

---

## 3. FILE `backend/requirements.txt` (THƯ VIỆN PYTHON BACKEND)

Đặt file này tại `backend/requirements.txt`:

```text
# --- Web Framework & Server ---
fastapi==0.110.0
uvicorn[standard]==0.28.0
pydantic==2.6.4
pydantic-settings==2.2.1

# --- Database & Migrations ---
sqlalchemy==2.0.28
asyncpg==0.29.0
alembic==1.13.1
psycopg2-binary==2.9.9

# --- Security & Auth ---
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
python-multipart==0.0.9

# --- Async Worker & Queue ---
celery==5.3.6
redis==5.0.3

# --- Docker Integration ---
docker==7.0.0

# --- AI & LLM SDKs ---
google-generativeai==0.4.1
openai==1.14.1

# --- Static Code Analysis ---
radon==6.0.1
flake8==7.0.0

# --- Utilities ---
httpx==0.27.0
python-dotenv==1.0.1
openpyxl==3.1.2
pandas==2.2.1
```

---

## 4. FILE `frontend/.env.local.example` (BIẾN MÔI TRƯỜNG FRONTEND)

Đặt file này tại `frontend/.env.local.example`:

```ini
# API Gateway URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# WebSocket Endpoint for Realtime Grader Updates
NEXT_PUBLIC_WS_URL=ws://localhost:8000/api/v1/ws

# App Configuration
NEXT_PUBLIC_APP_NAME="AI Coding Tutor"
```

---

## 5. FILE `frontend/package.json` (CẤU HÌNH FRONTEND REACT/NEXT.JS)

Đặt file này tại `frontend/package.json`:

```json
{
  "name": "ai-coding-tutor-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@monaco-editor/react": "^4.6.0",
    "@tanstack/react-query": "^5.28.4",
    "axios": "^1.6.8",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.14",
    "lucide-react": "^0.358.0",
    "next": "14.1.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "react-syntax-highlighter": "^15.5.0",
    "socket.io-client": "^4.7.5",
    "tailwind-merge": "^2.2.2",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.67",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.2"
  }
}
```

---

## 6. FILE `sandbox/Dockerfile.python` (SANDBOX RUNNER PYTHON)

Đặt file này tại `sandbox/Dockerfile.python`:

```dockerfile
FROM python:3.11-slim

# Tạo non-root user 'runner' với UID 1001 để cách ly hoàn toàn
RUN groupadd -g 1001 runner && \
    useradd -m -u 1001 -g runner runner

WORKDIR /sandbox

# Sao chép script runner kiểm soát I/O và time/memory limit
COPY runner.py /sandbox/runner.py

USER runner

ENTRYPOINT ["python3", "/sandbox/runner.py"]
```

---

## 7. FILE `sandbox/Dockerfile.cpp` (SANDBOX RUNNER C++)

Đặt file này tại `sandbox/Dockerfile.cpp`:

```dockerfile
FROM gcc:13-bookworm

RUN groupadd -g 1001 runner && \
    useradd -m -u 1001 -g runner runner

WORKDIR /sandbox

COPY runner_cpp.py /sandbox/runner.py

USER runner

ENTRYPOINT ["python3", "/sandbox/runner.py"]
```

---

## 8. FILE `sandbox/runner.py` (SCRIPT KIỂM SOÁT THỰC THI AN TOÀN)

Đặt file này tại `sandbox/runner.py`:

```python
import sys
import time
import subprocess

def run_solution(code_file_path, input_data_path, time_limit_sec=2.0):
    """
    Thực thi mã nguồn với input test case và kiểm soát timeout nghiêm ngặt.
    """
    start_time = time.time()
    try:
        with open(input_data_path, 'r', encoding='utf-8') as f_in:
            proc = subprocess.run(
                ["python3", code_file_path],
                stdin=f_in,
                capture_output=True,
                text=True,
                timeout=time_limit_sec
            )
        exec_time = time.time() - start_time
        
        if proc.returncode == 0:
            print("---STATUS:OK---")
            print(f"---TIME:{exec_time:.4f}---")
            print("---STDOUT---")
            print(proc.stdout)
        else:
            print("---STATUS:RUNTIME_ERROR---")
            print(f"---TIME:{exec_time:.4f}---")
            print("---STDERR---")
            print(proc.stderr)
            
    except subprocess.TimeoutExpired:
        print("---STATUS:TIME_LIMIT_EXCEEDED---")
        print(f"---TIME:{time_limit_sec:.4f}---")
    except Exception as e:
        print("---STATUS:INTERNAL_ERROR---")
        print(f"---STDERR---\n{str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 runner.py <code_path> <input_path> [time_limit]")
        sys.exit(1)
    
    code_path = sys.argv[1]
    input_path = sys.argv[2]
    t_limit = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
    
    run_solution(code_path, input_path, t_limit)
```
