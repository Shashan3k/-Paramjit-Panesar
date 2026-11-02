/**
 * Page-level headings, body copy, and calls to action.
 *
 * Content lives here so components stay presentational. Interface chrome
 * (navigation labels, footer headings, and screen-reader-only text such as
 * "Previous slide") stays in the components, since it is not site content.
 */

export const HOME_COPY = {
  hero: {
    eyebrow: 'Your Health, Our Priority',
    ctaCall: 'Call',
    ctaPatientLogin: 'Patient Login',
    ctaFindLocation: 'Find a Location',
    ctaSlidingFee: 'Check Sliding Fee',
    badges: [
      'Accepting all insurance types',
      'Sliding-scale discounts for the uninsured',
      'Federally Qualified Health Center (Look-Alike)',
    ],
    imageAlt: 'Community Health Centers of America team and clinic',
  },
  quickLinks: {
    title: 'Find a clinic near you',
    description: 'Choose a location to see its address, hours, services, and providers.',
  },
  providers: {
    eyebrow: 'Your Health, Our Priority',
    title: 'Meet our new providers',
    description: 'Meet the providers who have recently joined CHCA.',
    viewAll: 'Browse all providers',
    flyerLabel: 'Flyer (PDF)',
    locationsLabel: 'Locations',
    acceptingYes: 'Accepting new patients',
    acceptingNo: 'Not accepting new patients',
    acceptingUnknown: 'Call to confirm new-patient status',
  },
  announcementLabel: 'Announcement',
  about: {
    eyebrow: 'Your Health, Our Priority',
    title: 'About CHCA',
    readMore: 'Read more about us',
    mission: 'Our mission',
  },
  ceo: {
    eyebrow: 'A message from our CEO',
    title: 'Care that does not depend on your ability to pay',
    readMore: 'Read more about our leadership',
  },
  stats: {
    eyebrow: 'Committed to Care',
    title: 'Serving our communities',
    intro:
      'At Community Health Centers of America, we are dedicated to ensuring the provision of essential healthcare services, adapting to changing needs and expanding our reach to serve underserved communities more effectively. Our focus remains on strategic growth, operational excellence, and a commitment to the communities we serve.',
  },
  services: {
    eyebrow: 'Caring Beyond Medicine',
    title: 'Our services',
    description: 'From family care to specialty and dental services, find the care your household needs.',
    viewAll: 'View all services',
    learnMore: 'Learn more',
    cardFallback: 'Details coming soon.',
  },
  locations: {
    eyebrow: 'Because Every Life Matters',
    title: 'Our locations',
    description: 'Clinics across the Central Valley, Sacramento, and Fresno.',
    viewAll: 'See the full directory',
  },
  mobileClinic: {
    eyebrow: 'Caring Beyond Medicine',
    title: 'Mobile clinic schedule',
    empty: 'The mobile clinic schedule for the coming months will be posted here. Please call us for the latest dates.',
  },
  events: {
    eyebrow: 'Upcoming Events',
    title: 'Events',
    empty: 'No upcoming events are scheduled right now. Check back soon, or call us for details.',
  },
  testimonials: {
    eyebrow: 'Inspiring Health Journeys',
    title: 'What our patients say',
    disclaimer:
      'Some feedback below is summarized from patient reviews, not quoted verbatim. Verbatim, approved quotes are pending.',
    summaryLabel: 'Summary of patient feedback',
    viewLabel: 'Patient feedback',
  },
  finalCta: {
    title: 'Ready to see a provider?',
    description: 'Call our main line or request an appointment online.',
    call: 'Call us',
    contact: 'Request an appointment',
  },
} as const;

export const ABOUT_COPY = {
  heroTitle: 'About Community Health Centers of America',
  heroSubtitle: 'Affordable, compassionate care for historically underserved communities.',
  valuesTitle: 'Our values',
  missionTitle: 'Mission',
  visionTitle: 'Vision',
  boardTitle: 'Board of Directors',
  boardDescription: 'The people who guide CHCA’s mission and governance.',
  pastBoardTitle: 'Past board members',
  executiveTitle: 'Executive team',
  executiveDescription: 'Select a leader to read their full biography.',
  readBio: 'Read bio',
  statsTitle: 'By the numbers',
  documentsTitle: 'Patient rights and company information',
  teamAnchor: 'our-team',
} as const;

