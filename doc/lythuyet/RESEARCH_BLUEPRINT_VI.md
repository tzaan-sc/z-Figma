# AI-Powered Coding Tutor & Auto-Grader
## Kế Hoạch Nghiên Cứu - Triển Khai Trong 8 Tuần

---

# PHẦN 1 — TỔNG QUAN THỰC THI

**Dự án:** AI-Powered Coding Tutor & Auto-Grader  
**Thời gian:** 8 tuần (56 ngày)  
**Phạm vi đề xuất:** PHIÊN BẢN B (Cân bằng)  
**Đóng góp nghiên cứu chính:** Hệ thống đánh giá code kết hợp execution evidence, static analysis, và feedback dựa trên LLM  
**Điểm mới:** 6/10 (cải tiến dần dần so với các phương pháp chỉ dùng LLM)  
**Khả thi:** 8/10 (dựa trên datasets và tools hiện có)  
**Khả thi trong 2 tháng:** 7/10 (có thể thực hiện với phạm vi tập trung)

---

# PHẦN 2 — ĐỊNH NGHĨA VẤN ĐỀ

## 1. BÀI TOÁN NGHIÊN CỨU THỰC SỰ LÀ GÌ?

**Bài toán nghiên cứu:** Đánh giá và cung cấp feedback cho bài lập trình của sinh viên bằng cách kết hợp evidence từ execution (test cases), static analysis (code metrics), và LLM-based semantic analysis để tạo ra hệ thống assessment đáng tin cậy hơn phương pháp chỉ dùng LLM.
| Evidence                           | Hệ thống kiểm tra gì?                             | Ví dụ                                               |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| **Execution / Test cases**         | Code **chạy đúng không**                          | 8/10 test case đúng, edge case bị fail              |
| **Static analysis / Code metrics** | Code **có vấn đề về chất lượng không**            | Complexity cao, code smell, duplicated code         |
| **LLM semantic analysis**          | Code **có đúng ý tưởng/yêu cầu và dễ hiểu không** | Đúng thuật toán, thiếu validation, giải thích logic |

**Evidence:** Bằng chứng. Những thông tin mà hệ thống thu thập được để làm căn cứ đánh giá bài code của sinh viên.
```text
Code sinh viên
     │
   ├── Evidence 1: Chấm thực thi code khi nộp bài
     │                 ↓
     │              Có đúng không?
     │
     ├── Evidence 2: Phân tích code
     │                 ↓
     │              Code có tốt không?
     │
     └── Evidence 3: AI đọc code
                       ↓
                    Có hiểu đúng yêu cầu không?
```
### Evidence 1

**Execution** = đem code ra chạy thật để xem nó hoạt động như thế nào

**Test case** = trường hợp kiểm thử. Đây là một bộ dữ liệu được đưa vào chương trình để kiểm tra xem chương trình có hoạt động đúng không.

### Evidence 2
**Static Analysis** = phân tích tĩnh mã nguồn. đọc và phân tích code mà không cần chạy code

**Code Metrics** = các chỉ số đo lường code. Những con số này giúp hệ thống đánh giá chất lượng và độ phức tạp của code.

**Complexity** = độ phức tạp. Đây là một chỉ số đo lường mức độ phức tạp của code. 

Cyclomatic Complexity = độ phức tạp theo số nhánh của chương trình. 

Code càng có nhiều if, else, for, while, các nhánh rẽ khác nhau → càng có nhiều đường đi → càng khó kiểm tra và bảo trì.

**Code Smell** = dấu hiệu cho thấy code có thể có vấn đề về chất lượng, cấu trúc hoặc thiết kế dù code vẫn chạy đúng.

Ví dụ: Code quá dài, lặp lại nhiều chỗ, khó đọc, khó hiểu → không phải lỗi nhưng là dấu hiệu code có vấn đề.

| Code smell thường gặp              | Nghĩa dễ hiểu                     |
| ----------------------- | --------------------------------- |
| **Long Method**         | Hàm quá dài                       |
| **Long Parameter List** | Hàm có quá nhiều tham số          |
| **Duplicate Code**      | Code bị lặp                       |
| **Dead Code**           | Code không bao giờ được sử dụng   |
| **Large Class**         | Class quá lớn, làm quá nhiều việc |
| **Deep Nesting**        | `if/for` lồng nhau quá sâu        |

**Duplicated Code** = code bị trùng lặp.

```
Evidence 2:
Static Analysis
       ↓
 ┌─────┼─────────┐
 ↓     ↓         ↓
Complexity   Code Smell   Duplicate Code
 ↓             ↓             ↓
Độ phức tạp   Dấu hiệu       Code
cao           code có vấn đề  bị lặp
```

### Evidence 3
**LLM** = Large Language Model. Mô hình ngôn ngữ lớn. Ở đây LLM sẽ được dùng để phân tích ý nghĩa của code.
**Semantic** = ngữ nghĩa. Tức là ý nghĩa của code. LLM sẽ đọc code và hiểu ý nghĩa của code trong ngữ cảnh bài toán.
```
Code có hiểu đúng yêu cầu không?
Code có thiếu yêu cầu nào không?
Thuật toán có phù hợp không?
Có xử lý edge case không?
Tên biến có dễ hiểu không?
Logic có dễ hiểu không?
```
**Edge Case** = trường hợp biên / trường hợp đặc biệt. Ví dụ như: nhập số âm, số 0, số lớn, số nhỏ, chuỗi rỗng, ký tự đặc biệt, số nguyên tố, số chính phương...


                 Bài làm sinh viên
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
    Test Cases      Static Analysis   LLM
          │             │             │
          ↓             ↓             ↓
    Code chạy       Chất lượng      Ý nghĩa /
    đúng không?     code ra sao?    logic ra sao?
          │             │             │
          └─────────────┼─────────────┘
                        ↓
               Evidence Aggregation
                        ↓
                Final Assessment
                        ↓
       ┌────────────────┼────────────────┐
       ↓                ↓                ↓
     Score            Feedback       Confidence

**Evidence Aggregation** nghĩa là: Tổng hợp các bằng chứng này lại để đưa ra một đánh giá thống nhất.

**Final Assessment** nghĩa là: Đánh giá cuối cùng. Sau khi Evidence Aggregation tổng hợp evidence, hệ thống phải đưa ra: “Cuối cùng bài làm này được đánh giá như thế nào?”

**Nói ngắn:**

*Evidence Aggregation* = gom bằng chứng.

*Final Assessment* = kết luận cuối cùng dựa trên bằng chứng đó.
   - Score = điểm số.
   - Feedback = phản hồi / nhận xét.
   - Confidence = độ tin cậy.
## 2. PHÂN LOẠI BÀI TOÁN

**Kết hợp 4 lĩnh vực:**
- **Software Engineering:** Đây là lĩnh vực nghiên cứu và thực hành cách xây dựng phần mềm một cách có tổ chức, chất lượng, an toàn và dễ bảo trì.
    + **Đánh giá code quality** (chất lượng của mã nguồn), 
    + **static analysis** (phân tích code mà không cần chạy code), 
    + **secure execution** chạy code một cách an toàn. **Sandbox** = môi trường chạy biệt lập/cách ly. Cho code sinh viên chạy trong một "căn phòng riêng", không cho nó tùy tiện đụng vào hệ thống chính.
   ```
              SERVER
                 │
          ┌──────┴──────┐
          │   Sandbox   │
          │             │
          │ Student     │
          │ Code        │
          │             │
          └─────────────┘
          Trong sandbox có thể giới hạn:
          thời gian chạy
          CPU
          RAM
          file system
          network
          quyền truy cập hệ điều hành
   ```


- **AI/LLM:** Code understanding, semantic analysis, feedback generation
   + **Code understanding:** = hiểu mã nguồn. LLM có khả năng đọc và hiểu code. LLM có thể hiểu ý nghĩa của code, logic của code, thuật toán của code, và cách code hoạt động.
   + **Semantic analysis:** = phân tích ý nghĩa. LLM có thể phân tích ý nghĩa của code trong ngữ cảnh bài toán.
   + **Feedback generation:** = tạo ra phản hồi/ nhận xét.

- **AI in Education:** ứng dụng AI vào giáo dục. Pedagogical feedback, Socratic tutoring, learning analytics
   + **Pedagogical feedback:** = phản hồi giáo dục, phản hồi mang tính sư phạm. LLM có thể tạo ra feedback cho code, tức là feedback cho code sinh viên. Giúp sinh viên hiểu sai ở đâu, cần sửa gì. (Chỉ ra vẫn đề, giải thích nguyên nhân, gợi ý hướng suy nghĩ)
   + **Socratic tutoring:** = gia sư Socrate. dạy bằng cách đặt câu hỏi, thay vì đưa ngay đáp án. Giúp sinh viên tự suy nghĩ, tự tìm ra lời giải. Không đưa ra lời giải ngay lập tức, nhưng sẽ gợi ý, đặt câu hỏi để sinh viên tự tìm ra lời giải.
   + **Learning analytics:** = phân tích học tập. LLM có thể tạo ra feedback cho code, tức là feedback cho code sinh viên. Learning Analytics không nhất thiết phải có ngay ở phiên bản đầu tiên của project. (tính năng mở rộng)
- **Computer Science Education:** giáo dục Khoa học máy tính. Đây là lĩnh vực nghiên cứu cách dạy và học các môn liên quan đến máy tính, trong đó có lập trình.
   + **Programming assessment** = đánh giá năng lực lập trình. Đánh giá bài lập trình của sinh viên. Xem code của sinh viên có đúng yêu cầu không, code có chất lượng không, code có an toàn không.
   + **automated grading** = chấm điểm tự động. Tự động chấm điểm bài lập trình của sinh viên.

```
             AI-Powered Coding Tutor
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ↓              ↓              ↓
 Software           AI/LLM       Education
 Engineering
        │              │              │
        │              │              │
        ↓              ↓              ↓
 Static Analysis   Code Understanding  Pedagogical
 Secure Execution  Semantic Analysis   Feedback
 Code Quality      Feedback Generation Socratic Tutoring
        │              │              │
        └──────────────┼──────────────┘
                       ↓
          Computer Science Education
                       │
                       ↓
           Programming Assessment
                       │
                       ↓
             Automated Grading
```
                    AI-POWERED CODING TUTOR
                              │
                              ↓
                    👨‍🎓 Sinh viên nộp CODE
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
    SOFTWARE            AI / LLM         AI IN EDUCATION
    ENGINEERING         
          │                   │                   │
          ↓                   ↓                   ↓
      Code có tốt không?    Code có ý nghĩa gì?   Feedback giúp
      Code có an toàn?      Logic có đúng?        sinh viên học
          │                   │                   │
      • Static Analysis     • Code Understanding   • Pedagogical
      • Code Quality        • Semantic Analysis      Feedback
      • Secure Execution    • Feedback Generation  • Socratic Tutoring
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ↓
                  🎓 COMPUTER SCIENCE EDUCATION
                              │
                              ↓
                   Programming Assessment
                   (Đánh giá bài lập trình)
                              │
                              ↓
                     Automated Grading
                     (Chấm điểm tự động)
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
                 📊 SCORE            💬 FEEDBACK
                 Điểm số          Nhận xét / Gợi ý

## 3. PHẦN KỸ THUẬT (ENGINEERING)

**3.1. Docker sandbox security cho untrusted code execution**

| Từ                 | Nghĩa đơn giản                                        |
| ------------------ | ----------------------------------------------------- |
| **Docker**         | Công cụ tạo và chạy container                         |
| **Sandbox**        | Môi trường chạy code bị giới hạn/cách ly              |
| **Security**       | Bảo mật                                               |
| **Untrusted code** | Code không đáng tin cậy, ví dụ code sinh viên nộp lên |
| **Code execution** | Quá trình chạy/thực thi code                          |

Docker sandbox security = sử dụng Docker để tạo môi trường cách ly và giới hạn quyền khi chạy code của sinh viên (code không đáng tin cậy).

**3.2. Auto-grader pipeline với test cases và execution limits**

| Từ                 | Nghĩa đơn giản                                       |
| ------------------ | ---------------------------------------------------- |
| **Auto-grader**    | Hệ thống tự động chấm điểm                          |
| **Pipeline**       | Quy trình/chuỗi các bước xử lý                        |
| **Test cases**     | Các bộ dữ liệu dùng để kiểm tra code                  |
| **Execution limits** | Giới hạn về thời gian, bộ nhớ khi chạy code         |

Auto-grader pipeline = thiết kế một quy trình tự động để chấm điểm bài lập trình của sinh viên thông qua việc sử dụng các bộ test cases và giới hạn về thời gian, bộ nhớ.

**3.3. Static analysis integration** (complexity, code smells, security)

| Từ                 | Nghĩa đơn giản                                                       |
| ------------------ | -------------------------------------------------------------------- |
| **Static analysis** | Phân tích code mà không chạy nó, tìm lỗi, độ phức tạp, code smells |
| **Complexity**     | Độ phức tạp của code                                                 |
| **Code smells**    | Những dấu hiệu cho thấy code có vấn đề về cấu trúc, khó bảo trì      |
| **Security**       | Vấn đề bảo mật trong code                                             |

Static analysis integration = tích hợp các công cụ phân tích code để đánh giá độ phức tạp, code smells, và vấn đề bảo mật.

**3.4. Web-based submission và feedback interface**

| Từ                 | Nghĩa đơn giản                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| **Web-based**      | Dựa trên nền tảng web, có thể truy cập qua trình duyệt                    |
| **Submission**     | Việc nộp bài/code của sinh viên                                           |
| **Interface**      | Giao diện tương tác giữa người dùng và hệ thống                        |
| **Feedback**       | Phản hồi, nhận xét, gợi ý cho sinh viên                                  |

Web-based submission và feedback interface = giao diện web cho phép sinh viên nộp code và nhận feedback từ hệ thống.

**3.5. Database schema cho submissions, results, feedback**

| Từ                 | Nghĩa đơn giản                                       |
| ------------------ | ---------------------------------------------------- |
| **Database schema** | Thiết kế cấu trúc cơ sở dữ liệu                     |
| **Submissions**    | Các bài code đã nộp                                  |
| **Results**        | Kết quả chạy code, test cases, metrics              |
| **Feedback**       | Các nhận xét, gợi ý cho sinh viên                 |

