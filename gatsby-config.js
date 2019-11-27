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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        plugins: ['gatsby-remark-images'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true
            },
          },
        ],
      },
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
        name: 'blog',
        path: `${__dirname}/src/blog-posts/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
  ],
};
