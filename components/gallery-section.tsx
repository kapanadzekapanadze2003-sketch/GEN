"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cons1.jpg-KvvU2q0nIf98fNGMWHY3RIg5QcGhX6.jpeg',
    alt: 'UN Conference Room Session',
    span: 'col-span-2 row-span-2'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cons2.jpg-5i8MWfUVPEMVjHbw9LhBM5ju5LRiRl.jpeg',
    alt: 'Modern Conference Hall',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/att.k8QthJ1OeUQTlrDmE8kfWRlwZV5te9UG3lXm_-Kmb04-khrV8QqfBqeAISkad8xSugNYL2KKlI.jpeg',
    alt: 'Oxford Students with Georgian Flag',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic1.jpg-tIq9ivaVMk1v5FDSuCdf3z9IagMNRc.jpeg',
    alt: 'Students at European Parliament',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/att.XDwMfGQrdKtsEjAJOvNkkLYRhvCI4Hx9gAv1Cky1Y3A-jk3QaSJfc0VrI642vLAb7aFVJwHjlG.jpeg',
    alt: 'Immersive Exhibition Experience',
    span: 'col-span-2 row-span-1'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic2.jpg-bteEWoSK9Oq5yhF1dfGNbw6wyGdq1m.jpeg',
    alt: 'TV Studio Appearance',
    span: 'col-span-1 row-span-1'
  }
]

export function GallerySection() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative overflow-hidden rounded-2xl cursor-pointer group',
                image.span
              )}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={selectedImage}
              alt="Gallery Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
