import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useStore } from '../../store/useStore';
import { CheckSquare, Sun, Moon } from 'lucide-react';
import './AppLayout.css';

export function AppLayout() {
  const { theme, toggleTheme } = useStore();

  return (
    <div className="layout-container">
      <div className="mobile-topbar hidden-desktop">
        <div className="logo-mobile">
          <div className="logo-icon-wrapper" style={{ padding: '4px', borderRadius: '4px' }}>
            <CheckSquare className="logo-icon" size={18} style={{ color: '#fff' }} />
          </div>
          <h2>Focus</h2>
        </div>
        <button className="icon-btn" onClick={toggleTheme} style={{ color: 'var(--text-primary)' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
