import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../config";

const getLastMonthClientsWithStatus = async () => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 1);

  const clientsRef = collection(firestore, "crm_clients");

  // CreatedAt query
  const createdQuery = query(
    clientsRef,
    where("createdAt", ">=", Timestamp.fromDate(lastMonth))
  );

  // UpdatedAt query
  const updatedQuery = query(
    clientsRef,
    where("updatedAt", ">=", Timestamp.fromDate(lastMonth))
  );

  const [createdSnap, updatedSnap] = await Promise.all([
    getDocs(createdQuery),
    getDocs(updatedQuery),
  ]);

  const clientsMap = new Map();

  // Add created clients
  createdSnap.docs.forEach((doc) => {
    clientsMap.set(doc.id, {
      id: doc.id,
      ...doc.data(),
      status: "created",
    });
  });

  // Add/overwrite with updated clients
  updatedSnap.docs.forEach((doc) => {
    const existing = clientsMap.get(doc.id);
    if (existing) {
      // If already added via createdAt, mark as "updated" only if updatedAt is more recent
      if (doc.data().updatedAt?.toMillis() > doc.data().createdAt?.toMillis()) {
        clientsMap.set(doc.id, {
          ...existing,
          status: "updated",
        });
      }
    } else {
      clientsMap.set(doc.id, {
        id: doc.id,
        ...doc.data(),
        status: "updated",
      });
    }
  });

  return Array.from(clientsMap.values());
};

export { getLastMonthClientsWithStatus };
