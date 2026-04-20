import Link from 'next/link'
import clsx from 'clsx'

interface TemplateCardProps {
  name: string
  icon: string
  description: string
  documentCount: number
  sectionCount: number
  category: string
  penaltyNote: string
  colorTheme: 'blue' | 'purple' | 'green'
  slug: string
}

const themeStyles = {
  blue: { border: 'border-t-indigo-500', badge: 'bg-indigo-100 text-indigo-700', button: 'bg-indigo-600 hover:bg-indigo-700' },
  purple: { border: 'border-t-purple-500', badge: 'bg-purple-100 text-purple-700', button: 'bg-purple-600 hover:bg-purple-700' },
  green: { border: 'border-t-green-500', badge: 'bg-green-100 text-green-700', button: 'bg-green-600 hover:bg-green-700' },
}

export default function TemplateCard({ name, icon, description, documentCount, sectionCount, category, penaltyNote, colorTheme, slug }: TemplateCardProps) {
  const theme = themeStyles[colorTheme]
  return (
    <div className={clsx('bg-white rounded-xl shadow-sm border border-gray-200 border-t-4 p-6 flex flex-col gap-4', theme.border)}>
      <div className="flex items-start justify-between">
        <span className="text-3xl">{icon}</span>
        <span className={clsx('text-xs font-medium px-2.5 py-1 rounded-full capitalize', theme.badge)}>{category}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">📄 {documentCount} Documents</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">📂 {sectionCount} Sections</span>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800 font-medium">⚠️ {penaltyNote}</p>
      </div>
      <Link href={`/audits/new?template=${slug}`} className={clsx('w-full text-center text-sm font-medium text-white py-2.5 rounded-lg transition-colors', theme.button)}>
        Start Audit →
      </Link>
    </div>
  )
}