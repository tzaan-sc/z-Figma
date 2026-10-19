import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { BookOpen, Users, Lock, Unlock, Calendar } from 'lucide-react';

export default function TeacherClassManager() {
  const { classes, closeClass, reopenClass, currentUser } = useApp();

  // Filter classes assigned to current teacher
  const teacherClasses = classes.filter(c => c.teacherId === currentUser.id || c.teacherId === 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý lớp phụ trách & Đóng/Mở lớp (UC-36)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Theo quy tắc RULES.md: Giảng viên có quyền Đóng hoặc Mở lại các lớp học do mình được phân công phụ trách.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {teacherClasses.map(cls => {
          const isActive = cls.status === 'ACTIVE';

          return (
            <div key={cls.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-accent)' }}>
                    {cls.code}
                  </span>
                  <Badge status={cls.status} type="class-status" />
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                  {cls.name}
                </h3>

                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', margin: '14px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Khoa/Bộ môn:</span>
                    <span>{cls.departmentName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Học kỳ:</span>
                    <span>{cls.semester}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sinh viên ghi danh:</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{cls.studentCount} SV</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Số bài tập đã giao:</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{cls.assignmentCount} bài</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                {isActive ? (
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => closeClass(cls.id)}
                  >
                    <Lock size={13} /> Đóng lớp học (UC-36)
                  </button>
                ) : (
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => reopenClass(cls.id)}
                  >
                    <Unlock size={13} /> Mở lại lớp học (UC-36)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
