# 03. LUỒNG THỰC HIỆN CHI TIẾT CỦA CÁC USE CASE (USE CASE FLOWS)
# NỀN TẢNG AI-POWERED CODING TUTOR & AUTO-GRADER
# (ĐỒNG BỘ 100% THEO CHUẨN ĐẶC TẢ DOAN4.MD — 44 USE CASES)

---

## PHẦN I. CÁC USE CASE XÁC THỰC & HỒ SƠ CÁ NHÂN (UC-01 ĐẾN UC-06)

---

### UC-01 — Đăng nhập
- **Mô tả**: Cho phép người dùng xác thực tài khoản để bắt đầu phiên làm việc trên hệ thống.
- **Tác nhân**: Người dùng (Sinh viên, Giáo viên, Quản trị viên, Giáo vụ, Quản trị viên hệ thống).
- **Tiền điều kiện**: Người dùng đã có tài khoản trong hệ thống.
- **Hậu điều kiện**: Phiên đăng nhập được tạo thành công. Hệ thống cấp token xác thực (access_token, refresh_token) và chuyển người dùng đến trang chính phù hợp với vai trò. Nếu đăng nhập thất bại, phiên không được tạo và dữ liệu biểu mẫu vẫn được giữ để thử lại.
- **Luồng tương tác chính**:
  1. Người dùng truy cập trang đăng nhập.
  2. Hệ thống hiển thị biểu mẫu yêu cầu Email và Mật khẩu.
  3. Người dùng nhập thông tin tài khoản và chọn "Đăng nhập".
  4. Hệ thống kiểm tra định dạng dữ liệu và tìm tài khoản tương ứng.
  5. Hệ thống đối chiếu mật khẩu với mật khẩu đã được băm trong cơ sở dữ liệu, đồng thời kiểm tra trạng thái tài khoản.
  6. Hệ thống tạo phiên đăng nhập và cấp access_token cùng refresh_token.
  7. Hệ thống chuyển người dùng đến giao diện tương ứng với vai trò: Sinh viên, Giáo viên, Giáo vụ, Quản trị viên hoặc Quản trị viên hệ thống.
- **Luồng tương tác thay thế**:
  - 7a. Người dùng đã truy cập một trang yêu cầu đăng nhập trước đó: Hệ thống chuyển người dùng về trang được yêu cầu ban đầu thay vì trang chính.
  - 7b. Tài khoản đang dùng mật khẩu tạm: Hệ thống chuyển người dùng đến biểu mẫu đổi mật khẩu bắt buộc; đổi thành công mới vào trang chính.
- **Luồng tương tác ngoại lệ**:
  - E1 - Thông tin đăng nhập không hợp lệ: Hệ thống thông báo "Email hoặc mật khẩu không chính xác." và giữ nguyên biểu mẫu.
  - E2 - Tài khoản bị khóa hoặc vô hiệu hóa: Hệ thống thông báo "Tài khoản đã bị khóa hoặc vô hiệu hóa."
  - E3 - Lỗi hệ thống: Hệ thống thông báo "Đăng nhập thất bại, vui lòng thử lại sau."

---

### UC-02 — Đăng xuất
- **Mô tả**: Cho phép người dùng kết thúc phiên làm việc hiện tại trên hệ thống.
- **Tác nhân**: Người dùng.
- **Tiền điều kiện**: Người dùng đang có phiên đăng nhập hợp lệ.
- **Hậu điều kiện**: Phiên đăng nhập của người dùng được kết thúc. Các thông tin xác thực cục bộ được xóa và người dùng được chuyển về trang đăng nhập.
- **Luồng tương tác chính**:
  1. Người dùng chọn "Đăng xuất" trên thanh điều hướng.
  2. Hệ thống hiển thị yêu cầu xác nhận đăng xuất.
  3. Người dùng xác nhận yêu cầu.
  4. Hệ thống thu hồi hoặc đưa refresh_token vào danh sách vô hiệu hóa nếu cơ chế này được cấu hình.
  5. Hệ thống xóa token xác thực được lưu trên trình duyệt.
  6. Hệ thống kết thúc phiên đăng nhập và chuyển người dùng về trang login.
- **Luồng tương tác thay thế**:
  - 3a. Người dùng hủy xác nhận: Hệ thống đóng hộp thoại và giữ nguyên phiên đăng nhập.
- **Luồng tương tác ngoại lệ**:
  - E1 - Phiên đăng nhập đã hết hạn: Hệ thống xóa thông tin xác thực cục bộ và chuyển người dùng về trang đăng nhập.

---

### UC-03 — Quên mật khẩu
- **Mô tả**: Cho phép người dùng xác thực quyền sở hữu tài khoản và đặt lại mật khẩu khi không nhớ mật khẩu hiện tại.
- **Tác nhân**: Người dùng.
- **Tiền điều kiện**: Người dùng đang ở trang đăng nhập và có quyền truy cập địa chỉ email đã đăng ký.
- **Hậu điều kiện**: Mật khẩu mới được kiểm tra, băm và lưu vào cơ sở dữ liệu. Các mã hoặc liên kết khôi phục đã sử dụng bị vô hiệu hóa. Nếu khôi phục thất bại, mật khẩu hiện tại vẫn được giữ nguyên.
- **Luồng tương tác chính**:
  1. Người dùng chọn "Quên mật khẩu" tại trang đăng nhập.
  2. Hệ thống hiển thị biểu mẫu yêu cầu nhập email tài khoản.
  3. Người dùng nhập email và chọn "Gửi yêu cầu".
  4. Hệ thống kiểm tra định dạng email và tạo mã OTP hoặc liên kết đặt lại mật khẩu có thời hạn.
  5. Hệ thống gửi mã hoặc liên kết xác thực đến email của người dùng và thông báo đã gửi yêu cầu.
  6. Người dùng sử dụng mã hoặc liên kết nhận được để mở biểu mẫu đặt lại mật khẩu.
  7. Người dùng nhập mật khẩu mới, xác nhận mật khẩu và chọn "Cập nhật mật khẩu".
  8. Hệ thống kiểm tra mã hoặc liên kết còn hợp lệ, đồng thời kiểm tra mật khẩu mới.
  9. Hệ thống băm mật khẩu mới, cập nhật vào cơ sở dữ liệu và vô hiệu hóa mã hoặc liên kết đã sử dụng.
  10. Hệ thống thông báo "Khôi phục mật khẩu thành công." và chuyển người dùng về trang đăng nhập.
- **Luồng tương tác thay thế**:
  - 5a. Người dùng không nhận được email: Người dùng yêu cầu gửi lại mã hoặc liên kết khi thời gian chờ cho phép; hệ thống cấp thông tin xác thực mới.
- **Luồng tương tác ngoại lệ**:
  - E1 - Email không tồn tại hoặc không hợp lệ: Hệ thống thông báo yêu cầu không thể thực hiện và không tiết lộ thông tin tài khoản tồn tại.
  - E2 - Mã hoặc liên kết hết hạn hoặc không hợp lệ: Hệ thống thông báo "Mã hoặc liên kết khôi phục không hợp lệ hoặc đã hết hạn."
  - E3 - Mật khẩu mới không đạt yêu cầu: Hệ thống thông báo "Mật khẩu mới không hợp lệ hoặc không trùng khớp."
  - E4 - Lỗi gửi email hoặc lỗi lưu dữ liệu: Hệ thống thông báo "Không thể khôi phục mật khẩu, vui lòng thử lại sau."

---

### UC-04 — Xem thông tin cá nhân
- **Mô tả**: Cho phép người dùng xem thông tin cá nhân đã lưu trong hệ thống.
- **Tác nhân**: Người dùng.
- **Tiền điều kiện**: Người dùng đã đăng nhập và có phiên xác thực hợp lệ.
- **Hậu điều kiện**: Thông tin cá nhân hiện tại của người dùng được hiển thị; dữ liệu trong cơ sở dữ liệu không bị thay đổi.
- **Luồng tương tác chính**:
  1. Người dùng truy cập trang cá nhân.
  2. Hệ thống xác thực phiên đăng nhập và quyền truy cập của người dùng.
  3. Hệ thống truy vấn thông tin cá nhân từ cơ sở dữ liệu.
  4. Hệ thống hiển thị các thông tin được phép xem, như họ tên, email, số điện thoại, ảnh đại diện và vai trò của người dùng.
- **Luồng tương tác thay thế**:
  - 3a. Người dùng tải lại trang: Hệ thống truy vấn lại dữ liệu mới nhất từ cơ sở dữ liệu và hiển thị thông tin cập nhật.
- **Luồng tương tác ngoại lệ**:
  - E1 - Phiên đăng nhập không hợp lệ hoặc đã hết hạn: Hệ thống thông báo yêu cầu đăng nhập và chuyển người dùng về trang /login.
  - E2 - Không tìm thấy thông tin cá nhân: Hệ thống thông báo "Không tìm thấy thông tin cá nhân."
  - E3 - Lỗi truy vấn dữ liệu: Hệ thống thông báo "Không thể tải thông tin cá nhân, vui lòng thử lại sau."

---

### UC-05 — Cập nhật thông tin cá nhân
- **Mô tả**: Cho phép người dùng chỉnh sửa và lưu các thông tin cá nhân được hệ thống cho phép cập nhật.
- **Tác nhân**: Người dùng.
- **Tiền điều kiện**: Người dùng đã đăng nhập và có phiên xác thực hợp lệ. Thông tin cá nhân của người dùng đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Thông tin hợp lệ được cập nhật và lưu vào cơ sở dữ liệu. Nếu cập nhật thất bại, thông tin cũ được giữ nguyên và hệ thống hiển thị thông báo lỗi.
- **Luồng tương tác chính**:
  1. Người dùng truy cập trang cá nhân.
  2. Hệ thống xác thực phiên đăng nhập và hiển thị thông tin hiện tại.
  3. Người dùng chọn "Chỉnh sửa".
  4. Hệ thống hiển thị biểu mẫu với các trường được phép cập nhật, như họ tên, số điện thoại và ảnh đại diện.
  5. Người dùng chỉnh sửa thông tin và chọn "Lưu thay đổi".
  6. Hệ thống kiểm tra tính hợp lệ của dữ liệu.
  7. Hệ thống cập nhật thông tin vào cơ sở dữ liệu.
  8. Hệ thống thông báo "Cập nhật thông tin cá nhân thành công." và hiển thị dữ liệu mới.
- **Luồng tương tác thay thế**:
  - 5a. Người dùng chọn "Hủy": Hệ thống hủy thao tác chỉnh sửa và giữ nguyên thông tin hiện tại.
  - 5b. Người dùng không thay đổi thông tin: Hệ thống không thực hiện cập nhật và giữ nguyên dữ liệu hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Phiên đăng nhập không hợp lệ hoặc đã hết hạn: Hệ thống thông báo yêu cầu đăng nhập và chuyển người dùng về trang đăng nhập.
  - E2 - Thông tin không hợp lệ: Hệ thống thông báo "Thông tin cá nhân không hợp lệ." và giữ lại dữ liệu người dùng đã nhập để chỉnh sửa.
  - E3 - Dữ liệu đã được cập nhật ở nơi khác: Hệ thống thông báo "Thông tin đã được cập nhật, vui lòng tải lại dữ liệu." và không ghi đè dữ liệu mới.
  - E4 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Cập nhật thông tin cá nhân thất bại."

---

### UC-06 — Đổi mật khẩu
- **Mô tả**: Cho phép người dùng thay đổi mật khẩu hiện tại sau khi xác thực mật khẩu cũ.
- **Tác nhân**: Người dùng.
- **Tiền điều kiện**: Người dùng đã đăng nhập và có phiên xác thực hợp lệ. Người dùng biết mật khẩu hiện tại.
- **Hậu điều kiện**: Mật khẩu mới được kiểm tra, băm và lưu vào cơ sở dữ liệu. Các phiên hoặc token cũ được xử lý theo chính sách bảo mật của hệ thống. Nếu đổi mật khẩu thất bại, mật khẩu cũ vẫn được giữ nguyên.
- **Luồng tương tác chính**:
  1. Người dùng truy cập chức năng "Đổi mật khẩu" trong trang cá nhân.
  2. Hệ thống hiển thị biểu mẫu gồm Mật khẩu hiện tại, Mật khẩu mới và Xác nhận mật khẩu mới.
  3. Người dùng nhập đầy đủ thông tin và chọn "Đổi mật khẩu".
  4. Hệ thống xác thực phiên đăng nhập và đối chiếu mật khẩu hiện tại.
  5. Hệ thống kiểm tra mật khẩu mới đạt chính sách bảo mật và trùng với phần xác nhận.
  6. Hệ thống băm mật khẩu mới và lưu vào cơ sở dữ liệu.
  7. Hệ thống thông báo "Đổi mật khẩu thành công."
- **Luồng tương tác thay thế**:
  - 3a. Người dùng chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên mật khẩu hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Phiên đăng nhập không hợp lệ hoặc đã hết hạn: Hệ thống yêu cầu người dùng đăng nhập lại.
  - E2 - Mật khẩu hiện tại không chính xác: Hệ thống thông báo "Mật khẩu hiện tại không chính xác."
  - E3 - Mật khẩu mới không hợp lệ: Hệ thống thông báo "Mật khẩu mới không đáp ứng yêu cầu bảo mật hoặc không trùng khớp."
  - E4 - Mật khẩu mới trùng mật khẩu hiện tại: Hệ thống thông báo "Mật khẩu mới phải khác mật khẩu hiện tại."
  - E5 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Đổi mật khẩu thất bại."

---

## PHẦN II. PHÂN HỆ SINH VIÊN (UC-07 ĐẾN UC-16)

---

