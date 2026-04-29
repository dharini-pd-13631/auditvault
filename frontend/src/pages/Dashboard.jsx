import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getDashboard()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!data) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Dashboard</h1>
        <Link to="/audits/new">
          <button className="btn-primary">+ New Audit</button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Total Audits" value={data.totalAudits} color="var(--primary)" />
        <StatCard label="Draft" value={data.draftCount} color="var(--gray-500)" />
        <StatCard label="In Progress" value={data.inProgressCount} color="var(--warning)" />
        <StatCard label="Completed" value={data.completedCount} color="var(--success)" />
      </div>

      {/* Recent Audits */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Audits</h2>
        {data.recentAudits?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAudits.map(audit => (
                <tr key={audit.id}>
                  <td><Link to={`/audits/${audit.id}`}>{audit.title}</Link></td>
                  <td>{audit.clientName || '-'}</td>
                  <td><StatusBadge status={audit.status} /></td>
                  <td>{audit.dueDate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>No audits yet. Create your first audit!</p>
        )}
      </div>

      {/* Upcoming Deadlines */}
      {data.upcomingDeadlines?.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Upcoming Deadlines</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Due Date</th><th>Urgency</th></tr>
            </thead>
            <tbody>
              {data.upcomingDeadlines.map(d => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.dueDate}</td>
                  <td><span className="badge" style={{ background: d.urgency === 'HIGH' ? '#fef2f2' : '#fef3c7', color: d.urgency === 'HIGH' ? 'var(--danger)' : 'var(--warning)' }}>{d.urgency}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compliance Scores */}
      {data.complianceScores?.length > 0 && (
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Compliance Scores</h2>
          {data.complianceScores.map((score, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>{score.templateName}</span>
                <span>{score.score}% ({score.compliantItems}/{score.totalItems})</span>
              </div>
              <div style={{ background: 'var(--gray-200)', borderRadius: '4px', height: '8px' }}>
                <div style={{ background: score.score >= 80 ? 'var(--success)' : score.score >= 50 ? 'var(--warning)' : 'var(--danger)', width: `${score.score}%`, height: '100%', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', fontWeight: '700', color }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === 'COMPLETED' ? 'badge-completed' : status === 'IN_PROGRESS' ? 'badge-in-progress' : 'badge-draft';
  return <span className={`badge ${cls}`}>{status?.replace('_', ' ')}</span>;
}
