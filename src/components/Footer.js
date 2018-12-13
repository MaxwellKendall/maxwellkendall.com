import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.css"

export const Footer = () => (
  <div className={styles.footer}>
      <p>&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
      <div className={styles.svgs}>
        <a href="https://www.linkedin.com/in/maxwellkendall/" ><FontAwesomeIcon icon={["fab", "linkedin"]} /></a>
        <a href="https://github.com/MaxwellKendall" ><FontAwesomeIcon icon={["fab", "github"]} /></a>
      </div>
    </div>
);
