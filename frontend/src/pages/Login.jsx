import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // error is handled by context
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>🔒 AuditVault</h1>
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Sign in to your account
        </p>

        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius)', padding: '0.75rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.8rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.625rem' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
