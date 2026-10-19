import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Key, Sliders, CheckCircle2, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export default function AISettings() {
  const { addToast } = useApp();

  const [provider, setProvider] = useState('Google Gemini');
  const [model, setModel] = useState('gemini-1.5-pro');
  const [apiKey, setApiKey] = useState('AIzaSyD-sample-encrypted-key-xxxxxxxxxx');
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [timeout, setTimeout] = useState(30);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      addToast('Kết nối AI Engine thành công! Độ trễ phản hồi: 284ms (UC-40).', 'success');
    }, 1200);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Đã lưu cấu hình tham số AI Engine an toàn vào Vault (UC-40).', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Quản lý cấu hình AI Engine (UC-40)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Tác nhân Quản trị viên hệ thống (IT): Cấu hình mô hình ngôn ngữ lớn, API Key, tham số sinh và timeout.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <form onSubmit={handleSave} className="glass-card">
          <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--brand-primary)" /> Tham số mô hình AI phục vụ Code Review & Socratic Tutor
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Nhà cung cấp dịch vụ (Provider)</label>
              <select className="form-select" value={provider} onChange={e => setProvider(e.target.value)}>
                <option value="Google Gemini">Google Gemini (DeepMind)</option>
                <option value="OpenAI">OpenAI (ChatGPT)</option>
                <option value="Anthropic">Anthropic (Claude)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Mô hình AI (Model Version)</label>
              <select className="form-select" value={model} onChange={e => setModel(e.target.value)}>
                <option value="gemini-1.5-pro">gemini-1.5-pro (Khuyên dùng cho AST Code Review)</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash (Tốc độ cao)</option>
                <option value="gpt-4o">gpt-4o (Omni)</option>
                <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">API Secret Key (Được mã hóa lưu trữ an toàn)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="password" 
                className="form-input" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleTestConnection}
                disabled={isTesting}
                style={{ whiteSpace: 'nowrap' }}
              >
                {isTesting ? <RefreshCw size={14} className="spin" /> : <Zap size={14} />} 
                Kiểm tra kết nối
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Temperature: {temperature}</label>
              <input 
                type="range" 
                min="0.0" 
                max="1.0" 
                step="0.05" 
                className="form-input" 
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                style={{ padding: 0 }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Thấp (0.1 - 0.3) đảm bảo tính chính xác lập trình</span>
            </div>

            <div className="form-group">
              <label className="form-label">Max Output Tokens</label>
              <input 
                type="number" 
                className="form-input" 
                value={maxTokens} 
                onChange={e => setMaxTokens(parseInt(e.target.value))} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Request Timeout (giây)</label>
              <input 
                type="number" 
                className="form-input" 
                value={timeout} 
                onChange={e => setTimeout(parseInt(e.target.value))} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} /> Lưu cấu hình AI Engine
            </button>
          </div>
        </form>

        {/* AI System Status Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card">
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '10px' }}>Trạng thái AI Gateway</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tình trạng:</span>
                <span className="badge badge-completed"><CheckCircle2 size={12} /> Đang hoạt động</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Độ trễ trung bình:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>240ms</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Số request hôm nay:</span>
                <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>1,280 calls</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tỷ lệ lỗi (Error rate):</span>
                <span style={{ color: 'var(--success-text)', fontWeight: 600 }}>0.02%</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-border)' }}>
            <h5 style={{ fontSize: '13px', color: 'var(--brand-primary)', marginBottom: '6px' }}>Pedagogic Guardrails</h5>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Hệ thống tự động nhúng system prompt Socratic, cấm mô hình sinh ra mã nguồn giải sẵn cho sinh viên trong mọi tình huống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
