# 🏛️ AuditVault — Compliance Audit Management Platform

A **Java Spring Boot** backend API for managing compliance audits across Indian regulatory frameworks (ISO 27001, DPDP Act 2023, GST) with role-based access control.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Java 17 |
| Framework | Spring Boot 3.2.5 |
| Security | Spring Security + JWT (jjwt 0.12.5) |
| Database | PostgreSQL (prod) / H2 (dev) |
| ORM | Spring Data JPA + Hibernate |
| Migrations | Flyway |
| Build | Maven |

---

## Project Structure

```
auditvault/
├── pom.xml
├── src/main/java/com/auditvault/
│   ├── AuditVaultApplication.java
│   ├── config/SecurityConfig.java
│   ├── controller/ (9 controllers, 23 endpoints)
│   ├── dto/request/ (5 request DTOs)
│   ├── dto/response/ (7 response DTOs)
│   ├── entity/ (13 JPA entities)
│   ├── enums/ (5 enums)
│   ├── exception/ (3 exceptions + global handler)
│   ├── repository/ (11 JPA repositories)
│   ├── security/ (JWT provider, filter, user details)
│   └── service/ (8 service classes)
├── src/main/resources/
│   ├── application.properties
│   ├── db/migration/ (3 SQL migrations)
│   └── seed/ (XML seed data)
└── src/test/java/com/auditvault/
    └── AuditVaultApplicationTests.java
```

---

## Database Schema (13 Tables)

| # | Table | Purpose |
|---|-------|---------|
| 1 | `roles` | Master table of all roles (7 seeded) |
| 2 | `users` | User accounts |
| 3 | `user_roles` | Many-to-many: user ↔ role |
| 4 | `role_permissions` | Fine-grained permissions per role |
| 5 | `sectors` | Industry sectors (8 seeded) |
| 6 | `laws` | Regulatory laws (8 seeded) |
| 7 | `sector_laws` | Many-to-many: sector ↔ law |
| 8 | `templates` | Audit templates (3 seeded) |
| 9 | `template_sections` | Sections within templates |
| 10 | `checklist_items` | Individual audit questions |
| 11 | `audits` | Audit instances |
| 12 | `audit_responses` | Responses to checklist items |
| 13 | `deadlines` | Compliance deadlines |

---

## Roles & Permissions

| Role | Display Name | Access Level |
|------|-------------|-------------|
| `SUPER_ADMIN` | Super Admin | Full platform access |
| `ADMIN` | Admin | Firm-level admin |
| `IT_AUDITOR` | IT Auditor | ISO 27001 / DPDP audits |
| `TAX_AUDITOR` | Tax Auditor | GST / Tax audits |
| `COMPLIANCE_AUDITOR` | Compliance Auditor | All audit types |
| `CA_FIRM_MANAGER` | CA Firm Manager | Manages firm's audit portfolio |
| `CLIENT_VIEWER` | Client Viewer | Read-only access to own audits |

Roles use a **separate `roles` table** with **`user_roles`** junction table and **`role_permissions`** for fine-grained access control.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | Public | Register new user |
| POST | `/api/v1/auth/login` | Public | Login, get JWT |
| GET | `/api/v1/health` | Public | Health check |
| GET | `/api/v1/users` | ADMIN+ | List all users |
| POST | `/api/v1/users/{id}/roles` | ADMIN+ | Assign role |
| GET | `/api/v1/roles` | SUPER_ADMIN | List roles |
| POST | `/api/v1/roles` | SUPER_ADMIN | Create role |
| GET | `/api/v1/templates` | Auth | List templates |
| GET | `/api/v1/templates/{slug}` | Auth | Template details |
| POST | `/api/v1/audits` | Auth | Create audit |
| GET | `/api/v1/audits` | Auth | List audits |
| PATCH | `/api/v1/audits/{id}/status` | Auth | Update status |
| POST | `/api/v1/audits/{id}/responses` | Auth | Save response |
| GET | `/api/v1/sectors` | Auth | List sectors |
| GET | `/api/v1/sectors/{code}/laws` | Auth | Laws per sector |
| GET | `/api/v1/dashboard/summary` | Auth | Dashboard data |
| GET | `/api/v1/deadlines` | Auth | List deadlines |

---

## Quick Start

```bash
git clone https://github.com/dharini-pd-13631/auditvault.git
cd auditvault
./mvnw spring-boot:run
# API at http://localhost:8080/api/v1/health
```

---

## Files Created (64 total)

### Config (3)
- `pom.xml`, `application.properties`, `.gitignore`

### Enums (5)
- `RoleName`, `AuditStatus`, `ResponseStatus`, `RiskLevel`, `Urgency`

### Entities (13)
- `Role`, `User`, `UserRole`, `RolePermission`, `Sector`, `Law`, `SectorLaw`, `Template`, `TemplateSection`, `ChecklistItem`, `Audit`, `AuditResponse`, `Deadline`

### Repositories (11)
- One for each entity (except `SectorLaw` shares with `Sector`, `TemplateSection`/`ChecklistItem` cascade)

### DTOs (12)
- Request: `Register`, `Login`, `CreateAudit`, `SaveResponse`, `AssignRole`
- Response: `Auth`, `User`, `AuditSummary`, `Dashboard`, `Deadline`, `ComplianceScore`, `ApiError`

### Services (8)
- `Auth`, `User`, `Role`, `Template`, `Audit`, `Dashboard`, `Sector`, `Deadline`

### Controllers (9)
- `Auth`, `User`, `Role`, `Template`, `Audit`, `Sector`, `Dashboard`, `Deadline`, `Health`

### Security (4)
- `SecurityConfig`, `JwtTokenProvider`, `JwtAuthenticationFilter`, `CustomUserDetailsService`

### Exceptions (4)
- `ResourceNotFound`, `DuplicateResource`, `AccessDenied`, `GlobalExceptionHandler`

### Database (3 migrations)
- `V1__initial_schema.sql` — 13 tables
- `V2__seed_roles_and_permissions.sql` — 7 roles + full permission matrix
- `V3__seed_sectors_laws_templates.sql` — sectors, laws, templates, deadlines

### Seed Data (2 XML)
- `seed-roles.xml`, `seed-sectors.xml`

### Test (1)
- `AuditVaultApplicationTests.java`

---

## What's Next 🔜
- PDF report generation
- Compliance score calculation
- Email notifications
- File upload for evidence
- Swagger/OpenAPI docs
- Unit + integration tests
- Docker setup
- CI/CD pipeline
- Frontend (React/Angular)