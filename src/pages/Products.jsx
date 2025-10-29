import { useEffect, useState } from 'react'
import { api, endpoints } from '../lib/api'
import { useCartStore } from '../stores/cart'
import { Link } from 'react-router-dom'


export default function Products(){
const [products,setProducts] = useState([])
const [loading,setLoading] = useState(true)
const add = useCartStore(s=>s.add)


useEffect(()=>{
(async()=>{
try{ const {data} = await api.get(endpoints.products); setProducts(data) }
finally{ setLoading(false) }
})()
},[])


if(loading) return <p>Cargando productos…</p>


return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{products.map(p=> (
<div key={p.id} className="bg-white rounded-xl border p-3 flex flex-col">
<img src={p.image_url} alt={p.name} className="w-full h-40 object-cover rounded-lg"/>
<h3 className="mt-2 font-semibold">{p.name}</h3>
<p className="text-sm text-neutral-600 line-clamp-2">{p.description}</p>
<div className="mt-auto flex items-center justify-between">
<span className="font-bold">${p.price}</span>
<div className="flex gap-2">
<Link to={`/products/${p.id}`} className="underline">Ver</Link>
<button onClick={()=>add(p)} className="px-3 py-1 border rounded">Agregar</button>
</div>
</div>
</div>
))}
</div>
)
}