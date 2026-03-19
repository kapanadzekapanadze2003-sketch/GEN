"use client"

import { useState } from 'react'
import { X, ShoppingCart, Trash2, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, clearCart } = useCart()
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            nameGe: item.nameGe,
            type: item.type
          })),
          language
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        clearCart()
        setFormData({ name: '', email: '', phone: '' })
        setTimeout(() => {
          setIsSubmitted(false)
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error('Order submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="font-semibold text-lg">
                {t('cart.title')} ({items.length})
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {isSubmitted ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('cart.success')}</h3>
                <p className="text-muted-foreground">{t('cart.success.desc')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    {t('cart.empty')}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map(item => (
                      <div 
                        key={item.id}
                        className="flex items-start justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex-1">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">
                            {item.type === 'program' ? t('cart.program') : 
                             item.type === 'course' ? t('cart.course') : t('cart.mentoring')}
                          </span>
                          <h4 className="font-medium">
                            {language === 'ge' ? item.nameGe : item.name}
                          </h4>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {t('cart.form.name')} *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t('cart.form.name.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {t('cart.form.email')} *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={t('cart.form.email.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {t('cart.form.phone')} *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder={t('cart.form.phone.placeholder')}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('cart.form.note')}
                    </p>
                    <Button 
                      type="submit" 
                      className="w-full bg-secondary hover:bg-secondary/90"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? t('cart.submitting') : t('cart.submit')}
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
