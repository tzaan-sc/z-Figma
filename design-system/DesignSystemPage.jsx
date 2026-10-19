import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  Code2, 
  Sparkles, 
  Plus, 
  Search, 
  Sliders, 
  Cpu, 
  Eye, 
  Copy, 
  Check, 
  FileText, 
  Users,
  Award,
  Terminal,
  Lock,
  ArrowLeft,
  ChevronDown,
  LayoutGrid,
  ClipboardList,
  SlidersHorizontal,
  FileCheck,
  ListChecks,
  ExternalLink
} from 'lucide-react';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedHex, setCopiedHex] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [sliderVal, setSliderVal] = useState(65);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    showToast(`Đã sao chép mã: ${text}`);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const colorTokens = [
    { name: 'Sidebar Nền (Deep Petrol)', token: '--sidebar-bg', hex: '#172D45', textColor: '#FFFFFF', desc: 'Nền thanh Sidebar cố định bên trái' },
    { name: 'Sidebar Card Nền', token: '--sidebar-card-bg', hex: '#0F2236', textColor: '#FFFFFF', desc: 'Nền khung viên thuốc Role Status Pill' },
    { name: 'Sidebar Active (Baby Blue)', token: '--sidebar-active-bg', hex: '#93C5FD', textColor: '#0F3564', desc: 'Nền mục menu đang chọn trên Sidebar' },
    { name: 'Nền Trang Chính (Warm Ivory)', token: '--bg-page', hex: '#FEF3C7', textColor: '#0F172A', desc: 'Nền toàn bộ trang web (60% Rule)' },
    { name: 'Bề Mặt Thẻ Card (Pure White)', token: '--bg-surface', hex: '#FFFFFF', textColor: '#0F172A', desc: 'Nền các thẻ Card, Bảng biểu, Navbar' },
    { name: 'Nền Tối Code (Dark Code)', token: '--bg-dark-code', hex: '#0F172A', textColor: '#F8FAFC', desc: 'Monaco Editor & Terminal Logs' },
    { name: 'Brand Primary (Petrol CTA)', token: '--brand-primary', hex: '#172D45', textColor: '#FFFFFF', desc: 'Nút hành động chính & CTA' },
    { name: 'Light Accent (Sky Blue)', token: '--brand-accent-sky', hex: '#93C5FD', textColor: '#0F3564', desc: 'Điểm nhấn tương tác nhẹ' },
    { name: 'Vàng Ngà Active Pill', token: '--sidebar-badge-bg', hex: '#FEF3C7', textColor: '#1E293B', desc: 'Pill Active trên Sidebar' },
    { name: 'Vàng Dạ Quang Dot', token: '--sidebar-dot', hex: '#FDE047', textColor: '#0F172A', desc: 'Chấm tròn trạng thái hoạt động' },
    { name: 'Success (Thành công)', token: '--success', hex: '#16A34A', textColor: '#FFFFFF', desc: 'Bài nộp hoàn thành, 10/10 điểm' },
    { name: 'Warning (Cảnh báo)', token: '--warning', hex: '#D97706', textColor: '#FFFFFF', desc: 'Bản nháp DRAFT, MOSS > 15%' },
    { name: 'Danger (Nguy hiểm)', token: '--danger', hex: '#DC2626', textColor: '#FFFFFF', desc: 'Lỗi biên dịch, TLE, Đạo văn cao' },
    { name: 'Info (Thông tin / Sample)', token: '--info', hex: '#0284C7', textColor: '#FFFFFF', desc: 'Tag test case công khai SAMPLE' },
  ];

  const radiusTokens = [
    { name: '--radius-sm', val: '6px', desc: 'Tag nhỏ, ô input nhỏ, badge con' },
    { name: '--radius-md', val: '8px', desc: 'Nút bấm chuẩn (Buttons), Ô nhập liệu' },
    { name: '--radius-lg', val: '12px - 14px', desc: 'Khung thẻ Card, Bảng dữ liệu, Editor' },
    { name: '--radius-xl', val: '18px', desc: 'Cửa sổ hộp thoại (Modals), Drawer' },
    { name: '--radius-full', val: '9999px', desc: 'Viên thuốc bo tròn hoàn toàn' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', padding: '32px 40px 60px' }}>
      
      {/* Toast Notification nội bộ */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#172D45',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontSize: '13.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} color="#86EFAC" />
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-default)', paddingBottom: '24px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(23, 45, 69, 0.25)' }}>
              <Palette size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                ETV & CodeAssess — Design System Gallery
              </h1>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-accent-sky-dark)', background: 'var(--brand-light)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Khung Các Thành Phần Từ Nhỏ Đến Lớn
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Trang tài liệu trực quan độc lập hiển thị quy chuẩn: Màu sắc (Color Tokens), Bo góc (Border Radius), Nút bấm, Ô nhập, Thẻ Card và Bảng biểu.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <ArrowLeft size={16} /> Quay lại ứng dụng chính
          </a>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* 1. MÀU SẮC (COLORS) */}
        <section id="colors">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>1</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Hệ Thống Bảng Màu (Color Tokens — theme.css)
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {colorTokens.map((c, i) => (
              <div 
                key={i}
                className="glass-card-interactive"
                onClick={() => copyToClipboard(c.hex)}
                title="Bấm để copy mã HEX"
                style={{
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  overflow: 'hidden',
                  background: '#FFFFFF'
                }}
              >
                <div style={{ height: '70px', background: c.hex, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: c.textColor }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>{c.hex}</span>
                  {copiedHex === c.hex ? <Check size={16} /> : <Copy size={14} style={{ opacity: 0.8 }} />}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '2px' }}>{c.token}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BO GÓC & TYPOGRAPHY (BORDER RADIUS & FONTS) */}
        <section id="radius">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>2</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Quy Chuẩn Thang Đo Bo Góc (Border Radius) & Phông Chữ
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {radiusTokens.map((r, i) => (
              <div 
                key={i}
                style={{
                  padding: '24px 18px',
                  background: '#FFFFFF',
                  borderRadius: r.name === '--radius-full' ? '9999px' : r.val.split(' ')[0],
                  border: '2px dashed var(--brand-primary)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '130px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand-primary)' }}>{r.val}</div>
                <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{r.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>{r.desc}</div>
              </div>
            ))}
          </div>

          {/* Phông chữ */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>CÁC TẦNG PHÔNG CHỮ:</div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800 }}>Heading 1 (22px - Bold 800): Plus Jakarta Sans / Inter</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>Heading 2 (16px - Bold 700): Tiêu đề thẻ Card, Khối chức năng</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Body Text (14px - Regular 500): Nội dung mô tả bài tập & hướng dẫn</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-dark-code)', color: '#F8FAFC', borderRadius: '8px', fontFamily: 'var(--font-mono)' }}>
              <code>JetBrains Mono (13px): def solve(arr): return sorted(arr)</code>
            </div>
          </div>
        </section>

        {/* 3. NÚT BẤM & PILL BADGES (ATOMS) */}
        <section id="atoms">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>3</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Thành Phần Nhỏ: Nút Bấm & Thẻ Nhãn (Buttons & Badges)
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Buttons */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Bộ Sưu Tập Nút Bấm (Buttons)</h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button className="btn btn-primary"><Plus size={15} /> Primary Petrol Button</button>
                <button className="btn btn-secondary">Secondary Outline</button>
                <button className="btn btn-gold"><Sparkles size={15} /> Gold CTA Button</button>
                <button className="btn btn-success"><CheckCircle2 size={15} /> Success Button</button>
                <button className="btn btn-danger"><AlertTriangle size={15} /> Danger Button</button>
                <button className="btn btn-outline-danger">Outline Danger</button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>KÍCH THƯỚC NÚT:</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button className="btn btn-primary btn-sm">Small (btn-sm)</button>
                  <button className="btn btn-primary">Standard</button>
                  <button className="btn btn-primary btn-lg">Large (btn-lg)</button>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Thẻ Tag Trạng Thái (Pill Badges)</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>TEST CASES (DOAN4 RULE):</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-sample">SAMPLE (Công khai)</span>
                    <span className="badge badge-hidden">HIDDEN (Bảo mật)</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>ĐỘ KHÓ:</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-easy">Dễ</span>
                    <span className="badge badge-medium">Trung bình</span>
                    <span className="badge badge-hard">Khó</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>BÀI NỘP:</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-draft">Bản nháp (DRAFT)</span>
                    <span className="badge badge-submitted">Đã nộp (Khóa)</span>
                    <span className="badge badge-completed">Đã hoàn thành</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FORM INPUTS */}
        <section id="inputs">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>4</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Khung Ô Nhập Liệu & Bộ Lọc (Form Controls)
            </h2>
          </div>

          <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            <div>
              <label className="form-label">Ô nhập văn bản tiêu chuẩn (Text Input)</label>
              <input type="text" className="form-input" defaultValue="Nguyễn Văn An" />
            </div>

            <div>
              <label className="form-label">Ô tìm kiếm có icon</label>
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" style={{ paddingLeft: '34px' }} placeholder="Tìm theo tên bài tập..." />
              </div>
            </div>

            <div>
              <label className="form-label">Hộp chọn thả xuống (Select)</label>
              <select className="form-select" defaultValue="C++">
                <option value="Python">Python 3.10</option>
                <option value="C++">C++ 20 (GCC)</option>
                <option value="Java">Java 17</option>
              </select>
            </div>

            <div>
              <label className="form-label">Thanh trượt cấu hình: {sliderVal}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderVal} 
                onChange={e => setSliderVal(e.target.value)} 
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer', marginTop: '6px' }}
              />
            </div>
          </div>
        </section>

        {/* 5. KHUNG THẺ CARDS (MOLECULES & ORGANISMS) */}
        <section id="cards">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>5</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Khung Thẻ Card Từ Nhỏ Đến Lớn (Cards & Containers)
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* KPI Cards */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>THẺ THỐNG KÊ KPI:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="glass-card glass-card-interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-light)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>LỚP PHỤ TRÁCH</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>3 lớp</div>
                    <div style={{ fontSize: '12px', color: 'var(--success-text)', marginTop: '2px' }}>Đang hoạt động</div>
                  </div>
                </div>

                <div className="glass-card glass-card-interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 600 }}>BÀI TẬP ĐÃ GIAO</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>12 bài</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Kèm test cases & rubric</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Card */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>THẺ BÀI TẬP LẬP TRÌNH (VỚI VIỀN COLOR-CODED ACCENT TRÁI):</div>
              <div style={{ maxWidth: '420px' }}>
                <div className="glass-card glass-card-interactive" style={{ borderLeft: '4px solid var(--info)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-accent)' }}>BT02-LIS-DP • CNTT-K18A</span>
                    <span className="badge badge-submitted">Bản nháp</span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Dãy con tăng dài nhất (LIS)</h4>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    <span className="badge badge-draft">C++</span>
                    <span className="badge badge-medium">Trung bình</span>
                    <span className="badge badge-draft"><Clock size={12} /> 1.5s</span>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '14px' }}>
                    Hạn nộp bài: <strong>2026-10-25 23:59:59</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Chi tiết đề</button>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Vào làm bài</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BẢNG BIỂU & MODALS (ORGANISMS) */}
        <section id="organisms">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>6</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Khung Lớn: Bảng Dữ Liệu & Hộp Thoại Nổi (Tables & Modals)
            </h2>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Bảng Dữ Liệu Chuẩn SaaS (Data Table)</h3>
              <button className="btn btn-primary btn-sm" onClick={() => setIsDemoModalOpen(true)}>
                <Eye size={14} /> Mở Demo Modal (18px Radius)
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Lớp</th>
                    <th>Tên Môn Học</th>
                    <th>Giảng Viên</th>
                    <th>Số SV</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>CNTT-K18A</td>
                    <td style={{ fontWeight: 600 }}>Cấu trúc dữ liệu & Giải thuật</td>
                    <td>TS. Trần Minh Tuấn</td>
                    <td>42 SV</td>
                    <td><span className="badge badge-completed">Hoạt động</span></td>
                    <td><button className="btn btn-secondary btn-sm">Chi tiết</button></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>CNTT-K18B</td>
                    <td style={{ fontWeight: 600 }}>Lập trình Cơ sở</td>
                    <td>ThS. Lê Hoàng Nam</td>
                    <td>38 SV</td>
                    <td><span className="badge badge-completed">Hoạt động</span></td>
                    <td><button className="btn btn-secondary btn-sm">Chi tiết</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Demo Modal Dialog (Radius 18px)
              </h3>
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0 }}>
                Đây là khung cửa sổ Modal với lớp phủ Backdrop làm mờ, bo góc 18px (`--radius-xl`) chuẩn phong cách Modern SaaS.
              </p>
              <div>
                <label className="form-label">Tên cấu hình thử nghiệm</label>
                <input type="text" className="form-input" defaultValue="Thử nghiệm thông số Test Case" />
              </div>
            </div>
            <div style={{ padding: '14px 24px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setIsDemoModalOpen(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => { showToast('Đã lưu dữ liệu thử nghiệm!'); setIsDemoModalOpen(false); }}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
