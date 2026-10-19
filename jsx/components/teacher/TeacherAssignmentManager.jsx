import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Calendar, 
  Cpu, 
  Layers, 
  Send, 
  FileCode, 
  CheckCircle2, 
  Eye,
  Sliders,
  Users
} from 'lucide-react';

export default function TeacherAssignmentManager() {
  const { assignments, classes, addAssignment, deleteAssignment, setCurrentTab, setActiveAssignmentId, addToast } = useApp();
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAsg, setEditingAsg] = useState(null); // for UC-18
  const [deadlineAsg, setDeadlineAsg] = useState(null); // for UC-20
  const [testCaseAsg, setTestCaseAsg] = useState(null); // for UC-21
  const [rubricAsg, setRubricAsg] = useState(null); // for UC-22
  const [assignClassAsg, setAssignClassAsg] = useState(null); // for UC-23

  // Form states for creating new assignment (UC-17)
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [difficulty, setDifficulty] = useState('Medium');
  const [timeLimit, setTimeLimit] = useState(1.0);
  const [memoryLimit, setMemoryLimit] = useState(128);
  const [deadline, setDeadline] = useState('2026-11-01 23:59:59');
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 1);
  const [description, setDescription] = useState('');

  // Handle create (UC-17)
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const targetClass = classes.find(c => c.id === Number(selectedClassId));
    addAssignment({
      code: code || `BT-${Date.now().toString().slice(-4)}`,
      title,
      classId: Number(selectedClassId),
      className: targetClass ? targetClass.code : 'CNTT-K18A',
      language,
      difficulty,
      timeLimit: Number(timeLimit),
      memoryLimit: Number(memoryLimit),
      deadline,
      description: description || 'Mô tả bài toán lập trình...',
      sampleTests: [
        { id: 'S1', input: 'sample input 1', output: 'sample output 1' }
      ],
      hiddenTests: [
        { id: 'H1', input: 'hidden test 1', expected: 'hidden output 1', weight: 50 },
        { id: 'H2', input: 'hidden test 2', expected: 'hidden output 2', weight: 50 }
      ],
      rubrics: [
        { id: 'R1', criterion: 'Correctness (Hidden Tests)', weight: 70, autoCalculated: true, desc: 'Tự động tính từ Docker Sandbox' },
        { id: 'R2', criterion: 'Code Quality & Style', weight: 30, autoCalculated: false, desc: 'Đánh giá thủ công & AI Review' }
      ]
    });

    setIsCreateModalOpen(false);
    setTitle('');
    setCode('');
    setDescription('');
  };

  const handleOpenSubmissions = (asgId) => {
    setActiveAssignmentId(asgId);
    setCurrentTab('teacher-submissions');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý bài tập & Cấu hình đánh giá</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Tạo bài tập (UC-17), sửa thông tin (UC-18), đặt Deadline (UC-20), thiết lập Test Cases (UC-21) và Rubric (UC-22).
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={() => setIsCreateModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} /> Tạo bài tập mới (UC-17)
        </button>
      </div>

      {/* Assignment Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã bài</th>
              <th>Tên bài tập</th>
              <th>Lớp phụ trách</th>
              <th>Ngôn ngữ</th>
              <th>Độ khó</th>
              <th>Thời hạn (Deadline)</th>
              <th>Cấu hình</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(asg => (
              <tr key={asg.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-accent)' }}>{asg.code}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{asg.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Time: {asg.timeLimit}s • RAM: {asg.memoryLimit}MB
                  </div>
                </td>
                <td><span className="badge badge-purple">{asg.className}</span></td>
                <td><span className="badge badge-draft">{asg.language}</span></td>
                <td><Badge status={asg.difficulty} type="difficulty" /></td>
                <td style={{ fontSize: '13px', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="var(--text-muted)" />
                    <span>{asg.deadline}</span>
                  </div>
                </td>
                <td>
                  {/* Quick UC configuration buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      title="Thiết lập Test Cases (UC-21)"
                      onClick={() => setTestCaseAsg(asg)}
                    >
                      <Cpu size={12} /> Tests ({asg.hiddenTests?.length || 0})
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      title="Thiết lập Rubric (UC-22)"
                      onClick={() => setRubricAsg(asg)}
                    >
                      <Layers size={12} /> Rubric
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      title="Thiết lập Hạn nộp (UC-20)"
                      onClick={() => setDeadlineAsg(asg)}
                    >
                      <Clock size={12} /> Hạn
                    </button>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenSubmissions(asg.id)}
                      title="Xem bài nộp của sinh viên (UC-24)"
                    >
                      <Users size={12} /> Bài nộp
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setAssignClassAsg(asg)}
                      title="Giao cho lớp (UC-23)"
                    >
                      <Send size={12} /> Giao
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingAsg(asg)}
                      title="Chỉnh sửa thông tin chung (UC-18)"
                    >
                      <Edit size={12} />
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteAssignment(asg.id)}
                      title="Xóa / vô hiệu hóa bài tập (UC-19)"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal UC-17: Tạo bài tập mới */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Tạo bài tập mới & Cấu hình ban đầu (UC-17)"
        maxWidth="680px"
      >
        <form onSubmit={handleCreateAssignment}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Mã bài tập</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="VD: BT04-GRAPH" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tên bài tập</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="VD: Duyệt đồ thị theo chiều sâu (DFS)" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Ngôn ngữ</label>
              <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="Python">Python 3.11</option>
                <option value="C++">C++ (GCC 13)</option>
                <option value="Java">Java 17</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Độ khó</label>
              <select className="form-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="Easy">Dễ (Easy)</option>
                <option value="Medium">Trung bình (Medium)</option>
                <option value="Hard">Khó (Hard)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Gán lớp ban đầu</label>
              <select className="form-select" value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)}>
                {classes.filter(c => c.status === 'ACTIVE').map(c => (
                  <option key={c.id} value={c.id}>{c.code}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Time Limit (giây)</label>
              <input 
                type="number" 
                step="0.1" 
                className="form-input" 
                value={timeLimit} 
                onChange={e => setTimeLimit(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">RAM Limit (MB)</label>
              <input 
                type="number" 
                className="form-input" 
                value={memoryLimit} 
                onChange={e => setMemoryLimit(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hạn nộp (Deadline)</label>
              <input 
                type="text" 
                className="form-input" 
                value={deadline} 
                onChange={e => setDeadline(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Đề bài & Yêu cầu kỹ thuật (Hỗ trợ Markdown)</label>
            <textarea 
              className="form-textarea" 
              rows={5} 
              placeholder="Nhập mô tả đề bài, định dạng Input/Output, ràng buộc..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Xác nhận tạo bài tập</button>
          </div>
        </form>
      </Modal>

      {/* Modal UC-18: Chỉnh sửa thông tin chung bài tập */}
      <Modal
        isOpen={!!editingAsg}
        onClose={() => setEditingAsg(null)}
        title={`Chỉnh sửa thông tin chung bài tập (UC-18): ${editingAsg?.code}`}
        maxWidth="600px"
      >
        {editingAsg && (
          <form onSubmit={(e) => {
            e.preventDefault();
            addToast(`Đã cập nhật thông tin chung bài tập ${editingAsg.code} (UC-18).`, 'success');
            setEditingAsg(null);
          }}>
            <div className="form-group">
              <label className="form-label">Tên bài tập</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={editingAsg.title} 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Ngôn ngữ</label>
                <select className="form-select" defaultValue={editingAsg.language}>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mức độ khó</label>
                <select className="form-select" defaultValue={editingAsg.difficulty}>
                  <option value="Easy">Dễ</option>
                  <option value="Medium">Trung bình</option>
                  <option value="Hard">Khó</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Time Limit (giây)</label>
                <input type="number" step="0.1" className="form-input" defaultValue={editingAsg.timeLimit} />
              </div>
              <div className="form-group">
                <label className="form-label">Memory Limit (MB)</label>
                <input type="number" className="form-input" defaultValue={editingAsg.memoryLimit} />
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              * Theo phân định nghiệp vụ RULES.md: Form UC-18 chỉ xử lý Tên, Đề bài, Ngôn ngữ, Độ khó, Giới hạn tài nguyên. Deadline (UC-20), Test Cases (UC-21) và Rubric (UC-22) được quản lý qua các form chức năng độc lập.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setEditingAsg(null)}>Hủy</button>
              <button type="submit" className="btn btn-primary">Lưu thay đổi thông tin</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal UC-20: Thiết lập hạn nộp (Deadline) */}
      <Modal
        isOpen={!!deadlineAsg}
        onClose={() => setDeadlineAsg(null)}
        title={`Thiết lập hạn nộp bài (UC-20): ${deadlineAsg?.title}`}
        maxWidth="500px"
      >
        {deadlineAsg && (
          <div>
            <div className="form-group">
              <label className="form-label">Thời hạn nộp chính thức (Strict Deadline)</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={deadlineAsg.deadline} 
              />
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', marginBottom: '16px' }}>
              <span style={{ fontSize: '12.5px', color: '#fca5a5' }}>
                <strong>Strict No-Late Rule:</strong> Sau thời điểm này, toàn bộ Editor sẽ khóa, hệ thống tự động chốt danh sách SUBMITTED và chạy Batch Grading. Không nhận bài nộp muộn.
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setDeadlineAsg(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                addToast('Đã cập nhật thời hạn nộp bài (UC-20).', 'success');
                setDeadlineAsg(null);
              }}>
                Lưu hạn nộp
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal UC-21: Thiết lập Test Cases */}
      <Modal
        isOpen={!!testCaseAsg}
        onClose={() => setTestCaseAsg(null)}
        title={`Thiết lập Test Cases (UC-21): ${testCaseAsg?.title}`}
        maxWidth="740px"
      >
        {testCaseAsg && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Tập Hidden Test Cases dùng để chấm điểm tự động trong Docker Sandbox.
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => addToast('Đã thêm 1 test case mới.', 'info')}>
                <Plus size={14} /> Thêm Test Case
              </button>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Test</th>
                    <th>Loại</th>
                    <th>Input Test</th>
                    <th>Expected Output</th>
                    <th>Trọng số %</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {testCaseAsg.hiddenTests?.map((ht, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{ht.id}</td>
                      <td><span className="badge badge-purple">Hidden</span></td>
                      <td><code>{ht.input}</code></td>
                      <td><code>{ht.expected}</code></td>
                      <td><span className="badge badge-completed">{ht.weight}%</span></td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm" style={{ padding: '3px 8px' }}>
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setTestCaseAsg(null)}>Đóng</button>
              <button className="btn btn-primary" onClick={() => {
                addToast('Đã lưu cấu hình Test Cases (UC-21).', 'success');
                setTestCaseAsg(null);
              }}>
                Lưu bộ Test Cases
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal UC-22: Thiết lập Rubric */}
      <Modal
        isOpen={!!rubricAsg}
        onClose={() => setRubricAsg(null)}
        title={`Thiết lập Tiêu chí chấm điểm Rubric (UC-22): ${rubricAsg?.title}`}
        maxWidth="740px"
      >
        {rubricAsg && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Tổng trọng số các tiêu chí phải đạt 100%. Tiêu chí Correctness liên kết kết quả Hidden Tests.
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => addToast('Đã thêm 1 tiêu chí rubric mới.', 'info')}>
                <Plus size={14} /> Thêm Tiêu chí
              </button>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>Trọng số %</th>
                    <th>Cơ chế tính</th>
                    <th>Mô tả</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricAsg.rubrics?.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.criterion}</td>
                      <td>
                        <input 
                          type="number" 
                          className="form-input" 
                          defaultValue={r.weight} 
                          style={{ width: '80px', height: '32px' }} 
                        />
                      </td>
                      <td>
                        {r.autoCalculated ? (
                          <span className="badge badge-completed">Auto (Sandbox)</span>
                        ) : (
                          <span className="badge badge-draft">Giáo viên chấm</span>
                        )}
                      </td>
                      <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setRubricAsg(null)}>Đóng</button>
              <button className="btn btn-primary" onClick={() => {
                addToast('Đã lưu cấu hình Rubric chấm điểm (UC-22).', 'success');
                setRubricAsg(null);
              }}>
                Lưu bảng Rubric
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal UC-23: Giao bài tập cho lớp */}
      <Modal
        isOpen={!!assignClassAsg}
        onClose={() => setAssignClassAsg(null)}
        title={`Giao bài tập cho lớp học phụ trách (UC-23): ${assignClassAsg?.title}`}
        maxWidth="500px"
      >
        {assignClassAsg && (
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Chọn các lớp học đang Hoạt động do bạn phụ trách để giao bài tập này:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {classes.filter(c => c.status === 'ACTIVE').map(c => (
                <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={c.id === assignClassAsg.classId} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{c.code} - {c.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.studentCount} Sinh viên • {c.semester}</div>
                  </div>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setAssignClassAsg(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                addToast(`Đã giao bài tập thành công cho các lớp được chọn (UC-23).`, 'success');
                setAssignClassAsg(null);
              }}>
                Xác nhận giao bài
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
