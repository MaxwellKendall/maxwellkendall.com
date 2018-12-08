import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image';
import styles from './header.module.css'

export default () => (
    <div className={styles.header}>
      {/* <Img className={styles.logo} sizes={data.allContentfulAsset.edges[0].node.fluid}/> */}
      <h1>
        <Link to="/">MAXWELL<strong>KENDALL.COM</strong></Link>
      </h1>
    </div>
);
