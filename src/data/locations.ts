import type { LocationRecord } from '@/types';

/**
 * Clinic locations.
 *
 * Recovered from the store-locator pages on chcahealth.org (addresses, phone
 * numbers, office hours, services, and map coordinates). Each `sourceUrl`
 * points to the page the data came from. Fields that are missing on the
 * old site stay null or empty, and the UI shows a fallback.
 *
 * Coordinates are the store locator's own values. Records with null
 * coordinates are excluded from "Find nearest" and never estimated.
 *
 * Open questions are listed in README.md (Client Decisions Required).
 */
const ALL_LOCATIONS: readonly LocationRecord[] = [
  {
    slug: "chowchilla",
    name: "Chowchilla",
    shortName: "Chowchilla",
    city: "Chowchilla",
    sites: [
      {
        label: null,
        address: { street: "101 N. Front St. Suite B", city: "Chowchilla", state: "CA", postalCode: "93610" },
        phones: [
        { label: "Main", display: "(559) 201-9181", tel: "+15592019181" },
        { label: "Second line", display: "(559) 201-9395", tel: "+15592019395" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "pain-management"],
    additionalServices: [],
    gallery: [
      { src: "/images/locations/chowchilla/chca-chowchilla01.webp", alt: "Chowchilla clinic photo 1 of 7" },
      { src: "/images/locations/chowchilla/chca-chowchilla04.webp", alt: "Chowchilla clinic photo 2 of 7" },
      { src: "/images/locations/chowchilla/chca-chowchilla05.webp", alt: "Chowchilla clinic photo 3 of 7" },
      { src: "/images/locations/chowchilla/chca-chowchilla06.webp", alt: "Chowchilla clinic photo 4 of 7" },
      { src: "/images/locations/chowchilla/chca-chowchilla07.webp", alt: "Chowchilla clinic photo 5 of 7" },
      { src: "/images/locations/chowchilla/chca-chowchilla08.webp", alt: "Chowchilla clinic photo 6 of 7" },
      { src: "/images/locations/chowchilla/chowchilla-img1.jpg", alt: "Chowchilla clinic photo 7 of 7" }
    ],
    hub: null,
    coordinates: { lat: 37.124592, lng: -120.258269, source: "store-locator" },
    sourceUrl: "/locations/chowchilla/",
  },
  {
    slug: "fair-oaks",
    name: "Fair Oaks",
    shortName: "Fair Oaks",
    city: "Fair Oaks",
    sites: [
      {
        label: null,
        address: { street: "6608 Mercy Ct. Suite B", city: "Fair Oaks", state: "CA", postalCode: "95628" },
        phones: [
        { label: "Main", display: "(916) 277-8881", tel: "+19162778881" },
        { label: "Second line", display: "(916) 244-8176", tel: "+19162448176" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "behavioral-health", "womens-health", "urgent-care", "psychiatry"],
    additionalServices: [],
    gallery: [],
    hub: null,
    coordinates: { lat: 38.665903, lng: -121.310681, source: "store-locator" },
    sourceUrl: "/locations/fair-oaks/",
  },
  {
    slug: "gustine-primary",
    name: "Gustine (Primary)",
    shortName: "Gustine (Primary)",
    city: "Gustine",
    sites: [
      {
        label: null,
        address: { street: "489 5th St.", city: "Gustine", state: "CA", postalCode: "95322" },
        phones: [
        { label: "Main", display: "(209) 854-3728", tel: "+12098543728" },
        { label: "Telehealth line", display: "(866) 591-9213", tel: "+18665919213" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry"],
    additionalServices: ["Telehealth Services"],
    gallery: [],
    hub: "gustine",
    coordinates: { lat: 37.254959, lng: -120.999506, source: "store-locator" },
    sourceUrl: "/locations/gustine-primary/",
  },
  {
    slug: "gustine-specialty",
    name: "Gustine (Specialty)",
    shortName: "Gustine (Specialty)",
    city: "Gustine",
    sites: [
      {
        label: null,
        address: { street: "554 5th St.", city: "Gustine", state: "CA", postalCode: "95322" },
        phones: [
        { label: "Main", display: "(209) 733-9360", tel: "+12097339360" },
        { label: "Second line", display: "(209) 733-9464", tel: "+12097339464" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry", "neurology", "dermatology", "chiropractic", "pulmonology"],
    additionalServices: ["Telehealth Services"],
    gallery: [],
    hub: "gustine",
    coordinates: { lat: 37.25412, lng: -120.99865, source: "store-locator" },
    sourceUrl: "/locations/gustine-specialty/",
  },
  {
    slug: "livingston",
    name: "Livingston",
    shortName: "Livingston",
    city: "Livingston",
    sites: [
      {
        label: null,
        address: { street: "517 Main St. Suite A", city: "Livingston", state: "CA", postalCode: "95334" },
        phones: [
        { label: "Main", display: "(209) 445-2388", tel: "+12094452388" },
        { label: "Second line", display: "(209) 490-5652", tel: "+12094905652" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry"],
    additionalServices: ["Telehealth Services"],
    gallery: [
      { src: "/images/locations/livingston/chca-livingston01.webp", alt: "Livingston clinic photo 1 of 8" },
      { src: "/images/locations/livingston/chca-livingston02.webp", alt: "Livingston clinic photo 2 of 8" },
      { src: "/images/locations/livingston/chca-livingston03.webp", alt: "Livingston clinic photo 3 of 8" },
      { src: "/images/locations/livingston/chca-livingston04.webp", alt: "Livingston clinic photo 4 of 8" },
      { src: "/images/locations/livingston/chca-livingston05.webp", alt: "Livingston clinic photo 5 of 8" },
      { src: "/images/locations/livingston/chca-livingston06.webp", alt: "Livingston clinic photo 6 of 8" },
      { src: "/images/locations/livingston/chca-livingston07.webp", alt: "Livingston clinic photo 7 of 8" },
      { src: "/images/locations/livingston/chca-livingston08.webp", alt: "Livingston clinic photo 8 of 8" }
    ],
    hub: null,
    coordinates: { lat: 37.38565, lng: -120.72298, source: "store-locator" },
    sourceUrl: "/locations/livingston/",
  },
  {
    slug: "mariposa",
    name: "Mariposa",
    shortName: "Mariposa",
    seoTitle: "Mariposa Primary Care & Family Clinic | CHCA Health",
    city: "Mariposa",
    sites: [
      {
        label: null,
        address: { street: "5320 Highway 49 N Suite 1", city: "Mariposa", state: "CA", postalCode: "95338" },
        phones: [
        { label: "Main", display: "(209) 497-5006", tel: "+12094975006" },
        { label: "Second line", display: "(209) 966-2344", tel: "+12099662344" },
        { label: "Third line", display: "(855) 618-2406", tel: "+18556182406" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry"],
    additionalServices: ["Telehealth Services"],
    gallery: [],
    hub: null,
    coordinates: { lat: 37.500821, lng: -119.983786, source: "store-locator" },
    sourceUrl: "/locations/mariposa/",
  },
  {
    slug: "mcfarland",
    name: "McFarland",
    shortName: "McFarland",
    city: "McFarland",
    sites: [
      {
        label: null,
        address: { street: "733 3rd St.", city: "McFarland", state: "CA", postalCode: "93250" },
        phones: [
        { label: "Main", display: "(661) 792-3097", tel: "+16617923097" },
        { label: "Second line", display: "(661) 792-3095", tel: "+16617923095" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "behavioral-health", "womens-health", "urgent-care", "psychiatry"],
    additionalServices: [],
    gallery: [],
    hub: null,
    coordinates: { lat: 35.682599, lng: -119.231238, source: "store-locator" },
    sourceUrl: "/locations/mcfarland/",
  },
  {
    slug: "eastern-primary",
    name: "Eastern Avenue (Primary)",
    shortName: "Eastern (Primary)",
    city: "Sacramento",
    sites: [
      {
        label: null,
        address: { street: "2928 Eastern Ave.", city: "Sacramento", state: "CA", postalCode: "95821" },
        phones: [
        { label: "Main", display: "(916) 894-8212", tel: "+19168948212" },
        { label: "Second line", display: "(916) 244-8181", tel: "+19162448181" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "behavioral-health", "womens-health", "urgent-care", "psychiatry"],
    additionalServices: [],
    gallery: [],
    hub: "eastern",
    coordinates: { lat: 38.618597, lng: -121.363678, source: "store-locator" },
    sourceUrl: "/locations/eastern-primary/",
  },
  {
    slug: "eastern-dental",
    name: "Eastern Avenue (Dental)",
    shortName: "Eastern (Dental)",
    city: "Sacramento",
    sites: [
      {
        label: null,
        address: { street: "2928 Eastern Ave.", city: "Sacramento", state: "CA", postalCode: "95821" },
        phones: [
        { label: "Main", display: "(916) 485-1555", tel: "+19164851555" },
        { label: "Second line", display: "(916) 634-4922", tel: "+19166344922" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["dental-clinic"],
    additionalServices: [],
    gallery: [],
    hub: "eastern",
    coordinates: { lat: 38.618597, lng: -121.363678, source: "store-locator" },
    sourceUrl: "/locations/eastern-dental/",
  },
  {
    slug: "sacramento-new-family-practice",
    name: "Sacramento – New Family Practice",
    shortName: "Sacramento – New Family Practice",
    city: "Sacramento",
    sites: [
      {
        label: null,
        address: { street: "8191 Timberlake Way, Suite 200", city: "Sacramento", state: "CA", postalCode: "95823" },
        phones: [
        { label: "Main", display: "(916) 236-5800", tel: "+19162365800" },
        { label: "Second line", display: "(916) 266-7473", tel: "+19162667473" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice"],
    additionalServices: [],
    gallery: [],
    hub: null,
    coordinates: { lat: 38.460406, lng: -121.413133, source: "store-locator" },
    sourceUrl: "/locations/sacramento-new-family-practice/",
  },
  {
    slug: "fresno-gi",
    name: "Fresno GI",
    shortName: "Fresno – GI",
    city: "Fresno",
    sites: [
      {
        label: null,
        address: { street: "7085 N Maple Ave #101", city: "Fresno", state: "CA", postalCode: "93720" },
        phones: [
        { label: "Main", display: "(559) 431-8888", tel: "+15594318888" },
        { label: "Fax", display: "(559) 347-9317", tel: "+15593479317" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["gastroenterology", "family-primary-practice"],
    additionalServices: [],
    gallery: [],
    hub: "fresno",
    coordinates: { lat: 36.839153, lng: -119.745754, source: "store-locator" },
    sourceUrl: "/locations/fresno-gi/",
  },
  {
    slug: "fresno-family-practice",
    name: "Fresno Family Practice",
    shortName: "Fresno – Family Practice",
    city: "Fresno",
    sites: [
      {
        label: "Suite #220",
        address: { street: "1300 N Fresno St, # 220", city: "Fresno", state: "CA", postalCode: "93703" },
        phones: [
        { label: "Main", display: "(559) 495-6707", tel: "+15594956707" },
        { label: "Second line", display: "(559) 495-6782", tel: "+15594956782" }
      ]
      },
      {
        label: "Suite #301",
        address: { street: "1300 N Fresno St, # 301", city: "Fresno", state: "CA", postalCode: "93703" },
        phones: [
        { label: "Main", display: "(559) 495-6714", tel: "+15594956714" },
        { label: "Second line", display: "(559) 495-6705", tel: "+15594956705" }
      ]
      }
    ],
    hours: [
      { days: "Monday to Friday", officeHours: "7:00 AM – 4:00 PM", lunch: "11:00 AM – 12:00 Noon" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry", "womens-health"],
    additionalServices: [],
    gallery: [],
    hub: "fresno",
    coordinates: { lat: 36.760393, lng: -119.781173, source: "store-locator" },
    sourceUrl: "/locations/fresno-family-practice/ (suite pages /fresno-family-practice-suite-220 and -301 consolidated)",
  },
  {
    slug: "primary-care",
    name: "Fresno – Primary Care & Behavioral Health",
    shortName: "Fresno – Primary Care",
    city: "Fresno",
    sites: [
      {
        label: null,
        address: { street: "6331 N Fresno St, Suites 104 & 105", city: "Fresno", state: "CA", postalCode: "93710" },
        phones: [
        { label: "Main", display: "(559) 436-1444", tel: "+15594361444" },
        { label: "Second line", display: "(559) 436-4395", tel: "+15594364395" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 AM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "behavioral-health"],
    additionalServices: [],
    gallery: [],
    hub: "fresno",
    coordinates: { lat: 36.829131, lng: -119.782817, source: "store-locator" },
    sourceUrl: "/locations/primary-care/",
  },
  {
    slug: "pediatrics",
    name: "Fresno – Pediatrics",
    shortName: "Fresno – Pediatrics",
    city: "Fresno",
    sites: [
      {
        label: "Suite #104",
        address: { street: "5479 N Fresno St. Suite #104", city: "Fresno", state: "CA", postalCode: "93710" },
        phones: [
        { label: "Main", display: "(559) 438-4100", tel: "+15594384100" },
        { label: "Second line", display: "(559) 447-4496", tel: "+15594474496" }
      ]
      },
      {
        label: "Suite #110",
        address: { street: "1300 Fresno St. Suite #110", city: "Fresno", state: "CA", postalCode: "93703" },
        phones: [
        { label: "Main", display: "(559) 495-6752", tel: "+15594956752" },
        { label: "Second line", display: "(559) 495-6781", tel: "+15594956781" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["pediatrics"],
    additionalServices: [],
    gallery: [],
    hub: "fresno",
    coordinates: null,
    sourceUrl: "/locations/pediatrics/",
  },
  {
    slug: "merced-primary-clinic",
    name: "Merced Primary Clinic",
    shortName: "Merced – Primary Clinic",
    city: "Merced",
    sites: [
      {
        label: null,
        address: { street: "850 W Olive Ave, Suite A", city: "Merced", state: "CA", postalCode: "95348" },
        phones: [
        { label: "Main", display: "(209) 437-9410", tel: "+12094379410" },
        { label: "Second line", display: "(559) 220-9380", tel: "+15592209380" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["family-primary-practice", "psychiatry"],
    additionalServices: ["Telehealth Services"],
    gallery: [],
    hub: "merced",
    coordinates: { lat: 37.318949, lng: -120.483589, source: "store-locator" },
    sourceUrl: "/locations/merced-primary-clinic/",
  },
  {
    slug: "merced-chiropractor-services",
    name: "Merced – Chiropractor Services",
    shortName: "Merced – Chiropractor Services",
    city: "Merced",
    sites: [
      {
        label: null,
        address: { street: "104 W Alexander Ave", city: "Merced", state: "CA", postalCode: "95348" },
        phones: [
        { label: "Main", display: "(209) 222-3979", tel: "+12092223979" }
      ]
      }
    ],
    hours: [
      { days: "Monday, Tuesday, Thursday, Friday", officeHours: "8:00 AM – 5:00 PM", lunch: "12:00 PM – 1:00 PM" },
      { days: "Wednesday", officeHours: "9:00 AM – 6:00 PM", lunch: "1:00 PM – 2:00 PM" }
    ],
    serviceSlugs: ["chiropractic"],
    additionalServices: [],
    gallery: [],
    hub: "merced",
    coordinates: { lat: 37.314926, lng: -120.471307, source: "store-locator" },
    sourceUrl: "/locations/merced-chiropractor-services/",
  },
  {
    slug: "turlock-primary-care",
    name: "Turlock Primary Care",
    shortName: "Turlock – Primary Care",
    city: "Turlock",
    // Open status is not confirmed with the practice. Stays noindexed and off the sitemap until it is.
    status: "unconfirmed",
    sites: [
      {
        label: null,
        address: { street: "3900 Geer Rd., 2nd Floor, Suite 201", city: "Turlock", state: "CA", postalCode: "95382" },
        phones: [
        { label: "Main", display: "(209) 678-9088", tel: "+12096789088" },
        { label: "Second line", display: "(209) 733-9361", tel: "+12097339361" }
      ]
      }
    ],
    hours: null,
    serviceSlugs: ["family-primary-practice"],
    additionalServices: [],
    gallery: [],
    hub: null,
    coordinates: { lat: 37.528301, lng: -120.848572, source: "store-locator" },
    sourceUrl: "/locations/turlock-primary-care/",
  },
  {
    slug: "turlock-specialty-care",
    name: "Turlock Specialty Care",
    shortName: "Turlock – Specialty Care",
    city: "Turlock",
    // Open status is not confirmed with the practice. Stays noindexed and off the sitemap until it is.
    status: "unconfirmed",
    sites: [
      {
        label: null,
        address: { street: "3900 Geer Rd., 2nd Floor, Suite 202", city: "Turlock", state: "CA", postalCode: "95382" },
        phones: [
        { label: "Main", display: "(209) 799-3232", tel: "+12097993232" },
        { label: "Second line", display: "(209) 733-9424", tel: "+12097339424" }
      ]
      }
    ],
    hours: null,
    serviceSlugs: [],
    additionalServices: ["Specialty care"],
    gallery: [],
    hub: null,
    coordinates: { lat: 37.528301, lng: -120.848572, source: "store-locator" },
    sourceUrl: "/locations/turlock-specialty-care/",
  },
  {
    slug: "turlock-advanced-imaging-clinic",
    name: "Turlock Advanced Imaging Clinic",
    shortName: "Turlock – Advanced Imaging",
    city: "Turlock",
    // Open status is not confirmed with the practice. Stays noindexed and off the sitemap until it is.
    status: "unconfirmed",
    sites: [
      {
        label: null,
        address: { street: "3900 Geer Rd., 1st Floor, Suite 101", city: "Turlock", state: "CA", postalCode: "95382" },
        phones: [
        { label: "Main", display: "(209) 840-6752", tel: "+12098406752" },
        { label: "Second line", display: "(844) 207-8214", tel: "+18442078214" }
      ]
      }
    ],
    hours: null,
    serviceSlugs: [],
    additionalServices: ["Advanced imaging services"],
    gallery: [],
    hub: null,
    coordinates: { lat: 37.528301, lng: -120.848572, source: "store-locator" },
    sourceUrl: "/locations/turlock-advanced-imaging-clinic/",
  },
  {
    slug: "carmichael-dental",
    name: "Carmichael (Dental)",
    shortName: "Carmichael (Dental)",
    city: "Carmichael",
    sites: [
      {
        label: null,
        address: { street: "5723 Marconi Ave. Suite A", city: "Carmichael", state: "CA", postalCode: "95608" },
        phones: []
      }
    ],
    hours: null,
    serviceSlugs: ["dental-clinic"],
    additionalServices: [],
    gallery: [],
    hub: null,
    coordinates: null,
    sourceUrl: "/locations/carmichael-dental",
  },
];

/**
 * Clinics that are listed: indexed, linked, in the sitemap, and offered in forms and search.
 * Every consumer imports this list, so a status change here reaches the whole site.
 */
export const LOCATIONS: readonly LocationRecord[] = ALL_LOCATIONS.filter(
  (location) => (location.status ?? 'active') === 'active',
);

/** Records kept out of listings until the practice confirms their status. Reachable by URL, noindexed. */
export const UNLISTED_LOCATIONS: readonly LocationRecord[] = ALL_LOCATIONS.filter(
  (location) => (location.status ?? 'active') !== 'active',
);

export function getLocationBySlug(slug: string): LocationRecord | undefined {
  return ALL_LOCATIONS.find((location) => location.slug === slug);
}

/** Location slugs shown as quick-link chips on the home page. */
export const HOME_LOCATION_CHIP_SLUGS: readonly string[] = [
  'chowchilla',
  'fair-oaks',
  'gustine-primary',
  'gustine-specialty',
  'livingston',
  'mariposa',
  'mcfarland',
  'eastern-primary',
  'eastern-dental',
  'merced-primary-clinic',
  'fresno-gi',
  'fresno-family-practice',
  'merced-chiropractor-services',
];

/**
 * Regional hub pages. Fresno and Merced have their own routes. Gustine and
 * Eastern link to the directory. The old site has no separate hub page for them.
 */
export const LOCATION_HUBS: Readonly<Record<NonNullable<LocationRecord['hub']>, { label: string; href: string }>> = {
  fresno: { label: 'Fresno', href: '/fresno-clinics' },
  merced: { label: 'Merced', href: '/merced-clinics' },
  gustine: { label: 'Gustine', href: '/locations' },
  eastern: { label: 'Eastern Avenue', href: '/locations' },
};
