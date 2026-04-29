import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function AuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getAudit(id), api.getAuditResponses(id)])
      .then(([auditData, responsesData]) => {
        setAudit(auditData);
        setResponses(responsesData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await api.updateAuditStatus(id, newStatus);
      setAudit(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading audit...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!audit) return null;

  return (
    <div>
      <button className="btn-secondary" onClick={() => navigate('/audits')} style={{ marginBottom: '1rem' }}>
        ← Back to Audits
      </button>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{audit.title}</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {audit.clientName && `Client: ${audit.clientName} • `}
              {audit.dueDate && `Due: ${audit.dueDate}`}
            </p>
          </div>
          <StatusBadge status={audit.status} />
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          {audit.status !== 'IN_PROGRESS' && (
            <button className="btn-primary" onClick={() => handleStatusChange('IN_PROGRESS')}>
              Start Audit
            </button>
          )}
          {audit.status !== 'COMPLETED' && (
            <button className="btn-primary" style={{ background: 'var(--success)' }} onClick={() => handleStatusChange('COMPLETED')}>
              Mark Complete
            </button>
          )}
          {audit.status !== 'DRAFT' && (
            <button className="btn-secondary" onClick={() => handleStatusChange('DRAFT')}>
              Reset to Draft
            </button>
          )}
        </div>
      </div>

      {/* Checklist / Template Sections */}
      {audit.template?.sections?.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Checklist Items</h2>
          {audit.template.sections.map(section => (
            <div key={section.id} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                {section.title}
              </h3>
              {section.items?.map(item => {
                const response = responses.find(r => r.checklistItemId === item.id);
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: '0.875rem', flex: 1 }}>{item.text || item.description}</span>
                    {response && <span className="badge badge-completed">Responded</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Responses */}
      {responses.length > 0 && (
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Responses ({responses.length})</h2>
          <table>
            <thead>
              <tr><th>Item</th><th>Status</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {responses.map(r => (
                <tr key={r.id}>
                  <td style={{ fontSize: '0.875rem' }}>{r.checklistItemId}</td>
                  <td><span className="badge badge-completed">{r.status}</span></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{r.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === 'COMPLETED' ? 'badge-completed' : status === 'IN_PROGRESS' ? 'badge-in-progress' : 'badge-draft';
  return <span className={`badge ${cls}`} style={{ fontSize: '0.8rem' }}>{status?.replace('_', ' ')}</span>;
}
