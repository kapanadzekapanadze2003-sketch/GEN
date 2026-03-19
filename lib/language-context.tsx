"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'ge'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.mentoring': 'Mentoring',
    'nav.languages': 'Language Courses',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.apply': 'Apply Now',
    
    // Hero
    'hero.title': 'Global Education Network',
    'hero.subtitle': "Oxford's first and only official representative in Georgia",
    'hero.cta': 'Start Your Journey',
    
    // Overlay blocks
    'overlay.mission': 'Our Mission',
    'overlay.mission.desc': 'Empowering future global leaders',
    'overlay.programs': 'International Programs',
    'overlay.programs.desc': 'Study abroad opportunities',
    'overlay.languages': 'Language Academy',
    'overlay.languages.desc': 'Master new languages',
    
    // Programs section
    'programs.title': 'International Programs',
    'programs.subtitle': 'Explore educational opportunities across the globe',
    'programs.uk': 'United Kingdom',
    'programs.uk.desc': 'Oxford, Cambridge, and prestigious UK institutions',
    'programs.usa': 'United States',
    'programs.usa.desc': 'Ivy League and top American universities',
    'programs.europe': 'Europe',
    'programs.europe.desc': 'EU institutions and European programs',
    'programs.asia': 'Asia',
    'programs.asia.desc': 'Emerging educational hubs in Asia',
    'programs.explore': 'Explore Programs',
    'programs.add': 'Add to Cart',
    'programs.added': 'Added',
    
    // Mentoring section
    'mentoring.title': 'Academic Mentoring',
    'mentoring.subtitle': 'University Admissions Strategy & Academic Guidance',
    'mentoring.available': 'Available',
    'mentoring.booked': 'Fully Booked',
    'mentoring.request': 'Request Consultation',
    'mentoring.uni': 'University Admissions',
    'mentoring.uni.desc': 'Strategic guidance for top university applications worldwide',
    'mentoring.career': 'Career Planning',
    'mentoring.career.desc': 'Professional development and career path consulting',
    'mentoring.academic': 'Academic Support',
    'mentoring.academic.desc': 'Tutoring and academic excellence coaching',
    
    // Language section
    'language.title': 'Language Courses',
    'language.subtitle': 'Master languages with our expert instructors',
    'language.general': 'General English',
    'language.general.desc': 'Comprehensive English for all levels',
    'language.ielts': 'IELTS Preparation',
    'language.ielts.desc': 'Intensive exam preparation course',
    'language.business': 'Business English',
    'language.business.desc': 'Professional communication skills',
    'language.german': 'German',
    'language.german.desc': 'From beginner to advanced',
    'language.french': 'French',
    'language.french.desc': 'From beginner to advanced',
    'language.spanish': 'Spanish',
    'language.spanish.desc': 'From beginner to advanced',
    'language.register': 'Register Now',
    'language.levels': 'All levels',
    
    // Blog section
    'blog.title': 'News & Articles',
    'blog.subtitle': 'Latest updates from Global Education Network',
    'blog.read': 'Read More',
    'blog.all': 'View All Articles',
    
    // Gallery
    'gallery.title': 'Our Students in Action',
    'gallery.subtitle': 'Moments from our international programs',
    
    // Cart
    'cart.title': 'Your Selection',
    'cart.empty': 'Your cart is empty',
    'cart.program': 'Program',
    'cart.course': 'Course',
    'cart.mentoring': 'Mentoring',
    'cart.form.name': 'Full Name',
    'cart.form.name.placeholder': 'Enter your full name',
    'cart.form.email': 'Email',
    'cart.form.email.placeholder': 'your@email.com',
    'cart.form.phone': 'Phone Number',
    'cart.form.phone.placeholder': '+995 XXX XXX XXX',
    'cart.form.note': 'We will contact you within 24 hours to discuss details and pricing.',
    'cart.submit': 'Submit Request',
    'cart.submitting': 'Submitting...',
    'cart.success': 'Request Submitted!',
    'cart.success.desc': 'We will contact you shortly to discuss the details.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.address': 'Tbilisi, Georgia',
  },
  ge: {
    // Navigation
    'nav.home': 'მთავარი',
    'nav.programs': 'პროგრამები',
    'nav.mentoring': 'მენტორინგი',
    'nav.languages': 'ენის კურსები',
    'nav.blog': 'ბლოგი',
    'nav.about': 'ჩვენ შესახებ',
    'nav.contact': 'კონტაქტი',
    'nav.apply': 'რეგისტრაცია',
    
    // Hero
    'hero.title': 'გლობალური განათლების ქსელი',
    'hero.subtitle': 'ოქსფორდის პირველი და ერთადერთი ოფიციალური წარმომადგენელი საქართველოში',
    'hero.cta': 'დაიწყე მოგზაურობა',
    
    // Overlay blocks
    'overlay.mission': 'ჩვენი მისია',
    'overlay.mission.desc': 'მომავალი გლობალური ლიდერების განვითარება',
    'overlay.programs': 'საერთაშორისო პროგრამები',
    'overlay.programs.desc': 'საზღვარგარეთ სწავლის შესაძლებლობები',
    'overlay.languages': 'ენობრივი აკადემია',
    'overlay.languages.desc': 'დაეუფლე ახალ ენებს',
    
    // Programs section
    'programs.title': 'საერთაშორისო პროგრამები',
    'programs.subtitle': 'აღმოაჩინე საგანმანათლებლო შესაძლებლობები მსოფლიოს მასშტაბით',
    'programs.uk': 'გაერთიანებული სამეფო',
    'programs.uk.desc': 'ოქსფორდი, კემბრიჯი და პრესტიჟული ბრიტანული ინსტიტუტები',
    'programs.usa': 'ამერიკის შეერთებული შტატები',
    'programs.usa.desc': 'Ivy League და წამყვანი ამერიკული უნივერსიტეტები',
    'programs.europe': 'ევროპა',
    'programs.europe.desc': 'ევროკავშირის ინსტიტუტები და ევროპული პროგრამები',
    'programs.asia': 'აზია',
    'programs.asia.desc': 'განვითარებადი საგანმანათლებლო ცენტრები აზიაში',
    'programs.explore': 'პროგრამების ნახვა',
    'programs.add': 'კალათაში დამატება',
    'programs.added': 'დამატებულია',
    
    // Mentoring section
    'mentoring.title': 'აკადემიური მენტორინგი',
    'mentoring.subtitle': 'უნივერსიტეტში ჩაბარების სტრატეგია და აკადემიური გზამკვლევი',
    'mentoring.available': 'ხელმისაწვდომი',
    'mentoring.booked': 'ადგილები შევსებულია',
    'mentoring.request': 'კონსულტაციის მოთხოვნა',
    'mentoring.uni': 'უნივერსიტეტში მიღება',
    'mentoring.uni.desc': 'სტრატეგიული გზამკვლევი მსოფლიოს წამყვან უნივერსიტეტებში მიღებისთვის',
    'mentoring.career': 'კარიერის დაგეგმვა',
    'mentoring.career.desc': 'პროფესიული განვითარება და კარიერული კონსულტაცია',
    'mentoring.academic': 'აკადემიური მხარდაჭერა',
    'mentoring.academic.desc': 'ტუტორინგი და აკადემიური წარმატების კოუჩინგი',
    
    // Language section
    'language.title': 'ენის კურსები',
    'language.subtitle': 'დაეუფლე ენებს ჩვენ ექსპერტ ინსტრუქტორებთან ერთად',
    'language.general': 'ზოგადი ინგლისური',
    'language.general.desc': 'კომპლექსური ინგლისური ყველა დონისთვის',
    'language.ielts': 'IELTS მომზადება',
    'language.ielts.desc': 'ინტენსიური გამოცდისთვის მომზადების კურსი',
    'language.business': 'ბიზნეს ინგლისური',
    'language.business.desc': 'პროფესიული კომუნიკაციის უნარები',
    'language.german': 'გერმანული',
    'language.german.desc': 'დამწყებიდან მოწინავემდე',
    'language.french': 'ფრანგული',
    'language.french.desc': 'დამწყებიდან მოწინავემდე',
    'language.spanish': 'ესპანური',
    'language.spanish.desc': 'დამწყებიდან მოწინავემდე',
    'language.register': 'დარეგისტრირდი',
    'language.levels': 'ყველა დონე',
    
    // Blog section
    'blog.title': 'სიახლეები და სტატიები',
    'blog.subtitle': 'უახლესი ინფორმაცია გლობალური განათლების ქსელიდან',
    'blog.read': 'წაიკითხე მეტი',
    'blog.all': 'ყველა სტატიის ნახვა',
    
    // Gallery
    'gallery.title': 'ჩვენი სტუდენტები მოქმედებაში',
    'gallery.subtitle': 'მომენტები ჩვენი საერთაშორისო პროგრამებიდან',
    
    // Cart
    'cart.title': 'თქვენი არჩევანი',
    'cart.empty': 'კალათა ცარიელია',
    'cart.program': 'პროგრამა',
    'cart.course': 'კურსი',
    'cart.mentoring': 'მენტორინგი',
    'cart.form.name': 'სახელი და გვარი',
    'cart.form.name.placeholder': 'შეიყვანეთ სახელი და გვარი',
    'cart.form.email': 'ელ. ფოსტა',
    'cart.form.email.placeholder': 'your@email.com',
    'cart.form.phone': 'ტელეფონის ნომერი',
    'cart.form.phone.placeholder': '+995 XXX XXX XXX',
    'cart.form.note': 'ჩვენ დაგიკავშირდებით 24 საათის განმავლობაში დეტალების და ფასების განსახილველად.',
    'cart.submit': 'მოთხოვნის გაგზავნა',
    'cart.submitting': 'იგზავნება...',
    'cart.success': 'მოთხოვნა გაიგზავნა!',
    'cart.success.desc': 'მალე დაგიკავშირდებით დეტალების განსახილველად.',
    
    // Footer
    'footer.rights': 'ყველა უფლება დაცულია',
    'footer.privacy': 'კონფიდენციალურობის პოლიტიკა',
    'footer.terms': 'მომსახურების პირობები',
    'footer.address': 'თბილისი, საქართველო',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
