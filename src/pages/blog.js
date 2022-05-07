import React, { useContext, useEffect, useState } from "react";
import { Link, graphql, navigate } from "gatsby";
import Img from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import { isAfter, format } from 'date-fns';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";

import "../styles/index.scss";
import { SEO } from "../components/shared/SEO";

const acceptableChars = "abcdefghijklmnopqrstuvwxyz123456789";
export const URLifySearchTerm = (str) => str
    .split(' ')
    .map((s) => s.split('').filter((s2) => acceptableChars.includes(s2.toLowerCase())).join('').toLowerCase())
    .join('-');

const parseUrlSearchTerm = (str) => str.split('-').join(' ').toLowerCase();

const Blog = ({ data, location }) => {
  const url = useLocation();
  const query = new URLSearchParams(useLocation().search)
  const urlSearch = query.get('q') || '';
  const { edges: posts } = data.allMdx;
  const { siteMetadata } = data.site;
  const { izOffHrs } = useContext(ThemeContext);
  const [searchTerm, setSearch] = useState(urlSearch);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      navigate('/')
    }
  }

  const handleKeyChange = (e) => {
    if (e.keyCode === 13) {
      navigate(`?${new URLSearchParams({ q: URLifySearchTerm(searchTerm) }).toString().toLowerCase()}`)
    }
  }

  useEffect(() => {
    if (location?.state?.searchTerm) {
      setSearch(location.state.searchTerm)
    }
  }, [location.state])

  return (
    <SEO siteMetadata={siteMetadata}>
      <Header izOffHrs={izOffHrs} />
      <input type="text" value={parseUrlSearchTerm(searchTerm)} placeholder="Search Blog Posts" className="border border-gray-400 rounded-full p-5 border-4 flex mx-auto my-10 w-64 outline-none" onChange={handleSearch} onKeyDown={handleKeyChange} />
      <ul className="flex mx-auto max-w-5xl flex-wrap justify-center">
        {posts
          .reduce((acc, { node: post }) => {
            const tags = post.frontmatter.tags.split(", ").map((str) => str.toLowerCase());
            if (!tags.map((s) => s.toLowerCase()).includes('public')) return acc;
            return acc.concat(
              tags.filter((tag) => tag !== 'public' && !acc.includes(tag))
            )
          }, [])
          .map((tag) => {
            return (
              <li className="p-2">
                <Link to={`?q=${URLifySearchTerm(tag)}`} state={{ searchTerm: URLifySearchTerm(tag) }}>{tag.toUpperCase()}</Link>
              </li>
            )
        })}
      </ul>
      <div className="blog bg-gray-200">
        <ul className="blog-list flex flex-wrap mx-auto justify-center">
          {posts
            .filter(({ node: post }) => post.frontmatter.tags.split(", ").includes("public"))
            .filter(({ node: post }) => {
              if (urlSearch?.length < 3 || !urlSearch) return true;
              const search = parseUrlSearchTerm(urlSearch);
              const tags = post.frontmatter.tags.split(", ").map((str) => str.toLowerCase());
              const headers = post.headings.map(({ value }) => value.toLowerCase());
              return (
                tags.some((tag) => tag.includes(parseUrlSearchTerm(urlSearch))) ||
                headers.some((header) => header.includes(search)) ||
                post.excerpt.toLowerCase().includes(search) ||
                post.frontmatter.title.toLowerCase().includes(search)
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
                <li className="blog-post__preview flex w-full md:w-1/4 my-10 p-10 bg-white mx-8" key={post.id}>
                  <Link to={post.fields.slug} className="flex flex-column flex-wrap">
                    <h2 className="pb-10 tracking-wider uppercase w-full font-bold text-4xl text-center">
                      {post.frontmatter.title}
                    </h2>
                    {img && (
                      <Img
                        className="w-11/12 m-auto"
                        fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
                    )}
                    <p className="text-xl pt-10">
                      {post.excerpt}
                    </p>
                    <p className="text-xl w-full pt-10 text-center mt-auto">{`Published ${format(new Date(post.frontmatter.date), 'MM/dd/yyyy')}`}</p>
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
          headings {
            value
          }
          timeToRead
          frontmatter {
            title
            tags
            date
            featuredImage {
              id
              childImageSharp {
                fluid(maxWidth: 260) {
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
