import React from 'react';
import { Link } from 'react-router-dom';

import bathtubIcon from '../../resources/assets/svg/bathtubIcon.svg';
import bedIcon from '../../resources/assets/svg/bedIcon.svg';
// @ts-ignore
import DeleteIcon from '../../resources/assets/svg/deleteIcon.svg?component';

type ListingItemProps = {
  listing: any;
  id: number;
  onDelete?: (id: number, name: string) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ListingItem = ({ listing, id, onDelete }: ListingItemProps) => {
  const isRentType = listing.type === 'rent';
  const hasMultipleBedRooms = listing.bedrooms > 1;
  const hasMultipleBathrooms = listing.bathrooms > 1;

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleDelete = () => {
    if (onDelete) {
      onDelete(listing.id, listing.name);
    }
  };

  return (
    <li className="categoryListing">
      <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
        <img
          src={listing.imageUrls[0]}
          alt="listing.name"
          className="categoryListingImg"
        />

        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>

          <p className="categoryListingName">{listing.name}</p>

          <p className="categoryListingPrice">
            $
            {listing.offer
              ? formatPrice(listing.discountedPrice)
              : formatPrice(listing.regularPrice)}
            {isRentType && ' / Month'}
          </p>

          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />

            <p className="categoryListingInfoText">
              {hasMultipleBedRooms ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
            </p>

            <img src={bathtubIcon} alt="bath" />

            <p className="categoryListingInfoText">
              {hasMultipleBathrooms ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill={'rgb(231, 76, 60)'}
          onClick={handleDelete}
        />
      )}
    </li>
  );
};

export default ListingItem;
