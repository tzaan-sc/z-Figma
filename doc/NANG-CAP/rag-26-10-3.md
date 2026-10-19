# RAG INTEGRATION GUIDE - CHO AI CODING TUTOR
# HƯỚNG DẪN TÍCH HỢP RAG CHO HỆ THỐNG

---

## 1. RAG CÓ THỂ GIÚP GÌ CHO HỆ THỐNG?

### 1.1. Use Cases cho RAG trong hệ thống này

| Use Case | Description | Priority |
|----------|-------------|----------|
| **Similar Code Retrieval** | Tìm submissions tương tự đã được chấm điểm cao để gợi ý pattern | HIGH |
| **Error Pattern Database** | Database các lỗi phổ biến và cách khắc phục từ submissions trước | HIGH |
| **Algorithm Knowledge Base** | Tài liệu về thuật toán, cấu trúc dữ liệu (giáo trình, docs) | MEDIUM |
| **Coding Standards Repository** | Best practices, coding conventions của khoa/lớp | MEDIUM |
| **Historical Feedback** | Feedback từ giáo viên cho các lỗi tương tự | LOW |

---

## 2. KIẾN TRÚC RAG CHO HỆ THỐNG

### 2.1. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER QUERY (Student Question)                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    QUERY EMBEDDING (LLM)                         │
│              Convert question to vector embedding               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VECTOR DATABASE (ChromaDB/Qdrant)             │
│                    - Similar Code Patterns                       │
│                    - Error Patterns                              │
│                    - Algorithm Knowledge                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RETRIEVED CONTEXT                             │
│              Top-k similar documents + metadata                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROMPT CONSTRUCTION                           │
│      System Prompt + Retrieved Context + User Question           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LLM GENERATION                                │
│              Generate response with retrieved context            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. DATA SOURCES CHO RAG

### 3.1. Vector Database Collections

#### Collection 1: `similar_code_patterns`
**Purpose:** Tìm submissions tương tự đã được chấm điểm cao

**Document Structure:**
```json
{
  "id": "submission_uuid",
  "problem_id": "problem_uuid",
  "student_code": "source_code_snippet",
  "score": 95.0,
  "language": "python",
  "tags": ["dynamic_programming", "two_pointers"],
  "metadata": {
    "complexity": "O(n)",
    "memory_usage": "low",
    "submission_date": "2026-10-01"
  }
}
```

**Embedding Strategy:**
- Embed: Code snippet + problem description + tags
- Model: `text-embedding-3-small` (OpenAI) hoặc `embedding-001` (Gemini)

**Retrieval Use Case:**
Khi sinh viên hỏi "Làm sao tối ưu code này?", AI tìm submissions tương tự với:
- Cùng problem_id hoặc problem type
- Score cao (>80)
- Tối ưu về time/memory

---

#### Collection 2: `error_patterns`
**Purpose:** Database các lỗi phổ biến và cách khắc phục

**Document Structure:**
```json
{
  "id": "error_pattern_uuid",
  "error_type": "IndexError",
  "error_message": "list index out of range",
  "common_causes": [
    "Accessing empty list",
    "Index = len(list) instead of len(list)-1",
    "Negative index without proper check"
  ],
  "socratic_hints": [
    "Kiểm tra mảng có rỗng không trước khi truy cập?",
    "Index tối đa của list là gì?",
    "Điều kiện dừng của vòng lặp là gì?"
  ],
  "code_example": "if len(arr) > 0 and idx < len(arr):",
  "frequency": 150
}
```

**Embedding Strategy:**
- Embed: error_type + error_message + common_causes

**Retrieval Use Case:**
Khi code bị runtime error, AI tìm error pattern tương tự để gợi ý Socratic hints.

---

#### Collection 3: `algorithm_knowledge`
**Purpose:** Tài liệu về thuật toán, cấu trúc dữ liệu

**Document Structure:**
```json
{
  "id": "algo_doc_uuid",
  "title": "Binary Search Algorithm",
  "content": "Binary search là thuật toán tìm kiếm...",
  "complexity": "O(log n)",
  "tags": ["search", "divide_and_conquer"],
  "code_example": "def binary_search(arr, target):...",
  "prerequisites": ["sorted_array"],
  "related_algorithms": ["linear_search", "ternary_search"]
}
```

**Embedding Strategy:**
- Embed: title + content + tags

**Retrieval Use Case:**
Khi sinh viên hỏi về thuật toán, AI tìm tài liệu liên quan.

