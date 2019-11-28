import React, { useContext } from 'react';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../gatsby-browser";

export const Footer = () => {
  const { izOffHrs } = useContext(ThemeContext);
  const color = izOffHrs
    ? '#6DA7B5'
    : '#4C6063';
  return (
    <div className="footer">
      <div className="svgs">
        <a href="https://github.com/MaxwellKendall">
          <FontAwesomeIcon style={{ color }} icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/maxwellkendall/">
          <FontAwesomeIcon style={{ color }} icon={faLinkedinIn} />
        </a>
      </div>
      <p style={{ color }}>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
    </div>
  );
}