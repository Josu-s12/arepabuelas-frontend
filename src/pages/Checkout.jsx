import { useCartStore } from '../stores/cart'
import { useForm } from 'react-hook-form'
import { api, endpoints } from '../lib/api'
import { useAuthStore } from '../stores/auth'

export default function Checkout(){
  const { items, total, clear } = useCartStore()
  const { user } = useAuthStore()
  const { register, handleSubmit, formState:{isSubmitting} } = useForm()

  const onSubmit = async (values)=>{
    if(!user) return alert('Debes iniciar sesión')
    if(!user?.validated) return alert('Tu cuenta está pendiente de validación por el administrador.')
    const payload = { items, payment: values, applyWelcomeCoupon: true }
    const { data } = await api.post(endpoints.checkout, payload)
    alert(`Orden confirmada #${data.orderId}`)
    clear(); window.location.href='/orders'
  }

  if(items.length===0) return <p>No hay items en el carrito.</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto card p-5 space-y-3">
      <h1 className="text-2xl font-extrabold">Pago simulado</h1>
      <div>
        <label className="label">Nombre en la tarjeta</label>
        <input {...register('card_name',{required:true})} className="input" placeholder="María P. Abuela"/>
      </div>
      <div>
        <label className="label">Número (ficticio)</label>
        <input {...register('card_number',{required:true})} className="input" placeholder="4111 1111 1111 1111"/>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Vencimiento</label>
          <input {...register('exp',{required:true})} className="input" placeholder="MM/YY"/>
        </div>
        <div>
          <label className="label">CVV</label>
          <input {...register('cvv',{required:true})} className="input" placeholder="123"/>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="price text-xl">Total: ${total()}</p>
        <button disabled={isSubmitting} className="btn btn-primary min-w-[160px]">{isSubmitting? 'Procesando…':'Pagar'}</button>
      </div>
      <p className="text-xs text-neutral-500">*Simulación. No uses tarjetas reales.</p>
    </form>
  )
}
