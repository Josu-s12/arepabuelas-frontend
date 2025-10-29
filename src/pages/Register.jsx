import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/Auth'


export default function Register(){
const { register:registerUser, loading } = useAuthStore()
const { register, handleSubmit } = useForm()


const onSubmit = async (values)=>{
const res = await registerUser(values)
if(res.ok){ alert('Registro enviado. Espera validación del admin.'); window.location.href='/login' }
else alert(res.error)
}


return (
<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-4 rounded-xl border space-y-3">
<h1 className="text-xl font-bold">Crear cuenta</h1>
<input {...register('name',{required:true})} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
<input {...register('email',{required:true})} type="email" placeholder="Correo" className="w-full border rounded px-3 py-2" />
<input {...register('password',{required:true})} type="password" placeholder="Contraseña" className="w-full border rounded px-3 py-2" />
<input {...register('photo',{required:true})} type="file" accept="image/*" className="w-full" />
<button disabled={loading} className="w-full px-4 py-2 rounded bg-black text-white">{loading? 'Enviando…':'Registrarme'}</button>
</form>
)
}