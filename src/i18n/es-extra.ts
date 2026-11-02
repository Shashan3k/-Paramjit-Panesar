/**
 * Spanish text for strings that are not in src/data/copy.ts: validation messages
 * from src/lib/validation/contact.ts, and small interface labels. Entries here
 * take precedence over src/i18n/es.ts when both define the same English text.
 *
 * Validation wording is plain, direct, and does not change the meaning of the
 * English. Please have a fluent reviewer check it before launch.
 */
export const ES_EXTRA: Readonly<Record<string, string>> = {
  'First name is required.': 'El nombre es obligatorio.',
  'Last name is required.': 'El apellido es obligatorio.',
  'First name must be 60 characters or fewer.': 'El nombre debe tener 60 caracteres o menos.',
  'Last name must be 60 characters or fewer.': 'El apellido debe tener 60 caracteres o menos.',
  'First name may contain letters, spaces, apostrophes, periods, and hyphens only.':
    'El nombre solo puede contener letras, espacios, apóstrofes, puntos y guiones.',
  'Last name may contain letters, spaces, apostrophes, periods, and hyphens only.':
    'El apellido solo puede contener letras, espacios, apóstrofes, puntos y guiones.',
  'Phone number is required.': 'El número de teléfono es obligatorio.',
  'Enter a valid 10-digit US phone number.': 'Escriba un número de teléfono válido de 10 dígitos en EE. UU.',
  'Email address is required.': 'La dirección de correo electrónico es obligatoria.',
  'Email address must be 254 characters or fewer.': 'La dirección de correo electrónico debe tener 254 caracteres o menos.',
  'Enter a valid email address.': 'Escriba una dirección de correo electrónico válida.',
  'Choose a location.': 'Elija una ubicación.',
  'Message must be 2000 characters or fewer.': 'El mensaje debe tener 2000 caracteres o menos.',
  'Required': 'Obligatorio',
  'Call us at': 'Llámenos al',
  'About CHCA': 'Acerca de CHCA',
  'View all locations': 'Ver todas las ubicaciones',
  'Social media': 'Redes sociales',
  'Patient Login': 'Acceso de pacientes',
  'Home': 'Inicio',
  'About Us': 'Nosotros',
  'Locations': 'Ubicaciones',
  'Open menu': 'Abrir menú',
  'Close menu': 'Cerrar menú',
  'Close dialog': 'Cerrar ventana',
  'Previous slide': 'Diapositiva anterior',
  'Next slide': 'Diapositiva siguiente',
  'opens in a new tab': 'se abre en una pestaña nueva',
  'Eastern': 'Eastern',
  'Gustine': 'Gustine',
  'Fresno': 'Fresno',
  'Merced': 'Merced',
  'Turlock': 'Turlock',
  'Welcome to Community Health Centers of America': 'Bienvenido a Community Health Centers of America',
  'Your health journey is supported here': 'Su camino hacia la salud cuenta con nuestro apoyo',
  'We are dedicated to your well-being, and we provide top-tier care for every member of our community.':
    'Nos dedicamos a su bienestar y brindamos atención de primer nivel a cada integrante de nuestra comunidad.',
};
