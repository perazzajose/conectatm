import { useEffect, useState } from 'react';

// Antes esta lógica (fetch + mapeo de docs) estaba duplicada en cada página con Firestore.
// Ahora es un hook único: useFirestoreCollection('tutores', 'nombre').
// Firebase se carga recién acá (import dinámico), no en el JavaScript principal del sitio.
export default function useFirestoreCollection(collectionName, orderField) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ collection, getDocs, orderBy, query }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../lib/firebase'),
        ]);
        const q = orderField
          ? query(collection(db, collectionName), orderBy(orderField))
          : collection(db, collectionName);
        const snap = await getDocs(q);
        if (cancelled) return;
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [collectionName, orderField]);

  return { data, loading, error };
}