### UC-07 — Xem danh sách bài tập
- **Mô tả**: Cho phép Sinh viên xem và tra cứu danh sách các bài tập được giao cho những lớp mà mình tham gia.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có phiên xác thực hợp lệ.
- **Hậu điều kiện**: Danh sách bài tập phù hợp được hiển thị; dữ liệu bài tập không bị thay đổi.
- **Luồng tương tác chính**:
  1. Sinh viên truy cập mục "Bài tập".
  2. Hệ thống xác thực phiên đăng nhập và quyền truy cập của Sinh viên.
  3. Hệ thống lấy danh sách lớp, môn học hoặc chủ đề mà Sinh viên đang tham gia.
  4. Hệ thống truy vấn các bài tập được giao cho Sinh viên theo những lớp hoặc môn học đó.
  5. Hệ thống hiển thị danh sách với các thông tin: Tên bài, lớp/chủ đề, độ khó, thời hạn nộp, trạng thái làm bài và điểm hiện có (chính thức hoặc tạm tính) nếu đã có kết quả.
  6. Sinh viên tìm kiếm hoặc lọc danh sách theo lớp, chủ đề hoặc trạng thái.
- **Luồng tương tác thay thế**:
  - 6a. Sinh viên không chọn bộ lọc: Hệ thống hiển thị toàn bộ bài tập mà Sinh viên được phép xem.
  - 6b. Không có bài tập phù hợp: Hệ thống hiển thị danh sách rỗng và thông báo phù hợp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Phiên đăng nhập không hợp lệ hoặc đã hết hạn: Hệ thống yêu cầu Sinh viên đăng nhập lại.
  - E2 - Lỗi truy vấn dữ liệu: Hệ thống thông báo "Không thể tải danh sách bài tập, vui lòng thử lại sau."

---

### UC-08 — Xem chi tiết bài tập
- **Mô tả**: Cho phép Sinh viên xem nội dung và yêu cầu chi tiết của một bài tập được giao.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có phiên xác thực hợp lệ. Bài tập tồn tại và Sinh viên được phép truy cập bài tập.
- **Hậu điều kiện**: Thông tin bài tập được hiển thị nếu Sinh viên có quyền truy cập. Nếu Sinh viên chọn làm bài, hệ thống chuyển đến giao diện soạn thảo tương ứng.
- **Luồng tương tác chính**:
  1. Sinh viên chọn một bài tập từ danh sách.
  2. Hệ thống kiểm tra Sinh viên có thuộc lớp được giao bài tập và bài tập có được phép truy cập hay không.
  3. Hệ thống lấy thông tin bài tập từ cơ sở dữ liệu.
  4. Hệ thống hiển thị đề bài, hỗ trợ Markdown và công thức toán học LaTeX nếu có.
  5. Hệ thống hiển thị yêu cầu Input/Output, ràng buộc, giới hạn thời gian, giới hạn bộ nhớ, Sample Test Cases và Rubric được công khai.
  6. Sinh viên chọn "Làm bài".
  7. Hệ thống kiểm tra trạng thái bài tập và thời hạn nộp trước khi mở giao diện làm bài.
- **Luồng tương tác thay thế**:
  - 6a. Sinh viên quay lại danh sách: Hệ thống không tạo hoặc thay đổi bài làm và đưa Sinh viên về danh sách bài tập.
  - 6b. Bài tập đã hết thời hạn: Hệ thống cho phép Sinh viên xem thông tin bài tập và kết quả nếu đã được công bố, nhưng không cho phép tiếp tục chỉnh sửa hoặc nộp bài.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Sinh viên không có quyền truy cập: Hệ thống thông báo "Bạn không có quyền truy cập bài tập này."
  - E3 - Bài tập đã đóng: Hệ thống thông báo "Bài tập đã đóng, không thể tiếp tục làm bài."
  - E4 - Lỗi tải dữ liệu: Hệ thống thông báo "Không thể tải chi tiết bài tập, vui lòng thử lại sau."

---

### UC-09 — Viết code
- **Mô tả**: Cho phép Sinh viên viết, chỉnh sửa mã nguồn trực tiếp và lưu bản nháp trong trình soạn thảo của hệ thống.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có quyền truy cập bài tập. Bài tập vẫn còn trong thời gian làm bài. Bài tập có cấu hình ngôn ngữ lập trình được phép sử dụng.
- **Hậu điều kiện**: Mã nguồn của Sinh viên được hiển thị và bản nháp gần nhất được lưu theo cơ chế autosave. Sinh viên có thể tiếp tục chỉnh sửa cho đến khi xác nhận nộp bài hoặc hết hạn.
- **Luồng tương tác chính**:
  1. Sinh viên chọn "Làm bài" từ trang chi tiết bài tập.
  2. Hệ thống tải đề bài, ngôn ngữ và cấu hình bài tập.
  3. Hệ thống mở Monaco Editor với template code phù hợp.
  4. Sinh viên nhập hoặc chỉnh sửa mã nguồn.
  5. Hệ thống tự động lưu bản nháp theo chu kỳ.
  6. Sinh viên tiếp tục chỉnh sửa để hoàn thiện bài làm hoặc chuyển đến bước "Nộp bài".
- **Luồng tương tác thay thế**:
  - 4a. Sinh viên tải lại trang: Hệ thống khôi phục bản nháp gần nhất nếu có.
  - 4b. Sinh viên rời khỏi trang: Hệ thống lưu bản nháp trước khi rời trang nếu kết nối còn hoạt động.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không tải được cấu hình bài tập: Hệ thống thông báo "Không thể mở trình soạn thảo cho bài tập này."
  - E2 - Lỗi lưu bản nháp: Hệ thống thông báo "Không thể lưu bản nháp, vui lòng kiểm tra kết nối mạng."
  - E3 - Bài làm đã ở trạng thái đã nộp hoặc bài tập đã hết hạn: Hệ thống khóa Editor và từ chối mọi thao tác chỉnh sửa.

---

### UC-10 — Upload file bài làm
- **Mô tả**: Cho phép Sinh viên tải mã nguồn từ máy tính vào bài làm đang mở để tiếp tục chỉnh sửa.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã mở giao diện làm bài và có quyền truy cập bài tập. File mã nguồn có phần mở rộng thuộc danh sách ngôn ngữ được bài tập cho phép. Bài tập chưa xác nhận nộp hoặc hết hạn.
- **Hậu điều kiện**: Nội dung file hợp lệ được nạp vào Monaco Editor và có thể được chỉnh sửa tiếp. File upload không được xem là bài nộp chính thức cho đến khi Sinh viên nộp bài hoặc hết thời hạn.
- **Luồng tương tác chính**:
  1. Sinh viên chọn "Tải tệp lên" tại màn hình làm bài.
  2. Hệ thống hiển thị giao diện chọn file.
  3. Sinh viên chọn file mã nguồn từ máy tính.
  4. Hệ thống kiểm tra phần mở rộng, kích thước và nội dung cơ bản của file.
  5. Hệ thống đọc file và nạp nội dung vào Monaco Editor.
  6. Hệ thống lưu bản nháp của nội dung đã nạp.
  7. Hệ thống thông báo "Tải file lên thành công."
- **Luồng tương tác thay thế**:
  - 3a. Sinh viên hủy chọn file: Hệ thống đóng hộp thoại và giữ nguyên nội dung đang có trong editor.
  - 5a. Sinh viên tiếp tục chỉnh sửa: Hệ thống cập nhật nội dung editor và lưu theo cơ chế autosave.
- **Luồng tương tác ngoại lệ**:
  - E1 - Định dạng file không được hỗ trợ: Hệ thống thông báo "Định dạng file không được hỗ trợ."
  - E2 - File vượt quá kích thước cho phép: Hệ thống thông báo "Kích thước file vượt quá giới hạn cho phép."
  - E3 - Không thể đọc file: Hệ thống thông báo "Không thể tải file, vui lòng chọn file khác."
  - E4 - Bài làm đã nộp hoặc bài tập đã hết hạn: Hệ thống từ chối tải file và thông báo "Bài làm đã được khóa."

---

### UC-11 — Nộp bài
- **Mô tả**: Cho phép Sinh viên gửi mã nguồn hiện tại để tạo một bài nộp chính thức của bài tập. Bài nộp chỉ được đưa vào quy trình chấm sau khi bài tập hết thời hạn nhận bài.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có quyền làm bài. Bài tập chưa hết hạn. Lớp của bài tập đang ở trạng thái Hoạt động. Sinh viên đã có mã nguồn hợp lệ trong bản nháp.
- **Hậu điều kiện**: Mã nguồn hiện tại được lưu thành một bài nộp duy nhất, trạng thái Đã nộp. Editor của Sinh viên chuyển sang Read-only và Sinh viên không thể chỉnh sửa hoặc nộp lại. Auto-Grader và AI Review chưa được thực hiện tại thời điểm nộp.
- **Luồng tương tác chính**:
  1. Sinh viên kiểm tra mã nguồn và chọn "Nộp bài".
  2. Hệ thống kiểm tra trạng thái bài làm, quyền nộp và thời hạn.
  3. Hệ thống hiển thị popup xác nhận với cảnh báo rằng sau khi xác nhận, bài làm sẽ bị khóa và không thể chỉnh sửa hoặc nộp lại.
  4. Sinh viên chọn "Xác nhận".
  5. Hệ thống lưu bản mã nguồn nháp hiện tại thành bài nộp chính thức.
  6. Hệ thống chuyển trạng thái từ DRAFT sang SUBMITTED và ghi nhận trigger_type = MANUAL.
  7. Hệ thống khóa Editor ở chế độ Read-only.
  8. Hệ thống thông báo: "Nộp bài thành công. Bài làm sẽ được chấm sau khi hết thời hạn nộp bài."
  9. Hệ thống giữ bài nộp ở trạng thái SUBMITTED cho đến khi hết thời hạn nhận bài.
- **Luồng tương tác thay thế**:
  - 3a. Sinh viên hủy xác nhận: Hệ thống đóng popup và giữ nguyên bài làm ở trạng thái DRAFT.
- **Luồng tương tác ngoại lệ**:
  - E1 - Hết hạn trước khi Sinh viên xác nhận: Hệ thống khóa bài làm và không tiếp nhận thao tác nộp thủ công.
  - E2 - Không tìm thấy bản DRAFT hoặc bản mã nguồn không hợp lệ: Hệ thống thông báo "Không thể tạo bài nộp từ bản làm hiện tại."
  - E3 - Lỗi khi lưu bài nộp: Hệ thống giữ nguyên DRAFT và thông báo "Không thể nộp bài."
  - E4 - Bài làm đã ở trạng thái SUBMITTED: Hệ thống từ chối thao tác và thông báo "Bài làm đã được nộp và đã bị khóa."

---

### UC-12 — Xem kết quả Auto-Grader
- **Mô tả**: Cho phép Sinh viên xem kết quả chấm tự động của một bài nộp thuộc về mình sau khi quá trình chấm hoàn tất.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và bài nộp thuộc về Sinh viên.
- **Hậu điều kiện**: Kết quả Auto-Grader được hiển thị; dữ liệu chấm không bị thay đổi. Nếu chưa có điểm chấm thủ công, điểm Auto-Grader của bản nộp duy nhất được hiển thị ở trạng thái "Tạm tính".
- **Luồng tương tác chính**:
  1. Sinh viên mở một bài nộp từ lịch sử làm bài hoặc trang kết quả.
  2. Hệ thống kiểm tra quyền truy cập bài nộp.
  3. Hệ thống lấy kết quả Auto-Grader.
  4. Hệ thống hiển thị điểm số, trạng thái tổng quát và thời gian chấm.
  5. Hệ thống hiển thị trạng thái từng test case, thời gian thực thi, mức sử dụng bộ nhớ và lỗi nếu có (dữ liệu Input/Output của Hidden Test Cases được bảo mật và ẩn khỏi Sinh viên).
  6. Sinh viên xem chi tiết kết quả chấm bài.
- **Luồng tương tác thay thế**:
  - 4a. Bài nộp đang ở trạng thái SUBMITTED (chờ đến hạn) hoặc GRADING (đang chấm gom): Hệ thống hiển thị trạng thái tương ứng và cho phép Sinh viên tải lại khi có kết quả.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài nộp không tồn tại: Hệ thống thông báo "Không tìm thấy bài nộp."
  - E2 - Sinh viên không có quyền truy cập: Hệ thống từ chối yêu cầu và không hiển thị dữ liệu bài nộp.
  - E3 - Chưa có kết quả chấm: Hệ thống thông báo "Kết quả chấm bài chưa sẵn sàng."

---

### UC-13 — Xem nhận xét AI
- **Mô tả**: Cho phép Sinh viên xem nhận xét do AI tạo ra dựa trên bài làm và kết quả chấm.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và bài nộp thuộc về Sinh viên. Bài nộp đã có kết quả chấm hoặc đủ dữ liệu để tạo feedback.
- **Hậu điều kiện**: Nhận xét AI được hiển thị nếu đã được tạo; dữ liệu bài nộp không bị thay đổi.
- **Luồng tương tác chính**:
  1. Sinh viên mở trang kết quả của một bài nộp.
  2. Hệ thống kiểm tra quyền truy cập và trạng thái AI feedback.
  3. Hệ thống lấy nhận xét AI đã lưu.
  4. Hệ thống hiển thị nhận xét về lỗi, chất lượng mã nguồn, độ phức tạp và đề xuất cải thiện nếu có.
  5. Sinh viên xem và sử dụng nhận xét để cải thiện bài làm.
- **Luồng tương tác thay thế**:
  - 3a. AI feedback đang được tạo: Hệ thống hiển thị trạng thái chờ và cập nhật khi feedback sẵn sàng.
  - 3b. AI feedback chưa được bật cho bài tập: Hệ thống thông báo tính năng không khả dụng cho bài nộp này.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không tìm thấy bài nộp: Hệ thống thông báo "Không tìm thấy bài nộp."
  - E2 - Sinh viên không có quyền truy cập: Hệ thống từ chối yêu cầu xem feedback.
  - E3 - AI Service gặp lỗi: Hệ thống thông báo "Chưa thể tạo nhận xét AI, vui lòng thử lại sau."

---

