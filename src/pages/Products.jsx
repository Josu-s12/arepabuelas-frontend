import { useEffect, useMemo, useState } from 'react'
import { api, endpoints } from '../lib/api'
import { useCartStore } from '../stores/cart'
import { Link } from 'react-router-dom'

function inferCategory(p){
  const t = `${p.name} ${p.description}`.toLowerCase()
  if(t.includes('choclo')) return 'choclo'
  if(t.includes('hogao')) return 'hogao'
  if(t.includes('queso')) return 'queso'
  return 'clásica'
}

function ProductCard({p, onAdd}){
  const cat = inferCategory(p)
  return (
    <div className="card group overflow-hidden relative">
      <div className="absolute left-3 top-3 badge capitalize">{cat}</div>
      <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover transition duration-300 group-hover:scale-[1.02]"/>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{p.name}</h3>
        <p className="text-sm text-neutral-600 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="price">${p.price}</span>
          <div className="flex gap-2 opacity-100">
            <Link to={`/products/${p.id}`} className="btn btn-ghost">Ver</Link>
            <button onClick={()=>onAdd(p)} className="btn btn-primary">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products(){
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const [q,setQ] = useState('')
  const [chip,setChip] = useState('todas')
  const add = useCartStore(s=>s.add)

  useEffect(()=>{
    (async()=>{
      try{ const {data} = await api.get(endpoints.products); setProducts(data) }
      finally{ setLoading(false) }
    })()
  },[])

  const filtered = useMemo(()=>{
    let list = products
    if(q.trim()){
      const term = q.toLowerCase()
      list = list.filter(p => (`${p.name} ${p.description}`.toLowerCase()).includes(term))
    }
    if(chip !== 'todas'){
      list = list.filter(p => inferCategory(p) === chip)
    }
    return list
  },[products,q,chip])

  if(loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {Array.from({length:6}).map((_,i)=> (
        <div key={i} className="card p-4">
          <div className="skeleton h-44 w-full"/>
          <div className="mt-3 skeleton h-5 w-2/3"/>
          <div className="mt-2 skeleton h-4 w-full"/>
          <div className="mt-2 skeleton h-4 w-5/6"/>
          <div className="mt-4 skeleton h-9 w-full"/>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="rounded-2xl bg-gradient-to-r from-red-100 to-red-50 border border-red-200 p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-red-800">Arepas que abrazan</h1>
            <p className="text-neutral-700 mt-1 max-w-xl">Compra arepas de queso, choclo y hogao como en la esquina de las abuelas — ahora con entrega rápida y cupones para nuevas cuentas.</p>
          </div>
          <div className="w-full md:w-96">
            <div className="bg-white border rounded-2xl p-2 flex items-center gap-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 015.364 10.857l3.764 3.765a.75.75 0 11-1.06 1.06l-3.765-3.764A6.75 6.75 0 1110.5 3.75zm0 1.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" /></svg>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar arepas (queso, choclo, hogao)" className="flex-1 outline-none"/>
              {q && <button onClick={()=>setQ('')} className="text-sm text-red-700 hover:underline">Limpiar</button>}
            </div>
          </div>
        </div>
        {/* Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['todas','queso','choclo','hogao','clásica'].map(c => (
            <button key={c} onClick={()=>setChip(c)} className={`px-3 py-1.5 rounded-full border text-sm ${chip===c? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-red-50 border-red-200 text-red-800'}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(p=> <ProductCard key={p.id} p={p} onAdd={add} />)}
        </div>
      ) : (
        <div className="card p-6 text-center">
          <p className="text-neutral-700">No encontramos resultados. Prueba otra búsqueda o quita los filtros.</p>
        </div>
      )}
    </div>
  )
}
