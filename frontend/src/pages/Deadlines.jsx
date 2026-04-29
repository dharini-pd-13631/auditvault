import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Deadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getDeadlines()
      .then(setDeadlines)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading deadlines...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Compliance Deadlines</h1>

      {deadlines.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--gray-500)' }}>No deadlines found.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              {deadlines.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: '500' }}>{d.name}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{d.description || '-'}</td>
                  <td>{d.dueDate}</td>
                  <td>
                    <span className="badge" style={{
                      background: d.urgency === 'HIGH' ? '#fef2f2' : d.urgency === 'MEDIUM' ? '#fef3c7' : '#ecfdf5',
                      color: d.urgency === 'HIGH' ? 'var(--danger)' : d.urgency === 'MEDIUM' ? 'var(--warning)' : 'var(--success)',
                    }}>
                      {d.urgency}
                    </span>
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
