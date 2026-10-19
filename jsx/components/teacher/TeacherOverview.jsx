import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { 
  BookOpen, 
  Users, 
  FileCheck, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function TeacherOverview() {
  const { assignments, classes, teacherSubmissions, setCurrentTab, currentUser } = useApp();

  // Thống kê số liệu
  const teacherClasses = classes.filter(c => c.teacherId === currentUser.id || c.teacherId === 3);
  const pendingGradingCount = teacherSubmissions.filter(s => s.status === 'SUBMITTED' || s.status === 'GRADING').length;
  const highMossCount = teacherSubmissions.filter(s => s.mossScore >= 20).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Tổng quan Giảng dạy & Đánh giá
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Chào mừng trở lại, {currentUser.name}. Dưới đây là tình hình học tập và tiến độ nộp bài của sinh viên.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setCurrentTab('teacher-assignments')}
        >
          <Plus size={16} /> Tạo bài tập mới (UC-17)
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        {/* Card 1: Lớp phụ trách */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>LỚP PHỤ TRÁCH</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {teacherClasses.length} lớp
            </div>
            <div style={{ fontSize: '12px', color: 'var(--success-text)', marginTop: '2px', fontWeight: 500 }}>
              Đang hoạt động bình thường
            </div>
          </div>
        </div>

        {/* Card 2: Bài tập đã giao */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>BÀI TẬP ĐÃ GIAO</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {assignments.length} bài
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Kèm test cases & rubric
            </div>
          </div>
        </div>

        {/* Card 3: Bài nộp chờ chấm */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>BÀI NỘP CHỜ CHẤM</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1D4ED8', marginTop: '2px' }}>
              {pendingGradingCount} bài
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Cần xác nhận điểm chính thức
            </div>
          </div>
        </div>

        {/* Card 4: Cảnh báo MOSS */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>CẢNH BÁO ĐẠO VĂN</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
              {highMossCount} ca nghi vấn
            </div>
            <div style={{ fontSize: '12px', color: 'var(--danger-text)', marginTop: '2px' }}>
              MOSS tương đồng &gt; 20%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action & Recent Submissions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Recent Submissions to Grade */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Bài nộp mới nhất cần xử lý
            </h3>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentTab('teacher-submissions')}
            >
              Xem tất cả bài nộp <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sinh viên</th>
                  <th>Bài tập</th>
                  <th>Thời điểm nộp</th>
                  <th>Auto-Grader</th>
                  <th>MOSS</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {teacherSubmissions.slice(0, 4).map(sub => (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sub.studentName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub.studentCode}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{sub.assignmentTitle}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub.className}</div>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {sub.submittedAt}
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
                        {sub.autoScore !== null ? `${sub.autoScore}/10` : '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        fontWeight: 700, 
                        color: sub.mossScore > 20 ? 'var(--danger)' : sub.mossScore > 10 ? 'var(--warning)' : 'var(--success-text)' 
                      }}>
                        {sub.mossScore}%
                      </span>
                    </td>
                    <td>
                      <Badge status={sub.status} type="submission" />
                    </td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setCurrentTab('teacher-grading')}
                      >
                        Chấm bài
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classes quick management */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Lớp học phụ trách
            </h3>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentTab('teacher-classes')}
            >
              Quản lý <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teacherClasses.map(cls => (
              <div 
                key={cls.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                    {cls.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {cls.code} • {cls.studentCount} Sinh viên • {cls.assignmentCount} Bài tập
                  </div>
                </div>
                <Badge status={cls.status} type="class-status" />
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '14px', marginTop: 'auto' }}>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--brand-accent-sky-dark)" />
              Hệ thống Auto-Grader chạy nền sau Deadline theo quy tắc DOAN4.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
