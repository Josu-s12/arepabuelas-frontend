import { useUIStore } from '../stores/ui'

export default function Toaster(){
  const { toasts, removeToast } = useUIStore()
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(t=> (
        <div key={t.id} className="pointer-events-auto card border-red-200 bg-white/95 backdrop-blur p-3 min-w-[260px] shadow-lg">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">🧺</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{t.title}</p>
              <p className="text-xs text-neutral-600">{t.message}</p>
            </div>
            <button onClick={()=>removeToast(t.id)} className="text-neutral-500 hover:text-red-700">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}