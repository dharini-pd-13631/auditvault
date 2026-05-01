const LAWS_BY_SECTOR = {
  IT_CYBER: [
    { id: 'it-act-2000', name: 'IT Act 2000', desc: 'Information Technology Act, 2000' },
    { id: 'dpdp-2023', name: 'DPDP Act 2023', desc: 'Digital Personal Data Protection Act' },
    { id: 'cert-in', name: 'CERT-IN Directions', desc: 'Cybersecurity incident reporting rules' },
    { id: 'iso-27001', name: 'ISO 27001', desc: 'Information security management standard' },
    { id: 'gdpr', name: 'GDPR', desc: 'General Data Protection Regulation (EU)' },
    { id: 'sox-it', name: 'SOX IT Controls', desc: 'Sarbanes-Oxley IT compliance' },
    { id: 'pci-dss', name: 'PCI DSS', desc: 'Payment Card Industry Data Security Standard' },
    { id: 'hipaa-it', name: 'HIPAA (IT)', desc: 'Health Insurance Portability - IT provisions' },
    { id: 'nist', name: 'NIST Framework', desc: 'National Institute of Standards and Technology' },
  ],
  FINANCE: [
    { id: 'rbi-kyc', name: 'RBI KYC Norms', desc: 'Reserve Bank of India KYC requirements' },
    { id: 'pmla', name: 'PMLA 2002', desc: 'Prevention of Money Laundering Act' },
    { id: 'sebi-lodr', name: 'SEBI LODR', desc: 'Listing Obligations and Disclosure Requirements' },
    { id: 'companies-act', name: 'Companies Act 2013', desc: 'Corporate governance requirements' },
    { id: 'gst', name: 'GST Compliance', desc: 'Goods and Services Tax regulations' },
    { id: 'fema', name: 'FEMA', desc: 'Foreign Exchange Management Act' },
    { id: 'banking-reg', name: 'Banking Regulation Act', desc: 'Banking sector regulations' },
    { id: 'irda', name: 'IRDA Guidelines', desc: 'Insurance Regulatory Authority guidelines' },
    { id: 'nbfc', name: 'NBFC Regulations', desc: 'Non-banking financial company rules' },
    { id: 'sarfaesi', name: 'SARFAESI Act', desc: 'Securitisation and debt recovery' },
    { id: 'rera-fin', name: 'RERA (Financial)', desc: 'Real Estate Regulation - financial aspects' },
    { id: 'benami', name: 'Benami Act', desc: 'Prohibition of Benami Property Transactions' },
  ],
  HEALTHCARE: [
    { id: 'clinical-trials', name: 'Clinical Trials Rules', desc: 'New Drugs and Clinical Trials Rules 2019' },
    { id: 'drugs-cosmetics', name: 'Drugs & Cosmetics Act', desc: 'Drug manufacturing and distribution' },
    { id: 'nmc-act', name: 'NMC Act 2019', desc: 'National Medical Commission Act' },
    { id: 'biomedical-waste', name: 'Biomedical Waste Rules', desc: 'BMW Management Rules 2016' },
    { id: 'mtp-act', name: 'MTP Act', desc: 'Medical Termination of Pregnancy Act' },
    { id: 'pcpndt', name: 'PCPNDT Act', desc: 'Pre-Conception & Pre-Natal Diagnostic Techniques' },
    { id: 'food-safety', name: 'FSSAI', desc: 'Food Safety and Standards' },
    { id: 'pharmacy-act', name: 'Pharmacy Act', desc: 'Pharmacy Practice regulations' },
  ],
  MANUFACTURING: [
    { id: 'factories-act', name: 'Factories Act 1948', desc: 'Health, safety and welfare of workers' },
    { id: 'env-protection', name: 'Environment Protection Act', desc: 'Environmental compliance 1986' },
    { id: 'water-act', name: 'Water (Prevention) Act', desc: 'Water pollution control' },
    { id: 'air-act', name: 'Air (Prevention) Act', desc: 'Air pollution control' },
    { id: 'hazardous-waste', name: 'Hazardous Waste Rules', desc: 'Handling of hazardous substances' },
    { id: 'esi-act', name: 'ESI Act', desc: "Employees' State Insurance Act" },
    { id: 'epf-act', name: 'EPF Act', desc: "Employees' Provident Funds Act" },
    { id: 'contract-labour', name: 'Contract Labour Act', desc: 'Regulation of contract workers' },
    { id: 'industrial-disputes', name: 'Industrial Disputes Act', desc: 'Labour dispute resolution' },
    { id: 'bis-standards', name: 'BIS Standards', desc: 'Bureau of Indian Standards compliance' },
  ],
  RETAIL: [
    { id: 'consumer-protection', name: 'Consumer Protection Act', desc: 'Consumer rights 2019' },
    { id: 'legal-metrology', name: 'Legal Metrology Act', desc: 'Weights and measures compliance' },
    { id: 'fdi-policy', name: 'FDI Policy (Retail)', desc: 'Foreign direct investment in retail' },
    { id: 'ecommerce-rules', name: 'E-commerce Rules', desc: 'Consumer Protection E-Commerce Rules 2020' },
    { id: 'trademark-act', name: 'Trademark Act', desc: 'Brand and trademark protection' },
    { id: 'shops-est', name: 'Shops & Establishments Act', desc: 'State-level shop regulations' },
    { id: 'advertising-code', name: 'ASCI Code', desc: 'Advertising Standards Council guidelines' },
  ],
  ENERGY: [
    { id: 'electricity-act', name: 'Electricity Act 2003', desc: 'Power generation and distribution' },
    { id: 'petroleum-act', name: 'Petroleum Act', desc: 'Oil and gas regulations' },
    { id: 'atomic-energy', name: 'Atomic Energy Act', desc: 'Nuclear energy regulations' },
    { id: 'mines-act', name: 'Mines Act', desc: 'Mining safety and operations' },
    { id: 'energy-conservation', name: 'Energy Conservation Act', desc: 'Energy efficiency standards' },
    { id: 'renewable-energy', name: 'Renewable Energy Policy', desc: 'Solar and wind energy guidelines' },
  ],
  GOVERNMENT: [
    { id: 'rti-act', name: 'RTI Act 2005', desc: 'Right to Information Act' },
    { id: 'cag-audit', name: 'CAG Audit Standards', desc: 'Comptroller and Auditor General norms' },
    { id: 'ge-fr', name: 'GE/FR Rules', desc: 'General Financial Rules' },
    { id: 'cvc-guidelines', name: 'CVC Guidelines', desc: 'Central Vigilance Commission' },
    { id: 'public-procurement', name: 'Public Procurement Rules', desc: 'Government procurement norms' },
  ],
  EDUCATION: [
    { id: 'ugc-regulations', name: 'UGC Regulations', desc: 'University Grants Commission rules' },
    { id: 'aicte-norms', name: 'AICTE Norms', desc: 'All India Council for Technical Education' },
    { id: 'ncte-act', name: 'NCTE Act', desc: 'National Council for Teacher Education' },
    { id: 'rte-act', name: 'RTE Act 2009', desc: 'Right to Education Act' },
    { id: 'fcra', name: 'FCRA (NGO)', desc: 'Foreign Contribution Regulation Act' },
  ],
};

