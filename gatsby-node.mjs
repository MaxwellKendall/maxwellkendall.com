import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { compileMDXWithCustomOptions } from 'gatsby-plugin-mdx';
import remarkHeadingsPlugin from './remark-headings-plugin.js';
import readingTime from 'reading-time';
import slugifyOriginal from '@sindresorhus/slugify';

const getSlugify = () => slugifyOriginal;

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

// export const createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;

//   const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
//   }

//   const posts = result.data.allMdx.edges;

//   posts.forEach(({ node }, index) => {
//     createPage({
//       path: node.fields.slug,
//       component: path.resolve(`./src/templates/blog-post.js`),
//       context: { id: node.id },
//     });
//   });
// };

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
