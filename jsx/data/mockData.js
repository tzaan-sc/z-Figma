export const USERS = [
  {
    id: 1,
    code: 'SV2024001',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@univ.edu.vn',
    role: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'NA',
    phone: '0987654321',
    department: 'Khoa Công nghệ Thông tin',
    classId: 1,
    className: 'CNTT-K18A',
    status: 'ACTIVE'
  },
  {
    id: 2,
    code: 'SV2024002',
    name: 'Lê Thị Bình',
    email: 'binh.le@univ.edu.vn',
    role: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'LB',
    phone: '0912345678',
    department: 'Khoa Công nghệ Thông tin',
    classId: 1,
    className: 'CNTT-K18A',
    status: 'ACTIVE'
  },
  {
    id: 3,
    code: 'GV2020015',
    name: 'TS. Trần Minh Tuấn',
    email: 'tuan.tran@univ.edu.vn',
    role: 'teacher',
    roleLabel: 'Giảng viên',
    avatar: 'TT',
    phone: '0903112233',
    department: 'Khoa Công nghệ Thông tin',
    status: 'ACTIVE'
  },
  {
    id: 4,
    code: 'GVU2021004',
    name: 'Đỗ Mai Lan',
    email: 'lan.do@univ.edu.vn',
    role: 'dept_admin',
    roleLabel: 'Giáo vụ Khoa',
    avatar: 'DL',
    phone: '0905667788',
    department: 'Khoa Công nghệ Thông tin',
    status: 'ACTIVE'
  },
  {
    id: 5,
    code: 'QTV2019001',
    name: 'ThS. Phạm Hoàng Sơn',
    email: 'son.pham@univ.edu.vn',
    role: 'admin',
    roleLabel: 'Quản trị viên (Đào tạo)',
    avatar: 'PS',
    phone: '0908990011',
    department: 'Phòng Đào tạo',
    status: 'ACTIVE'
  },
  {
    id: 6,
    code: 'SYS2018001',
    name: 'Lê Quốc Huy',
    email: 'huy.it@univ.edu.vn',
    role: 'sys_admin',
    roleLabel: 'Quản trị viên hệ thống (IT)',
    avatar: 'LH',
    phone: '0901223344',
    department: 'Trung tâm CNTT & Hạ tầng',
    status: 'ACTIVE'
  }
];

export const DEPARTMENTS = [
  { id: 1, code: 'CNTT', name: 'Khoa Công nghệ Thông tin', manager: 'Đỗ Mai Lan', classCount: 8, teacherCount: 24 },
  { id: 2, code: 'KTPM', name: 'Khoa Kỹ thuật Phần mềm', manager: 'Vũ Thị Hạnh', classCount: 6, teacherCount: 18 },
  { id: 3, code: 'HTTT', name: 'Khoa Hệ thống Thông tin', manager: 'Nguyễn Đình Trọng', classCount: 5, teacherCount: 14 }
];

export const CLASSES = [
  {
    id: 1,
    code: 'CNTT-K18A',
    name: 'Lập trình Cấu trúc dữ liệu & Giải thuật - K18A',
    departmentId: 1,
    departmentName: 'Khoa Công nghệ Thông tin',
    teacherId: 3,
    teacherName: 'TS. Trần Minh Tuấn',
    status: 'ACTIVE', // ACTIVE, CLOSED, ARCHIVED
    studentCount: 42,
    assignmentCount: 4,
    semester: 'Học kỳ 1 - 2026/2027'
  },
  {
    id: 2,
    code: 'CNTT-K18B',
    name: 'Lập trình Cơ sở - K18B',
    departmentId: 1,
    departmentName: 'Khoa Công nghệ Thông tin',
    teacherId: 3,
    teacherName: 'TS. Trần Minh Tuấn',
    status: 'ACTIVE',
    studentCount: 38,
    assignmentCount: 3,
    semester: 'Học kỳ 1 - 2026/2027'
  },
  {
    id: 3,
    code: 'KTPM-K19A',
    name: 'Kỹ thuật Lập trình Nâng cao - K19A',
    departmentId: 2,
    departmentName: 'Khoa Kỹ thuật Phần mềm',
    teacherId: 3,
    teacherName: 'TS. Trần Minh Tuấn',
    status: 'CLOSED', // Đã đóng
    studentCount: 35,
    assignmentCount: 5,
    semester: 'Học kỳ 2 - 2025/2026'
  },
  {
    id: 4,
    code: 'TEST-ZERO-CLASS',
    name: 'Lớp Thử nghiệm Rỗng',
    departmentId: 1,
    departmentName: 'Khoa Công nghệ Thông tin',
    teacherId: null,
    teacherName: 'Chưa phân công',
    status: 'ARCHIVED',
    studentCount: 0,
    assignmentCount: 0,
    semester: 'Học kỳ Hè 2025'
  }
];

