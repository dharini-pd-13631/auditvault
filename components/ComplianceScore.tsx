import clsx from 'clsx'

interface Props { score: number; label: string; colorScheme: 'blue' | 'purple' | 'green' }

const colors = {
  blue: { bar: 'bg-indigo-500', text: 'text-indigo-600', bg: 'bg-indigo-50' },
  purple: { bar: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50' },
  green: { bar: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
}

export default function ComplianceScore({ score, label, colorScheme }: Props) {
  const c = colors[colorScheme]
  return (
    <div className={clsx('rounded-xl p-5', c.bg)}>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className={clsx('text-3xl font-bold', c.text)}>{score}%</p>
      <div className="mt-3 bg-white rounded-full h-2 overflow-hidden">
        <div className={clsx('h-full rounded-full transition-all', c.bar)} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-500 mt-2">{score >= 80 ? '✅ On Track' : score >= 40 ? '⚠️ Needs Attention' : '❌ Action Required'}</p>
    </div>
  )
}