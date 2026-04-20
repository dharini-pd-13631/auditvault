export default function TopBar({ title }: { title?: string }) {
  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center px-6">
      <h2 className="text-sm font-semibold text-gray-700">{title || 'Audit Vault'}</h2>
    </div>
  )
}