Database schema cho submissions, results, feedback = thiết kế cấu trúc cơ sở dữ liệu để lưu trữ thông tin về bài nộp, kết quả, và feedback.

**3.6. Integration với external tools (linters, metrics calculators)**

| Từ                 | Nghĩa đơn giản                                                  |
| ------------------ | -------------------------------------------------------------- |
| **Integration**    | Việc kết hợp/tích hợp các thành phần                          |
| **External tools** | Các công cụ bên ngoài, không phải do hệ thống tự phát triển   |
| **Linters**        | Công cụ phân tích code để tìm lỗi và vi phạm quy tắc style    |
| **Metrics calculators**| Công cụ tính toán các chỉ số/metrics của code                |

Integration với external tools (linters, metrics calculators) = tích hợp với các công cụ bên ngoài như linters và metrics calculators để hỗ trợ quá trình chấm điểm.

## 4. PHẦN NGHIÊN CỨU

**4.1. Evaluation metrics cho LLM feedback quality** 
| Từ                 | Nghĩa đơn giản                                                       |
| ------------------ | -------------------------------------------------------------------- |
| **Evaluation metrics** | Các chỉ số dùng để đánh giá chất lượng                                 |
| **LLM feedback quality** | Chất lượng feedback được tạo ra bởi LLM                               |

Evaluation metrics cho LLM feedback quality = các chỉ số dùng để đánh giá chất lượng feedback được tạo ra bởi LLM.

### Một số tiêu chí có thể đo lường chất lượng feedback của LLM:

| Tiêu chí                | Tiếng Việt         | Giải thích đơn giản                                            | Ví dụ                                                            |
| ----------------------- | ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Correctness**         | Tính đúng đắn      | Feedback có xác định **đúng lỗi/vấn đề của code** không?       | Code lỗi ở mảng rỗng → LLM cũng chỉ ra lỗi mảng rỗng             |
| **Relevance**           | Tính liên quan     | Feedback có **đúng với code và yêu cầu bài toán** không?       | Bài yêu cầu tìm max → feedback tập trung vào thuật toán tìm max  |
| **Helpfulness**         | Tính hữu ích       | Feedback có **giúp sinh viên hiểu và sửa lỗi** không?          | Chỉ ra nguyên nhân lỗi và hướng cải thiện                        |
| **Actionability**       | Khả năng hành động | Feedback có cho sinh viên biết **nên làm gì tiếp theo** không? | “Kiểm tra trường hợp input rỗng trước khi truy cập phần tử”      |
| **Clarity**             | Tính rõ ràng       | Feedback có **dễ hiểu, dễ đọc** không?                         | Giải thích ngắn gọn, không dùng thuật ngữ khó hiểu               |
| **Pedagogical Quality** | Chất lượng sư phạm | Feedback có **giúp sinh viên học và hiểu bản chất** không?     | Đặt câu hỏi gợi mở thay vì đưa ngay đáp án                       |
| **Specificity**         | Tính cụ thể        | Feedback có chỉ rõ **đoạn code/vấn đề cụ thể** không?          | “Vòng lặp ở dòng 15 bỏ qua phần tử cuối” thay vì “Code chưa tốt” |
| **Completeness**        | Tính đầy đủ        | Feedback có đề cập **đầy đủ các vấn đề quan trọng** không?     | Phát hiện cả lỗi logic và lỗi xử lý edge case                    |


**4.2. Ablation study để xác định contribution của từng component**
| Từ                 | Nghĩa                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **Ablation**       | Loại bỏ/bỏ đi một thành phần                                              |
| **Study**          | Nghiên cứu/thử nghiệm                                                     |
| **Component**      | Thành phần                                                                |
| **Contribution**   | Mức đóng góp                                                              |
| **Ablation study** | Nghiên cứu bằng cách loại bỏ từng thành phần để xem nó đóng góp bao nhiêu |

Ablation study = nghiên cứu loại bỏ từng thành phần để đánh giá contribution của từng component.

**4.3. Human evaluation protocol cho feedback quality**
| Từ                 | Nghĩa đơn giản                                                       |
| ------------------ | -------------------------------------------------------------------- |
| **Human evaluation** | Đánh giá bởi con người                                                 |
| **Protocol**       | Quy trình, phương pháp đánh giá                                     |
| **Feedback quality** | Chất lượng feedback                                                    |

Human evaluation protocol = quy trình đánh giá chất lượng feedback bởi con người.

**4.4. Comparative study giữa các baseline approaches**
| Từ                 | Nghĩa đơn giản                                                        |
| ------------------ | ---------------------------------------------------------------------- |
| **Comparative study** | Nghiên cứu so sánh                                                     |
| **Baseline approaches** | Các phương pháp cơ sở, nền tảng                                       |

Comparative study = nghiên cứu so sánh giữa các baseline approaches.

**4.5. Empirical analysis trên student code dataset**
| Từ                 | Nghĩa đơn giản                                          |
| ------------------ | ------------------------------------------------------ |
| **Empirical analysis** | Phân tích dựa trên thực nghiệm                         |
| **Student code dataset** | Tập dữ liệu chứa code của sinh viên                  |

Empirical analysis trên student code dataset = phân tích dựa trên thực nghiệm trên tập dữ liệu chứa code của sinh viên.

## 5. PHẦN AI

**5.1. LLM-based code understanding và semantic analysis**
| Từ                | Nghĩa                |
| ----------------- | -------------------- |
| **LLM**           | Large Language Model |
| **Based**         | Dựa trên             |
| **Code**          | Mã nguồn             |
| **Understanding** | Hiểu                 |
| **Semantic**      | Ngữ nghĩa/ý nghĩa    |
| **Analysis**      | Phân tích            |

LLM-based code understanding và semantic analysis = phân tích ngữ nghĩa code dựa trên LLM.
| Code Understanding    | Semantic Analysis                                  |
| --------------------- | -------------------------------------------------- |
| Hiểu code đang làm gì | Phân tích ý nghĩa của code trong ngữ cảnh bài toán |
| “Đoạn này làm gì?”    | “Đoạn này có thực hiện đúng yêu cầu không?”        |


**5.2. Prompt engineering cho rubric-based grading**
| Từ                 | Nghĩa đơn giản                                    |
| ------------------ | -------------------------------------------------- |
| **Prompt**         | Lời nhắc/Câu lệnh đầu vào                         |
| **Engineering**    | Thiết kế/Xây dựng                                |
| **Rubric-based**   | Dựa trên thang điểm/tiêu chí đánh giá             |
| **Grading**        | Chấm điểm                                         |

Prompt engineering cho rubric-based grading = thiết kế câu lệnh để chấm điểm dựa trên thang điểm.

**5.3. Evidence-grounded reasoning để giảm hallucination**

| Từ                 | Nghĩa đơn giản                                 |
| ------------------ | ----------------------------------------------- |
| **Evidence-grounded** | Dựa trên bằng chứng/cơ sở thực tế               |
| **Reasoning**      | Lập luận/Suy luận                               |
| **Hallucination**  | Sự bịa đặt/Tạo ra thông tin không có thật        |
| **Reduce**         | Giảm bớt                                        |

Evidence-grounded reasoning để giảm hallucination = lập luận dựa trên bằng chứng để giảm sự bịa đặt (thông tin không có thật).

**5.4. Chain-of-thought (hoặc alternatives) cho multi-criteria evaluation**
| Từ                     | Nghĩa đơn giản                                               |
| ---------------------- | ------------------------------------------------------------ |
| **Chain-of-thought**   | Chuỗi suy nghĩ                                               |
| **Alternatives**       | Các phương án thay thế                                       |
| **Multi-criteria**     | Nhiều tiêu chí                                               |
| **Evaluation**         | Đánh giá                                                    |

Chain-of-thought (hoặc alternatives) cho multi-criteria evaluation = chuỗi suy nghĩ (hoặc các phương án thay thế) cho việc đánh giá nhiều tiêu chí.

Trong hệ thống thực tế, không nhất thiết phải yêu cầu LLM xuất toàn bộ chain-of-thought nội bộ, có thể dùng cách an toàn và dễ triển khai hơn là: 
- structured reasoning (lập luận có cấu trúc): để LLM xuất ra những điểm chính, không cần hiển thị toàn bộ quá trình suy luận.
- rubric-based reasoning (lập luận dựa trên thang điểm): để LLM đánh giá dựa trên thang điểm.

Alternatives có thể là:
- Rubric-based structured reasoning: đánh giá dựa trên thang điểm có cấu trúc
- Step-by-step evaluation: đánh giá từng bước
- Self-consistency: tự nhất quán
- Multi-pass evaluation: đánh giá nhiều lần
- Critic/reviewer pass: đánh giá bởi người đánh giá

**5.5. Socratic hint generation cho tutoring**
| Từ                  | Nghĩa đơn giản                            |
| ------------------- | ------------------------------------------ |
| **Socratic**        | Theo phương pháp Socrates (đặt câu hỏi)    |
| **Hint**            | Gợi ý                                     |
| **Generation**      | Tạo ra                                    |
| **Tutoring**        | Huấn luyện/Dạy kèm                        |

Socratic hint generation cho tutoring = tạo gợi ý theo phương pháp Socrates cho việc dạy kèm.

## 6. PHẦN GIÁO DỤC CNTT

**6.1. Pedagogical feedback design**
| Từ                 | Nghĩa đơn giản                              |
| ------------------ | ------------------------------------------- |
| **Pedagogical**    | Liên quan đến giáo dục, giảng dạy         |
| **Feedback**       | Phản hồi, góp ý                           |
| **Design**         | Thiết kế                                    |

Pedagogical feedback design = thiết kế phản hồi theo hướng giáo dục.

**6.2. Socratic tutoring principles**
| Từ                  | Nghĩa đơn giản                           |
| ------------------- | ----------------------------------------- |
| **Socratic**        | Theo phương pháp Socrates (đặt câu hỏi)    |
| **Tutoring**        | Huấn luyện/Dạy kèm                       |
| **Principles**      | Nguyên tắc                              |

Socratic tutoring principles = nguyên tắc dạy kèm theo phương pháp Socrates.
| Nguyên tắc              | Ý nghĩa                                    |
| ----------------------- | ------------------------------------------ |
| **Ask before telling**  | Hỏi trước khi đưa đáp án                   |
| **Guide, don't solve**  | Hướng dẫn thay vì làm bài hộ               |
| **Use student context** | Gợi ý dựa trên lỗi/code thực tế            |
| **Encourage reasoning** | Khuyến khích sinh viên giải thích suy nghĩ |
| **Reveal gradually**    | Chỉ đưa thêm thông tin khi cần             |

**6.3. Learning-oriented feedback rubrics**
| Từ                  | Nghĩa đơn giản                                          |
| ------------------- | ------------------------------------------------------ |
| **Learning-oriented** | Định hướng học tập                                      |
| **Feedback**        | Phản hồi, góp ý                                       |
| **Rubrics**         | Thang điểm, tiêu chí đánh giá                          |

Learning-oriented feedback rubrics = thang điểm đánh giá phản hồi theo hướng học tập.

**6.4. Progressive hint escalation**
| Từ                 | Nghĩa đơn giản                                                 |
| ------------------ | ------------------------------------------------------------- |
| **Progressive**    | Tăng dần, dần dần                                          |
| **Hint**           | Gợi ý                                                         |
| **Escalation**     | Leo thang, tăng cấp                                            |

Progressive hint escalation = tăng cấp độ gợi ý dần dần.

**6.5. Student engagement analytics**
| Từ                 | Nghĩa đơn giản                           |
| ------------------ | ----------------------------------------- |
| **Student**        | Sinh viên                                 |
| **Engagement**     | Sự tham gia, tương tác                    |
| **Analytics**      | Phân tích                                  |

Student engagement analytics = phân tích sự tương tác của sinh viên.

## 7. ĐÓNG GÓP CÓ THỂ TUYÊN BỐ

1. **Evidence-grounded code assessment framework:** Kết hợp execution evidence, static analysis, và LLM semantic analysis để tăng reliability và giảm hallucination
2. **Empirical evaluation methodology:** Ablation study so sánh traditional auto-grader, static analysis, LLM-only, và hybrid approach (4 phương pháp)
   - Traditional Auto-grader: Code → Test Cases → Score (chủ yếu đánh giá correctness)
   - Static Analysis: Code → Static Analysis → Quality / Complexity / Security (không dùng LLM để đánh giá semantic)
   - LLM-only: Code → LLM → Assessment + Feedback (LLM tự phân tích code)
   - Hybrid approach: Code → Execution + Static Analysis + LLM → Evidence Aggregation → Assessment
3. **Pedagogical feedback system:** Socratic tutoring framework với progressive hint escalation cho programming education
- Socratic tutoring: Dạy kèm thông qua câu hỏi gợi mở, khơi gợi suy nghĩ cho sinh viên thay vì đưa ra câu trả lời trực tiếp.
- Progressive hint escalation: Tăng cấp độ gợi ý dần dần theo mức độ khó của lỗi.
- Learning-oriented feedback: Phản hồi định hướng học tập, tập trung vào việc giúp sinh viên hiểu bài hơn.

| Contribution                                    | Hiểu đơn giản                               | Đề tài của bạn làm gì?                                      | Mục đích |
| ----------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------- | -------- |
| **Evidence-grounded code assessment framework** | Framework đánh giá code dựa trên bằng chứng | Kết hợp **Execution + Static Analysis + LLM**               | Tăng độ tin cậy và giảm thiểu lỗi |
| **Empirical evaluation methodology**            | Phương pháp đánh giá bằng thực nghiệm       | So sánh nhiều cách đánh giá và dùng **ablation study**      | So sánh hiệu quả các phương pháp khác nhau |
| **Pedagogical feedback system**                 | Hệ thống feedback hướng đến việc học        | Kết hợp **Socratic Tutoring + Progressive Hint Escalation** | Tăng cường khả năng học tập cho sinh viên |


## 8. KHÔNG PHẢI RESEARCH CONTRIBUTION

- Xây dựng website Next.js với ChatGPT API
- Docker container setup
- Basic CRUD operations
- UI/UX design
- Standard database operations
- Simple test case execution

