import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import { useAuthStore } from './stores/Auth'


export default function App(){
const { user } = useAuthStore()
return (
<div className="min-h-screen bg-neutral-50 text-neutral-900">
<Navbar />
<div className="container mx-auto p-4">
<Routes>
<Route path="/" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
<Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
<Route path="*" element={<Navigate to="/" />} />
</Routes>
</div>
</div>
)
}