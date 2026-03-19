"use client"

import { useState } from 'react'
import { BookOpen, Award, Briefcase, Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useCart, CartItem } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

interface Course {
  id: string
  nameKey: string
  descKey: string
  icon: React.ReactNode
  levels: string[]
  featured?: boolean
}

const englishCourses: Course[] = [
  {
    id: 'general-english',
    nameKey: 'language.general',
    descKey: 'language.general.desc',
    icon: <BookOpen className="w-6 h-6" />,
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    featured: true
  },
  {
    id: 'ielts-prep',
    nameKey: 'language.ielts',
    descKey: 'language.ielts.desc',
    icon: <Award className="w-6 h-6" />,
    levels: ['5.5', '6.0', '6.5', '7.0', '7.5+'],
    featured: true
  },
  {
    id: 'business-english',
    nameKey: 'language.business',
    descKey: 'language.business.desc',
    icon: <Briefcase className="w-6 h-6" />,
    levels: ['B1', 'B2', 'C1'],
    featured: true
  }
]

const otherLanguages: Course[] = [
  {
    id: 'german',
    nameKey: 'language.german',
    descKey: 'language.german.desc',
    icon: <span className="text-xl font-bold">DE</span>,
    levels: ['A1', 'A2', 'B1', 'B2', 'C1']
  },
  {
    id: 'french',
    nameKey: 'language.french',
    descKey: 'language.french.desc',
    icon: <span className="text-xl font-bold">FR</span>,
    levels: ['A1', 'A2', 'B1', 'B2', 'C1']
  },
  {
    id: 'spanish',
    nameKey: 'language.spanish',
    descKey: 'language.spanish.desc',
    icon: <span className="text-xl font-bold">ES</span>,
    levels: ['A1', 'A2', 'B1', 'B2']
  }
]

function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const { t, language } = useLanguage()
  const { addItem, isInCart } = useCart()
  const inCart = isInCart(course.id)

  const courseNames: Record<string, { en: string; ge: string }> = {
    'general-english': { en: 'General English', ge: 'ზოგადი ინგლისური' },
    'ielts-prep': { en: 'IELTS Preparation', ge: 'IELTS მომზადება' },
    'business-english': { en: 'Business English', ge: 'ბიზნეს ინგლისური' },
    'german': { en: 'German', ge: 'გერმანული' },
    'french': { en: 'French', ge: 'ფრანგული' },
    'spanish': { en: 'Spanish', ge: 'ესპანური' }
  }

  const handleAdd = () => {
    const item: CartItem = {
      id: course.id,
      type: 'course',
      name: courseNames[course.id]?.en || t(course.nameKey),
      nameGe: courseNames[course.id]?.ge || t(course.nameKey),
      description: t(course.descKey),
      descriptionGe: t(course.descKey)
    }
    addItem(item)
  }

  return (
    <div 
      className={cn(
        "group relative bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        featured && "border-primary/30 bg-primary/5"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full">
          {language === 'ge' ? 'პოპულარული' : 'Popular'}
        </div>
      )}
      
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
        featured ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      )}>
        {course.icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">{t(course.nameKey)}</h3>
      <p className="text-muted-foreground mb-4">{t(course.descKey)}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {course.levels.map(level => (
          <span 
            key={level}
            className="text-xs px-2 py-1 bg-muted rounded-md font-medium"
          >
            {level}
          </span>
        ))}
      </div>

      <Button
        onClick={handleAdd}
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
            {t('language.register')}
          </>
        )}
      </Button>
    </div>
  )
}

export function LanguagesSection() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'english' | 'other'>('english')

  return (
    <section id="languages" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('language.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('language.subtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-full p-1">
            <button
              onClick={() => setActiveTab('english')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === 'english' 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {language === 'ge' ? 'ინგლისურის კურსები' : 'English Courses'}
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === 'other' 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {language === 'ge' ? 'სხვა ენები' : 'Other Languages'}
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'english' 
            ? englishCourses.map(course => (
                <CourseCard key={course.id} course={course} featured={course.featured} />
              ))
            : otherLanguages.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
          }
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {language === 'ge' 
              ? 'არ იცი რომელი კურსი შეგეფერება?' 
              : 'Not sure which course is right for you?'}
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            {language === 'ge'
              ? 'დაგვიკავშირდი უფასო კონსულტაციისთვის და ჩვენი სპეციალისტები დაგეხმარებიან სწორი კურსის არჩევაში.'
              : 'Contact us for a free consultation and our specialists will help you choose the right course.'}
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {language === 'ge' ? 'უფასო კონსულტაცია' : 'Free Consultation'}
          </Button>
        </div>
      </div>
    </section>
  )
}
