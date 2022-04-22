import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

import { db } from '../libs/firebase';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchListings = async (categoryName: string) => {
  // Get reference
  const listingsRef = collection(db, 'listings');

  // Create a query
  const q = query(
    listingsRef,
    where('type', '==', categoryName),
    orderBy('timestamp', 'desc'),
    limit(10),
  );

  // Execute the query
  const querySnapshot = await getDocs(q);

  // Return the data mapped
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
};
