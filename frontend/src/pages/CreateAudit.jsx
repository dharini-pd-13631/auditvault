import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function CreateAudit() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ templateSlug: '', title: '', clientName: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getTemplates().then(setTemplates).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form };
      if (!payload.dueDate) delete payload.dueDate;
      if (!payload.clientName) delete payload.clientName;
      const audit = await api.createAudit(payload);
      navigate(`/audits/${audit.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Create New Audit</h1>

      <div className="card" style={{ maxWidth: '600px' }}>
        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius)', padding: '0.75rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.8rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Template *</label>
            <select name="templateSlug" value={form.templateSlug} onChange={handleChange} required>
              <option value="">Select a template...</option>
              {templates.map(t => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Audit Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. FY2024 Tax Audit for ABC Corp" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Client Name</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client organization name" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Due Date</label>
            <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Audit'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/audits')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
