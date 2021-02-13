import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { getImage } from "../../graphql/index";

export const Header = ({ izOffHrs }) => {
  const image = getImage(izOffHrs);
  return (
    <div className="header w-full mx-auto max-w-5xl">
        <Link to="/" className="flex justify-center items-center py-10">
          <div className="header__bio w-6/12 lg:w-1/12">
          <Img fluid={image} className="w-full rounded-xl" imgStyle={{ borderRadius: '50%' }} />
          </div>
          <h1 className="text-3xl pl-2 uppercase">Maxwell Kendall</h1>
      </Link>
      <ul className="flex w-full justify-center">
        <li>
          <Link className="tex-3xl font-bold mr-10" to="/about">ABOUT</Link>
        </li>
        <li>
          <Link className="tex-3xl font-bold" to="/">BLOG</Link>
        </li>
      </ul>
      </div>
  );
};
