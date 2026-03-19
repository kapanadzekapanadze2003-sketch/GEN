"use client"

import { LanguageProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ProgramsSection } from '@/components/programs-section'
import { MentoringSection } from '@/components/mentoring-section'
import { LanguagesSection } from '@/components/languages-section'
import { BlogSection } from '@/components/blog-section'
import { GallerySection } from '@/components/gallery-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <main className="min-h-screen">
          <Header />
          <HeroSection />
          <ProgramsSection />
          <MentoringSection />
          <LanguagesSection />
          <BlogSection />
          <GallerySection />
          <Footer />
        </main>
      </CartProvider>
    </LanguageProvider>
  )
}
