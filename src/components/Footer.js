import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => (
  <div className="footer">
      <p>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
      <div className="svgs">
        <a href="https://www.linkedin.com/in/maxwellkendall/" ><FontAwesomeIcon icon={["fab", "linkedin"]} /></a>
        <a href="https://github.com/MaxwellKendall" ><FontAwesomeIcon icon={["fab", "github"]} /></a>
      </div>
    </div>
);
