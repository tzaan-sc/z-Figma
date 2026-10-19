CHI PHÍ THỰC HIỆN (HOÀN TOÀN 0 ĐỒNG)

Toàn bộ hệ thống từ **MVP cốt lõi** đến **tất cả các tính năng nâng cấp (Security, LangChain, Ollama, RAG)** đều được thiết kế để vận hành với **chi phí 0 đồng (100% Free)**:

### 1. Bảng chi tiết chi phí các hạng mục nâng cấp & cốt lõi:

| Hạng mục / Thành phần | Mức chi phí | Nguồn cung cấp / Giải thích kỹ thuật |
| :--- | :---: | :--- |
| **Google Gemini API (Engine chính)** | **0 ĐỒNG** | Google AI Studio cung cấp gói **Free Tier** vĩnh viễn cho `Gemini 1.5/2.0 Flash`: <br>• Hạn mức: **15 RPM** (lượt gọi/phút), **1.500 RPD** (lượt gọi/ngày).<br>• Hoàn toàn miễn phí, không yêu cầu thẻ tín dụng/Visa. Quá đủ cho đồ án làm bài và demo. |
| **Phát hiện Lỗ hổng Bảo mật (AI Security)** | **0 ĐỒNG** | Tích hợp trực tiếp vào Prompt của Gemini Flash, chạy chung 1 lượt gọi API với AI Review $\rightarrow$ nằm trọn trong gói 1.500 lượt Free/ngày. |
| **Thư viện LangChain** | **0 ĐỒNG** | Thư viện mã nguồn mở (`pip install langchain`), miễn phí trọn đời. |
| **Local Models (Llama 3.1 / Mistral qua Ollama)** | **0 ĐỒNG** | Công cụ Ollama và các model mở (Llama 3.1 8B, Mistral 7B) tải về máy chạy offline, không tốn bất kỳ phí bản quyền hay phí API nào. |
| **Hệ thống RAG (Vector DB + Embeddings)** | **0 ĐỒNG** | • Vector DB (ChromaDB / Qdrant / PostgreSQL pgvector): Mã nguồn mở chạy container local.<br>• Embedding Model: Dùng `sentence-transformers` (chạy local trên CPU) hoặc `text-embedding-004` (Google Free Tier). |
| **Hạ tầng Docker, PostgreSQL, Redis, Next.js** | **0 ĐỒNG** | Toàn bộ stack phần mềm đều là mã nguồn mở chạy local. |
| **OpenAI API (GPT-4o-mini - Fallback)** | *0đ - Tùy chọn* | Chỉ dùng làm kênh dự phòng khẩn cấp khi Gemini mất mạng. (Nếu chỉ dùng Gemini Free Tier thì không cần kích hoạt). |

### 2. Tóm tắt giải pháp tài chính cho Đồ án:
* **Không cần nạp tiền API:** Sử dụng API Key Free từ Google AI Studio.
* **Không cần thuê Cloud/VPS đắt tiền:** Chạy toàn bộ trên máy phát triển qua Docker Compose.
* **Đầy đủ giá trị học thuật & thực tiễn:** Vừa đáp ứng 100% yêu cầu của Giảng viên hướng dẫn, vừa đảm bảo tính khả thi cao nhất cho sinh viên thực hiện đồ án.

