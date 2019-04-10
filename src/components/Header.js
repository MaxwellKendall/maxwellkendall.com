import React from 'react';
import { Link } from 'gatsby';

export const Header = ({ children }) => (
    <div className="header">
      <h1>
        <Link to="/">MAXWELL<strong>KENDALL.COM</strong></Link>
      </h1>
      {children}
    </div>
);
