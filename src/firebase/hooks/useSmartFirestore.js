import { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit as limitFn,
  startAfter as startAfterFn,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../config";
import CryptoJS from "crypto-js"; // For encryption

const SECRET_KEY = "1e94e-239d-39-dd-ansdev-cloud"; // Secure this in production

// Encrypt data before storing in localStorage
const encryptData = (data) => {
  const payload = {
    data,
    timestamp: Date.now(),
  };
  const stringified = JSON.stringify(payload);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

// Decrypt and validate cached data
const decryptData = (ciphertext, expiryMinutes = 15) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const parsed = JSON.parse(decrypted);

    const expired = Date.now() - parsed.timestamp > expiryMinutes * 60 * 1000;
    if (expired) {
      localStorage.removeItem("fr-25-f4-asnd");
      return null;
    }

    return parsed.data;
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};

// Debounce utility for filters
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// ✅ Main Hook
function useSmartFirestore(collectionName, options = {}) {
  const {
    id = null, // 🔹 Fetch single document by ID
    where: whereClause, // 🔹 Firebase 'where' filters
    orderBy: order, // 🔹 Firebase order by
    limit = 10, // 🔹 Pagination limit
    filter: filterFn, // 🔹 Custom client-side filtering
    sort: sortFn, // 🔹 Custom sorting function
    debounceDelay = 300, // 🔹 Debounce delay for filter
    dynamicSorting = false, // 🔹 Enable client-side sorting
    enableOfflineCache = false, // 🔹 Use encrypted localStorage
  } = options;

  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const debouncedFilterFn = useRef(debounce(filterFn, debounceDelay)).current;
  const dataCache = useRef({});
  const lastSortedOrder = useRef([]);

  const fetchPage = useCallback(
    (startAfterDoc = null) => {
      if (!collectionName) {
        setError("Collection name is required.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 🔍 Fetching single document if ID provided
        if (id) {
          const docRef = doc(firestore, collectionName, id);
          const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
              const singleDoc = {
                id: snapshot.id,
                ...snapshot.data(),
                ref: snapshot,
              };
              setData([singleDoc]);

              if (enableOfflineCache) {
                localStorage.setItem("fr-25-f4-asnd", encryptData([singleDoc]));
              }
            } else {
              setData([]);
              setError("Document not found.");
            }
            setLoading(false);
            setPageLoading(false);
          });

          return () => unsubscribe();
        }

        // 📄 Fetching collection
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
        // 🔧 Safe query construction

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            ref: doc,
          }));

          if (docs.length < limit) setHasMore(false);

          let filteredDocs = debouncedFilterFn
            ? docs.filter(debouncedFilterFn)
            : docs;

          let sortedDocs = filteredDocs;
          if (dynamicSorting) {
            sortedDocs = filteredDocs.sort((a, b) => {
              for (const { field, direction } of lastSortedOrder.current) {
                const valA = a[field];
                const valB = b[field];
                const cmp = valA > valB ? 1 : valA < valB ? -1 : 0;
                if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
              }
              return 0;
            });
          } else if (sortFn) {
            sortedDocs = filteredDocs.sort(sortFn);
          }

          const newData = startAfterDoc
            ? [...(dataCache.current[startAfterDoc] || []), ...sortedDocs]
            : sortedDocs;

          setData(newData);
          dataCache.current[startAfterDoc || "firstPage"] = newData;
          setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
          setLoading(false);
          setPageLoading(false);

          if (enableOfflineCache) {
            localStorage.setItem("fr-25-f4-asnd", encryptData(newData));
          }
        });

        return () => unsubscribe();
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setPageLoading(false);
      }
    },
    [
      collectionName,
      id,
      JSON.stringify(whereClause),
      JSON.stringify(order),
      limit,
      debouncedFilterFn,
      sortFn,
      dynamicSorting,
      enableOfflineCache,
    ]
  );

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const loadMore = () => {
    if (lastDoc && hasMore && !pageLoading) {
      setPageLoading(true);
      fetchPage(lastDoc);
    }
  };

  const reload = () => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
    dataCache.current = {};
    fetchPage();
  };

  const refetch = (newOptions = {}) => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
    dataCache.current = {};
    fetchPage(null, newOptions);
  };

  const setSorting = (sortingOrder) => {
    lastSortedOrder.current = sortingOrder;
    reload();
  };

  useEffect(() => {
    if (enableOfflineCache) {
      const cached = localStorage.getItem("fr-25-f4-asnd");
      if (cached) {
        const decrypted = decryptData(cached, 15); // Expiry in 15 mins
        if (decrypted) {
          setData(decrypted);
        }
      }
    }
  }, [enableOfflineCache]);

  return [
    data,
    loading,
    pageLoading,
    hasMore,
    error,
    loadMore,
    reload,
    refetch,
    setSorting,
  ];
}

