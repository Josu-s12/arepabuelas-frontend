import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/Auth'


export default function Login(){
const { login, loading } = useAuthStore()
const { register, handleSubmit } = useForm()


const onSubmit = async ({email,password})=>{
const res = await login(email,password)
if(res.ok){ window.location.href='/' } else alert(res.error)
}


return (
<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-4 rounded-xl border space-y-3">
<h1 className="text-xl font-bold">Ingresar</h1>
<input {...register('email',{required:true})} type="email" placeholder="Correo" className="w-full border rounded px-3 py-2" />
<input {...register('password',{required:true})} type="password" placeholder="Contraseña" className="w-full border rounded px-3 py-2" />
<button disabled={loading} className="w-full px-4 py-2 rounded bg-black text-white">{loading? 'Ingresando…':'Ingresar'}</button>
</form>
)
}