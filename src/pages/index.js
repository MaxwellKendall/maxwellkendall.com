import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';
import moment from 'moment';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";
import { getFontColor } from "../utils/index";

import "../styles/index.scss";
import { SEO } from "../components/shared/SEO";

const RootIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  const { siteMetadata } = data.site
  const { izOffHrs } = useContext(ThemeContext);
    
  return (
      <SEO siteMetadata={siteMetadata}>
        <div className="main">
          <Header izOffHrs={izOffHrs} />
          <ul className="blog-list">
            {posts
              .filter(({ node: post }) => post.frontmatter.tags.split(", ").includes("public"))
              .sort((a, b) => {
                console.log("a", a);
                  const momentA = moment(a.node.frontmatter.date);
                  const momentB = moment(b.node.frontmatter.date);
                  if (momentA.isAfter(momentB)) return -1;
                  if (momentB.isAfter(momentA)) return 1;
                  return 0;
              })
              .map(({ node: post }) => {
                console.log("node", moment(post.frontmatter.date))
                const img = post.frontmatter.featuredImage;
                return (
                  <li className="blog-post__preview" key={post.id}>
                    <Link to={post.fields.slug}>
                      <h2 style={{ color: getFontColor(izOffHrs) }}>{post.frontmatter.title}</h2>
                      {img && <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}
                      <p style={{ color: getFontColor(izOffHrs) }}>{post.excerpt}</p>
                      <p style={{ color: 'black' }}>{`${post.timeToRead} minute read`}</p>
                    </Link>
                  </li>
                );
            })}
          </ul>
          <Footer izOffHrs={izOffHrs} />
        </div>
      </SEO>
  );
};

export const pageQuery = graphql`
  query blogIndex {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            tags
            date
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
