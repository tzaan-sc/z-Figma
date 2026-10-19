import React, { createContext, useContext, useState } from 'react';
import { 
  USERS, 
  DEPARTMENTS, 
  CLASSES, 
  ASSIGNMENTS, 
  SUBMISSION_LIST_TEACHER, 
  PLAGIARISM_CASES, 
  SYSTEM_LOGS, 
  DOCKER_CONTAINERS 
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Current active role & user
  const [currentRole, setCurrentRole] = useState('student');
  const [currentUser, setCurrentUser] = useState(USERS[0]); // Default: Nguyen Van An (Student)
  const [currentTab, setCurrentTab] = useState('assignments'); // sub-tab inside role

  // Core state collections
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [classes, setClasses] = useState(CLASSES);
  const [users, setUsers] = useState(USERS);
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const [teacherSubmissions, setTeacherSubmissions] = useState(SUBMISSION_LIST_TEACHER);
  const [systemLogs, setSystemLogs] = useState(SYSTEM_LOGS);
  const [dockerContainers, setDockerContainers] = useState(DOCKER_CONTAINERS);

  // Active assignment being worked on or viewed
  const [activeAssignmentId, setActiveAssignmentId] = useState(2); // default: LIS in progress

  // Socratic Tutor drawer state
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  
  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Switch role helper
  const switchRole = (role) => {
    setCurrentRole(role);
    const matchedUser = USERS.find(u => u.role === role) || USERS[0];
    setCurrentUser(matchedUser);

    // Set default screen for each role
    if (role === 'student') setCurrentTab('assignments');
    else if (role === 'teacher') setCurrentTab('teacher-assignments');
    else if (role === 'admin') setCurrentTab('admin-users');
    else if (role === 'dept_admin') setCurrentTab('admin-classes');
    else if (role === 'sys_admin') setCurrentTab('sys-ai');

    addToast(`Đã chuyển vai trò: ${matchedUser.roleLabel} (${matchedUser.name})`, 'info');
  };

  // Student Actions:
  // Autosave / Save Draft
  const saveDraft = (assignmentId, code) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          studentSubmission: {
            ...a.studentSubmission,
            status: 'DRAFT',
            code,
            lastSavedAt: new Date().toLocaleTimeString('vi-VN')
          }
        };
      }
      return a;
    }));
    addToast('Đã lưu bản nháp thành công (DRAFT).', 'success');
  };

  // Explicit Submit (Locks code into SUBMITTED)
  const submitAssignment = (assignmentId, code) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          studentSubmission: {
            ...a.studentSubmission,
            status: 'SUBMITTED',
            triggerType: 'MANUAL',
            submittedAt: new Date().toLocaleString('vi-VN'),
            code
          }
        };
      }
      return a;
    }));
    addToast('Nộp bài chính thức thành công! Bài làm đã khóa vĩnh viễn và chờ Batch Grading.', 'success');
  };

  // Socratic message send
  const sendSocraticMessage = (assignmentId, text) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId && a.studentSubmission) {
        const currentHist = a.studentSubmission.socraticHistory || [];
        const newHist = [
          ...currentHist,
          { sender: 'student', text },
          { 
            sender: 'tutor', 
            text: 'Thầy đã nhận được câu hỏi của em. Hãy chú ý đến dòng code nơi em cập nhật giá trị mảng. Theo em, điều kiện dừng của vòng lặp hiện tại có bao hàm được trường hợp mảng chỉ có 1 phần tử không?' 
          }
        ];
        return {
          ...a,
          studentSubmission: {
            ...a.studentSubmission,
            socraticHistory: newHist
          }
        };
      }
      return a;
    }));
  };

  // Teacher Actions:
  // Manual grading & official score confirmation (UC-27)
  const gradeSubmission = (submissionId, score, feedback) => {
    setTeacherSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          officialScore: score,
          teacherFeedback: feedback,
          isGraded: true
        };
      }
      return sub;
    }));
    addToast(`Đã xác nhận điểm chính thức: ${score}/10 cho sinh viên!`, 'success');
  };

  // Create Assignment (UC-17)
  const addAssignment = (newAsg) => {
    const id = Date.now();
    const created = {
      ...newAsg,
      id,
      isClosed: false,
      sampleTests: newAsg.sampleTests || [],
      hiddenTests: newAsg.hiddenTests || [],
      rubrics: newAsg.rubrics || [],
      studentSubmission: {
        status: 'DRAFT',
        triggerType: null,
        submittedAt: null,
        lastSavedAt: null,
        code: `// Viết mã nguồn tại đây\n`,
        autoScore: null,
        officialScore: null,
        testResults: [],
        aiReview: null,
        socraticHistory: []
      }
    };
    setAssignments(prev => [created, ...prev]);
    addToast(`Đã tạo bài tập mới: "${newAsg.title}"!`, 'success');
  };

  // Delete Assignment (Soft delete - UC-19)
  const deleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    addToast('Đã vô hiệu hóa / xóa bài tập.', 'info');
  };

  // Class Lifecycle Actions (UC-36, UC-37):
  // Close class: Hoat dong -> Da dong
  const closeClass = (classId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status: 'CLOSED' } : c));
    addToast('Đã đóng lớp học (Trạng thái: Đã đóng).', 'info');
  };

  // Reopen class: Da dong -> Hoat dong
  const reopenClass = (classId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status: 'ACTIVE' } : c));
    addToast('Đã mở lại lớp học (Trạng thái: Hoạt động).', 'success');
  };

  // Archive class: Da dong -> Luu tru
  const archiveClass = (classId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status: 'ARCHIVED' } : c));
    addToast('Đã lưu trữ lớp học (Trạng thái: Lưu trữ).', 'info');
  };

  // Restore class: Luu tru -> Da dong
  const restoreClass = (classId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status: 'CLOSED' } : c));
    addToast('Đã khôi phục lớp về trạng thái: Đã đóng. Cần mở lại để tiếp tục hoạt động.', 'info');
  };

  // Hard Delete class: STRICT RULE: student_count == 0 AND assignment_count == 0
  const hardDeleteClass = (classId) => {
    const target = classes.find(c => c.id === classId);
    if (!target) return;
    if (target.studentCount > 0 || target.assignmentCount > 0) {
      addToast(`LỖI CHẶN XÓA: Lớp có ${target.studentCount} sinh viên và ${target.assignmentCount} bài tập. Chỉ được Hard Delete khi sinh viên=0 và bài tập=0. Hãy chuyển sang Archive!`, 'danger');
      return false;
    }
    setClasses(prev => prev.filter(c => c.id !== classId));
    addToast(`Đã xóa vĩnh viễn (Hard Delete) lớp ${target.code}.`, 'success');
    return true;
  };

  // User management (UC-28 .. UC-32)
  const toggleLockUser = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    addToast('Đã cập nhật trạng thái tài khoản.', 'info');
  };

  const addUser = (newUser) => {
    const id = Date.now();
    setUsers(prev => [...prev, { ...newUser, id, status: 'ACTIVE' }]);
    addToast(`Đã tạo tài khoản cho ${newUser.name}. Mật khẩu tạm thời đã gửi qua email!`, 'success');
  };

  const resetUserPassword = (userId) => {
    addToast(`Đã sinh mật khẩu tạm thời mới và thu hồi phiên làm việc của người dùng ID ${userId}.`, 'success');
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      currentUser,
      currentTab,
      setCurrentTab,
      switchRole,
      assignments,
      classes,
      users,
      departments,
      teacherSubmissions,
      systemLogs,
      dockerContainers,
      activeAssignmentId,
      setActiveAssignmentId,
      saveDraft,
      submitAssignment,
      sendSocraticMessage,
      gradeSubmission,
      addAssignment,
      deleteAssignment,
      closeClass,
      reopenClass,
      archiveClass,
      restoreClass,
      hardDeleteClass,
      toggleLockUser,
      addUser,
      resetUserPassword,
      isTutorOpen,
      setIsTutorOpen,
      toasts,
      addToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
