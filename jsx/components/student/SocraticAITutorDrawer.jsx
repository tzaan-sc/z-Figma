import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ShieldAlert, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export default function SocraticAITutorDrawer({ isOpen, onClose, assignment }) {
  const { sendSocraticMessage } = useApp();
  const [inputText, setInputText] = useState('');

  if (!isOpen || !assignment) return null;

  const submission = assignment.studentSubmission;
  const history = submission?.socraticHistory || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendSocraticMessage(assignment.id, inputText.trim());
    setInputText('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '480px',
      height: '100vh',
      background: 'var(--bg-surface)',
      borderLeft: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-modal)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 2px 6px rgba(0, 71, 171, 0.25)'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              AI Socratic Tutor (UC-14)
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--brand-primary)', fontWeight: 600 }}>
              Trợ giảng hậu kiểm sau đánh giá
            </span>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Pedagogic Rule Notice */}
      <div style={{
        padding: '12px 18px',
        background: 'var(--info-bg)',
        borderBottom: '1px solid var(--info-border)',
        fontSize: '12.5px',
        color: 'var(--info-text)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Lightbulb size={18} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
        <span style={{ color: 'var(--text-primary)' }}>
          <strong style={{ color: 'var(--brand-primary)' }}>Phương pháp Socratic:</strong> AI gợi mở tư duy và đặt câu hỏi định hướng, không giải bài hộ hay cung cấp mã nguồn trực tiếp.
        </span>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'var(--bg-page)'
      }}>
        {history.map((msg, index) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div 
              key={index} 
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                flexDirection: isTutor ? 'row' : 'row-reverse'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isTutor ? 'var(--brand-primary)' : 'var(--brand-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isTutor ? '#FFFFFF' : 'var(--brand-primary)',
                fontSize: '12px',
                flexShrink: 0,
                boxShadow: 'var(--shadow-xs)'
              }}>
                {isTutor ? <Bot size={16} /> : <User size={16} />}
              </div>

              <div style={{
                maxWidth: '82%',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '13.5px',
                lineHeight: 1.55,
                background: isTutor ? 'var(--bg-surface)' : 'var(--brand-primary)',
                color: isTutor ? 'var(--text-primary)' : '#FFFFFF',
                border: isTutor ? '1px solid var(--border-default)' : 'none',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} style={{
        padding: '16px',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex',
        gap: '10px'
      }}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Đặt câu hỏi thảo luận về thuật toán / mã nguồn..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 18px' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
