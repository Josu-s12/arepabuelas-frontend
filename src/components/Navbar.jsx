import { Link, NavLink } from 'react-router-dom'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default function Navbar(){
const items = useCartStore(s=>s.items)
const { user, logout } = useAuthStore()
const cartCount = items.reduce((s,i)=>s+i.qty,0)
return (
    <header className="sticky top-0 z-20 bg-gradient-to-b from-red-700 to-red-600 text-white shadow">
    <div className="container mx-auto flex items-center justify-between p-3">
        <Link to="/" className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/20">🥙</span>
        <span className="font-extrabold text-xl tracking-tight">Arepabuelas</span>
        </Link>
        <nav className="flex items-center gap-5">
        <NavLink to="/" className={({isActive})=> `nav-link ${isActive? 'text-white underline underline-offset-4' : 'text-white/90 hover:text-white'}`}>Productos</NavLink>
        {user && <NavLink to="/orders" className="nav-link text-white/90 hover:text-white">Mis compras</NavLink>}
        <NavLink to="/cart" className={({isActive})=> `nav-link ${isActive? 'text-white underline underline-offset-4' : 'text-white/90 hover:text-white'}`}>
        Carrito
            {cartCount>0 && (
            <span className="absolute -top-2 -right-3 badge bg-white text-red-700 border border-red-300">{cartCount}</span>
            )}
        </NavLink>
        {!user ? (
            <div className="flex items-center gap-2">
            <NavLink to="/login" className="btn btn-primary">Ingresar</NavLink>
            <NavLink to="/register" className="btn btn-primary">Registro</NavLink>
            </div>
        ) : (
            <button onClick={logout} className="btn bg-white text-red-700 hover:bg-red-50 border-white">Salir</button>
        )}
        </nav>
    </div>
    <div className="bg-red-50 text-red-700/90">
        <div className="container mx-auto px-4 py-2 text-sm">🍯 Sabor casero, seguridad de clase mundial — e‑commerce en pruebas.</div>
    </div>
    </header>
)
}