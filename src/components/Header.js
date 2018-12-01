import React from 'react'
import Img from 'gatsby-image';
import styles from './header.module.css'

export const Header = (props) => {
  return (
    <div className={styles.header}>
      <Img className={styles.logo} sizes={props.logo.edges[0].node.fluid}/>
      <h1>MAXWELL<strong>KENDALL.COM</strong></h1>
    </div>
  );
}

export default Header;
