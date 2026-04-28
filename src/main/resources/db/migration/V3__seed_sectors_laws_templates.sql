-- ============================================================
-- Seed: Sectors
-- ============================================================
INSERT INTO sectors (code, name, description, icon) VALUES
('IT',         'Information Technology',  'Software, SaaS, cloud services, data processing companies',  '💻'),
('FINANCE',    'Finance & Banking',       'Banks, NBFCs, insurance companies, fintech',                  '🏦'),
('HEALTHCARE', 'Healthcare',              'Hospitals, pharma, medical device manufacturers',              '🏥'),
('RETAIL',     'Retail & E-Commerce',     'Online and offline retail, consumer goods',                    '🛒'),
('MANUFACTURING', 'Manufacturing',        'Industrial, automotive, textiles, FMCG manufacturing',        '🏭'),
('EDUCATION',  'Education',               'Schools, universities, EdTech platforms',                      '🎓'),
('GOVERNMENT', 'Government',              'Central and state government agencies',                        '🏛️'),
('LEGAL',      'Legal & Professional',    'Law firms, CA firms, consulting firms',                        '⚖️');

-- ============================================================
-- Seed: Laws
-- ============================================================
INSERT INTO laws (slug, name, description, country, penalty_note) VALUES
('iso-27001',  'ISO/IEC 27001:2022',              'Information Security Management System standard',                  'International', 'Certification denied if mandatory controls missing'),
('dpdp-2023',  'Digital Personal Data Protection Act 2023', 'India''s personal data protection law',                  'India',         'Penalties up to Rs.250 Crore per violation'),
('gst-annual', 'GST Annual Compliance',            'Goods and Services Tax annual audit and return filing',           'India',         'Late fee Rs.200/day; penalties up to 10% of tax due'),
('it-act-2000','Information Technology Act 2000',   'India''s primary cyber law governing electronic transactions',    'India',         'Imprisonment up to 3 years and fine'),
('companies-act','Companies Act 2013',             'Corporate governance and statutory audit requirements',            'India',         'Penalties up to Rs.25 Lakh; officer imprisonment'),
('sebi-lodr',  'SEBI LODR Regulations',            'Listing obligations and disclosure requirements for listed cos',  'India',         'SEBI penalties; delisting risk'),
('hipaa',      'HIPAA',                             'Health Insurance Portability and Accountability Act',              'USA',           'Fines up to $1.5M per violation category'),
('gdpr',       'GDPR',                              'General Data Protection Regulation for EU data subjects',         'EU',            'Fines up to 4% of global annual turnover');

-- ============================================================
-- Seed: Sector-Law Mappings
-- ============================================================
INSERT INTO sector_laws (sector_id, law_id)
SELECT s.id, l.id FROM sectors s, laws l WHERE s.code = 'IT'         AND l.slug IN ('iso-27001', 'dpdp-2023', 'it-act-2000', 'gdpr');
INSERT INTO sector_laws (sector_id, law_id)
SELECT s.id, l.id FROM sectors s, laws l WHERE s.code = 'FINANCE'    AND l.slug IN ('iso-27001', 'dpdp-2023', 'companies-act', 'sebi-lodr', 'gst-annual');
INSERT INTO sector_laws (sector_id, law_id)
SELECT s.id, l.id FROM sectors s, laws l WHERE s.code = 'HEALTHCARE' AND l.slug IN ('dpdp-2023', 'hipaa', 'companies-act', 'gst-annual');
INSERT INTO sector_laws (sector_id, law_id)
SELECT s.id, l.id FROM sectors s, laws l WHERE s.code = 'RETAIL'     AND l.slug IN ('dpdp-2023', 'gst-annual', 'companies-act');
INSERT INTO sector_laws (sector_id, law_id)
SELECT s.id, l.id FROM sectors s, laws l WHERE s.code = 'EDUCATION'  AND l.slug IN ('dpdp-2023', 'it-act-2000');

