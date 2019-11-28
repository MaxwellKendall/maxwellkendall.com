import React from 'react';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontColor } from "../../utils/index";

export const Footer = ({ izOffHrs }) => {
  const color = getFontColor(izOffHrs);
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