// Cliente Firebase del sitio: solo Firestore, para leer la vitrina y la Red Conecta.
// (El login de Firebase lo usa únicamente public/admin-panel.html, que tiene su propia config.)
// Se importa con import() desde useFirestoreCollection: así Firebase no pesa en las páginas que no lo usan.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA3A2l9qydi-Ro1Cdd5aoD7pWxJUil6chU',
  authDomain: 'conectatumundo-admin.firebaseapp.com',
  projectId: 'conectatumundo-admin',
  storageBucket: 'conectatumundo-admin.firebasestorage.app',
  messagingSenderId: '204768677691',
  appId: '1:204768677691:web:05e3e333f7efcef736711e',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
