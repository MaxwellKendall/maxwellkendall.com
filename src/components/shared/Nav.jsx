import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import cx from "classnames";

const Nav = ({ imageProps, links, isMobile, navWidth }) => {
  const createNavLinks = linkObj => (
    <li className="nav__item">
      <Link to={`/${linkObj.link}`}>{linkObj.name}</Link>
    </li>
  );

  const renderImages = () => {
    return Object.keys(imageProps).map((imageTitle, index) => {
      const position = imageTitle === "chs" ? "absolute" : "relative"; // image no 1 should be absolute positioned
      const objectPosition = imageTitle === "chs" ? "85% 0px" : "center center"; // image no 1 should be absolute positioned
      return (
        <Image
          className={`nav__img nav__img-${imageTitle}`}
          fluid={imageProps[imageTitle]}
          style={{ position }}
          imgStyle={{ objectPosition }}
        />
      );
    });
  };

  const images = isMobile ? null : renderImages();
  const navLinks = links.map(link => createNavLinks(link));
  
  return (
    <div style={{ width: isMobile ? '100%' : navWidth }} className={cx({ nav: !isMobile, mobileNav: isMobile })}>
      {images}
      <h1>Maxwell Kendall</h1>
      <span>Full Stack Web Developer</span>
      <ul className="nav__links">{navLinks}</ul>
    </div>
  );
};

export default Nav;
