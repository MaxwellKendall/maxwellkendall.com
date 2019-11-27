import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Header } from "../components/blog/Header";

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div className="main">
      <Header />
      <div className="blog-post markdown-body">
        <h1>{mdx.frontmatter.title}</h1>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
      <div className="footer">
        Maxwell Kendall
      </div>
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
