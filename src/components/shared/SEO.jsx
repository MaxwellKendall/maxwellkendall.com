import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

export const SEO = ({ siteMetadata, children, image }) => {
  return (
    <React.Fragment>
      <Helmet>
        {/* General tags */}
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        {/* {favicon && (
                  <link rel="icon" type="image/x-icon" href={favicon.original.src} />
                )} */}

        {/* OpenGraph tags */}
        {/* <meta property="og:url" content={url} />
                {isBlogPost ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="fb:app_id" content={seo.social.fbAppID} /> */}

        {/* Twitter Card tags */}
        {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={seo.social.twitter} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} /> */}
      </Helmet>
      {children}
    </React.Fragment>
  );
};
