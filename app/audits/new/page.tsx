'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const templateOptions = [
  { value: 'iso-27001', label: '🛡️ ISO 27001 — Information Security' },
  { value: 'dpdp-act', label: '🔐 DPDP Act 2023 Compliance' },
  { value: 'gst-annual', label: '🧾 Annual Tax / GST Audit' },
]

function NewAuditForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', clientName: '', dueDate: '', template: searchParams.get('template') || '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.random().toString(36).slice(2, 9)
    router.push(`/audits/${id}?template=${form.template}`)
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">+ New Audit</h1>
        <p className="text-gray-500 mt-1">Set up a new compliance audit for your client</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Audit Template *</label>
          <select required value={form.template} onChange={e => setForm({ ...form, template: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select a framework...</option>
            {templateOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Audit Title *</label>
          <input required type="text" placeholder="e.g. Q1 2026 GST Audit — Acme Corp" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client / Company Name *</label>
          <input required type="text" placeholder="e.g. Acme Corp Pvt Ltd" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">Create Audit →</button>
      </form>
    </div>
  )
}

export default function NewAuditPage() {
  return <Suspense><NewAuditForm /></Suspense>
}