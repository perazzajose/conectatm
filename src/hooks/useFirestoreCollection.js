import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Antes esta lógica (fetch + mapeo de docs) estaba duplicada en cada página con Firestore.
// Ahora es un hook único: useFirestoreCollection('tutores', 'nombre')
export default function useFirestoreCollection(collectionName, orderField) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
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
