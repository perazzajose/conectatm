// Cliente Firebase único para toda la app.
// Antes esta config estaba duplicada en admin-panel.html, comunidad_estudiantes.html
// y vitrina_emprendimientos.html — ahora vive en un solo lugar.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
