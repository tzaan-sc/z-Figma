import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  Cpu, 
  Sparkles, 
  FileCode, 
  Save, 
  Layers, 
  Split,
  AlertTriangle
} from 'lucide-react';
import { PLAGIARISM_CASES } from '../../data/mockData';

export default function GradingWorkspace({ submission, onBack }) {
  const { gradeSubmission, assignments, activeAssignmentId } = useApp();
  const assignment = assignments.find(a => a.id === activeAssignmentId) || assignments[0];

  const [leftTab, setLeftTab] = useState('code'); // code | tests | ai
  const [rightTab, setRightTab] = useState('rubric'); // rubric | plagiarism

  // Grading scores per rubric criterion
  const [correctnessScore, setCorrectnessScore] = useState(submission.autoScore || 9.0);
  const [qualityScore, setQualityScore] = useState(8.5);
  const [complexityScore, setComplexityScore] = useState(9.0);
  const [feedback, setFeedback] = useState(submission.teacherFeedback || 'Thuật toán tối ưu, xử lý tốt các trường hợp biên. Cần chú ý viết docstring đầy đủ hơn.');

  // Total calculated official score (weighted average: Correctness 50%, Quality 25%, Complexity 25%)
  const calculatedScore = (
    (correctnessScore * 0.5) + 
    (qualityScore * 0.25) + 
    (complexityScore * 0.25)
  ).toFixed(1);

  const handleSaveDraftGrading = () => {
    gradeSubmission(submission.id, Number(calculatedScore), feedback);
  };

  const handleConfirmOfficialGrade = () => {
    gradeSubmission(submission.id, Number(calculatedScore), feedback);
    onBack();
  };

  const plagCase = PLAGIARISM_CASES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 110px)', gap: '14px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '10px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onBack}>
            <ArrowLeft size={14} /> Trở lại danh sách
          </button>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
              Đang chấm bài: {submission.studentName} ({submission.studentCode})
            </span>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {assignment.title}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Điểm tổng kết: <strong style={{ color: 'var(--success-text)', fontSize: '16px' }}>{calculatedScore} / 10</strong>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleSaveDraftGrading}>
            <Save size={14} /> Lưu bản tạm
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleConfirmOfficialGrade}>
            <CheckCircle2 size={14} /> Xác nhận Điểm chính thức (UC-27)
          </button>
        </div>
      </div>

      {/* Main Split-View Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '14px', flex: 1, minHeight: 0 }}>
        {/* Left Pane: Code & Evidence */}
        <div style={{ 
          background: 'var(--bg-surface)', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-default)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Sub-tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)', padding: '6px 12px', gap: '6px' }}>
            <button 
              className={`btn btn-sm ${leftTab === 'code' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setLeftTab('code')}
            >
              <FileCode size={13} /> Mã nguồn nộp (UC-24)
            </button>
            <button 
              className={`btn btn-sm ${leftTab === 'tests' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setLeftTab('tests')}
            >
              <Cpu size={13} /> Sandbox Test Evidence (UC-25)
            </button>
            <button 
              className={`btn btn-sm ${leftTab === 'ai' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setLeftTab('ai')}
            >
              <Sparkles size={13} /> Đánh giá AI Review
            </button>
          </div>

          {/* Left Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {leftTab === 'code' && (
              <pre style={{ 
                background: 'var(--bg-dark-code)', 
                color: '#F8FAFC', 
                padding: '16px', 
                borderRadius: '8px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '13px', 
                lineHeight: 1.6,
                margin: 0,
                border: '1px solid #1E293B'
              }}>
                {assignment.studentSubmission?.code || `def reverse_words(s: str) -> str:
    words = s.strip().split()
    return " ".join(reversed(words))

if __name__ == "__main__":
    import sys
    input_str = sys.stdin.read().strip()
    print(reverse_words(input_str))`}
              </pre>
            )}

            {leftTab === 'tests' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Kết quả Hidden Tests (Auto-Grader)</h4>
                  <span className="badge badge-completed">Pass 4 / 4 Tests (10.0 pts)</span>
                </div>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Test ID</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                        <th>RAM</th>
                        <th>Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>H1</td>
                        <td><Badge status="AC" type="test-status" /></td>
                        <td>0.04s</td>
                        <td>14.2MB</td>
                        <td style={{ color: 'var(--success)', fontWeight: 700 }}>25/25</td>
                      </tr>
                      <tr>
                        <td>H2</td>
                        <td><Badge status="AC" type="test-status" /></td>
                        <td>0.03s</td>
                        <td>14.1MB</td>
                        <td style={{ color: 'var(--success)', fontWeight: 700 }}>25/25</td>
                      </tr>
                      <tr>
                        <td>H3</td>
                        <td><Badge status="AC" type="test-status" /></td>
                        <td>0.04s</td>
                        <td>14.3MB</td>
                        <td style={{ color: 'var(--success)', fontWeight: 700 }}>25/25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {leftTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="glass-card" style={{ padding: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-accent)' }}>AI REVIEW BÁO CÁO NHANH</span>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.6 }}>
                    Thuật toán đạt $O(N)$ thời gian và $O(N)$ không gian bộ nhớ. AST sạch, độ phức tạp phân nhánh Cyclomatic Complexity = 1 (Rất tốt).
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Rubric & Plagiarism Tabs */}
        <div style={{ 
          background: 'var(--bg-surface)', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-default)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Sub-tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)', padding: '6px 12px', gap: '6px' }}>
            <button 
              className={`btn btn-sm ${rightTab === 'rubric' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRightTab('rubric')}
            >
              <Award size={13} /> Chấm theo Rubric (UC-27)
            </button>
            <button 
              className={`btn btn-sm ${rightTab === 'plagiarism' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRightTab('plagiarism')}
            >
              <ShieldAlert size={13} /> Đối soát trùng lặp / Plagiarism (UC-26)
            </button>
          </div>

          {/* Right Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
            {rightTab === 'rubric' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Rubric Criteria 1 */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                      1. Correctness (Hidden Test Cases) - Trọng số 50%
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{correctnessScore} / 10</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.5" 
                    value={correctnessScore} 
                    onChange={e => setCorrectnessScore(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
                  />
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    * Tự động đồng bộ từ tỷ lệ pass test trong Docker Sandbox.
                  </div>
                </div>

                {/* Rubric Criteria 2 */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                      2. Code Quality & PEP8/Style - Trọng số 25%
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{qualityScore} / 10</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.5" 
                    value={qualityScore} 
                    onChange={e => setQualityScore(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
                  />
                </div>

                {/* Rubric Criteria 3 */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                      3. Thuật toán & Tối ưu Complexity - Trọng số 25%
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{complexityScore} / 10</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.5" 
                    value={complexityScore} 
                    onChange={e => setComplexityScore(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
                  />
                </div>

                {/* Teacher Feedback Textarea */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Nhận xét chi tiết của Giảng viên</label>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="Nhập nhận xét hướng dẫn sinh viên..."
                  />
                </div>
              </div>
            )}

            {rightTab === 'plagiarism' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: 700 }}>
                    <AlertTriangle size={18} /> Cảnh báo trùng lặp cao: {plagCase.similarity}%
                  </div>
                  <p style={{ fontSize: '13px', color: '#fecaca', marginTop: '6px' }}>
                    Phát hiện cấu trúc AST tương đồng giữa <strong>{plagCase.studentA.name}</strong> và <strong>{plagCase.studentB.name}</strong>.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>ĐOẠN MÃ TRÙNG KHỚP CẤU TRÚC (AST)</span>
                  <div style={{ marginTop: '8px', background: '#080a10', padding: '10px', borderRadius: '6px', fontSize: '12.5px', color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                    {plagCase.identicalBlocks[0].codeSnippet}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Kết luận hệ thống: {plagCase.identicalBlocks[0].verdict}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
