import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import './AppLayout.css';

export function AppLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