### UC-14 — Tương tác với AI Tutor
- **Mô tả**: Cho phép Sinh viên trao đổi với AI Tutor để nhận gợi ý định hướng giải quyết bài tập theo phương pháp Socratic.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập. Sinh viên đã có kết quả đánh giá/điểm được công bố cho bài nộp.
- **Hậu điều kiện**: Câu hỏi và câu trả lời được hiển thị trong phiên hội thoại. Lịch sử hội thoại được lưu theo chính sách của hệ thống nếu chức năng lưu được bật.
- **Luồng tương tác chính**:
  1. Sinh viên mở "AI Tutor" tại màn hình kết quả bài nộp (sau khi đã có đánh giá).
  2. Hệ thống lấy context cần thiết gồm đề bài, mã nguồn, kết quả test và câu hỏi trước đó trong hội thoại.
  3. Sinh viên nhập câu hỏi và chọn "Gửi".
  4. Hệ thống kiểm tra câu hỏi, quyền truy cập context và giới hạn sử dụng.
  5. Backend gửi prompt kèm guardrails sư phạm đến AI Engine.
  6. AI Tutor phân tích context và tạo câu trả lời mang tính gợi mở, không cung cấp ngay toàn bộ lời giải nếu chính sách không cho phép.
  7. Hệ thống hiển thị câu trả lời trong khung hội thoại.
  8. Sinh viên tiếp tục đặt câu hỏi trong cùng phiên.
- **Luồng tương tác thay thế**:
  - 2a. Sinh viên không chọn bài làm hoặc bài nộp: Hệ thống chỉ gửi context của đề bài và các thông tin được phép xem.
  - 8a. Sinh viên bắt đầu hội thoại mới: Hệ thống xóa context hội thoại trước khỏi phiên hiện tại và khởi tạo phiên mới.
- **Luồng tương tác ngoại lệ**:
  - E1 - Câu hỏi rỗng hoặc vượt giới hạn: Hệ thống yêu cầu Sinh viên nhập câu hỏi hợp lệ.
  - E2 - AI Service không khả dụng: Hệ thống thông báo "AI Tutor hiện không khả dụng, vui lòng thử lại sau."
  - E3 - Nội dung yêu cầu không phù hợp chính sách: Hệ thống từ chối yêu cầu và hiển thị thông báo phù hợp.

---

### UC-15 — Xem bài đã nộp
- **Mô tả**: Cho phép Sinh viên xem lại bản nộp chính thức của mình đối với từng bài tập.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có phiên xác thực hợp lệ.
- **Hậu điều kiện**: Bài nộp chính thức (duy nhất) của Sinh viên cho từng bài tập được hiển thị; dữ liệu bài nộp không bị thay đổi.
- **Luồng tương tác chính**:
  1. Sinh viên truy cập mục "Lịch sử làm bài" hoặc lịch sử nộp bài của một bài tập.
  2. Hệ thống xác thực phiên đăng nhập.
  3. Hệ thống truy vấn bài nộp chính thức (duy nhất) thuộc về Sinh viên theo từng bài tập.
  4. Hệ thống sắp xếp danh sách theo thời gian nộp và hiển thị bài tập, thời điểm nộp, trigger_type (MANUAL/ AUTO_EXPIRED), trạng thái, điểm và ngôn ngữ.
  5. Sinh viên chọn một bài tập để xem mã nguồn, kết quả test và feedback được phép xem của bài nộp tương ứng.
- **Luồng tương tác thay thế**:
  - 4a. Sinh viên lọc lịch sử: Hệ thống lọc theo bài tập, lớp, trạng thái hoặc khoảng thời gian.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không có lịch sử bài nộp: Hệ thống hiển thị danh sách rỗng và thông báo "Chưa có bài nộp nào."
  - E2 - Lỗi truy vấn dữ liệu: Hệ thống thông báo "Không thể tải lịch sử làm bài, vui lòng thử lại sau."

---

### UC-16 — Xem bảng điểm cá nhân
- **Mô tả**: Cho phép Sinh viên xem tổng hợp điểm các bài tập và lớp học mà mình tham gia.
- **Tác nhân**: Sinh viên.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và có phiên xác thực hợp lệ.
- **Hậu điều kiện**: Bảng điểm cá nhân được hiển thị theo dữ liệu kết quả đã được chấm; dữ liệu điểm không bị thay đổi.
- **Luồng tương tác chính**:
  1. Sinh viên truy cập trang "Bảng điểm".
  2. Hệ thống xác thực phiên đăng nhập.
  3. Hệ thống truy vấn các kết quả đã được chấm thuộc về Sinh viên.
  4. Hệ thống tổng hợp điểm theo bài tập và lớp học theo quy tắc đã cấu hình.
  5. Hệ thống hiển thị bảng điểm gồm bài tập, lớp, điểm, trạng thái và thời gian cập nhật.
  6. Sinh viên xem hoặc lọc điểm theo bài tập, lớp hoặc khoảng thời gian.
- **Luồng tương tác thay thế**:
  - 5a. Sinh viên không chọn bộ lọc: Hệ thống hiển thị toàn bộ bảng điểm mà Sinh viên được phép xem.
  - 5b. Một số bài chưa có điểm cuối: Hệ thống hiển thị trạng thái đang chờ chấm hoặc chưa có kết quả thay vì tự động coi là điểm 0.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không có kết quả đã chấm: Hệ thống hiển thị bảng điểm rỗng và thông báo "Chưa có kết quả được chấm."
  - E2 - Lỗi tổng hợp điểm: Hệ thống thông báo "Không thể tải bảng điểm, vui lòng thử lại sau."

---

## PHẦN III. PHÂN HỆ GIÁO VIÊN (UC-17 ĐẾN UC-27)

---

### UC-17 — Tạo bài tập
- **Mô tả**: Cho phép Giáo viên tạo bài tập và thiết lập cấu hình ban đầu gồm: thông tin chung, thời hạn nộp bài (một mốc duy nhất, không gia hạn) và tiêu chí chấm điểm.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập vào hệ thống. Giáo viên có quyền quản lý bài tập trong lớp phụ trách. Lớp đang ở trạng thái Hoạt động.
- **Hậu điều kiện**: Bài tập được tạo thành công.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng Tạo bài tập.
  2. Hệ thống hiển thị biểu mẫu thông tin bài tập.
  3. Giáo viên nhập các thông tin của bài tập như tên bài tập, mô tả, thời hạn và các yêu cầu liên quan.
  4. Giáo viên cấu hình các tiêu chí chấm điểm và trọng số tương ứng.
  5. Hệ thống kiểm tra tính hợp lệ của các thông tin cấu hình.
  6. Hệ thống lưu thông tin bài tập và các chính sách đã cấu hình.
  7. Hệ thống thông báo cấu hình bài tập thành công.
- **Luồng tương tác ngoại lệ**:
  - E1 - Thông tin bài tập không hợp lệ: Hệ thống thông báo lỗi và yêu cầu Giáo viên kiểm tra, cập nhật lại thông tin.
  - E2 - Thời hạn không hợp lệ: Hệ thống thông báo lỗi và yêu cầu Giáo viên kiểm tra lại thời gian cấu hình.
  - E3 - Không thể lưu cấu hình bài tập: Hệ thống thông báo lỗi và không tạo bài tập mới.

---

### UC-18 — Chỉnh sửa thông tin chung bài tập
- **Mô tả**: Cho phép Giáo viên cập nhật các thông tin chung của bài tập do mình quản lý, gồm Tên bài tập, Đề bài, Ngôn ngữ hỗ trợ, Mức độ khó và Giới hạn tài nguyên. Chức năng này không bao gồm việc thay đổi Hạn nộp, Bộ Test Case hoặc Tiêu chí chấm điểm.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập. Bài tập tồn tại và đang ở trạng thái cho phép chỉnh sửa.
- **Hậu điều kiện**: Thông tin chung của bài tập được cập nhật thành công. Các bài nộp đã tồn tại không bị thay đổi bởi thao tác cập nhật thông tin chung.
- **Luồng tương tác chính**:
  1. Giáo viên mở danh sách bài tập và chọn bài cần chỉnh sửa.
  2. Hệ thống kiểm tra quyền truy cập và hiển thị thông tin bài tập hiện tại.
  3. Giáo viên chỉnh sửa thông tin chung của bài tập.
  4. Giáo viên chọn "Lưu".
  5. Hệ thống kiểm tra tính hợp lệ của dữ liệu và tính tương thích với bài nộp hiện có.
  6. Hệ thống cập nhật bài tập hoặc lưu phiên bản mới theo quy định.
  7. Hệ thống thông báo "Cập nhật bài tập thành công."
- **Luồng tương tác thay thế**:
  - 5a. Bài tập đã được giao hoặc có bài nộp: Hệ thống giới hạn các trường được phép sửa (chỉ cho sửa mô tả/đề bài) hoặc yêu cầu xác nhận tạo phiên bản mới trước khi lưu.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không tìm thấy bài tập: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Giáo viên không có quyền: Hệ thống từ chối yêu cầu và không cho phép chỉnh sửa.
  - E3 - Dữ liệu không hợp lệ: Hệ thống thông báo "Thông tin bài tập không hợp lệ."
  - E4 - Lỗi khi lưu: Hệ thống thông báo "Không thể cập nhật bài tập, vui lòng thử lại sau."

---

### UC-19 — Xóa bài tập
- **Mô tả**: Cho phép Giáo viên xóa hoặc vô hiệu hóa bài tập theo trạng thái và chính sách lưu trữ dữ liệu.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập, có quyền quản lý bài tập và bài tập tồn tại.
- **Hậu điều kiện**: Bài tập được xóa mềm, vô hiệu hóa hoặc xóa theo chính sách; bài nộp, điểm và lịch sử liên quan được lưu theo chính sách.
- **Luồng tương tác chính**:
  1. Giáo viên mở danh sách bài tập và chọn bài cần xóa.
  2. Giáo viên chọn "Xóa".
  3. Hệ thống hiển thị hộp thoại xác nhận và thông tin về dữ liệu bị ảnh hưởng.
  4. Giáo viên xác nhận thao tác.
  5. Hệ thống kiểm tra trạng thái bài tập, quyền truy cập và dữ liệu liên quan.
  6. Hệ thống thực hiện xóa mềm hoặc vô hiệu hóa bài tập theo quy tắc nghiệp vụ.
  7. Hệ thống thông báo "Xử lý bài tập thành công." và cập nhật lại danh sách.
- **Luồng tương tác thay thế**:
  - 5a. Bài tập đã có bài nộp: Hệ thống chuyển bài tập sang trạng thái vô hiệu hóa / xóa mềm thay vì xóa dữ liệu vật lý.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không tìm thấy bài tập: Hệ thống thông báo "Bài tập không tồn tại hoặc đã được xử lý."
  - E2 - Bài tập đang được sử dụng: Hệ thống thông báo "Bài tập đang có dữ liệu liên quan và không thể xóa trực tiếp."
  - E3 - Lỗi xử lý: Hệ thống thông báo "Không thể xóa hoặc vô hiệu hóa bài tập, vui lòng thử lại sau."

---

### UC-20 — Thiết lập hạn nộp bài
- **Mô tả**: Chức năng này cho phép Giáo viên thiết lập và điều chỉnh thời hạn nộp bài cho một bài tập đã được tạo.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập, có quyền quản lý bài tập của lớp. Bài tập đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Hạn nộp bài mới được cập nhật thành công và áp dụng cho tất cả sinh viên thuộc các lớp được giao bài tập này. Nếu thất bại, giữ nguyên hạn nộp cũ.
- **Luồng tương tác chính**:
  1. Giáo viên truy cập danh sách bài tập và chọn bài tập cần thiết lập hạn nộp.
  2. Hệ thống hiển thị thông tin bài tập và hạn nộp hiện tại (nếu có).
  3. Giáo viên nhập/chọn ngày và giờ hạn nộp bài mới.
  4. Giáo viên chọn "Lưu".
  5. Hệ thống kiểm tra tính hợp lệ của thời gian (phải lớn hơn thời điểm hiện tại).
  6. Hệ thống cập nhật hạn nộp bài mới vào CSDL.
  7. Hệ thống thông báo "Thiết lập hạn nộp bài thành công." và hiển thị hạn nộp mới.
- **Luồng tương tác thay thế**:
  - 3a. Bài tập chưa từng thiết lập hạn nộp: Hệ thống tạo mới bản ghi hạn nộp bài và lưu vào CSDL.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Hạn nộp không hợp lệ: Hệ thống thông báo "Hạn nộp bài không hợp lệ hoặc phải lớn hơn thời điểm hiện tại."
  - E3 - Bài tập đã kết thúc/Đã đóng: Hệ thống thông báo "Không thể thay đổi hạn nộp bài của bài tập đã đóng."
  - E4 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Thiết lập hạn nộp bài thất bại."

---

### UC-21 — Thiết lập test case
- **Mô tả**: Cho phép Giáo viên quản lý bộ Test Case (thêm, sửa, xóa) của một bài tập phục vụ chấm điểm tự động.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập; có quyền quản lý bài tập; bài tập đã tồn tại trên hệ thống.
- **Hậu điều kiện**: Bộ Test Case được cập nhật thành công và sẵn sàng sử dụng cho lượt nộp của sinh viên.
- **Luồng tương tác chính**:
  1. Giáo viên truy cập danh sách bài tập và chọn bài tập cần thiết lập Test Case.
  2. Hệ thống hiển thị thông tin bài tập và danh sách Test Case hiện có.
  3. Giáo viên thực hiện cấu hình bộ Test Case (Thêm mới, Chỉnh sửa, hoặc Xóa các Test Case).
  4. Đối với mỗi Test Case, Giáo viên nhập: Input, Output mong đợi, Phân loại (Sample/Hidden) và Trọng số điểm.
  5. Giáo viên chọn "Lưu".
  6. Hệ thống kiểm tra tính hợp lệ của bộ Test Case.
  7. Hệ thống lưu bộ Test Case vào CSDL và hiển thị thông báo "Thiết lập Test Case thành công."
- **Luồng tương tác thay thế**:
  - 3a. Xóa Test Case: Giáo viên chọn xóa một Test Case. Hệ thống yêu cầu xác nhận. Giáo viên xác nhận. Hệ thống xoá khỏi danh sách tạm trước khi Lưu.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Thông tin Test Case không hợp lệ: Hệ thống thông báo "Dữ liệu đầu vào hoặc kết quả đầu ra của Test Case không được để trống."
  - E3 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Thiết lập Test Case thất bại."

---

