import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ListingItem from '../components/listing-item';
import Spinner from '../components/spinner';
import { fetchListings } from '../services/fetch-listings';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Category = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const categoryName = params.categoryName || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchListings(categoryName);
        // @ts-ignore
        setListings(results);
      } catch (error) {
        toast.error('Could not fetch listings.');
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sales'}
        </p>
      </header>

      {isLoading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                // @ts-ignore
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
