import Link from 'next/link'

const sectionBreakdown = [
  { name: 'Governance & Scope', score: 100 },
  { name: 'Risk Management', score: 60 },
  { name: 'People & Training', score: 40 },
  { name: 'Technical Policies', score: 90 },
  { name: 'Incident Management', score: 80 },
  { name: 'Audit Evidence', score: 50 },
  { name: 'Supplier Management', score: 67 },
]

const criticalGaps = [
  'Risk Assessment Report not updated in the last 12 months',
  'Statement of Applicability missing 3 Annex A controls',
  'Internal Audit Reports not available for current cycle',
]

const recommendations = [
  'Conduct Security Awareness Training for all staff (overdue)',
  'Update Supplier Risk Assessments for 2 critical vendors',
  'Complete Statement of Applicability review with consultant',
]

const overallScore = Math.round(sectionBreakdown.reduce((a, s) => a + s.score, 0) / sectionBreakdown.length)
const scoreLabel = overallScore >= 80 ? '✅ Largely Compliant' : overallScore >= 50 ? '⚠️ Partially Compliant' : '❌ Action Required'
const scoreColor = overallScore >= 80 ? 'text-green-600' : overallScore >= 50 ? 'text-amber-600' : 'text-red-600'
const barColor = overallScore >= 80 ? 'bg-green-500' : overallScore >= 50 ? 'bg-amber-400' : 'bg-red-500'

export default function ReportPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 Audit Report</h1>
          <p className="text-gray-500 mt-1">Audit ID: {params.id}</p>
        </div>
        <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">⬇️ Export PDF</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-500 mb-1">Overall Compliance Score</p>
        <p className={`text-5xl font-bold ${scoreColor}`}>{overallScore}%</p>
        <p className={`text-base font-medium mt-1 ${scoreColor}`}>{scoreLabel}</p>
        <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${overallScore}%` }} />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Section Breakdown</h2>
        <div className="space-y-3">
          {sectionBreakdown.map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{s.name}</span>
                <span className={`font-medium ${s.score >= 80 ? 'text-green-600' : s.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{s.score}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full ${s.score >= 80 ? 'bg-green-500' : s.score >= 50 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-red-800 mb-3">🔴 Critical Gaps</h2>
        <ul className="space-y-2">{criticalGaps.map((gap, i) => <li key={i} className="flex items-start gap-2 text-sm text-red-700"><span>•</span>{gap}</li>)}</ul>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-amber-800 mb-3">🟡 Recommended Actions</h2>
        <ul className="space-y-2">{recommendations.map((rec, i) => <li key={i} className="flex items-start gap-2 text-sm text-amber-700"><span>•</span>{rec}</li>)}</ul>
      </div>
      <Link href="/audits" className="text-sm text-indigo-600 hover:underline">← Back to Audits</Link>
    </div>
  )
}