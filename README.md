# Audit Vault

A compliance document management and audit execution portal for Indian companies.

## What It Does

- Template Library with 3 pre-built compliance frameworks
- ISO 27001 Information Security audit (25 checklist items, 7 sections)
- DPDP Act 2023 Data Privacy compliance (22 checklist items, 7 sections)
- GST Annual Audit Tax compliance (15 checklist items, 5 sections)
- Audit Execution with interactive checklist
- Compliance Reports with score, section breakdown, critical gaps
- Deadline Tracker on dashboard

## Tech Stack

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Database + Auth + Storage: Supabase (PostgreSQL)
- Deployment: Vercel

## Getting Started

1. Clone the repository: git clone https://github.com/dharini-pd-13631/auditvault.git
2. Install dependencies: npm install
3. Copy env file: cp .env.local.example .env.local
4. Fill in your Supabase URL and anon key in .env.local
5. Run: npm run dev
6. Open http://localhost:3000

## Supabase Setup

1. Go to https://supabase.com and create a free project
2. Open the SQL Editor
3. Paste the contents of supabase/migrations/001_initial_schema.sql
4. Click Run
5. Copy your Project URL and anon key from Settings > API

## Roadmap

- Supabase auth fully wired (login/signup)
- Save audit responses to database
- PDF report export
- CA Firm portal for multiple clients
- AI document analyser
- WhatsApp deadline alerts