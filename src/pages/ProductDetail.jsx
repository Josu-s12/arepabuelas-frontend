import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api, endpoints } from '../lib/api'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/Auth'

export default function ProductDetail(){
	const { id } = useParams()
	const [p, setP] = useState(null)
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState('')
	const { add } = useCartStore()
	const { user } = useAuthStore()

	useEffect(()=>{
		if(!id) return
		;(async()=>{
			try{
				const { data } = await api.get(endpoints.productDetail(id))
				setP(data.product)
				setComments(data.comments || [])
			}catch(e){
				console.error(e)
			}
		})()
	},[id])

	const submitComment = async (e)=>{
		e.preventDefault()
		if(!user) return alert('Debes iniciar sesión')
		try{
			const { data } = await api.post(endpoints.productComments(id), { content: comment })
			setComments((c)=>[...c,data])
			setComment('')
		}catch(e){
			console.error(e)
			alert('Error enviando comentario')
		}
	}

	if(!p) return <p>Cargando…</p>

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<img src={p.image_url} className="w-full h-80 object-cover rounded-xl" alt={p.name} />
			<div>
				<h1 className="text-2xl font-bold">{p.name}</h1>
				<p className="mt-2 text-neutral-700">{p.description}</p>
				<p className="mt-4 text-xl font-semibold">${p.price}</p>
				<button onClick={()=>add(p)} className="mt-4 px-4 py-2 rounded bg-black text-white">Agregar al carrito</button>


				<section className="mt-8">
					<h2 className="font-semibold mb-2">Comentarios</h2>
					<ul className="space-y-2">
						{comments.map(c=> (
							<li key={c.id} className="bg-white p-2 rounded border">
								<p className="text-sm">{c.content}</p>
								<span className="text-xs text-neutral-500">por {c.user_name||'usuario'}</span>
							</li>
						))}
					</ul>
					<form onSubmit={submitComment} className="mt-3 flex gap-2">
						<input value={comment} onChange={e=>setComment(e.target.value)} required className="flex-1 border rounded px-2 py-1" placeholder="Escribe tu comentario"/>
						<button className="px-3 py-1 border rounded">Enviar</button>
					</form>
				</section>
			</div>
		</div>
	)
}
