import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import { FileSpreadsheet, Upload, CheckCircle2, AlertTriangle, Check } from 'lucide-react';

export default function ImportUsersModal({ isOpen, onClose }) {
  const { addToast } = useApp();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Mock preview records according to the 5 mandatory columns: Mã người dùng, Họ tên, Email, Vai trò, Lớp
  const previewRows = [
    { code: 'SV2026101', name: 'Vũ Minh Đức', email: 'duc.vm@univ.edu.vn', role: 'Sinh viên', classCode: 'CNTT-K18A', status: 'VALID' },
    { code: 'SV2026102', name: 'Hoàng Diệu Linh', email: 'linh.hd@univ.edu.vn', role: 'Sinh viên', classCode: 'CNTT-K18A', status: 'VALID' },
    { code: 'GV2026005', name: 'TS. Phan Thanh Tùng', email: 'tung.pt@univ.edu.vn', role: 'Giảng viên', classCode: 'CNTT-K18B', status: 'VALID' },
    { code: 'SV2026103', name: 'Nguyễn Tùng Anh', email: 'invalid-email-format', role: 'Sinh viên', classCode: 'CNTT-K18A', status: 'ERROR_EMAIL' }
  ];

  const handleSimulateUpload = () => {
    setFileUploaded(true);
    addToast('Đã đọc tệp Excel: 4 bản ghi được phát hiện.', 'info');
  };

  const handleConfirmImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setFileUploaded(false);
      onClose();
      addToast('Import thành công 3/4 tài khoản người dùng hợp lệ vào hệ thống (UC-33)!', 'success');
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nhập danh sách người dùng từ Excel/CSV (UC-33)"
      maxWidth="780px"
      footer={
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose} disabled={isImporting}>
            Đóng
          </button>
          {fileUploaded && (
            <button className="btn btn-primary" onClick={handleConfirmImport} disabled={isImporting}>
              {isImporting ? 'Đang nhập dữ liệu...' : 'Xác nhận Import vào hệ thống'}
            </button>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Specification note on the 5 columns */}
        <div style={{ background: 'var(--bg-subtle)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Yêu cầu cấu trúc file (Đặc tả DOAN4 / RULES.md):</strong>
          <p style={{ marginTop: '4px' }}>
            Tệp Excel/CSV bắt buộc gồm đúng <strong>5 cột</strong>: <code>Mã người dùng</code>, <code>Họ tên</code>, <code>Email</code>, <code>Vai trò</code>, <code>Lớp</code>.
          </p>
        </div>

        {/* Upload Dropzone */}
        {!fileUploaded ? (
          <div 
            onClick={handleSimulateUpload}
            style={{
              border: '2px dashed var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--bg-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            <FileSpreadsheet size={48} color="var(--brand-primary)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Chọn hoặc kéo thả tệp Excel/CSV vào đây</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Hỗ trợ định dạng .xlsx, .xls, .csv (Tối đa 10MB)
            </p>
            <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '14px' }}>
              <Upload size={14} /> Tải file mẫu lên (Demo Click)
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Bảng xem trước & Đối soát dữ liệu (Preview):
              </span>
              <span className="badge badge-completed">
                3 Hợp lệ • 1 Cảnh báo
              </span>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã người dùng</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Lớp</th>
                    <th>Kiểm tra lỗi</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, idx) => (
                    <tr key={idx} style={{ background: row.status !== 'VALID' ? 'rgba(239, 68, 68, 0.08)' : 'transparent' }}>
                      <td style={{ fontWeight: 600 }}>{row.code}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td><span className="badge badge-purple">{row.role}</span></td>
                      <td>{row.classCode}</td>
                      <td>
                        {row.status === 'VALID' ? (
                          <span style={{ color: 'var(--success)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={14} /> Hợp lệ
                          </span>
                        ) : (
                          <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <AlertTriangle size={14} /> Sai định dạng email
                          </span>
                        )}
                      </td>
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
