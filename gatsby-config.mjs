const config = {
  siteMetadata: {
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
    ],
    siteUrl: 'https://maxwellkendall.com',
    title: 'maxwellkendall.com 🙌💯',
    description: 'Blog about software engineering',
  },
  plugins: [
    `gatsby-plugin-postcss`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './src/blog-posts/',
      },
      __key: 'blog-posts',
    },
  ],
};

export default config;
