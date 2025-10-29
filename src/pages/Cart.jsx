import { useCartStore } from '../stores/cart'
import { Link } from 'react-router-dom'


export default function Cart(){
const { items, updateQty, remove, total } = useCartStore()


if(items.length===0) return (
<div className="text-center">
<p>Tu carrito está vacío.</p>
<Link to="/" className="underline">Ir a productos</Link>
</div>
)


return (
<div className="space-y-3">
{items.map(i=> (
<div key={i.id} className="bg-white p-3 rounded border flex items-center gap-3">
<img src={i.image_url} className="w-16 h-16 object-cover rounded"/>
<div className="flex-1">
<p className="font-medium">{i.name}</p>
<p>${i.price}</p>
</div>
<input type="number" min="1" value={i.qty} onChange={e=>updateQty(i.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1"/>
<button onClick={()=>remove(i.id)} className="px-3 py-1 border rounded">Quitar</button>
</div>
))}
<div className="flex items-center justify-between">
<p className="text-xl font-bold">Total: ${total()}</p>
<Link to="/checkout" className="px-4 py-2 rounded bg-black text-white">Continuar al pago</Link>
</div>
</div>
)
}