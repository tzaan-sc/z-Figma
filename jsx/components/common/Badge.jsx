import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Lock, ShieldCheck, Flame, Cpu } from 'lucide-react';

export default function Badge({ status, type }) {
  if (type === 'submission') {
    switch (status) {
      case 'DRAFT':
        return (
          <span className="badge badge-draft">
            <Clock size={12} /> Bản nháp (DRAFT)
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="badge badge-submitted">
            <Lock size={12} /> Đã nộp (Khóa)
          </span>
        );
      case 'GRADING':
        return (
          <span className="badge badge-grading">
            <Cpu size={12} /> Đang chấm gom (Sandbox)
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="badge badge-completed">
            <CheckCircle2 size={12} /> Đã hoàn thành
          </span>
        );
      default:
        return <span className="badge badge-draft">{status}</span>;
    }
  }

  if (type === 'class-status') {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="badge badge-completed">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} /> Hoạt động
          </span>
        );
      case 'CLOSED':
        return (
          <span className="badge badge-danger">
            <Lock size={12} /> Đã đóng
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="badge badge-draft">
            <ShieldCheck size={12} /> Đã lưu trữ (Archived)
          </span>
        );
      default:
        return <span className="badge badge-draft">{status}</span>;
    }
  }

  if (type === 'test-status') {
    switch (status) {
      case 'AC':
        return <span className="badge badge-completed" style={{ fontSize: '11px', padding: '2px 8px' }}>AC (Accepted)</span>;
      case 'WA':
        return <span className="badge badge-danger" style={{ fontSize: '11px', padding: '2px 8px' }}>WA (Wrong Answer)</span>;
      case 'TLE':
        return <span className="badge badge-grading" style={{ fontSize: '11px', padding: '2px 8px' }}>TLE (Time Limit Exceeded)</span>;
      case 'MLE':
        return <span className="badge badge-purple" style={{ fontSize: '11px', padding: '2px 8px' }}>MLE (Memory Limit)</span>;
      default:
        return <span className="badge badge-draft">{status}</span>;
    }
  }

  if (type === 'difficulty') {
    switch (status) {
      case 'Easy':
        return <span className="badge badge-completed">Dễ</span>;
      case 'Medium':
        return <span className="badge badge-grading">Trung bình</span>;
      case 'Hard':
        return <span className="badge badge-danger"><Flame size={12} /> Khó</span>;
      default:
        return <span className="badge badge-draft">{status}</span>;
    }
  }

  return <span className="badge badge-draft">{status}</span>;
}
