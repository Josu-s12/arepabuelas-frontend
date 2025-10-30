import { create } from 'zustand'

export const useUIStore = create((set,get)=>({
  toasts: [], // {id,title,message}
  pushToast: ({title,message})=>{
    const id = Math.random().toString(36).slice(2)
    set({ toasts: [...get().toasts, {id,title,message}] })
    setTimeout(()=>{
      const { toasts } = get()
      set({ toasts: toasts.filter(t=>t.id!==id) })
    }, 2500)
  },
  removeToast: (id)=> set({ toasts: get().toasts.filter(t=>t.id!==id) })
}))