import { create } from 'zustand'


export const useCartStore = create((set,get)=>({
items: [], // {id, name, price, qty, image_url}
add: (p)=>{
const items = [...get().items]
const idx = items.findIndex(i=>i.id===p.id)
if(idx>-1) items[idx].qty += 1; else items.push({...p, qty:1})
set({items})
},
remove: (id)=> set({ items: get().items.filter(i=>i.id!==id) }),
updateQty: (id, qty)=> set({ items: get().items.map(i=> i.id===id?{...i, qty:Math.max(1,qty)}:i) }),
clear: ()=> set({items:[]}),
total: ()=> get().items.reduce((s,i)=> s + i.price * i.qty, 0)
}))