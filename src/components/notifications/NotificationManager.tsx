import { type ReactElement, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const TOAST_STYLE: React.CSSProperties = {
  background: 'rgba(30,30,30,0.9)',
  color: '#fff',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  fontSize: '13px',
  padding: '10px 14px',
};

export function NotificationManager(): ReactElement {
  useEffect(() => {
    const t1 = setTimeout(() => {
      toast('👋 Welcome to Akhilesh\u0027s OS', {
        duration: 4000,
        position: 'bottom-right',
        style: TOAST_STYLE,
      });
    }, 500);

    const t2 = setTimeout(() => {
      toast('📁 New project added: F.A.S.T v1.0', {
        duration: 4000,
        position: 'bottom-right',
        style: TOAST_STYLE,
      });
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return <Toaster position="bottom-right" />;
}
