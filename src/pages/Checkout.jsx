import { useCartStore } from '../stores/cart'
import { useForm } from 'react-hook-form'
import { api, endpoints } from '../lib/api'


export default function Checkout(){
const { items, total, clear } = useCartStore()
const { register, handleSubmit } = useForm()


const onSubmit = async (values)=>{
// Enviar solo datos simulados, el backend generará un token y NO guardará PAN
const payload = { items, payment: values, applyWelcomeCoupon: true }
const { data } = await api.post(endpoints.checkout, payload)
alert(`Orden confirmada #${data.orderId}`)
clear(); window.location.href='/orders'
}


if(items.length===0) return <p>No hay items en el carrito.</p>


return (
<form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-4 rounded-xl border space-y-3">
<h1 className="text-xl font-bold">Pago simulado</h1>
<input {...register('card_name',{required:true})} placeholder="Nombre en la tarjeta" className="w-full border rounded px-3 py-2"/>
<input {...register('card_number',{required:true})} placeholder="Número (ficticio)" className="w-full border rounded px-3 py-2"/>
<div className="grid grid-cols-2 gap-3">
<input {...register('exp',{required:true})} placeholder="MM/YY" className="w-full border rounded px-3 py-2"/>
<input {...register('cvv',{required:true})} placeholder="CVV" className="w-full border rounded px-3 py-2"/>
</div>
<p className="font-semibold">Total: ${total()}</p>
<button className="w-full px-4 py-2 rounded bg-black text-white">Pagar</button>
<p className="text-xs text-neutral-500">*Simulación. No uses tarjetas reales.</p>
</form>
)
}