-- ============================================================
-- AuditVault — Full Database Schema
-- ============================================================

-- 1. ROLES (master table of all possible roles)
CREATE TABLE roles (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name          VARCHAR(50)  NOT NULL UNIQUE,
    display_name  VARCHAR(100),
    description   VARCHAR(500),
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS
CREATE TABLE users (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone         VARCHAR(20),
    firm_name     VARCHAR(200),
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. USER_ROLES (many-to-many: which users have which roles)
CREATE TABLE user_roles (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id     UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, role_id)
);

-- 4. ROLE_PERMISSIONS (what each role can do)
CREATE TABLE role_permissions (
    id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id  UUID        NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    resource VARCHAR(50) NOT NULL,
    action   VARCHAR(50) NOT NULL,
    UNIQUE (role_id, resource, action)
);

-- 5. SECTORS
CREATE TABLE sectors (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code        VARCHAR(30)  NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    icon        VARCHAR(10),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. LAWS
CREATE TABLE laws (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug         VARCHAR(80)  NOT NULL UNIQUE,
    name         VARCHAR(200) NOT NULL,
    description  TEXT,
    country      VARCHAR(50),
    penalty_note VARCHAR(500),
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. SECTOR_LAWS (many-to-many: which laws apply to which sectors)
CREATE TABLE sector_laws (
    id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
    law_id    UUID NOT NULL REFERENCES laws(id) ON DELETE CASCADE,
    UNIQUE (sector_id, law_id)
);

-- 8. TEMPLATES
CREATE TABLE templates (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name         VARCHAR(200) NOT NULL,
    slug         VARCHAR(80)  NOT NULL UNIQUE,
    description  TEXT,
    category     VARCHAR(50),
    icon         VARCHAR(10),
    penalty_note VARCHAR(500),
    is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. TEMPLATE_SECTIONS
CREATE TABLE template_sections (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID         NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
    title       VARCHAR(200) NOT NULL,
    order_index INT          NOT NULL
);

-- 10. CHECKLIST_ITEMS
CREATE TABLE checklist_items (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_id   UUID         NOT NULL REFERENCES template_sections(id) ON DELETE CASCADE,
    question     TEXT         NOT NULL,
    guidance     TEXT,
    risk_level   VARCHAR(10),
    is_mandatory BOOLEAN      NOT NULL DEFAULT FALSE,
    order_index  INT          NOT NULL
);

-- 11. AUDITS
CREATE TABLE audits (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID         NOT NULL REFERENCES templates(id),
    user_id     UUID         NOT NULL REFERENCES users(id),
    title       VARCHAR(200) NOT NULL,
    client_name VARCHAR(200),
    status      VARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    due_date    DATE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AUDIT_RESPONSES
CREATE TABLE audit_responses (
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    audit_id          UUID        NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    checklist_item_id UUID        NOT NULL REFERENCES checklist_items(id),
    status            VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    notes             TEXT,
    evidence_url      VARCHAR(500),
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (audit_id, checklist_item_id)
);

-- 13. DEADLINES
CREATE TABLE deadlines (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    due_date    DATE         NOT NULL,
    urgency     VARCHAR(10),
    law_id      UUID REFERENCES laws(id),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
