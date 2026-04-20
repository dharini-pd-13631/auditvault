import Link from 'next/link'

const mockReports = [
  { id: '1', title: 'Acme Corp — GST Audit', client: 'Acme Corp', template: 'GST Annual', score: 91, date: 'Apr 15, 2026' },
  { id: '2', title: 'TechSoft — ISO 27001', client: 'TechSoft Pvt Ltd', template: 'ISO 27001', score: 69, date: 'Apr 10, 2026' },
  { id: '3', title: 'RetailX — DPDP Audit', client: 'RetailX India', template: 'DPDP Act', score: 34, date: 'Mar 28, 2026' },
]

function scoreColor(score: number) {
  if (score >= 80) return 'text-green-600'
  if (score >= 50) return 'text-amber-600'
  return 'text-red-600'
}

function scoreLabel(score: number) {
  if (score >= 80) return '✅ Compliant'
  if (score >= 50) return '⚠️ Partial'
  return '❌ Action Required'
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📊 Reports</h1>
        <p className="text-gray-500 mt-1">Compliance reports for completed audits</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Audit</th>
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Template</th>
              <th className="pb-3 font-medium">Score</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockReports.map((report) => (
              <tr key={report.id}>
                <td className="py-3 font-medium text-gray-800">{report.title}</td>
                <td className="py-3 text-gray-600">{report.client}</td>
                <td className="py-3 text-gray-600">{report.template}</td>
                <td className={`py-3 font-semibold ${scoreColor(report.score)}`}>
                  {report.score}% <span className="font-normal text-xs ml-1">{scoreLabel(report.score)}</span>
                </td>
                <td className="py-3 text-gray-500">{report.date}</td>
                <td className="py-3">
                  <Link href={`/reports/${report.id}`} className="text-indigo-600 hover:underline text-xs font-medium">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
