import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// @ts-ignore
import ExploreIcon from '../../resources/assets/svg/exploreIcon.svg?component';
// @ts-ignore
import OfferIcon from '../../resources/assets/svg/localOfferIcon.svg?component';
// @ts-ignore
import PersonOutlineIcon from '../../resources/assets/svg/personOutlineIcon.svg?component';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLocatedHere = (route: string): boolean => route === location.pathname;

  const fillIconColor = (route: string): string =>
    isLocatedHere(route) ? '#2c2c2c' : '#8f8f8f';

  const fillTextClassname = (route: string): string =>
    isLocatedHere(route) ? 'navbarListItemNameActive' : 'navbarListItemName';

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <div className="navbarListItems">
          <button className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon fill={fillIconColor('/')} width="36px" height="36px" />
            <p className={fillTextClassname('/')}>Explore</p>
          </button>

          <button className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon fill={fillIconColor('/offers')} width="36px" height="36px" />
            <p className={fillTextClassname('/offers')}>Offer</p>
          </button>

          <button className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={fillIconColor('/profile')}
              width="36px"
              height="36px"
            />
            <p className={fillTextClassname('/profile')}>Profile</p>
          </button>
        </div>
      </nav>
    </footer>
  );
};

export default Navbar;
