import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";
import { getFontColor } from "../utils/index";

import "../styles/index.scss";
import { SEO } from "../components/shared/SEO";

const Blog = ({ data }) => {
  const { edges: posts } = data.allMdx;
  const { siteMetadata } = data.site;
  const { izOffHrs } = useContext(ThemeContext);

  return (
    <SEO siteMetadata={siteMetadata}>
      <Header izOffHrs={izOffHrs} />
      <div className="main bg-gray-200">
        <ul className="blog-list flex flex-wrap mx-auto justify-center">
          {posts
            .filter(({ node: post }) =>
              post.frontmatter.tags.split(", ").includes("public")
            )
            .sort((a, b) => {
              const momentA = moment(a.node.frontmatter.date);
              const momentB = moment(b.node.frontmatter.date);
              if (momentA.isAfter(momentB)) return -1;
              if (momentB.isAfter(momentA)) return 1;
              return 0;
            })
            .map(({ node: post }) => {
              const img = post.frontmatter.featuredImage;
              return (
                <li className="blog-post__preview flex w-full md:w-1/4 my-10 p-10 bg-white mx-8" key={post.id}>
                  <Link to={post.fields.slug} className="flex flex-column flex-wrap">
                    <h2 className="pb-10 tracking-wider uppercase w-full font-bold text-4xl text-center">
                      {post.frontmatter.title}
                    </h2>
                    {img && (
                      <Img
                        className="w-11/12 m-auto"
                        fluid={
                          post.frontmatter.featuredImage.childImageSharp.fluid
                        }
                      />
                    )}
                    <p className="text-xl pt-10">
                      {post.excerpt}
                    </p>
                    <p className="text-xl w-full pt-10 text-center mt-auto">{`${post.timeToRead} minute read`}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <Footer izOffHrs={izOffHrs} />
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

export default Blog;
