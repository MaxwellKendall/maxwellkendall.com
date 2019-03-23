import React from 'react';
import { Link } from 'gatsby';

import styles from './header.module.css';

export const Header = ({ children }) => (
    <div className={styles.header}>
      <h1>
        <Link to="/">MAXWELL<strong>KENDALL.COM</strong></Link>
      </h1>
      {children}
    </div>
);
