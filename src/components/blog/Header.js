import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getBio } from "../../graphql";

const isInclusivelyAfter5 = moment().hour() >= 17;

export const Header = ({ links, title }) => {
  const { headShots } = getBio();
  const image = isInclusivelyAfter5 ? headShots[1] : headShots[0];
  return (
    <div className="header">
      <Image className="header__image" fluid={image.fluid} />
      <h1>{title}</h1>
      {links.map((link) => <Link to={link.link}>{link.name}</Link>)}
    </div>
  );
};

