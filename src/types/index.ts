/**
 * Shared domain types for the CHCA website.
 *
 * Every content module in src/data/ is typed against these interfaces, so the
 * UI layer never hard-codes copy or records.
 */

/** Regional hubs used to group locations in navigation and the directory. */
export type LocationHub = 'fresno' | 'merced' | 'gustine' | 'eastern';

export interface PhoneNumber {
  /** Visible label, e.g. "Main" or "Front desk". */
  label: string;
  /** Display format, e.g. "(209) 445-2388". */
  display: string;
  /** E.164 value used for tel: links, e.g. "+12094452388". */
  tel: string;
}

export interface PostalAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface HoursRow {
  days: string;
  officeHours: string;
  lunch: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

/** One physical site of a clinic. A clinic can have several (for example, two suites in one building). */
export interface ClinicSite {
  /** Suite or sub-site label, e.g. "Suite #220". Null for single-site clinics. */
  label: string | null;
  address: PostalAddress;
  phones: PhoneNumber[];
}

/** Map coordinates taken from the client's store locator. Never estimated. */
export interface LocationCoordinates {
  lat: number;
  lng: number;
  source: 'store-locator';
}

export interface LocationRecord {
  slug: string;
  /** Full name, e.g. "Livingston". */
  name: string;
  /** Short label for chips, menus and form dropdowns. */
  shortName: string;
  city: string;
  /** Physical sites. Empty when no address has been published (for example, Carmichael). */
  sites: ClinicSite[];
  /** Null when hours have not been published; the UI shows a call-for-hours fallback. */
  hours: HoursRow[] | null;
  /** Service slugs from services.ts. */
  serviceSlugs: string[];
  /** Services listed on the clinic page that have no service slug, e.g. "Telehealth Services". */
  additionalServices: string[];
  gallery: GalleryImage[];
  hub: LocationHub | null;
  coordinates: LocationCoordinates | null;
  /** Page on chcahealth.org the record was recovered from. */
  sourceUrl: string;
}

export interface BlogBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'item';
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) from the WordPress post. */
  publishedOn: string;
  excerpt: string;
  sourceUrl: string;
  body: BlogBlock[];
}

export interface ServiceRecord {
  slug: string;
  name: string;
  /** Where the description was recovered from, or null when none exists. */
  sourceNote: string | null;
  /** One-sentence summary for cards. Null means the card renders title-only fallback copy. */
  summary: string | null;
  /** Bullet list shown on the detail page. */
  bullets: string[];
  closingLine: string | null;
  /** Whether detailed copy exists yet. */
  hasDetailedContent: boolean;
}

export interface ProviderRecord {
  slug: string;
  name: string;
  /** Post-nominal credentials, e.g. "M.D.", "D.O.". Empty string when none listed. */
  credentials: string;
  /** Null when no specialty is listed on the current site. */
  specialty: string | null;
  /** Remote headshot URL. Null renders the initials avatar fallback. */
  photo: string | null;
  /** Bilingual flyer PDF. Null when the flyer is not yet linked. */
  flyerUrl: string | null;
  /** Location slugs where this provider sees patients (matched to clinic records). */
  locationSlugs: string[];
  /** Location as stated in the provider's welcome flyer when no clinic record matches. */
  locationNote: string | null;
  /** Biography text reproduced from the provider's welcome flyer. Null when no flyer exists. */
  bio: string | null;
  /** True for providers in the home "new providers" carousel. */
  isNewProvider: boolean;
  /** Null means the status has not been confirmed with the client. */
  acceptingNewPatients: boolean | null;
  languages: string[];
}

export type FeeScaleKind = 'medical' | 'dental';

export interface SlidingFeeBand {
  /** 1-based income bracket index, as ordered on the published calculator (1 = lowest). */
  tier: 1 | 2 | 3 | 4 | 5;
  /** Inclusive lower bound (annual USD). Null means no lower bound. */
  minIncome: number | null;
  /** Exclusive upper bound (annual USD). Null means no upper bound. */
  maxIncomeExclusive: number | null;
}

export interface SlidingFeeRow {
  familySize: number;
  bands: SlidingFeeBand[];
}

export interface SlidingFeeTable {
  kind: FeeScaleKind;
  label: string;
  rows: SlidingFeeRow[];
}

export interface SlidingFeeTierMeta {
  tier: 1 | 2 | 3 | 4 | 5;
  /** Null until the client supplies tier names. */
  name: string | null;
  /** Null until the client supplies discount or nominal fee text. */
  description: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  /** Verbatim patient quote, as published on chcahealth.org. */
  quote: string;
  /** Star rating, 1 to 5. Null when the source did not show one. */
  rating: number | null;
  /** True when the entry may be a placeholder and must be verified before launch. */
  needsVerification: boolean;
}

export interface LeaderRecord {
  slug: string;
  name: string;
  title: string;
  bio: string;
  photo: string | null;
}

export interface BoardMember {
  name: string;
  role: string | null;
  photo: string | null;
}

export interface CeoMessage {
  name: string;
  title: string;
  photo: string | null;
  quote: string;
}

export interface StatItem {
  id: 'years' | 'locations' | 'specialists' | 'patientsPerYear' | 'labs';
  label: string;
  /** Null until the client confirms the figure; the UI shows the description instead. */
  value: number | null;
  /** Suffix shown after the number, e.g. "+". */
  suffix: string;
  description: string;
}

export interface EventRecord {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  location: string;
  description: string;
}

export interface MobileClinicDate {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  location: string;
  language: 'en' | 'es' | 'both';
  note: string | null;
}

export interface Announcement {
  id: string;
  message: string;
  href: string | null;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  /** Optional note used by screen readers, e.g. "opens in a new tab". */
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Link for the group heading. Must not be a placeholder such as "#". */
  href: string;
  items: NavLink[];
}

export interface DocumentLink {
  label: string;
  href: string;
  /** 'stub' marks a page whose content the client has not supplied yet. */
  kind: 'pdf' | 'page' | 'stub';
}

export interface ContactFormOption {
  value: string;
  label: string;
}
