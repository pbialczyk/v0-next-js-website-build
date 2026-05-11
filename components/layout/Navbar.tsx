'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, Globe } from 'lucide-react';
import { Logo } from '@/components/Logo';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';

interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const pathname = usePathname();

  const t = dict;
  const prefix = locale === 'en' ? '/en' : '';

  const localePath = (path: string) => `${prefix}${path}`;

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.boksy, href: '/boksy' },
    { label: t.nav.lokalizacje, href: '/lokalizacje' },
    {
      label: t.nav.dlaKogo,
      href: '/dla-klientow-indywidualnych',
      children: [
        { label: t.nav.klientIndywidualny, href: '/dla-klientow-indywidualnych' },
        { label: t.nav.dlaFirm, href: '/dla-firm' },
        { label: t.nav.remont, href: '/remont-przeprowadzka' },
        { label: t.nav.archiwum, href: '/archiwum-dokumentow' },
        { label: t.nav.studenci, href: '/dla-studentow' },
      ],
    },
    { label: t.nav.poradnik, href: '/poradnik' },
    { label: t.nav.oNas, href: '/o-nas' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.kontakt, href: '/kontakt' },
  ];

  const currentPath = pathname.replace(/^\/en/, '') || '/';

  const isItemActive = (item: (typeof navItems)[number]) =>
    currentPath === item.href || item.children?.some((c) => c.href === currentPath);

  const switchLangHref = locale === 'pl' 
    ? `/en${currentPath === '/' ? '' : currentPath}`
    : currentPath;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-deep/95 backdrop-blur-md border-b border-brand/30">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo href={localePath('/')} variant="light" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={localePath(item.href)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                      isItemActive(item)
                        ? 'text-primary-foreground bg-brand/40'
                        : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[240px]">
                    <div className="bg-brand-deep border border-brand/30 rounded-lg shadow-xl py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={localePath(child.href)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            currentPath === child.href
                              ? 'text-primary-foreground bg-brand/40'
                              : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPath === item.href
                      ? 'text-primary-foreground bg-brand/40'
                      : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={switchLangHref}
              className="flex items-center gap-1 text-sm text-brand-light hover:text-primary-foreground transition-colors px-2 py-1"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              {t.nav.lang}
            </Link>
            <a
              href="tel:+48666030717"
              className="flex items-center gap-2 text-sm text-brand-light hover:text-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              666 030 717
            </a>
            <a
              href="https://wynajmij.lockit.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-brand text-foreground px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
            >
              {t.nav.rentBox}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-brand-light hover:text-primary-foreground transition-colors"
            aria-label={t.nav.menu}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-brand/20 mt-2 pt-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileSubOpen(mobileSubOpen === item.href ? null : item.href)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isItemActive(item)
                        ? 'text-primary-foreground bg-brand/40'
                        : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileSubOpen === item.href ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileSubOpen === item.href && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={localePath(child.href)}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                            currentPath === child.href
                              ? 'text-primary-foreground bg-brand/40'
                              : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    currentPath === item.href
                      ? 'text-primary-foreground bg-brand/40'
                      : 'text-brand-light hover:text-primary-foreground hover:bg-brand/20'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 px-4 space-y-2">
              <Link
                href={switchLangHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm text-brand-light"
              >
                <Globe className="w-4 h-4" />
                {t.nav.lang}
              </Link>
              <a href="tel:+48666030717" className="flex items-center gap-2 text-sm text-brand-light">
                <Phone className="w-4 h-4" />
                666 030 717
              </a>
              <a
                href="https://wynajmij.lockit.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="block gradient-brand text-foreground px-5 py-3 rounded-lg text-sm font-bold text-center"
              >
                {t.nav.rentBox}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