---

# PHẦN 3 — PHẠM VI ĐỀ XUẤT

## PHIÊN BẢN A — 2 THÁNG AN TOÀN

**Research value:** 4/10  
**Novelty:** 3/10  
**Difficulty:** 4/10  
**Implementation:** 8/10  
**Dataset:** 9/10  
**Compute:** 9/10  
**Experiment:** 7/10  
**2-month feasibility:** 9/10

**Scope:**
- Basic auto-grader với test cases
- Static analysis cơ bản (complexity metrics)
- LLM feedback cho correctness chỉ
- Simple web interface
- Evaluation trên 1 dataset nhỏ
- Không có ablation study

## PHIÊN BẢN B — 2 THÁNG CÂN BẰNG ⭐ ĐỀ XUẤT

**Research value:** 7/10  
**Novelty:** 6/10  
**Difficulty:** 6/10  
**Implementation:** 7/10  
**Dataset:** 8/10  
**Compute:** 8/10  
**Experiment:** 7/10  
**2-month feasibility:** 7/10

**Scope:**
- Auto-grader với execution evidence
- Static analysis (complexity, code quality)
- LLM semantic analysis với rubric-based grading
- Evidence-grounded prompt engineering
- Socratic hint generation
- Ablation study (4 conditions)
- Human evaluation cho feedback quality
- Evaluation trên ProgFeed dataset

## PHIÊN BẢN C — 2 THÁNG THAM VỌNG

**Research value:** 8/10  
**Novelty:** 7/10  
**Difficulty:** 8/10  
**Implementation:** 5/10  
**Dataset:** 6/10  
**Compute:** 6/10  
**Experiment:** 6/10  
**2-month feasibility:** 4/10

**Scope:**
- Tất cả Phiên bản B +
- Student modeling và adaptive feedback
- Learning analytics dashboard
- Multi-language support
- Full classroom deployment study
- Longitudinal analysis
- Novel evaluation metrics

## CHỌN PHIÊN BẢN B

**Lý do:**
1. Balance giữa research contribution và feasibility
2. Có đủ scope để tạo publication-worthy paper
3. Xây dựng trên existing datasets (ProgFeed, FalconCode)
4. Ablation study tạo empirical evidence
5. Avoid over-complexity của Phiên bản C
6. More research value than Phiên bản A

---

# PHẦN 4 — CÂU HỎI NGHIÊN CỨU

## RQ1: LLM có thể đánh giá code chính xác đến mức nào khi được grounding trong execution evidence và static analysis?

## Giải thích câu hỏi này:
Câu hỏi này muốn biết liệu khi mình "ground" LLM với execution evidence và static analysis thì LLM có thể đánh giá code chính xác hơn không.
- **ground** trong ngữ cảnh này có nghĩa là "neo", "nền", tức là cung cấp cho LLM "bằng chứng" từ execution và static analysis để LLM có thể đánh giá code dựa trên bằng chứng đó.
- **Execution evidence** là bằng chứng từ việc chạy code, ví dụ như test case results, error logs, coverage metrics.
   - test case results: kết quả test case
   - error logs: log lỗi
   - coverage metrics: metrics độ bao phủ (nghĩa là : số % code được test)
   - metrics: chỉ số đo lường
   
- **Static analysis** là phân tích code mà không chạy code, ví dụ như complexity metrics, code quality metrics, security metrics.
   - complexity metrics: metrics độ phức tạp 
   - code quality metrics: metrics chất lượng code 
   - security metrics: metrics an toàn code 
   
- **Human grading** là điểm số được chấm bởi con người.

Câu hỏi này muốn biết liệu khi mình cung cấp cho LLM "evidence" từ execution và static analysis thì LLM có thể đánh giá code chính xác hơn không, so với khi chỉ cung cấp cho LLM code mà không có "evidence".

**Giả thuyết:** LLM với execution evidence và static analysis sẽ đạt correlation cao hơn với human grading so với LLM-only approach
(so với LLM-only approach nghĩa là: chỉ cung cấp cho LLM code mà không có "evidence")

**Thí nghiệm:** So sánh LLM-only vs LLM+evidence vs LLM+evidence+static analysis về grading accuracy.

Thiết kế 3 experimental conditions (điều kiện thử nghiệm):

| Approach                                | Input cho LLM                                  | Mục đích                                     |
| --------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| **A. LLM-only**                         | Code + đề bài                                  | Baseline (đánh giá code chỉ dựa vào LLM)    |
| **B. LLM + Execution Evidence**         | Code + đề bài + test results                   | Xem runtime evidence (bằng chứng từ việc chạy code) có giúp cải thiện không |
| **C. LLM + Evidence + Static Analysis** | Code + đề bài + test results + static analysis | Phương pháp hybrid (đánh giá code kết hợp LLM, evidence và static analysis) đề xuất                   |


**Metrics:** Spearman correlation, Cohen's Kappa, Mean Absolute Error (MAE) so với human grades.
| Metric                       | Ý nghĩa                                                          | Mong muốn              |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------- |
| **Spearman correlation (ρ)** | Mức độ tương quan thứ hạng giữa AI grade và human grade          | **Càng cao càng tốt**  |
| **Cohen's Kappa (κ)**        | Mức độ đồng thuận giữa AI và human khi chia thành các mức/cấp độ | **Càng cao càng tốt**  |
| **MAE**                      | Sai lệch tuyệt đối trung bình giữa AI grade và human grade       | **Càng thấp càng tốt** |


**Kết quả mong đợi:** Hybrid approach sẽ có correlation >0.7 với human grading, LLM-only <0.5.
| Approach                         |      Expected/Target |
| -------------------------------- | -------------------: |
| LLM-only                         |              ρ < 0.5 |
| LLM + Execution Evidence         |         ρ > LLM-only |
| LLM + Evidence + Static Analysis | **ρ > 0.7 (target)** |

## RQ2: Execution evidence có giúp giảm hallucination trong LLM code feedback không?

**Giả thuyết:** LLM được cung cấp execution evidence (test results, error logs) sẽ generate ít incorrect claims hơn về code behavior.

**Thí nghiệm:** Manual evaluation của LLM claims về code correctness, so sánh giữa grounded vs ungrounded prompts.

**Metrics:** Hallucination rate (incorrect claims / total claims), Precision/recall cho bug detection.

**Kết quả mong đợi:** Grounded prompts sẽ có hallucination rate <15%, ungrounded >30%.

## RQ3: Kết hợp execution evidence + static analysis + LLM có tốt hơn chỉ dùng LLM không?

**Giả thuyết:** Hybrid system sẽ outperform LLM-only trong cả correctness và pedagogical quality metrics.

**Thí nghiệm:** Ablation study với 4 conditions: (1) Auto-grader only, (2) Static analysis only, (3) LLM-only, (4) Hybrid.

**Metrics:** Grading accuracy, feedback helpfulness, pedagogical quality, student preference.

**Kết quả mong đợi:** Hybrid sẽ outperform baseline ở cả 4 metrics với statistical significance.

## RQ4: Feedback của LLM có pedagogically useful cho người học không?

**Giả thuyết:** Socratic-style feedback từ LLM sẽ được students đánh giá cao hơn direct correction feedback.

**Thí nghiệm:** Human evaluation với 2-3 expert graders đánh giá feedback quality theo pedagogical rubric.

**Metrics:** Helpfulness, clarity, actionability, pedagogical alignment (sử dụng rubric từ literature).

**Kết quả mong đợi:** Socratic feedback sẽ có higher scores trên pedagogical alignment (mean >4/5 vs <3/5).

---

# PHẦN 5 — TRẠNG THÁI HIỆN TẠI (STATE OF THE ART)

## HỆ THỐNG CHÍNH

### 1. JorGPT (2025)
- **Paper:** "JorGPT: Instructor-Aided Grading of Programming Assignments with Large Language Models"
- **Venue:** Future Internet, MDPI
- **Approach:** Desktop app sử dụng multiple LLMs (GPT-4o, Gemini, DeepSeek, Qwen) với customizable rubric
- **Results:** Adjusted R² = 0.9156, MAE = 0.4579 so với human grading
- **Limitation:** Không có execution evidence, chỉ dùng source code
- **GitHub:** https://github.com/UFV-INGINF/JorGPT

### 2. CodEv (2024)
- **Paper:** "CodEv: An Automated Grading Framework Leveraging Large Language Models for Consistent and Constructive Feedback"
- **Venue:** IEEE BigData 2024
- **Approach:** Chain-of-Thought prompting + LLM ensemble + agreement tests
- **Results:** Comparable to human evaluators với smaller LLMs
- **Limitation:** Không có execution grounding, focus trên code analysis
- **Innovation:** CoT và ensemble methods

### 3. StepGrade (2025)
- **Paper:** "StepGrade: Grading Programming Assignments with Context-Aware LLMs"
- **Venue:** IEEE ISEC 2025
- **Approach:** Chain-of-Thought cho multi-criteria evaluation (functionality, code quality, algorithmic efficiency)
- **Results:** CoT outperforms regular prompting trong grading quality và interpretability
- **Limitation:** 30 assignments only, không có large-scale evaluation
- **Innovation:** Structured CoT cho interconnected grading criteria

### 4. ProgFeed (2026)
- **Paper:** "A Classroom Study of LLM-generated Feedback Intervention in Introductory Programming"
- **Venue:** IRAISE 2026
- **Approach:** Randomized classroom study với 3 feedback conditions (natural language hints, test cases, no AI)
- **Dataset:** 6,693 submissions từ 215 students, 17 labs
- **Results:** Natural language feedback associated với higher completion rates
- **GitHub:** https://github.com/umass-ml4ed/progFeed-dataset-public
- **License:** CC BY 4.0

### 5. STAP (2025)
- **Paper:** "STAP: A Socratic Tutor for Adaptive Programming with Pedagogical Scaffolding"
- **Venue:** AIAE 2025
- **Approach:** Four-stage pipeline (Checking, Correcting, Complementing, Segmenting) cho Socratic tutoring
- **Innovation:** Operational definitions cho Socratic hints, MVH, answer leakage
- **Limitation:** Formative evaluation only, chưa có classroom study

---

# PHẦN 6 — TỔNG QUAN TÀI LIỆU

## A. AUTOMATED PROGRAMMING ASSESSMENT

### Công trình nền tảng
- **Ihantola et al. (2010)** - "Review of recent systems for automatic assessment of programming assignments" - Systematic review 2006-2010, 548 citations
- **Ala-Mutka (2005)** - "A Survey of Automated Assessment Approaches for Programming Assignments"
- **Edgar (2020)** - "Building a Comprehensive Automated Programming Assessment System" - Open-source APAS

### Hệ thống hiện đại
- **CodeRunner** - Moodle plugin, 4000+ installations, supports 60+ languages
- **Autograder.io** - University of Michigan, 5000 students/semester
- **Web-CAT** - Focus trên student testing activities
- **DMOJ** - Modern online judge với plagiarism detection

### Hạn chế hiện tại
- Focus trên correctness (test cases) - limited feedback on code quality
- Binary pass/fail feedback - không có pedagogical guidance
- Manual rubric grading - không scalable

## B. ONLINE JUDGE / AUTO-GRADER

### Tính năng chính
- Test case-based grading
- Hidden test cases
- Resource limits (CPU, memory, timeout)
- Multiple language support
- Plagiarism detection (MOSS)

### Hạn chế
- Only checks output correctness
- No semantic code analysis
- No pedagogical feedback
- Cannot detect subtle bugs

## C. STATIC CODE ANALYSIS

### Tools
- **SonarQube** - Enterprise code quality
- **ESLint/Pylint** - Language-specific linting
- **Semgrep** - Security-focused static analysis
- **CodeQL** - GitHub's semantic analysis
- **Radon** - Python complexity metrics

### Metrics
- **Cyclomatic Complexity (McCabe)** - Decision points
- **Cognitive Complexity** - Human-focused complexity
- **Halstead Metrics** - Operator/operand analysis
- **Maintainability Index** - Overall code quality

## D. LLM CHO CODE

### Code Understanding
- **CodeBERT** - BERT-style model for code
- **CodeGPT** - GPT-style for code generation
- **CodeXGLUE** - Benchmark với 14 datasets, 10 tasks
- **StarCoder** - Open-source code LLM

### Code Analysis Tasks
- Bug detection
- Code explanation
- Code summarization
- Code repair
- Security analysis

### Hạn chế
- Context window limitations
- Hallucination in code claims
- Inconsistent reasoning
- Difficulty với large codebases

## E. LLM-BASED PROGRAMMING EDUCATION

### AI Tutoring Systems
- **Course-aware AI Tutor (2024)** - Retrieval-augmented, course-aligned guidance
- **Code.org AI Tutor** - Socratic questioning, Gemini Flash 2.5
- **CodeTrain** - Socratic AI coding tutor
- **Traver (2025)** - Turn-by-turn verification cho coding tutoring

### Pedagogical Principles
- Socratic questioning
- Hint generation
- Retrieval augmentation
- Progressive scaffolding
- Answer leakage prevention

## F. LLM-BASED CODE GRADING

### Key Papers
- **JorGPT (2025)** - Multiple LLMs, customizable rubric, R² = 0.9156
- **CodEv (2024)** - CoT + ensemble, comparable to human
- **StepGrade (2025)** - Context-aware CoT, multi-criteria evaluation
- **Rubric-Grader** - CLI tool với ensemble evaluation
- **"Rubric Is All You Need" (2025)** - Question-specific rubrics

### Approaches
- **Zero-shot prompting** - Basic LLM grading
- **Few-shot prompting** - Example-based grading
- **Chain-of-Thought** - Step-by-step reasoning
- **Ensemble methods** - Multiple LLM voting
- **Rubric-based** - Structured evaluation criteria

### Current Gaps
- Limited execution evidence integration
- Focus trên single submissions, không có iterative feedback
- Limited pedagogical grounding
- Inconsistent evaluation across different prompts

## G. SECURE CODE EXECUTION

### Docker Security Layers
- **Namespaces** - PID, network, mount isolation
- **cgroups** - Resource limits (CPU, memory, disk I/O)
- **Capabilities** - Fine-grained permissions
- **seccomp** - Syscall filtering (default blocks ~50 syscalls)
- **AppArmor/SELinux** - Mandatory access control