### UC-22 — Thiết lập rubric
- **Mô tả**: Cho phép Giáo viên quản lý bộ tiêu chí và mức điểm đánh giá (Rubric) cho bài tập.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập; có quyền quản lý bài tập; bài tập đã tồn tại trên hệ thống.
- **Hậu điều kiện**: Rubric được lưu thành công làm cơ sở tính điểm tổng hợp cho bài nộp của sinh viên.
- **Luồng tương tác chính**:
  1. Giáo viên truy cập danh sách bài tập và chọn bài tập cần thiết lập Rubric.
  2. Hệ thống hiển thị danh sách các tiêu chí đánh giá hiện tại.
  3. Giáo viên cấu hình danh sách tiêu chí (Tên tiêu chí, Mô tả, Mức điểm/Trọng số). Lưu ý: Tiêu chí Correctness do hệ thống tự động tính từ Test Case.
  4. Giáo viên chọn "Lưu".
  5. Hệ thống kiểm tra tổng trọng số/điểm các tiêu chí và tính hợp lệ của Rubric.
  6. Hệ thống lưu thông tin Rubric vào CSDL và hiển thị thông báo "Thiết lập Rubric thành công."
- **Luồng tương tác thay thế**:
  - 3a. Xóa tiêu chí: Giáo viên chọn xóa một tiêu chí (khác Correctness). Hệ thống yêu cầu xác nhận. Giáo viên xác nhận. Xóa khỏi danh sách tạm.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Trùng tiêu chí: Hệ thống thông báo "Tên tiêu chí đánh giá bị trùng lặp."
  - E3 - Tổng trọng số không hợp lệ: Hệ thống thông báo "Tổng trọng số của các tiêu chí phải bằng 100% (hoặc tổng thang điểm quy định)."
  - E4 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Thiết lập Rubric thất bại."

---

### UC-23 — Giao bài tập cho lớp
- **Mô tả**: Giáo viên giao một bài tập đã có trong hệ thống cho một hoặc nhiều lớp học để sinh viên thực hiện.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập hệ thống. Giáo viên có quyền quản lý và giao bài tập. Bài tập cần giao đã tồn tại trong hệ thống. Lớp học cần giao bài đã tồn tại và Giáo viên có quyền quản lý lớp.
- **Hậu điều kiện**: Bài tập được giao thành công cho lớp đã chọn. Thông tin giao bài được lưu vào cơ sở dữ liệu. Sinh viên thuộc lớp được giao bài có thể xem và thực hiện bài tập. Nếu giao bài không thành công, hệ thống giữ nguyên thông tin hiện tại và hiển thị thông báo lỗi.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng "Quản lý bài tập".
  2. Hệ thống hiển thị danh sách bài tập.
  3. Giáo viên chọn bài tập cần giao.
  4. Hệ thống hiển thị thông tin chi tiết của bài tập.
  5. Giáo viên chọn chức năng "Giao bài tập".
  6. Hệ thống hiển thị danh sách các lớp mà Giáo viên có quyền quản lý.
  7. Giáo viên chọn lớp cần giao bài tập.
  8. Giáo viên thiết lập các thông tin giao bài nếu cần.
  9. Giáo viên chọn "Giao bài".
  10. Hệ thống kiểm tra tính hợp lệ của thông tin giao bài.
  11. Hệ thống lưu thông tin giao bài vào cơ sở dữ liệu.
  12. Hệ thống thông báo "Giao bài tập thành công."
- **Luồng tương tác thay thế**:
  - 7a. Giáo viên chọn nhiều lớp: Hệ thống cho phép Giáo viên chọn nhiều lớp để giao cùng một bài tập. Giáo viên xác nhận giao bài. Hệ thống tạo thông tin giao bài cho các lớp đã chọn.
  - 7b. Giáo viên giao bài đã từng giao cho lớp: Hệ thống hiển thị thông tin bài tập đã được giao cho lớp. Giáo viên xác nhận giao lại bài tập hoặc cập nhật cấu hình giao bài. Hệ thống cập nhật thông tin giao bài theo lựa chọn của Giáo viên.
  - 9a. Giáo viên chọn "Hủy": Hệ thống hủy thao tác giao bài và giữ nguyên thông tin hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Không tìm thấy lớp học hoặc lớp không còn hoạt động: Hệ thống thông báo "Không tìm thấy lớp học hoặc lớp không còn hoạt động."
  - E3 - Giáo viên không có quyền quản lý lớp: Hệ thống thông báo "Bạn không có quyền giao bài tập cho lớp này."
  - E4 - Thông tin giao bài không hợp lệ: Hệ thống thông báo "Thông tin giao bài không hợp lệ."
  - E5 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Giao bài tập thất bại."

---

### UC-24 — Xem bài nộp
- **Mô tả**: Giáo viên xem thông tin và kết quả bài nộp của sinh viên đối với một bài tập đã được giao.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập hệ thống. Giáo viên có quyền quản lý bài tập. Bài tập đã được giao cho lớp. Sinh viên đã thực hiện và nộp bài tập.
- **Hậu điều kiện**: Giáo viên xem được thông tin bài nộp của sinh viên. Hệ thống hiển thị mã bài nộp, thời gian nộp, mã nguồn, kết quả kiểm thử và điểm số nếu đã được chấm. Không có dữ liệu nào bị thay đổi trong hệ thống.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng "Quản lý bài tập".
  2. Hệ thống hiển thị danh sách bài tập.
  3. Giáo viên chọn bài tập cần xem bài nộp.
  4. Hệ thống hiển thị danh sách sinh viên và trạng thái nộp bài.
  5. Giáo viên chọn sinh viên cần xem bài nộp.
  6. Hệ thống hiển thị bài nộp của sinh viên.
  7. Giáo viên chọn một bài nộp.
  8. Hệ thống hiển thị thông tin chi tiết bài nộp gồm mã nguồn, thời gian nộp, kết quả kiểm thử, kết quả phân tích và điểm số nếu có.
  9. Giáo viên xem thông tin bài nộp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Sinh viên không tồn tại: Hệ thống thông báo "Không tìm thấy sinh viên."
  - E3 - Không tìm thấy bài nộp: Hệ thống thông báo "Không tìm thấy bài nộp."
  - E4 - Bài nộp không có mã nguồn: Hệ thống thông báo "Không có mã nguồn trong bài nộp."
  - E5 - Kết quả chấm chưa có: Hệ thống thông báo "Bài nộp chưa có kết quả chấm."
  - E6 - Lỗi khi tải dữ liệu: Hệ thống thông báo "Không thể tải thông tin bài nộp."

---

### UC-25 — Xem điểm
- **Mô tả**: Giáo viên xem điểm và kết quả đánh giá bài làm của sinh viên đối với các bài tập đã được giao.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập hệ thống. Giáo viên có quyền xem kết quả bài tập. Bài tập đã được giao cho lớp.
- **Hậu điều kiện**: Giáo viên xem được điểm và kết quả đánh giá của sinh viên. Thông tin trong hệ thống không bị thay đổi.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng "Xem điểm".
  2. Hệ thống hiển thị danh sách các bài tập đã giao.
  3. Giáo viên chọn bài tập cần xem điểm.
  4. Hệ thống hiển thị danh sách sinh viên trong lớp và điểm tương ứng.
  5. Giáo viên chọn sinh viên cần xem chi tiết.
  6. Hệ thống hiển thị điểm và kết quả đánh giá bài làm của sinh viên.
  7. Giáo viên xem thông tin điểm và kết quả đánh giá.
- **Luồng tương tác thay thế**:
  - 5a. Giáo viên chọn lớp khác: Hệ thống hiển thị danh sách sinh viên và điểm của lớp được chọn.
  - 5b. Giáo viên chọn sinh viên khác: Hệ thống hiển thị điểm và kết quả đánh giá của sinh viên được chọn.
  - 5c. Giáo viên chọn xem chi tiết điểm: Hệ thống hiển thị điểm theo từng tiêu chí đánh giá và kết quả kiểm thử của bài làm.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Không tìm thấy sinh viên: Hệ thống thông báo "Không tìm thấy sinh viên."
  - E3 - Chưa có kết quả chấm: Hệ thống thông báo "Bài tập chưa có kết quả chấm."
  - E4 - Không có điểm: Hệ thống thông báo "Sinh viên chưa có điểm."
  - E5 - Lỗi khi tải dữ liệu: Hệ thống thông báo "Không thể tải thông tin điểm."

---

### UC-26 — Xem AI đánh giá
- **Mô tả**: Giáo viên xem kết quả phân tích và đánh giá bài nộp do hệ thống AI thực hiện nhằm hỗ trợ quá trình chấm bài. Kết quả đánh giá AI được tạo dựa trên kết quả kiểm thử, phân tích mã nguồn và các tiêu chí đánh giá/rubric của bài tập. Kết quả do AI cung cấp chỉ mang tính tham khảo và không tự động trở thành điểm chính thức của sinh viên.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập hệ thống. Giáo viên có quyền xem kết quả đánh giá. Bài tập đã được giao cho lớp.
- **Hậu điều kiện**: Giáo viên xem được kết quả đánh giá của AI. Hệ thống hiển thị điểm AI, kết quả kiểm thử, kết quả phân tích mã nguồn và nhận xét đánh giá. Không có dữ liệu nào bị thay đổi trong hệ thống.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng "Xem AI đánh giá".
  2. Hệ thống hiển thị danh sách bài tập đã được giao.
  3. Giáo viên chọn bài tập cần xem kết quả đánh giá AI.
  4. Hệ thống hiển thị danh sách sinh viên và trạng thái đánh giá AI.
  5. Giáo viên chọn sinh viên cần xem.
  6. Hệ thống hiển thị danh sách bài nộp của sinh viên.
  7. Giáo viên chọn bài nộp cần xem đánh giá AI.
  8. Hệ thống hiển thị kết quả đánh giá AI gồm điểm đánh giá, kết quả Test Case, kết quả phân tích mã nguồn và nhận xét.
  9. Giáo viên xem kết quả đánh giá AI.
- **Luồng tương tác thay thế**:
  - 7a. Giáo viên chọn sinh viên khác: Hệ thống hiển thị danh sách bài nộp của sinh viên được chọn.
  - 7b. Giáo viên chọn bài nộp khác: Hệ thống hiển thị kết quả đánh giá AI của bài nộp được chọn.
  - 7c. Giáo viên chọn xem chi tiết đánh giá: Hệ thống hiển thị chi tiết điểm đánh giá theo từng tiêu chí. Hệ thống hiển thị kết quả từng Test Case và kết quả phân tích mã nguồn tương ứng.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Sinh viên không tồn tại: Hệ thống thông báo "Không tìm thấy sinh viên."
  - E3 - Không tìm thấy bài nộp: Hệ thống thông báo "Không tìm thấy bài nộp."
  - E4 - AI chưa đánh giá bài nộp: Hệ thống thông báo "Bài nộp chưa có kết quả đánh giá AI."
  - E5 - Kết quả đánh giá AI không đầy đủ: Hệ thống thông báo "Kết quả đánh giá AI chưa đầy đủ."
  - E6 - Lỗi khi tải kết quả đánh giá: Hệ thống thông báo "Không thể tải kết quả đánh giá AI."

---

### UC-27 — Đánh giá/chấm bài thủ công
- **Mô tả**: Giáo viên đánh giá và chấm điểm bài làm của sinh viên theo Rubric đã thiết lập cho bài tập.
- **Tác nhân**: Giáo viên.
- **Tiền điều kiện**: Giáo viên đã đăng nhập hệ thống. Giáo viên có quyền chấm bài. Bài tập đã được giao cho lớp. Sinh viên đã nộp bài.
- **Hậu điều kiện**: Điểm và nhận xét của Giáo viên được lưu cho bài nộp. Điểm chỉ trở thành điểm chính thức (Official Score) sau khi Giáo viên thực hiện bước "Xác nhận điểm chính thức"; trước đó chỉ là bản lưu tạm. Điểm Auto-Grader và AI được giữ lại để tham khảo, không bị xóa.
- **Luồng tương tác chính**:
  1. Giáo viên chọn chức năng "Chấm bài".
  2. Hệ thống hiển thị danh sách bài tập đã được giao.
  3. Giáo viên chọn bài tập cần chấm.
  4. Hệ thống hiển thị danh sách sinh viên và trạng thái chấm bài.
  5. Giáo viên chọn sinh viên cần chấm.
  6. Hệ thống hiển thị bài nộp của sinh viên gồm mã nguồn và các thông tin liên quan.
  7. Giáo viên xem và đánh giá bài làm theo từng tiêu chí trong Rubric.
  8. Giáo viên nhập điểm và nhận xét cho bài làm.
  9. Giáo viên chọn "Lưu kết quả".
  10. Hệ thống kiểm tra tính hợp lệ của điểm và thông tin đánh giá.
  11. Hệ thống lưu kết quả chấm bài vào cơ sở dữ liệu (chưa phải điểm chính thức).
  12. Giáo viên chọn "Xác nhận điểm chính thức".
  13. Hệ thống ghi nhận điểm đã lưu thành Official Score và thông báo "Xác nhận điểm chính thức thành công."
- **Luồng tương tác thay thế**:
  - 7a. Giáo viên chỉnh sửa điểm: Hệ thống hiển thị điểm hiện tại. Giáo viên điều chỉnh điểm theo từng tiêu chí trong Rubric. Hệ thống cập nhật tổng điểm theo điểm đã điều chỉnh.
  - 7b. Giáo viên lưu bài chấm tạm thời: Hệ thống lưu các thông tin đánh giá hiện tại nhưng chưa hoàn tất chấm bài. Giáo viên có thể tiếp tục chấm bài sau.
  - 9a. Giáo viên chọn "Lưu kết quả" nhưng chưa xác nhận: Hệ thống lưu bản chấm ở trạng thái chờ xác nhận, Giáo viên có thể quay lại xác nhận sau.
