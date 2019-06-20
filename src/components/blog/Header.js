import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getBio } from "../../graphql";

export const Header = ({ links, title }) => {
  const { headShots } = getBio();
  return (
    <div className="header">
      <Image className="header__image" fluid={headShots[1].fluid} />
      <h1>{title}</h1>
      {links.map((link) => <Link to={link.link}>{link.name}</Link>)}
        {/* <div
          className="header__bio"
          dangerouslySetInnerHTML={{
            __html: shortBio.childMarkdownRemark.html
          }} /> */}
    </div>
  );
};