-- ============================================================
-- Seed: Templates
-- ============================================================
INSERT INTO templates (name, slug, description, category, icon, penalty_note) VALUES
('ISO 27001 — Information Security', 'iso-27001', 'ISMS audit based on ISO/IEC 27001:2022. Covers governance, risk, technical controls, and audit evidence.', 'Compliance', '🛡️', 'ISO certification denied if mandatory documents are missing'),
('DPDP Act 2023 Compliance',         'dpdp-act',  'Digital Personal Data Protection Act 2023 (India). Covers consent, data inventory, breach management, and rights.', 'Data Privacy', '🔐', 'Penalties up to Rs.250 Crore per violation — deadline May 13, 2027'),
('Annual Tax / GST Audit',           'gst-annual','Annual GST compliance audit covering returns, ITC reconciliation, financial statements, and payroll.', 'Tax', '🧾', 'Mandatory for companies with Rs.2 Crore+ annual revenue');

-- ============================================================
-- Seed: Template Sections & Checklist Items (ISO 27001 example)
-- ============================================================
INSERT INTO template_sections (template_id, title, order_index)
SELECT t.id, 'Governance & Leadership', 1 FROM templates t WHERE t.slug = 'iso-27001';
INSERT INTO template_sections (template_id, title, order_index)
SELECT t.id, 'Risk Assessment', 2 FROM templates t WHERE t.slug = 'iso-27001';
INSERT INTO template_sections (template_id, title, order_index)
SELECT t.id, 'Access Control', 3 FROM templates t WHERE t.slug = 'iso-27001';

INSERT INTO checklist_items (section_id, question, guidance, risk_level, is_mandatory, order_index)
SELECT s.id, 'Is there a documented ISMS policy approved by top management?',
       'Clause 5.2 — The organization shall establish an ISMS policy.', 'HIGH', TRUE, 1
FROM template_sections s JOIN templates t ON s.template_id = t.id
WHERE t.slug = 'iso-27001' AND s.title = 'Governance & Leadership';

INSERT INTO checklist_items (section_id, question, guidance, risk_level, is_mandatory, order_index)
SELECT s.id, 'Are information security roles and responsibilities clearly defined?',
       'Clause 5.3 — Top management shall assign responsibilities.', 'HIGH', TRUE, 2
FROM template_sections s JOIN templates t ON s.template_id = t.id
WHERE t.slug = 'iso-27001' AND s.title = 'Governance & Leadership';

INSERT INTO checklist_items (section_id, question, guidance, risk_level, is_mandatory, order_index)
SELECT s.id, 'Has a formal risk assessment been conducted in the last 12 months?',
       'Clause 6.1.2 — Risk assessment process must be defined.', 'CRITICAL', TRUE, 1
FROM template_sections s JOIN templates t ON s.template_id = t.id
WHERE t.slug = 'iso-27001' AND s.title = 'Risk Assessment';

INSERT INTO checklist_items (section_id, question, guidance, risk_level, is_mandatory, order_index)
SELECT s.id, 'Is multi-factor authentication enforced for privileged accounts?',
       'Annex A.9.4 — System and application access control.', 'CRITICAL', TRUE, 1
FROM template_sections s JOIN templates t ON s.template_id = t.id
WHERE t.slug = 'iso-27001' AND s.title = 'Access Control';

-- ============================================================
-- Seed: Deadlines
-- ============================================================
INSERT INTO deadlines (name, description, due_date, urgency, law_id)
SELECT 'GSTR-9 Annual Return', 'Annual GST return filing deadline', '2025-12-31', 'RED', l.id
FROM laws l WHERE l.slug = 'gst-annual';

INSERT INTO deadlines (name, description, due_date, urgency, law_id)
SELECT 'DPDP Full Compliance', 'Full compliance deadline for DPDP Act 2023', '2027-05-13', 'YELLOW', l.id
FROM laws l WHERE l.slug = 'dpdp-2023';

INSERT INTO deadlines (name, description, due_date, urgency)
VALUES ('ISO Surveillance Audit', 'Annual ISO 27001 surveillance audit', '2026-03-15', 'GREEN');
