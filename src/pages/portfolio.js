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
      <div className="markdown-body max-w-6xl mx-auto px-5 pt-10 portfolio">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
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
    mdx(frontmatter: { title: { eq: "Portfolio Page" } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
