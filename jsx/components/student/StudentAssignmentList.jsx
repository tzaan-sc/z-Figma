import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { 
  BookOpen, 
  Clock, 
  Code2, 
  CheckCircle, 
  Search, 
  Filter, 
  ArrowRight, 
  FileText, 
  Eye, 
  Lock,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export default function StudentAssignmentList() {
  const { assignments, setActiveAssignmentId, setCurrentTab } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [detailModalAsg, setDetailModalAsg] = useState(null);

  const filteredAssignments = assignments.filter(asg => {
    const matchesSearch = asg.title.toLowerCase().includes(search.toLowerCase()) ||
                          asg.code.toLowerCase().includes(search.toLowerCase());
    const subStatus = asg.studentSubmission?.status || 'DRAFT';
    const matchesStatus = statusFilter === 'ALL' || subStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenWorkspace = (asgId) => {
    setActiveAssignmentId(asgId);
    setCurrentTab('workspace');
  };

  const handleOpenResult = (asgId) => {
    setActiveAssignmentId(asgId);
    setCurrentTab('result-view');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Danh sách bài tập được giao (UC-07)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Xem các bài tập lập trình theo lớp, thời hạn hoàn thành và kết quả đánh giá.
          </p>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Tìm kiếm bài tập..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <select 
            className="form-select" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            style={{ width: '180px' }}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="DRAFT">Bản nháp (DRAFT)</option>
            <option value="SUBMITTED">Đã nộp (SUBMITTED)</option>
            <option value="COMPLETED">Đã chấm (COMPLETED)</option>
          </select>
        </div>
      </div>

      {/* Assignment Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredAssignments.map(asg => {
          const sub = asg.studentSubmission || { status: 'DRAFT' };
          const isDraft = sub.status === 'DRAFT';
          const isSubmitted = sub.status === 'SUBMITTED';
          const isCompleted = sub.status === 'COMPLETED';

          return (
            <div 
              key={asg.id} 
              className="glass-card glass-card-interactive" 
              onClick={() => {
                if (isDraft) {
                  handleOpenWorkspace(asg.id);
                } else if (isCompleted || isSubmitted) {
                  handleOpenResult(asg.id);
                } else {
                  setDetailModalAsg(asg);
                }
              }}
              title={isDraft ? "Bấm để vào làm bài lập trình" : isCompleted ? "Bấm để xem kết quả & AI đánh giá" : "Bấm để xem chi tiết bài tập"}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderLeft: isCompleted ? '4px solid var(--success)' : isSubmitted ? '4px solid var(--info)' : '4px solid var(--warning)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-accent)', letterSpacing: '0.05em' }}>
                    {asg.code} • {asg.className}
                  </span>
                  <Badge status={sub.status} type="submission" />
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                  {asg.title}
                </h3>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span className="badge badge-draft">{asg.language}</span>
                  <Badge status={asg.difficulty} type="difficulty" />
                  <span className="badge badge-draft"><Clock size={12} /> {asg.timeLimit}s</span>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '13px', border: '1px solid var(--border-default)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Hạn nộp bài:</span>
                    <span style={{ color: asg.isClosed ? 'var(--danger)' : 'var(--text-primary)', fontWeight: 600 }}>
                      {asg.deadline}
                    </span>
                  </div>

                  {sub.lastSavedAt && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Lưu nháp gần nhất:</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{sub.lastSavedAt}</span>
                    </div>
                  )}

                  {sub.submittedAt && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Thời điểm nộp:</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{sub.submittedAt}</span>
                    </div>
                  )}

                  {isCompleted && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Điểm chính thức:</span>
                      <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '15px' }}>
                        {sub.officialScore !== null ? `${sub.officialScore} / 10` : `${sub.autoScore} / 10 (Tạm tính)`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={(e) => { e.stopPropagation(); setDetailModalAsg(asg); }}
                  style={{ flex: 1 }}
                >
                  <Eye size={14} /> Chi tiết đề (UC-08)
                </button>

                {isDraft && (
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={(e) => { e.stopPropagation(); handleOpenWorkspace(asg.id); }}
                    style={{ flex: 1.2 }}
                  >
                    <Code2 size={14} /> Vào làm bài (UC-09)
                  </button>
                )}

                {isSubmitted && (
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={(e) => { e.stopPropagation(); handleOpenResult(asg.id); }}
                    style={{ flex: 1.2, borderColor: 'var(--info)' }}
                  >
                    <Lock size={14} /> Xem bài đã nộp (UC-15)
                  </button>
                )}

                {isCompleted && (
                  <button 
                    className="btn btn-success btn-sm" 
                    onClick={(e) => { e.stopPropagation(); handleOpenResult(asg.id); }}
                    style={{ flex: 1.2 }}
                  >
                    <Sparkles size={14} /> Kết quả & AI (UC-12)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Detail Modal (UC-08) */}
      <AssignmentDetailModal 
        assignment={detailModalAsg} 
        onClose={() => setDetailModalAsg(null)}
        onStartWorking={(id) => {
          setDetailModalAsg(null);
          handleOpenWorkspace(id);
        }}
      />
    </div>
  );
}

export function AssignmentDetailModal({ assignment, onClose, onStartWorking }) {
  if (!assignment) return null;

  return (
    <Modal
      isOpen={!!assignment}
      onClose={onClose}
      title={`Chi tiết đề bài: ${assignment.title} (UC-08)`}
      maxWidth="780px"
      footer={
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
          {!assignment.isClosed && (
            <button className="btn btn-primary" onClick={() => onStartWorking(assignment.id)}>
              <Code2 size={16} /> Bắt đầu làm bài (UC-09)
            </button>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Meta badges */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-purple">{assignment.className}</span>
          <span className="badge badge-draft">Ngôn ngữ: {assignment.language}</span>
          <Badge status={assignment.difficulty} type="difficulty" />
          <span className="badge badge-draft">Giới hạn thời gian: {assignment.timeLimit}s</span>
          <span className="badge badge-draft">Giới hạn RAM: {assignment.memoryLimit} MB</span>
        </div>

        {/* Problem Description */}
        <div style={{ padding: '18px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '10px' }}>Mô tả bài toán</h4>
          <div style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
            {assignment.description}
          </div>
        </div>

        {/* Sample Test Cases (Public) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="var(--brand-primary)" /> Sample Test Cases (Ví dụ công khai)
            </h4>
            <Badge status="SAMPLE" type="test-visibility" />
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            * Lưu ý theo quy tắc hệ thống: Sinh viên không có nút Chạy thử (Run Code) trên các Sample Test này.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {assignment.sampleTests?.map((st, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)' }}>INPUT {st.id}</span>
                  <pre style={{ background: 'var(--bg-dark-code)', padding: '10px', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#F8FAFC', border: '1px solid #1E293B' }}>{st.input}</pre>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success-text)' }}>EXPECTED OUTPUT</span>
                  <pre style={{ background: 'var(--bg-dark-code)', padding: '10px', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#86EFAC', border: '1px solid #1E293B' }}>{st.output}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rubrics */}
        {assignment.rubrics && assignment.rubrics.length > 0 && (
          <div>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--warning)" /> Tiêu chí đánh giá (Rubric)
            </h4>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>Trọng số</th>
                    <th>Mô tả cách tính</th>
                  </tr>
                </thead>
                <tbody>
                  {assignment.rubrics.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.criterion}</td>
                      <td><span className="badge badge-purple">{r.weight}%</span></td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
