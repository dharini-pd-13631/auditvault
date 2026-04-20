import Link from 'next/link'

const mockAudits = [
  { id: '1', title: 'Acme Corp — GST Audit', client: 'Acme Corp', template: 'GST Annual', status: 'in_progress', created: 'Apr 15, 2026' },
  { id: '2', title: 'TechSoft — ISO 27001', client: 'TechSoft Pvt Ltd', template: 'ISO 27001', status: 'draft', created: 'Apr 10, 2026' },
  { id: '3', title: 'RetailX — DPDP Audit', client: 'RetailX India', template: 'DPDP Act', status: 'completed', created: 'Mar 28, 2026' },
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

export default function AuditsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📋 Audits</h1>
          <p className="text-gray-500 mt-1">Manage all your active and completed audits</p>
        </div>
        <Link href="/audits/new" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          + New Audit
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Audit Title</th>
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Template</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Created</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockAudits.map((audit) => (
              <tr key={audit.id}>
                <td className="py-3 font-medium text-gray-800">{audit.title}</td>
                <td className="py-3 text-gray-600">{audit.client}</td>
                <td className="py-3 text-gray-600">{audit.template}</td>
                <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[audit.status]}`}>{statusLabel[audit.status]}</span></td>
                <td className="py-3 text-gray-500">{audit.created}</td>
                <td className="py-3"><Link href={`/audits/${audit.id}`} className="text-indigo-600 hover:underline text-xs font-medium">Open →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}