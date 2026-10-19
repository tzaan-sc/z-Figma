import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutGrid, 
  ClipboardList, 
  SlidersHorizontal, 
  FileCheck, 
  ListChecks,
  Code2, 
  Sparkles, 
  Award, 
  Users, 
  Layers, 
  Building2, 
  Cpu, 
  Terminal,
  BookOpen
} from 'lucide-react';

export default function Sidebar() {
  const { currentRole, currentTab, setCurrentTab, currentUser } = useApp();

  // Định nghĩa menu theo hình ảnh tham khảo
  let menuItems = [];

  if (currentRole === 'teacher') {
    menuItems = [
      { id: 'teacher-assignments', label: 'Tổng quan', icon: <LayoutGrid size={20} /> },
      { id: 'teacher-classes', label: 'Quản lý bài tập', icon: <ClipboardList size={20} /> },
      { id: 'teacher-rubric', label: 'Cấu hình Tests & Rubric', icon: <SlidersHorizontal size={20} /> },
      { id: 'teacher-submissions', label: 'Bài nộp', icon: <FileCheck size={20} /> },
      { id: 'teacher-grading', label: 'Chấm bài', icon: <ListChecks size={20} /> },
    ];
  } else if (currentRole === 'student') {
    menuItems = [
      { id: 'assignments', label: 'Tổng quan bài tập', icon: <LayoutGrid size={20} /> },
      { id: 'workspace', label: 'Web IDE & Nộp bài', icon: <Code2 size={20} /> },
      { id: 'result-view', label: 'Kết quả & AI Review', icon: <Sparkles size={20} /> },
      { id: 'gradebook', label: 'Bảng điểm cá nhân', icon: <Award size={20} /> },
    ];
  } else if (currentRole === 'admin') {
    menuItems = [
      { id: 'admin-users', label: 'Quản lý người dùng', icon: <Users size={20} /> },
      { id: 'admin-classes', label: 'Quản lý lớp học', icon: <Layers size={20} /> },
      { id: 'admin-departments', label: 'Cơ cấu Khoa & Giáo vụ', icon: <Building2 size={20} /> },
    ];
  } else if (currentRole === 'dept_admin') {
    menuItems = [
      { id: 'admin-classes', label: 'Quản lý lớp thuộc Khoa', icon: <Layers size={20} /> },
      { id: 'admin-departments', label: 'Cơ cấu Bộ môn', icon: <Building2 size={20} /> },
    ];
  } else if (currentRole === 'sys_admin') {
    menuItems = [
      { id: 'sys-ai', label: 'Cấu hình AI Engine', icon: <SlidersHorizontal size={20} /> },
      { id: 'sys-docker', label: 'Docker Sandbox', icon: <Cpu size={20} /> },
      { id: 'sys-logs', label: 'Quản lý System Logs', icon: <Terminal size={20} /> },
    ];
  }

  // Label hiển thị trên pill role
  const roleDisplayNames = {
    teacher: 'Giáo Viên',
    student: 'Sinh Viên',
    admin: 'Quản Trị Viên',
    dept_admin: 'Giáo Vụ',
    sys_admin: 'IT Vận Hành'
  };

  const currentRoleName = roleDisplayNames[currentRole] || currentUser?.roleLabel || 'Giáo Viên';

  return (
    <aside className="etv-sidebar">
      {/* 1. Brand Header với Logo tách nền */}
      <div className="etv-sidebar-header">
        <div className="etv-logo-wrapper">
          <img 
            src="/etv-logo.png" 
            alt="ETV Logo" 
            className="etv-logo-img" 
          />
        </div>
        <div className="etv-brand-text">
          <div className="etv-brand-title">ETV</div>
          <div className="etv-brand-subtitle">AI-POWERED CODING TUTOR</div>
        </div>
      </div>

      {/* 2. Role Status Pill */}
      <div className="etv-role-badge-container">
        <div className="etv-role-badge-left">
          <span className="etv-role-dot"></span>
          <span className="etv-role-title">{currentRoleName}</span>
        </div>
        <div className="etv-status-pill">Active</div>
      </div>

      {/* 3. Navigation Menu */}
      <nav className="etv-sidebar-nav">
        <ul className="etv-sidebar-menu">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <li
                key={item.id}
                className={`etv-sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentTab(item.id)}
              >
                <span className="etv-item-icon">{item.icon}</span>
                <span className="etv-item-label">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