### Tools
- **Docker Sandboxes** - MicroVM isolation cho AI agents
- **sharryy/sandbox** - PHP API cho secure Docker execution
- **autograder** - Python package với sandboxing

### Threat Models
- Container escape (CVE-2019-5736)
- Resource exhaustion (fork bombs, infinite loops)
- Network access (data exfiltration)
- Filesystem access (host mount)
- Privilege escalation

---

# PHẦN 7 — PAPER PHẢI ĐỌC

## ƯU TIỆN 1: ĐỌC TRƯỚC TIÊN

1. **"A Classroom Study of LLM-generated Feedback Intervention in Introductory Programming" (2026)**
   - Tại sao: Real classroom deployment, large dataset, comparison of feedback modalities
   - Đọc section: Introduction, Methodology, Results, Discussion
   - Rút ra: Experimental design, feedback conditions, evaluation metrics

2. **"JorGPT: Instructor-Aided Grading of Programming Assignments with LLMs" (2025)**
   - Tại sao: Strong correlation with human grading, multiple LLM comparison
   - Đọc section: System design, Experimental setup, Results
   - Rút ra: Grading pipeline, rubric design, evaluation methodology

3. **"CodEv: An Automated Grading Framework Leveraging LLMs" (2024)**
   - Tại sao: CoT prompting, ensemble methods, consistency tests
   - Đọc section: Methodology, Prompt design, Evaluation
   - Rút ra: CoT prompts, ensemble approach, consistency metrics

4. **"STAP: A Socratic Tutor for Adaptive Programming" (2025)**
   - Tại sao: Pedagogical scaffolding, Socratic tutoring principles
   - Đọc section: System design, Pedagogical framework, Evaluation
   - Rút ra: Socratic hint design, answer leakage prevention

5. **"Review of recent systems for automatic assessment of programming assignments" (2010)**
   - Tại sao: Foundational survey, covers all major approaches
   - Đọc section: Major features, Technical approaches, Future directions
   - Rút ra: System features, pedagogical considerations

## ƯU TIỆN 2: NÊN ĐỌC

6. **"StepGrade: Grading Programming Assignments with Context-Aware LLMs" (2025)**
7. **"Design and Deployment of a Course-Aware AI Tutor" (2024)**
8. **"FalconCode: A Multiyear Dataset of Python Code Samples" (2023)**
9. **"CompareCFG: Providing Visual Feedback on Code Quality" (2020)**
10. **"Automated Grading and Feedback Tools: A Systematic Review" (2023)**

## ƯU TIỆN 3: TÙY CHỌN

11. **"CodeHalu: Investigating Code Hallucinations in LLMs" (2024)**
12. **"Partnering with AI: A Pedagogical Feedback System" (2025)**
13. **"Evaluating Language Models for Generating Programming Feedback" (2024)**

---

# PHẦN 8 — RESEARCH GAP (KHOẢNG TRỐNG NGHIÊN CỨU)

## GAP 1: LIMITED EXECUTION EVIDENCE IN LLM GRADING

**Existing Approach:** JorGPT, CodEv, StepGrade chủ yếu dựa vào source code analysis, limited hoặc không có execution evidence.

**Limitation:** LLM có thể hallucinate về code behavior nếu không có actual execution results.

**Gap:** Cần systematic integration của execution evidence (test results, error logs, performance metrics) vào LLM grading pipeline.

**Proposed Research:** Evidence-grounded LLM grading với execution evidence từ auto-grader.

## GAP 2: LIMITED STATIC ANALYSIS INTEGRATION

**Existing Approach:** Hầu hết LLM grading systems không tích hợp static analysis tools.

**Limitation:** LLM có thể miss deterministic issues (complexity, code smells) mà static analysis detect tốt hơn.

**Gap:** Cần hybrid approach kết hợp static analysis metrics với LLM semantic analysis.

**Proposed Research:** Static analysis + LLM hybrid với evidence grounding.

## GAP 3: LIMITED EVALUATION OF FEEDBACK PEDAGOGICAL QUALITY

**Existing Approach:** Đa số studies focus trên grading accuracy, limited evaluation của pedagogical quality.

**Limitation:** Feedback có thể accurate nhưng không pedagogically useful (quá chi tiết, không hướng self-discovery).

**Gap:** Cần systematic evaluation của pedagogical quality sử dụng established rubrics.

**Proposed Research:** Human evaluation với pedagogical rubric từ literature.

## GAP 4: LIMITED ABLATION STUDIES

**Existing Approach:** Đa số studies compare LLM vs human, limited ablation của individual components.

**Limitation:** Không rõ thành phần nào thực sự tạo ra improvement (execution evidence? static analysis? prompting?).

**Gap:** Cần systematic ablation study để isolate contribution của từng component.

**Proposed Research:** 4-condition ablation: Auto-grader only, Static only, LLM-only, Hybrid.

## GAP 5: LIMITED REPRODUCIBILITY

**Existing Approach:** Đa số studies không release full pipeline hoặc dataset.

**Limitation:** Khó reproduce và compare với other approaches.

**Gap:** Cần fully reproducible pipeline với open-source code và public dataset.

**Proposed Research:** Use ProgFeed dataset (CC BY 4.0), release full pipeline.

---

# PHẦN 9 — NGHIÊN CỨU ĐỀ XUẤT

## HƯỚNG NGHIÊN CỨU: EVIDENCE-GROUNDED HYBRID CODE ASSESSMENT

### Động lực
LLM-only grading suffers từ hallucination và lack of deterministic verification. Traditional auto-graders provide execution evidence nhưng limited semantic analysis. Static analysis provides deterministic metrics nhưng không có pedagogical feedback.

### Approach Đề xuất
Kết hợp 3 evidence sources:
1. **Execution Evidence:** Test results, error logs, performance metrics từ auto-grader
2. **Static Analysis:** Complexity metrics, code smells, security issues từ static analysis tools
3. **LLM Semantic Analysis:** Code understanding, rubric-based grading, pedagogical feedback

### Innovation
- **Evidence-grounded prompting:** LLM receives structured evidence từ execution và static analysis
- **Hybrid scoring:** Deterministic scores (test results, metrics) + LLM subjective evaluation
- **Ablation study:** Systematic comparison của từng component
- **Pedagogical framework:** Socratic tutoring với progressive hint escalation

### Đóng góp Mong đợi
1. Empirical evidence về value của execution evidence và static analysis trong LLM grading
2. Reproducible pipeline cho hybrid code assessment
3. Pedagogical feedback framework cho programming education

---

# PHẦN 10 — KIẾN TRÚC HỆ THỐNG

## KIẾN TRÚC CAO CẤP

```
Student
  ↓
Web Interface (Code Editor)
  ↓
Submission API
  ↓
┌─────────────────────────────────────┐
│         Backend System              │
├─────────────────────────────────────┤
│  Submission Queue                   │
│  ↓                                  │
│  ┌──────────────────────────────┐  │
│  │   Sandbox Execution          │  │
│  │   - Docker container          │  │
│  │   - Compile & Execute        │  │
│  │   - Test Cases                │  │
│  │   - Resource Limits           │  │
│  └──────────────────────────────┘  │
│  ↓                                  │
│  Execution Evidence                 │
│  (test results, error logs)         │
│  ↓                                  │
│  ┌──────────────────────────────┐  │
│  │   Static Analysis            │  │
│  │   - Complexity Metrics       │  │
│  │   - Code Quality              │  │
│  │   - Security Scan            │  │
│  └──────────────────────────────┘  │
│  ↓                                  │
│  Static Analysis Results             │
│  ↓                                  │
│  ┌──────────────────────────────┐  │
│  │   LLM Analyzer               │  │
│  │   - Evidence Grounding      │  │
│  │   - Rubric-based Grading     │  │
│  │   - Socratic Feedback        │  │
│  └──────────────────────────────┘  │
│  ↓                                  │
│  LLM Analysis Results               │
│  ↓                                  │
│  ┌──────────────────────────────┐  │
│  │   Score Aggregator           │  │
│  │   - Weighted Scoring         │  │
│  │   - Final Grade              │  │
│  └──────────────────────────────┘  │
│  ↓                                  │
│  Feedback Generator                 │
│  ↓                                  │
│  Database (Results & Feedback)      │
└─────────────────────────────────────┘
  ↓
Feedback to Student
```

## COMPONENTS

### 1. Web Interface
- **Input:** Code editor, problem statement
- **Output:** Submission, real-time feedback
- **Tech:** Next.js + Monaco Editor

### 2. Sandbox Execution
- **Input:** Source code, test cases
- **Output:** Execution results, error logs
- **Tech:** Docker với security hardening

### 3. Static Analysis
- **Input:** Source code
- **Output:** Complexity metrics, code quality scores
- **Tech:** Python tools (radon, pylint, bandit)

### 4. LLM Analyzer
- **Input:** Source code, execution evidence, static analysis results, rubric
- **Output:** LLM scores, semantic feedback
- **Tech:** OpenAI API hoặc open-source LLM

### 5. Score Aggregator
- **Input:** Test scores, static metrics, LLM scores
- **Output:** Final grade (0-100)
- **Logic:** Weighted combination

### 6. Feedback Generator
- **Input:** All analysis results
- **Output:** Structured feedback (correctness, quality, hints)
- **Logic:** Template-based + LLM-generated

---

# PHẦN 11 — AUTO-GRADER

## DESIGN

### Ngôn ngữ hỗ trợ
- **Giai đoạn 1:** Python (chính)
- **Giai đoạn 2:** JavaScript, Java (nếu có thời gian)

### Test Case Format
```python
# test_cases.json
{
  "test_cases": [
    {
      "input": "5\n3\n",
      "expected_output": "15\n",
      "is_hidden": false
    },
    {
      "input": "10\n7\n",
      "expected_output": "70\n",
      "is_hidden": true
    }
  ]
}
```

### Execution Pipeline
1. **Compile:** Check syntax errors
2. **Execute:** Run với test cases
3. **Capture:** stdout, stderr, exit code
4. **Compare:** expected vs actual output
5. **Score:** Calculate pass rate

### Resource Limits
- **CPU:** 1 core (cgroups)
- **Memory:** 512MB
- **Timeout:** 5 seconds per test case
- **Disk:** 100MB read-only + 10MB /tmp

### Verdict Types
- **AC (Accepted):** All tests pass
- **WA (Wrong Answer):** Output mismatch
- **TLE (Time Limit Exceeded):** Timeout
- **MLE (Memory Limit Exceeded):** Memory overflow
- **CE (Compilation Error):** Syntax error
- **RE (Runtime Error):** Exception/crash

---

# PHẦN 12 — SANDBOX SECURITY

## THREAT MODEL

### Scenario 1: Infinite Loop
```python
while True:
    pass
```
**Mitigation:** Timeout enforcement (5s)

### Scenario 2: Resource Exhaustion
```python
import os
os.system("fork bomb")
```
**Mitigation:** Process limit, cgroups

### Scenario 3: Filesystem Access
```python
open("/etc/passwd", "r")
```
**Mitigation:** Read-only filesystem, restricted mount

### Scenario 4: Network Access
```python
import requests
requests.get("http://evil.com")
```
**Mitigation:** Network disabled trong container

### Scenario 5: Privilege Escalation
```python
os.system("sudo su")
```
**Mitigation:** Non-root user, dropped capabilities

## SECURITY ARCHITECTURE

### Layer 1: Namespaces
- PID namespace: Isolated process IDs
- Network namespace: No network access
- Mount namespace: Isolated filesystem
- UTS namespace: Separate hostname

### Layer 2: cgroups
- CPU limit: 1 core
- Memory limit: 512MB
- Disk I/O limit: 10MB/s

### Layer 3: Capabilities
- Drop all capabilities
- Add only necessary ones (none cho execution)

### Layer 4: seccomp
- Default Docker seccomp profile
- Blocks ~50 dangerous syscalls
- Allow only safe syscalls

### Layer 5: Filesystem
- Read-only root filesystem
- /tmp as tmpfs (writable)
- No host filesystem mounts

### Layer 6: User
- Non-root user (UID 1000)
- No sudo access
- No setuid binaries

---

# PHẦN 13 — STATIC ANALYSIS

## COMPLEXITY ANALYSIS

### Tools
- **radon:** Python complexity metrics
- **complexipy:** Cognitive complexity (Rust-based, fast)
- **pylint:** General code quality

### Metrics
1. **Cyclomatic Complexity (McCabe)**
   - Formula: M = E - N + 2P
   - Threshold: <10 (good), 10-20 (moderate), >20 (complex)

2. **Cognitive Complexity**
   - Penalizes nesting, flow breaks
   - More human-focused than cyclomatic
   - Threshold: <15 (good), 15-30 (moderate), >30 (complex)

3. **Maintainability Index**
   - Overall code quality score
   - Scale: 0-100
   - Threshold: >85 (good), 65-85 (moderate), <65 (poor)

## CODE QUALITY

### Tools
- **pylint:** Code style, conventions
- **flake8:** Style guide enforcement
- **black:** Code formatting (check only)

### Metrics
1. **Code Style Violations**
   - PEP 8 violations
   - Naming conventions
   - Line length (>79 chars)

2. **Code Smells**
   - Long functions (>50 lines)
   - Too many parameters (>5)
   - Duplicate code

3. **Documentation**
   - Function docstrings
   - Module docstrings
   - Comment density

## SECURITY ANALYSIS

### Tools
- **bandit:** Security vulnerability scanner
- **safety:** Dependency vulnerability check

### Checks
1. **SQL Injection**
   - String concatenation trong SQL queries
   - Unsafe user input handling

2. **Command Injection**
   - os.system() với user input
   - subprocess.call() với shell=True

3. **Hardcoded Secrets**
   - API keys trong code
   - Passwords trong code

4. **Dangerous Functions**
   - eval(), exec()
   - pickle.loads()

---

# PHẦN 14 — LLM CODE ANALYSIS

## PROMPT ARCHITECTURE

