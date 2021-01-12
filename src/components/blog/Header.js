import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { getImage } from "../../graphql/index";

export const Header = ({ izOffHrs }) => {
  const image = getImage(izOffHrs);
  return (
    <div className="header">
        <Link to="/">
          <h1>Maxwell Kendall</h1>
          <div className="header__bio">
            <Img fluid={image} />
            <p>Front End Development | Cloud Engineering | WEB DEV</p>
          </div>
        </Link>
      </div>
  );
};
