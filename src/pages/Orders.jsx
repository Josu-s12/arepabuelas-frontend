import { useEffect, useState } from 'react'
import { api, endpoints } from '../lib/api'

export default function Orders(){
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{ (async()=>{ try{ const {data}=await api.get(endpoints.orders); setOrders(data) } finally { setLoading(false) } })() },[])
  if(loading) return <div className="card p-6"><div className="skeleton h-6 w-1/3"/><div className="mt-2 skeleton h-28 w-full"/></div>
  if(!orders.length) return <p>No tienes compras aún.</p>
  return (
    <div className="space-y-3">
      {orders.map(o=> (
        <div key={o.id} className="card p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Orden #{o.id}</p>
            <span className="text-sm text-neutral-600">{new Date(o.created_at).toLocaleString()}</span>
          </div>
          <ul className="mt-3 text-sm space-y-1">
            {o.items.map(it=> <li key={it.id}>• {it.name} x{it.qty} — ${it.price}</li>)}
          </ul>
          <p className="mt-3 price">Total: ${o.total}</p>
        </div>
      ))}
    </div>
  )
}
