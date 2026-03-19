"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

// Sample blog posts - in production these would come from a CMS or database
const blogPosts = [
  {
    id: '1',
    slug: 'oxford-summer-program-2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/att.k8QthJ1OeUQTlrDmE8kfWRlwZV5te9UG3lXm_-Kmb04-khrV8QqfBqeAISkad8xSugNYL2KKlI.jpeg',
    title: {
      en: 'Oxford Summer Program 2026: Applications Now Open',
      ge: 'ოქსფორდის ზაფხულის პროგრამა 2026: რეგისტრაცია დაიწყო'
    },
    excerpt: {
      en: 'Join us for an unforgettable summer experience at one of the world\'s most prestigious universities.',
      ge: 'შემოუერთდით ჩვენს დაუვიწყარ ზაფხულის გამოცდილებას მსოფლიოს ერთ-ერთ ყველაზე პრესტიჟულ უნივერსიტეტში.'
    },
    date: '2026-03-15',
    readTime: 5
  },
  {
    id: '2',
    slug: 'eu-parliament-visit-success',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic1.jpg-tIq9ivaVMk1v5FDSuCdf3z9IagMNRc.jpeg',
    title: {
      en: 'Our Students Visit European Parliament in Strasbourg',
      ge: 'ჩვენი სტუდენტები ევროპარლამენტს სტრასბურგში ეწვივნენ'
    },
    excerpt: {
      en: 'Georgian delegation experiences firsthand how European democracy works during their educational visit.',
      ge: 'ქართულმა დელეგაციამ პირადად გაეცნო ევროპული დემოკრატიის მუშაობას საგანმანათლებლო ვიზიტის დროს.'
    },
    date: '2026-02-28',
    readTime: 4
  },
  {
    id: '3',
    slug: 'ielts-preparation-tips',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cons1.jpg-KvvU2q0nIf98fNGMWHY3RIg5QcGhX6.jpeg',
    title: {
      en: 'Top 10 IELTS Preparation Tips from Our Experts',
      ge: 'IELTS-ის მომზადების 10 რჩევა ჩვენი ექსპერტებისგან'
    },
    excerpt: {
      en: 'Discover proven strategies to boost your IELTS score and achieve your target band.',
      ge: 'აღმოაჩინეთ დადასტურებული სტრატეგიები თქვენი IELTS ქულის გასაუმჯობესებლად.'
    },
    date: '2026-02-10',
    readTime: 7
  }
]

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  const { language, t } = useLanguage()
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ge' ? 'ka-GE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title[language]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} {language === 'ge' ? 'წთ' : 'min'}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title[language]}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt[language]}
        </p>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
        >
          {t('blog.read')}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  )
}

export function BlogSection() {
  const { t } = useLanguage()

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('blog.subtitle')}
            </p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline" className="mt-4 md:mt-0">
              {t('blog.all')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline">
              {t('blog.all')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
