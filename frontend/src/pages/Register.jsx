import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '', firmName: '' });
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/onboarding');
    } catch (err) {
      // error handled by context
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>🔒 AuditVault</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Create your account
        </p>

        {error && <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.8rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Full Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password *</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Min 8 characters" minLength={8} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91..." />
            </div>
            <div>
              <label>Firm Name</label>
              <input name="firmName" value={form.firmName} onChange={handleChange} placeholder="Your Firm" />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', background: 'var(--accent-blue)', border: 'none' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
