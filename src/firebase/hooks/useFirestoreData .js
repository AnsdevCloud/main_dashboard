import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit as limitFn,
} from "firebase/firestore";
import { firestore } from "../config";

function useFirestoreData(collectionName, docId = null, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { where: whereClause, orderBy: order, limit = 5 } = options;

  useEffect(() => {
    if (!collectionName) {
      setError("Collection name is required");
      setLoading(false);
      return;
    }

    let unsubscribe;

    try {
      if (docId) {
        // Listen to a single document
        const docRef = doc(firestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            setData({ id: snapshot.id, ...snapshot.data() });
          } else {
            setData(null);
          }
          setLoading(false);
        });
      } else {
        // Build Firestore query
        let colRef = collection(firestore, collectionName);
        let q = colRef;

        if (whereClause) {
          // Example: [['status', '==', 'active']]
          whereClause.forEach(([field, op, value]) => {
            q = query(q, where(field, op, value));
          });
        }

        if (order) {
          // Example: [['createdAt', 'desc']]
          order.forEach(([field, direction]) => {
            q = query(q, orderBy(field, direction));
          });
        }

        if (limit) {
          q = query(q, limitFn(limit));
        }

        unsubscribe = onSnapshot(q, (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(docs);
          setLoading(false);
        });
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

    return () => unsubscribe && unsubscribe();
  }, [collectionName, docId, JSON.stringify(options)]); // stringified options for deep compare

  return [data, loading, error];
}

export default useFirestoreData;

// ✅ Usage Examples

// 🔹 Simple Collection:
// const { data } = useFirestoreData('posts');

// 🔹 Single Document:
// const { data } = useFirestoreData('posts', 'abc123');

// 🔹 With where and orderBy:
// const { data } = useFirestoreData('posts', null, {
//   where: [['status', '==', 'published']],
//   orderBy: [['createdAt', 'desc']],
//   limit: 10,
// });
