import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Code, 
  User, 
  LogOut, 
  Sparkles, 
  ShieldAlert, 
  Cpu, 
  BookOpen, 
  Sliders, 
  Radio, 
  Building2,
  ChevronDown
} from 'lucide-react';
import { ProfileModal, LogoutModal } from '../auth/AuthModals';

export default function Navbar() {
  const { currentRole, currentUser, switchRole } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const roles = [
    { id: 'student', label: 'Sinh viên', icon: <GraduationCap size={15} /> },
    { id: 'teacher', label: 'Giáo viên', icon: <BookOpen size={15} /> },
    { id: 'admin', label: 'Quản trị viên', icon: <Building2 size={15} /> },
    { id: 'dept_admin', label: 'Giáo vụ', icon: <Sliders size={15} /> },
    { id: 'sys_admin', label: 'IT Vận hành', icon: <Cpu size={15} /> }
  ];

  return (
    <>
      <header className="top-nav">
        {/* Brand */}
        <div className="nav-brand">
          <div className="brand-icon">
            <Code size={19} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, lineHeight: 1.2 }}>AI CODING TUTOR</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-accent)', letterSpacing: '0.06em', fontWeight: 600 }}>
              AUTO-GRADER PLATFORM
            </div>
          </div>
        </div>

        {/* Master Role Switcher Hub */}
        <div className="role-switcher-bar">
          {roles.map(r => (
            <button
              key={r.id}
              className={`role-pill ${currentRole === r.id ? 'active' : ''}`}
              onClick={() => switchRole(r.id)}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* User Profile & Actions */}
        <div className="nav-actions">
          {/* User Profile button (UC-04) */}
          <button 
            className="user-profile-btn"
            onClick={() => setIsProfileOpen(true)}
            title="Xem & Cập nhật hồ sơ cá nhân (UC-04, UC-05, UC-06)"
          >
            <div className="avatar-circle">
              {currentUser.avatar || 'US'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-accent)' }}>
                {currentUser.roleLabel}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {/* Quick Logout button (UC-02) */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsLogoutOpen(true)}
            title="Đăng xuất khỏi hệ thống (UC-02)"
            style={{ padding: '8px 12px' }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Auth Modals */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </>
  );
}
