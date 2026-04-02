import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Activity, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Sidebar.css';

export function Sidebar() {
  const { theme, toggleTheme } = useStore();
  
  return (
    <aside className="sidebar glass-panel">
      <div className="logo">
        <div className="logo-icon-wrapper">
          <CheckSquare className="logo-icon" size={24} />
        </div>
        <h2>Focus</h2>
      </div>
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/habits" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Activity size={20} />
          <span>Habits</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="nav-item" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
