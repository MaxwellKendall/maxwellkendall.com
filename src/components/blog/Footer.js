import React from 'react';
import { Link } from 'gatsby';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontColor } from "../../utils/index";

export const Footer = ({ izOffHrs }) => {
  return (
    <div className="footer">
      <div className="svgs">
        <a href="https://github.com/MaxwellKendall">
          <FontAwesomeIcon style={{ color: getFontColor(izOffHrs) }} icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/maxwellkendall/">
          <FontAwesomeIcon style={{ color: getFontColor(izOffHrs) }} icon={faLinkedinIn} />
        </a>
      </div>
      <p style={{ color: getFontColor(izOffHrs) }}>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
      <Link
        to="/resume">Check out My Resume</Link>
    </div> 
  );
}