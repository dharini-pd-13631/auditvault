'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ClipboardList, BookOpen, BarChart2, Settings } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Audits', href: '/audits', icon: ClipboardList },
  { label: 'Templates', href: '/templates', icon: BookOpen },
  { label: 'Reports', href: '/reports', icon: BarChart2 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-10">
      <div className="p-6 border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">🏛️ Audit Vault</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className={clsx('flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors', pathname.startsWith(href) ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100')}> 
            <Icon size={18} />{label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">D</div>
          <div>
            <p className="text-sm font-medium text-gray-800">Dharini</p>
            <p className="text-xs text-gray-500">Auditor</p>
          </div>
        </div>
      </div>
    </aside>
  )
}