- **Luồng tương tác ngoại lệ**:
  - E1 - Bài tập không tồn tại: Hệ thống thông báo "Không tìm thấy bài tập."
  - E2 - Không tìm thấy bài nộp: Hệ thống thông báo "Không tìm thấy bài nộp."
  - E3 - Bài tập chưa có Rubric: Hệ thống thông báo "Bài tập chưa được thiết lập Rubric."
  - E4 - Điểm không hợp lệ: Hệ thống thông báo "Điểm đánh giá không hợp lệ."
  - E5 - Tổng điểm vượt quá mức quy định: Hệ thống thông báo "Tổng điểm không hợp lệ."
  - E6 - Lỗi khi lưu kết quả: Hệ thống thông báo "Chấm bài thất bại."

---

## PHẦN IV. PHÂN HỆ QUẢN TRỊ VIÊN & GIÁO VỤ (UC-28 ĐẾN UC-39)

---

### UC-28 — Tạo tài khoản người dùng
- **Mô tả**: Quản trị viên tạo tài khoản cho Sinh viên, Giáo viên hoặc Giáo vụ để người dùng có thể đăng nhập và sử dụng hệ thống theo vai trò được cấp.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập, có quyền quản lý tài khoản người dùng.
- **Hậu điều kiện**: Tài khoản Sinh viên, Giáo viên hoặc Giáo vụ được tạo thành công. Thông tin tài khoản được lưu vào cơ sở dữ liệu. Tài khoản được gán đúng vai trò và trạng thái hoạt động. Người dùng phải đổi mật khẩu ở lần đăng nhập đầu tiên.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Quản lý tài khoản".
  2. Hệ thống hiển thị danh sách tài khoản người dùng.
  3. Quản trị viên chọn "Tạo tài khoản".
  4. Hệ thống hiển thị biểu mẫu tạo tài khoản.
  5. Quản trị viên nhập thông tin tài khoản gồm họ tên, email.
  6. Quản trị viên chọn vai trò "Sinh viên", "Giáo viên" hoặc "Giáo vụ".
  7. Quản trị viên chọn "Tạo tài khoản".
  8. Hệ thống kiểm tra tính hợp lệ của thông tin tài khoản.
  9. Hệ thống sinh mật khẩu tạm, đánh dấu bắt buộc đổi và gửi email.
  10. Hệ thống tạo và lưu tài khoản vào cơ sở dữ liệu.
  11. Hệ thống thông báo "Tạo tài khoản thành công."
- **Luồng tương tác thay thế**:
  - 4a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác tạo tài khoản và quay lại danh sách tài khoản.
  - 5a. Quản trị viên tạo tài khoản với trạng thái không hoạt động: Quản trị viên chọn trạng thái tài khoản không hoạt động. Hệ thống tạo tài khoản với trạng thái không hoạt động.
- **Luồng tương tác ngoại lệ**:
  - E1 - Thông tin tài khoản không hợp lệ: Hệ thống thông báo "Thông tin tài khoản không hợp lệ."
  - E2 - Email đã tồn tại: Hệ thống thông báo "Email đã được sử dụng."
  - E3 - Chưa chọn vai trò: Hệ thống thông báo "Vui lòng chọn vai trò cho tài khoản."
  - E4 - Lỗi khi tạo tài khoản: Hệ thống thông báo "Tạo tài khoản thất bại."

---

### UC-29 — Khóa/mở tài khoản
- **Mô tả**: Quản trị viên khóa hoặc mở khóa tài khoản Sinh viên, Giáo viên hoặc Giáo vụ nhằm quản lý trạng thái hoạt động của tài khoản trong hệ thống.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống. Quản trị viên có quyền quản lý tài khoản người dùng. Tài khoản cần khóa hoặc mở khóa đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Trạng thái tài khoản được cập nhật thành công. Tài khoản bị khóa không thể đăng nhập và sử dụng hệ thống. Khi khóa tài khoản, hệ thống thu hồi các phiên đăng nhập hiện tại. Tài khoản được mở khóa có thể đăng nhập và sử dụng hệ thống.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Quản lý tài khoản".
  2. Hệ thống hiển thị danh sách tài khoản người dùng.
  3. Quản trị viên chọn tài khoản cần khóa hoặc mở khóa.
  4. Hệ thống hiển thị thông tin và trạng thái hiện tại của tài khoản.
  5. Quản trị viên chọn "Khóa tài khoản" hoặc "Mở khóa tài khoản".
  6. Hệ thống hiển thị yêu cầu xác nhận thao tác.
  7. Quản trị viên xác nhận thao tác.
  8. Hệ thống cập nhật trạng thái tài khoản.
  9. Hệ thống thông báo thao tác thành công.
- **Luồng tương tác thay thế**:
  - 5a. Quản trị viên chọn "Khóa tài khoản": Hệ thống hiển thị thông tin tài khoản và yêu cầu xác nhận khóa. Quản trị viên xác nhận khóa tài khoản. Hệ thống chuyển trạng thái tài khoản sang "Đã khóa".
  - 5b. Quản trị viên chọn "Mở khóa tài khoản": Hệ thống hiển thị thông tin tài khoản và yêu cầu xác nhận mở khóa. Quản trị viên xác nhận mở khóa tài khoản. Hệ thống chuyển trạng thái tài khoản sang "Hoạt động".
  - 7a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên trạng thái tài khoản.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tài khoản không tồn tại: Hệ thống thông báo "Không tìm thấy tài khoản."
  - E2 - Tài khoản đã ở trạng thái được chọn: Hệ thống thông báo "Trạng thái tài khoản không cần thay đổi."
  - E3 - Tài khoản không thể khóa: Hệ thống thông báo "Không thể khóa tài khoản này."
  - E4 - Lỗi khi cập nhật trạng thái: Hệ thống thông báo "Cập nhật trạng thái tài khoản thất bại."

---

### UC-30 — Xóa tài khoản
- **Mô tả**: Quản trị viên xóa tài khoản Sinh viên, Giáo viên hoặc Giáo vụ khỏi hệ thống.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống. Quản trị viên có quyền quản lý tài khoản người dùng. Tài khoản cần xóa đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Tài khoản được xóa khỏi hệ thống. Tài khoản không thể đăng nhập và sử dụng hệ thống. Thông tin tài khoản được cập nhật hoặc xóa theo chính sách lưu trữ dữ liệu của hệ thống.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Quản lý tài khoản".
  2. Hệ thống hiển thị danh sách tài khoản người dùng.
  3. Quản trị viên chọn tài khoản cần xóa.
  4. Hệ thống hiển thị thông tin tài khoản được chọn.
  5. Quản trị viên chọn "Xóa tài khoản".
  6. Hệ thống hiển thị yêu cầu xác nhận thao tác xóa.
  7. Quản trị viên xác nhận xóa tài khoản.
  8. Hệ thống kiểm tra điều kiện xóa tài khoản.
  9. Hệ thống xóa tài khoản khỏi hệ thống.
  10. Hệ thống thông báo "Xóa tài khoản thành công."
- **Luồng tương tác thay thế**:
  - 7a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác xóa và giữ nguyên tài khoản.
  - 8a. Tài khoản đang có dữ liệu bài nộp hoặc lịch sử điểm số: Hệ thống chuyển sang cơ chế xóa mềm (Soft Delete) để bảo toàn tính toàn vẹn dữ liệu học tập.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tài khoản không tồn tại: Hệ thống thông báo "Không tìm thấy tài khoản."
  - E2 - Tài khoản không thể xóa: Hệ thống thông báo "Không thể xóa tài khoản này."
  - E3 - Lỗi khi xóa tài khoản: Hệ thống thông báo "Xóa tài khoản thất bại."

---

### UC-31 — Phân quyền người dùng
- **Mô tả**: Cho phép Quản trị viên phân công hoặc thay đổi vai trò và quyền nghiệp vụ của người dùng trong phạm vi quản lý toàn trường. Chức năng này áp dụng cho các vai trò Sinh viên, Giáo viên và Giáo vụ.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống. Quản trị viên có quyền quản lý tài khoản và phân quyền người dùng. Tài khoản cần phân quyền đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Vai trò hoặc quyền nghiệp vụ của người dùng được cập nhật thành công. Người dùng có thể thực hiện các chức năng tương ứng với vai trò và quyền mới được cấp. Thông tin phân quyền được lưu vào cơ sở dữ liệu. Các vai trò quản trị cấp hệ thống không bị thay đổi bởi chức năng này.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Phân quyền người dùng".
  2. Hệ thống hiển thị danh sách tài khoản người dùng thuộc phạm vi quản lý.
  3. Quản trị viên chọn tài khoản cần phân quyền.
  4. Hệ thống hiển thị thông tin tài khoản, vai trò và các quyền nghiệp vụ hiện tại.
  5. Hệ thống hiển thị các vai trò và quyền nghiệp vụ mà Quản trị viên được phép cấp hoặc thay đổi.
  6. Quản trị viên chọn vai trò hoặc điều chỉnh các quyền nghiệp vụ của người dùng.
  7. Quản trị viên xác nhận thao tác phân quyền.
  8. Hệ thống kiểm tra tính hợp lệ của vai trò và quyền được chọn.
  9. Hệ thống cập nhật vai trò và quyền của người dùng vào cơ sở dữ liệu.
  10. Hệ thống thông báo "Phân quyền người dùng thành công."
- **Luồng tương tác thay thế**:
  - 6a. Thay đổi vai trò: Quản trị viên chọn vai trò mới. Hệ thống hiển thị các quyền nghiệp vụ tương ứng với vai trò mới. Quản trị viên xác nhận thay đổi. Hệ thống cập nhật vai trò và quyền tương ứng.
  - 6b. Cấp thêm quyền nghiệp vụ: Quản trị viên chọn các quyền cần cấp thêm. Hệ thống cập nhật danh sách quyền được chọn sau khi xác nhận.
  - 6c. Thu hồi quyền nghiệp vụ: Quản trị viên chọn quyền cần thu hồi. Hệ thống hiển thị yêu cầu xác nhận. Quản trị viên xác nhận và hệ thống cập nhật lại quyền của người dùng.
  - 7a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác phân quyền và giữ nguyên vai trò, quyền hiện tại của người dùng.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tài khoản không tồn tại: Hệ thống thông báo "Không tìm thấy tài khoản."
  - E2 - Vai trò không hợp lệ: Hệ thống thông báo "Vai trò được chọn không hợp lệ."
  - E3 - Quyền không hợp lệ: Hệ thống thông báo "Quyền được chọn không hợp lệ."
  - E4 - Cấp quyền vượt phạm vi: Hệ thống từ chối thao tác và thông báo "Bạn không có quyền cấp vai trò hoặc quyền này."
  - E5 - Cố gắng cấp vai trò quản trị cấp hệ thống: Hệ thống từ chối thao tác và thông báo "Không thể cấp vai trò quản trị cấp hệ thống tại chức năng này."
  - E6 - Lỗi cập nhật dữ liệu: Hệ thống thông báo "Phân quyền người dùng thất bại."

---

### UC-32 — Đặt lại mật khẩu
- **Mô tả**: Cho phép Quản trị viên đặt lại mật khẩu cho tài khoản người dùng khi người dùng yêu cầu hoặc gặp vấn đề khi đăng nhập. Hệ thống luôn tự sinh mật khẩu tạm và gửi đến email đã đăng ký của người dùng.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống. Quản trị viên có quyền quản lý tài khoản người dùng. Tài khoản cần đặt lại mật khẩu đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Hệ thống tạo mật khẩu tạm mới cho tài khoản. Mật khẩu tạm được băm và lưu an toàn trong cơ sở dữ liệu. Tài khoản được đánh dấu bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo. Các phiên đăng nhập hiện tại của người dùng được thu hồi. Mật khẩu tạm được gửi đến email đã đăng ký của người dùng. Mật khẩu hiện tại không còn được sử dụng để đăng nhập.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Quản lý tài khoản".
  2. Hệ thống hiển thị danh sách tài khoản người dùng.
  3. Quản trị viên chọn tài khoản cần đặt lại mật khẩu.
  4. Hệ thống hiển thị thông tin tài khoản.
  5. Quản trị viên chọn "Đặt lại mật khẩu".
  6. Hệ thống hiển thị yêu cầu xác nhận đặt lại mật khẩu.
  7. Quản trị viên xác nhận "Đặt lại mật khẩu".
  8. Hệ thống tự sinh mật khẩu tạm mới.
  9. Hệ thống băm mật khẩu tạm và lưu vào cơ sở dữ liệu.
  10. Hệ thống đánh dấu tài khoản bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo.
  11. Hệ thống thu hồi các phiên đăng nhập hiện tại của người dùng.
  12. Hệ thống gửi mật khẩu tạm đến email đã đăng ký của người dùng.
  13. Hệ thống thông báo "Đặt lại mật khẩu thành công."
- **Luồng tương tác thay thế**:
  - 3a. Quản trị viên chọn tài khoản khác: Hệ thống hiển thị thông tin của tài khoản được chọn và Quản trị viên tiếp tục thao tác đặt lại mật khẩu.
  - 6a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác đặt lại mật khẩu và giữ nguyên mật khẩu hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tài khoản không tồn tại: Hệ thống thông báo "Không tìm thấy tài khoản."
  - E2 - Tài khoản không thể đặt lại mật khẩu: Hệ thống thông báo "Không thể đặt lại mật khẩu cho tài khoản này."
  - E3 - Không thể tạo mật khẩu tạm: Hệ thống thông báo "Không thể tạo mật khẩu tạm, vui lòng thử lại sau."
  - E4 - Lỗi cập nhật mật khẩu: Hệ thống thông báo "Đặt lại mật khẩu thất bại."
  - E5 - Lỗi gửi email: Hệ thống thông báo "Không thể gửi mật khẩu tạm đến email của người dùng."

---

