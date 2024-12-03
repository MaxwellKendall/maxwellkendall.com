const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { compileMDXWithCustomOptions } = require('gatsby-plugin-mdx');
const remarkHeadingsPlugin = require('./remark-headings-plugin.js');
const readingTime = require('reading-time');
let slugify;
const getSlugify = async () => {
  if (!slugify) {
    slugify = (await import('@sindresorhus/slugify')).default;
  }
  return slugify;
};
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'blog/',
    });

    const title = node.frontmatter.title;

    if (!title) {
      console.error('No title found for this blog post', relativeFilePath);
      return;
    }
    const slugify = await getSlugify();

    createNodeField({
      node,
      name: `slug`,
      value: `/${slugify(node.frontmatter.title)}`,
    });

    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { id: node.id },
    });
  });
};

exports.createSchemaCustomization = async ({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  actions,
  schema,
  store,
}) => {
  const { createTypes } = actions;

  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent);

          if (!fileNode) {
            return null;
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            }
          );

          if (!result) {
            return null;
          }

          return result.metadata.headings;
        },
      },
    },
  });

  createTypes([
    `
      type MdxHeading {
        value: String
        depth: Int
      }
    `,
    headingsResolver,
  ]);
};
