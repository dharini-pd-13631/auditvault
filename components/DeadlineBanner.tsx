interface Deadline { name: string; date: string; urgency: 'red' | 'yellow' | 'green' }
const dot = { red: 'bg-red-500', yellow: 'bg-amber-400', green: 'bg-green-500' }

export default function DeadlineBanner({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">🔔 Upcoming Deadlines</h3>
      <div className="space-y-2">
        {deadlines.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dot[d.urgency]}`} />
              <span className="text-gray-700">{d.name}</span>
            </div>
            <span className="text-gray-400 text-xs">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}