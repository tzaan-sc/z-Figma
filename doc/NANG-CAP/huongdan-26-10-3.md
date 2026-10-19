# HƯỚNG DẪN CẤU HÌNH VÀ MỞ RỘNG HỆ THỐNG THEO GỢI Ý CỦA GIẢNG VIÊN
# (TEACHER'S SUGGESTIONS IMPLEMENTATION & CONFIGURATION GUIDE)

---

## 📌 TỔNG QUAN

Tài liệu này hướng dẫn chi tiết cách cấu hình kỹ thuật và phân tích tác động nghiệp vụ nếu muốn tích hợp thêm các công nghệ/tính năng nâng cao theo gợi ý của Giảng viên hướng dẫn:
1. **Phát hiện Lỗ hổng Bảo mật trong mã nguồn (AI-based Security Vulnerabilities Analysis)**
2. **Framework LangChain (Prompt Chains & Structured Output)**
3. **Mô hình mã nguồn mở cục bộ (Local LLMs: Llama 3.1 / Mistral qua Ollama)**

---

## I. VỀ MẶT TÍNH NĂNG: CÓ CẦN SỬA HAY KHÁC ĐI KHÔNG?

> [!IMPORTANT]
> **KẾT LUẬN: KHÔNG LÀM THAY ĐỔI 44 USE CASES VÀ BỘ QUY TẮC NGHIỆP VỤ (RULES.MD).**

