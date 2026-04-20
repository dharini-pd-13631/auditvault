'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', orgName: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-3xl">🏛️</span>
          <h1 className="text-xl font-bold text-gray-900 mt-2">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start auditing in minutes</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dharini Palanisamy" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name</label>
            <input required type="text" value={form.orgName} onChange={e => setForm({ ...form, orgName: e.target.value })} placeholder="Acme Corp Pvt Ltd" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">Create Account →</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link></p>
      </div>
    </div>
  )
}