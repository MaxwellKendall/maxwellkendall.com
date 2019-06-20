import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Helmet from 'react-helmet'

import { Header } from './Header';
import { Footer } from './Footer';
import { getSiteMetadata } from '../../graphql/Header';

library.add(faCopyright, fab);

export const Layout = ({
  includeHeader = true,
  children,
  className
}) => {
  const { menuLinks, title } = getSiteMetadata();
  return (
    <div className={`layout ${className}`}>
      <Helmet title={title} />
      {includeHeader && <Header links={menuLinks} title={title} />}
      {children}
      <Footer />
    </div>  
  );
};
