import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getTemplates()
      .then(setTemplates)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading templates...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Audit Templates</h1>

      {templates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--gray-500)' }}>No templates available.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {templates.map(template => (
            <div key={template.slug} className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{template.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                {template.description || 'No description'}
              </p>
              {template.sections && (
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  {template.sections.length} section(s) • {template.sections.reduce((acc, s) => acc + (s.items?.length || 0), 0)} items
                </p>
              )}
              <div style={{ marginTop: '0.75rem', padding: '0.5rem 0', borderTop: '1px solid var(--gray-200)', fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                Slug: <code>{template.slug}</code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
