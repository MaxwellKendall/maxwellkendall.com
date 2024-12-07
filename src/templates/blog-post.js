import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { isOffHrs } from '../utils';
import { Header } from '../components/blog/Header';
import { Footer } from '../components/blog/Footer';

const hasWindow = typeof window !== 'undefined';

const BlogPost = ({ data, children }) => {
  const izOffHrs = isOffHrs();
  const [isClient, setClient] = useState(hasWindow);
  useEffect(() => {
    if (!isClient) {
      setClient(true);
    }
  }, []);
  return (
    <div className="blog-post-page">
      <Header izOffHrs={izOffHrs} />
      <div className="blog-post markdown-body max-w-6xl">
        <h2>{data.mdx.frontmatter.title}</h2>
        <MDXProvider>{children}</MDXProvider>
      </div>
      <Footer izOffHrs={izOffHrs} />
    </div>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPost;
