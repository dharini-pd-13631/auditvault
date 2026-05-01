export default function SetDeadlines({ laws, deadlines, onChange }) {
  const handleDateChange = (lawId, value) => {
    onChange({ ...deadlines, [lawId]: value });
  };

  return (
    <div>
      <h2 className="page-title">Set compliance deadlines</h2>
      <p className="page-subtitle">Set target dates for achieving compliance with each selected law.</p>

      {laws.length === 0 ? (
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Please select laws in the previous step to set deadlines.</p>
        </div>
      ) : (
        <div className="deadline-grid">
          {laws.map(lawId => (
            <div key={lawId} className="deadline-item">
              <div className="deadline-item-label">{formatLawName(lawId)}</div>
              <input
                type="date"
                value={deadlines[lawId] || ''}
                onChange={(e) => handleDateChange(lawId, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatLawName(id) {
  return id
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
