import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import cx from 'classnames';

const Nav = ({
    imageProps,
    links
}) => {
    const createLinks = (linkObj) => (
        <li className="nav__item">
            <Link to={`/${linkObj.link}`}>{linkObj.name}</Link>
        </li>
    );

    const renderImages = () => {
        return Object.keys(imageProps).map((imageNo) => {
            const position = (imageNo === "1") ? 'absolute' : 'relative'; // image no 1 should be absolute positioned
            const objectPosition = (imageNo === "1") ? '85% 0px' : 'center center'; // image no 1 should be absolute positioned
            return (
                <Image className={`nav__img nav__img-${imageNo}`} fluid={imageProps[imageNo]} style={{ position }} imgStyle={{ objectPosition }} />
            );
        }
        );
    }

    const images = renderImages();

    return (
        <div className="nav">
            {renderImages()}
            <h1>Maxwell Kendall</h1>
            <ul className="nav__links">
                {links.map((link) => createLinks(link))}
            </ul>
        </div>
    );
}

export default Nav;