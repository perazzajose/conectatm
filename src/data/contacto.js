// Datos de contacto en un solo lugar (antes el número estaba repetido en cada sección).
export const WHATSAPP = '59897154271';
export const WHATSAPP_VISIBLE = '097 154 271';
export const EMAIL = 'joseperazza@conectatumundo.net';
export const ZONAS_TEXTO = 'Durazno, Rocha y Montevideo';

export const waLink = (mensaje = 'Hola José, vi tu web y quisiera consultarte algo') =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
