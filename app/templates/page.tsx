import TemplateCard from '@/components/TemplateCard'

const templates = [
  { name: 'ISO 27001 — Information Security', icon: '🛡️', description: 'ISMS audit based on ISO/IEC 27001:2022. Covers governance, risk, technical controls, and audit evidence.', documentCount: 25, sectionCount: 7, category: 'Compliance', penaltyNote: 'ISO certification denied if mandatory documents are missing', colorTheme: 'blue' as const, slug: 'iso-27001' },
  { name: 'DPDP Act 2023 Compliance', icon: '🔐', description: 'Digital Personal Data Protection Act 2023 (India). Covers consent, data inventory, breach management, and rights.', documentCount: 22, sectionCount: 7, category: 'Data Privacy', penaltyNote: 'Penalties up to Rs.250 Crore per violation — deadline May 13, 2027', colorTheme: 'purple' as const, slug: 'dpdp-act' },
  { name: 'Annual Tax / GST Audit', icon: '🧾', description: 'Annual GST compliance audit covering returns, ITC reconciliation, financial statements, and payroll.', documentCount: 15, sectionCount: 5, category: 'Tax', penaltyNote: 'Mandatory for companies with Rs.2 Crore+ annual revenue', colorTheme: 'green' as const, slug: 'gst-annual' },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📚 Template Library</h1>
        <p className="text-gray-500 mt-1">Choose a compliance framework to begin your audit</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((t) => <TemplateCard key={t.slug} {...t} />)}
      </div>
    </div>
  )
}