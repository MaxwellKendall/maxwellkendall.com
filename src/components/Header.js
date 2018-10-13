import React, { Component } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image';
import styles from './header.module.css'

require('./header.module.css');

class Header extends Component {
  render () {
    return (
      <div className={styles.header}>
        <Img className={styles.logo} sizes={this.props.logo.edges[0].node.sizes}/>
        <h1>MAXWELL<strong>KENDALL.COM</strong></h1>
      </div>
    );
  }
}

export default Header;
