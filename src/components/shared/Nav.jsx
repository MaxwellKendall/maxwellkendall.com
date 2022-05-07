import React from "react";
import { Link } from "gatsby";
import { GatsbyImage as Img } from 'gatsby-plugin-image';

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
          alt=""
          image={imageProps[imageTitle]}
          style={{ position }}
          imgStyle={{ objectPosition }}
        />
      );
    });
  };

  const desktopView = (images, links) => (
    <div style={{ width: navWidth }} className="nav">
      {images}
      <h1>Maxwell Kendall</h1>
      <span>Full Stack Web Developer</span>
      <ul className="nav__links">{links}</ul>
    </div>
  )

  const images = isMobile ? null : renderImages();
  const navLinks = links.map(link => createNavLinks(link));

  if (!isMobile) return desktopView(images, navLinks);
  
  return (
    <div className="mobileNav">
      <ul className="nav__links">{navLinks}</ul>
    </div>
  );
};

export default Nav;
