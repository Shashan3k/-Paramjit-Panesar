import type { PhoneNumber } from '@/types';

/**
 * Site-wide constants for Apollo Physicians. Every value here is either from the
 * NPPES registry (NPI 1124405584) or was supplied by the practice. See practice.ts
 * for the source of each claim shown on the pages.
 */

/**
 * Public origin for canonical URLs, sitemap, and OpenGraph. The deployment domain is
 * confirmed separately, so the default is the official reference domain and can be
 * overridden with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.apollophysicians.com';

export const BRAND = {
  /** Public-facing brand. */
  name: 'Apollo Physicians',
  /** Legal name exactly as it appears in the NPI registry. Used in schema markup only. */
  legalName: 'APOLLO PHYSICANS MEDICAL GROUP',
} as const;

export const PHONES = {
  main: { label: 'Main', display: '916-236-5800', tel: '+19162365800' } satisfies PhoneNumber,
} as const;

/** Office address from NPPES NPI 1124405584 (ZIP+4 95823-5418). */
export const OFFICE = {
  street: '8191 Timberlake Way, Suite 200',
  city: 'Sacramento',
  state: 'CA',
  postalCode: '95823',
  /** Full single-line form used in visible copy and map links. */
  line: '8191 Timberlake Way, Suite 200, Sacramento, CA 95823',
} as const;

/** NPI identifiers from the NPPES registry. */
export const NPI = {
  organization: '1124405584',
  panesar: '1982892659',
} as const;
