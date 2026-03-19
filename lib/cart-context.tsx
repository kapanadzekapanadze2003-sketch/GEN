"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  type: 'program' | 'course' | 'mentoring'
  name: string
  nameGe: string
  description?: string
  descriptionGe?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const isInCart = (id: string) => {
    return items.some(item => item.id === id)
  }

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      clearCart, 
      isInCart,
      itemCount: items.length 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
