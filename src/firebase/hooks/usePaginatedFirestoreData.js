import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit as limitFn,
  startAfter as startAfterFn,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../config";

function usePaginatedFirestoreData(collectionName, options = {}) {
  const { where: whereClause, orderBy: order, limit = 10 } = options;

  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch data
  const fetchPage = useCallback(
    (startAfterDoc = null) => {
      if (!collectionName) {
        setError("Collection name is required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let q = collection(firestore, collectionName);
        const constraints = [];

        if (whereClause) {
          whereClause.forEach(([field, op, value]) => {
            constraints.push(where(field, op, value));
          });
        }

        if (order) {
          order.forEach(([field, direction]) => {
            constraints.push(orderBy(field, direction));
          });
        }

        if (startAfterDoc) {
          constraints.push(startAfterFn(startAfterDoc));
        }

        constraints.push(limitFn(limit));

        q = query(q, ...constraints);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            ref: doc, // Include the raw document snapshot (`docRef`)
          }));

          if (docs.length < limit) setHasMore(false);

          setData((prev) => (startAfterDoc ? [...prev, ...docs] : docs));
          setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    [collectionName, JSON.stringify(whereClause), JSON.stringify(order), limit]
  );

  // Fetch first page on mount
  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const loadMore = () => {
    if (lastDoc && hasMore && !loading) {
      fetchPage(lastDoc);
    }
  };

  const reload = () => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPage();
  };

  const refetch = (newOptions = {}) => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPage(null, newOptions);
  };

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    reload,
    refetch,
  };
}

export default usePaginatedFirestoreData;

//  Example Usage in Component

// const {
//   data: posts,
//   loading,
//   hasMore,
//   loadMore,
//   error,
// } = usePaginatedFirestoreData("posts", {
//   where: [["status", "==", "published"]],
//   orderBy: [["createdAt", "desc"]],
//   limit: 5,
// });

// {
//   posts.map((post) => <p key={post.id}>{post.title}</p>);
// }

// {
//   loading && <p>Loading...</p>;
// }

// {
//   hasMore && !loading && <button onClick={loadMore}>Load More</button>;
// }

// {
//   error && <p>Error: {error}</p>;
// }

// ✅ Example Usage
// 🔹 Manual Reload: ========================reload=======>

// const { data, loading, loadMore, reload, error } = usePaginatedFirestoreData(
//   "posts",
//   {
//     where: [["status", "==", "published"]],
//     orderBy: [["createdAt", "desc"]],
//     limit: 5,
//   }
// );

// return (
//   <div>
//     <button onClick={reload}>Reload Data</button>
//     {loading && <p>Loading...</p>}
//     {data.map((post) => (
//       <div key={post.id}>
//         <h3>{post.title}</h3>
//         <p>{post.content}</p>
//       </div>
//     ))}
//     {loadMore && <button onClick={loadMore}>Load More</button>}
//   </div>
// );

// 🔹 Refetch with New Parameters: ========================refetch=======>

// const { data, loading, refetch, error } = usePaginatedFirestoreData("posts", {
//   where: [["status", "==", "draft"]],
//   orderBy: [["createdAt", "desc"]],
//   limit: 5,
// });

// // Refetch with new parameters:
// const handleRefetch = () => {
//   refetch({
//     where: [["status", "==", "published"]],
//     orderBy: [["createdAt", "asc"]],
//     limit: 5,
//   });
// };

// return (
//   <div>
//     <button onClick={handleRefetch}>Refetch Published Posts</button>
//     {loading && <p>Loading...</p>}
//     {data.map((post) => (
//       <div key={post.id}>
//         <h3>{post.title}</h3>
//         <p>{post.content}</p>
//       </div>
//     ))}
//     {error && <p>Error: {error}</p>}
//   </div>
// );
