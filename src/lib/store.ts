import { create } from 'zustand'
import { items as allItems } from '@/data/items'
import type { Item, SelectedItem } from './types'

type CartState = {
  quantities: Record<string, number>
  setQuantity: (id: string, qty: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
  getSelected: () => SelectedItem[]
  getSubtotal: () => number
}

export const useCart = create<CartState>((set, get) => ({
  quantities: {},
  setQuantity: (id, qty) => set((s) => ({ quantities: { ...s.quantities, [id]: Math.max(0, Math.floor(qty || 0)) } })),
  increment: (id) => set((s) => ({ quantities: { ...s.quantities, [id]: (s.quantities[id] || 0) + 1 } })),
  decrement: (id) => set((s) => ({ quantities: { ...s.quantities, [id]: Math.max(0, (s.quantities[id] || 0) - 1) } })),
  clear: () => set({ quantities: {} }),
  getSelected: () => {
    const q = get().quantities
    return Object.entries(q)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ item: allItems.find((i) => i.id === id)! as Item, quantity: qty }))
      .filter((x) => !!x.item)
  },
  getSubtotal: () => {
    return get()
      .getSelected()
      .reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
  },
}))
