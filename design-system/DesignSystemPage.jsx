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

  // 4 Mức Bo Góc Mẫu để người dùng xem trước và lựa chọn
  const radiusPresets = [
    {
      id: 'level-1',
      name: 'Mức 1: Tiêu Chuẩn Hiện Tại',
      tag: 'Cổ Điển SaaS',
      tagBg: '#F1F5F9',
      tagColor: '#475569',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '18px',
      pill: '12px',
      desc: 'Bo góc vừa phải, góc cạnh rõ nét theo kiểu Enterprise SaaS truyền thống.'
    },
    {
      id: 'level-2',
      name: 'Mức 2: Bo Mềm Mại Hiện Đại',
      tag: 'Khuyên Dùng ⭐',
      tagBg: '#E0F2FE',
      tagColor: '#0369A1',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '22px',
      pill: '14px',
      desc: 'Mềm mại thanh thoát, tăng độ cong các nút và khung card (phong cách Notion, Linear, Figma).'
    },
    {
      id: 'level-3',
      name: 'Mức 3: Bo Tròn Cao Cấp (Apple / EdTech)',
      tag: 'Rất Đẹp & Trẻ Trung ✨',
      tagBg: '#DCFCE7',
      tagColor: '#15803D',
      sm: '10px',
      md: '14px',
      lg: '20px',
      xl: '28px',
      pill: '16px',
      desc: 'Độ cong lớn, cực kỳ hòa quyện với tone nền vàng ngà ấm áp, tạo cảm giác thân thiện và cao cấp.'
    },
    {
      id: 'level-4',
      name: 'Mức 4: Bo Siêu Tròn (Pill / Organic)',
      tag: 'Đậm Chất Mobile & Playful 🚀',
      tagBg: '#F3E8FF',
      tagColor: '#6B21A8',
      sm: '12px',
      md: '18px',
      lg: '26px',
      xl: '36px',
      pill: '22px',
      desc: 'Bo tròn tối đa, nút và badge đậm chất viên thuốc, cá tính và trẻ trung.'
    }
  ];

  const [activeRadiusPreset, setActiveRadiusPreset] = useState(radiusPresets[2]); // Mặc định Mức 3: Bo tròn rõ nét (Đã áp dụng toàn hệ thống)

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    showToast(`Đã sao chép: ${text}`);
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

  const currentRadiusTokens = [
    { name: '--radius-sm', val: activeRadiusPreset.sm, desc: 'Tag nhỏ, ô input nhỏ, badge con' },
    { name: '--radius-md', val: activeRadiusPreset.md, desc: 'Nút bấm chuẩn (Buttons), Ô nhập liệu' },
    { name: '--radius-lg', val: activeRadiusPreset.lg, desc: 'Khung thẻ Card, Bảng dữ liệu, Editor' },
    { name: '--radius-xl', val: activeRadiusPreset.xl, desc: 'Cửa sổ hộp thoại (Modals), Drawer' },
    { name: '--radius-pill', val: activeRadiusPreset.pill, desc: 'Pill Badges trạng thái' },
    { name: '--radius-full', val: '9999px', desc: 'Viên thuốc bo tròn hoàn toàn' },
  ];

  const generateCssCode = (preset) => {
    return `/* Bộ Bo Góc: ${preset.name} */\n--radius-sm: ${preset.sm};\n--radius-md: ${preset.md};\n--radius-lg: ${preset.lg};\n--radius-xl: ${preset.xl};\n--radius-pill: ${preset.pill};\n--radius-full: 9999px;`;
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'var(--bg-page)', 
        color: 'var(--text-primary)', 
        fontFamily: 'var(--font-sans)', 
        padding: '32px 40px 60px',
        // Tự động áp dụng biến bo góc của Preset đang chọn vào toàn bộ trang demo
        '--radius-sm': activeRadiusPreset.sm,
        '--radius-md': activeRadiusPreset.md,
        '--radius-lg': activeRadiusPreset.lg,
        '--radius-xl': activeRadiusPreset.xl,
        '--radius-pill': activeRadiusPreset.pill,
        transition: 'border-radius 0.3s ease'
      }}
    >
      
      {/* Toast Notification nội bộ */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#172D45',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
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
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-default)', paddingBottom: '24px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(23, 45, 69, 0.25)' }}>
              <Palette size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                ETV & CodeAssess — Design System Gallery
              </h1>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-accent-sky-dark)', background: 'var(--brand-light)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase' }}>
                Khung Các Thành Phần Từ Nhỏ Đến Lớn
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Trang tài liệu trực quan độc lập hiển thị quy chuẩn: Màu sắc, Thang đo Bo góc (Border Radius), Nút bấm, Ô nhập, Thẻ Card và Bảng biểu.
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
              borderRadius: 'var(--radius-md)',
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

      {/* THANH ĐIỀU KHIỂN & CHỌN MẪU BO GÓC TRỰC TIẾP */}
      <div style={{ 
        maxWidth: '1440px', 
        margin: '0 auto 36px', 
        background: '#FFFFFF', 
        borderRadius: 'var(--radius-lg)', 
        padding: '20px 24px', 
        border: '2px solid var(--brand-accent-sky)', 
        boxShadow: '0 8px 24px rgba(23, 45, 69, 0.08)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={20} color="var(--brand-primary)" />
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--brand-primary)', margin: 0 }}>
                🎯 BỘ ĐIỀU KHIỂN & XEM TRƯỚC ĐỘ BO GÓC (LIVE BORDER RADIUS PREVIEW)
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Bấm vào từng mức dưới đây để <strong>thay đổi toàn bộ độ cong của thẻ card, nút bấm, ô input, bảng biểu</strong> trên trang này ngay tức thì:
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => copyToClipboard(generateCssCode(activeRadiusPreset))}
            title="Sao chép mã CSS của mức đang chọn"
          >
            <Copy size={14} /> Sao chép CSS Mức Đang Chọn
          </button>
        </div>

        {/* 4 Thẻ Preset */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {radiusPresets.map((preset) => {
            const isSelected = activeRadiusPreset.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  setActiveRadiusPreset(preset);
                  showToast(`Đã áp dụng ${preset.name} vào trang xem trước!`);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '14px 16px',
                  borderRadius: preset.md,
                  border: isSelected ? '2.5px solid var(--brand-primary)' : '1px solid var(--border-default)',
                  background: isSelected ? 'var(--bg-subtle)' : '#FFFFFF',
                  boxShadow: isSelected ? '0 4px 14px rgba(23, 45, 69, 0.15)' : 'var(--shadow-xs)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    padding: '2px 8px', 
                    borderRadius: preset.sm, 
                    background: preset.tagBg, 
                    color: preset.tagColor 
                  }}>
                    {preset.tag}
                  </span>
                  {isSelected && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: 'var(--brand-primary)' }}>
                      <Check size={14} /> Đang xem
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {preset.name}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.4 }}>
                  {preset.desc}
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  flexWrap: 'wrap', 
                  paddingTop: '8px', 
                  borderTop: '1px dashed var(--border-default)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  <span>Nút: <strong>{preset.md}</strong></span> • 
                  <span>Thẻ: <strong>{preset.lg}</strong></span> • 
                  <span>Modal: <strong>{preset.xl}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* 1. MÀU SẮC (COLORS) */}
        <section id="colors">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>1</span>
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
                  borderRadius: 'var(--radius-lg)',
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

        {/* 2. BẢNG SO SÁNH TRỰC QUAN 4 ĐỘ BO GÓC & THANG ĐO */}
        <section id="radius">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, background: 'var(--brand-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>2</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Bảng So Sánh Trực Quan 4 Độ Bo Góc (Side-by-Side Comparison)
            </h2>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 18px' }}>
            Cùng 1 cụm thành phần (Thẻ Card, Ô Input, Nút Bấm, Badge) được đặt cạnh nhau tương ứng với 4 mức bo góc để bạn dễ dàng quan sát và lựa chọn:
          </p>

          {/* Grid 4 Cột So Sánh Cạnh Nhau */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            {radiusPresets.map((preset) => {
              const isSelected = activeRadiusPreset.id === preset.id;
              return (
                <div 
                  key={preset.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: preset.lg,
                    border: isSelected ? '2.5px solid var(--brand-primary)' : '1px solid var(--border-default)',
                    padding: '20px',
                    boxShadow: isSelected ? '0 10px 24px rgba(23, 45, 69, 0.12)' : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: preset.sm, background: preset.tagBg, color: preset.tagColor }}>
                      {preset.tag}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      Card: {preset.lg}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>{preset.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, minHeight: '34px' }}>{preset.desc}</p>
                  </div>

                  {/* Minh họa component con bên trong */}
                  <div style={{ 
                    background: 'var(--bg-subtle)', 
                    borderRadius: preset.md, 
                    padding: '14px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px' 
                  }}>
                    {/* Badge */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        background: 'var(--success-bg)', 
                        color: 'var(--success-text)', 
                        padding: '3px 10px', 
                        borderRadius: preset.pill, 
                        border: '1px solid var(--success-border)' 
                      }}>
                        Hoàn thành
                      </span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        background: '#E0F2FE', 
                        color: '#0369A1', 
                        padding: '3px 10px', 
                        borderRadius: preset.pill 
                      }}>
                        C++ 20
                      </span>
                    </div>

                    {/* Input */}
                    <div>
                      <input 
                        type="text" 
                        readOnly 
                        defaultValue="Tìm kiếm bài tập..." 
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '12.5px',
                          border: '1px solid var(--border-medium)',
                          borderRadius: preset.md,
                          background: '#FFFFFF',
                          outline: 'none',
                          color: 'var(--text-secondary)'
                        }}
                      />
                    </div>

                    {/* Nút bấm */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          background: 'var(--brand-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: preset.md,
                          cursor: 'pointer'
                        }}
                      >
                        Nút Chính
                      </button>
                      <button 
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          background: '#FFFFFF',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: preset.md,
                          cursor: 'pointer'
                        }}
                      >
                        Phụ
                      </button>
                    </div>
                  </div>

                  {/* Bảng giá trị thông số */}
                  <div style={{ 
                    fontSize: '11.5px', 
                    fontFamily: 'var(--font-mono)', 
                    background: '#F8FAFC', 
                    padding: '8px 12px', 
                    borderRadius: preset.sm, 
                    border: '1px solid var(--border-default)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    color: 'var(--text-secondary)'
                  }}>
                    <div>--radius-sm: <strong>{preset.sm}</strong></div>
                    <div>--radius-md: <strong>{preset.md}</strong> (Nút, Input)</div>
                    <div>--radius-lg: <strong>{preset.lg}</strong> (Thẻ Card)</div>
                    <div>--radius-xl: <strong>{preset.xl}</strong> (Modals)</div>
                  </div>

                  <button 
                    onClick={() => {
                      setActiveRadiusPreset(preset);
                      showToast(`Đã áp dụng ${preset.name} vào toàn bộ trang demo!`);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: preset.md,
                      border: isSelected ? '1px solid var(--brand-primary)' : '1px solid var(--border-medium)',
                      background: isSelected ? 'var(--brand-primary)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isSelected ? '✓ Đang áp dụng cho trang demo' : 'Bấm để áp dụng xem thử'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Thang đo giá trị hiện tại */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Thông Số Token Đang Áp Dụng Cho Trang Demo:
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {currentRadiusTokens.map((r, i) => (
                <div 
                  key={i}
                  style={{
                    padding: '20px 16px',
                    background: '#FFFFFF',
                    borderRadius: r.name === '--radius-full' ? '9999px' : r.val,
                    border: '2px dashed var(--brand-primary)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '120px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'border-radius 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand-primary)' }}>{r.val}</div>
                  <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{r.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phông chữ */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>CÁC TẦNG PHÔNG CHỮ:</div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '22px', fontWeight: 800 }}>Heading 1 (22px - Bold 800): Plus Jakarta Sans / Inter</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>Heading 2 (16px - Bold 700): Tiêu đề thẻ Card, Khối chức năng</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Body Text (14px - Regular 500): Nội dung mô tả bài tập & hướng dẫn</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-dark-code)', color: '#F8FAFC', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>
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
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Demo Modal Dialog (Radius var(--radius-xl))
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
                Khung cửa sổ Modal với lớp phủ Backdrop làm mờ, bo góc lớn (`--radius-xl` = {activeRadiusPreset.xl}) chuẩn phong cách Modern SaaS.
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