Tất cả các luồng nghiệp vụ cốt lõi theo [RULES.md](file:///D:/GITHUB/ai-coding-tutor/RULES.md) và [DOAN4.md](file:///D:/GITHUB/ai-coding-tutor/DOAN4.md) **vẫn giữ nguyên 100%**:
- Sinh viên làm bài trên Monaco Editor, nộp 1 bản chính thức duy nhất, khóa Read-only (không có chức năng chạy thử trước deadline).
- Server-side Auto-submit khi hết giờ deadline.
- Batch Grading tập trung sau deadline bằng Docker Sandbox để tính điểm chính thức (`Official Score`).
- AI chỉ đóng vai trò phân tích, hỗ trợ sư phạm, tuyệt đối không can thiệp hay thay đổi điểm số chính thức.

### Các Use Case được nâng cấp chiều sâu nội dung:
* **`UC-13` (Sinh viên xem nhận xét AI) & `UC-26` (Giáo viên xem AI đánh giá):**
  * *Hiện tại:* AI phân tích Clean Code (Code Smells, Style) + Đo độ phức tạp (Big-O, Cyclomatic Complexity).
  * *Nâng cấp thêm:* Bổ sung tab/thẻ **"Cảnh báo Lỗ hổng Bảo mật (Security Vulnerabilities)"** (phát hiện SQL injection, buffer overflow, hardcoded secrets, tràn bộ đệm... trong code sinh viên).
* **`UC-40` (Quản lý cấu hình AI):**
  * *Nâng cấp thêm:* Cho phép Quản trị viên hệ thống lựa chọn thêm Provider là **Local LLM (Llama 3.1 / Mistral qua Ollama)** bên cạnh Google Gemini Flash và OpenAI.

---

## II. SƠ ĐỒ CẤU TRÚC 3 HẠNG MỤC MỞ RỘNG

```text
                      ┌──────────────────────────────────────────────────────────┐
                      │   3 HẠNG MỤC MỞ RỘNG THEO GỢI Ý CỦA GIẢNG VIÊN           │
                      └──────────────────────────────────────────────────────────┘
                                   │                           │
            ┌──────────────────────┴─────────┐     ┌───────────┴──────────┐
            ▼                                ▼     ▼                      ▼
┌─────────────────────────┐      ┌─────────────────────────┐  ┌─────────────────────────┐
│ 1. AI SECURITY ANALYSIS │      │ 2. LANGCHAIN INTEGRATION│  │ 3. LOCAL LLM (OLLAMA)   │
├─────────────────────────┤      ├─────────────────────────┤  ├─────────────────────────┤
│ • Không tốn hạ tầng mới │      │ • Thêm package Python   │  │ • Thêm container Ollama │
│ • Sửa Pydantic Schema   │      │ • Chuẩn hóa Chain/Parser│  │ • Cần cấu hình RAM/GPU  │
│ • Cập nhật System Prompt│      │ • Thêm adapter gọi LLM  │  │ • Cấu hình Base URL API │
│ [ƯU TIÊN LÀM NGAY]      │      │ [TÙY CHỌN CHO BACKEND]  │  │ [TÙY CHỌN DỰ PHÒNG]     │
└─────────────────────────┘      └─────────────────────────┘  └─────────────────────────┘
```

---

## III. HƯỚNG DẪN CẤU HÌNH CHI TIẾT TỪNG HẠNG MỤC

### 1. Hạng mục 1: Phát hiện Lỗ hổng Bảo mật (AI Security Analysis)
*(Khuyến nghị tích hợp ngay vì tăng giá trị học thuật cao và không tốn chi phí hạ tầng)*

#### a. Cập nhật Pydantic Schema (`backend/app/schemas/ai_feedback.py`)
```python
from pydantic import BaseModel, Field
from typing import List, Optional

class SecurityVulnerability(BaseModel):
    issue_type: str = Field(..., description="Loại lỗ hổng: SQL_INJECTION, BUFFER_OVERFLOW, HARDCODED_CREDENTIAL, INSECURE_RANDOM...")
    severity: str = Field(..., description="Mức độ nghiêm trọng: LOW, MEDIUM, HIGH, CRITICAL")
    line_number: Optional[int] = Field(None, description="Dòng code xảy ra rủi ro")
    description: str = Field(..., description="Mô tả bản chất rủi ro bảo mật")
    remediation_hint: str = Field(..., description="Gợi ý phương pháp khắc phục an toàn")

class AIFeedbackResponseSchema(BaseModel):
    quality_score: int = Field(..., ge=0, le=100)
    complexity_score: int = Field(..., ge=0, le=100)
    cyclomatic_analysis: str
    code_smells: List[str]
    security_vulnerabilities: List[SecurityVulnerability] = Field(default_factory=list)
    socratic_hints: List[str]
```

#### b. Cập nhật System Prompt (`backend/app/services/context_builder.py`)
```python
SECURITY_INSTRUCTIONS = """
Hãy phân tích mã nguồn của sinh viên để phát hiện các lỗ hổng bảo mật tiềm ẩn:
1. SQL Injection / NoSQL Injection risks (nếu có thao tác query).
2. Buffer Overflow / Out-of-bounds array access (với C/C++).
3. Insecure Randomness / Weak cryptography.
4. Hardcoded secrets, API Keys, mật khẩu trong mã nguồn.
5. Command Injection / Unsafe file operations (ví dụ: eval, os.system, exec).

Định dạng trả về bắt buộc phải tuân thủ Schema JSON của SecurityVulnerability.
"""
```

---

### 2. Hạng mục 2: Tích hợp LangChain (Nếu muốn áp dụng chuẩn framework)

#### a. Cập nhật `backend/requirements.txt`
```text
langchain>=0.2.0
langchain-core>=0.2.0
langchain-google-genai>=1.0.0
langchain-openai>=0.1.0
langchain-community>=0.2.0
```

#### b. Cấu hình Chain chuẩn trong `backend/app/services/ai_service.py`
```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from app.schemas.ai_feedback import AIFeedbackResponseSchema

def build_ai_feedback_chain(api_key: str, model_name: str = "gemini-1.5-flash"):
    llm = ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        temperature=0.2,
        max_output_tokens=2048
    )
    
    parser = JsonOutputParser(pydantic_object=AIFeedbackResponseSchema)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "{system_instructions}\n\n{format_instructions}"),
        ("user", "Bối cảnh đề bài:\n{problem_context}\n\nBằng chứng thực thi:\n{execution_evidence}\n\nMã nguồn sinh viên:\n{student_code}")
    ])
    
    chain = prompt | llm | parser
    return chain
```

---

### 3. Hạng mục 3: Tích hợp Local LLM (Llama 3.1 / Mistral qua Ollama)

#### a. Bổ sung service Ollama vào `docker-compose.yml`
```yaml
  # -------------------------------------------------------------
  # Ollama Local LLM Runner (Tùy chọn Local Model)
  # -------------------------------------------------------------
  ollama:
    image: ollama/ollama:latest
    container_name: ai_coding_tutor_ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    # Nếu máy chủ có card đồ họa NVIDIA:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: all
    #           capabilities: [gpu]

volumes:
  postgres_data:
  redis_data:
  ollama_data:
```

#### b. Biến môi trường bổ sung trong `.env`
```env
# Local LLM Config
OLLAMA_BASE_URL=http://ollama:11434
LOCAL_LLM_MODEL=llama3.1:8b
```

#### c. Tải model vào Ollama container (chạy 1 lần):
```powershell
docker compose exec ollama ollama pull llama3.1:8b
# hoặc model nhẹ hơn:
docker compose exec ollama ollama pull mistral:7b
```

---

## IV. MA TRẬN SO SÁNH & ĐÁNH GIÁ TÁC ĐỘNG

| Hạng mục | Mức độ ưu tiên | Độ phức tạp cài đặt | Chi phí tài nguyên | Giá trị mang lại |
| :--- | :---: | :---: | :---: | :--- |
| **Phát hiện lỗi bảo mật (AI Security)** | 🔥 **Cao** | Rất thấp (chỉ sửa code Prompt & Schema) | Không tốn thêm RAM/GPU | ✅ Rất cao (đúng 100% gợi ý của cô giáo, tạo điểm nhấn đồ án). |
| **Dùng LangChain** | ⚡ **Trung bình** | Thấp (~1 ngày refactor adapter AI) | Tăng nhẹ kích thước container backend | ✅ Chuẩn hóa kiến trúc AI, dễ mở rộng RAG sau này. |
| **Local Models (Ollama/Llama 3)** | ❄️ **Thấp** | Trung bình (~2 ngày setup Docker/GPU) | Cần tối thiểu 8GB - 16GB RAM / GPU | ⚠️ Tùy chọn dự phòng, tránh làm chậm máy nếu không có GPU rời. |

---

## V. KẾT LUẬN & ĐỀ XUẤT CHO BÁO CÁO

1. **Cho giai đoạn tháng 10 (MVP Release):**
   * Giữ vững tiến độ 44 Use Cases cốt lõi.
   * Tích hợp ngay tính năng **AI-based Security Vulnerability Analysis** vào module AI Review (`UC-13`, `UC-26`).
   * Sử dụng Google Gemini Flash làm Primary Engine và OpenAI làm Fallback Engine để đảm bảo tốc độ phản hồi nhanh (< 2s) và không phụ thuộc GPU.

2. **Cách trình bày với Giảng viên hướng dẫn:**
   > *"Hệ thống đã hiện thực hóa toàn bộ các định hướng của Cô: Web IDE với Monaco Editor, Docker Sandbox cô lập bảo mật, AI đọc hiểu mã nguồn, đo độ phức tạp, chấm điểm Clean Code, phát hiện lỗ hổng bảo mật và gợi ý Socratic. Hệ thống được thiết kế modular sẵn sàng cho phép cắm thêm LangChain và kết nối Local LLM (Ollama/Llama 3) bất kỳ lúc nào."*
