import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { User, Mail, Phone, Lock, Shield, Check, KeyRound, AlertTriangle } from 'lucide-react';

export function ProfileModal({ isOpen, onClose }) {
  const { currentUser, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('view'); // view | edit | password

  // Edit profile state
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '0987654321');

  // Change password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    addToast('Cập nhật thông tin cá nhân thành công (UC-05).', 'success');
    setActiveTab('view');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast('Mật khẩu mới phải có tối thiểu 8 ký tự.', 'danger');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Mật khẩu mới và xác nhận mật khẩu không trùng khớp.', 'danger');
      return;
    }
    if (oldPassword === newPassword) {
      addToast('Mật khẩu mới phải khác mật khẩu cũ (UC-06).', 'danger');
      return;
    }
    addToast('Đổi mật khẩu thành công (UC-06). Các phiên làm việc khác đã được cập nhật.', 'success');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setActiveTab('view');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        activeTab === 'view' ? 'Hồ sơ người dùng (UC-04)' :
        activeTab === 'edit' ? 'Cập nhật thông tin cá nhân (UC-05)' :
        'Đổi mật khẩu tài khoản (UC-06)'
      }
      maxWidth="540px"
      footer={
        <div style={{ display: 'flex', gap: '8px' }}>
          {activeTab !== 'view' && (
            <button className="btn btn-secondary" onClick={() => setActiveTab('view')}>
              Quay lại
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          className={`btn btn-sm ${activeTab === 'view' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('view')}
        >
          <User size={14} /> Thông tin cá nhân
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'edit' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('edit')}
        >
          Chỉnh sửa hồ sơ
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'password' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('password')}
        >
          <KeyRound size={14} /> Đổi mật khẩu
        </button>
      </div>

      {activeTab === 'view' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="avatar-circle" style={{ width: 64, height: 64, fontSize: '24px' }}>
              {currentUser.avatar}
            </div>
            <div>
              <h4 style={{ fontSize: '18px', color: '#fff' }}>{currentUser.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{currentUser.code} • {currentUser.roleLabel}</p>
              <span className="badge badge-completed" style={{ marginTop: '6px' }}>
                <Check size={12} /> Tài khoản đang hoạt động
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Email xác thực:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{currentUser.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Số điện thoại:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{currentUser.phone || '0987654321'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Đơn vị / Khoa:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{currentUser.department}</span>
            </div>
            {currentUser.className && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lớp sinh hoạt:</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{currentUser.className}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input 
              type="text" 
              className="form-input" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input 
              type="tel" 
              className="form-input" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email (Chỉ xem - được quản trị viên cấp)</label>
            <input 
              type="email" 
              className="form-input" 
              value={currentUser.email} 
              disabled 
              style={{ opacity: 0.6 }} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Lưu thay đổi hồ sơ
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label className="form-label">Mật khẩu hiện tại</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Nhập mật khẩu hiện tại..." 
              value={oldPassword} 
              onChange={e => setOldPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu mới</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Tối thiểu 8 ký tự, bao gồm chữ và số..." 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Nhập lại mật khẩu mới..." 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Cập nhật mật khẩu mới
          </button>
        </form>
      )}
    </Modal>
  );
}

export function LogoutModal({ isOpen, onClose }) {
  const { addToast } = useApp();

  const handleConfirmLogout = () => {
    addToast('Đăng xuất thành công (UC-02). Token phiên làm việc đã thu hồi.', 'info');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận đăng xuất (UC-02)"
      maxWidth="420px"
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Hủy bỏ</button>
          <button className="btn btn-danger" onClick={handleConfirmLogout}>Đăng xuất</button>
        </>
      }
    >
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <AlertTriangle size={48} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
        <p style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}>
          Bạn có chắc chắn muốn kết thúc phiên làm việc?
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
          Các thông tin xác thực cục bộ (JWT tokens) sẽ được xóa hoàn toàn khỏi trình duyệt.
        </p>
      </div>
    </Modal>
  );
}

export function ForgotPasswordModal({ isOpen, onClose }) {
  const { addToast } = useApp();
  const [step, setStep] = useState(1); // 1: input email, 2: input otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      addToast('Email không hợp lệ.', 'danger');
      return;
    }
    addToast(`Hệ thống đã gửi mã OTP/link khôi phục đến email: ${email}`, 'success');
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    addToast('Khôi phục mật khẩu thành công (UC-03)! Vui lòng đăng nhập bằng mật khẩu mới.', 'success');
    setStep(1);
    setEmail('');
    setOtp('');
    setNewPass('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quên mật khẩu / Khôi phục tài khoản (UC-03)"
      maxWidth="460px"
    >
      {step === 1 ? (
        <form onSubmit={handleSendRequest}>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Nhập email tài khoản của bạn để nhận mã xác thực OTP khôi phục mật khẩu.
          </p>
          <div className="form-group">
            <label className="form-label">Email tài khoản</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="ten.nguoidung@univ.edu.vn" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Gửi mã xác thực OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Nhập mã OTP đã được gửi đến <strong style={{ color: '#fff' }}>{email}</strong> và mật khẩu mới của bạn.
          </p>
          <div className="form-group">
            <label className="form-label">Mã xác thực OTP (6 chữ số)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: 839210" 
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength={6}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu mới</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Mật khẩu mới tối thiểu 8 ký tự..." 
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              required 
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
              Quay lại
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Xác nhận đặt lại mật khẩu
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
