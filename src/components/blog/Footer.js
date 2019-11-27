import React from 'react';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => (
  <div className="footer">
    <div className="svgs">
      <a href="https://github.com/MaxwellKendall">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://www.linkedin.com/in/maxwellkendall/">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </div>
    <p>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
  </div>
);
