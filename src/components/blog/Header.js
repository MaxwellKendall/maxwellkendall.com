import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-plugin-image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { getImage } from "../../graphql/index";

export const Header = ({ izOffHrs }) => {
  const image = getImage(izOffHrs);
  return (
    <div className="header w-full mx-auto max-w-5xl mb-10 md:mb-20">
        <Link to="/" className="flex justify-center items-center pt-10">
          <div className="header__bio w-1/4 lg:w-1/12">
            <Img fluid={image} className="w-full rounded-xl p-10" imgStyle={{ borderRadius: '50%' }} />
          </div>
      </Link>
      <Link to="/"><h1 className="text-3xl pl-2 text-center uppercase">Maxwell Kendall</h1></Link>
        <ul className="flex w-full justify-center">
          <li>
            <Link className="tex-3xl font-bold pr-2" to="/blog">BLOG</Link>
          </li>
          <li>
            <Link className="tex-3xl font-bold pr-2" to="/portfolio">PORTFOLIO</Link>
          </li>
          <li>
            <a className="tex-3xl font-bold" target="_blank" href="https://maxwell-kendall-resume.s3.amazonaws.com/MAXWELL_KENDALL_Resume.PDF">RESUME <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </li>
        </ul>
    </div>
  );
};
