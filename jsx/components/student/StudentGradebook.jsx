import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Award, BookOpen, Clock, FileCheck, CheckCircle2 } from 'lucide-react';

export default function StudentGradebook() {
  const { assignments, currentUser } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Bảng điểm cá nhân (UC-16)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Tổng hợp điểm kiểm thử tự động và điểm đánh giá chính thức của Giảng viên.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--brand-primary)', border: '1px solid var(--info-border)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-value">{assignments.length}</div>
            <div className="stat-label">Tổng bài tập được giao</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-value">9.5 / 10</div>
            <div className="stat-label">Điểm trung bình (Đã xác nhận)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)', border: '1px solid var(--border-default)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-value">
              {assignments.filter(a => a.studentSubmission?.status === 'COMPLETED' || a.studentSubmission?.status === 'SUBMITTED').length} / {assignments.length}
            </div>
            <div className="stat-label">Tỷ lệ nộp bài</div>
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã bài</th>
              <th>Tên bài tập</th>
              <th>Lớp học</th>
              <th>Hạn nộp</th>
              <th>Trạng thái</th>
              <th>Điểm Auto-Grader</th>
              <th>Điểm chính thức</th>
              <th>Nhận xét của Giáo viên</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(asg => {
              const sub = asg.studentSubmission || { status: 'DRAFT' };
              return (
                <tr key={asg.id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-accent)' }}>{asg.code}</td>
                  <td style={{ fontWeight: 600 }}>{asg.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{asg.className}</td>
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{asg.deadline}</td>
                  <td><Badge status={sub.status} type="submission" /></td>
                  <td style={{ fontWeight: 600 }}>
                    {sub.autoScore !== null && sub.autoScore !== undefined ? `${sub.autoScore} / 10` : '--'}
                  </td>
                  <td style={{ fontWeight: 700, color: sub.officialScore ? 'var(--success)' : 'inherit', fontSize: '15px' }}>
                    {sub.officialScore !== null && sub.officialScore !== undefined ? `${sub.officialScore} / 10` : '--'}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '280px' }}>
                    {sub.teacherFeedback || 'Chưa có nhận xét'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
