"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useCart, CartItem } from '@/lib/cart-context'
import { Plus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const programs = [
  {
    id: 'uk-programs',
    titleKey: 'programs.uk',
    descKey: 'programs.uk.desc',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-bg.jpg-mDJYMiqh4KQxh0dRd9Z4tWxFp2yHIx.jpeg',
    flag: '🇬🇧',
    name: { en: 'UK Programs', ge: 'გაერთიანებული სამეფოს პროგრამები' }
  },
  {
    id: 'usa-programs',
    titleKey: 'programs.usa',
    descKey: 'programs.usa.desc',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic1.jpg-tIq9ivaVMk1v5FDSuCdf3z9IagMNRc.jpeg',
    flag: '🇺🇸',
    name: { en: 'USA Programs', ge: 'ამერიკის პროგრამები' }
  },
  {
    id: 'europe-programs',
    titleKey: 'programs.europe',
    descKey: 'programs.europe.desc',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic3.jpg-UcZQw7HN2EUbtQAey1eM1b2cZli0GY.jpeg',
    flag: '🇪🇺',
    name: { en: 'European Programs', ge: 'ევროპული პროგრამები' }
  },
  {
    id: 'asia-programs',
    titleKey: 'programs.asia',
    descKey: 'programs.asia.desc',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/att.XDwMfGQrdKtsEjAJOvNkkLYRhvCI4Hx9gAv1Cky1Y3A-jk3QaSJfc0VrI642vLAb7aFVJwHjlG.jpeg',
    flag: '🌏',
    name: { en: 'Asian Programs', ge: 'აზიის პროგრამები' }
  }
]

export function ProgramsSection() {
  const { t, language } = useLanguage()
  const { addItem, isInCart } = useCart()

  const handleAdd = (program: typeof programs[0]) => {
    const item: CartItem = {
      id: program.id,
      type: 'program',
      name: program.name.en,
      nameGe: program.name.ge,
      description: t(program.descKey),
      descriptionGe: t(program.descKey)
    }
    addItem(item)
  }

  return (
    <section id="programs" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => {
            const inCart = isInCart(program.id)
            
            return (
              <div
                key={program.id}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={t(program.titleKey)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  
                  {/* Flag Badge */}
                  <div className="absolute top-4 left-4 text-3xl">
                    {program.flag}
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 -mt-12">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t(program.titleKey)}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t(program.descKey)}
                    </p>
                    <Button 
                      onClick={() => handleAdd(program)}
                      disabled={inCart}
                      className={cn(
                        "w-full",
                        inCart 
                          ? "bg-green-600 hover:bg-green-600" 
                          : "bg-primary hover:bg-primary/90"
                      )}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          {t('programs.added')}
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          {t('programs.add')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
