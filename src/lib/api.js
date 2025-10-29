import axios from 'axios'


export const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
withCredentials: true,
})


api.interceptors.request.use((config)=>{
const token = localStorage.getItem('token')
if(token){ config.headers.Authorization = `Bearer ${token}` }
return config
})


export const endpoints = {
register: '/auth/register',
login: '/auth/login',
me: '/auth/me',
products: '/products',
product: (id)=>`/products/${id}`,
comments: (id)=>`/products/${id}/comments`,
cart: '/cart', // si deciden backend para carrito
checkout: '/checkout',
orders: '/orders',
}