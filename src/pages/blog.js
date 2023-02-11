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
  const izOffHrs = isOffHrs();
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
              console.log(post.frontmatter.tags);
              return (
                <li className="blog-post__preview flex w-full my-10 p-10 bg-white mx-8 w-1/2" key={post.id}>
                  <Link to={post.fields.slug} className="flex flex-column flex-wrap">
                    <h2 className="tracking-wider uppercase w-full font-bold text-4xl text-center">
                      {post.frontmatter.title}
                    </h2>
                    {img && (
                      <Img
                        className="w-11/12 m-auto"
                        alt=""
                        image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData} />
                    )}
                    <p className="text-xl py-4">
                      {post.excerpt}
                    </p>
                    {post.frontmatter.tags && post.frontmatter.tags.split(',').map((tag) => (<span>{tag}</span>))}
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
          }
        }
      }
    }
  }
`;

export default Blog;
