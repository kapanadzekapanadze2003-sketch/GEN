"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { Target, Globe, BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const heroImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-bg.jpg-mDJYMiqh4KQxh0dRd9Z4tWxFp2yHIx.jpeg',
    alt: 'Students at Big Ben, London'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic1.jpg-tIq9ivaVMk1v5FDSuCdf3z9IagMNRc.jpeg',
    alt: 'Students at European Parliament'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic3.jpg-UcZQw7HN2EUbtQAey1eM1b2cZli0GY.jpeg',
    alt: 'Students at Vienna International Centre'
  }
]

export function HeroSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const overlayBlocks = [
    {
      icon: Target,
      titleKey: 'overlay.mission',
      descKey: 'overlay.mission.desc',
      href: '#about'
    },
    {
      icon: Globe,
      titleKey: 'overlay.programs',
      descKey: 'overlay.programs.desc',
      href: '#programs'
    },
    {
      icon: BookOpen,
      titleKey: 'overlay.languages',
      descKey: 'overlay.languages.desc',
      href: '#languages'
    }
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 text-balance">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 text-pretty">
            {t('hero.subtitle')}
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full"
          >
            {t('hero.cta')}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Overlay Interactive Blocks */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {overlayBlocks.map((block) => {
            const Icon = block.icon
            return (
              <a
                key={block.titleKey}
                href={block.href}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {t(block.titleKey)}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {t(block.descKey)}
                    </p>
                  </div>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            )
          })}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </section>
  )
}