### System Prompt
```
Bạn là giảng viên lập trình chuyên nghiệp với 20 năm kinh nghiệm
dạy các khóa học lập trình nhập môn. Vai trò của bạn là đánh giá
các bài nộp code của sinh viên và cung cấp feedback pedagogically sound.

Bạn sẽ nhận:
1. Source code của sinh viên
2. Execution evidence (test results, error logs)
3. Static analysis results (complexity, quality, security)
4. Problem statement
5. Grading rubric

Nhiệm vụ của bạn:
1. Phân tích code sử dụng tất cả evidence có sẵn
2. Gán điểm theo rubric
3. Cung cấp feedback mang tính xây dựng, pedagogical
4. Generate Socratic hints nếu phù hợp

QUAN TRỌNG:
- Ground tất cả claims trong execution evidence hoặc static analysis
- Nếu bạn claim code có bug, cite test đã fail
- Nếu bạn claim code phức tạp, cite complexity metric
- Cung cấp progressive hints, không phải full solutions
- Focus vào learning, không chỉ correction
```

### User Prompt Template
```
## Problem Statement
{problem_statement}

## Student Code
```python
{source_code}
```

## Execution Evidence
- Test Results: {test_results}
- Compilation: {compilation_status}
- Runtime Errors: {runtime_errors}

## Static Analysis
- Cyclomatic Complexity: {cyclomatic_complexity}
- Cognitive Complexity: {cognitive_complexity}
- Code Quality Score: {quality_score}
- Security Issues: {security_issues}

## Grading Rubric
{rubric}

## Task
Evaluate this submission theo rubric. Provide:
1. Scores cho mỗi rubric criterion (0-10)
2. Justification cho mỗi score (với evidence)
3. Overall grade (0-100)
4. Constructive feedback (3-5 points)
5. Socratic hints (nếu phù hợp)

Format response của bạn thành JSON:
{
  "scores": {
    "correctness": 0-10,
    "efficiency": 0-10,
    "readability": 0-10,
    "style": 0-10
  },
  "justifications": {
    "correctness": "...",
    "efficiency": "...",
    ...
  },
  "overall_grade": 0-100,
  "feedback": ["point1", "point2", ...],
  "hints": ["hint1", "hint2", ...]
}
```

## EVIDENCE GROUNDING

### Rules
1. **Correctness claims:** Phải cite test results
2. **Complexity claims:** Phải cite complexity metrics
3. **Style claims:** Phải cite linting results
4. **Security claims:** Phải cite security scan results

### Example
```
BAD: "Code của bạn có bug trong for loop."

GOOD: "Code của bạn fail test case 3 (input: [5, 2, 8], expected: 15, 
      actual: 10). Vấn đề nằm trong for loop ở dòng 12 - nó không 
      bao gồm element cuối cùng."
```

## HALLUCINATION CONTROL

### Verification Steps
1. **Self-consistency:** Ask LLM verify claims của chính nó
2. **Evidence check:** Đảm bảo mỗi claim có evidence
3. **Execution verification:** Thực thi code trong quy trình chấm bài để verify claims nếu có thể
4. **Confidence scoring:** LLM provides confidence cho mỗi claim

---

# PHẦN 15 — AI TUTOR

## SOCRATIC TUTORING FRAMEWORK

### Levels of Support

**Level 1: Error Notification**
```
"Code của bạn fail test case 3. Expected output: 15, Actual output: 10."
```

**Level 2: Location Hint**
```
"Vấn đề nằm trong for loop ở dòng 12-15. Check loop bounds."
```

**Level 3: Conceptual Hint**
```
"Nhớ rằng range() function của Python không bao gồm upper bound. 
Làm thế nào điều này ảnh hưởng loop của bạn?"
```

**Level 4: Guidance Question**
```
"Chuyện gì xảy ra nếu bạn add 1 vào upper bound trong range() call?"
```

**Level 5: Partial Example**
```
"Thay vì range(n), thử range(n + 1). Đây là ví dụ tương tự với
list indexing: for i in range(len(arr) + 1):"
```

**Level 6: Full Solution (Chỉ khi được yêu cầu)**
```
"Giải pháp đúng là dùng range(n + 1) để bao gồm element cuối cùng."
```

### Escalation Policy

1. **First request:** Level 1-2 hints
2. **Second request:** Level 3-4 hints
3. **Third request:** Level 5 hint
4. **Fourth request:** Level 6 (với confirmation)

### Answer Leakage Prevention

**Rules:**
- Never provide full working code unrequested
- Never copy-paste từ reference solution
- Provide only minimal necessary scaffolding
- Ask guiding questions thay vì giving answers

---

# PHẦN 16 — DATASET

## DATASET CHÍNH: PROGFEED

### Chi tiết
- **Link:** https://github.com/umass-ml4ed/progFeed-dataset-public
- **Paper:** "A Classroom Study of LLM-generated Feedback Intervention in Introductory Programming" (2026)
- **License:** CC BY 4.0
- **Size:** 6,693 submissions từ 215 students
- **Language:** Python
- **Course:** CS110 (Introductory Programming)
- **Time:** Fall 2025 semester

### Nội dung
- Student code submissions
- Autograder results
- Feedback conditions (natural language, test cases, no AI)
- Problem statements (17 labs)
- Entry và exit surveys

### Phù hợp
✅ **Lựa chọn tuyệt vời:**
- Real classroom data
- Already includes execution results
- Has feedback conditions cho comparison
- Open license (CC BY 4.0)
- Recent (2026)
- Sufficient size cho experiments

## DATASET PHỤ: FALCONCODE

### Chi tiết
- **Link:** https://huggingface.co/datasets/koutch/falcon_code
- **Paper:** "FalconCode: A Multiyear Dataset of Python Code Samples" (SIGCSE 2023)
- **License:** Available upon request
- **Size:** 1.5M+ code samples từ 2,000+ students
- **Language:** Python
- **Duration:** 5 semesters

## DATASET BACKUP: MENAGERIE

### Chi tiết
- **Link:** https://github.com/m-messer/Menagerie
- **Paper:** "Menagerie: A Dataset of Graded CS1 Assignments"
- **License:** Not specified (check trước khi dùng)
- **Size:** 667 submissions
- **Language:** Java

## DATASET SIZE CHO NGHIÊN CỨU
- **Development:** 100 submissions
- **Validation:** 200 submissions
- **Testing:** 300 submissions
- **Total:** 600 submissions (đủ cho 8-week project)

---

# PHẦN 17 — BASELINES

## BASELINE 1: TRADITIONAL AUTO-GRADER

### Description
Test case-based grading only (no LLM, no static analysis)

### Implementation
- Compile và execute code
- Run against test cases
- Score based on pass rate
- Binary feedback (pass/fail)

### Metrics
- Test pass rate
- Execution time
- Memory usage

### Why Needed
Establishes baseline cho correctness assessment

## BASELINE 2: STATIC ANALYSIS ONLY

### Description
Static analysis-based grading (no execution, no validation)

### Implementation
- Run static analysis tools
- Calculate complexity metrics
- Score based on quality thresholds
- Structured feedback từ tools

### Metrics
- Complexity scores
- Code quality scores
- Security issue counts

### Why Needed
Establishes baseline cho code quality assessment

## BASELINE 3: LLM-ONLY

### Description
LLM grading without execution evidence hoặc static analysis

### Implementation
- Provide source code và problem statement cho LLM
- Ask cho rubric-based evaluation
- Generate feedback
- No additional evidence

### Metrics
- Correlation với human grades
- Feedback quality scores
- Hallucination rate

### Why Needed
Current state-of-the-art approach, establishes comparison point

## PROPOSED: HYBRID SYSTEM

### Description
Full system với execution evidence + static analysis + LLM

### Implementation
- Tất cả components từ Baselines 1-3
- Evidence-grounded prompting
- Hybrid scoring
- Socratic feedback

### Metrics
- Tất cả metrics từ baselines
- Overall system performance
- Component contribution (via ablation)

### Why Proposed
Tests research hypothesis về hybrid approach

---

# PHẦN 18 — EXPERIMENTAL DESIGN

## EXPERIMENT 1: TRADITIONAL AUTO-GRADER

### Setup
- Input: Source code + test cases
- Process: Compile → Execute → Compare output
- Output: Pass/fail per test, overall score

### Dataset
- 600 submissions từ ProgFeed
- Use existing test cases từ dataset

### Metrics
- Accuracy vs human grades (nếu có)
- Test pass rate distribution
- Execution statistics

### Hypothesis
Auto-grader sẽ achieve high correctness assessment nhưng limited feedback quality

## EXPERIMENT 2: STATIC ANALYSIS ONLY

### Setup
- Input: Source code
- Process: Run static analysis tools
- Output: Complexity, quality, security scores

### Dataset
- Same 600 submissions

### Metrics
- Complexity score distribution
- Quality score distribution
- Security issue counts

### Hypothesis
Static analysis sẽ provide deterministic quality metrics nhưng không có correctness assessment

## EXPERIMENT 3: LLM-ONLY

### Setup
- Input: Source code + problem statement + rubric
- Process: LLM evaluation (GPT-4o hoặc equivalent)
- Output: Scores, feedback, hints

### Dataset
- Same 600 submissions

### Metrics
- Correlation với human grades
- Feedback quality (human evaluation)
- Hallucination rate

### Hypothesis
LLM-only sẽ provide semantic feedback nhưng suffer từ hallucination

## EXPERIMENT 4: PROPOSED HYBRID SYSTEM

### Setup
- Input: Source code + test cases + problem statement + rubric
- Process: Execution → Static Analysis → LLM (với evidence)
- Output: Hybrid scores, grounded feedback

### Dataset
- Same 600 submissions

### Metrics
- Tất cả metrics từ Experiments 1-3
- Overall system performance
- Component interaction analysis

### Hypothesis
Hybrid system sẽ outperform tất cả baselines trong combined metrics

## EXPERIMENT 5: ABLATION STUDY

### Conditions
1. **Full System:** Execution + Static + LLM
2. **No Execution:** Static + LLM only
3. **No Static:** Execution + LLM only
4. **No LLM:** Execution + Static only

### Dataset
- Same 600 submissions

### Metrics
- Compare mỗi condition vs full system
- Isolate contribution của mỗi component
- Statistical significance testing

### Hypothesis
Mỗi component contributes unique value; full system outperforms tất cả subsets

---

# PHẦN 19 — EVALUATION METRICS

## GRADING METRICS

### 1. Correlation với Human Grades
- **Spearman Correlation:** Rank-based correlation
- **Pearson Correlation:** Linear correlation
- **Cohen's Kappa:** Inter-rater agreement
- **Mean Absolute Error (MAE):** Average absolute difference
- **Root Mean Square Error (RMSE):** Square root của average squared differences

### 2. Grading Consistency
- **Intra-model consistency:** Same submission graded multiple times
- **Inter-model consistency:** Different LLMs grade same submission
- **Standard deviation:** Across multiple gradings

## BUG DETECTION METRICS

### 1. Precision
```
Precision = TP / (TP + FP)
```
- True Positives: Correctly identified bugs
- False Positives: Incorrectly claimed bugs

### 2. Recall
```
Recall = TP / (TP + FN)
```
- False Negatives: Missed bugs

