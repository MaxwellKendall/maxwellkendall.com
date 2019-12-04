import React from 'react';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontColor } from "../../utils/index";

export const Footer = ({ izOffHrs }) => {
  return (
    <div className="footer">
      <div className="svgs">
        <a href="https://github.com/MaxwellKendall">
          <FontAwesomeIcon style={{ color: fontColor }} icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/maxwellkendall/">
          <FontAwesomeIcon style={{ color: fontColor }} icon={faLinkedinIn} />
        </a>
      </div>
      <p style={{ color: getFontColor(izOffHrs) }}>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
    </div> 
  );
}