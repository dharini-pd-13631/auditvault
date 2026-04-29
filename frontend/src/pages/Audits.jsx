import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Audits() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getAudits()
      .then(setAudits)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading audits...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Audits</h1>
        <Link to="/audits/new">
          <button className="btn-primary">+ New Audit</button>
        </Link>
      </div>

      {audits.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--gray-500)' }}>No audits found. Create your first audit to get started.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Template</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {audits.map(audit => (
                <tr key={audit.id}>
                  <td><Link to={`/audits/${audit.id}`} style={{ fontWeight: '500' }}>{audit.title}</Link></td>
                  <td>{audit.clientName || '-'}</td>
                  <td>{audit.templateName || '-'}</td>
                  <td><StatusBadge status={audit.status} /></td>
                  <td>{audit.dueDate || '-'}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    {audit.createdAt ? new Date(audit.createdAt).toLocaleDateString() : '-'}
                  </td>
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
  return <span className={`badge ${cls}`}>{status?.replace('_', ' ')}</span>;
}
