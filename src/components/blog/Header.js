import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage as Img } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { getImage } from '../../graphql/index';

export const Header = ({ izOffHrs }) => {
  const image = getImage(izOffHrs);
  return (
    <div className="header flex justify-center py-10">
      {/* <div className="flex w-full justify-center"> */}
      <Link to="/" className="flex">
        <div className="header__bio">
          <Img
            alt="headshot"
            image={image}
            className="w-full rounded-xl p-10"
            imgStyle={{ borderRadius: '50%' }}
          />
        </div>
      </Link>
      <div className="pl-4 flex flex-col my-auto">
        <Link to="/" className="flex justify-center w-full self-end">
          <h1 className="text-3xl text-center">Maxwell Kendall</h1>
        </Link>
        <ul className="flex">
          <li>
            <Link className="text-xl font-bold pr-2" to="/blog">
              BLOG
            </Link>
          </li>
          <li>
            <Link className="text-xl font-bold pr-2" to="/portfolio">
              PORTFOLIO
            </Link>
          </li>
          <li>
            <a
              className="text-xl font-bold"
              target="_blank"
              href="https://maxwell-kendall-resume.s3.amazonaws.com/MAXWELL_KENDALL_Resume.PDF"
            >
              RESUME <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </div>
  );
};
