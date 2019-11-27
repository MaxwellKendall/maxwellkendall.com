import React from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';
import { Header } from "../components/blog/Header";

import "../styles/index.scss";

const RootIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  return (
    <div className ="main">
      <Header />
      <ul className="blog-list">
        {posts.map(({ node: post }) => {
          const img = post.frontmatter.featuredImage;
          return (
            <li className="blog-post__preview" key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
                {img && <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}
                <p>{post.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="footer">
        Maxwell Kendall
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  `;

export default RootIndex;
