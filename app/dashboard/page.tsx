import ComplianceScore from '@/components/ComplianceScore'
import DeadlineBanner from '@/components/DeadlineBanner'
import Link from 'next/link'

const deadlines = [
  { name: 'GSTR-9 Annual Return', date: 'Dec 31, 2025', urgency: 'red' as const },
  { name: 'DPDP Full Compliance', date: 'May 13, 2027', urgency: 'yellow' as const },
  { name: 'ISO Surveillance Audit', date: 'Mar 15, 2026', urgency: 'green' as const },
]

const recentAudits = [
  { id: '1', title: 'Acme Corp — GST Audit', client: 'Acme Corp', template: 'GST Annual', status: 'in_progress' },
  { id: '2', title: 'TechSoft — ISO 27001', client: 'TechSoft Pvt Ltd', template: 'ISO 27001', status: 'draft' },
  { id: '3', title: 'RetailX — DPDP Audit', client: 'RetailX India', template: 'DPDP Act', status: 'completed' },
]

const statusBadge: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
}

const statusLabel: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  completed: 'Completed',
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
          <p className="text-gray-500 mt-1">Here is your compliance overview</p>
        </div>
        <Link href="/audits/new" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          + Start New Audit
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComplianceScore score={68} label="ISO 27001" colorScheme="blue" />
        <ComplianceScore score={34} label="DPDP Act 2023" colorScheme="purple" />
        <ComplianceScore score={91} label="GST Annual Audit" colorScheme="green" />
      </div>
      <DeadlineBanner deadlines={deadlines} />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">📂 Recent Audits</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Audit</th>
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Template</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentAudits.map((audit) => (
              <tr key={audit.id}>
                <td className="py-3 font-medium text-gray-800">{audit.title}</td>
                <td className="py-3 text-gray-600">{audit.client}</td>
                <td className="py-3 text-gray-600">{audit.template}</td>
                <td className="py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[audit.status]}`}> 
                    {statusLabel[audit.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}