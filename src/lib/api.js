import axios from 'axios'
import { useUIStore } from '../stores/ui'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  withCredentials: false,
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token){ config.headers.Authorization = `Bearer ${token}` }
  return config
})

// Interceptor de errores: muestra toast bonito en vez de solo console.error
api.interceptors.response.use(
  (res)=>res,
  (err)=>{
    const message = err?.response?.data?.message || err?.message || 'Error inesperado'
    try{ useUIStore.getState().pushToast({ title:'Error', message }) }catch{ /* noop */ }
    return Promise.reject(err)
  }
)

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