export const SERVICES_COPY = {
  heroTitle: 'Patient Services',
  heroSubtitle:
    'Explore the services we offer across our clinics. Each service page shows the locations and providers who offer it.',
  ccmCta: 'Enroll in Chronic Care Management',
  indexTitle: 'All services',
  detailBackLink: 'All patient services',
  overviewTitle: 'Overview',
  sourceLabel: 'Information from {source} on chcahealth.org.',
  snfGoalsTitle: 'Goals of the collaborative',
  snfFacilitiesTitle: 'SNF partner facility locations',
  snfFacilitiesNote: 'Partner skilled nursing facilities in the collaborative. These are not CHCA clinics.',
  detailNoLocations: 'The clinics that offer this service are being confirmed. Please call us to ask where it is available.',
  detailLocationsTitle: 'Where to get this service',
  detailProvidersTitle: 'Providers',
  detailBookTitle: 'Ready to book?',
  detailBookDescription: 'Call us, or send a request and our team will contact you.',
  detailComingSoon:
    'Details for this service are being updated. Please call us to ask about availability and locations.',
} as const;

export const LOCATIONS_COPY = {
  heroTitle: 'Locations',
  heroSubtitle: 'Find a health center near you.',
  filterTitle: 'Filter by service',
  filterAll: 'All services',
  resultsEmpty: 'No locations match this service yet. Call us to ask where it is offered.',
  resultsCount: 'Showing {count} location(s)',
  serviceHeading: 'Services',
  additionalServicesHeading: 'Also available',
  contactHeading: 'Contact',
  hoursHeading: 'Hours',
  hoursEmpty: 'Hours for this clinic are being confirmed. Please call us for current hours.',
  addressEmpty: 'The address for this clinic is being confirmed. Please call us for directions.',
  providersHeading: 'Healthcare Providers',
  providersDescription: 'Find a provider that suits you!',
  providersEmpty: 'Provider information for this clinic is being updated.',
  galleryHeading: 'Photos',
  galleryEmpty: 'Photos of this clinic will be added soon.',
  mapHeading: 'Map and directions',
  directionsCta: 'Get directions',
  formHeading: 'Request an appointment',
  formDescription: 'Fill out the form below to contact us about this clinic.',
  backLink: 'All locations',
  cardAddressPending: 'Address coming soon',
  cardMoreSites: '+{count} more site(s)',
  phoneEmpty: 'Phone numbers for this site are being confirmed.',
  formPrivacyNote:
    'Please do not include detailed medical information in this form. Our staff will contact you to schedule your visit.',
  generalFormLink: 'General contact form',
  mainLinePrefix: 'Need to speak with someone now? Call',
  sourceNote: 'Clinic details come from {url} on chcahealth.org. Please call to confirm hours before visiting.',
  servicesEmpty: 'Services for this clinic are being confirmed. Please call us for details.',
  leadershipLink: 'Meet our leadership team',
  cardViewLocation: 'View clinic',
  hubHeading: 'Clinics in this area',
  hubDescription: 'Select a clinic to see its address, hours, services, and providers.',
} as const;

export const PROVIDERS_COPY = {
  heroTitle: 'Our providers',
  heroSubtitle: 'Search by name or specialty, or filter by location to find a provider near you.',
  searchLabel: 'Search providers',
  specialtyLabel: 'Specialty',
  locationLabel: 'Location',
  allSpecialties: 'All specialties',
  allLocations: 'All locations',
  acceptingUnknown: 'New-patient status not stated. Call to confirm.',
  specialtyUnknown: 'Specialty not stated on our clinic pages',
  viewProfile: 'View profile',
  profileBioTitle: 'About this provider',
  profileBioSource: 'Biography from the provider’s welcome flyer. Read the full flyer (PDF)',
  profileBioEmpty: 'A biography for this provider has not been published yet. Please call the clinic for more information.',
  profileLocationsTitle: 'Where to see this provider',
  profileFactsTitle: 'Details',
  profileLanguages: 'Languages spoken',
  profileLanguagesEmpty: 'Languages not stated',
  profileCredentials: 'Credentials',
  profileSpecialty: 'Specialty',
  profileAcceptingYes: 'Now accepting new patients (per welcome flyer)',
  profileAcceptingUnknown: 'New-patient status not stated. Call to confirm.',
  profileBack: 'All providers',
  profileCredentialsEmpty: 'Not stated',
  profileNoLocation: 'Clinic assignment is being confirmed. Please call our main line for this provider.',
  profileFlyerButton: 'Welcome flyer (PDF)',
  profileBook: 'Request an appointment',
  profileLocationNote: 'Clinic location',
  profileFlyerNote: 'Information published in the provider’s welcome flyer. Verify details with the clinic before your visit.',
  resultsEmpty: 'No providers match your search. Try a different name, specialty, or location.',
  reset: 'Clear filters',
} as const;

