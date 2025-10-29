import { useEffect, useState } from 'react'
import { api, endpoints } from '../lib/api'


export default function Orders(){
const [orders,setOrders] = useState([])
useEffect(()=>{ (async()=>{ const {data}=await api.get(endpoints.orders); setOrders(data) })() },[])
if(!orders.length) return <p>No tienes compras aún.</p>
return (
<div className="space-y-3">
{orders.map(o=> (
<div key={o.id} className="bg-white p-3 rounded border">
<div className="flex items-center justify-between">
<p className="font-semibold">Orden #{o.id}</p>
<span>{new Date(o.created_at).toLocaleString()}</span>
</div>
<ul className="mt-2 text-sm">
{o.items.map(it=> <li key={it.id}>• {it.name} x{it.qty} — ${it.price}</li>)}
</ul>
<p className="mt-2 font-bold">Total: ${o.total}</p>
</div>
))}
</div>
)
}