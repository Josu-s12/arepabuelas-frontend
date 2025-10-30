import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api, endpoints } from '../lib/api'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default function ProductDetail(){
  const { id } = useParams()
  const [p,setP] = useState(null)
  const [comments,setComments] = useState([])
  const [comment,setComment] = useState('')
  const [loading,setLoading] = useState(true)
  const add = useCartStore(s=>s.add)
  const { user } = useAuthStore()

  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await api.get(endpoints.product(id));
        setP(data.product); setComments(data.comments||[])
      } finally { setLoading(false) }
    })()
  },[id])

  const submitComment = async (e)=>{
    e.preventDefault()
    if(!user) return alert('Debes iniciar sesión')
    if(!user?.validated) return alert('Tu cuenta está pendiente de validación por el administrador.')
    const {data} = await api.post(endpoints.comments(id), { content: comment })
    setComments((c)=>[...c,data]); setComment('')
  }

  if(loading) return <div className="card p-6"><div className="skeleton h-64 w-full"/><div className="mt-4 skeleton h-6 w-1/2"/><div className="mt-2 skeleton h-4 w-full"/></div>
  if(!p) return <p className="text-neutral-700">Producto no encontrado.</p>

  return (
    <div className="space-y-4">
      <nav className="text-sm text-neutral-600"><Link to="/" className="hover:underline text-red-700">Inicio</Link> / <span>{p.name}</span></nav>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="card overflow-hidden">
          <img src={p.image_url} className="w-full h-96 object-cover" alt={p.name} />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold">{p.name}</h1>
          <p className="text-neutral-700 leading-relaxed">{p.description}</p>
          <p className="price text-2xl">${p.price}</p>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>add(p)} className="btn btn-primary">Agregar al carrito</button>
            <a href="#comentarios" className="btn btn-ghost">Ver comentarios</a>
          </div>
          {!user?.validated && (
            <div className="mt-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-xl p-3">🔒 Debes estar validado por el admin para comprar o comentar.</div>
          )}
        </div>
      </div>

      <section id="comentarios" className="space-y-3">
        <h2 className="text-xl font-bold">Comentarios</h2>
        <ul className="space-y-2">
          {comments.map(c=> (
            <li key={c.id} className="card p-3">
              <p className="text-sm">{c.content}</p>
              <span className="text-xs text-neutral-500">por {c.user_name||'usuario'}</span>
            </li>
          ))}
          {!comments.length && <li className="text-sm text-neutral-600">Sé la primera persona en comentar ✨</li>}
        </ul>
        <form onSubmit={submitComment} className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
          <input value={comment} onChange={e=>setComment(e.target.value)} required className="input" placeholder="Escribe tu comentario"/>
          <button className="btn btn-primary">Enviar</button>
        </form>
      </section>
    </div>
  )
}