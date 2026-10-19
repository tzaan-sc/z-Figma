import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Power, 
  RefreshCw, 
  Sliders, 
  Radio, 
  Layers,
  AlertOctagon
} from 'lucide-react';

export default function DockerSandboxManager() {
  const { dockerContainers, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('monitor'); // monitor (UC-42) | config (UC-41)

  // UC-41 Sandbox Config State
  const [defaultCpu, setDefaultCpu] = useState('1.0');
  const [defaultRam, setDefaultRam] = useState(256);
  const [maxTimeout, setMaxTimeout] = useState(5.0);
  const [networkIsolation, setNetworkIsolation] = useState(true);

  const handleKillSession = (id) => {
    addToast(`Đã dừng cưỡng chế (Kill) container sandbox ${id} an toàn (UC-42).`, 'danger');
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    addToast('Đã cập nhật cấu hình hạ tầng Docker Sandbox thành công (UC-41).', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            Hạ tầng Docker Sandbox & Giám sát thực thi (UC-41 & UC-42)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Quản trị viên hệ thống (IT): Quản lý môi trường container cô lập an toàn để thực thi mã nguồn sinh viên.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn ${activeTab === 'monitor' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('monitor')}
          >
            <Activity size={16} /> Giám sát thời gian thực (UC-42)
          </button>
          <button 
            className={`btn ${activeTab === 'config' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('config')}
          >
            <Sliders size={16} /> Cấu hình Sandbox (UC-41)
          </button>
        </div>
      </div>

      {/* Tab UC-42: Real-time Monitoring */}
      {activeTab === 'monitor' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Metrics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
                <Cpu size={26} />
              </div>
              <div>
                <div className="stat-value">3 Workers</div>
                <div className="stat-label">Sandbox Nodes Đang chạy</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
                <HardDrive size={26} />
              </div>
              <div>
                <div className="stat-value">236 MB</div>
                <div className="stat-label">Tổng RAM Sandbox tiêu thụ</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)' }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Network Disconnected (--network none)</div>
              </div>
            </div>
          </div>

          {/* Active Containers Grid */}
          <div className="glass-card">
            <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} color="var(--success-text)" /> Danh sách Container Workers đang chạy
            </h3>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Container ID</th>
                    <th>Tên Node / Worker</th>
                    <th>Base Image</th>
                    <th>Trạng thái</th>
                    <th>CPU Usage</th>
                    <th>RAM Usage</th>
                    <th>Hàng đợi (Queue)</th>
                    <th>Thao tác can thiệp</th>
                  </tr>
                </thead>
                <tbody>
                  {dockerContainers.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>
                        {c.id}
                      </td>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td><code>{c.image}</code></td>
                      <td>
                        <span className={`badge ${c.status === 'RUNNING' ? 'badge-completed' : 'badge-draft'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{c.cpu}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{c.ram}</td>
                      <td>
                        <span className="badge badge-purple">{c.tasksQueued} tác vụ</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleKillSession(c.id)}
                          title="Buộc dừng container (Kill Sandbox)"
                        >
                          <Power size={12} /> Dừng phiên
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Execution Logs Window */}
          <div style={{ 
            background: 'var(--bg-dark-code)', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid #1E293B', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-sm)' 
          }}>
            <div style={{ padding: '12px 18px', background: 'var(--bg-dark-code-header)', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="var(--brand-primary)" />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#F8FAFC' }}>
                Docker Engine Event Stream (Live Telemetry)
              </span>
            </div>
            <div style={{ 
              background: 'var(--bg-dark-code)', 
              padding: '16px', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12.5px', 
              color: '#38bdf8', 
              lineHeight: 1.6, 
              height: '160px', 
              overflowY: 'auto' 
            }}>
              <div>[2026-10-19 21:18:40] [sbx-node-01] container spawned: image=python:3.11-slim user=sandbox_user caps=drop_all</div>
              <div>[2026-10-19 21:18:41] [sbx-node-01] memory cgroup enforced: limit=256MB swappiness=0</div>
              <div>[2026-10-19 21:18:42] [sbx-node-01] execution complete: test_cases=4 exit_code=0 duration=140ms</div>
              <div>[2026-10-19 21:19:00] [sbx-node-02] healthcheck heartbeat OK: latency=2ms ready_for_batch=true</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab UC-41: Sandbox Configuration */}
      {activeTab === 'config' && (
        <form onSubmit={handleSaveConfig} className="glass-card" style={{ maxWidth: '800px' }}>
          <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--brand-primary)" /> Thiết lập tham số môi trường cách ly (UC-41)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">CPU Share tối đa (Cores)</label>
              <input 
                type="text" 
                className="form-input" 
                value={defaultCpu} 
                onChange={e => setDefaultCpu(e.target.value)} 
                required 
              />
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Mặc định 1.0 core ngăn chiếm dụng CPU máy chủ</span>
            </div>

            <div className="form-group">
              <label className="form-label">Dung lượng RAM tối đa (MB)</label>
              <input 
                type="number" 
                className="form-input" 
                value={defaultRam} 
                onChange={e => setDefaultRam(Number(e.target.value))} 
                required 
              />
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Mặc định 256MB / 512MB per container</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Thời gian chạy tối đa (Hard Timeout s)</label>
              <input 
                type="number" 
                step="0.5" 
                className="form-input" 
                value={maxTimeout} 
                onChange={e => setMaxTimeout(Number(e.target.value))} 
                required 
              />
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Tự động kill process khi vượt ngưỡng</span>
            </div>

            <div className="form-group">
              <label className="form-label">Cách ly mạng (Network Isolation)</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={networkIsolation} 
                  onChange={e => setNetworkIsolation(e.target.checked)} 
                />
                <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Bật cấm mạng tuyệt đối (--network none)
                </span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Base Docker Images cấu hình</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input className="form-input" defaultValue="Python: python:3.11-slim" readOnly />
              <input className="form-input" defaultValue="C/C++: gcc:13.2-alpine" readOnly />
              <input className="form-input" defaultValue="Java: openjdk:17-slim" readOnly />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} /> Lưu cấu hình Docker Sandbox
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
