import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { 
  Users, 
  UserPlus, 
  FileSpreadsheet, 
  Lock, 
  Unlock, 
  KeyRound, 
  Trash2, 
  Search, 
  ShieldCheck, 
  Mail, 
  Phone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import ImportUsersModal from './ImportUsersModal';

export default function UserManagement() {
  const { 
    users, 
    toggleLockUser, 
    addUser, 
    resetUserPassword, 
    addToast 
  } = useApp();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // New user form state (UC-28)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('Khoa Công nghệ Thông tin');
  const [code, setCode] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.code.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    addUser({
      name,
      email,
      role,
      roleLabel: role === 'student' ? 'Sinh viên' : role === 'teacher' ? 'Giảng viên' : 'Giáo vụ Khoa',
      department,
      code: code || `USR${Date.now().toString().slice(-4)}`,
      avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    });
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setCode('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý người dùng & Phân quyền đào tạo</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Tạo tài khoản (UC-28), Khóa/Mở (UC-29), Phân quyền (UC-31), Đặt lại mật khẩu (UC-32), Nhập Excel/CSV (UC-33).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setIsImportModalOpen(true)}
          >
            <FileSpreadsheet size={16} /> Import Excel / CSV (UC-33)
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus size={16} /> Thêm người dùng (UC-28)
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Tìm theo Tên, Email, Mã định danh..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <select 
          className="form-select" 
          value={roleFilter} 
          onChange={e => setRoleFilter(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="student">Sinh viên</option>
          <option value="teacher">Giảng viên</option>
          <option value="dept_admin">Giáo vụ Khoa</option>
          <option value="admin">Quản trị viên (Đào tạo)</option>
        </select>
      </div>

      {/* Users Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã người dùng</th>
              <th>Họ và tên</th>
              <th>Email liên hệ</th>
              <th>Vai trò</th>
              <th>Đơn vị / Khoa</th>
              <th>Trạng thái</th>
              <th>Thao tác nghiệp vụ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => {
              const isLocked = u.status === 'LOCKED';

              return (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{u.code}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.phone || '0987654321'}</div>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td>
                    <span className="badge badge-purple">{u.roleLabel}</span>
                  </td>
                  <td style={{ fontSize: '13px' }}>{u.department}</td>
                  <td>
                    {isLocked ? (
                      <span className="badge badge-danger"><Lock size={12} /> Đã khóa</span>
                    ) : (
                      <span className="badge badge-completed"><CheckCircle2 size={12} /> Hoạt động</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {/* UC-29 Lock/Unlock */}
                      <button 
                        className={`btn btn-sm ${isLocked ? 'btn-success' : 'btn-outline-danger'}`}
                        onClick={() => toggleLockUser(u.id)}
                        title={isLocked ? 'Mở khóa tài khoản (UC-29)' : 'Khóa tài khoản (UC-29)'}
                      >
                        {isLocked ? <Unlock size={12} /> : <Lock size={12} />}
                      </button>

                      {/* UC-32 Reset password */}
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => resetUserPassword(u.id)}
                        title="Đặt lại mật khẩu tạm thời (UC-32)"
                      >
                        <KeyRound size={12} />
                      </button>

                      {/* UC-30 Soft Delete */}
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => addToast(`Tài khoản ${u.code} có dữ liệu bài làm: Đã chuyển sang Xóa mềm (Soft Delete - UC-30).`, 'info')}
                        title="Xóa tài khoản / Soft Delete (UC-30)"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal UC-28: Tạo tài khoản người dùng */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tạo tài khoản người dùng mới (UC-28)"
        maxWidth="520px"
      >
        <form onSubmit={handleCreateUser}>
          <div className="form-group">
            <label className="form-label">Mã người dùng (MSSV / MSGV)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: SV2026019 hoặc GV2026002"
              value={code}
              onChange={e => setCode(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: Trần Hoàng Nam"
              value={name}
              onChange={e => setName(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email tài khoản</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="nam.tran@univ.edu.vn"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Vai trò nghiệp vụ</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Sinh viên</option>
                <option value="teacher">Giảng viên</option>
                <option value="dept_admin">Giáo vụ Khoa</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Khoa / Đơn vị</label>
              <select className="form-select" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="Khoa Công nghệ Thông tin">Khoa CNTT</option>
                <option value="Khoa Kỹ thuật Phần mềm">Khoa KTPM</option>
                <option value="Khoa Hệ thống Thông tin">Khoa HTTT</option>
              </select>
            </div>
          </div>

          <div style={{ background: 'var(--info-bg)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--info-border)', marginBottom: '16px', fontSize: '12.5px', color: 'var(--info-text)' }}>
            * Hệ thống tự động sinh <strong>Mật khẩu tạm thời</strong> và gửi qua email. Người dùng bắt buộc phải đổi mật khẩu trong lần đăng nhập đầu tiên (theo quy tắc UC-01 & UC-28).
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Xác nhận tạo tài khoản</button>
          </div>
        </form>
      </Modal>

      {/* Modal UC-33: Import Excel / CSV */}
      <ImportUsersModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </div>
  );
}
