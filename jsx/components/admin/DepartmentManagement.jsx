import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { Building2, Plus, Edit, Users, BookOpen, UserCheck } from 'lucide-react';

export default function DepartmentManagement() {
  const { departments, addToast } = useApp();
  const [assignModalDept, setAssignModalDept] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý tổ chức & Khoa / Bộ môn (UC-43)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Thiết lập cơ cấu tổ chức đào tạo và phân công tài khoản Giáo vụ phụ trách từng Khoa/Bộ môn.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => addToast('Mở form tạo Khoa / Bộ môn mới.', 'info')}>
          <Plus size={16} /> Thêm Khoa / Bộ môn
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {departments.map(dept => (
          <div key={dept.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', border: '1px solid var(--info-border)' }}>
                <Building2 size={22} />
              </div>
              <span className="badge badge-purple">{dept.code}</span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {dept.name}
            </h3>

            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', padding: '12px', borderRadius: '8px', margin: '14px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Giáo vụ phụ trách:</span>
                <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{dept.manager}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Số lớp trực thuộc:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.classCount} lớp</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Giảng viên thuộc Khoa:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.teacherCount} giảng viên</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setAssignModalDept(dept)}
              >
                <UserCheck size={13} /> Phân công Giáo vụ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Phân công Giáo vụ phụ trách */}
      <Modal
        isOpen={!!assignModalDept}
        onClose={() => setAssignModalDept(null)}
        title={`Phân công Giáo vụ phụ trách: ${assignModalDept?.name} (UC-43)`}
        maxWidth="480px"
      >
        {assignModalDept && (
          <div>
            <div className="form-group">
              <label className="form-label">Chọn tài khoản Giáo vụ phụ trách</label>
              <select className="form-select" defaultValue="4">
                <option value="4">Đỗ Mai Lan (GVU2021004)</option>
                <option value="9">Vũ Thị Hạnh (GVU2022010)</option>
                <option value="10">Nguyễn Đình Trọng (GVU2023001)</option>
              </select>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              * Theo RULES.md: Giáo vụ sẽ có toàn quyền tạo lớp, sửa lớp, đóng/mở lớp, quản lý sinh viên và phân công giảng viên trong phạm vi Khoa được phân công.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setAssignModalDept(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                addToast(`Đã phân công Giáo vụ phụ trách ${assignModalDept.name} thành công (UC-43).`, 'success');
                setAssignModalDept(null);
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
