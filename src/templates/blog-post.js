import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Header } from "../components/blog/Header";
import { Footer } from '../components/blog/Footer';

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div className="main">
      <Header />
      <div className="blog-post markdown-body">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
      <Footer />
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
