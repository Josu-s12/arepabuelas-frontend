import { useCartStore } from '../stores/cart'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { items, updateQty, remove, total } = useCartStore()

  if(items.length===0) return (
    <div className="text-center card p-10">
      <p className="text-neutral-700">Tu carrito está vacío.</p>
      <Link to="/" className="btn btn-primary mt-3">Ir a productos</Link>
    </div>
  )

  return (
    <div className="space-y-4">
      {items.map(i=> (
        <div key={i.id} className="card p-3 flex items-center gap-3">
          <img src={i.image_url} className="w-20 h-20 object-cover rounded-xl border"/>
          <div className="flex-1">
            <p className="font-semibold">{i.name}</p>
            <p className="text-sm text-neutral-600">${i.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>updateQty(i.id, i.qty-1)} className="btn">−</button>
            <input type="number" min="1" value={i.qty} onChange={e=>updateQty(i.id, Number(e.target.value)||1)} className="w-16 input text-center"/>
            <button onClick={()=>updateQty(i.id, i.qty+1)} className="btn">+</button>
          </div>
          <button onClick={()=>remove(i.id)} className="btn btn-ghost">Quitar</button>
        </div>
      ))}
      <div className="card p-4 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${total()}</p>
        <Link to="/checkout" className="btn btn-primary">Continuar al pago</Link>
      </div>
    </div>
  )
}