export const SLIDING_FEE_COPY_PAGE = {
  heroTitle: 'Sliding Fee Scale',
  heroSubtitle:
    'Our sliding fee scale adjusts the cost of care to your household income. Choose the type of care, enter your family size and income, and see your estimated tier.',
  medicalLabel: 'Medical',
  dentalLabel: 'Dental',
  typeLegend: 'Type of care',
  familySizeLabel: 'Family size',
  familySizeHint: 'Include yourself and everyone who lives with you and shares income.',
  incomeFrequencyLegend: 'How do you want to enter your income?',
  annualLabel: 'Annual',
  monthlyLabel: 'Monthly',
  incomeLabel: 'Household income (USD)',
  submit: 'Check my tier',
  resultTitle: 'Your estimated tier',
  resultTierLabel: 'Tier',
  resultNameFallback: 'Tier name to be confirmed',
  gapTitle: 'Please call us to confirm',
  gapDescription:
    'Your income falls between published bands, so our staff must confirm your tier. Call us and we will help you.',
  unsupportedTitle: 'Please call us for your household',
  unsupportedDescription: 'Our published scale covers households of 1 to 8 people. Call us and we will help you.',
  invalidIncome: 'Enter an income of zero or more.',
  invalidFamilySize: 'Choose a family size.',
  nextStepsTitle: 'Next steps',
  ctaApply: 'Request an appointment',
  ctaCall: 'Call us',
  ctaFindLocation: 'Find a location',
  bandsTitle: 'Published income bands',
  bandsDescription: 'Annual household income ranges used for this calculator.',
  bandsFamilySize: 'Family size',
  bandsDisclaimer:
    'Income limits follow the federal poverty guidelines and are updated each year. Confirm the figures you need with our staff.',
} as const;

export const CONTACT_COPY = {
  heroTitle: 'Contact us',
  heroSubtitle: 'Send us a message, or call during clinic hours. Please do not include detailed medical information here.',
  formTitle: 'Send us a message',
  locationLabel: 'Location',
  locationPlaceholder: 'Choose a location',
  firstName: 'First name',
  lastName: 'Last name',
  phone: 'Phone number',
  email: 'Email address',
  message: 'How can we help?',
  messageHint: 'For your privacy, do not share Social Security numbers, insurance IDs, or detailed medical information here.',
  smsConsentLabel:
    'By providing your phone number, you consent to receive text messages from Community Health Centers of America for purposes related to our services. Message frequency may vary. Message and Data Rates may apply. Reply HELP for help or STOP to unsubscribe. See our Privacy Policy and Terms and Conditions.',
  submit: 'Send message',
  submitting: 'Sending…',
  successTitle: 'Thank you. We received your message.',
  successDescription: 'A member of our team will contact you soon. If your request is urgent, please call us.',
  errorTitle: 'Your message could not be sent.',
  errorGeneric: 'Please try again, or call us directly.',
  summaryTitle: 'Please fix the errors below.',
  hqTitle: 'Headquarters',
  callTitle: 'Call us',
  requiredNote: 'Fields marked * are required.',
} as const;

