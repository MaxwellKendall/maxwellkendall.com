import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import slugify from '@sindresorhus/slugify';
import { compileMDXWithCustomOptions } from 'gatsby-plugin-mdx';
import remarkHeadingsPlugin from './remark-headings-plugin.js';

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === 'Mdx') {
    // Use `createFilePath` to turn markdown files in our `/blog` directory into `/blog/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'blog/',
    });

    // Creates new query'able field with name of 'slug'
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

export const createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
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

  // Create blog post pages.
  const posts = result.data.allMdx.edges;

  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/blog-post.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};

// copy and pasted from https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/
export const createSchemaCustomization = async ({
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
