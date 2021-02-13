import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Header } from "../components/blog/Header";
import { Footer } from '../components/blog/Footer';
import { ThemeContext } from "../../gatsby-browser";

export default function PageTemplate({ data: { mdx } }) {
  const { izOffHrs } = useContext(ThemeContext);

  return (
    <div className="main">
      <Header izOffHrs={izOffHrs} />
      <div className="blog-post markdown-body max-w-6xl">
        <h2>{mdx.frontmatter.title}</h2>
        <MDXRenderer>
          {mdx.body}
        </MDXRenderer>
      </div>
      <Footer izOffHrs={izOffHrs} />
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
