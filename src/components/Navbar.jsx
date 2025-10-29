import { Link, NavLink } from 'react-router-dom'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/Auth'


export default function Navbar(){
const items = useCartStore(s=>s.items)
const { user, logout } = useAuthStore()
return (
<nav className="w-full bg-white border-b sticky top-0 z-10">
<div className="container mx-auto flex items-center justify-between p-3">
<Link to="/" className="font-bold text-lg">Arepabuelas</Link>
<div className="flex items-center gap-4">
<NavLink to="/" className={({isActive})=> isActive? 'font-semibold' : ''}>Productos</NavLink>
{user && <NavLink to="/orders">Mis compras</NavLink>}
<NavLink to="/cart">Carrito ({items.length})</NavLink>
{!user ? (
<>
<NavLink to="/login">Ingresar</NavLink>
<NavLink to="/register">Registro</NavLink>
</>
) : (
<button onClick={logout} className="px-3 py-1 rounded border">Salir</button>
)}
</div>
</div>
</nav>
)
}