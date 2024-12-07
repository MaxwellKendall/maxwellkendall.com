import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { SEO } from '../components/shared/SEO';
import { Header } from '../components/blog/Header';
import { Footer } from '../components/blog/Footer';
import { isOffHrs } from '../utils';

const PortfolioPage = ({
  data: {
    site: { siteMetadata: seoInfo },
    mdx,
  },
}) => {
  const { izOffHrs } = isOffHrs();
  return (
    <SEO siteMetadata={seoInfo}>
      <Header izOffHrs={izOffHrs} />
      <Footer izOffHrs={izOffHrs} />
    </SEO>
  );
};

export default PortfolioPage;

export const query = graphql`
  query portfolioPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