export const STUB_PAGES = {
  blog: {
    title: 'Blog',
    subtitle: 'Health tips, clinic news, and community stories.',
    body: 'Our blog is being prepared. Posts will appear here, with an archive by month and topic.',
  },
  careers: {
    title: 'Careers',
    subtitle: 'Join a team that puts patients and community first.',
    body: 'Current openings will be listed here. Please check back soon.',
  },
  referral: {
    title: 'Provider Referral Form',
    subtitle: 'For referring providers who want to send a patient to CHCA.',
    body: 'The referral form is being finalized. Please call us to refer a patient in the meantime.',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your information.',
    body: 'The full privacy policy is being finalized and will be published here.',
  },
  termsOfUse: {
    title: 'Terms of Use',
    subtitle: 'The terms that apply when you use this website.',
    body: 'The full terms are being finalized and will be published here.',
  },
  cookiePolicy: {
    title: 'Cookie Policy',
    subtitle: 'How this website uses cookies and similar technologies.',
    body: 'The full cookie policy is being finalized and will be published here.',
  },
  marketingOutreach: {
    title: 'Marketing Outreach',
    subtitle: 'Community events and outreach programs.',
    body: 'Outreach event details will be published here.',
  },
  compliance: {
    title: 'Compliance and Notices',
    subtitle: 'Non-discrimination notice, FQHC compliance documents, and annual reports.',
    body: 'Documents for this section are being prepared.',
  },
  ccm: {
    title: 'Chronic Care Management',
    subtitle: 'Support for managing ongoing health conditions.',
    body: 'Enrollment details for Chronic Care Management are being prepared. Please call us to ask about enrollment.',
  },
} as const;

export const STUB_CONTENT_NOTE =
  'This page is a placeholder while we finalize the content. It will be replaced before launch.';

export const FIND_NEAREST_COPY = {
  heroTitle: 'Find the nearest clinic',
  heroSubtitle:
    'Choose “Use my location” to sort our clinics by distance from where you are. Your location is used only in your browser. It is not stored or sent to us.',
  requestButton: 'Use my location',
  retryButton: 'Try again',
  requesting: 'Asking your browser for your location…',
  deniedTitle: 'Location access is off',
  deniedDescription:
    'Your browser did not share your location. You can allow location access in your browser settings and try again, or browse all clinics below.',
  unavailableTitle: 'Your location is unavailable',
  unavailableDescription:
    'This browser or device could not determine your location. Browse all clinics below or call our main line for help.',
  timeoutTitle: 'We could not get your location in time',
  timeoutDescription: 'Please try again, or browse all clinics below.',
  resultsTitle: 'Clinics sorted by distance',
  resultsCount: '{count} clinic(s) with map coordinates are sorted by distance from you.',
  milesLabel: 'away',
  directions: 'Get directions',
  viewClinic: 'View clinic',
  unrankedTitle: 'Distance not available',
  unrankedDescription:
    'We have not published map coordinates for these clinics, so we cannot calculate their distance. Open the clinic page for its address and phone number.',
  browseAll: 'Browse all locations',
  idleNote: 'Distances are straight-line (“as the crow flies”) estimates, not driving distances.',
} as const;

export const SEARCH_COPY = {
  heroTitle: 'Search CHCA Health',
  heroSubtitle: 'Search clinics, providers, services, blog articles, and pages.',
  label: 'Search terms',
  placeholder: 'For example: Livingston, pediatrics, sliding fee',
  submit: 'Search',
  hint: 'Type at least two letters. Use one or more words, such as a clinic name, provider, or service.',
  resultsCount: '{count} result(s) for “{query}”',
  noResultsTitle: 'No results found',
  noResultsDescription:
    'Try a shorter or different word. You can also browse the clinic directory, the provider list, or our services.',
  browseLocations: 'Browse locations',
  browseProviders: 'Browse providers',
  browseServices: 'Browse services',
  resultsHeading: 'Results',
} as const;

export const BLOG_COPY = {
  archiveTitle: 'Health articles and news',
  archiveSubtitle: 'Articles from the CHCA team on family care, neurological health, and managing chronic conditions.',
  listTitle: 'All articles',
  readArticle: 'Read article',
  empty: 'No articles have been published yet. Please check back soon.',
  backToBlog: 'All articles',
  originalSource: 'This article was first published on chcahealth.org. Please call us before acting on any health information.',
} as const;
