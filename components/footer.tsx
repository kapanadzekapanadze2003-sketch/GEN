"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-QGB6SjWA8SnyBBQHRNLxl3GErAbKl2.jpeg"
              alt="GEN Logo"
              width={120}
              height={48}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-background/70 text-sm leading-relaxed">
              Global Education Network - Oxford's first and only official representative in Georgia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#programs" className="text-background/70 hover:text-background transition-colors text-sm">
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link href="#mentoring" className="text-background/70 hover:text-background transition-colors text-sm">
                  {t('nav.mentoring')}
                </Link>
              </li>
              <li>
                <Link href="#languages" className="text-background/70 hover:text-background transition-colors text-sm">
                  {t('nav.languages')}
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-background/70 hover:text-background transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-background/70 hover:text-background transition-colors text-sm">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Tbilisi, Georgia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+995 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@gen.ge</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Global Education Network. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/admin" className="text-sm text-background/60 hover:text-background transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
