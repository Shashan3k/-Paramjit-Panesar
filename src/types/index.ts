/** Shared types for the Apollo Physicians site. */

export interface PhoneNumber {
  label: string;
  /** Printed form, e.g. "916-236-5800". */
  display: string;
  /** E.164 value used for tel: links, e.g. "+19162365800". */
  tel: string;
}

export interface PostalAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