export default function ChooseLaws({ sectors, selected, onChange }) {
  // Get laws for selected sectors
  const availableLaws = sectors.flatMap(sectorCode => LAWS_BY_SECTOR[sectorCode] || []);

  const toggleLaw = (lawId) => {
    if (selected.includes(lawId)) {
      onChange(selected.filter(l => l !== lawId));
    } else {
      onChange([...selected, lawId]);
    }
  };

  const selectAll = () => {
    onChange(availableLaws.map(l => l.id));
  };

  return (
    <div>
      <h2 className="page-title">Choose applicable laws</h2>
      <p className="page-subtitle">
        Select the laws and regulations your organization needs to comply with.
        {availableLaws.length > 0 && (
          <span style={{ marginLeft: '1rem' }}>
            <button
              onClick={selectAll}
              style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.85rem', padding: 0, textDecoration: 'underline' }}
            >
              Select all ({availableLaws.length})
            </button>
          </span>
        )}
      </p>

      {availableLaws.length === 0 ? (
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Please select at least one sector first to see available laws.</p>
        </div>
      ) : (
        <div className="law-list">
          {availableLaws.map(law => (
            <div
              key={law.id}
              className={`law-item ${selected.includes(law.id) ? 'selected' : ''}`}
              onClick={() => toggleLaw(law.id)}
            >
              <div className={`law-checkbox ${selected.includes(law.id) ? 'checked' : ''}`}>
                {selected.includes(law.id) && <span style={{ color: 'white', fontSize: '0.7rem' }}>✓</span>}
              </div>
              <div>
                <div className="law-item-name">{law.name}</div>
                <div className="law-item-desc">{law.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
