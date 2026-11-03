/**
 * Insurance plans confirmed by the client. Used by the shared insurance
 * component, the sliding fee page, the Sacramento pages, and JSON-LD.
 */
export const ACCEPTED_INSURANCE_PLANS = [
  'Medicare',
  'Medi-Cal',
  'Commercial Insurance',
  'Nivano',
  'Rivercity',
  'Hills',
] as const;

/** Copy shared by every surface that lists insurance and payment options. */
export const INSURANCE_COPY = {
  heading: 'Insurance and payment options',
  intro: 'CHCA Health accepts these insurance plans:',
  uninsured:
    'Uninsured and self-pay patients are welcome. Ask about our sliding fee scale for income-based discounts.',
  confirm: 'Coverage can vary by plan and service. Call the clinic to confirm your plan before you visit.',
  acceptingNewPatients: 'Accepting new patients',
} as const;

/** Value for schema.org `paymentAccepted`. */
export const PAYMENT_ACCEPTED = ACCEPTED_INSURANCE_PLANS.join(', ');