export const ASSIGNMENTS = [
  {
    id: 1,
    code: 'BT01-REV-STR',
    title: 'Đảo ngược chuỗi từ và tối ưu bộ nhớ',
    classId: 1,
    className: 'CNTT-K18A',
    teacherId: 3,
    language: 'Python',
    difficulty: 'Easy',
    timeLimit: 1.0,
    memoryLimit: 128,
    deadline: '2026-10-15 23:59:59',
    isClosed: true,
    description: `### Yêu cầu bài toán\nCho một chuỗi văn bản $S$ chứa các từ cách nhau bởi khoảng trắng. Hãy viết chương trình đảo ngược thứ tự các từ trong chuỗi nhưng vẫn giữ nguyên thứ tự các ký tự trong từng từ, đồng thời loại bỏ các khoảng trắng thừa ở đầu, cuối và giữa các từ.\n\n### Định dạng Input\n- Dòng duy nhất chứa chuỗi $S$ ($1 \\le |S| \\le 10^5$).\n\n### Định dạng Output\n- In ra chuỗi sau khi đã xử lý.\n\n### Ràng buộc tài nguyên\n- Thời gian chạy tối đa: **1.0 giây**.\n- Giới hạn bộ nhớ: **128 MB**.\n- Không được sử dụng các thư viện ngoài standard library.`,
    sampleTests: [
      { id: 'S1', input: 'the sky is blue', output: 'blue is sky the' },
      { id: 'S2', input: '  hello   world  ', output: 'world hello' }
    ],
    hiddenTests: [
      { id: 'H1', input: 'a good   example', expected: 'example good a', weight: 25 },
      { id: 'H2', input: 'singleword', expected: 'singleword', weight: 25 },
      { id: 'H3', input: '   multiple    spaces    everywhere   ', expected: 'everywhere spaces multiple', weight: 25 },
      { id: 'H4', input: 'verylongstring...' , expected: '...', weight: 25 }
    ],
    rubrics: [
      { id: 'R1', criterion: 'Correctness (Độ đúng Test Cases)', weight: 50, autoCalculated: true, desc: 'Tính theo tỷ lệ vượt qua Hidden Test Cases trong Docker Sandbox.' },
      { id: 'R2', criterion: 'Code Quality & Style', weight: 20, autoCalculated: false, desc: 'Độ chuẩn PEP8, đặt tên biến rõ ràng, module hóa tốt.' },
      { id: 'R3', criterion: 'Time & Memory Complexity', weight: 20, autoCalculated: false, desc: 'Độ phức tạp thuật toán O(N) và bộ nhớ tối ưu.' },
      { id: 'R4', criterion: 'Edge Cases Handling', weight: 10, autoCalculated: false, desc: 'Xử lý chuỗi rỗng, toàn khoảng trắng, chuỗi siêu dài.' }
    ],
    // Student's submission for current user (Nguyen Van An)
    studentSubmission: {
      status: 'COMPLETED',
      triggerType: 'MANUAL',
      submittedAt: '2026-10-14 20:15:30',
      code: `def reverse_words(s: str) -> str:
    # Tach cac tu va bo qua khoang trang thua
    words = s.strip().split()
    # Dao nguoc danh sach tu va noi lai
    return " ".join(reversed(words))

if __name__ == "__main__":
    import sys
    input_str = sys.stdin.read().strip()
    print(reverse_words(input_str))`,
      autoScore: 10.0,
      officialScore: 9.5,
      teacherFeedback: 'Thuật toán tối ưu, code ngắn gọn rõ ràng. Trừ 0.5 điểm vì chưa có docstring giải thích chi tiết hàm.',
      testResults: [
        { testId: 'H1', status: 'AC', time: '0.04s', memory: '14.2MB', points: 25 },
        { testId: 'H2', status: 'AC', time: '0.03s', memory: '14.1MB', points: 25 },
        { testId: 'H3', status: 'AC', time: '0.04s', memory: '14.3MB', points: 25 },
        { testId: 'H4', status: 'AC', time: '0.05s', memory: '15.0MB', points: 25 }
      ],
      aiReview: {
        score: 9.2,
        cyclomaticComplexity: 1,
        timeComplexityEstimate: 'O(N) - Tối ưu thời gian',
        spaceComplexityEstimate: 'O(N) - Phân mảnh chuỗi',
        astFeedback: 'Cấu trúc cú pháp sạch sẽ, không có vòng lặp lồng thừa thãi.',
        summary: 'Mã nguồn đáp ứng toàn diện yêu cầu thuật toán. Đã xử lý triệt để khoảng trắng thừa nhờ split() mặc định.',
        suggestions: [
          'Có thể bổ sung type annotation chặt chẽ hơn và docstring theo chuẩn PEP257.',
          'Đối với chuỗi siêu lớn dạng luồng, có thể xử lý in-place hai con trỏ để giảm bộ nhớ tạm thời.'
        ]
      },
      socraticHistory: [
        { sender: 'tutor', text: 'Chào An! Thầy thấy bài làm đảo ngược chuỗi của em đã hoàn thành xuất sắc các test cases. Em có nhận thấy lệnh `s.split()` mặc định trong Python xử lý các khoảng trắng liên tiếp như thế nào không?' },
        { sender: 'student', text: 'Dạ, split() không truyền tham số sẽ tự động nhóm các khoảng trắng liên tiếp lại thành 1 delimiter và bỏ qua các khoảng trắng ở hai đầu luôn ạ.' },
        { sender: 'tutor', text: 'Rất chính xác! Vậy nếu đề bài yêu cầu không dùng bộ nhớ phụ $O(N)$ mà bắt buộc biến đổi in-place trên mảng ký tự mảng `char[]`, em sẽ tiếp cận theo hướng nào?' }
      ]
    }
  },
  {
    id: 2,
    code: 'BT02-LIS-DP',
    title: 'Dãy con tăng dài nhất (Longest Increasing Subsequence)',
    classId: 1,
    className: 'CNTT-K18A',
    teacherId: 3,
    language: 'C++',
    difficulty: 'Medium',
    timeLimit: 1.5,
    memoryLimit: 256,
    deadline: '2026-10-25 23:59:59', // Trong hạn
    isClosed: false,
    description: `### Yêu cầu bài toán\nCho một mảng số nguyên $A$ gồm $N$ phần tử. Hãy tìm độ dài của dãy con tăng dài nhất (các phần tử không nhất thiết phải liên tiếp nhau trong mảng gốc).\n\n### Định dạng Input\n- Dòng đầu tiên chứa số nguyên $N$ ($1 \\le N \\le 10^5$).\n- Dòng thứ hai chứa $N$ số nguyên $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).\n\n### Định dạng Output\n- In ra một số nguyên duy nhất là độ dài của dãy con tăng dài nhất.\n\n### Ràng buộc tài nguyên\n- Thời gian: **1.5 giây** (Yêu cầu thuật toán đạt độ phức tạp $O(N \\log N)$ để vượt qua toàn bộ Hidden Tests).`,
    sampleTests: [
      { id: 'S1', input: '6\n10 9 2 5 3 7 101 18', output: '4' },
      { id: 'S2', input: '6\n0 1 0 3 2 3', output: '4' }
    ],
    hiddenTests: [
      { id: 'H1', input: '8\n10 22 9 33 21 50 41 60', expected: '5', weight: 20 },
      { id: 'H2', input: '5\n7 7 7 7 7', expected: '1', weight: 20 },
      { id: 'H3', input: '10000 phần tử tăng dần', expected: '10000', weight: 30 },
      { id: 'H4', input: '100000 phần tử ngẫu nhiên lớn', expected: '...', weight: 30 }
    ],
    rubrics: [
      { id: 'R1', criterion: 'Correctness (Hidden Tests)', weight: 60, autoCalculated: true, desc: 'Docker Sandbox Hidden Tests' },
      { id: 'R2', criterion: 'Time Complexity O(N log N)', weight: 25, autoCalculated: false, desc: 'Phải dùng Binary Search (std::lower_bound) hoặc Fenwick Tree / Segment Tree' },
      { id: 'R3', criterion: 'Clean C++ Style', weight: 15, autoCalculated: false, desc: 'Quản lý con trỏ/vector an toàn' }
    ],
    // Currently in DRAFT state
    studentSubmission: {
      status: 'DRAFT',
      triggerType: null,
      submittedAt: null,
      lastSavedAt: '2026-10-19 21:05:12',
      code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Dang viet do ban nhap O(N log N)
int lengthOfLIS(const vector<int>& nums) {
    if (nums.empty()) return 0;
    vector<int> tails;
    
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (cin >> n) {
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        cout << lengthOfLIS(a) << "\\n";
    }
    return 0;
}`,
      autoScore: null,
      officialScore: null,
      teacherFeedback: null,
      testResults: [],
      aiReview: null,
      socraticHistory: []
    }
  },
  {
    id: 3,
    code: 'BT03-MST-KRUSKAL',
    title: 'Cây khung nhỏ nhất - Thuật toán Kruskal',
    classId: 1,
    className: 'CNTT-K18A',
    teacherId: 3,
    language: 'C++',
    difficulty: 'Hard',
    timeLimit: 2.0,
    memoryLimit: 256,
    deadline: '2026-10-22 23:59:59',
    isClosed: false,
    description: `### Yêu cầu bài toán\nCho đồ thị vô hướng liên thông gồm $N$ đỉnh và $M$ cạnh có trọng số. Hãy áp dụng cấu trúc dữ liệu Disjoint Set Union (DSU) và thuật toán Kruskal để tìm trọng số của cây khung nhỏ nhất (Minimum Spanning Tree).\n\n### Định dạng Input\n- Dòng đầu chứa 2 số $N, M$ ($1 \\le N \\le 10^5, 1 \\le M \\le 2 \\times 10^5$).\n- $M$ dòng tiếp theo, mỗi dòng chứa $u, v, w$ đại diện cho cạnh nối $u$ và $v$ với trọng số $w$.`,
    sampleTests: [
      { id: 'S1', input: '4 5\n1 2 1\n2 3 2\n3 4 3\n1 4 4\n1 3 5', output: '6' }
    ],
    hiddenTests: [],
    rubrics: [],
    studentSubmission: {
      status: 'SUBMITTED', // Đã nộp, chờ batch grading
      triggerType: 'MANUAL',
      submittedAt: '2026-10-18 19:42:10',
      code: `// Da nop bai som - Read-only mode
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

int findRoot(int u, vector<int>& parent) {
    if (parent[u] == u) return u;
    return parent[u] = findRoot(parent[u], parent);
}

int main() {
    // Da submit va khoa chinh sua
    return 0;
}`,
      autoScore: null,
      officialScore: null,
      teacherFeedback: null,
      testResults: [],
      aiReview: null,
      socraticHistory: []
    }
  }
];

export const SUBMISSION_LIST_TEACHER = [
  {
    id: 101,
    studentCode: 'SV2024001',
    studentName: 'Nguyễn Văn An',
    assignmentId: 1,
    assignmentTitle: 'Đảo ngược chuỗi từ và tối ưu bộ nhớ',
    submittedAt: '2026-10-14 20:15:30',
    triggerType: 'MANUAL',
    status: 'COMPLETED',
    autoScore: 10.0,
    officialScore: 9.5,
    plagiarismScore: 12, // 12% an toan
    isGraded: true
  },
  {
    id: 102,
    studentCode: 'SV2024002',
    studentName: 'Lê Thị Bình',
    assignmentId: 1,
    assignmentTitle: 'Đảo ngược chuỗi từ và tối ưu bộ nhớ',
    submittedAt: '2026-10-15 23:59:59',
    triggerType: 'AUTO_EXPIRED', // Tu dong nop khi het gio
    status: 'COMPLETED',
    autoScore: 7.5,
    officialScore: 8.0,
    plagiarismScore: 82, // Canh bao trung lap cao
    isGraded: true
  },
  {
    id: 103,
    studentCode: 'SV2024003',
    studentName: 'Trần Văn Cường',
    assignmentId: 1,
    assignmentTitle: 'Đảo ngược chuỗi từ và tối ưu bộ nhớ',
    submittedAt: '2026-10-15 21:10:00',
    triggerType: 'MANUAL',
    status: 'COMPLETED',
    autoScore: 5.0,
    officialScore: null, // Chua cham thu cong
    plagiarismScore: 18,
    isGraded: false
  }
];

export const PLAGIARISM_CASES = [
  {
    pairId: 'PLAG-01',
    studentA: { code: 'SV2024001', name: 'Nguyễn Văn An' },
    studentB: { code: 'SV2024002', name: 'Lê Thị Bình' },
    assignmentTitle: 'Đảo ngược chuỗi từ và tối ưu bộ nhớ',
    similarity: 82.5,
    astMatchCount: 14,
    tokenOverlap: '84.2%',
    identicalBlocks: [
      {
        linesA: '3-6',
        linesB: '4-7',
        codeSnippet: 'words = s.strip().split()\nreturn " ".join(reversed(words))',
        verdict: 'Cấu trúc AST tương đồng 100%, chỉ đổi tên biến hàm con.'
      }
    ]
  }
];

export const SYSTEM_LOGS = [
  { id: 1, timestamp: '2026-10-19 21:18:02', level: 'INFO', service: 'AUTH', message: 'User SV2024001 authenticated successfully via JWT bearer token.' },
  { id: 2, timestamp: '2026-10-19 21:10:44', level: 'WARN', service: 'GRADER', message: 'Sandbox execution exceeded memory threshold (peak 124MB / limit 128MB) for submission #102.' },
  { id: 3, timestamp: '2026-10-19 21:05:12', level: 'INFO', service: 'AUTOSAVE', message: 'Draft saved for student SV2024001 on assignment BT02-LIS-DP (version 14).' },
  { id: 4, timestamp: '2026-10-19 20:45:00', level: 'INFO', service: 'DOCKER', message: 'Spawning isolated sandbox container (id: sbx-8f3a9d) with network disabled.' },
  { id: 5, timestamp: '2026-10-19 20:00:15', level: 'ERROR', service: 'DOCKER', message: 'Execution TLE: container sbx-7c2a1e killed after reaching 3.0s hard timeout.' },
  { id: 6, timestamp: '2026-10-19 19:30:00', level: 'INFO', service: 'AI_REVIEW', message: 'Gemini 1.5 Pro generated AST review and Socratic cues for 12 completed submissions.' }
];

export const DOCKER_CONTAINERS = [
  { id: 'sbx-node-01', name: 'sandbox-py311-worker-1', image: 'python:3.11-slim', status: 'RUNNING', cpu: '14%', ram: '84MB / 512MB', tasksQueued: 2 },
  { id: 'sbx-node-02', name: 'sandbox-gcc-worker-2', image: 'gcc:latest', status: 'IDLE', cpu: '1%', ram: '42MB / 512MB', tasksQueued: 0 },
  { id: 'sbx-node-03', name: 'sandbox-java-worker-3', image: 'openjdk:17-slim', status: 'IDLE', cpu: '2%', ram: '110MB / 512MB', tasksQueued: 0 }
];
