"use client"

import { GraduationCap, Briefcase, BookOpen, Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useCart, CartItem } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const mentoringServices = [
  {
    id: 'uni-admissions',
    nameKey: 'mentoring.uni',
    descKey: 'mentoring.uni.desc',
    icon: GraduationCap,
    features: {
      en: ['Personal Statement Review', 'Interview Preparation', 'University Selection Strategy', 'Application Timeline'],
      ge: ['პირადი განცხადების შემოწმება', 'გასაუბრებისთვის მომზადება', 'უნივერსიტეტის შერჩევის სტრატეგია', 'აპლიკაციის ვადები']
    },
    available: true
  },
  {
    id: 'career-planning',
    nameKey: 'mentoring.career',
    descKey: 'mentoring.career.desc',
    icon: Briefcase,
    features: {
      en: ['Career Path Analysis', 'CV & Resume Building', 'Professional Networking', 'Industry Insights'],
      ge: ['კარიერული გზის ანალიზი', 'CV-ს შექმნა', 'პროფესიული ქსელი', 'ინდუსტრიის მიმოხილვა']
    },
    available: true
  },
  {
    id: 'academic-support',
    nameKey: 'mentoring.academic',
    descKey: 'mentoring.academic.desc',
    icon: BookOpen,
    features: {
      en: ['Subject Tutoring', 'Study Skills Development', 'Exam Preparation', 'Academic Writing'],
      ge: ['საგნობრივი ტუტორინგი', 'სწავლის უნარები', 'გამოცდისთვის მომზადება', 'აკადემიური წერა']
    },
    available: false
  }
]

export function MentoringSection() {
  const { t, language } = useLanguage()
  const { addItem, isInCart } = useCart()

  const serviceNames: Record<string, { en: string; ge: string }> = {
    'uni-admissions': { en: 'University Admissions Consulting', ge: 'უნივერსიტეტში მიღების კონსულტაცია' },
    'career-planning': { en: 'Career Planning', ge: 'კარიერის დაგეგმვა' },
    'academic-support': { en: 'Academic Support', ge: 'აკადემიური მხარდაჭერა' }
  }

  const handleAdd = (service: typeof mentoringServices[0]) => {
    const item: CartItem = {
      id: service.id,
      type: 'mentoring',
      name: serviceNames[service.id]?.en || t(service.nameKey),
      nameGe: serviceNames[service.id]?.ge || t(service.nameKey),
      description: t(service.descKey),
      descriptionGe: t(service.descKey)
    }
    addItem(item)
  }

  return (
    <section id="mentoring" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('mentoring.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('mentoring.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentoringServices.map((service) => {
            const Icon = service.icon
            const inCart = isInCart(service.id)

            return (
              <div
                key={service.id}
                className={cn(
                  'relative rounded-3xl overflow-hidden transition-all duration-300 border',
                  service.available
                    ? 'bg-card border-border shadow-lg hover:shadow-xl hover:-translate-y-1'
                    : 'bg-muted/50 border-muted grayscale opacity-75'
                )}
              >
                {/* Availability Badge */}
                <div className={cn(
                  'absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                  service.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                )}>
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    service.available ? 'bg-green-500' : 'bg-gray-400'
                  )} />
                  {service.available ? t('mentoring.available') : t('mentoring.booked')}
                </div>

                {/* Icon Header */}
                <div className="p-8 pb-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                    service.available 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t(service.nameKey)}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t(service.descKey)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features[language].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="px-8 pb-8">
                  {service.available ? (
                    <Button 
                      onClick={() => handleAdd(service)}
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
                          {language === 'ge' ? 'დამატებულია' : 'Added'}
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          {t('mentoring.request')}
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button disabled className="w-full" variant="outline">
                      {t('mentoring.booked')}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
