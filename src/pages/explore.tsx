import React from 'react';
import { Link } from 'react-router-dom';

import rentCategoryImage from '../../resources/assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../../resources/assets/jpg/sellCategoryImage.jpg';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <p className="exploreCategoryHeading">Categories</p>

        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />

            <p className="exploreCategoryName">Places for rent</p>
          </Link>

          <Link to="/category/sale">
            <img src={sellCategoryImage} alt="sell" className="exploreCategoryImg" />

            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
