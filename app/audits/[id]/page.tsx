'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { iso27001Template } from '@/lib/templates/iso27001'
import { dpdpTemplate } from '@/lib/templates/dpdp'
import { gstTemplate } from '@/lib/templates/gst'
import { Template, ResponseStatus } from '@/types'
import ChecklistItem from '@/components/ChecklistItem'

const templates: Record<string, Template> = {
  'iso-27001': iso27001Template,
  'dpdp-act': dpdpTemplate,
  'gst-annual': gstTemplate,
}

function AuditExecution({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const templateSlug = searchParams.get('template') || 'iso-27001'
  const template = templates[templateSlug] || iso27001Template
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)
  const [responses, setResponses] = useState<Record<string, { status: ResponseStatus; notes: string }>>({})
  const activeSection = template.sections[activeSectionIdx]

  const getSectionCompletion = (sectionId: string) => {
    const items = template.sections.find(s => s.id === sectionId)?.items || []
    const answered = items.filter(i => responses[i.id]?.status && responses[i.id].status !== 'pending').length
    return { answered, total: items.length }
  }

  const totalItems = template.sections.reduce((acc, s) => acc + s.items.length, 0)
  const answeredItems = Object.values(responses).filter(r => r.status && r.status !== 'pending').length
  const progress = totalItems > 0 ? Math.round((answeredItems / totalItems) * 100) : 0

  const getSectionIcon = (sectionId: string) => {
    const { answered, total } = getSectionCompletion(sectionId)
    if (answered === total && total > 0) return '✅'
    if (answered > 0) return '🔄'
    return '⬜'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{template.name}</h1>
          <p className="text-sm text-gray-500">Answer each checklist item below</p>
        </div>
        <Link href={`/reports/${params.id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">View Report →</Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-indigo-600">{progress}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{answeredItems} of {totalItems} items completed</p>
      </div>
      <div className="flex gap-6">
        <div className="w-56 shrink-0 space-y-1">
          {template.sections.map((section, idx) => (
            <button key={section.id} onClick={() => setActiveSectionIdx(idx)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${activeSectionIdx === idx ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}> 
              <span className="mr-2">{getSectionIcon(section.id)}</span>{section.title}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">📂 {activeSection.title}</h2>
          {activeSection.items.map(item => (
            <ChecklistItem key={item.id} item={item} response={responses[item.id] || { status: 'pending', notes: '' }}
              onStatusChange={(status) => setResponses(prev => ({ ...prev, [item.id]: { ...prev[item.id], status } }))}
              onNotesChange={(notes) => setResponses(prev => ({ ...prev, [item.id]: { ...prev[item.id], notes } }))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AuditPage({ params }: { params: { id: string } }) {
  return <Suspense><AuditExecution params={params} /></Suspense>
}