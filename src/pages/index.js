import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";
import { getFontColor } from "../utils/index";

import "../styles/index.scss";

const RootIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  const { izOffHrs } = useContext(ThemeContext);
  console.log("is off hrs", izOffHrs);
  const color = getFontColor(izOffHrs);
  console.log("color", color);
  return (
    <div className="main">
      <Header izOffHrs={izOffHrs} />
      <ul className="blog-list">
        {posts.map(({ node: post }) => {
          const img = post.frontmatter.featuredImage;
          return (
            <li className="blog-post__preview" key={post.id}>
              <Link to={post.fields.slug}>
                <h2 style={{ color }}>{post.frontmatter.title}</h2>
                {img && <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}
                <p style={{ color }}>{post.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Footer izOffHrs={izOffHrs} />
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
