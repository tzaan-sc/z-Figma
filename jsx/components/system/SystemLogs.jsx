import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Terminal, Download, Search, Filter, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export default function SystemLogs() {
  const { systemLogs, addToast } = useApp();
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredLogs = systemLogs.filter(log => {
    const matchesLevel = levelFilter === 'ALL' || log.level === levelFilter;
    const matchesService = serviceFilter === 'ALL' || log.service === serviceFilter;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
                          log.service.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesService && matchesSearch;
  });

  const handleExport = () => {
    addToast('Đã xuất toàn bộ file System Logs (.csv) thành công (UC-44).', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý & Tra cứu System Logs (UC-44)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Quản trị viên hệ thống (IT): Tra cứu, lọc theo mức độ cảnh báo, dịch vụ và xuất báo cáo vận hành.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handleExport}>
          <Download size={16} /> Xuất System Logs (.CSV)
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Tìm theo nội dung log, từ khóa..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '34px' }}
          />
        </div>

        <select 
          className="form-select" 
          value={levelFilter} 
          onChange={e => setLevelFilter(e.target.value)}
          style={{ width: '160px' }}
        >
          <option value="ALL">Mức độ: Tất cả</option>
          <option value="INFO">INFO (Thông tin)</option>
          <option value="WARN">WARN (Cảnh báo)</option>
          <option value="ERROR">ERROR (Lỗi nghiêm trọng)</option>
        </select>

        <select 
          className="form-select" 
          value={serviceFilter} 
          onChange={e => setServiceFilter(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="ALL">Dịch vụ: Tất cả</option>
          <option value="AUTH">AUTH (Xác thực)</option>
          <option value="GRADER">GRADER (Chấm điểm)</option>
          <option value="DOCKER">DOCKER (Sandbox)</option>
          <option value="AI_REVIEW">AI_REVIEW</option>
          <option value="AUTOSAVE">AUTOSAVE</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Mức độ</th>
              <th>Dịch vụ (Service)</th>
              <th>Nội dung sự kiện hệ thống (Message)</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => {
              let badgeClass = 'badge-completed';
              let icon = <Info size={12} />;
              if (log.level === 'WARN') {
                badgeClass = 'badge-grading';
                icon = <AlertTriangle size={12} />;
              } else if (log.level === 'ERROR') {
                badgeClass = 'badge-danger';
                icon = <AlertCircle size={12} />;
              }

              return (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </td>
                  <td>
                    <span className={`badge ${badgeClass}`}>
                      {icon} {log.level}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-purple">{log.service}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)' }}>
                    {log.message}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
