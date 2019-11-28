import React from 'react';
import Img from 'gatsby-image';

import { getImage } from "../../graphql/index";

export const Header = ({ izOffHrs }) => {
  const image = getImage(izOffHrs);
  return (
    <div className="header">
        <h1>Maxwell Kendall</h1>
        <div className="header__bio">
          <Img fluid={image} />
          <p>React, Redux, ES6, Webpack, AWS, Python webdev stuff.</p>
        </div>
      </div>
  );
};

