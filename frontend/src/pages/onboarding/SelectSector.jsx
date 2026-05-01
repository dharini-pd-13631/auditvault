const SECTORS = [
  { code: 'IT_CYBER', name: 'IT & Cybersecurity', laws: 9, icon: '⊞', iconBg: '#e0e7ff', iconColor: '#4338ca' },
  { code: 'FINANCE', name: 'Finance & Banking', laws: 12, icon: '💼', iconBg: '#fef3c7', iconColor: '#92400e' },
  { code: 'HEALTHCARE', name: 'Healthcare', laws: 8, icon: '🏥', iconBg: '#e0e7ff', iconColor: '#4338ca' },
  { code: 'MANUFACTURING', name: 'Manufacturing', laws: 10, icon: '🔒', iconBg: '#fce7f3', iconColor: '#9d174d' },
  { code: 'RETAIL', name: 'Retail & E-commerce', laws: 7, icon: '⊕', iconBg: '#d1fae5', iconColor: '#065f46' },
  { code: 'ENERGY', name: 'Energy & Utilities', laws: 6, icon: '⚙', iconBg: '#ede9fe', iconColor: '#5b21b6' },
  { code: 'GOVERNMENT', name: 'Government / PSU', laws: 5, icon: '🏛', iconBg: '#fce7f3', iconColor: '#9d174d' },
  { code: 'EDUCATION', name: 'Education / NGO', laws: 5, icon: '🏠', iconBg: '#f3f4f6', iconColor: '#374151' },
];

export default function SelectSector({ selected, onChange }) {
  const toggleSector = (code) => {
    if (selected.includes(code)) {
      onChange(selected.filter(s => s !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <div>
      <h2 className="page-title">Select your sector</h2>
      <p className="page-subtitle">Choose all sectors your company or product operates in. You can select multiple.</p>

      <div className="sector-grid">
        {SECTORS.map(sector => (
          <div
            key={sector.code}
            className={`sector-card ${selected.includes(sector.code) ? 'selected' : ''}`}
            onClick={() => toggleSector(sector.code)}
          >
            <div>
              <div
                className="sector-card-icon"
                style={{ background: sector.iconBg, color: sector.iconColor }}
              >
                {sector.icon}
              </div>
              <div className="sector-card-name">{sector.name}</div>
            </div>
            <div className="sector-card-count">{sector.laws} laws available</div>
          </div>
        ))}
      </div>
    </div>
  );
}