### UC-33 — Nhập danh sách từ Excel/CSV
- **Mô tả**: Cho phép Quản trị viên nhập danh sách người dùng từ tệp Excel hoặc CSV vào hệ thống để tạo tài khoản mới hoặc cập nhật thông tin được phép của các tài khoản đã tồn tại theo quy tắc nghiệp vụ.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống và có quyền quản lý và nhập dữ liệu người dùng. Tệp Excel hoặc CSV đã được chuẩn bị theo đúng cấu trúc gồm 5 cột bắt buộc.
- **Hậu điều kiện**: Các bản ghi hợp lệ được nhập thành công vào hệ thống. Tài khoản mới được tạo và lưu vào cơ sở dữ liệu. Với tài khoản đã tồn tại, chỉ thông tin họ tên được cập nhật nếu Quản trị viên chọn cập nhật. Email và vai trò của tài khoản đã tồn tại không bị thay đổi thông qua chức năng này. Hệ thống hiển thị kết quả nhập dữ liệu và danh sách các bản ghi không hợp lệ nếu có.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Nhập danh sách người dùng từ Excel/CSV".
  2. Hệ thống hiển thị giao diện nhập dữ liệu và hướng dẫn định dạng tệp.
  3. Quản trị viên chọn và tải lên tệp Excel hoặc CSV.
  4. Hệ thống kiểm tra định dạng và cấu trúc tệp.
  5. Hệ thống đọc và kiểm tra tính hợp lệ của từng bản ghi.
  6. Hệ thống xác định các bản ghi hợp lệ, không hợp lệ và các tài khoản đã tồn tại; đối với từng lỗi, hệ thống ghi nhận lý do tương ứng.
  7. Hệ thống hiển thị dữ liệu xem trước cùng kết quả kiểm tra để Quản trị viên kiểm tra trước khi nhập.
  8. Quản trị viên xác nhận nhập các bản ghi hợp lệ và lựa chọn cách xử lý đối với tài khoản đã tồn tại.
  9. Hệ thống tạo các tài khoản mới từ các bản ghi hợp lệ. Đối với tài khoản đã tồn tại, hệ thống chỉ cập nhật họ tên nếu Quản trị viên đã chọn cập nhật; email và vai trò được giữ nguyên.
  10. Hệ thống lưu kết quả vào cơ sở dữ liệu.
  11. Hệ thống thông báo kết quả nhập dữ liệu.
- **Luồng tương tác thay thế**:
  - 4a. Tệp không đúng cấu trúc: Hệ thống thông báo lỗi và yêu cầu Quản trị viên chọn tệp khác.
  - 7a. Tệp chứa cả bản ghi hợp lệ và không hợp lệ: Hệ thống hiển thị các bản ghi không hợp lệ cùng lý do lỗi. Quản trị viên có thể tiếp tục nhập các bản ghi hợp lệ.
  - 8a. Tệp chứa tài khoản đã tồn tại: Hệ thống hiển thị danh sách tài khoản đã tồn tại. Quản trị viên chọn bỏ qua hoặc cập nhật họ tên. Email và vai trò không được thay đổi qua chức năng này.
  - 3a. Quản trị viên tải lên tệp khác: Hệ thống loại bỏ dữ liệu xem trước của tệp hiện tại và thực hiện kiểm tra tệp mới.
  - 7b. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác nhập dữ liệu và không thay đổi dữ liệu hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tệp không đúng định dạng: Hệ thống thông báo "Tệp không đúng định dạng Excel hoặc CSV."
  - E2 - Tệp không đúng cấu trúc: Hệ thống thông báo "Cấu trúc tệp không hợp lệ."
  - E3 - Tệp không có dữ liệu: Hệ thống thông báo "Tệp không chứa dữ liệu."
  - E4 - Không có bản ghi hợp lệ: Hệ thống thông báo "Không có dữ liệu hợp lệ để nhập." và không thực hiện nhập dữ liệu.
  - E5 - Lỗi khi đọc hoặc xử lý tệp: Hệ thống thông báo "Không thể đọc hoặc xử lý tệp."
  - E6 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Nhập dữ liệu thất bại."

---

### UC-34 — Tạo lớp
- **Mô tả**: Quản trị viên có thể tạo lớp trong toàn hệ thống; Giáo vụ có thể tạo lớp trong phạm vi Khoa/Bộ môn được phân công.
- **Tác nhân**: Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập với vai trò Quản trị viên (quyền toàn hệ thống) hoặc Giáo vụ (quyền trong phạm vi Khoa/Bộ môn được phân công).
- **Hậu điều kiện**: Lớp học được tạo thành công. Thông tin lớp được lưu vào cơ sở dữ liệu. Lớp có thể được sử dụng để quản lý Sinh viên và Giáo viên.
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị danh sách các lớp học mà Người dùng có quyền xem: Quản trị viên thấy toàn bộ lớp trong trường; Giáo vụ chỉ thấy lớp thuộc Khoa/Bộ môn mình phụ trách.
  3. Người dùng chọn "Tạo lớp".
  4. Hệ thống hiển thị biểu mẫu tạo lớp học gồm tên lớp, mã lớp, mô tả, niên khóa và Khoa/Bộ môn; nếu Người dùng là Giáo vụ, hệ thống tự động gán Khoa/Bộ môn theo phạm vi phụ trách và không cho chọn Khoa/Bộ môn khác.
  5. Người dùng nhập thông tin lớp học và chọn "Tạo lớp".
  6. Hệ thống kiểm tra tính hợp lệ của thông tin lớp học, tính duy nhất của mã lớp và phạm vi Khoa/Bộ môn (nếu là Giáo vụ).
  7. Hệ thống tạo lớp và lưu thông tin vào cơ sở dữ liệu.
  8. Hệ thống thông báo "Tạo lớp thành công." và hiển thị lớp mới trong danh sách.
- **Luồng tương tác thay thế**:
  - 4a. Giáo vụ không cần chọn Khoa/Bộ môn: Hệ thống tự động sử dụng Khoa/Bộ môn thuộc phạm vi phụ trách của Giáo vụ.
  - 5a. Người dùng chọn "Hủy": Hệ thống hủy thao tác tạo lớp và quay lại danh sách lớp.
  - 5b. Người dùng chỉnh sửa thông tin trước khi xác nhận: Hệ thống cho phép tiếp tục chỉnh sửa dữ liệu trước khi tạo lớp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Thông tin lớp không hợp lệ: Hệ thống thông báo "Thông tin lớp không hợp lệ."
  - E2 - Mã lớp đã tồn tại: Hệ thống thông báo "Mã lớp đã tồn tại."
  - E3 - Lỗi khi lưu thông tin lớp: Hệ thống thông báo "Tạo lớp thất bại."
  - E4 - Giáo vụ chọn Khoa/Bộ môn ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền tạo lớp trong Khoa/Bộ môn này."

---

### UC-35 — Chỉnh sửa lớp
- **Mô tả**: Quản trị viên có thể chỉnh sửa lớp trong toàn hệ thống; Giáo vụ có thể chỉnh sửa lớp trong phạm vi Khoa/Bộ môn được phân công.
- **Tác nhân**: Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập với vai trò Quản trị viên (quyền toàn hệ thống) hoặc Giáo vụ (quyền trong phạm vi Khoa/Bộ môn được phân công). Lớp cần chỉnh sửa đã tồn tại và đang ở trạng thái Hoạt động.
- **Hậu điều kiện**: Thông tin lớp được cập nhật thành công. Thông tin mới được lưu vào cơ sở dữ liệu. Các thành viên của lớp tiếp tục được quản lý theo thông tin đã cập nhật.
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị danh sách các lớp mà Người dùng có quyền quản lý: Quản trị viên thấy toàn bộ lớp trong trường; Giáo vụ chỉ thấy lớp thuộc Khoa/Bộ môn mình phụ trách.
  3. Người dùng chọn lớp cần chỉnh sửa.
  4. Hệ thống hiển thị thông tin hiện tại của lớp.
  5. Người dùng chỉnh sửa thông tin lớp.
  6. Người dùng chọn "Lưu thay đổi".
  7. Hệ thống kiểm tra tính hợp lệ của thông tin mới.
  8. Hệ thống cập nhật thông tin lớp vào cơ sở dữ liệu.
  9. Hệ thống thông báo "Chỉnh sửa lớp thành công."
- **Luồng tương tác thay thế**:
  - 5a. Người dùng chọn "Hủy": Hệ thống hủy thao tác chỉnh sửa và giữ nguyên thông tin lớp.
  - 5b. Người dùng thay đổi tên lớp: Người dùng nhập tên lớp mới. Hệ thống kiểm tra tên lớp. Hệ thống cập nhật tên lớp mới.
  - 5c. Người dùng thay đổi thông tin khác của lớp: Người dùng chỉnh sửa thông tin cần thay đổi. Hệ thống cập nhật thông tin lớp theo dữ liệu mới.
  - 6a. Người dùng tiếp tục chỉnh sửa: Hệ thống giữ nguyên dữ liệu đang chỉnh sửa và cho phép Người dùng tiếp tục cập nhật trước khi lưu.
- **Luồng tương tác ngoại lệ**:
  - E1 - Lớp không tồn tại: Hệ thống thông báo "Không tìm thấy lớp."
  - E2 - Thông tin lớp không hợp lệ: Hệ thống thông báo "Thông tin lớp không hợp lệ."
  - E3 - Lỗi khi cập nhật thông tin: Hệ thống thông báo "Chỉnh sửa lớp thất bại."
  - E4 - Giáo vụ thao tác ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền chỉnh sửa lớp thuộc Khoa/Bộ môn khác."

---

### UC-36 — Đóng/ Mở lại lớp học
- **Mô tả**: Đây là chức năng quản lý trạng thái hoạt động của lớp học. Giáo viên thực hiện đóng hoặc mở lại lớp thuộc phạm vi lớp mình phụ trách. Giáo vụ thực hiện đóng hoặc mở lại lớp trong phạm vi Khoa/Bộ môn được phân công. Quản trị viên có quyền đóng hoặc mở lại lớp trong toàn trường.
- **Tác nhân**: Giáo viên, Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập vào hệ thống. Người dùng có quyền quản lý lớp tương ứng với phạm vi được phân công. Lớp học tồn tại trong hệ thống.
- **Hậu điều kiện**: Nếu thực hiện "Đóng lớp", lớp được chuyển từ Hoạt động sang Đã đóng. Nếu thực hiện "Mở lại lớp", lớp được chuyển từ Đã đóng sang Hoạt động. Dữ liệu của lớp vẫn được bảo toàn. Lớp Đã đóng không còn hoạt động bình thường cho đến khi được mở lại.
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị các lớp mà Người dùng được phép quản lý theo phạm vi quyền: Giáo viên (lớp phụ trách), Giáo vụ (lớp thuộc Khoa/Bộ môn phụ trách), Quản trị viên (toàn bộ lớp).
  3. Người dùng chọn lớp cần thay đổi trạng thái.
  4. Hệ thống hiển thị thông tin và trạng thái hiện tại của lớp.
  5. Hệ thống hiển thị thao tác phù hợp với trạng thái hiện tại: "Đóng lớp" nếu lớp đang Hoạt động; "Mở lại lớp" nếu lớp đang Đã đóng.
  6. Người dùng chọn thao tác.
  7. Hệ thống hiển thị yêu cầu xác nhận thao tác.
  8. Người dùng xác nhận thao tác.
  9. Hệ thống kiểm tra trạng thái hiện tại của lớp và phạm vi quyền của Người dùng.
  10. Hệ thống cập nhật trạng thái lớp theo thao tác đã chọn.
  11. Hệ thống thông báo "Cập nhật trạng thái lớp thành công."
- **Luồng tương tác thay thế**:
  - 7a. Người dùng chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên trạng thái hiện tại của lớp.
  - 5a. Lớp đang ở trạng thái Hoạt động: Hệ thống chỉ cho phép thực hiện thao tác "Đóng lớp".
  - 5b. Lớp đang ở trạng thái Đã đóng: Hệ thống chỉ cho phép thực hiện thao tác "Mở lại lớp".
- **Luồng tương tác ngoại lệ**:
  - E1 - Lớp không tồn tại: Hệ thống thông báo "Không tìm thấy lớp học."
  - E2 - Lớp không ở trạng thái phù hợp: Hệ thống thông báo "Lớp không ở trạng thái phù hợp để thực hiện thao tác này."
  - E3 - Người dùng không có quyền thao tác trên lớp: Hệ thống thông báo "Bạn không có quyền thực hiện thao tác trên lớp này."
  - E4 - Giáo vụ thao tác ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền thao tác trên lớp thuộc Khoa/Bộ môn khác."
  - E5 - Không thể cập nhật trạng thái lớp: Hệ thống thông báo "Không thể cập nhật trạng thái lớp, vui lòng thử lại sau."

---

### UC-37 — Quản lý Lưu trữ, Khôi phục & Xóa lớp học
- **Mô tả**: Đây là chức năng quản lý vòng đời dữ liệu lớp học sau khi lớp được đóng. Quản trị viên thực hiện trong toàn hệ thống; Giáo vụ thực hiện trong phạm vi Khoa/Bộ môn được phân công. Chức năng bao gồm Lưu trữ lớp, Khôi phục lớp và Hard Delete lớp theo điều kiện nghiệp vụ.
- **Tác nhân**: Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập với vai trò Quản trị viên hoặc Giáo vụ. Quản trị viên có quyền quản lý lớp trên toàn trường. Giáo vụ có quyền quản lý lớp trong phạm vi Khoa/Bộ môn được phân công. Lớp cần xử lý đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Lớp được chuyển từ "Đã đóng" sang "Lưu trữ" khi thực hiện Lưu trữ. Lớp được khôi phục từ "Lưu trữ" về "Đã đóng" khi thực hiện Khôi phục. Lớp chỉ được Hard Delete khi có 0 Sinh viên, 0 bài tập. Nếu không đủ điều kiện Hard Delete, lớp không bị xóa vật lý và được chuyển sang "Lưu trữ" theo chính sách. Dữ liệu của lớp được bảo lưu khi lớp ở trạng thái "Lưu trữ". Khôi phục lớp không tự động chuyển lớp về "Hoạt động".
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị danh sách các lớp mà Người dùng có quyền quản lý và trạng thái tương ứng: Quản trị viên thấy toàn bộ lớp trong trường; Giáo vụ chỉ thấy lớp thuộc Khoa/Bộ môn mình phụ trách.
  3. Người dùng chọn lớp cần quản lý vòng đời.
  4. Hệ thống hiển thị thông tin và trạng thái hiện tại của lớp.
  5. Hệ thống hiển thị thao tác phù hợp với trạng thái hiện tại của lớp.
  6. Người dùng chọn thao tác "Lưu trữ lớp", "Xóa lớp" hoặc "Khôi phục lớp".
  7. Hệ thống kiểm tra trạng thái lớp và điều kiện thực hiện thao tác.
  8. Hệ thống hiển thị yêu cầu xác nhận thao tác.
  9. Người dùng xác nhận thao tác.
  10. Hệ thống thực hiện thao tác theo chính sách quản lý vòng đời lớp.
  11. Hệ thống thông báo "Thao tác thành công."
