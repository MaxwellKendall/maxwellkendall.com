import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const Nav = ({
    imageProps,
    links
}) => {
    const createLinks = (linkObj) => (
        <li className="nav__item">
            <Link to={`/${linkObj.link}`}>{linkObj.name}</Link>
        </li>
    );

    return (
        <div className="nav">
            {Object.keys(imageProps).map((imageNo) => (
                <Image className={`nav__img nav__img-${imageNo}`} fluid={imageProps[imageNo]} />
            ))}
            <h1>Maxwell Kendall</h1>
            <ul className="nav__links">
                {links.map((link) => createLinks(link))}
            </ul>
        </div>
    );
}

export default Nav;