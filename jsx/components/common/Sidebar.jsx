import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Code2, 
  Award, 
  Sparkles, 
  Users, 
  FileSpreadsheet, 
  Building2, 
  Layers, 
  Sliders, 
  Cpu, 
  Terminal, 
  Radio, 
  Activity,
  UserCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function Sidebar() {
  const { currentRole, currentTab, setCurrentTab } = useApp();

  let sections = [];

  if (currentRole === 'student') {
    sections = [
      {
        title: 'Học tập & Lập trình',
        items: [
          { id: 'assignments', label: 'Danh sách bài tập (UC-07)', icon: <BookOpen size={16} /> },
          { id: 'workspace', label: 'Web IDE & Nộp bài (UC-09..11)', icon: <Code2 size={16} /> },
          { id: 'result-view', label: 'Kết quả & AI Review (UC-12..15)', icon: <Sparkles size={16} /> },
          { id: 'gradebook', label: 'Bảng điểm cá nhân (UC-16)', icon: <Award size={16} /> }
        ]
      }
    ];
  } else if (currentRole === 'teacher') {
    sections = [
      {
        title: 'Giảng dạy & Đánh giá',
        items: [
          { id: 'teacher-assignments', label: 'Quản lý bài tập (UC-17..23)', icon: <BookOpen size={16} /> },
          { id: 'teacher-submissions', label: 'Bài nộp của sinh viên (UC-24)', icon: <Users size={16} /> },
          { id: 'teacher-grading', label: 'Chấm bài & Đạo văn (UC-26,27)', icon: <Award size={16} /> },
          { id: 'teacher-classes', label: 'Lớp phụ trách & Đóng/Mở (UC-36)', icon: <Calendar size={16} /> }
        ]
      }
    ];
  } else if (currentRole === 'admin') {
    sections = [
      {
        title: 'Nghiệp vụ Đào tạo (Toàn trường)',
        items: [
          { id: 'admin-users', label: 'Quản lý người dùng (UC-28..32)', icon: <Users size={16} /> },
          { id: 'admin-classes', label: 'Quản lý lớp học (UC-34..39)', icon: <Layers size={16} /> },
          { id: 'admin-departments', label: 'Cơ cấu Khoa & Giáo vụ (UC-43)', icon: <Building2 size={16} /> }
        ]
      }
    ];
  } else if (currentRole === 'dept_admin') {
    sections = [
      {
        title: 'Nghiệp vụ Khoa / Bộ môn',
        items: [
          { id: 'admin-classes', label: 'Quản lý lớp thuộc Khoa (UC-34..39)', icon: <Layers size={16} /> }
        ]
      }
    ];
  } else if (currentRole === 'sys_admin') {
    sections = [
      {
        title: 'Hạ tầng & Vận hành Kỹ thuật',
        items: [
          { id: 'sys-ai', label: 'Cấu hình AI Engine (UC-40)', icon: <Sliders size={16} /> },
          { id: 'sys-docker', label: 'Docker Sandbox (UC-41,42)', icon: <Cpu size={16} /> },
          { id: 'sys-logs', label: 'Quản lý System Logs (UC-44)', icon: <Terminal size={16} /> }
        ]
      }
    ];
  }

  return (
    <aside className="sidebar">
      {sections.map((sec, idx) => (
        <div key={idx}>
          <div className="sidebar-section-title">{sec.title}</div>
          <ul className="sidebar-menu">
            {sec.items.map(item => (
              <li
                key={item.id}
                className={`sidebar-item ${currentTab === item.id ? 'active' : ''}`}
                onClick={() => setCurrentTab(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
