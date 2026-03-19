"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'nav.home', href: '#hero' },
    { key: 'nav.programs', href: '#programs' },
    { key: 'nav.mentoring', href: '#mentoring' },
    { key: 'nav.languages', href: '#languages' },
    { key: 'nav.blog', href: '#blog' },
    { key: 'nav.contact', href: '#contact' },
  ]

  const scrollToApply = () => {
    document.getElementById('languages')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-QGB6SjWA8SnyBBQHRNLxl3GErAbKl2.jpeg"
                alt="GEN - Global Education Network"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isScrolled ? 'text-foreground' : 'text-white'
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Language Switch, Cart & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ge' : 'en')}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border',
                  isScrolled
                    ? 'border-border text-foreground hover:bg-muted'
                    : 'border-white/30 text-white hover:bg-white/10'
                )}
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'GE' : 'EN'}
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className={cn(
                  'relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border',
                  isScrolled
                    ? 'border-border text-foreground hover:bg-muted'
                    : 'border-white/30 text-white hover:bg-white/10'
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <Button 
                onClick={scrollToApply}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {t('nav.apply')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className={cn(
                  'relative p-2 rounded-lg transition-colors',
                  isScrolled ? 'text-foreground' : 'text-white'
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isScrolled ? 'text-foreground' : 'text-white'
                )}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t mt-2">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'ge' : 'en')}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium"
                >
                  <Globe className="h-4 w-4" />
                  {language === 'en' ? 'ქართული' : 'English'}
                </button>
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    scrollToApply()
                  }}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  {t('nav.apply')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
