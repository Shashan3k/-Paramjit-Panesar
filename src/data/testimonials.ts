import type { Testimonial } from '@/types';

/**
 * Patient testimonials, reproduced verbatim from the home page of chcahealth.org.
 * Spelling and punctuation are kept as published.
 *
 * Star ratings come from RE.md Section 5.1 (the site shows five-star icons).
 * "John Smith" is flagged: RE.md Section 9 (item 14) says it may be a placeholder,
 * and the quote contains a typo ("ever been too") that is kept as published.
 * Confirm approval for every testimonial before launch (Client Decisions Required).
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "mary-r",
    name: "Mary R.",
    quote: "The care I received at CHCA Healthcare was exceptional. From the friendly staff to the knowledgeable doctors, they made my journey to recovery smooth and comfortable. I'm grateful for their dedication to patient well-being.",
    rating: null,
    needsVerification: false,
  },
  {
    id: "john-d",
    name: "John D.",
    quote: "Choosing CHCA was the best decision for my family's health. The expertise of the medical team, combined with their compassionate approach, reassured us during a challenging time. Thank you for the outstanding care!",
    rating: null,
    needsVerification: false,
  },
  {
    id: "robert-m",
    name: "Robert M.",
    quote: "I can't express enough gratitude for the exceptional service at CHCA. The seamless coordination between the medical professionals and support staff made my recovery swift and stress-free. Thank you for your commitment to excellence.",
    rating: null,
    needsVerification: false,
  },
  {
    id: "jennah-johnson",
    name: "Jennah Johnson",
    quote: "Finding health care close to home is difficult in a small town. It’s nice to have a clinic with good doctors nearby especially with having children. The doctors are great listeners and put their patients first. Very kind and helpful. I would definitely recommend this clinic and will continue taking myself and family here.",
    rating: 5,
    needsVerification: false,
  },
  {
    id: "christina-conway",
    name: "Christina Conway",
    quote: "I like it. I’m new to the area so looking for a doctor is hard and They make me comfortable. The nurses help me out every time and are always accommodating. The doctor is great with explaining and talking about my concerns. Don’t judge a book by it’s cover. Smile and they will smile back.",
    rating: 5,
    needsVerification: false,
  },
  {
    id: "mayra-lomeli",
    name: "Mayra Lomeli",
    quote: "With private insurance I was having a hard time finding my primary doctor. Im impressed how a small town like Livingston can provide support when in need of medical attention. I started going to Community Health Centers of América for location convenience. I ended up moving my whole family from Kaiser Permanente and other areas in Merced to start seeing Dr. Sodhi. The staff is very friendly. Rosa and Sylvia have been very helpful. front staff are always willing to help with any paperwork. You are always seen on time and they don’t make you wait lengthy periods of time before your appointment. Dr. Sodhi is a good listener and does his work very thorough when explaining his plan for treatment. He is also very accommodating to my work schedule when scheduling my appointments. He is very knowledgeable and will make immediate referrals if necessary. I highly recommend Community Health Centers of America for your health Services.",
    rating: 5,
    needsVerification: false,
  },
  {
    id: "john-smith",
    name: "John Smith",
    quote: "Best doctor and office I have ever been too … I recommend to all my friends and family",
    rating: 5,
    needsVerification: true,
  },
];

/** Testimonials that can be rendered. Every entry has a verbatim quote. */
export function getDisplayableTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) => testimonial.quote.length > 0);
}
