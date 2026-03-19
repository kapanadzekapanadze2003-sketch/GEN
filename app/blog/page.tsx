"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

const allPosts = [
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
    category: { en: 'Programs', ge: 'პროგრამები' },
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
    category: { en: 'News', ge: 'სიახლეები' },
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
    category: { en: 'Education', ge: 'განათლება' },
    date: '2026-02-10',
    readTime: 7
  },
  {
    id: '4',
    slug: 'vienna-un-visit',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic3.jpg-UcZQw7HN2EUbtQAey1eM1b2cZli0GY.jpeg',
    title: {
      en: 'GEN Students at Vienna International Centre',
      ge: 'GEN სტუდენტები ვენის საერთაშორისო ცენტრში'
    },
    excerpt: {
      en: 'Our Model UN delegates represented Georgia at the Vienna International Centre.',
      ge: 'ჩვენმა Model UN დელეგატებმა წარმოადგინეს საქართველო ვენის საერთაშორისო ცენტრში.'
    },
    category: { en: 'News', ge: 'სიახლეები' },
    date: '2026-01-20',
    readTime: 5
  },
  {
    id: '5',
    slug: 'tv-interview-gen',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic2.jpg-bteEWoSK9Oq5yhF1dfGNbw6wyGdq1m.jpeg',
    title: {
      en: 'GEN Featured on Georgian National Television',
      ge: 'GEN ქართულ ეროვნულ ტელევიზიაში'
    },
    excerpt: {
      en: 'Our team discussed international education opportunities for Georgian students.',
      ge: 'ჩვენმა გუნდმა განიხილა საერთაშორისო საგანმანათლებლო შესაძლებლობები ქართველი სტუდენტებისთვის.'
    },
    category: { en: 'Media', ge: 'მედია' },
    date: '2026-01-05',
    readTime: 3
  }
]

function BlogContent() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { en: 'All', ge: 'ყველა' },
    { en: 'News', ge: 'სიახლეები' },
    { en: 'Programs', ge: 'პროგრამები' },
    { en: 'Education', ge: 'განათლება' },
    { en: 'Media', ge: 'მედია' }
  ]

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                           post.category.en === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ge' ? 'ka-GE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ge' ? 'მთავარი' : 'Home'}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-background border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.en}
                  onClick={() => setSelectedCategory(cat.en === 'All' ? null : cat.en)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    (cat.en === 'All' && !selectedCategory) || selectedCategory === cat.en
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat[language]}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ge' ? 'ძიება...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {language === 'ge' ? 'სტატიები არ მოიძებნა' : 'No articles found'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article 
                key={post.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title[language]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {post.category[language]}
                  </span>
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
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title[language]}
                  </h2>
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  )
}