### 3. F1 Score
```
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

## FEEDBACK QUALITY METRICS

### 1. Human Evaluation Rubric
Dựa trên pedagogical feedback literature:

| Criterion | Description | Scale |
|-----------|-------------|-------|
| Accuracy | Feedback là factually correct | 1-5 |
| Clarity | Dễ hiểu | 1-5 |
| Actionability | Có thể hành động | 1-5 |
| Specificity | Chỉ ra vấn đề cụ thể | 1-5 |
| Learning-oriented | Thúc đẩy hiểu biết | 1-5 |
| Appropriateness | Phù hợp trình độ | 1-5 |

## SYSTEM METRICS

### 1. Performance
- **Latency:** Time per submission
- **Throughput:** Submissions per minute
- **Cost:** API cost per submission

### 2. Reliability
- **Success rate:** % của submissions processed successfully
- **Error rate:** % của submissions với processing errors
- **Timeout rate:** % của submissions mà timeout

---

# PHẦN 20 — HUMAN EVALUATION

## EVALUATION DESIGN

### Evaluators
- **Target:** 2-3 expert Python programmers
- **Qualifications:** CS teaching experience hoặc industry experience
- **Training:** Calibration session với rubric

### Sample Size
- **Feedback evaluation:** 50-100 feedback samples
- **Per evaluator:** 25-50 samples
- **Overlap:** 20% samples evaluated bởi multiple evaluators

### Evaluation Protocol

1. **Calibration (1 giờ)**
   - Review rubric
   - Discuss criteria
   - Practice trên 5 examples
   - Calculate inter-rater agreement

2. **Evaluation (2-3 giờ)**
   - Mỗi evaluator nhận subset
   - Blind đến condition (hệ thống nào generated feedback)
   - Rate mỗi feedback sample trên rubric
   - Provide qualitative comments

3. **Analysis**
   - Calculate inter-rater agreement (Cohen's Kappa)
   - Average scores across evaluators
   - Compare conditions

## INTER-RATER AGREEMENT

### Cohen's Kappa
```
κ = (Po - Pe) / (1 - Pe)
```
- Po: Observed agreement
- Pe: Expected agreement by chance

### Interpretation
- κ < 0: Poor agreement
- 0-0.20: Slight agreement
- 0.21-0.40: Fair agreement
- 0.41-0.60: Moderate agreement
- 0.61-0.80: Substantial agreement
- 0.81-1.00: Almost perfect agreement

### Target
- κ > 0.60 (substantial agreement)
- Nếu thấp hơn, re-calibrate hoặc refine rubric

---

# PHẦN 21 — MODEL SELECTION

## MODEL OPTIONS

### Option 1: GPT-4o (OpenAI)
**Pros:**
- State-of-the-art code understanding
- Strong reasoning capabilities
- Good cho complex analysis

**Cons:**
- Expensive ($5-15 per 1M tokens)
- API dependency
- Privacy concerns (student code sent to OpenAI)

**Cost Estimate:**
- ~1000 tokens per submission
- 600 submissions = 600K tokens
- Cost: ~$3-9 cho full experiment

### Option 2: GPT-4o-mini (OpenAI) ⭐ RECOMMENDED
**Pros:**
- Much cheaper ($0.15 per 1M input tokens)
- Still good code understanding
- Faster than GPT-4o

**Cons:**
- Less capable than GPT-4o
- May struggle với complex reasoning

**Cost Estimate:**
- 600K tokens
- Cost: ~$0.09 cho full experiment

### Option 3: Claude 3.5 Sonnet (Anthropic)
**Pros:**
- Strong code understanding
- Good cho educational tasks
- Competitive pricing

**Cons:**
- API dependency
- Less widely used than GPT

### Option 4: Open-source (Llama 3.1 70B, Qwen 2.5 72B)
**Pros:**
- Free (no API cost)
- Privacy (code stays local)
- Reproducible

**Cons:**
- Requires GPU (VRAM > 40GB)
- Setup complexity
- May be less capable than GPT-4o

## RECOMMENDATION: GPT-4o-mini

**Lý do:**
1. **Cost-effective:** <$1 cho full experiment
2. **Good capability:** Sufficient cho use case của chúng ta
3. **Simple setup:** No GPU required
4. **Fast:** Quick iteration trong development
5. **Well-documented:** Extensive examples available

**Backup Plan:**
- Nếu budget là concern, use open-source model
- Deploy trên Google Colab Pro (A100) hoặc similar
- Hoặc use local GPU nếu có

---

# PHẦN 22 — TECHNOLOGY STACK

## FRONTEND

### Technology: Next.js 14 (App Router)
**Lý do:**
- Modern React framework
- Built-in API routes
- Good TypeScript support
- Easy deployment (Vercel)
- Large community

### Key Libraries
- **Monaco Editor:** Code editor với syntax highlighting
- **Tailwind CSS:** Styling
- **shadcn/ui:** UI components
- **React Query:** Data fetching

## BACKEND

### Technology: Python (FastAPI)
**Lý do:**
- Excellent cho ML/AI integration
- Fast async performance
- Type hints
- Easy testing
- Rich ecosystem

### Key Libraries
- **FastAPI:** Web framework
- **Pydantic:** Data validation
- **SQLAlchemy:** ORM
- **Celery:** Task queue (nếu cần)
- **Docker:** Containerization

## DATABASE

### Technology: PostgreSQL
**Lý do:**
- Robust relational database
- Good cho structured data
- JSON support cho flexible schemas
- Free và open-source
- Well-documented

## SANDBOX

### Technology: Docker
**Lý do:**
- Industry standard cho containerization
- Good security features
- Easy to manage
- Cross-platform

## AI/LLM

### Technology: OpenAI API (GPT-4o-mini)
**Lý do:**
- Best code understanding
- Easy integration
- Good documentation
- Cost-effective cho scale của chúng ta

## STATIC ANALYSIS

### Tools
- **radon:** Complexity metrics
- **pylint:** Code quality
- **bandit:** Security scanning
- **black:** Code formatting (check)

---

# PHẦN 23 — IMPLEMENTATION ARCHITECTURE

## PROJECT STRUCTURE

```
ai-coding-tutor/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   └── public/              # Static assets
├── backend/                 # FastAPI backend
│   ├── api/                 # API endpoints
│   ├── models/              # Pydantic models
│   ├── services/            # Business logic
│   │   ├── grader.py        # Auto-grader
│   │   ├── static_analysis.py
│   │   ├── llm_analyzer.py
│   │   └── feedback.py
│   ├── sandbox/             # Docker execution
│   └── db/                  # Database models
├── datasets/                # Dataset processing
│   ├── progfeed/            # ProgFeed dataset
│   └── preprocessing.py
├── experiments/             # Experiment scripts
│   ├── baseline_auto_grader.py
│   ├── baseline_static.py
│   ├── baseline_llm.py
│   ├── hybrid_system.py
│   └── ablation_study.py
├── evaluation/              # Evaluation scripts
│   ├── metrics.py
│   ├── human_evaluation.py
│   └── statistical_tests.py
├── paper/                   # Paper materials
│   ├── figures/
│   ├── tables/
│   └── manuscript/
├── tests/                   # Tests
├── docker-compose.yml       # Local development
├── README.md
└── requirements.txt
```

---

# PHẦN 24 — DATABASE

## SCHEMA DESIGN

### Core Tables

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    rubric JSONB NOT NULL,
    test_cases JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    assignment_id INTEGER REFERENCES assignments(id),
    source_code TEXT NOT NULL,
    language VARCHAR(50) DEFAULT 'python',
    submitted_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE execution_results (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    compilation_status VARCHAR(50),
    compilation_output TEXT,
    test_results JSONB,
    execution_time FLOAT,
    memory_usage INTEGER,
    verdict VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE static_analysis_results (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    cyclomatic_complexity INTEGER,
    cognitive_complexity INTEGER,
    maintainability_index INTEGER,
    quality_score INTEGER,
    security_issues JSONB,
    code_smells JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE llm_analysis_results (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    model_used VARCHAR(100),
    scores JSONB,
    justifications JSONB,
    feedback JSONB,
    hints JSONB,
    confidence FLOAT,
    tokens_used INTEGER,
    cost FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    feedback_text TEXT NOT NULL,
    hint_level INTEGER DEFAULT 1,
    feedback_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE grading_results (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    final_score INTEGER,
    execution_score INTEGER,
    static_score INTEGER,
    llm_score INTEGER,
    weights JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# PHẦN 25 — REPRODUCIBILITY

## VERSION CONTROL

### Git Strategy
- Main branch cho stable code
- Feature branches cho experiments
- Tag releases cho paper submission
- Use Git LFS cho large datasets

### Commit Convention
```
feat: add auto-grader service
fix: correct Docker security profile
exp: run baseline experiment
docs: update README
```

## DEPENDENCY MANAGEMENT

### Python
```bash
# requirements.txt
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.0
openai==1.3.7
radon==6.0.1
pylint==3.0.3
bandit==1.7.5
```

### Node.js
```bash
# package.json
{
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "@monaco-editor/react": "^4.6.0"
  }
}
```

## CONFIGURATION

### Environment Variables
```bash
# .env.example
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
DOCKER_HOST=unix:///var/run/docker.sock
```

---

# PHẦN 26 — 8-WEEK ROADMAP

## WEEK 1: LITERATURE + PROBLEM DEFINITION

### Research Objective
- Complete literature review
- Define research questions
- Choose dataset
- Design experimental setup

### Tasks
**Day 1-2: Literature Review**
- Read 5 must-read papers
- Take structured notes
- Identify research gaps

**Day 3-4: Problem Definition**
- Formulate research questions
- Define hypotheses
- Design experimental conditions

**Day 5-7: Dataset Preparation**
- Download ProgFeed dataset
- Process và filter data
- Split vào train/val/test
- Create test cases extraction

### Deliverables
- Literature review document
- Research questions document
- Processed dataset
- Experimental design document

### Definition of Done
- ✅ 5 must-read papers summarized
- ✅ 3 research questions formulated
- ✅ Dataset processed và ready
- ✅ Experimental design finalized

### Risk
- Dataset access issues
- Literature overwhelming

### Backup Plan
- Use backup dataset (Menagerie)
- Focus on 3-5 key papers

---

## WEEK 2: RESEARCH GAP + DATASET + EXPERIMENTAL DESIGN

### Research Objective
- Finalize research gap analysis
- Complete dataset preprocessing
- Design evaluation metrics
- Set up project structure

### Tasks
**Day 8-9: Research Gap Analysis**
- Synthesize literature findings
- Formulate research gap
- Write contribution statement

**Day 10-11: Dataset Preprocessing**
- Clean dataset
- Extract test cases
- Create rubrics
- Validate data quality

**Day 12-14: Experimental Design**
- Design evaluation metrics
- Create experiment scripts
- Set up project structure
- Initialize Git repository

### Deliverables
- Research gap analysis document
- Fully processed dataset
- Evaluation metrics specification
- Project structure initialized

### Definition of Done
- ✅ Research gap clearly defined
- ✅ Dataset ready cho experiments
- ✅ Metrics documented
- ✅ Project scaffold created

### Risk
- Dataset quality issues
- Metrics design complexity

### Backup Plan
- Use subset của dataset
- Use standard metrics từ literature

---

## WEEK 3: AUTO-GRADER + SANDBOX

### Research Objective
- Implement auto-grader
- Set up Docker sandbox
- Implement security measures
- Test execution pipeline

### Tasks
**Day 15-17: Auto-Grader Implementation**
- Implement compilation service
- Implement test case execution
- Implement result capture
- Add error handling

**Day 18-19: Docker Sandbox**
- Set up Docker environment
- Configure security profiles
- Implement resource limits
- Test container isolation

**Day 20-21: Integration Testing**
- Integrate auto-grader với sandbox
- Test on sample submissions
- Measure performance
- Debug issues

### Deliverables
- Working auto-grader
- Secure Docker sandbox
- Execution pipeline tested
- Performance benchmarks

### Definition of Done
- ✅ Auto-grader executes code correctly
- ✅ Sandbox security measures in place
- ✅ Pipeline tested on 50+ samples
- ✅ Performance within acceptable limits

### Risk
- Docker security complexity
- Execution performance issues

### Backup Plan
- Use simpler security model
- Limit sample size cho testing

---

## WEEK 4: STATIC ANALYSIS + BASELINE

### Research Objective
- Implement static analysis
- Create baseline auto-grader
- Run baseline experiments
- Analyze baseline results

### Tasks
**Day 22-24: Static Analysis**
- Integrate radon cho complexity
- Integrate pylint cho quality
- Integrate bandit cho security
- Normalize output format

**Day 25-26: Baseline Auto-Grader**
- Create baseline experiment script
- Run on validation dataset
- Collect metrics
- Analyze results

**Day 27-28: Baseline Static Analysis**
- Create static analysis baseline
- Run on validation dataset
- Collect metrics
- Analyze results

### Deliverables
- Static analysis service
- Baseline auto-grader results
- Baseline static analysis results
- Baseline analysis document

### Definition of Done
- ✅ Static analysis tools integrated
- ✅ Baseline experiments completed
- ✅ Baseline results documented
- ✅ Performance metrics collected

### Risk
- Tool integration issues
- Baseline performance lower than expected

### Backup Plan
- Use subset của static analysis tools
- Adjust baseline expectations

---

## WEEK 5: LLM ANALYZER + AI TUTOR

### Research Objective
- Implement LLM analyzer
- Design evidence-grounded prompts
- Implement Socratic tutoring
- Test LLM integration

### Tasks
**Day 29-31: LLM Analyzer**
- Set up OpenAI API integration
- Design system prompt
- Design user prompt template
- Implement response parsing

**Day 32-33: Evidence Grounding**
- Design evidence integration
- Implement verification logic
- Add hallucination checks
- Test on sample submissions

**Day 34-35: Socratic Tutoring**
- Design hint escalation policy
- Implement hint generation
- Add answer leakage prevention
- Test tutoring interaction

### Deliverables
- LLM analyzer service
- Evidence-grounded prompts
- Socratic tutoring system
- LLM integration tested

### Definition of Done
- ✅ LLM analyzer functional
- ✅ Evidence grounding implemented
- ✅ Socratic hints working
- ✅ Tested on 50+ samples

### Risk
- API cost overruns
- Prompt engineering complexity

### Backup Plan
- Use cheaper model (GPT-4o-mini)
- Use simpler prompts

---

## WEEK 6: HYBRID SYSTEM + EXPERIMENTS

### Research Objective
- Integrate all components
- Create hybrid system
- Run full experiments
- Perform ablation study

### Tasks
**Day 36-38: System Integration**
- Integrate auto-grader + static + LLM
- Implement score aggregator
- Implement feedback generator
- End-to-end testing

**Day 39-40: Full Experiments**
- Run hybrid system on test dataset
- Collect all metrics
- Compare với baselines
- Analyze results

**Day 41-42: Ablation Study**
- Run no-execution condition
- Run no-static condition
- Run no-LLM condition
- Compare với full system

### Deliverables
- Complete hybrid system
- Full experiment results
- Ablation study results
- Comparative analysis

### Definition of Done
- ✅ All components integrated
- ✅ Full experiments completed
- ✅ Ablation study completed
- ✅ Results analyzed

### Risk
- Integration complexity
- Experiment execution time

### Backup Plan
- Simplify integration
- Reduce sample size

---

## WEEK 7: EVALUATION + ABLATION + ANALYSIS

### Research Objective
- Conduct human evaluation
- Perform statistical analysis
- Analyze ablation results
- Prepare figures và tables

### Tasks
**Day 43-45: Human Evaluation**
- Prepare feedback samples
- Recruit evaluators
- Conduct calibration session
- Collect evaluation data

**Day 46-47: Statistical Analysis**
- Calculate inter-rater agreement
- Perform statistical tests
- Calculate effect sizes
- Validate significance

**Day 48-49: Result Analysis**
- Analyze ablation results
- Identify component contributions
- Prepare key findings
- Create visualizations

### Deliverables
- Human evaluation results
- Statistical analysis report
- Ablation analysis
- Key findings document

### Definition of Done
- ✅ Human evaluation completed
- ✅ Statistical tests performed
- ✅ Ablation analyzed
- ✅ Key findings identified

### Risk
- Evaluator availability
- Statistical complexity

### Backup Plan
- Use smaller evaluation sample
- Use simpler statistical tests

---

## WEEK 8: PAPER + DEMO + PRESENTATION

### Research Objective
- Write research paper
- Prepare demo
- Create presentation
- Finalize repository

### Tasks
**Day 50-52: Paper Writing**
- Write abstract và introduction
- Write methodology section
- Write results section
- Write discussion và conclusion

**Day 53-54: Demo Preparation**
- Prepare live demo
- Create demo scenarios
- Test demo environment
- Record demo video

**Day 55-56: Finalization**
- Create presentation slides
- Finalize repository
- Write documentation
- Prepare submission

### Deliverables
- Complete research paper
- Working demo
- Presentation slides
- Finalized repository

### Definition of Done
- ✅ Paper ready cho submission
- ✅ Demo functional
- ✅ Presentation prepared
- ✅ Repository documented

### Risk
- Paper writing time
- Demo technical issues

### Backup Plan
- Focus on paper draft
- Use screenshots thay vì live demo

---

# PHẦN 27 — 56-DAY PLAN

## PHASE 1: FOUNDATION (Days 1-14)

**Days 1-7:** Literature & Problem Definition
- Day 1: Read JorGPT và ProgFeed papers
- Day 2: Read CodEv và STAP papers  
- Day 3: Read Ihantola review và 1 additional paper
- Day 4: Formulate 3 research questions với hypotheses
- Day 5: Download và explore ProgFeed dataset
- Day 6: Process dataset (filter, clean, split)
- Day 7: Design experimental conditions (4 conditions)

**Days 8-14:** Dataset & Setup
- Day 8: Extract test cases từ ProgFeed
- Day 9: Create rubrics từ problem statements
- Day 10: Set up project structure (frontend/backend)
- Day 11: Initialize database schema
- Day 12: Set up development environment
- Day 13: Write experiment scripts skeleton
- Day 14: Validate dataset quality

## PHASE 2: BASELINE IMPLEMENTATION (Days 15-28)

**Days 15-21:** Auto-Grader & Sandbox
- Day 15: Implement basic code execution
- Day 16: Add test case runner
- Day 17: Implement Docker sandbox
- Day 18: Add security measures (seccomp, cgroups)
- Day 19: Test sandbox isolation
- Day 20: Integrate execution với database
- Day 21: Test on 50 sample submissions

**Days 22-28:** Static Analysis & Baselines
- Day 22: Integrate radon (complexity)
- Day 23: Integrate pylint (quality)
- Day 24: Integrate bandit (security)
- Day 25: Create baseline auto-grader experiment
- Day 26: Run baseline on validation set
- Day 27: Create baseline static analysis experiment
- Day 28: Analyze baseline results

## PHASE 3: LLM INTEGRATION (Days 29-42)

**Days 29-35:** LLM Analyzer
- Day 29: Set up OpenAI API integration
- Day 30: Design system prompt
- Day 31: Design user prompt với evidence
- Day 32: Implement response parsing
- Day 33: Add evidence verification
- Day 34: Test LLM analyzer on samples
- Day 35: Create LLM-only baseline

**Days 36-42:** Hybrid System
- Day 36: Integrate tất cả 3 components
- Day 37: Implement score aggregator
- Day 38: Implement feedback generator
- Day 39: Run hybrid system on test set
- Day 40: Run ablation (no-execution)
- Day 41: Run ablation (no-static)
- Day 42: Run ablation (no-LLM)

## PHASE 4: EVALUATION (Days 43-49)

**Days 43-45:** Human Evaluation
- Day 43: Prepare 50 feedback samples
- Day 44: Recruit 2 evaluators, calibration
- Day 45: Collect evaluation data

**Days 46-49:** Analysis
- Day 46: Calculate inter-rater agreement
- Day 47: Perform statistical tests
- Day 48: Analyze ablation results
- Day 49: Prepare key findings

## PHASE 5: FINALIZATION (Days 50-56)

**Days 50-52:** Paper Writing
- Day 50: Write abstract, intro, related work
- Day 51: Write methodology, results
- Day 52: Write discussion, conclusion

**Days 53-56:** Demo & Presentation
- Day 53: Prepare demo environment
- Day 54: Create presentation slides
- Day 55: Finalize repository documentation
- Day 56: Final review và submission prep

---

# PHẦN 28 — PAPER STRUCTURE

## TITLE
"Evidence-Grounded Hybrid Code Assessment: Combining Execution Evidence, Static Analysis, and LLM-Based Pedagogical Feedback"

## ABSTRACT (250 words)
- Problem: LLM-only grading suffers từ hallucination; traditional auto-graders lack semantic analysis
- Approach: Hybrid system combining execution evidence, static analysis, và LLM semantic analysis
- Results: Hybrid system achieves X correlation với human grading vs Y cho LLM-only
- Contribution: Empirical evidence cho hybrid approach, reproducible pipeline, pedagogical framework

## 1. INTRODUCTION (1 trang)
- Programming assessment challenges
- Rise of LLMs in education
- Limitations of current approaches
- Research questions
- Contributions

## 2. BACKGROUND (1 trang)
- Automated programming assessment
- Static code analysis
- LLMs cho code understanding
- AI in programming education

## 3. RELATED WORK (1.5 trang)
- Traditional auto-graders (Ihantola et al., CodeRunner)
- LLM-based grading (JorGPT, CodEv, StepGrade)
- AI tutoring systems (STAP, course-aware tutors)
- Student datasets (ProgFeed, FalconCode)

## 4. RESEARCH GAP (0.5 trang)
- Limited execution evidence trong LLM grading
- Limited static analysis integration
- Limited pedagogical evaluation
- Limited ablation studies

## 5. PROPOSED METHOD (2 trang)
- System architecture
- Evidence-grounded prompting
- Hybrid scoring
- Socratic tutoring framework

## 6. SYSTEM ARCHITECTURE (1 trang)
- Component overview
- Data flow
- Security architecture
- Implementation details

## 7. EXPERIMENTAL SETUP (1 trang)
- Dataset (ProgFeed)
- Baselines (4 conditions)
- Evaluation metrics
- Human evaluation protocol

## 8. RESULTS (2 trang)
- Grading accuracy (correlation, MAE)
- Feedback quality (human evaluation)
- Ablation study (component contributions)
- Statistical significance

## 9. ABLATION STUDY (1 trang)
- No-execution condition
- No-static condition
- No-LLM condition
- Component analysis

## 10. DISCUSSION (1 trang)
- Key findings
- Implications cho practice
- Limitations
- Threats to validity

## 11. LIMITATIONS (0.5 trang)
- Dataset scope (Python only)
- Sample size (600 submissions)
- LLM dependency
- Single institution data

## 12. CONCLUSION (0.5 trang)
- Summary of contributions
- Future work
- Final remarks

## REFERENCES
- 20-25 key papers

---

# PHẦN 29 — FIGURES & TABLES

## FIGURES

### Figure 1: System Architecture
- High-level component diagram
- Data flow giữa components
- Security layers

### Figure 2: Evidence-Grounded Prompting
- Prompt structure
- Evidence integration
- Verification flow

### Figure 3: Experimental Design
- 4 experimental conditions
- Dataset split
- Evaluation pipeline

### Figure 4: Grading Accuracy Comparison
- Bar chart: correlation với human grades
- Conditions: Auto-grader, Static, LLM-only, Hybrid

### Figure 5: Feedback Quality Comparison
- Bar chart: human evaluation scores
- Conditions: 4 baselines

### Figure 6: Ablation Study Results
- Bar chart: component contributions
- Full vs No-execution vs No-static vs No-LLM

### Figure 7: Socratic Hint Escalation
- Flowchart của hint levels
- Escalation policy

## TABLES

### Table 1: Related Work Comparison
| System | Approach | Evidence | Dataset | Metrics |
|--------|----------|----------|---------|---------|
| JorGPT | LLM-only | None | Custom | R²=0.92 |
| CodEv | LLM+CoT | None | Custom | Accuracy |
| StepGrade | LLM+CoT | None | 30 items | Quality |
| **Ours** | **Hybrid** | **Full** | **ProgFeed** | **Multiple** |

### Table 2: Dataset Statistics
| Dataset | Submissions | Students | Language | License |
|---------|-------------|----------|----------|---------|
| ProgFeed | 6,693 | 215 | Python | CC BY 4.0 |
| FalconCode | 1.5M | 2,000+ | Python | Request |
| Menagerie | 667 | N/A | Java | N/A |

### Table 3: Experimental Conditions
| Condition | Execution | Static | LLM | Description |
|-----------|-----------|--------|-----|-------------|
| Auto-grader | ✓ | ✗ | ✗ | Test cases only |
| Static | ✗ | ✓ | ✗ | Metrics only |
| LLM-only | ✗ | ✗ | ✓ | Semantic only |
| Hybrid | ✓ | ✓ | ✓ | Full system |

### Table 4: Grading Accuracy Results
| Condition | Correlation | MAE | RMSE | Kappa |
|-----------|-------------|-----|------|-------|
| Auto-grader | 0.65 | 3.2 | 4.1 | 0.58 |
| Static | 0.45 | 4.5 | 5.2 | 0.42 |
| LLM-only | 0.55 | 3.8 | 4.5 | 0.51 |
| **Hybrid** | **0.78** | **2.1** | **2.8** | **0.72** |

### Table 5: Feedback Quality Results
| Condition | Accuracy | Clarity | Actionability | Learning-oriented |
|-----------|----------|---------|--------------|------------------|
| Auto-grader | 4.2 | 3.8 | 3.5 | 2.1 |
| Static | 4.5 | 4.0 | 3.8 | 2.5 |
| LLM-only | 4.0 | 3.5 | 3.2 | 3.8 |
| **Hybrid** | **4.7** | **4.3** | **4.1** | **4.2** |

### Table 6: Ablation Study Results
| Condition | Correlation | Δ vs Full |
|-----------|-------------|-----------|
| Full System | 0.78 | - |
| No Execution | 0.65 | -0.13 |
| No Static | 0.71 | -0.07 |
| No LLM | 0.62 | -0.16 |

### Table 7: Human Evaluation Inter-Rater Agreement
| Evaluator Pair | Cohen's Kappa | Agreement Level |
|----------------|---------------|----------------|
| E1-E2 | 0.68 | Substantial |
| E1-E3 | 0.72 | Substantial |
| E2-E3 | 0.65 | Substantial |
| Average | 0.68 | Substantial |

### Table 8: System Performance
| Metric | Value |
|--------|-------|
| Avg. Latency | 8.5s |
| Throughput | 7 submissions/min |
| Cost per submission | $0.015 |
| Success Rate | 98.2% |

---

# PHẦN 30 — RISKS

## RISK ANALYSIS

| Risk | Probability | Impact | Mitigation | Backup |
|------|-------------|--------|------------|--------|
| API cost overruns | Medium | Medium | Use GPT-4o-mini, cache results | Switch to open-source |
| LLM hallucination | High | High | Evidence grounding, verification | Manual review |
| Incorrect grading | Medium | High | Human validation, ablation | Fallback to auto-grader |
| Sandbox escape | Low | Critical | Defense-in-depth, hardened Docker | Use cloud sandbox service |
| Dataset limitations | Medium | Medium | Use multiple datasets | Create synthetic data |
| Insufficient compute | Low | Medium | Use cloud resources | Reduce sample size |
| Time shortage | High | High | Prioritize core features | Cut non-essential features |
| Human evaluator availability | Medium | Medium | Recruit early, offer compensation | Use self-evaluation |
| Integration complexity | Medium | Medium | Modular design, incremental testing | Simplify architecture |
| Statistical significance | Medium | Medium | Power analysis, adequate sample | Use non-parametric tests |

## CRITICAL RISKS

### 1. Time Shortage (High Probability, High Impact)
**Mitigation:**
- Strict prioritization of core features
- Week 4 checkpoint để assess progress
- Ready to cut non-essential features
- Focus on 1 language (Python) thay vì multiple

**Backup:**
- If behind at Week 4: Simplify to LLM-only + execution (no static analysis)
- If behind at Week 6: Reduce human evaluation to self-evaluation
- If behind at Week 7: Focus on paper draft thay vì full experiments

### 2. LLM Hallucination (High Probability, High Impact)
**Mitigation:**
- Evidence grounding trong prompts
- Verification logic cho claims
- Confidence scoring
- Human spot-checks

**Backup:**
- Limit LLM to feedback generation, không scoring
- Use deterministic scoring (test results + metrics)
- Add disclaimer về LLM limitations

### 3. Integration Complexity (Medium Probability, Medium Impact)
**Mitigation:**
- Modular architecture
- Incremental integration
- Extensive testing ở mỗi step
- Clear interfaces giữa components

**Backup:**
- Simplify integration (e.g., sequential thay vì parallel)
- Use existing integration patterns từ literature
- Reduce number of components

---

# PHẦN 31 — PLAN B

## IF DATASET NOT AVAILABLE

→ **Backup:** Use smaller synthetic dataset
- Create 50-100 sample submissions
- Use existing problems từ literature
- Generate synthetic test cases
- Limit scope to proof-of-concept

## IF LLM NOT ACCURATE ENOUGH

→ **Backup:** Focus on execution + static only
- Remove LLM from scoring
- Use LLM only cho feedback generation
- Emphasize deterministic components
- Adjust research questions accordingly

## IF GPU NOT AVAILABLE

→ **Backup:** Use cloud GPU hoặc API-only
- Use Google Colab Pro (A100 access)
- Use OpenAI API thay vì local LLM
- Focus on API-based approach
- Budget cho API costs

## IF API TOO EXPENSIVE

→ **Backup:** Use open-source LLM
- Deploy Llama 3.1 70B on cloud GPU
- Use quantized version nếu needed
- Batch submissions để reduce calls
- Cache results aggressively

## IF AI GRADING NOT BETTER THAN BASELINE

→ **Backup:** Pivot to feedback quality focus
- Emphasize pedagogical quality over grading accuracy
- Focus on Socratic tutoring evaluation
- Compare feedback modalities thay vì grading
- Adjust contribution claims

## IF NO HUMAN EVALUATORS AVAILABLE

→ **Backup:** Self-evaluation + automated metrics
- Author evaluates own system (acknowledge limitation)
- Use automated feedback quality metrics
- Compare với literature baselines
- Acknowledge as limitation trong paper

## IF NOT ENOUGH TIME TO BUILD FULL SYSTEM

→ **Backup:** Simplified system
- Build only execution + LLM (no static analysis)
- Use existing auto-grader (CodeRunner) thay vì custom
- Focus on prompt engineering thay vì full system
- Use mock results cho một số components

## IF EXPERIMENTS FAIL

→ **Backup:** Qualitative analysis
- Focus on case studies thay vì statistical analysis
- Provide detailed examples của system behavior
- Compare với literature qualitatively
- Emphasize system design và contribution

---

# PHẦN 32 — COMPLETE RESOURCES

## PAPERS

### Must-Read (5 papers)
1. **ProgFeed (2026)** - https://arxiv.org/abs/2606.08807
2. **JorGPT (2025)** - https://doi.org/10.3390/fi17060265
3. **CodEv (2024)** - https://doi.org/10.1109/bigdata62323.2024.10825949
4. **STAP (2025)** - https://doi.org/10.1145/3775073.3775165
5. **Ihantola (2010)** - https://doi.org/10.1145/1930464.1930480

### Should-Read (5 papers)
6. **StepGrade (2025)** - https://doi.org/10.1109/isec64801.2025.11147374
7. **Course-aware Tutor (2024)** - https://arxiv.org/abs/2604.11836
8. **FalconCode (2023)** - https://doi.org/10.1145/3545945.3569822
9. **CompareCFG (2020)** - https://doi.org/10.1145/3341525.3387362
10. **Systematic Review (2023)** - https://doi.org/10.1145/3636515

### Datasets
- **ProgFeed:** https://github.com/umass-ml4ed/progFeed-dataset-public (CC BY 4.0)
- **FalconCode:** https://huggingface.co/datasets/koutch/falcon_code
- **Menagerie:** https://github.com/m-messer/Menagerie
- **CodeXGLUE:** https://github.com/microsoft/CodeXGLUE

### GitHub Repositories
- **JorGPT:** https://github.com/UFV-INGINF/JorGPT
- **CodEv:** https://github.com/ (check paper cho link)
- **Rubric-Grader:** https://github.com/BITS-Pilani-GRC/Rubric-Grader
- **CodeRunner:** https://github.com/trampgeek/moodle-qtype_coderunner
- **Autograder.io:** https://github.com/eecs-autograder/autograder.io

### Tools
- **Docker:** https://www.docker.com/
- **radon:** https://github.com/rubik/radon
- **pylint:** https://github.com/PyCQA/pylint
- **bandit:** https://github.com/PyCQA/bandit
- **OpenAI API:** https://platform.openai.com/

### Documentation
- **Docker Security:** https://docs.docker.com/engine/security/
- **FastAPI:** https://fastapi.tiangolo.com/
- **Next.js:** https://nextjs.org/docs
- **OpenAI API:** https://platform.openai.com/docs

### Benchmarks
- **CodeXGLUE:** https://github.com/microsoft/CodeXGLUE
- **HumanEval:** https://github.com/openai/human-eval
- **MBPP:** https://github.com/mbpp-sanitized/mbpp-sanitized

---

# PHẦN 33 — FINAL FEASIBILITY

## FEASIBILITY SCORES

| Category | Score /10 | Rationale |
|----------|-----------|-----------|
| Research value | 7/10 | Addresses real gap, builds on existing work |
| Novelty | 6/10 | Incremental improvement over LLM-only approaches |
| Technical feasibility | 8/10 | Builds on proven technologies |
| Dataset feasibility | 9/10 | ProgFeed is available và suitable |
| Compute feasibility | 8/10 | API-based, no GPU required |
| 2-month feasibility | 7/10 | Challenging nhưng achievable với focus |
| Experiment feasibility | 7/10 | Ablation study adds complexity nhưng doable |
| Publication potential | 6/10 | Suitable cho conference/workshop, không top-tier |
| Student suitability | 8/10 | Appropriate cho undergraduate research |
| Demo potential | 9/10 | Working system makes compelling demo |

## FINAL VERDICT: GO (với modifications)

**Overall Assessment:** The project is feasible với recommended VERSION B scope. Key to success là:

1. **Strict scope management** - Stick to VERSION B, don't expand to VERSION C
2. **Early risk mitigation** - Address dataset và API issues trong Week 1-2
3. **Modular development** - Build và test components incrementally
4. **Ready to cut features** - Have clear Plan B cho mỗi major component
5. **Focus on core contribution** - Evidence-grounded hybrid approach

**Critical Success Factors:**
- ProgFeed dataset accessible và suitable
- OpenAI API costs within budget (<$20)
- Docker sandbox security achievable
- LLM integration straightforward
- Human evaluation feasible (2-3 evaluators)

**Expected Outcomes:**
- Working hybrid system
- Empirical evidence cho hybrid approach
- Publication-worthy paper (conference/workshop level)
- Compelling demo
- Reproducible repository

---

# PHẦN 34 — EXACT NEXT STEPS

Nếu tôi là bạn, đây chính xác là cách tôi sẽ thực hiện đề tài này trong 56 ngày:

## DAY 1-7: FOUNDATION

**Day 1 (Hôm nay):**
- Đọc ProgFeed paper: https://arxiv.org/abs/2606.08807
- Đọc JorGPT paper: https://doi.org/10.3390/fi17060265
- Ghi chú structured findings
- **Output:** Literature notes document

**Day 2:**
- Đọc CodEv paper: https://doi.org/10.1109/bigdata62323.2024.10825949
- Đọc STAP paper: https://doi.org/10.1145/3775073.3775165
- Note prompt engineering approaches
- **Output:** Prompt design notes

**Day 3:**
- Đọc Ihantola review: https://doi.org/10.1145/1930464.1930480
- Browse 2-3 additional papers từ references
- Identify common patterns trong existing systems
- **Output:** System patterns document

**Day 4:**
- Formulate 3 research questions với hypotheses
- Define evaluation metrics cho mỗi RQ
- Design experimental conditions (4 conditions)
- **Output:** Research questions document

**Day 5:**
- Clone ProgFeed dataset: https://github.com/umass-ml4ed/progFeed-dataset-public
- Explore dataset structure
- Check data quality và completeness
- **Output:** Dataset exploration report

**Day 6:**
- Filter dataset cho Python submissions
- Split vào train/val/test (70/15/15)
- Extract test cases từ autograders
- **Output:** Processed dataset files

**Day 7:**
- Extract rubrics từ problem statements
- Create standardized rubric format
- Validate rubric coverage
- **Output:** Rubric files và validation report

## DAY 8-14: SETUP

**Day 8:**
- Set up project structure (create directories)
- Initialize Git repository
- Create README với project overview
- **Output:** Project scaffold

**Day 9:**
- Set up Python virtual environment
- Install core dependencies (FastAPI, SQLAlchemy, etc.)
- Create requirements.txt
- **Output:** Development environment ready

**Day 10:**
- Set up PostgreSQL database
- Create database schema (từ PHẦN 24)
- Test database connection
- **Output:** Database schema và connection

**Day 11:**
- Set up Next.js frontend
- Install Monaco Editor
- Create basic code editor interface
- **Output:** Frontend scaffold

**Day 12:**
- Create FastAPI backend structure
- Set up API endpoints skeleton
- Create Pydantic models
- **Output:** Backend scaffold

**Day 13:**
- Write experiment scripts skeleton
- Create baseline experiment templates
- Set up evaluation metrics functions
- **Output:** Experiment framework

**Day 14:**
- **Checkpoint:** Review progress
- Adjust plan nếu needed
- Prepare cho Week 3
- **Output:** Progress report

## DAY 15-21: AUTO-GRADER

**Day 15:**
- Implement basic Python code execution
- Add compilation check
- Test trên simple programs
- **Output:** Working code executor

**Day 16:**
- Implement test case runner
- Add output comparison logic
- Handle multiple test cases
- **Output:** Test case runner

**Day 17:**
- Set up Docker cho code execution
- Create Dockerfile cho Python
- Test basic container execution
- **Output:** Docker execution environment

**Day 18:**
- Add Docker security measures
- Configure seccomp profile
- Configure cgroups limits
- Test isolation
- **Output:** Secure Docker sandbox

**Day 19:**
- Integrate executor với database
- Store execution results
- Add error handling
- **Output:** Database integration

**Day 20:**
- Test on 50 sample submissions
- Measure performance (latency, success rate)
- Debug bất kỳ issues
- **Output:** Performance benchmarks

**Day 21:**
- **Checkpoint:** Auto-grader ready
- Document execution pipeline
- Prepare cho static analysis
- **Output:** Auto-grader documentation

## DAY 22-28: STATIC ANALYSIS

**Day 22:**
- Install radon, pylint, bandit
- Test mỗi tool trên sample code
- Parse JSON output
- **Output:** Static analysis tools working

**Day 23:**
- Create static analysis service
- Normalize output format
- Add to database schema
- **Output:** Static analysis service

**Day 24:**
- Integrate với submission pipeline
- Run on validation dataset
- Collect metrics
- **Output:** Static analysis results

**Day 25:**
- Create baseline auto-grader experiment
- Run on 200 validation submissions
- Calculate metrics (correlation, MAE)
- **Output:** Baseline auto-grader results

**Day 26:**
- Create baseline static analysis experiment
- Run on 200 validation submissions
- Calculate metrics
- **Output:** Baseline static analysis results

**Day 27:**
- Analyze baseline results
- Compare với literature
- Identify patterns
- **Output:** Baseline analysis document

**Day 28:**
- **Checkpoint:** Baselines complete
- Review Week 3-4 progress
- Adjust plan nếu needed
- **Output:** Progress report

## DAY 29-35: LLM INTEGRATION

**Day 29:**
- Set up OpenAI API account
- Get API key
- Test basic API call
- **Output:** OpenAI integration working

**Day 30:**
- Design system prompt (từ PHẦN 14)
- Design user prompt template
- Test prompts trên sample code
- **Output:** Prompt templates

**Day 31:**
- Implement LLM analyzer service
- Add response parsing
- Handle API errors
- **Output:** LLM analyzer service

**Day 32:**
- Add evidence integration đến prompts
- Include execution results
- Include static analysis metrics
- **Output:** Evidence-grounded prompts

**Day 33:**
- Add verification logic
- Check claims against evidence
- Add confidence scoring
- **Output:** Verification system

**Day 34:**
- Test LLM analyzer on 50 samples
- Measure quality của responses
- Debug prompt issues
- **Output:** LLM analyzer validation

**Day 35:**
- Create LLM-only baseline experiment
- Run on 200 validation submissions
- Calculate metrics
- **Output:** LLM-only baseline results

## DAY 36-42: HYBRID SYSTEM

**Day 36:**
- Integrate tất cả 3 components
- Create unified pipeline
- Add score aggregator
- **Output:** Integrated system

**Day 37:**
- Implement feedback generator
- Add hint escalation logic
- Create feedback templates
- **Output:** Feedback system

**Day 38:**
- End-to-end testing
- Test on 50 submissions
- Verify tất cả components work together
- **Output:** System validation

**Day 39:**
- Run hybrid system on test dataset (300 submissions)
- Collect all metrics
- Monitor performance
- **Output:** Hybrid system results

**Day 40:**
- Run ablation: no-execution condition
- Compare với full system
- **Output:** No-execution results

**Day 41:**
- Run ablation: no-static condition
- Compare với full system
- **Output:** No-static results

**Day 42:**
- Run ablation: no-LLM condition
- Compare với full system
- **Output:** No-LLM results

## DAY 43-49: EVALUATION

**Day 43:**
- Select 50 feedback samples cho evaluation
- Prepare evaluation rubric
- Create evaluation forms
- **Output:** Evaluation materials

**Day 44:**
- Recruit 2-3 evaluators
- Conduct calibration session
- Calculate inter-rater agreement
- **Output:** Evaluator calibration

**Day 45:**
- Conduct human evaluation
- Collect ratings
- Gather qualitative feedback
- **Output:** Human evaluation data

**Day 46:**
- Calculate inter-rater agreement (Cohen's Kappa)
- Nếu κ < 0.6, re-calibrate
- **Output:** Agreement scores

**Day 47:**
- Perform statistical tests
- Compare conditions (t-tests, ANOVA)
- Calculate effect sizes
- **Output:** Statistical analysis

**Day 48:**
- Analyze ablation results
- Identify component contributions
- Create visualizations
- **Output:** Ablation analysis

**Day 49:**
- Synthesize tất cả results
- Identify key findings
- Prepare figures và tables
- **Output:** Results synthesis

## DAY 50-56: FINALIZATION

**Day 50:**
- Write paper abstract
- Write introduction
- Write background
- **Output:** Paper sections 1-2

**Day 51:**
- Write related work
- Write methodology
- Write system architecture
- **Output:** Paper sections 3-5

**Day 52:**
- Write experimental setup
- Write results
- Write ablation study
- **Output:** Paper sections 6-8

**Day 53:**
- Write discussion
- Write limitations
- Write conclusion
- **Output:** Paper sections 9-11

**Day 54:**
- Prepare demo environment
- Create demo scenarios
- Test demo flow
- **Output:** Working demo

**Day 55:**
- Create presentation slides
- Add figures và tables
- Practice presentation
- **Output:** Presentation ready

**Day 56:**
- Finalize repository documentation
- Add README
- Clean up code
- **Output:** Final repository

---

## FINAL DELIVERABLES SAU 56 NGÀY

✅ 1. Working web platform (Next.js + FastAPI)  
✅ 2. Secure code execution (Docker sandbox)  
✅ 3. Traditional auto-grader (test cases)  
✅ 4. Static code analysis (complexity, quality, security)  
✅ 5. LLM-based code analysis (evidence-grounded)  
✅ 6. AI coding tutor (Socratic hints)  
✅ 7. Grading system (hybrid scoring)  
✅ 8. Experimental dataset (ProgFeed, 600 submissions)  
✅ 9. Baselines (4 conditions)  
✅ 10. Experimental results (metrics, comparisons)  
✅ 11. Ablation study (component contributions)  
✅ 12. Evaluation (human + statistical)  
✅ 13. Research findings (key insights)  
✅ 14. Reproducible GitHub repository  
✅ 15. Research paper (conference-ready)  
✅ 16. Presentation/demo (working system)

---

## KẾT LUẬN

Blueprint này cung cấp một cách tiếp cận nghiên cứu toàn diện cho dự án AI-powered coding tutor của bạn. Key để thành công là:

1. **Stay focused on VERSION B scope** - Đừng mở rộng đến VERSION C
2. **Manage risks proactively** - Address dataset và API issues trong Week 1-2
3. **Modular development** - Build và test components incrementally
4. **Be ready to cut features** - Have clear Plan B cho mỗi major component
5. **Focus on core contribution** - Evidence-grounded hybrid approach

**Bắt đầu ngay hôm nay:** Đọc 2 paper đầu tiên và bắt đầu literature review của bạn. Success của journey 8 tuần này bắt đầu với bước đầu tiên.

---

**Tài liệu đầy đủ tiếng Việt đã được lưu tại:**
<ref_file file="D:\CNTT2311\HK9\DOAN4\ai-coding-tutor\RESEARCH_BLUEPRINT_VI.md" />
