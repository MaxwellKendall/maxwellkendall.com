import React, { useEffect, useState } from "react";
import { Link, graphql, navigate } from "gatsby";
import { GatsbyImage as Img } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import { isAfter, format } from 'date-fns';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { isOffHrs} from "../utils";
import "../styles/index.css";
import { SEO } from "../components/shared/SEO";
import { startCase } from "lodash";
import { trim } from "lodash";

const acceptableChars = "abcdefghijklmnopqrstuvwxyz123456789";
export const URLifySearchTerm = (str) => str
    .split(' ')
    .map((s) => s.split('').filter((s2) => acceptableChars.includes(s2.toLowerCase())).join('').toLowerCase())

const parseUrlSearchTerm = (str) => {
  debugger;
  const decoded = decodeURIComponent(str);
  // return str.split('-').join(' ').toLowerCase();
  return decoded;
}

const PRIVATE_TAGS = ['public'];

const setQueryParam = (value) => {
  return `?${new URLSearchParams({ q: value }).toString().toLowerCase()}`;
}

const Blog = ({ data }) => {
  const query = new URLSearchParams(useLocation().search)
  const searchTerm = query.get('q') || '';
  const { edges: posts } = data.allMdx;
  const { siteMetadata } = data.site;
  const izOffHrs = isOffHrs();

  const handleSearch = (e) => {
    if (!e.target.value) {
      navigate('/blog')
    } else {
      navigate(setQueryParam(e.target.value))
    }
  }

  const handleKeyChange = (e) => {
    if (e.keyCode === 13) {
      navigate(setQueryParam(e.target.value));
    }
  }

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(setQueryParam(tag))
  }

  return (
    <SEO siteMetadata={siteMetadata}>
      <Header izOffHrs={izOffHrs} />
      <input type="text" value={parseUrlSearchTerm(searchTerm)} placeholder="Search Blog Posts" className="border border-2 text-xl border-gray-400 rounded-full p-5 flex mx-auto my-10 w-64 outline-none" onChange={handleSearch} onKeyDown={handleKeyChange} />
        <ul className="blog-list flex flex-wrap mx-auto justify-center">
          {posts
            .filter(({ node: post }) => post.frontmatter.tags.split(", ").includes("public"))
            .filter(({ node: post }) => {
              if (searchTerm?.length < 3 || !searchTerm) return true;
              const tags = post.frontmatter?.tags.split(", ").map((str) => str.toLowerCase()) || [];
              const headers = post.headings.map(({ value }) => value.toLowerCase());
              return (
                tags.some((tag) => tag.includes(parseUrlSearchTerm(searchTerm))) ||
                headers.some((header) => header.includes(searchTerm)) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.frontmatter.title.toLowerCase().includes(searchTerm)
              );
            })
            .sort((a, b) => {
              const dateA = new Date(a.node.frontmatter.date);
              const dateB = new Date(b.node.frontmatter.date);
              if (isAfter(dateA, dateB)) return -1;
              if (isAfter(dateB, dateA)) return 1;
              return 0;
            })
            .map(({ node: post }) => {
              const img = post.frontmatter.featuredImage;
              return (
                <li className="blog-post__preview flex w-full p-10 bg-white mx-8 md:w-1/2" key={post.id}>
                  <Link to={post.fields.slug} className="flex flex-col">
                    <h2 className="tracking-wider w-full font-bold text-4xl text-center">
                      {startCase(post.frontmatter.title)}
                    </h2>
                    {img && (
                      <Img
                        className="w-11/12 m-auto"
                        alt=""
                        image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData} />
                    )}
                    <p className="text-xl py-4 w-full">
                      {post.excerpt}
                    </p>
                    <ul className="flex">
                      {post.frontmatter.tags && post.frontmatter.tags
                        .split(',')
                        .filter((t) => !PRIVATE_TAGS.includes(t))
                        .map((t) => {
                          const tag = trim(t);
                          return (
                            <li className="px-4 py-2 border-2 rounded mx-2" onClick={(e) => handleTagClick(e, tag)} value={tag}>
                              {tag}
                              </li>
                          )
                        })}
                    </ul>
                  </Link>
                </li>
              );
            })}
        </ul>
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
          excerpt(pruneLength: 350)
          fields {
            slug
          }
          headings {
            value
          }
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;

export default Blog;
