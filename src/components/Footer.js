import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.css"

export const Footer = () => (
  <div className={styles.footer}>
      <p>&#169;{`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
      <div className={styles.svgs}>
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
        <FontAwesomeIcon icon={["fab", "github"]} />
      </div>
    </div>
);
