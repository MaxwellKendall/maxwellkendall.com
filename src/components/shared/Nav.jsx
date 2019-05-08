import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import cx from 'classnames';

const Nav = ({
    imageProps,
    links
}) => {

    const createNavLinks = (linkObj) => (
        <li className="nav__item">
            <Link to={`/${linkObj.link}`}>{linkObj.name}</Link>
        </li>
    );

    const renderImages = () => {
        return Object.keys(imageProps).map((imageTitle, index) => {
            const position = (imageTitle === "chs") ? 'absolute' : 'relative'; // image no 1 should be absolute positioned
            const objectPosition = (imageTitle === "chs") ? '85% 0px' : 'center center'; // image no 1 should be absolute positioned
            return (
                <Image className={`nav__img nav__img-${imageTitle}`} fluid={imageProps[imageTitle]} style={{ position }} imgStyle={{ objectPosition }} />
            );
        }
        );
    }

    const createLinksToExperience = () => {
        return (
            <li>
                <a href="">Some Project I've worked on</a>
            </li>
        );
    }

    const createLinksToCompetencies = () => {
        return (
            <li>
                <a href="">Some thing I'm good at</a>
            </li>
        );
    }

    const images = renderImages();
    const navLinks = links.map((link) => createNavLinks(link));
    // const competencyLinks = createLinksToCompetencies();
    // const experienceLinks = createLinksToExperience();

    return (
        <div className="nav">
            {images}
            <h1>Maxwell Kendall</h1>
            <ul className="nav__links">
                {navLinks}
            </ul>
            {/* <h2>Skills</h2>
            <ul className="competencies__links">
                {competencyLinks}
            </ul>
            <h2>Experience</h2>
            <ul className="experience__links">
                {experienceLinks}
            </ul> */}
        </div>
    );
}

export default Nav;