'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { ChecklistItem as ChecklistItemType, ResponseStatus } from '@/types'

interface Props {
  item: ChecklistItemType
  response: { status: ResponseStatus; notes: string }
  onStatusChange: (status: ResponseStatus) => void
  onNotesChange: (notes: string) => void
}

const riskColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
}

const statusButtons: { status: ResponseStatus; label: string; activeClass: string; inactiveClass: string }[] = [
  { status: 'compliant', label: '✅ Compliant', activeClass: 'bg-green-600 text-white border-green-600', inactiveClass: 'border-gray-200 text-gray-600 hover:border-green-400' },
  { status: 'non_compliant', label: '❌ Non-Compliant', activeClass: 'bg-red-600 text-white border-red-600', inactiveClass: 'border-gray-200 text-gray-600 hover:border-red-400' },
  { status: 'partial', label: '⚠️ Partial', activeClass: 'bg-amber-500 text-white border-amber-500', inactiveClass: 'border-gray-200 text-gray-600 hover:border-amber-400' },
  { status: 'na', label: '➖ N/A', activeClass: 'bg-gray-500 text-white border-gray-500', inactiveClass: 'border-gray-200 text-gray-600 hover:border-gray-400' },
]

export default function ChecklistItem({ item, response, onStatusChange, onNotesChange }: Props) {
  const [showGuidance, setShowGuidance] = useState(false)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{item.question}</p>
        <div className="flex gap-2 shrink-0">
          <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full capitalize', riskColors[item.riskLevel])}>{item.riskLevel}</span>
          {item.isMandatory && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">Mandatory</span>}
        </div>
      </div>
      {item.guidance && (
        <div>
          <button onClick={() => setShowGuidance(!showGuidance)} className="text-xs text-indigo-600 hover:underline">
            {showGuidance ? '▲ Hide guidance' : '▼ Show guidance'}
          </button>
          {showGuidance && <p className="text-xs text-gray-500 mt-1 bg-gray-50 rounded p-2">{item.guidance}</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {statusButtons.map(btn => (
          <button key={btn.status} onClick={() => onStatusChange(btn.status)} className={clsx('text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors', response.status === btn.status ? btn.activeClass : btn.inactiveClass)}>
            {btn.label}
          </button>
        ))}
      </div>
      {(response.status === 'non_compliant' || response.status === 'partial') && (
        <textarea
          placeholder="Add notes or observations..."
          value={response.notes || ''}
          onChange={e => onNotesChange(e.target.value)}
          rows={2}
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      )}
    </div>
  )
}