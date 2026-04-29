import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Sectors() {
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getSectors()
      .then(setSectors)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSectorClick = async (code) => {
    if (selectedSector === code) {
      setSelectedSector(null);
      setLaws([]);
      return;
    }
    setSelectedSector(code);
    try {
      const data = await api.getSectorLaws(code);
      setLaws(data);
    } catch (err) {
      setLaws([]);
    }
  };

  if (loading) return <p>Loading sectors...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Sectors & Laws</h1>

      {sectors.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--gray-500)' }}>No sectors found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {sectors.map(sector => (
            <div key={sector.code} className="card" style={{ cursor: 'pointer', border: selectedSector === sector.code ? '2px solid var(--primary)' : '2px solid transparent' }} onClick={() => handleSectorClick(sector.code)}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{sector.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                Code: <code>{sector.code}</code>
              </p>
              {sector.description && (
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>{sector.description}</p>
              )}

              {selectedSector === sector.code && laws.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-200)' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Applicable Laws:</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {laws.map(law => (
                      <li key={law.id} style={{ fontSize: '0.8rem', padding: '0.25rem 0', color: 'var(--gray-700)' }}>
                        • {law.name} {law.shortCode && `(${law.shortCode})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
