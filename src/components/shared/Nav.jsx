import React from 'react';
import { Link } from 'gatsby';

const links = ["Home", "Portfolio", "Blog"];

const Nav = () => {
    const createLinks = (link) => (
        <li className="nav__item">
            <Link to={`/${link.toLowerCase()}`}>{link}</Link>
            {/* {link} */}
        </li>
    );

    return (
        <div className="nav">
            <div className="nav__header">
                <h1>Maxwell Kendall</h1>
            </div>
            <ul className="nav__links">
                {links.map((link) => createLinks(link))}
            </ul>
    </div>
    );
}

export default Nav;