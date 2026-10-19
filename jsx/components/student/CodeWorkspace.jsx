import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { 
  Code2, 
  Save, 
  Upload, 
  Send, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode, 
  ArrowLeft,
  ShieldAlert,
  Info,
  Maximize2
} from 'lucide-react';

export default function CodeWorkspace() {
  const { 
    assignments, 
    activeAssignmentId, 
    saveDraft, 
    submitAssignment, 
    setCurrentTab,
    addToast 
  } = useApp();

  const assignment = assignments.find(a => a.id === activeAssignmentId) || assignments[0];
  const submission = assignment.studentSubmission || { status: 'DRAFT', code: '' };

  const [code, setCode] = useState(submission.code || '');
  const [selectedLang, setSelectedLang] = useState(assignment.language || 'Python');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [lastAutosave, setLastAutosave] = useState(submission.lastSavedAt || 'Vừa xong');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isReadOnly = submission.status === 'SUBMITTED' || submission.status === 'COMPLETED' || assignment.isClosed;

  // Auto-save simulation (triggers periodically when code changes)
  useEffect(() => {
    if (isReadOnly) return;
    const timer = setTimeout(() => {
      const now = new Date().toLocaleTimeString('vi-VN');
      setLastAutosave(now);
      // Autosave without noisy toast
    }, 4000);
    return () => clearTimeout(timer);
  }, [code, isReadOnly]);

  // Upload file (UC-10)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setCode(content);
      saveDraft(assignment.id, content);
      addToast(`Đã nạp file "${file.name}" vào trình soạn thảo và lưu nháp (UC-10).`, 'success');
    };
    reader.readAsText(file);
  };

  // Manual save draft
  const handleManualSave = () => {
    saveDraft(assignment.id, code);
    setLastAutosave(new Date().toLocaleTimeString('vi-VN'));
  };

  // Explicit submit confirm (UC-11)
  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(assignment.id, code);
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      setCurrentTab('result-view');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 110px)', gap: '12px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '10px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setCurrentTab('assignments')}
          >
            <ArrowLeft size={14} /> Danh sách
          </button>
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-accent)' }}>
              {assignment.code} • {assignment.className}
            </span>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
              {assignment.title}
            </h2>
          </div>
          <Badge status={submission.status} type="submission" />
        </div>

        {/* Action buttons & autosave status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} />
            <span>Autosave: <strong style={{ color: 'var(--text-secondary)' }}>{lastAutosave}</strong></span>
          </div>

          {!isReadOnly ? (
            <>
              {/* Upload file button (UC-10) */}
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                <Upload size={14} /> Tải tệp lên (UC-10)
                <input 
                  type="file" 
                  accept=".py,.cpp,.c,.java,.txt" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                />
              </label>

              {/* Save draft button (UC-09) */}
              <button className="btn btn-secondary btn-sm" onClick={handleManualSave}>
                <Save size={14} /> Lưu nháp (UC-09)
              </button>

              {/* Submit button (UC-11) */}
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => setIsSubmitModalOpen(true)}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}
              >
                <Send size={14} /> Nộp bài chính thức (UC-11)
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-submitted">
                Mã nguồn đã khóa (Read-Only)
              </span>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentTab('result-view')}
              >
                Xem kết quả đánh giá (UC-12)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Strict Rule Notice: NO RUN CODE BUTTON FOR STUDENTS */}
      <div style={{ 
        background: 'rgba(99, 102, 241, 0.08)', 
        border: '1px solid rgba(99, 102, 241, 0.25)', 
        borderRadius: 'var(--radius-md)', 
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12.5px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c7d2fe' }}>
          <ShieldAlert size={16} color="var(--primary)" />
          <span>
            <strong>Quy tắc hệ thống (RULES.md):</strong> Sinh viên không có tính năng chạy thử (Run Code) trên Sample Test Cases. Hệ thống tự động chấm gom (Batch Grading) sau Deadline qua Docker Sandbox.
          </span>
        </div>
        <div style={{ color: 'var(--warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={13} /> Hạn nộp: {assignment.deadline}
        </div>
      </div>

      {/* Split View Editor Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '14px', flex: 1, minHeight: 0 }}>
        {/* Left Column: Problem Specs, Sample Tests, Constraints */}
        <div className="glass-card" style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '15px', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCode size={16} color="var(--primary)" /> Yêu cầu đề bài
            </h3>
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {assignment.description}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>
              Sample Test Cases (Tham khảo)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {assignment.sampleTests?.map((st, i) => (
                <div key={i} style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>VÍ DỤ {i + 1}</div>
                  <div style={{ marginTop: '4px', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                    <code style={{ color: '#38bdf8' }}>{st.input}</code>
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Expected Output: </span>
                    <code style={{ color: '#4ade80' }}>{st.output}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {assignment.rubrics && assignment.rubrics.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>
                Thang điểm Rubric
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
                {assignment.rubrics.map(r => (
                  <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{r.criterion}</span>
                    <span style={{ color: 'var(--text-accent)', fontWeight: 700 }}>{r.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor */}
        <div style={{ 
          background: '#0d111b', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-subtle)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden' 
        }}>
          {/* Editor Sub-header */}
          <div style={{ 
            height: '42px', 
            background: '#131929', 
            borderBottom: '1px solid var(--border-subtle)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 16px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Ngôn ngữ:
              </span>
              <select 
                className="form-select" 
                value={selectedLang} 
                onChange={e => setSelectedLang(e.target.value)}
                disabled={isReadOnly}
                style={{ height: '30px', padding: '2px 8px', fontSize: '12px', width: '110px' }}
              >
                <option value="Python">Python 3.11</option>
                <option value="C++">C++ (GCC 13)</option>
                <option value="Java">Java 17</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>UTF-8</span>
              <span>•</span>
              <span>Monaco Core</span>
            </div>
          </div>

          {/* Code Textarea / Editor with Line Numbers */}
          <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
            {/* Fake Line Numbers */}
            <div style={{ 
              width: '44px', 
              background: '#0a0d15', 
              borderRight: '1px solid var(--border-subtle)', 
              padding: '16px 6px', 
              color: '#475569', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '13px', 
              lineHeight: '21px', 
              textAlign: 'right', 
              userSelect: 'none' 
            }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Input Area */}
            <textarea
              value={code}
              onChange={e => !isReadOnly && setCode(e.target.value)}
              readOnly={isReadOnly}
              spellCheck={false}
              placeholder="// Viết mã nguồn bài làm của bạn tại đây..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '16px',
                color: isReadOnly ? '#94a3b8' : '#e2e8f0',
                fontFamily: 'var(--font-mono)',
                fontSize: '13.5px',
                lineHeight: '21px',
                resize: 'none',
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto'
              }}
            />
          </div>

          {/* Bottom Editor Status bar */}
          <div style={{ 
            height: '28px', 
            background: '#090c13', 
            borderTop: '1px solid var(--border-subtle)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 16px', 
            fontSize: '11px', 
            color: 'var(--text-muted)' 
          }}>
            <span>Dòng {code.split('\n').length}, Ký tự {code.length}</span>
            <span>{isReadOnly ? 'Chế độ khóa: READ-ONLY' : 'Trạng thái: DRAFT (Đang chỉnh sửa)'}</span>
          </div>
        </div>
      </div>

      {/* Explicit Submit Confirmation Modal (UC-11) */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Xác nhận nộp bài chính thức (UC-11)"
        maxWidth="480px"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsSubmitModalOpen(false)} disabled={isSubmitting}>
              Quay lại chỉnh sửa
            </button>
            <button className="btn btn-success" onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi bản nộp...' : 'Xác nhận Nộp bài'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={54} color="#f59e0b" style={{ margin: '0 auto' }} />
          <h4 style={{ fontSize: '17px', color: '#fff' }}>
            Bạn có chắc chắn muốn nộp bài làm?
          </h4>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            padding: '14px', 
            borderRadius: 'var(--radius-md)',
            color: '#fca5a5',
            fontSize: '13.5px',
            lineHeight: 1.5,
            textAlign: 'left'
          }}>
            <strong>CẢNH BÁO THEO QUY TẮC BÀI THI:</strong>
            <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
              <li>Sau khi nộp, bài làm sẽ bị <strong>KHÓA VĨNH VIỄN</strong>.</li>
              <li>Bạn <strong>KHÔNG THỂ</strong> chỉnh sửa, lưu nháp hay nộp lại lần 2.</li>
              <li>Hệ thống sẽ giữ đúng 1 bản nộp duy nhất này để chấm gom (Batch Grading) sau giờ Deadline.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
