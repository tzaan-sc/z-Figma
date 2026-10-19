import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => {
        let icon = <Info size={18} />;
        if (t.type === 'success') icon = <CheckCircle2 size={18} />;
        if (t.type === 'danger') icon = <AlertCircle size={18} />;
        if (t.type === 'warning') icon = <AlertTriangle size={18} />;

        return (
          <div key={t.id} className={`toast toast-${t.type || 'info'}`}>
            {icon}
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
