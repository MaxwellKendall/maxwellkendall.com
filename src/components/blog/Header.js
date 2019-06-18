import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getBio } from "../../graphql";

export const Header = ({ children }) => {
  const test = getBio();
  return (
    <div className="header">
        {/* <Link to="/">
          <FontAwesomeIcon icon="home" />
        </Link> */}
      {children}
    </div>
  );
};

