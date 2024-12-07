import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { compileMDXWithCustomOptions } from 'gatsby-plugin-mdx';
import remarkHeadingsPlugin from './remark-headings-plugin.js';
import readingTime from 'reading-time';
import slugify from '@sindresorhus/slugify';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const onCreateNode = async ({ node, getNode, actions }) => {
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
  const { createPage } = actions;

  // Query for MDX nodes to use in creating pages
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  // Create blog post pages
  const posts = result.data.allMdx.nodes;

  // Create pages for each MDX file
  posts.forEach((node) => {
    const slug = slugify(node.frontmatter.title);
    createPage({
      path: `/blog/${slug}`,
      component: `${path.resolve(
        './src/templates/blog-post.js'
      )}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });
};

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
