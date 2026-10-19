import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { 
  Users, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileCode, 
  ArrowLeft,
  Award
} from 'lucide-react';

export default function SubmissionsList({ onOpenGrading }) {
  const { teacherSubmissions, assignments, activeAssignmentId, setCurrentTab } = useApp();
  const [search, setSearch] = useState('');
  const [filterTrigger, setFilterTrigger] = useState('ALL');

  const assignment = assignments.find(a => a.id === activeAssignmentId) || assignments[0];

  const filtered = teacherSubmissions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          sub.studentCode.toLowerCase().includes(search.toLowerCase());
    const matchesTrigger = filterTrigger === 'ALL' || sub.triggerType === filterTrigger;
    return matchesSearch && matchesTrigger;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setCurrentTab('teacher-assignments')}
          >
            <ArrowLeft size={14} /> Danh sách bài tập
          </button>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
              {assignment.code} • {assignment.className}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Danh sách bài nộp của Sinh viên (UC-24)
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Tìm theo tên/mã SV..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '34px' }}
            />
          </div>

          <select 
            className="form-select" 
            value={filterTrigger} 
            onChange={e => setFilterTrigger(e.target.value)}
            style={{ width: '180px' }}
          >
            <option value="ALL">Tất cả hình thức nộp</option>
            <option value="MANUAL">Chủ động nộp (MANUAL)</option>
            <option value="AUTO_EXPIRED">Tự động nộp khi hết giờ</option>
          </select>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--brand-primary)', border: '1px solid var(--info-border)' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value">{teacherSubmissions.length}</div>
            <div className="stat-label">Tổng bài đã nộp (SUBMITTED)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-value">
              {teacherSubmissions.filter(s => s.isGraded).length} / {teacherSubmissions.length}
            </div>
            <div className="stat-label">Đã xác nhận điểm chính thức</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger-text)', border: '1px solid var(--danger-border)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-value">
              {teacherSubmissions.filter(s => s.plagiarismScore > 50).length}
            </div>
            <div className="stat-label">Nghi vấn trùng lặp cao (&gt;50%)</div>
          </div>
        </div>
      </div>

      {/* Submissions Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ và tên</th>
              <th>Thời điểm nộp</th>
              <th>Cơ chế nộp (trigger_type)</th>
              <th>Điểm Auto-Grader</th>
              <th>Đối soát đạo văn</th>
              <th>Điểm chính thức (GV)</th>
              <th>Thao tác chấm</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sub => (
              <tr key={sub.id}>
                <td style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{sub.studentCode}</td>
                <td style={{ fontWeight: 600 }}>{sub.studentName}</td>
                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{sub.submittedAt}</td>
                <td>
                  {sub.triggerType === 'MANUAL' ? (
                    <span className="badge badge-submitted">Chủ động nộp</span>
                  ) : (
                    <span className="badge badge-grading">Auto-expired</span>
                  )}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
                  {sub.autoScore !== null ? `${sub.autoScore} / 10` : '--'}
                </td>
                <td>
                  <span className={`badge ${sub.plagiarismScore > 50 ? 'badge-danger' : 'badge-completed'}`}>
                    {sub.plagiarismScore}% {sub.plagiarismScore > 50 && '⚠️ Cảnh báo'}
                  </span>
                </td>
                <td>
                  {sub.officialScore !== null ? (
                    <span style={{ fontWeight: 800, color: 'var(--success)', fontSize: '15px' }}>
                      {sub.officialScore} / 10
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Chưa chấm</span>
                  )}
                </td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenGrading(sub)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Award size={13} /> Chấm bài (UC-27)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
