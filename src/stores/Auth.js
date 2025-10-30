import { create } from 'zustand'
import { api, endpoints } from '../lib/api'

export const useAuthStore = create((set)=>({
user: null,
loading: false,
login: async (email, password)=>{
    set({loading:true})
    try{
    const { data } = await api.post(endpoints.login, { email, password })
    localStorage.setItem('token', data.token)
    set({ user: data.user, loading:false })
    return { ok:true }
    }catch(e){ set({loading:false}); return { ok:false, error:e?.response?.data?.message||'Login failed' } }
},
register: async (payload)=>{
    set({loading:true})
    try{
    const formData = new FormData()
    Object.entries(payload).forEach(([k,v])=> formData.append(k,v))
    await api.pst(endpoints.register, formData, { headers:{'Content-Type':'multipart/form-data'} })
    set({loading:false})
    return { ok:true }
    }catch(e){ set({loading:false}); return { ok:false, error:e?.response?.data?.message||'Register failed' } }
},
me: async ()=>{
    try{ const {data} = await api.get(endpoints.me); set({user:data}) }catch{}
},
logout: ()=>{ localStorage.removeItem('token'); set({user:null}) }
}))