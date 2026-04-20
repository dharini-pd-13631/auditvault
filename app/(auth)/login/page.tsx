'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-3xl">🏛️</span>
          <h1 className="text-xl font-bold text-gray-900 mt-2">Sign in to Audit Vault</h1>
          <p className="text-gray-500 text-sm mt-1">Compliance made simple</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">Sign In →</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">No account? <Link href="/signup" className="text-indigo-600 hover:underline">Create one</Link></p>
      </div>
    </div>
  )
}