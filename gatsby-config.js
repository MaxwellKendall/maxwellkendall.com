let contentfulConfig;

try {
  // Load the Contentful config from the .contentful.json
  // eslint-disable-next-line global-require
  contentfulConfig = require('./.contentful');
// eslint-disable-next-line no-empty
} catch (_) {
  console.log('add your contentful config...');
}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the delivery token need to be provided.');
}

module.exports = {
  pathPrefix: '/gatsby-contentful-starter',
  siteMetadata: {
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
    ],
    title: 'MaxwellKendall.com',
    description: 'Blog about software engineering',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131464926-1',
        head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['src/styles'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    'gatsby-plugin-mdx',
  ],
};
