import React from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';

import "../styles/index.scss";

const RootIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  return (
    <div className="main">
      <div className="header">
        <h1>Awesome MDX Blog</h1>
      </div>
      <ul className="blog-list">
        {posts.map(({ node: post }) => (
          <li className="blog-post__preview" key={post.id}>
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
              <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
      <div className="footer">
        Maxwell Kendall
      </div>
    </div>
  )
}

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
                fluid(maxWidth: 200) {
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