---

#### Collection 4: `coding_standards`
**Purpose:** Best practices, coding conventions

**Document Structure:**
```json
{
  "id": "standard_uuid",
  "category": "naming_convention",
  "rule": "Use snake_case for variable names",
  "good_example": "user_name = 'John'",
  "bad_example": "userName = 'John'",
  "rationale": "PEP 8 standard for Python"
}
```

**Embedding Strategy:**
- Embed: category + rule + rationale

**Retrieval Use Case:**
Khi AI review code quality, tìm coding standards violations.

---

## 4. INTEGRATION VÀO LỘ TRÌNH HIỆN TẠI

### 4.1. Thay đổi trong WEEK 2 (Sau khi MVP Core hoàn thành)

#### Ngày 11 (13/10) - Thêm RAG Infrastructure

**Người B (Backend):**
- [ ] Setup Vector Database (ChromaDB hoặc Qdrant)
  - **Chi tiết**: Chạy ChromaDB trong Docker container
  - **Command**: `docker run -p 8000:8000 chromadb/chromadb`
- [ ] Install Embedding Dependencies
  - **Chi tiết**: `pip install chromadb sentence-transformers` hoặc OpenAI embeddings
- [ ] Create RAG Service Module
  - **Chi tiết**: `app/services/rag_service.py` với functions:
    - `embed_text(text)` - Generate embedding
    - `add_document(collection, doc)` - Add document to vector DB
    - `search_similar(collection, query, top_k)` - Search similar documents
- [ ] Create Vector Database Schema
  - **Chi tiết**: Define collections: similar_code_patterns, error_patterns, algorithm_knowledge

#### Ngày 12 (14/10) - Build Knowledge Base

**Người B (Backend):**
- [ ] Implement Error Pattern Seeder
  - **Chi tiết**: Script tạo error patterns phổ biến (IndexError, KeyError, TypeError, etc.)
  - **Source**: Từ documentations và common Python errors
- [ ] Implement Algorithm Knowledge Seeder
  - **Chi tiết**: Script import tài liệu thuật toán cơ bản (Binary Search, Sorting, DP, etc.)
  - **Source**: Từ giáo trình hoặc online resources
- [ ] Implement Coding Standards Seeder
  - **Chi tiết**: Script import PEP 8, Java coding standards, C++ best practices
- [ ] Test Vector Database
  - **Chi tiết**: Test embedding và retrieval với sample queries

#### Ngày 13 (15/10) - Integrate RAG into AI Tutor

**Người B (Backend):**
- [ ] Modify AI Tutor Prompt to Include RAG Context
  - **Chi tiết**: Thay đổi prompt construction để include retrieved context
  - **Logic**:
    1. Embed user question
    2. Search in error_patterns (nếu có error)
    3. Search in similar_code_patterns (nếu hỏi về optimization)
    4. Search in algorithm_knowledge (nếu hỏi về thuật toán)
    5. Add retrieved context to prompt
- [ ] Implement RAG-enabled Chat API
  - **Chi tiết**: POST /api/v1/tutor/chat với RAG
  - **Endpoint**: Add parameter `use_rag=true` để enable/disable RAG
- [ ] Implement Similar Code Retrieval API
  - **Chi tiết**: GET /api/v1/rag/similar-code?problem_id={id}&top_k=5
  - **Purpose**: Giáo viên có thể xem submissions tương tự

#### Ngày 14 (16/10) - Frontend cho RAG Features

**Người A (Frontend):**
- [ ] Add RAG Toggle in AI Tutor Chat
  - **Chi tiết**: Checkbox "Sử dụng RAG" để enable/disable
  - **UI**: Toggle switch trong chat interface
- [ ] Display Retrieved Context (Optional)
  - **Chi tiết**: Hiển thị sources từ RAG (cho transparency)
  - **UI**: "Reference: Submission #12345 - Score: 95"
- [ ] Add Similar Code View (cho Teacher)
  - **Chi tiết**: Hiển thị submissions tương tự khi giáo viên review
  - **UI**: Card hoặc section trong submission review page

---

### 4.2. Thay đổi trong WEEK 3 (Continuous RAG Improvement)

#### Ngày 17 (17/10) - Auto-populate RAG from Submissions

**Người B (Backend):**
- [ ] Implement Auto-embedding on Submission Complete
  - **Chi tiết**: Khi submission chấm xong, auto-embed code vào similar_code_patterns
  - **Trigger**: Celery task sau khi grading complete
