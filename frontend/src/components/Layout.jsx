import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: '📊 Dashboard' },
    { to: '/audits', label: '📋 Audits' },
    { to: '/templates', label: '📄 Templates' },
    { to: '/deadlines', label: '⏰ Deadlines' },
    { to: '/sectors', label: '🏢 Sectors' },
  ];

  if (isAdmin()) {
    navItems.push({ to: '/users', label: '👥 Users' });
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border-color)',
        padding: '1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>🔒 AuditVault</h1>
        </div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.625rem 1.5rem',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(74, 158, 255, 0.1)' : 'transparent',
                fontSize: '0.875rem',
                fontWeight: isActive ? '500' : '400',
                transition: 'all 0.15s',
                borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            {user?.fullName}
          </div>
          <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
