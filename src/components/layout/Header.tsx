'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { ChevronDown, ExternalLink, Facebook, Instagram, Linkedin, Menu, Phone, Search, X } from 'lucide-react';
import { ABOUT_MENU, LOCATION_MENU, MAIN_NAV } from '@/data/navigation';
import { BRAND, PATIENT_LOGIN_URL, PHONES, SOCIAL_LINKS } from '@/data/site';
import { cn, telHref } from '@/lib/utils';
import { T, useTranslator } from '@/i18n';
import { LanguageSwitcher } from '@/i18n/Controls';

type OpenMenu = 'about' | 'locations' | null;

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Facebook,
  Instagram,
};

/** True when the current path matches a link, ignoring any #hash. */
function isCurrent(pathname: string, href: string): boolean {
  const path = href.split('#')[0] ?? '';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * Site header. Includes a utility bar with click-to-call and social links, the
 * primary navigation, a keyboard-accessible Locations mega-menu, and the
 * Patient Login CTA. Desktop and mobile navigation share one markup tree, so
 * the duplicated desktop and mobile blocks from the current site are gone.
 */
export function Header() {
  const pathname = usePathname();
  const tr = useTranslator();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<OpenMenu>(null);
  const aboutTriggerRef = useRef<HTMLButtonElement>(null);
  const locationsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const idPrefix = useId();
  const menuIds = {
    about: `${idPrefix}-about`,
    locations: `${idPrefix}-locations`,
    mobile: `${idPrefix}-mobile`,
  };

  // Close all menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Close desktop dropdowns on outside click and on Escape.
  useEffect(() => {
    if (!openMenu) return;

    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const trigger = openMenu === 'about' ? aboutTriggerRef.current : locationsTriggerRef.current;
      setOpenMenu(null);
      trigger?.focus();
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  // Closes a dropdown when focus leaves its wrapper (keyboard users tabbing away).
  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-warm-200 bg-white shadow-sm">
      {/* Utility bar */}
      <div className="bg-navy-800 text-white">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
          <a
            href={telHref(PHONES.main.tel)}
            className="inline-flex min-h-[32px] items-center gap-2 rounded font-semibold hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>
              <span className="sr-only"><T>Call us at</T> </span>
              {PHONES.main.display}
            </span>
          </a>
          <div className="flex items-center gap-4">
          <LanguageSwitcher compact className="hidden sm:inline-flex" />
          <ul className="hidden items-center gap-4 sm:flex" aria-label={tr('Social media')}>
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.label] ?? ExternalLink;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-navy-700"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{link.description ?? link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav aria-label="Primary" className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded" aria-label={`${BRAND.name}, home`}>
          <Image
            src={BRAND.logo}
            alt=""
            width={220}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <NavAnchor href="/" pathname={pathname}>
              <T>Home</T>
            </NavAnchor>
          </li>

          {/* About dropdown */}
          <li onBlur={handleBlur} className="relative">
            <button
              ref={aboutTriggerRef}
              type="button"
              aria-expanded={openMenu === 'about'}
              aria-controls={menuIds.about}
              onClick={() => setOpenMenu((current) => (current === 'about' ? null : 'about'))}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1 rounded-md px-3 text-base font-semibold text-navy-800 hover:bg-navy-50',
                isCurrent(pathname, '/about') && 'text-teal-800',
              )}
            >
              <T>About Us</T>
              <ChevronDown className={cn('h-4 w-4 transition-transform', openMenu === 'about' && 'rotate-180')} aria-hidden="true" />
            </button>
            <div
              id={menuIds.about}
              hidden={openMenu !== 'about'}
              className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-warm-200 bg-white p-2 shadow-card"
            >
              <Link href={ABOUT_MENU.href} className="block rounded-md px-3 py-2 font-semibold text-navy-900 hover:bg-navy-50">
                <T>About CHCA</T>
              </Link>
              <ul>
                {ABOUT_MENU.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-md px-3 py-2 text-navy-800 hover:bg-navy-50">
                      <T>{item.label}</T>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Locations mega-menu */}
          <li onBlur={handleBlur} className="relative">
            <button
              ref={locationsTriggerRef}
              type="button"
              aria-expanded={openMenu === 'locations'}
              aria-controls={menuIds.locations}
              onClick={() => setOpenMenu((current) => (current === 'locations' ? null : 'locations'))}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1 rounded-md px-3 text-base font-semibold text-navy-800 hover:bg-navy-50',
                isCurrent(pathname, '/locations') && 'text-teal-800',
              )}
            >
              <T>Locations</T>
              <ChevronDown className={cn('h-4 w-4 transition-transform', openMenu === 'locations' && 'rotate-180')} aria-hidden="true" />
            </button>
            <div
              id={menuIds.locations}
              hidden={openMenu !== 'locations'}
              className="absolute left-1/2 top-full z-50 mt-2 w-[min(64rem,90vw)] -translate-x-1/2 rounded-xl border border-warm-200 bg-white p-6 shadow-card"
            >
              <div className="grid grid-cols-3 gap-6 xl:grid-cols-5">
                {LOCATION_MENU.map((group) => (
                  <div key={group.label}>
                    <Link href={group.href} className="font-bold text-teal-800 hover:underline">
                      <T>{group.label}</T>
                    </Link>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block rounded-md px-2 py-1.5 text-sm text-navy-800 hover:bg-navy-50">
                            <T>{item.label}</T>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end border-t border-warm-200 pt-4">
                <Link href="/locations" className="font-semibold text-teal-800 hover:underline">
                  <T>View all locations</T>
                </Link>
              </div>
            </div>
          </li>

          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <NavAnchor href={item.href} pathname={pathname}>
                <T>{item.label}</T>
              </NavAnchor>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Search the site</span>
          </Link>
          <a
            href={PATIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary hidden md:inline-flex"
          >
            <T>Patient Login</T>
            <span className="sr-only"> ({tr('opens in a new tab')})</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            ref={mobileToggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={menuIds.mobile}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? tr('Close menu') : tr('Open menu')}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id={menuIds.mobile} hidden={!mobileOpen} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-warm-200 bg-white lg:hidden">
        <div className="space-y-1 px-4 py-4">
          <LanguageSwitcher className="mb-3 w-full justify-center" />
          <a
            href={PATIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mb-3 w-full"
          >
            <T>Patient Login</T>
            <span className="sr-only"> (opens in a new tab)</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>

          <MobileNavLink href="/" pathname={pathname}>
            <T>Home</T>
          </MobileNavLink>

          <MobileDisclosure
            id={`${idPrefix}-m-about`}
            label={tr('About Us')}
            expanded={mobileSection === 'about'}
            onToggle={() => setMobileSection((current) => (current === 'about' ? null : 'about'))}
          >
            <MobileNavLink href={ABOUT_MENU.href} pathname={pathname}>
              <T>About CHCA</T>
            </MobileNavLink>
            {ABOUT_MENU.items.map((item) => (
              <MobileNavLink key={item.href} href={item.href} pathname={pathname} nested>
                <T>{item.label}</T>
              </MobileNavLink>
            ))}
          </MobileDisclosure>

          <MobileDisclosure
            id={`${idPrefix}-m-locations`}
            label={tr('Locations')}
            expanded={mobileSection === 'locations'}
            onToggle={() => setMobileSection((current) => (current === 'locations' ? null : 'locations'))}
          >
            {LOCATION_MENU.map((group) => (
              <div key={group.label} className="pt-2">
                <p className="px-3 text-sm font-bold uppercase tracking-wide text-teal-800"><T>{group.label}</T></p>
                {group.items.map((item) => (
                  <MobileNavLink key={item.href} href={item.href} pathname={pathname} nested>
                    <T>{item.label}</T>
                  </MobileNavLink>
                ))}
              </div>
            ))}
          </MobileDisclosure>

          {MAIN_NAV.map((item) => (
            <MobileNavLink key={item.href} href={item.href} pathname={pathname}>
              <T>{item.label}</T>
            </MobileNavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

function NavAnchor({ href, pathname, children }: { href: string; pathname: string; children: ReactNode }) {
  const current = isCurrent(pathname, href);
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-[44px] items-center rounded-md px-3 text-base font-semibold text-navy-800 hover:bg-navy-50',
        current && 'bg-teal-50 text-teal-900',
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  pathname,
  nested = false,
  children,
}: {
  href: string;
  pathname: string;
  nested?: boolean;
  children: ReactNode;
}) {
  const current = isCurrent(pathname, href);
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-navy-900 hover:bg-navy-50',
        nested && 'pl-6 text-[0.95rem]',
        current && 'bg-teal-50 font-semibold text-teal-900',
      )}
    >
      {children}
    </Link>
  );
}

function MobileDisclosure({
  id,
  label,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-left text-base font-medium text-navy-900 hover:bg-navy-50"
      >
        {label}
        <ChevronDown className={cn('h-5 w-5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
      </button>
      <div id={id} hidden={!expanded} className="pb-2">
        {children}
      </div>
    </div>
  );
}
