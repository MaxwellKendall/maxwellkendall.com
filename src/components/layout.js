import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import { Header } from './Header';
import { Footer } from './Footer';

library.add(faCopyright, fab);
require('./base.css');

export const Layout = ({
  includeHeader = false,
  children
}) => (
  <div className="layout">
    {includeHeader && <Header />}
    {children}
    <Footer />
  </div>  
);
