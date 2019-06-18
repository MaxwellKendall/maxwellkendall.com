import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getBio } from "../../graphql";

export const Header = ({ children }) => {
  const { image, shortBio } = getBio();
  return (
    <div className="header">
        <Link className="header__image--container" to="/">
          <Image className="header__image" fluid={image.fluid} />
        </Link>
          <div
            className="header__bio"
            dangerouslySetInnerHTML={{
              __html: shortBio.childMarkdownRemark.html
            }} />
      {children}
    </div>
  );
};