export default useSmartFirestore;

// how to use this hooks
// import React, { useState } from "react";
// import { useSmartFirestore } from "./useSmartFirestore";

// const PostsList = () => {
//   const [filterText, setFilterText] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

//   // Setting up the options for the custom hook
//   const [
//     data,
//     loading,
//     pageLoading,
//     hasMore,
//     error,
//     loadMore,
//     reload,
//     refetch,
//     setSorting
//   ] = useSmartFirestore('posts', {
//     where: [['category', '==', 'tech']], // Filter posts by category
//     orderBy: [['createdAt', sortOrder]], // Sort by date in ascending/descending order
//     limit: 10, // Limit the number of posts per page
//     filter: (post) => post.title.toLowerCase().includes(filterText.toLowerCase()), // Filter by title
//     dynamicSorting: true, // Enable sorting dynamically
//     enableOfflineCache: true, // Cache data for offline access
//   });

//   // Handling sort change
//   const toggleSortOrder = () => {
//     const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(newOrder);
//     setSorting([{ field: 'createdAt', direction: newOrder }]); // Update sorting
//   };

//   // Handle text filtering
//   const handleFilterChange = (e) => {
//     setFilterText(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Posts</h1>

//       {/* Search input */}
//       <input
//         type="text"
//         value={filterText}
//         onChange={handleFilterChange}
//         placeholder="Search by title"
//         className="border p-2 mb-4"
//       />

//       {/* Sorting toggle */}
//       <button onClick={toggleSortOrder}>
//         Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
//       </button>

//       {/* Displaying loading and error states */}
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}

//       {/* Displaying the posts */}
//       <div>
//         {data.length === 0 ? (
//           <p>No posts available.</p>
//         ) : (
//           data.map((post) => (
//             <div key={post.id} className="post-card">
//               <h3>{post.title}</h3>
//               <p>{post.content}</p>
//               <p><small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small></p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Infinite scrolling */}
//       {pageLoading && <p>Loading more posts...</p>}
//       {hasMore && !loading && !pageLoading && (
//         <button onClick={loadMore} className="load-more-btn">
//           Load More
//         </button>
//       )}

//       {/* Reload button */}
//       <button onClick={reload} className="reload-btn">
//         Reload Posts
//       </button>
//     </div>
//   );
// };

// export default PostsList;

// | Prop                 | Type                   | Description                           |
// | -------------------- | ---------------------- | ------------------------------------- |
// | `id`                 | `string`               | 🔹 Fetch a single document            |
// | `where`              | `[[field, op, val]]`   | 🔹 Firestore filters                  |
// | `orderBy`            | `[[field, direction]]` | 🔹 Sort by field                      |
// | `limit`              | `number`               | 🔹 Page limit (default 10)            |
// | `filter`             | `(item) => bool`       | 🔹 Client-side filtering              |
// | `sort`               | `(a, b) => num`        | 🔹 Custom sort                        |
// | `debounceDelay`      | `number`               | 🔹 Filter debounce in ms              |
// | `enableOfflineCache` | `boolean`              | 🔹 Enable encrypted cache             |
// | `dynamicSorting`     | `boolean`              | 🔹 Sort client-side with `setSorting` |

// ✅ Example Usages
// 🔹 Fetch full collection with filters:
// \
// const [data, loading] = useSmartFirestore("posts", {
//   where: [["status", "==", "published"]],
//   orderBy: [["createdAt", "desc"]],
//   limit: 10,
//   enableOfflineCache: true,
// });
// 🔹 Fetch single document

// const [data, loading] = useSmartFirestore("posts", {
//   id: "post123",
// });
// 🔹 Use client filter + sort:

// const [data] = useSmartFirestore("users", {
//   filter: (user) => user.age > 18,
//   sort: (a, b) => a.name.localeCompare(b.name),
// });