- **Luồng tương tác thay thế**:
  - 6a. Người dùng chọn "Lưu trữ lớp": Hệ thống kiểm tra dữ liệu liên quan của lớp. Hệ thống chuyển lớp sang trạng thái "Lưu trữ". Hệ thống ẩn lớp khỏi danh sách lớp học vận hành thông thường.
  - 6b. Người dùng chọn "Xóa lớp": Hệ thống kiểm tra số lượng Sinh viên và bài tập của lớp. Nếu không có cả 2 (0 Sinh viên và 0 bài tập), hệ thống Hard Delete xóa lớp hoàn toàn. Nếu có ít nhất 1 trong 2 (có Sinh viên hoặc có bài tập), hệ thống không xóa vật lý mà chuyển lớp sang trạng thái "Lưu trữ".
  - 6c. Người dùng chọn "Khôi phục lớp": Hệ thống kiểm tra lớp đang ở trạng thái "Lưu trữ". Hệ thống khôi phục lớp về trạng thái "Đã đóng" và giữ nguyên dữ liệu liên quan.
  - 9a. Người dùng chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên trạng thái hiện tại của lớp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Lớp không tồn tại: Hệ thống thông báo "Không tìm thấy lớp học."
  - E2 - Lớp không ở trạng thái phù hợp để thực hiện thao tác này: Hệ thống thông báo "Lớp không ở trạng thái phù hợp để thực hiện thao tác này."
  - E3 - Không thể lưu trữ hoặc khôi phục lớp: Hệ thống thông báo "Không thể cập nhật trạng thái lớp, vui lòng thử lại sau."
  - E4 - Không thể xóa lớp: Hệ thống thông báo "Không thể xóa lớp, vui lòng thử lại sau."
  - E5 - Giáo vụ thao tác ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền thao tác trên lớp thuộc Khoa/Bộ môn khác."

---

### UC-38 — Quản lý sinh viên trong lớp
- **Mô tả**: Đây là chức năng quản lý sinh viên trong lớp. Quản trị viên áp dụng cho toàn hệ thống; Giáo vụ áp dụng cho các lớp thuộc Khoa/Bộ môn được phân công. Người dùng quản lý danh sách sinh viên thuộc một lớp, bao gồm thêm, xóa và xem thông tin sinh viên trong lớp.
- **Tác nhân**: Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập với vai trò Quản trị viên (quyền toàn hệ thống) hoặc Giáo vụ (quyền trong phạm vi Khoa/Bộ môn được phân công). Lớp cần quản lý đã tồn tại và đang ở trạng thái Hoạt động.
- **Hậu điều kiện**: Danh sách sinh viên trong lớp được cập nhật thành công. Thông tin phân lớp của sinh viên được lưu vào cơ sở dữ liệu. Danh sách sinh viên trong lớp phản ánh đúng các thay đổi đã thực hiện.
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị danh sách các lớp mà Người dùng có quyền quản lý: Quản trị viên thấy toàn bộ lớp trong trường; Giáo vụ chỉ thấy lớp thuộc Khoa/Bộ môn mình phụ trách.
  3. Người dùng chọn lớp cần quản lý sinh viên.
  4. Hệ thống hiển thị danh sách sinh viên hiện tại của lớp.
  5. Người dùng chọn thao tác quản lý sinh viên.
  6. Hệ thống hiển thị các chức năng thêm, xóa và xem thông tin sinh viên.
  7. Người dùng thực hiện thao tác thêm, xóa hoặc xem thông tin sinh viên.
  8. Hệ thống kiểm tra tính hợp lệ của thao tác.
  9. Hệ thống cập nhật danh sách sinh viên trong lớp.
  10. Hệ thống thông báo "Cập nhật danh sách sinh viên thành công."
- **Luồng tương tác thay thế**:
  - 5a. Người dùng chọn "Thêm sinh viên": Hệ thống hiển thị danh sách sinh viên chưa thuộc lớp. Người dùng chọn sinh viên cần thêm. Người dùng xác nhận thêm sinh viên vào lớp. Hệ thống cập nhật danh sách sinh viên của lớp.
  - 5b. Người dùng chọn "Xóa sinh viên": Người dùng chọn sinh viên cần xóa khỏi lớp. Hệ thống yêu cầu xác nhận thao tác. Người dùng xác nhận xóa sinh viên khỏi lớp. Hệ thống cập nhật danh sách sinh viên của lớp.
  - 5c. Người dùng chọn "Xem thông tin sinh viên": Hệ thống hiển thị thông tin của sinh viên được chọn.
  - 5d. Người dùng chọn nhiều sinh viên: Hệ thống cho phép Người dùng chọn nhiều sinh viên để thêm hoặc xóa khỏi lớp. Người dùng xác nhận thao tác. Hệ thống cập nhật danh sách sinh viên theo lựa chọn.
  - 5e. Người dùng chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên danh sách sinh viên của lớp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Lớp không tồn tại: Hệ thống thông báo "Không tìm thấy lớp."
  - E2 - Sinh viên không tồn tại: Hệ thống thông báo "Không tìm thấy sinh viên."
  - E3 - Sinh viên đã thuộc lớp: Hệ thống thông báo "Sinh viên đã thuộc lớp này."
  - E4 - Sinh viên chưa thuộc lớp: Hệ thống thông báo "Sinh viên không thuộc lớp này."
  - E5 - Không thể thêm hoặc xóa sinh viên: Hệ thống thông báo "Không thể cập nhật sinh viên trong lớp."
  - E6 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Cập nhật danh sách sinh viên thất bại."
  - E7 - Giáo vụ thao tác ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền quản lý sinh viên của lớp thuộc Khoa/Bộ môn khác."

---

### UC-39 — Phân công Giáo viên vào lớp
- **Mô tả**: Cho phép Quản trị viên phân công một hoặc nhiều Giáo viên phụ trách giảng dạy cho lớp trong phạm vi toàn trường; Giáo vụ thực hiện phân công trong phạm vi Khoa/Bộ môn được phân công.
- **Tác nhân**: Quản trị viên, Giáo vụ.
- **Tiền điều kiện**: Người dùng đã đăng nhập với vai trò Quản trị viên hoặc Giáo vụ. Quản trị viên có quyền quản lý lớp trong toàn trường. Giáo vụ có quyền quản lý lớp trong phạm vi Khoa/Bộ môn được phân công. Lớp cần phân công đã tồn tại và đang ở trạng thái Hoạt động. Giáo viên cần phân công đã tồn tại trong hệ thống.
- **Hậu điều kiện**: Một hoặc nhiều Giáo viên được phân công thành công vào lớp. Thông tin phân công được lưu vào cơ sở dữ liệu. Giáo viên được phân công có thể quản lý và giảng dạy lớp theo quyền được cấp.
- **Luồng tương tác chính**:
  1. Người dùng chọn chức năng "Quản lý lớp".
  2. Hệ thống hiển thị danh sách các lớp mà Người dùng có quyền quản lý: Quản trị viên thấy toàn bộ lớp trong trường; Giáo vụ chỉ thấy lớp thuộc Khoa/Bộ môn mình phụ trách.
  3. Người dùng chọn lớp cần phân công Giáo viên.
  4. Hệ thống hiển thị thông tin và danh sách Giáo viên đang phụ trách lớp.
  5. Người dùng chọn chức năng "Phân công Giáo viên".
  6. Hệ thống hiển thị danh sách Giáo viên có thể phân công.
  7. Người dùng chọn Giáo viên cần phân công.
  8. Người dùng xác nhận phân công.
  9. Hệ thống kiểm tra tính hợp lệ của thông tin phân công.
  10. Hệ thống lưu thông tin phân công vào cơ sở dữ liệu.
  11. Hệ thống thông báo "Phân công Giáo viên thành công."
- **Luồng tương tác thay thế**:
  - 7a. Người dùng phân công nhiều Giáo viên: Hệ thống cho phép Người dùng chọn nhiều Giáo viên. Người dùng xác nhận phân công. Hệ thống lưu thông tin phân công của các Giáo viên được chọn.
  - 7b. Người dùng thay đổi Giáo viên đang phụ trách: Hệ thống hiển thị danh sách Giáo viên đang được phân công. Người dùng chọn Giáo viên cần thay đổi và Giáo viên mới. Người dùng xác nhận thay đổi. Hệ thống cập nhật thông tin phân công.
  - 7c. Người dùng hủy phân công Giáo viên: Người dùng chọn Giáo viên cần hủy phân công. Hệ thống yêu cầu xác nhận. Người dùng xác nhận hủy phân công. Hệ thống xóa thông tin phân công của Giáo viên khỏi lớp.
  - 8a. Người dùng chọn "Hủy" tại bước xác nhận: Hệ thống hủy thao tác phân công và giữ nguyên danh sách Giáo viên của lớp.
- **Luồng tương tác ngoại lệ**:
  - E1 - Lớp không tồn tại: Hệ thống thông báo "Không tìm thấy lớp."
  - E2 - Giáo viên không tồn tại: Hệ thống thông báo "Không tìm thấy Giáo viên."
  - E3 - Giáo viên đã được phân công: Hệ thống thông báo "Giáo viên đã được phân công vào lớp này."
  - E4 - Lỗi khi lưu thông tin phân công: Hệ thống thông báo "Phân công Giáo viên thất bại."
  - E5 - Giáo vụ thao tác ngoài phạm vi phụ trách: Hệ thống thông báo "Bạn không có quyền phân công Giáo viên cho lớp thuộc Khoa/Bộ môn khác."
  - E6 - Lỗi khi lưu thông tin phân công: Hệ thống thông báo "Phân công Giáo viên thất bại."

---

## PHẦN V. PHÂN HỆ QUẢN TRỊ HỆ THỐNG & TỔ CHỨC (UC-40 ĐẾN UC-44)

---

### UC-40 — Quản lý cấu hình AI
- **Mô tả**: Quản trị viên hệ thống quản lý các cấu hình AI được sử dụng trong hệ thống, bao gồm thiết lập, cập nhật và kích hoạt hoặc vô hiệu hóa cấu hình.
- **Tác nhân**: Quản trị viên hệ thống.
- **Tiền điều kiện**: Quản trị viên hệ thống đã đăng nhập, có quyền quản lý cấu hình AI. Các thành phần AI cần cấu hình đã được tích hợp vào hệ thống.
- **Hậu điều kiện**: Cấu hình AI được tạo hoặc cập nhật thành công. Thông tin cấu hình được lưu vào hệ thống. Hệ thống sử dụng cấu hình đang được kích hoạt cho các chức năng AI tương ứng.
- **Luồng tương tác chính**:
  1. Quản trị viên hệ thống chọn chức năng "Quản lý cấu hình AI".
  2. Hệ thống hiển thị danh sách các cấu hình AI hiện có.
  3. Quản trị viên hệ thống chọn cấu hình cần thiết lập hoặc chỉnh sửa.
  4. Hệ thống hiển thị thông tin cấu hình hiện tại.
  5. Quản trị viên hệ thống nhập hoặc chỉnh sửa các thông số cấu hình AI.
  6. Quản trị viên hệ thống chọn "Lưu cấu hình".
  7. Hệ thống kiểm tra tính hợp lệ của các thông số.
  8. Hệ thống lưu cấu hình vào cơ sở dữ liệu.
  9. Hệ thống thông báo "Cập nhật cấu hình AI thành công."
- **Luồng tương tác thay thế**:
  - 4a. Quản trị viên hệ thống chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên cấu hình hiện tại.
  - 4b. Quản trị viên hệ thống tạo cấu hình AI mới: Hệ thống hiển thị biểu mẫu tạo cấu hình. Quản trị viên hệ thống nhập các thông số cấu hình. Quản trị viên hệ thống xác nhận tạo cấu hình. Hệ thống lưu cấu hình AI mới.
  - 4c. Quản trị viên hệ thống kích hoạt cấu hình: Quản trị viên hệ thống chọn cấu hình cần kích hoạt. Hệ thống yêu cầu xác nhận. Quản trị viên hệ thống xác nhận kích hoạt. Hệ thống chuyển cấu hình sang trạng thái hoạt động.
  - 4d. Quản trị viên hệ thống vô hiệu hóa cấu hình: Quản trị viên hệ thống chọn cấu hình cần vô hiệu hóa. Hệ thống yêu cầu xác nhận. Quản trị viên hệ thống xác nhận vô hiệu hóa. Hệ thống chuyển cấu hình sang trạng thái không hoạt động.
  - 4e. Quản trị viên hệ thống kiểm tra cấu hình: Quản trị viên hệ thống chọn chức năng kiểm tra cấu hình. Hệ thống thực hiện kiểm tra kết nối và tính hợp lệ của cấu hình. Hệ thống hiển thị kết quả kiểm tra.
- **Luồng tương tác ngoại lệ**:
  - E1 - Cấu hình không hợp lệ: Hệ thống thông báo "Thông tin cấu hình AI không hợp lệ."
  - E2 - Thiếu thông số bắt buộc: Hệ thống thông báo "Vui lòng nhập đầy đủ các thông số bắt buộc."
  - E3 - Cấu hình đã tồn tại: Hệ thống thông báo "Cấu hình AI đã tồn tại."
  - E4 - Kết nối dịch vụ AI thất bại: Hệ thống thông báo "Không thể kết nối đến dịch vụ AI."
  - E5 - Không thể kích hoạt cấu hình: Hệ thống thông báo "Không thể kích hoạt cấu hình AI."
  - E6 - Lỗi khi lưu cấu hình: Hệ thống thông báo "Cập nhật cấu hình AI thất bại."

---

