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
      background: '#0e1320',
      borderLeft: '1px solid var(--border-medium)',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.7)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#131a2c'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
              AI Socratic Tutor (UC-14)
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-accent)' }}>
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
        padding: '10px 16px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        fontSize: '12px',
        color: '#c4b5fd',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Lightbulb size={16} />
        <span>
          <strong>Phương pháp Socratic:</strong> AI gợi mở tư duy và đặt câu hỏi định hướng, không giải bài hộ hay cung cấp mã nguồn trực tiếp.
        </span>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
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
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: isTutor ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '12px',
                flexShrink: 0
              }}>
                {isTutor ? <Bot size={16} /> : <User size={16} />}
              </div>

              <div style={{
                maxWidth: '82%',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '13.5px',
                lineHeight: 1.55,
                background: isTutor ? 'var(--bg-elevated)' : 'var(--primary)',
                color: '#fff',
                border: isTutor ? '1px solid var(--border-medium)' : 'none'
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
        background: '#111726',
        borderTop: '1px solid var(--border-subtle)',
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
        <button type="submit" className="btn btn-primary" style={{ padding: '0 16px' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
