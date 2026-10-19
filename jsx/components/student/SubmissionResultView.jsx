import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { 
  CheckCircle2, 
  Lock, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  FileCode, 
  ArrowLeft, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  Layers,
  Terminal,
  Clock
} from 'lucide-react';
import SocraticAITutorDrawer from './SocraticAITutorDrawer';

export default function SubmissionResultView() {
  const { 
    assignments, 
    activeAssignmentId, 
    setCurrentTab, 
    isTutorOpen, 
    setIsTutorOpen 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('tests'); // tests | ai-review | code
  const assignment = assignments.find(a => a.id === activeAssignmentId) || assignments[0];
  const submission = assignment.studentSubmission || { status: 'DRAFT' };

  const isCompleted = submission.status === 'COMPLETED';
  const isSubmitted = submission.status === 'SUBMITTED';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '14px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setCurrentTab('assignments')}
          >
            <ArrowLeft size={14} /> Danh sách bài tập
          </button>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-accent)' }}>
              {assignment.code} • {assignment.className}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
              Kết quả bài nộp: {assignment.title}
            </h2>
          </div>
          <Badge status={submission.status} type="submission" />
        </div>

        {/* AI Tutor Button (UC-14) */}
        {isCompleted && (
          <button 
            className="btn btn-primary" 
            onClick={() => setIsTutorOpen(true)}
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              boxShadow: '0 2px 14px rgba(139, 92, 246, 0.4)' 
            }}
          >
            <Sparkles size={16} /> Mở AI Tutor hậu kiểm (UC-14)
          </button>
        )}
      </div>

      {/* Overview Status Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
            <Award size={26} />
          </div>
          <div>
            <div className="stat-value">
              {submission.officialScore !== null && submission.officialScore !== undefined 
                ? `${submission.officialScore} / 10` 
                : submission.autoScore !== null && submission.autoScore !== undefined 
                  ? `${submission.autoScore} / 10` 
                  : '--'}
            </div>
            <div className="stat-label">
              {submission.officialScore !== null && submission.officialScore !== undefined 
                ? 'Điểm chính thức (GV xác nhận)' 
                : 'Điểm Auto-Grader (Tạm tính)'}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--info)' }}>
            <Clock size={26} />
          </div>
          <div>
            <div className="stat-value" style={{ fontSize: '15px' }}>
              {submission.submittedAt || 'Chưa nộp'}
            </div>
            <div className="stat-label">
              Thời điểm nộp ({submission.triggerType === 'MANUAL' ? 'Sinh viên chủ động nộp' : 'Auto-expired'})
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)' }}>
            <Cpu size={26} />
          </div>
          <div>
            <div className="stat-value">
              {submission.testResults?.filter(t => t.status === 'AC').length || 0} / {submission.testResults?.length || 0}
            </div>
            <div className="stat-label">Hidden Test Cases Passed</div>
          </div>
        </div>
      </div>

      {/* Notice if still waiting for Batch Grading */}
      {isSubmitted && !isCompleted && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--info)', padding: '18px' }}>
          <h4 style={{ fontSize: '15px', color: '#60a5fa', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} /> Bài làm đang chờ đợt chấm tập trung (Batch Grading Pipeline)
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Theo quy định, hệ thống sẽ tự động đưa toàn bộ bài nộp vào Docker Sandbox để chạy trên tập Hidden Tests và AI Code Review ngay sau khi thời hạn Deadline kết thúc ({assignment.deadline}).
          </p>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
        <button 
          className={`btn btn-sm ${activeSubTab === 'tests' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('tests')}
        >
          <Cpu size={14} /> Kết quả Auto-Grader (UC-12)
        </button>
        <button 
          className={`btn btn-sm ${activeSubTab === 'ai-review' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('ai-review')}
        >
          <Sparkles size={14} /> Phản hồi AI Review (UC-13)
        </button>
        <button 
          className={`btn btn-sm ${activeSubTab === 'code' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('code')}
        >
          <FileCode size={14} /> Mã nguồn bản nộp cuối (UC-15)
        </button>
      </div>

      {/* Tab 1: Auto-Grader Results (UC-12) */}
      {activeSubTab === 'tests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-card">
            <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} color="var(--primary)" /> Chi tiết thực thi trong Docker Sandbox (Hidden Tests)
            </h4>

            {submission.testResults && submission.testResults.length > 0 ? (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Test ID</th>
                      <th>Trạng thái</th>
                      <th>Thời gian chạy</th>
                      <th>RAM tiêu thụ</th>
                      <th>Điểm đạt được</th>
                      <th>Ghi chú an toàn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.testResults.map(tr => (
                      <tr key={tr.testId}>
                        <td style={{ fontWeight: 600 }}>{tr.testId}</td>
                        <td><Badge status={tr.status} type="test-status" /></td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{tr.time}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{tr.memory}</td>
                        <td style={{ fontWeight: 700, color: 'var(--success)' }}>+{tr.points} pts</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>
                          Dữ liệu I/O được ẩn để bảo mật đề thi
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Chưa có dữ liệu kiểm thử. Vui lòng đợi quy trình Batch Grading sau hạn nộp.
              </p>
            )}
          </div>

          {/* Teacher Feedback section */}
          {submission.teacherFeedback && (
            <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--secondary)" /> Nhận xét của Giảng viên (Điểm chính thức: {submission.officialScore}/10)
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                "{submission.teacherFeedback}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: AI Review (UC-13) */}
      {activeSubTab === 'ai-review' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {submission.aiReview ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="glass-card">
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>ƯỚC LƯỢNG ĐỘ PHỨC TẠP</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8', marginTop: '6px' }}>
                    {submission.aiReview.timeComplexityEstimate}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Bộ nhớ phụ: {submission.aiReview.spaceComplexityEstimate}
                  </div>
                </div>

                <div className="glass-card">
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>ĐỘ PHỨC TẠP CYCLOMATIC (AST)</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#4ade80', marginTop: '6px' }}>
                    Điểm số: {submission.aiReview.cyclomaticComplexity} (Mức tốt - Rất dễ bảo trì)
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {submission.aiReview.astFeedback}
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '10px' }}>
                  Tổng quan nhận xét từ AI Reviewer
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                  {submission.aiReview.summary}
                </p>

                <h5 style={{ fontSize: '13.5px', color: 'var(--text-accent)', marginBottom: '8px' }}>
                  Khuyến nghị nâng cao chất lượng code:
                </h5>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.7 }}>
                  {submission.aiReview.suggestions?.map((sug, idx) => (
                    <li key={idx}>{sug}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: '36px' }}>
              <Sparkles size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>
                Báo cáo AI Review sẽ được tự động trích xuất sau khi đợt chấm hoàn tất.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Submitted Code (UC-15) */}
      {activeSubTab === 'code' && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0a0d15', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} color="var(--text-muted)" /> Bản nộp duy nhất (Chế độ Read-only)
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Nộp lúc: {submission.submittedAt}
            </span>
          </div>
          <pre style={{ 
            padding: '20px', 
            background: '#090b11', 
            color: '#cbd5e1', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '13.5px', 
            lineHeight: 1.6, 
            overflowX: 'auto',
            margin: 0
          }}>
            {submission.code || '// Chưa có mã nguồn nộp'}
          </pre>
        </div>
      )}

      {/* Slide-out Socratic AI Tutor Drawer (UC-14) */}
      <SocraticAITutorDrawer 
        isOpen={isTutorOpen} 
        onClose={() => setIsTutorOpen(false)} 
        assignment={assignment}
      />
    </div>
  );
}