### UC-41 — Cấu hình Docker Sandbox
- **Mô tả**: Quản trị viên hệ thống cấu hình môi trường Docker Sandbox để thực thi và kiểm tra mã nguồn của sinh viên một cách an toàn.
- **Tác nhân**: Quản trị viên hệ thống.
- **Tiền điều kiện**: Quản trị viên hệ thống đã đăng nhập hệ thống. Quản trị viên hệ thống có quyền quản lý cấu hình Docker Sandbox. Dịch vụ Docker Sandbox đã được tích hợp vào hệ thống.
- **Hậu điều kiện**: Cấu hình Docker Sandbox được lưu thành công. Docker Sandbox sử dụng cấu hình mới cho quá trình thực thi mã nguồn. Các thông số cấu hình được áp dụng cho các phiên thực thi mới.
- **Luồng tương tác chính**:
  1. Quản trị viên hệ thống chọn chức năng "Cấu hình Docker Sandbox".
  2. Hệ thống hiển thị các thông số cấu hình hiện tại.
  3. Quản trị viên hệ thống nhập hoặc chỉnh sửa các thông số cấu hình.
  4. Quản trị viên hệ thống chọn "Lưu cấu hình".
  5. Hệ thống kiểm tra tính hợp lệ của các thông số.
  6. Hệ thống lưu cấu hình vào cơ sở dữ liệu.
  7. Hệ thống áp dụng cấu hình cho Docker Sandbox.
  8. Hệ thống thông báo "Cấu hình Docker Sandbox thành công."
- **Luồng tương tác thay thế**:
  - 3a. Quản trị viên hệ thống chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên cấu hình hiện tại.
  - 3b. Quản trị viên hệ thống khôi phục cấu hình mặc định: Quản trị viên hệ thống chọn "Khôi phục mặc định". Hệ thống hiển thị các thông số cấu hình mặc định. Quản trị viên hệ thống xác nhận khôi phục. Hệ thống cập nhật cấu hình Docker Sandbox về giá trị mặc định.
  - 3c. Quản trị viên hệ thống kiểm tra cấu hình: Quản trị viên hệ thống chọn chức năng "Kiểm tra cấu hình". Hệ thống kiểm tra kết nối và khả năng khởi tạo Docker Sandbox. Hệ thống hiển thị kết quả kiểm tra.
  - 3d. Quản trị viên hệ thống cập nhật giới hạn thực thi: Quản trị viên hệ thống điều chỉnh thời gian chạy, bộ nhớ và tài nguyên được cấp cho Docker Sandbox. Hệ thống kiểm tra và lưu các giới hạn mới.
- **Luồng tương tác ngoại lệ**:
  - E1 - Thông số cấu hình không hợp lệ: Hệ thống thông báo "Thông số cấu hình Docker Sandbox không hợp lệ."
  - E2 - Thiếu thông số bắt buộc: Hệ thống thông báo "Vui lòng nhập đầy đủ các thông số bắt buộc."
  - E3 - Docker Sandbox không khả dụng: Hệ thống thông báo "Docker Sandbox hiện không khả dụng."
  - E4 - Không thể kết nối Docker: Hệ thống thông báo "Không thể kết nối đến Docker."
  - E5 - Cấu hình vượt quá giới hạn cho phép: Hệ thống thông báo "Thông số cấu hình vượt quá giới hạn cho phép."
  - E6 - Lỗi khi lưu cấu hình: Hệ thống thông báo "Cấu hình Docker Sandbox thất bại."

---

### UC-42 — Giám sát Docker Sandbox
- **Mô tả**: Quản trị viên hệ thống giám sát trạng thái và hoạt động của Docker Sandbox để theo dõi tình trạng thực thi mã nguồn và phát hiện các vấn đề trong quá trình vận hành.
- **Tác nhân**: Quản trị viên hệ thống.
- **Tiền điều kiện**: Quản trị viên hệ thống đã đăng nhập hệ thống. Quản trị viên hệ thống có quyền giám sát Docker Sandbox. Dịch vụ Docker Sandbox đã được tích hợp vào hệ thống.
- **Hậu điều kiện**: Quản trị viên hệ thống xem được trạng thái và thông tin hoạt động của Docker Sandbox. Hệ thống ghi nhận các sự kiện và lỗi phát sinh trong quá trình thực thi. Không có dữ liệu cấu hình bị thay đổi. Nếu Quản trị viên hệ thống dừng một phiên thực thi, phiên đó được kết thúc; hệ thống lưu trạng thái và kết quả đã thực hiện đến thời điểm dừng, đồng thời cập nhật bài nộp liên quan sang trạng thái "Bị gián đoạn".
- **Luồng tương tác chính**:
  1. Quản trị viên hệ thống chọn chức năng "Giám sát Docker Sandbox".
  2. Hệ thống kiểm tra trạng thái của Docker Sandbox.
  3. Hệ thống hiển thị trạng thái hoạt động của Docker Sandbox.
  4. Hệ thống hiển thị thông tin các phiên thực thi đang hoạt động và đã hoàn thành.
  5. Quản trị viên hệ thống xem mức sử dụng tài nguyên của Docker Sandbox.
  6. Quản trị viên hệ thống xem các lỗi hoặc sự kiện phát sinh trong quá trình thực thi.
- **Luồng tương tác thay thế**:
  - 4a. Quản trị viên hệ thống chọn một phiên thực thi: Hệ thống hiển thị thông tin chi tiết của phiên thực thi gồm thời gian, trạng thái và kết quả.
  - 4b. Quản trị viên hệ thống xem nhật ký hoạt động: Hệ thống hiển thị nhật ký hoạt động của Docker Sandbox để xem các sự kiện và lỗi phát sinh.
  - 4c. Quản trị viên hệ thống làm mới thông tin giám sát: Hệ thống cập nhật trạng thái và thông tin tài nguyên mới nhất.
  - 4d. Quản trị viên hệ thống dừng phiên thực thi: Quản trị viên hệ thống chọn phiên thực thi cần dừng. Hệ thống yêu cầu xác nhận thao tác. Quản trị viên hệ thống xác nhận dừng phiên. Hệ thống dừng phiên thực thi được chọn, ghi nhận thao tác vào System Logs và cập nhật trạng thái bài nộp liên quan.
- **Luồng tương tác ngoại lệ**:
  - E1 - Docker Sandbox không khả dụng: Hệ thống thông báo "Docker Sandbox hiện không khả dụng."
  - E2 - Không thể lấy trạng thái Docker Sandbox: Hệ thống thông báo "Không thể lấy trạng thái Docker Sandbox."
  - E3 - Không thể lấy thông tin tài nguyên: Hệ thống thông báo "Không thể lấy thông tin tài nguyên."
  - E4 - Không tìm thấy phiên thực thi: Hệ thống thông báo "Không tìm thấy phiên thực thi."
  - E5 - Không thể dừng phiên thực thi: Hệ thống thông báo "Không thể dừng phiên thực thi."
  - E6 - Lỗi khi tải nhật ký: Hệ thống thông báo "Không thể tải nhật ký hoạt động."

---

### UC-43 — Quản lý tổ chức, Khoa/Bộ môn & Phân công Giáo vụ
- **Mô tả**: Quản trị viên quản lý thông tin tổ chức và cơ cấu Khoa/Bộ môn trực thuộc, đồng thời gán tài khoản Giáo vụ phụ trách từng Khoa/Bộ môn.
- **Tác nhân**: Quản trị viên.
- **Tiền điều kiện**: Quản trị viên đã đăng nhập hệ thống. Quản trị viên có quyền quản lý tổ chức và Khoa/Bộ môn.
- **Hậu điều kiện**: Thông tin tổ chức hoặc Khoa/Bộ môn được tạo, cập nhật hoặc thay đổi trạng thái thành công. Tài khoản Giáo vụ được gán đúng Khoa/Bộ môn phụ trách. Thông tin được lưu vào cơ sở dữ liệu.
- **Luồng tương tác chính**:
  1. Quản trị viên chọn chức năng "Quản lý tổ chức".
  2. Hệ thống hiển thị danh sách tổ chức và cơ cấu Khoa/Bộ môn trực thuộc.
  3. Quản trị viên chọn một thao tác: Tạo tổ chức, Tạo Khoa/Bộ môn, Chỉnh sửa, Khóa/mở khóa, Xóa, hoặc Phân công Giáo vụ.
  4. Hệ thống hiển thị biểu mẫu hoặc yêu cầu xác nhận tương ứng.
  5. Quản trị viên nhập thông tin hoặc xác nhận thao tác.
  6. Hệ thống kiểm tra tính hợp lệ của dữ liệu.
  7. Hệ thống cập nhật thông tin, trạng thái hoặc thông tin phân công tương ứng.
  8. Hệ thống thông báo thao tác thành công.
- **Luồng tương tác thay thế**:
  - 3a. Quản trị viên chọn "Tạo tổ chức": Hệ thống hiển thị biểu mẫu tạo tổ chức mới.
  - 3b. Quản trị viên chọn "Tạo Khoa/Bộ môn": Quản trị viên chọn tổ chức trực thuộc và nhập tên Khoa/Bộ môn. Hệ thống tạo Khoa/Bộ môn mới.
  - 3c. Quản trị viên chọn "Chỉnh sửa": Hệ thống hiển thị thông tin hiện tại của tổ chức hoặc Khoa/Bộ môn được chọn để cập nhật.
  - 3d. Quản trị viên chọn "Khóa/mở khóa tổ chức": Hệ thống cập nhật trạng thái tổ chức.
  - 3e. Quản trị viên chọn "Xóa": Hệ thống kiểm tra dữ liệu liên quan trước khi xóa tổ chức hoặc Khoa/Bộ môn.
  - 3f. Quản trị viên chọn "Phân công Giáo vụ": Quản trị viên chọn tài khoản Giáo vụ và Khoa/Bộ môn cần phụ trách. Quản trị viên xác nhận. Hệ thống lưu thông tin phân công (một Giáo vụ có thể phụ trách một hoặc nhiều Khoa/Bộ môn).
  - 7a. Quản trị viên chọn "Hủy": Hệ thống hủy thao tác và giữ nguyên dữ liệu hiện tại.
- **Luồng tương tác ngoại lệ**:
  - E1 - Tổ chức hoặc Khoa/Bộ môn không tồn tại: Hệ thống thông báo "Không tìm thấy tổ chức hoặc Khoa/Bộ môn."
  - E2 - Thông tin không hợp lệ: Hệ thống thông báo "Thông tin không hợp lệ."
  - E3 - Tổ chức hoặc Khoa/Bộ môn đã tồn tại: Hệ thống thông báo "Tên đã tồn tại."
  - E4 - Đang có dữ liệu liên quan: Hệ thống thông báo "Đang có dữ liệu liên quan và không thể xóa."
  - E5 - Giáo vụ đã được phân công Khoa/Bộ môn này: Hệ thống thông báo "Giáo vụ đã phụ trách Khoa/Bộ môn này."
  - E6 - Lỗi khi lưu dữ liệu: Hệ thống thông báo "Thao tác thất bại."

---

### UC-44 — Quản lý System Logs
- **Mô tả**: Quản trị viên hệ thống xem, tìm kiếm và theo dõi các System Logs được ghi nhận trong quá trình hoạt động của hệ thống nhằm hỗ trợ giám sát và kiểm tra sự cố.
- **Tác nhân**: Quản trị viên hệ thống.
- **Tiền điều kiện**: Quản trị viên hệ thống đã đăng nhập hệ thống. Quản trị viên hệ thống có quyền quản lý System Logs. Hệ thống đã ghi nhận System Logs.
- **Hậu điều kiện**: Quản trị viên hệ thống xem được các System Logs theo nhu cầu. Thông tin nhật ký không bị thay đổi trong quá trình xem và tra cứu. Các thao tác quản lý System Logs được ghi nhận nếu hệ thống có hỗ trợ.
- **Luồng tương tác chính**:
  1. Quản trị viên hệ thống chọn chức năng "Quản lý System Logs".
  2. Hệ thống hiển thị danh sách System Logs.
  3. Quản trị viên hệ thống xem thông tin nhật ký gồm thời gian, người dùng, hành động, loại sự kiện và trạng thái.
  4. Quản trị viên hệ thống chọn điều kiện tìm kiếm hoặc lọc System Logs.
  5. Hệ thống xử lý điều kiện tìm kiếm hoặc lọc.
  6. Hệ thống hiển thị các System Logs phù hợp.
  7. Quản trị viên hệ thống chọn một System Log để xem chi tiết.
  8. Hệ thống hiển thị thông tin chi tiết của System Log được chọn.
- **Luồng tương tác thay thế**:
  - 4a. Quản trị viên hệ thống tìm kiếm System Logs: Quản trị viên hệ thống nhập từ khóa tìm kiếm. Hệ thống hiển thị các System Logs phù hợp.
  - 4b. Quản trị viên hệ thống lọc System Logs: Quản trị viên hệ thống chọn khoảng thời gian, loại sự kiện hoặc trạng thái. Hệ thống hiển thị các System Logs theo điều kiện đã chọn.
  - 4c. Quản trị viên hệ thống xem chi tiết System Log: Quản trị viên hệ thống chọn một System Log. Hệ thống hiển thị toàn bộ thông tin chi tiết của System Log.
  - 4d. Quản trị viên hệ thống xuất System Logs: Quản trị viên hệ thống chọn khoảng dữ liệu cần xuất. Hệ thống tạo tệp chứa các System Logs được chọn. Hệ thống cung cấp tệp cho quản trị viên hệ thống.
- **Luồng tương tác ngoại lệ**:
  - E1 - Không tìm thấy System Logs: Hệ thống thông báo "Không tìm thấy System Logs phù hợp."
  - E2 - Điều kiện tìm kiếm không hợp lệ: Hệ thống thông báo "Điều kiện tìm kiếm không hợp lệ."
  - E3 - System Log không tồn tại: Hệ thống thông báo "Không tìm thấy System Log."
  - E4 - Không thể tải System Logs: Hệ thống thông báo "Không thể tải System Logs."
  - E5 - Lỗi khi xuất System Logs: Hệ thống thông báo "Không thể xuất System Logs."
