import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock, 
  Archive, 
  RotateCcw, 
  Users, 
  UserCheck, 
  Search,
  AlertTriangle,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function ClassManagement() {
  const { 
    classes, 
    closeClass, 
    reopenClass, 
    archiveClass, 
    restoreClass, 
    hardDeleteClass, 
    currentRole,
    addToast 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [manageStudentsClass, setManageStudentsClass] = useState(null);
  const [assignTeacherClass, setAssignTeacherClass] = useState(null);

  // New Class Form State (UC-34)
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState('Khoa Công nghệ Thông tin');
  const [newSemester, setNewSemester] = useState('Học kỳ 1 - 2026/2027');

  const filtered = classes.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase()) ||
                          c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateClass = (e) => {
    e.preventDefault();
    addToast(`Đã tạo lớp học mới "${newCode}" thành công (UC-34).`, 'success');
    setIsCreateOpen(false);
    setNewCode('');
    setNewName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            Quản lý Lớp học & Vòng đời Đào tạo
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            {currentRole === 'dept_admin' 
              ? 'Phạm vi Giáo vụ: Quản lý các lớp thuộc Khoa/Bộ môn phụ trách.' 
              : 'Phạm vi Quản trị viên: Quản lý toàn bộ danh mục lớp học cấp toàn trường.'}
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} /> Tạo lớp học mới (UC-34)
        </button>
      </div>

      {/* Strict Lifecycle Rules Banner */}
      <div style={{ 
        background: 'var(--info-bg)', 
        border: '1px solid var(--info-border)', 
        borderRadius: 'var(--radius-md)', 
        padding: '12px 18px',
        fontSize: '13px',
        color: 'var(--info-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <strong>Quy tắc Lifecycle chuẩn DOAN4:</strong> Hoạt động ⇄ Đã đóng (UC-36) ⇄ Lưu trữ (UC-37). 
          <span style={{ color: 'var(--warning-text)', marginLeft: '6px', fontWeight: 600 }}>
            Hard Delete chỉ được phép khi: <code>student_count == 0</code> VÀ <code>assignment_count == 0</code>.
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Tìm theo mã lớp, tên môn..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '34px' }}
          />
        </div>

        <select 
          className="form-select" 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="ACTIVE">Hoạt động</option>
          <option value="CLOSED">Đã đóng</option>
          <option value="ARCHIVED">Lưu trữ</option>
        </select>
      </div>

      {/* Classes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map(cls => {
          const isActive = cls.status === 'ACTIVE';
          const isClosed = cls.status === 'CLOSED';
          const isArchived = cls.status === 'ARCHIVED';

          return (
            <div key={cls.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                    {cls.code}
                  </span>
                  <Badge status={cls.status} type="class-status" />
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {cls.name}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  {cls.departmentName} • {cls.semester}
                </p>

                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', padding: '12px', borderRadius: '8px', margin: '14px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Giảng viên phụ trách:</span>
                    <span style={{ fontWeight: 600, color: cls.teacherName ? 'var(--text-primary)' : 'var(--warning-text)' }}>
                      {cls.teacherName || 'Chưa phân công'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sinh viên trong lớp:</span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{cls.studentCount} SV</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Số bài tập đã giao:</span>
                    <span style={{ fontWeight: 700, color: 'var(--success-text)' }}>{cls.assignmentCount} bài</span>
                  </div>
                </div>
              </div>

              {/* Actions per lifecycle rules */}
              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Secondary management buttons (UC-38 & UC-39) */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                    onClick={() => setManageStudentsClass(cls)}
                    title="Quản lý Sinh viên trong lớp (UC-38)"
                  >
                    <Users size={13} /> QL Sinh viên ({cls.studentCount})
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                    onClick={() => setAssignTeacherClass(cls)}
                    title="Phân công Giảng viên (UC-39)"
                  >
                    <UserCheck size={13} /> Phân công GV
                  </button>
                </div>

                {/* Primary lifecycle actions */}
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                  {isActive && (
                    <>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingClass(cls)}
                        title="Chỉnh sửa lớp (UC-35)"
                      >
                        <Edit size={13} /> Sửa
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => closeClass(cls.id)}
                        title="Đóng lớp (UC-36)"
                      >
                        <Lock size={13} /> Đóng lớp
                      </button>
                    </>
                  )}

                  {isClosed && (
                    <>
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => reopenClass(cls.id)}
                        title="Mở lại lớp (UC-36)"
                      >
                        <Unlock size={13} /> Mở lại
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => archiveClass(cls.id)}
                        title="Lưu trữ lớp (UC-37)"
                      >
                        <Archive size={13} /> Lưu trữ
                      </button>
                    </>
                  )}

                  {isArchived && (
                    <>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => restoreClass(cls.id)}
                        title="Khôi phục lớp về Đã đóng (UC-37)"
                      >
                        <RotateCcw size={13} /> Khôi phục (Restore)
                      </button>
                    </>
                  )}

                  {/* Hard Delete button (UC-37) with validation check */}
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => hardDeleteClass(cls.id)}
                    title="Xóa vĩnh viễn (Hard Delete - chỉ khi SV=0 và Bài tập=0)"
                  >
                    <Trash2 size={13} /> Hard Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal UC-34: Tạo lớp học mới */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Tạo lớp học mới (UC-34)"
        maxWidth="540px"
      >
        <form onSubmit={handleCreateClass}>
          <div className="form-group">
            <label className="form-label">Mã lớp</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: CNTT-K18C"
              value={newCode}
              onChange={e => setNewCode(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tên môn học / lớp học</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: Cấu trúc dữ liệu & Giải thuật - Lớp K18C"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Khoa / Bộ môn</label>
              <select className="form-select" value={newDept} onChange={e => setNewDept(e.target.value)}>
                <option value="Khoa Công nghệ Thông tin">Khoa CNTT</option>
                <option value="Khoa Kỹ thuật Phần mềm">Khoa KTPM</option>
                <option value="Khoa Hệ thống Thông tin">Khoa HTTT</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Học kỳ</label>
              <input 
                type="text" 
                className="form-input" 
                value={newSemester}
                onChange={e => setNewSemester(e.target.value)} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Xác nhận tạo lớp</button>
          </div>
        </form>
      </Modal>

      {/* Modal UC-38: Quản lý Sinh viên trong lớp */}
      <Modal
        isOpen={!!manageStudentsClass}
        onClose={() => setManageStudentsClass(null)}
        title={`Quản lý sinh viên trong lớp (UC-38): ${manageStudentsClass?.code}`}
        maxWidth="680px"
      >
        {manageStudentsClass && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Sĩ số hiện tại: <strong>{manageStudentsClass.studentCount} sinh viên</strong>
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => addToast('Đã thêm 1 sinh viên vào lớp học (UC-38).', 'success')}>
                <Plus size={14} /> Thêm sinh viên vào lớp
              </button>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>MSSV</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SV2024001</td>
                    <td style={{ fontWeight: 600 }}>Nguyễn Văn An</td>
                    <td>an.nguyen@univ.edu.vn</td>
                    <td><span className="badge badge-completed">Đang học</span></td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" style={{ padding: '2px 6px' }}>
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>SV2024002</td>
                    <td style={{ fontWeight: 600 }}>Lê Thị Bình</td>
                    <td>binh.le@univ.edu.vn</td>
                    <td><span className="badge badge-completed">Đang học</span></td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" style={{ padding: '2px 6px' }}>
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setManageStudentsClass(null)}>Đóng</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal UC-39: Phân công Giảng viên */}
      <Modal
        isOpen={!!assignTeacherClass}
        onClose={() => setAssignTeacherClass(null)}
        title={`Phân công Giảng viên phụ trách (UC-39): ${assignTeacherClass?.code}`}
        maxWidth="480px"
      >
        {assignTeacherClass && (
          <div>
            <div className="form-group">
              <label className="form-label">Chọn Giảng viên phụ trách giảng dạy</label>
              <select className="form-select" defaultValue="3">
                <option value="3">TS. Trần Minh Tuấn (Khoa CNTT)</option>
                <option value="7">TS. Vũ Thị Hạnh (Khoa KTPM)</option>
                <option value="8">ThS. Đỗ Hoàng Nam (Khoa CNTT)</option>
              </select>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              * Giảng viên được phân công sẽ có toàn quyền tạo bài tập, giao bài và xác nhận điểm chính thức cho lớp này (theo UC-17..27).
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setAssignTeacherClass(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                addToast('Đã phân công Giảng viên cho lớp thành công (UC-39).', 'success');
                setAssignTeacherClass(null);
              }}>
                Lưu phân công
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
