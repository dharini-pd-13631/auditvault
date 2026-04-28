-- ============================================================
-- Seed: Default Roles
-- ============================================================
INSERT INTO roles (name, display_name, description) VALUES
('SUPER_ADMIN',        'Super Admin',         'Full platform access — manage all users, firms, settings'),
('ADMIN',              'Admin',               'Firm-level admin — manage users within their firm'),
('IT_AUDITOR',         'IT Auditor',          'Conducts ISO 27001 / DPDP / IT compliance audits'),
('TAX_AUDITOR',        'Tax Auditor',         'Conducts GST / Income Tax / Tax compliance audits'),
('COMPLIANCE_AUDITOR', 'Compliance Auditor',  'General compliance auditor — all audit types'),
('CA_FIRM_MANAGER',    'CA Firm Manager',     'Manages a CA firm audit portfolio and assigns auditors'),
('CLIENT_VIEWER',      'Client Viewer',       'Read-only access to view own audit status and reports');

-- ============================================================
-- Seed: Permissions per Role
-- ============================================================

-- SUPER_ADMIN — full access
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('users','create'),('users','read'),('users','update'),('users','delete'),
    ('roles','create'),('roles','read'),('roles','update'),('roles','delete'),
    ('templates','create'),('templates','read'),('templates','update'),('templates','delete'),
    ('audits','create'),('audits','read'),('audits','update'),('audits','delete'),('audits','execute'),
    ('reports','read'),('reports','export'),
    ('settings','read'),('settings','update'),
    ('sectors','create'),('sectors','read'),('sectors','update'),
    ('laws','create'),('laws','read'),('laws','update'),
    ('deadlines','create'),('deadlines','read'),('deadlines','update'),('deadlines','delete')
) AS res(resource, action)
WHERE r.name = 'SUPER_ADMIN';

-- ADMIN
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('users','create'),('users','read'),('users','update'),
    ('templates','create'),('templates','read'),
    ('audits','create'),('audits','read'),('audits','update'),
    ('reports','read'),('reports','export'),
    ('settings','read'),('settings','update'),
    ('deadlines','create'),('deadlines','read'),('deadlines','update')
) AS res(resource, action)
WHERE r.name = 'ADMIN';

-- IT_AUDITOR
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('templates','read'),
    ('audits','create'),('audits','read'),('audits','execute'),
    ('reports','read'),('reports','export'),
    ('deadlines','read')
) AS res(resource, action)
WHERE r.name = 'IT_AUDITOR';

-- TAX_AUDITOR
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('templates','read'),
    ('audits','create'),('audits','read'),('audits','execute'),
    ('reports','read'),('reports','export'),
    ('deadlines','read')
) AS res(resource, action)
WHERE r.name = 'TAX_AUDITOR';

-- COMPLIANCE_AUDITOR
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('templates','read'),
    ('audits','create'),('audits','read'),('audits','execute'),
    ('reports','read'),('reports','export'),
    ('deadlines','create'),('deadlines','read')
) AS res(resource, action)
WHERE r.name = 'COMPLIANCE_AUDITOR';

-- CA_FIRM_MANAGER
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('users','read'),
    ('templates','read'),
    ('audits','create'),('audits','read'),('audits','update'),
    ('reports','read'),('reports','export'),
    ('deadlines','create'),('deadlines','read'),('deadlines','update')
) AS res(resource, action)
WHERE r.name = 'CA_FIRM_MANAGER';

-- CLIENT_VIEWER
INSERT INTO role_permissions (role_id, resource, action)
SELECT r.id, res.resource, res.action
FROM roles r
CROSS JOIN (VALUES
    ('audits','read'),
    ('reports','read'),('reports','export')
) AS res(resource, action)
WHERE r.name = 'CLIENT_VIEWER';