- [ ] Implement Score Filtering
  - **Chi tiết**: Chỉ embed submissions với score > 80 (high quality)
- [ ] Implement Tag Extraction
  - **Chi tiết**: Extract tags từ code (dynamic programming, greedy, etc.)
  - **Method**: Simple keyword matching hoặc LLM-based tagging

#### Ngày 18 (18/10) - RAG Analytics

**Người B (Backend):**
- [ ] Implement RAG Usage Tracking
  - **Chi tiết**: Track RAG queries, retrieval accuracy, user feedback
- [ ] Implement RAG Performance Metrics
  - **Chi tiết**: Measure retrieval time, relevance score
- [ ] Create RAG Admin Dashboard (Optional)
  - **Chi tiết**: Hiển thị vector DB stats, collection sizes

---

## 5. CÔNG NGHỆ STACK CHO RAG

### 5.1. Vector Database Options

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **ChromaDB** | Open-source, easy setup, Python-native | Limited scalability | ✅ Recommend cho MVP |
| **Qdrant** | High performance, cloud-ready | Steeper learning curve | ✅ Good for production |
| **Pinecone** | Managed service, high performance | Paid, vendor lock-in | ❌ Not for MVP |
| **Weaviate** | Multi-modal, GraphQL | Complex setup | ❌ Overkill for MVP |

**Recommendation:** **ChromaDB** cho MVP (dễ setup, free, Python-native)

---

### 5.2. Embedding Model Options

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **OpenAI text-embedding-3-small** | High quality, easy API | Paid | $0.02/1M tokens |
| **Gemini embedding-001** | Good quality, Google ecosystem | Paid | Based on usage |
| **Sentence-Transformers (all-MiniLM-L6-v2)** | Free, local deployment | Lower quality | Free |
| **HuggingFace embeddings** | Many options, free | Variable quality | Free |

**Recommendation:**
- **Development:** Sentence-Transformers (free, fast)
- **Production:** OpenAI hoặc Gemini (higher quality)

---

## 6. IMPACT ON ORIGINAL ROADMAP

### 6.1. Additional Effort Required

| Component | Effort | Priority |
|-----------|--------|----------|
| Vector Database Setup | 1 day | HIGH |
| Knowledge Base Seeding | 1-2 days | HIGH |
| RAG Integration | 2 days | HIGH |
| Testing & Refinement | 1-2 days | MEDIUM |
| **Total** | **5-7 days** | - |

### 6.2. Timeline Adjustment

**Original:** 28 days (03/10 - 31/10)
**With RAG:** 33-35 days (cần thêm 5-7 days)

**Options:**
1. **Extend deadline** đến 07/11 - 09/11
2. **Reduce scope** elsewhere (defer non-essential features)
3. **Defer RAG** đến Phase 2 (sau MVP)

---

## 7. RECOMMENDATION

### Option 1: NO RAG for MVP (Recommended)
- ✅ Hoàn thành đúng deadline 31/10
- ✅ Focus on core features (Auto-Grader + AI Tutor)
- ✅ RAG có thể làm sau như Phase 2

### Option 2: RAG for MVP (If research requires)
- ⚠️ Cần extend deadline 5-7 ngày
- ✅ AI Tutor thông minh hơn
- ✅ Good for research paper
- ⚠️ Tăng complexity và risk

---

## 8. DECISION MATRIX

| Factor | No RAG | With RAG |
|--------|--------|----------|
| **Timeline** | ✅ 31/10 achievable | ⚠️ Need 5-7 more days |
| **Complexity** | ✅ Lower | ⚠️ Higher |
| **AI Quality** | ✅ Good (LLM only) | ✅ Better (LLM + RAG) |
| **Research Value** | ✅ Sufficient | ✅ Higher |
| **Maintenance** | ✅ Lower | ⚠️ Higher (vector DB) |
| **Cost** | ✅ Lower (LLM only) | ⚠️ Higher (LLM + Embedding) |

---

## 9. FINAL RECOMMENDATION

**CHO PHASE MVP (31/10):**
- **KHÔNG làm RAG** - Focus on core Auto-Grader + AI Tutor
- RAG có thể thêm sau như Phase 2 (nghiên cứu nâng cao)

**CHO PHASE 2 (SAU MVP):**
- Implement RAG nếu cần cho research paper
- Focus on similar code retrieval và error patterns
- Use ChromaDB + Sentence-Transformers để bắt đầu

---

**Last Updated:** 03/10/2026
**Version:** 1.0
